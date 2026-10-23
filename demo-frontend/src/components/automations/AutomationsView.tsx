'use client'

import React, { useState } from 'react'
import { useDemo } from '@/lib/demo-context'
import {
  Workflow,
  Zap,
  CheckCircle2,
  Play,
  Pause,
  Clock,
  ArrowRight,
  Plus,
  GitBranch,
  Layers,
  Sparkles,
} from 'lucide-react'
import { WorkflowBuilder } from './WorkflowBuilder'
import { WorkflowDefinition } from '@/lib/types'

export function AutomationsView() {
  const { automations, toggleAutomation, createAutomationWorkflow } = useDemo()
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null)

  const activeAutomation = automations.find((a) => a.id === activeEditingId)

  // If in builder mode, show the visual n8n workflow editor
  if (activeEditingId && activeAutomation && activeAutomation.workflow) {
    return (
      <WorkflowBuilder
        workflow={activeAutomation.workflow}
        automationId={activeAutomation.id}
        onBack={() => setActiveEditingId(null)}
      />
    )
  }

  const handleCreateNewWorkflow = () => {
    const newId = createAutomationWorkflow(
      'New Inbound WhatsApp Flow',
      'Visual event trigger with automated routing, tagging, and replies.'
    )
    setActiveEditingId(newId)
  }

  const totalRuns = automations.reduce((sum, a) => sum + a.execution_count, 0)
  const activeCount = automations.filter((a) => a.is_active).length

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-white">
              Automations & Workflows
            </h2>
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] border border-[#27272a] bg-[#18181b] text-foreground">
              n8n Visual Engine
            </span>
          </div>
          <p className="text-xs font-mono text-[#71717a]">
            Visual node-canvas workflows that auto-route, auto-tag, and reply to inbound WhatsApp customers 24/7
          </p>
        </div>

        <button
          onClick={handleCreateNewWorkflow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-crimson hover:bg-crimson-hover text-white text-xs font-mono font-medium shadow-none transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-[4px] bg-[#121214] border border-[#27272a] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#71717a]">
            Active Automations
          </span>
          <div className="text-lg font-mono font-bold text-white flex items-center gap-2">
            <span>{activeCount}</span>
            <span className="text-xs font-normal text-[#71717a]">/ {automations.length} total</span>
          </div>
        </div>

        <div className="p-3.5 rounded-[4px] bg-[#121214] border border-[#27272a] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#71717a]">
            Total Executions
          </span>
          <div className="text-lg font-mono font-bold text-crimson">
            {totalRuns.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-[4px] bg-[#121214] border border-[#27272a] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#71717a]">
            Webhook SLA & Reliability
          </span>
          <div className="text-lg font-mono font-bold text-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-[0.5px] bg-foreground/80" />
            <span>99.98%</span>
          </div>
        </div>
      </div>

      {/* Workflow Cards List */}
      <div className="space-y-3">
        {automations.map((auto) => {
          const nodeCount = auto.workflow?.nodes.length || 3

          return (
            <div
              key={auto.id}
              className="p-4 rounded-[4px] bg-[#121214] border border-[#27272a] shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#3f3f46] transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Zap className="w-3.5 h-3.5 text-crimson shrink-0" />
                  <h3 className="text-xs font-semibold text-white">{auto.name}</h3>

                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-[2px] border font-bold uppercase tracking-wider ${
                    auto.is_active
                      ? 'border-crimson bg-crimson text-white shadow-sm shadow-crimson/30'
                      : 'border-[#27272a] bg-[#18181b] text-[#71717a]'
                  }`}>
                    {auto.is_active ? 'ACTIVE' : 'PAUSED'}
                  </span>

                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[2px] border border-crimson/30 bg-crimson/10 text-crimson flex items-center gap-1 font-bold">
                    <Layers className="w-2.5 h-2.5 text-crimson" />
                    <span>{nodeCount} NODES</span>
                  </span>
                </div>

                <p className="text-[11px] font-mono text-[#a1a1aa] leading-relaxed">
                  {auto.description}
                </p>

                <div className="flex items-center gap-4 text-[10px] text-[#71717a] pt-1 font-mono">
                  <span>TRIGGER: {auto.trigger_type}</span>
                  <span>•</span>
                  <span>EXECUTIONS: {auto.execution_count.toLocaleString()}</span>
                  {auto.last_executed_at && (
                    <>
                      <span>•</span>
                      <span>LAST RUN: {auto.last_executed_at}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveEditingId(auto.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-mono font-bold border border-crimson/40 bg-crimson/10 hover:bg-crimson hover:text-white text-crimson transition-colors group shadow-sm shadow-crimson/10"
                >
                  <GitBranch className="w-3.5 h-3.5 text-crimson group-hover:text-white" />
                  <span>Open Flow Builder</span>
                </button>

                <button
                  onClick={() => toggleAutomation(auto.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium border border-[#27272a] transition-colors ${
                    auto.is_active
                      ? 'bg-[#18181b] text-foreground hover:bg-[#27272a]'
                      : 'bg-[#18181b] text-[#71717a] hover:text-white'
                  }`}
                >
                  {auto.is_active ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-foreground" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#71717a]" />
                      <span>Activate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
