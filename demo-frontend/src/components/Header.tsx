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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-foreground hover:bg-foreground/90 text-background text-xs font-mono font-medium shadow-none transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        )}

        {activeTab === 'pipelines' && (
          <button
            onClick={onOpenNewDeal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-foreground hover:bg-foreground/90 text-background text-xs font-mono font-medium shadow-none transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Deal</span>
          </button>
        )}

        <div className="h-4 w-[1px] bg-[#27272a] mx-1" />

        {/* User Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#18181b] border border-[#27272a] text-xs font-mono">
          <div className="w-5 h-5 rounded-[2px] bg-muted border border-border text-foreground font-semibold flex items-center justify-center text-[10px]">
            DA
          </div>
          <span className="text-[#e4e4e7] font-medium hidden sm:inline">Demo Admin</span>
        </div>
      </div>
    </header>
  )
}
