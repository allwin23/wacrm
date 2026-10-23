'use client'

import React from 'react'
import {
  MessageSquare,
  Users,
  Kanban,
  Send,
  Workflow,
  LayoutDashboard,
  Settings,
  Sparkles,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'
import { useDemo } from '@/lib/demo-context'

export function Sidebar() {
  const { activeTab, setActiveTab, resetToDefault } = useDemo()

  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: '3' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Users, badge: '8' },
    { id: 'pipelines', label: 'Pipeline', icon: Kanban, badge: '$119.5k' },
    { id: 'broadcasts', label: 'Broadcasts', icon: Send },
    { id: 'automations', label: 'Automations', icon: Workflow },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-[#27272a] bg-[#0d0d0f] flex flex-col justify-between h-screen shrink-0">
      <div>
        {/* Brand / Logo */}
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              WA
            </div>
            <div>
              <div className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                WACRM
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  DEMO
                </span>
              </div>
              <div className="text-[11px] text-[#71717a]">WhatsApp CRM</div>
            </div>
          </div>
        </div>

        {/* WhatsApp Cloud API Connected Pill */}
        <div className="px-3 pt-3">
          <div className="p-2.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-[#e4e4e7]">+1 (555) 019-8374</span>
            </div>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181b]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-[#71717a]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-[#1e1e24] text-[#71717a]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer / Reset Data */}
      <div className="p-3 border-t border-[#27272a] space-y-2">
        <div className="px-2 py-1.5 rounded bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-[#a1a1aa] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Interactive seed data with real-time simulated replies</span>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all demo data back to default state?')) {
              resetToDefault()
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-medium text-[#a1a1aa] hover:text-white hover:bg-[#18181b] border border-[#27272a] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  )
}
