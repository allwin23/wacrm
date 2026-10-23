'use client'

import React from 'react'
import { useDemo } from '@/lib/demo-context'
import { Workflow, Zap, CheckCircle2, Play, Pause, Clock, ArrowRight } from 'lucide-react'

export function AutomationsView() {
  const { automations, toggleAutomation } = useDemo()

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
      <div>
        <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-white">Automations & Workflows</h2>
        <p className="text-xs font-mono text-[#71717a]">
          No-code triggers that auto-route, auto-tag, and reply to inbound WhatsApp customers 24/7
        </p>
      </div>

      <div className="space-y-3">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className="p-4 rounded-[4px] bg-[#121214] border border-[#27272a] shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-foreground shrink-0" />
                <h3 className="text-xs font-semibold text-white">{auto.name}</h3>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-[2px] border border-[#27272a] bg-[#18181b] text-foreground font-medium uppercase tracking-wider">
                  {auto.is_active ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>

              <p className="text-[11px] font-mono text-[#a1a1aa] leading-relaxed">
                {auto.description}
              </p>

              <div className="flex items-center gap-4 text-[10px] text-[#71717a] pt-1 font-mono">
                <span>TRIGGER: {auto.trigger_type}</span>
                <span>•</span>
                <span>EXECUTED: {auto.execution_count.toLocaleString()}</span>
                {auto.last_executed_at && (
                  <>
                    <span>•</span>
                    <span>LAST RUN: {auto.last_executed_at}</span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleAutomation(auto.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium border border-[#27272a] transition-colors ${
                  auto.is_active
                    ? 'bg-[#18181b] text-foreground hover:bg-foreground hover:text-background'
                    : 'bg-[#18181b] text-[#71717a] hover:text-white'
                }`}
              >
                {auto.is_active ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Activate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
