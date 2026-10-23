'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  Workflow,
  Zap,
  Play,
  Plus,
  ArrowLeft,
  Save,
  Trash2,
  Settings,
  GitBranch,
  MessageSquare,
  Tag as TagIcon,
  Globe,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X,
  Code,
  AlertCircle,
  Copy,
  Check,
  Maximize2,
  RotateCcw,
} from 'lucide-react'
import {
  WorkflowDefinition,
  WorkflowNode,
  WorkflowConnection,
  WorkflowNodeType,
} from '@/lib/types'
import { useDemo } from '@/lib/demo-context'

interface WorkflowBuilderProps {
  workflow: WorkflowDefinition
  automationId?: string
  onBack: () => void
  onSave?: (wf: WorkflowDefinition) => void
}

const NODE_CAT_META: Record<
  WorkflowNodeType,
  { label: string; icon: React.ElementType; badgeClass: string }
> = {
  trigger: {
    label: 'TRIGGER',
    icon: Zap,
    badgeClass: 'text-foreground bg-[#18181b] border-border',
  },
  condition: {
    label: 'CONDITION',
    icon: GitBranch,
    badgeClass: 'text-foreground bg-[#18181b] border-border',
  },
  action: {
    label: 'ACTION',
    icon: MessageSquare,
    badgeClass: 'text-foreground bg-[#18181b] border-border',
  },
  ai: {
    label: 'AI AGENT',
    icon: Sparkles,
    badgeClass: 'text-foreground bg-[#18181b] border-border',
  },
  webhook: {
    label: 'WEBHOOK',
    icon: Globe,
    badgeClass: 'text-foreground bg-[#18181b] border-border',
  },
  delay: {
    label: 'DELAY',
    icon: Clock,
    badgeClass: 'text-foreground bg-[#18181b] border-border',
  },
}

