'use client'

import React from 'react'
import { useDemo } from '@/lib/demo-context'
import { Workflow, Zap, CheckCircle2, Play, Pause, Clock, ArrowRight } from 'lucide-react'

export function AutomationsView() {
  const { automations, toggleAutomation } = useDemo()

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
      <div>
        <h2 className="text-base font-semibold text-white">Automations & Workflows</h2>
        <p className="text-xs text-[#71717a]">
          No-code triggers that auto-route, auto-tag, and reply to inbound WhatsApp customers 24/7
        </p>
      </div>

      <div className="space-y-3">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className="p-4 rounded-lg bg-[#121214] border border-[#27272a] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-xs font-semibold text-white">{auto.name}</h3>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded font-medium uppercase ${
                    auto.is_active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[#18181b] text-[#71717a] border border-[#27272a]'
                  }`}
                >
                  {auto.is_active ? 'Active' : 'Paused'}
                </span>
              </div>

              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                {auto.description}
              </p>

              <div className="flex items-center gap-4 text-[10px] text-[#71717a] pt-1 font-mono">
                <span>Trigger: {auto.trigger_type}</span>
                <span>•</span>
                <span>Executed {auto.execution_count.toLocaleString()} times</span>
                {auto.last_executed_at && (
                  <>
                    <span>•</span>
                    <span>Last run: {auto.last_executed_at}</span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleAutomation(auto.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  auto.is_active
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-[#18181b] text-[#71717a] border-[#27272a] hover:text-white'
                }`}
              >
                {auto.is_active ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-emerald-400" />
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
        ))}
      </div>
    </div>
  )
}
