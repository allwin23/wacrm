'use client'

import React from 'react'
import { useDemo } from '@/lib/demo-context'
import { Sparkles, MessageSquare, Plus, Bell } from 'lucide-react'

export function Header({ onOpenNewContact, onOpenNewDeal }: { onOpenNewContact?: () => void; onOpenNewDeal?: () => void }) {
  const { activeTab, setActiveTab } = useDemo()

  const titles: Record<string, { title: string; subtitle: string }> = {
    inbox: { title: 'Shared Inbox', subtitle: 'Real-time multi-agent WhatsApp conversation desk' },
    dashboard: { title: 'Analytics Dashboard', subtitle: 'Performance metrics, conversation trends, and pipeline overview' },
    contacts: { title: 'Contact Directory', subtitle: 'Manage WhatsApp subscribers, custom attributes, and segments' },
    pipelines: { title: 'Sales Pipeline', subtitle: 'Kanban board for closing deals originating from WhatsApp' },
    broadcasts: { title: 'Broadcast Campaigns', subtitle: 'Outbound WhatsApp notifications and delivery analytics' },
    automations: { title: 'Automations & Flows', subtitle: 'Trigger-based workflows and auto-responders' },
    settings: { title: 'Settings', subtitle: 'Meta WhatsApp Cloud API configuration and team members' },
  }

  const current = titles[activeTab] || { title: 'WACRM Demo', subtitle: 'WhatsApp CRM' }

  return (
    <header className="h-14 border-b border-[#27272a] bg-[#0d0d0f] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-sm font-semibold text-white tracking-tight">{current.title}</h1>
          <p className="text-[11px] font-mono text-[#71717a] hidden sm:block">{current.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {activeTab === 'contacts' && (
          <button
            onClick={onOpenNewContact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-crimson hover:bg-crimson-hover text-white text-xs font-mono font-bold shadow-md shadow-crimson/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        )}

        {activeTab === 'pipelines' && (
          <button
            onClick={onOpenNewDeal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-crimson hover:bg-crimson-hover text-white text-xs font-mono font-bold shadow-md shadow-crimson/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Deal</span>
          </button>
        )}

        <div className="h-4 w-[1px] bg-[#27272a] mx-1" />

        {/* Notifications Icon with Crimson Accent Dot */}
        <div className="relative p-1.5 rounded-[4px] hover:bg-[#18181b] cursor-pointer text-crimson hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-[0.5px] bg-crimson shadow-sm shadow-crimson" />
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#18181b] border border-crimson/40 text-xs font-mono">
          <div className="w-5 h-5 rounded-[2px] bg-crimson/20 border border-crimson/50 text-crimson font-bold flex items-center justify-center text-[10px]">
            DA
          </div>
          <span className="text-[#e4e4e7] font-medium hidden sm:inline">Demo Admin</span>
        </div>
      </div>
    </header>
  )
}
