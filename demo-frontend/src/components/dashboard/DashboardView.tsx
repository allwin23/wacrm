'use client'

import React from 'react'
import { useDemo } from '@/lib/demo-context'
import {
  MessageSquare,
  Users,
  Kanban,
  Send,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

export function DashboardView() {
  const { contacts, conversations, deals, broadcasts, setActiveTab } = useDemo()

  const totalDealValue = deals.reduce((sum, d) => sum + d.value, 0)
  const totalRecipients = broadcasts.reduce((sum, b) => sum + b.total_recipients, 0)
  const totalDelivered = broadcasts.reduce((sum, b) => sum + b.delivered_count, 0)
  const deliveryRate = totalRecipients > 0 ? ((totalDelivered / totalRecipients) * 100).toFixed(1) : '99.4'

  const volumeData = [
    { day: 'Mon', count: 184 },
    { day: 'Tue', count: 242 },
    { day: 'Wed', count: 310 },
    { day: 'Thu', count: 275 },
    { day: 'Fri', count: 340 },
    { day: 'Sat', count: 120 },
    { day: 'Sun', count: 95 },
  ]
  const maxVolume = Math.max(...volumeData.map((d) => d.count))

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-lg bg-[#121214] border border-[#27272a] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="text-xs font-medium">Active Conversations</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-white font-mono">
              {conversations.length * 238}
            </span>
            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
          </div>
          <p className="text-[11px] text-[#71717a]">Across 8 WhatsApp agent seats</p>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-lg bg-[#121214] border border-[#27272a] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="text-xs font-medium">Avg Response Time</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-white font-mono">
              1m 45s
            </span>
            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" /> -32s faster
            </span>
          </div>
          <p className="text-[11px] text-[#71717a]">99.1% within 5m SLA threshold</p>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-lg bg-[#121214] border border-[#27272a] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="text-xs font-medium">Pipeline Value</span>
            <Kanban className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-white font-mono">
              ${totalDealValue.toLocaleString()}
            </span>
            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> {deals.length} deals
            </span>
          </div>
          <p className="text-[11px] text-[#71717a]">Originated via WhatsApp chat</p>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-lg bg-[#121214] border border-[#27272a] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="text-xs font-medium">Broadcast Delivery</span>
            <Send className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-white font-mono">
              {deliveryRate}%
            </span>
            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-0.5">
              High Quality
            </span>
          </div>
          <p className="text-[11px] text-[#71717a]">{totalDelivered.toLocaleString()} messages delivered</p>
        </div>
      </div>

      {/* Main Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly Conversation Traffic */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#121214] border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight">
                Weekly Inbound & Outbound Traffic
              </h3>
              <p className="text-[11px] text-[#71717a]">WhatsApp message volume over the last 7 days</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
              Meta Cloud API
            </span>
          </div>

          <div className="h-56 flex items-end gap-3 pt-6 pb-2">
            {volumeData.map((d) => {
              const heightPct = Math.round((d.count / maxVolume) * 100)
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-[#71717a] group-hover:text-emerald-400 transition-colors">
                    {d.count}
                  </span>
                  <div className="w-full bg-[#18181b] rounded-t-sm h-full flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400/80 rounded-t-sm transition-all group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#71717a]">{d.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Col: Quick Shortcuts & Live Status */}
        <div className="p-5 rounded-lg bg-[#121214] border border-[#27272a] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white tracking-tight">
              Quick Actions
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('inbox')}
                className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#1e1e24] border border-[#27272a] text-xs text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Open WhatsApp Inbox</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a]" />
              </button>

              <button
                onClick={() => setActiveTab('pipelines')}
                className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#1e1e24] border border-[#27272a] text-xs text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white">
                  <Kanban className="w-4 h-4 text-indigo-400" />
                  <span>Manage Sales Deals</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a]" />
              </button>

              <button
                onClick={() => setActiveTab('broadcasts')}
                className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#1e1e24] border border-[#27272a] text-xs text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white">
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Schedule Broadcast</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a]" />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-md bg-[#18181b] border border-[#27272a] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#a1a1aa]">Meta Cloud API</span>
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#71717a]">
              <span>Quality Score</span>
              <span className="font-mono text-[#e4e4e7]">HIGH (Green)</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#71717a]">
              <span>Active Tier</span>
              <span className="font-mono text-[#e4e4e7]">Tier 2 (10k/day)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