export function WorkflowBuilder({
  workflow: initialWorkflow,
  automationId,
  onBack,
  onSave,
}: WorkflowBuilderProps) {
  const { templates, saveWorkflow } = useDemo()
  const [workflow, setWorkflow] = useState<WorkflowDefinition>(initialWorkflow)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialWorkflow.nodes[0]?.id || null
  )
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<
    { time: string; level: string; msg: string; data?: any }[]
  >([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeSimNodeId, setActiveSimNodeId] = useState<string | null>(null)
  const [connectingFrom, setConnectingFrom] = useState<{
    nodeId: string
    handle: 'default' | 'true' | 'false'
  } | null>(null)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Dragging state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const selectedNode = useMemo(
    () => workflow.nodes.find((n) => n.id === selectedNodeId) || null,
    [workflow.nodes, selectedNodeId]
  )

  // Canvas Mouse Move for Node Dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.max(20, Math.round(e.clientX - rect.left - dragOffset.x))
    const y = Math.max(20, Math.round(e.clientY - rect.top - dragOffset.y))

    setWorkflow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === draggingNodeId ? { ...n, x, y } : n)),
    }))
  }

  const handleMouseUp = () => {
    setDraggingNodeId(null)
  }

  const handleStartDrag = (e: React.MouseEvent, node: WorkflowNode) => {
    e.stopPropagation()
    setSelectedNodeId(node.id)
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    setDraggingNodeId(node.id)
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y,
    })
  }

  // Handle Connections
  const handlePortClick = (
    e: React.MouseEvent,
    nodeId: string,
    isInput: boolean,
    handle: 'default' | 'true' | 'false' = 'default'
  ) => {
    e.stopPropagation()
    if (isInput) {
      // Complete connection if waiting
      if (connectingFrom && connectingFrom.nodeId !== nodeId) {
        // Prevent duplicate connection
        const exists = workflow.connections.some(
          (c) =>
            c.fromNodeId === connectingFrom.nodeId &&
            c.toNodeId === nodeId &&
            c.fromHandle === connectingFrom.handle
        )
        if (!exists) {
          const newConn: WorkflowConnection = {
            id: 'c-' + Date.now(),
            fromNodeId: connectingFrom.nodeId,
            fromHandle: connectingFrom.handle,
            toNodeId: nodeId,
          }
          setWorkflow((prev) => ({
            ...prev,
            connections: [...prev.connections, newConn],
          }))
        }
        setConnectingFrom(null)
      }
    } else {
      // Start connection
      setConnectingFrom({ nodeId, handle })
    }
  }

  const handleDeleteConnection = (connId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      connections: prev.connections.filter((c) => c.id !== connId),
    }))
  }

  // Node Management
  const handleAddNode = (
    type: WorkflowNodeType,
    title: string,
    subtitle: string,
    defaultConfig: any
  ) => {
    const newId = 'n-' + Date.now()
    // Position node nicely on canvas
    const x = 300 + Math.floor(Math.random() * 200)
    const y = 160 + Math.floor(Math.random() * 140)

    const newNode: WorkflowNode = {
      id: newId,
      type,
      title,
      subtitle,
      x,
      y,
      config: defaultConfig,
    }

    setWorkflow((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }))
    setSelectedNodeId(newId)
    setIsPaletteOpen(false)
  }

  const handleDeleteNode = (nodeId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => n.id !== nodeId),
      connections: prev.connections.filter(
        (c) => c.fromNodeId !== nodeId && c.toNodeId !== nodeId
      ),
    }))
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null)
    }
  }

  const handleUpdateNodeConfig = (nodeId: string, updates: Partial<WorkflowNode>) => {
    setWorkflow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n)),
    }))
  }

  // Simulation execution runner
  const runSimulation = async () => {
    if (isSimulating || workflow.nodes.length === 0) return
    setIsSimulating(true)
    setIsConsoleOpen(true)
    setConsoleLogs([])

    const addLog = (level: string, msg: string, data?: any) => {
      const now = new Date()
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      setConsoleLogs((prev) => [...prev, { time, level, msg, data }])
    }

    addLog('INIT', `Starting live execution for "${workflow.name}"...`)

    // Find trigger node
    const trigger = workflow.nodes.find((n) => n.type === 'trigger') || workflow.nodes[0]
    let currentNodeId: string | null = trigger.id
    let branchDecision: 'true' | 'false' = 'true'

    const stepDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    while (currentNodeId) {
      const node = workflow.nodes.find((n) => n.id === currentNodeId)
      if (!node) break

      setActiveSimNodeId(node.id)
      await stepDelay(550)

      if (node.type === 'trigger') {
        addLog(
          'TRIGGER',
          `Inbound WhatsApp event caught: +1 (555) 234-5678 - "${node.config.keyword || 'Inbound inquiry'}"`,
          { phone: '+15552345678', text: 'Interested in enterprise license' }
        )
      } else if (node.type === 'condition') {
        const val = node.config.conditionValue || 'ENTERPRISE'
        addLog(
          'LOGIC',
          `Evaluating condition: message contains "${val}" => MATCH (Branch TRUE)`,
          { evaluated: true }
        )
        branchDecision = 'true'
      } else if (node.type === 'action') {
        if (node.config.actionType === 'send_template') {
          addLog(
            'META_API',
            `WhatsApp Cloud API v21.0 - Template "${node.config.templateName || 'webinar_invite'}" sent. (200 OK)`,
            { wamid: 'wamid.HBgLMTU1NT...' }
          )
        } else if (node.config.actionType === 'add_tag') {
          addLog('CRM', `Tag assigned to contact: "${node.config.tagName || 'Inbound'}"`)
        } else if (node.config.actionType === 'create_deal') {
          addLog(
            'CRM',
            `Pipeline Deal Created: "${node.config.dealTitle || 'New Deal'}" Value: $${(node.config.dealValue || 10000).toLocaleString()}`
          )
        } else {
          addLog('WHATSAPP', `Message dispatched to recipient: "${node.config.messageBody || 'Response sent'}"`)
        }
      } else if (node.type === 'ai') {
        addLog('AI_AGENT', 'Intent classification: high purchasing intent detected (Confidence 98.4%)')
      } else if (node.type === 'webhook') {
        addLog(
          'HTTP',
          `POST ${node.config.webhookUrl || 'https://api.internal/webhook'} - Status: 200 OK`
        )
      }

      // Find next node based on connection
      if (node.type === 'condition') {
        const branchConn = workflow.connections.find(
          (c) => c.fromNodeId === node.id && c.fromHandle === branchDecision
        )
        currentNodeId = branchConn ? branchConn.toNodeId : null
      } else {
        const nextConn = workflow.connections.find((c) => c.fromNodeId === node.id)
        currentNodeId = nextConn ? nextConn.toNodeId : null
      }
    }

    await stepDelay(400)
    setActiveSimNodeId(null)
    setIsSimulating(false)
    addLog('SUCCESS', 'Workflow execution sequence finished successfully in 410ms.')
  }

  // Save changes
  const handleSave = () => {
    if (automationId) {
      saveWorkflow(automationId, workflow)
    }
    if (onSave) {
      onSave(workflow)
    }
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#09090b] overflow-hidden">
      {/* Top Builder Control Header */}
      <div className="h-12 border-b border-[#27272a] bg-[#121214] px-4 flex items-center justify-between shrink-0 font-mono text-xs z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2 py-1 rounded-[3px] bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Workflows</span>
          </button>

          <span className="text-[#3f3f46]">/</span>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-[1px] bg-foreground/60" />
            <input
              type="text"
              value={workflow.name}
              onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
              className="bg-transparent text-white font-mono font-semibold focus:outline-none border-b border-transparent focus:border-foreground px-1"
            />
          </div>

          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border border-[#27272a] bg-[#18181b] text-foreground">
            VISUAL WORKFLOW
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[3px] bg-crimson/10 hover:bg-crimson hover:text-white border border-crimson/40 text-crimson font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-crimson group-hover:text-white" />
            <span>Add Node</span>
          </button>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-crimson hover:bg-crimson-hover text-white font-bold shadow-md shadow-crimson/25 transition-colors group disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-white fill-white" />
            <span>{isSimulating ? 'Executing...' : 'Simulate Run'}</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-crimson hover:bg-crimson-hover text-white font-medium transition-colors"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Flow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas + Inspector */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Canvas Area */}
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => {
            setSelectedNodeId(null)
            setConnectingFrom(null)
          }}
          className="flex-1 relative overflow-auto bg-[#09090b] select-none cursor-default"
          style={{
            backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Connecting Instruction Pill if linking */}
          {connectingFrom && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-[3px] bg-foreground text-background font-mono text-xs flex items-center gap-2">
              <span>Click any input node handle to complete connection</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setConnectingFrom(null)
                }}
                className="hover:underline text-[10px]"
              >
                ✕ Cancel
              </button>
            </div>
          )}

          {/* SVG Connection Cables */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 min-w-[2000px] min-h-[1200px]">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="6"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#71717a" />
              </marker>
            </defs>

            {workflow.connections.map((conn) => {
              const fromNode = workflow.nodes.find((n) => n.id === conn.fromNodeId)
              const toNode = workflow.nodes.find((n) => n.id === conn.toNodeId)
              if (!fromNode || !toNode) return null

              const nodeWidth = 240
              const nodeHeight = 110

              // Determine output point
              let startX = fromNode.x + nodeWidth
              let startY = fromNode.y + nodeHeight / 2
              if (fromNode.type === 'condition') {
                if (conn.fromHandle === 'true') {
                  startY = fromNode.y + 36
                } else if (conn.fromHandle === 'false') {
                  startY = fromNode.y + 72
                }
              }

              // Determine input point
              const endX = toNode.x
              const endY = toNode.y + nodeHeight / 2

              const dx = Math.abs(endX - startX) * 0.5
              const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`

              const isFlowActive =
                activeSimNodeId === fromNode.id || activeSimNodeId === toNode.id

              return (
                <g key={conn.id} className="group pointer-events-auto">
                  {/* Invisible wide stroke for easier hover delete */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="16"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteConnection(conn.id)
                    }}
                    className="cursor-pointer"
                  />
                  {/* Main Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isFlowActive ? '#9E1B32' : '#3f3f46'}
                    strokeWidth={isFlowActive ? '2.5' : '1.5'}
                    strokeDasharray={isFlowActive ? '4 4' : undefined}
                    className={isFlowActive ? 'animate-pulse' : ''}
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Branch label */}
                  {conn.fromHandle && conn.fromHandle !== 'default' && (
                    <text
                      x={(startX + endX) / 2}
                      y={(startY + endY) / 2 - 8}
                      fill="#a1a1aa"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-black px-1"
                    >
                      {conn.fromHandle.toUpperCase()}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Interactive Flow Nodes */}
          {workflow.nodes.map((node) => {
            const meta = NODE_CAT_META[node.type] || NODE_CAT_META.action
            const Icon = meta.icon
            const isSelected = selectedNodeId === node.id
            const isSimActive = activeSimNodeId === node.id

            return (
              <div
                key={node.id}
                style={{
                  transform: `translate3d(${node.x}px, ${node.y}px, 0)`,
                  width: '240px',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedNodeId(node.id)
                }}
                className={`absolute z-10 rounded-[4px] border transition-shadow cursor-grab active:cursor-grabbing ${
                  isSimActive
                    ? 'border-crimson bg-[#18181b] ring-2 ring-crimson shadow-2xl'
                    : isSelected
                    ? 'border-foreground bg-[#141417] ring-1 ring-foreground'
                    : 'border-[#27272a] bg-[#121214] hover:border-[#3f3f46]'
                }`}
              >
                {/* Input Handle Port */}
                {node.type !== 'trigger' && (
                  <button
                    title="Input Port (Connect target)"
                    onClick={(e) => handlePortClick(e, node.id, true)}
                    className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-[2px] bg-[#18181b] border border-[#27272a] hover:bg-crimson hover:border-crimson flex items-center justify-center group z-20 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-[0.5px] bg-foreground group-hover:bg-white" />
                  </button>
                )}

                {/* Node Header & Drag Handle */}
                <div
                  onMouseDown={(e) => handleStartDrag(e, node)}
                  className="p-2.5 border-b border-[#27272a] bg-[#18181b] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-crimson shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa]">
                      {meta.label}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-[#71717a]">
                    #{node.id.slice(-4)}
                  </span>
                </div>

                {/* Node Content Body */}
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-semibold text-white truncate">
                    {node.title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#71717a] line-clamp-2 leading-relaxed">
                    {node.subtitle}
                  </p>
                </div>

                {/* Standard Output Handle Port */}
                {node.type !== 'condition' ? (
                  <button
                    title="Output Port (Drag to connect next node)"
                    onClick={(e) => handlePortClick(e, node.id, false, 'default')}
                    className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-[2px] bg-[#18181b] border border-[#27272a] hover:bg-crimson hover:border-crimson flex items-center justify-center group z-20 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-[0.5px] bg-foreground group-hover:bg-white" />
                  </button>
                ) : (
                  /* Condition Branch Output Ports (True / False) */
                  <>
                    <button
                      title="True / Match Branch"
                      onClick={(e) => handlePortClick(e, node.id, false, 'true')}
                      className="absolute -right-2.5 top-[36px] -translate-y-1/2 w-4 h-4 rounded-[2px] bg-[#18181b] border border-[#27272a] hover:bg-crimson hover:border-crimson flex items-center justify-center group z-20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-[0.5px] bg-foreground group-hover:bg-white" />
                    </button>
                    <button
                      title="False / Fallback Branch"
                      onClick={(e) => handlePortClick(e, node.id, false, 'false')}
                      className="absolute -right-2.5 top-[72px] -translate-y-1/2 w-4 h-4 rounded-[2px] bg-[#18181b] border border-[#27272a] hover:bg-crimson hover:border-crimson flex items-center justify-center group z-20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-[0.5px] bg-foreground group-hover:bg-white" />
                    </button>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Inspector Drawer (When Node Selected) */}
        {selectedNode && (
          <div className="w-80 border-l border-[#27272a] bg-[#121214] flex flex-col shrink-0 overflow-y-auto p-4 space-y-4 font-mono text-xs z-20">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-foreground" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white">
                  Node Configuration
                </span>
              </div>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="text-[#71717a] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-[#71717a] mb-1">
                  Node Title
                </label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) =>
                    handleUpdateNodeConfig(selectedNode.id, { title: e.target.value })
                  }
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#71717a] mb-1">
                  Description / Note
                </label>
                <input
                  type="text"
                  value={selectedNode.subtitle}
                  onChange={(e) =>
                    handleUpdateNodeConfig(selectedNode.id, { subtitle: e.target.value })
                  }
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                />
              </div>
            </div>

            {/* Type Specific Fields */}
            {selectedNode.type === 'trigger' && (
              <div className="space-y-3 pt-3 border-t border-[#27272a]">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  Trigger Filter
                </span>
                <div>
                  <label className="block text-[10px] text-[#a1a1aa] mb-1">
                    Match Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={selectedNode.config.keyword || ''}
                    placeholder="e.g. DEMO, PRICING, VIP"
                    onChange={(e) =>
                      handleUpdateNodeConfig(selectedNode.id, {
                        config: { ...selectedNode.config, keyword: e.target.value },
                        subtitle: `Keywords: ${e.target.value}`,
                      })
                    }
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            )}

            {selectedNode.type === 'condition' && (
              <div className="space-y-3 pt-3 border-t border-[#27272a]">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  Branching Rule
                </span>
                <div>
                  <label className="block text-[10px] text-[#a1a1aa] mb-1">
                    If message contains string
                  </label>
                  <input
                    type="text"
                    value={selectedNode.config.conditionValue || ''}
                    placeholder="e.g. ENTERPRISE"
                    onChange={(e) =>
                      handleUpdateNodeConfig(selectedNode.id, {
                        config: { ...selectedNode.config, conditionValue: e.target.value },
                        subtitle: `If contains "${e.target.value}"`,
                      })
                    }
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            )}

            {selectedNode.type === 'action' && (
              <div className="space-y-3 pt-3 border-t border-[#27272a]">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  Action Parameters
                </span>

                <div>
                  <label className="block text-[10px] text-[#a1a1aa] mb-1">
                    Action Type
                  </label>
                  <select
                    value={selectedNode.config.actionType || 'send_message'}
                    onChange={(e) =>
                      handleUpdateNodeConfig(selectedNode.id, {
                        config: {
                          ...selectedNode.config,
                          actionType: e.target.value as any,
                        },
                      })
                    }
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                  >
                    <option value="send_message">Send WhatsApp Text</option>
                    <option value="send_template">Send Meta Approved Template</option>
                    <option value="add_tag">Add Contact Tag</option>
                    <option value="create_deal">Create Pipeline Deal</option>
                  </select>
                </div>

                {selectedNode.config.actionType === 'send_template' && (
                  <div>
                    <label className="block text-[10px] text-[#a1a1aa] mb-1">
                      Meta Template
                    </label>
                    <select
                      value={selectedNode.config.templateName || templates[0]?.name}
                      onChange={(e) =>
                        handleUpdateNodeConfig(selectedNode.id, {
                          config: { ...selectedNode.config, templateName: e.target.value },
                          subtitle: `Template: ${e.target.value}`,
                        })
                      }
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                    >
                      {templates.map((tpl) => (
                        <option key={tpl.id} value={tpl.name}>
                          {tpl.name} ({tpl.category})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedNode.config.actionType === 'send_message' && (
                  <div>
                    <label className="block text-[10px] text-[#a1a1aa] mb-1">
                      Message Content (Supports variables)
                    </label>
                    <textarea
                      rows={3}
                      value={selectedNode.config.messageBody || ''}
                      onChange={(e) =>
                        handleUpdateNodeConfig(selectedNode.id, {
                          config: { ...selectedNode.config, messageBody: e.target.value },
                          subtitle: `Text: "${e.target.value.slice(0, 30)}..."`,
                        })
                      }
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] p-2 text-xs text-white focus:outline-none focus:border-foreground resize-none"
                    />
                  </div>
                )}

                {selectedNode.config.actionType === 'add_tag' && (
                  <div>
                    <label className="block text-[10px] text-[#a1a1aa] mb-1">
                      Tag Name
                    </label>
                    <input
                      type="text"
                      value={selectedNode.config.tagName || ''}
                      placeholder="e.g. VIP Enterprise"
                      onChange={(e) =>
                        handleUpdateNodeConfig(selectedNode.id, {
                          config: { ...selectedNode.config, tagName: e.target.value },
                          subtitle: `Assign tag: ${e.target.value}`,
                        })
                      }
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                    />
                  </div>
                )}

                {selectedNode.config.actionType === 'create_deal' && (
                  <>
                    <div>
                      <label className="block text-[10px] text-[#a1a1aa] mb-1">
                        Deal Title
                      </label>
                      <input
                        type="text"
                        value={selectedNode.config.dealTitle || ''}
                        placeholder="e.g. Enterprise License"
                        onChange={(e) =>
                          handleUpdateNodeConfig(selectedNode.id, {
                            config: { ...selectedNode.config, dealTitle: e.target.value },
                          })
                        }
                        className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#a1a1aa] mb-1">
                        Deal Value ($)
                      </label>
                      <input
                        type="number"
                        value={selectedNode.config.dealValue || 10000}
                        onChange={(e) =>
                          handleUpdateNodeConfig(selectedNode.id, {
                            config: {
                              ...selectedNode.config,
                              dealValue: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full bg-[#18181b] border border-[#27272a] rounded-[3px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Variable Helper Chips */}
            <div className="pt-3 border-t border-[#27272a] space-y-1.5">
              <span className="text-[10px] uppercase text-[#71717a] block">
                Available Variables
              </span>
              <div className="flex flex-wrap gap-1">
                {['{{contact.name}}', '{{contact.phone}}', '{{deal.value}}'].map((chip) => (
                  <span
                    key={chip}
                    className="text-[9px] px-1.5 py-0.5 rounded-[2px] bg-[#18181b] border border-[#27272a] text-[#a1a1aa]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Delete Node Action */}
            <div className="pt-4 border-t border-[#27272a] mt-auto">
              <button
                onClick={() => handleDeleteNode(selectedNode.id)}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[3px] border border-red-900/40 bg-red-950/20 hover:bg-red-950/40 text-red-400 text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Node</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Execution Console Terminal Drawer (Bottom) */}
      {isConsoleOpen && (
        <div className="h-44 border-t border-[#27272a] bg-[#0d0d0f] flex flex-col shrink-0 font-mono text-[11px] z-30">
          <div className="h-8 border-b border-[#27272a] px-4 flex items-center justify-between text-[#71717a] bg-[#121214]">
            <div className="flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-foreground" />
              <span className="text-[10px] uppercase tracking-wider text-white">
                Live Execution Console
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#18181b] text-foreground">
                {consoleLogs.length} events
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setConsoleLogs([])}
                className="hover:text-white text-[10px]"
              >
                Clear
              </button>
              <button
                onClick={() => setIsConsoleOpen(false)}
                className="hover:text-white text-[10px]"
              >
                ✕ Close
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1 select-text">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-[#52525b] shrink-0">{log.time}</span>
                <span
                  className={`px-1 py-0.2 rounded-[1px] text-[9px] uppercase tracking-wider shrink-0 ${
                    log.level === 'SUCCESS'
                      ? 'bg-foreground text-background font-bold'
                      : log.level === 'TRIGGER'
                      ? 'bg-[#27272a] text-foreground'
                      : 'bg-[#18181b] text-[#a1a1aa]'
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-[#e4e4e7] truncate">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Node Palette Modal */}
      {isPaletteOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121214] border border-[#27272a] rounded-[4px] p-5 shadow-none space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-foreground" />
                <h3 className="text-xs uppercase tracking-wider font-semibold text-white">
                  Add Node to Workflow
                </h3>
              </div>
              <button
                onClick={() => setIsPaletteOpen(false)}
                className="text-[#71717a] hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Triggers */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  Triggers
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleAddNode(
                        'trigger',
                        'Inbound WhatsApp Message',
                        'Catches incoming customer chat',
                        { event: 'new_message_received' }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        Inbound Message
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">
                      Any new WhatsApp message
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleAddNode(
                        'trigger',
                        'Keyword Matcher',
                        'When text matches specific words',
                        { event: 'keyword_match', keyword: 'DEMO' }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        Keyword Filter
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">
                      Matches DEMO, PRICING, etc.
                    </p>
                  </button>
                </div>
              </div>

              {/* Logic & AI */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  Logic & Routing
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleAddNode(
                        'condition',
                        'Condition (If / Else)',
                        'Branch by customer response',
                        {
                          conditionField: 'message.text',
                          conditionOperator: 'contains',
                          conditionValue: 'YES',
                        }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <GitBranch className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        If / Else Condition
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">
                      Dual branch: True or False
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleAddNode(
                        'ai',
                        'AI Smart Intent Triage',
                        'Classifies sentiment & routing',
                        { actionType: 'ai_classify' }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        AI Intent Triage
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">
                      Smart NLP categorization
                    </p>
                  </button>
                </div>
              </div>

              {/* WhatsApp Actions */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  WhatsApp Actions
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleAddNode(
                        'action',
                        'Send WhatsApp Text',
                        'Instant auto-response message',
                        {
                          actionType: 'send_message',
                          messageBody:
                            'Thank you for contacting us! How can we assist you today?',
                        }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        Send Message
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">Direct text reply</p>
                  </button>

                  <button
                    onClick={() =>
                      handleAddNode(
                        'action',
                        'Send Meta Template',
                        'Official approved WhatsApp template',
                        {
                          actionType: 'send_template',
                          templateName: 'product_update_v2',
                        }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        Send Template
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">
                      Pre-approved Meta template
                    </p>
                  </button>
                </div>
              </div>

              {/* CRM Actions */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase text-[#71717a] block">
                  CRM & Integrations
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleAddNode(
                        'action',
                        'Add Contact Tag',
                        'Assigns tag to sender profile',
                        {
                          actionType: 'add_tag',
                          tagName: 'VIP Enterprise',
                        }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <TagIcon className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        Assign Tag
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">Tag customer in CRM</p>
                  </button>

                  <button
                    onClick={() =>
                      handleAddNode(
                        'webhook',
                        'Dispatch Webhook',
                        'POST payload to external URL',
                        {
                          actionType: 'webhook',
                          webhookUrl: 'https://api.internal/webhook',
                        }
                      )
                    }
                    className="p-2.5 rounded-[3px] bg-[#18181b] border border-[#27272a] hover:border-foreground text-left transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Globe className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-xs font-semibold text-white">
                        HTTP Webhook
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a]">Post to external API</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
