'use client'

import React from 'react'
import { useDemo } from '@/lib/demo-context'
import {
  CheckCircle2,
  Shield,
  Smartphone,
  Users,
  Key,
  RefreshCw,
  Sparkles,
} from 'lucide-react'

export function SettingsView() {
  const { resetToDefault } = useDemo()

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b] max-w-4xl">
      <div>
        <h2 className="text-base font-semibold text-white">Platform Settings</h2>
        <p className="text-xs text-[#71717a]">
          WhatsApp Cloud API configuration, registered phone numbers, and workspace team members
        </p>
      </div>

      {/* Meta WhatsApp Connection Card */}
      <div className="p-5 rounded-lg bg-[#121214] border border-[#27272a] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-xs font-semibold text-white">Meta WhatsApp Cloud API</h3>
              <p className="text-[11px] text-[#71717a]">Official Meta Graph API v21.0 integration</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded bg-[#18181b] border border-[#27272a] space-y-1">
            <span className="text-[10px] text-[#71717a]">Phone Number</span>
            <div className="font-mono font-medium text-white flex items-center gap-1.5">
              +1 (555) 019-8374
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          <div className="p-3 rounded bg-[#18181b] border border-[#27272a] space-y-1">
            <span className="text-[10px] text-[#71717a]">Verified Display Name</span>
            <div className="font-medium text-white">TechCorp Support</div>
          </div>

          <div className="p-3 rounded bg-[#18181b] border border-[#27272a] space-y-1">
            <span className="text-[10px] text-[#71717a]">Quality Rating</span>
            <div className="font-medium text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              High (Green)
            </div>
          </div>

          <div className="p-3 rounded bg-[#18181b] border border-[#27272a] space-y-1">
            <span className="text-[10px] text-[#71717a]">Webhook Signature</span>
            <div className="font-mono text-[#a1a1aa] truncate">
              HMAC-SHA256 • Verified 200 OK
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="p-5 rounded-lg bg-[#121214] border border-[#27272a] space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold text-white">Workspace Members</h3>
        </div>

        <div className="divide-y divide-[#27272a] border border-[#27272a] rounded-md overflow-hidden text-xs">
          <div className="p-3 bg-[#18181b] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                DA
              </div>
              <div>
                <span className="font-medium text-white">Demo Admin</span>
                <span className="text-[11px] text-[#71717a] ml-2">demo@wacrm.local</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Workspace Owner
            </span>
          </div>

          <div className="p-3 bg-[#18181b] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                JA
              </div>
              <div>
                <span className="font-medium text-white">Jessica Agent</span>
                <span className="text-[11px] text-[#71717a] ml-2">agent@wacrm.local</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Support Agent
            </span>
          </div>
        </div>
      </div>

      {/* Demo Seed Reset */}
      <div className="p-5 rounded-lg bg-[#121214] border border-[#27272a] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold text-white">Demo Environment Controls</h3>
        </div>
        <p className="text-[11px] text-[#71717a]">
          This demo frontend runs completely client-side in the browser. Messages you send and deals you move are stored in your browser's local state. Click below anytime to return to the original seed data.
        </p>

        <button
          onClick={() => {
            if (confirm('Reset all demo conversations, deals, and contacts back to default?')) {
              resetToDefault()
            }
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#18181b] hover:bg-[#27272a] text-white border border-[#27272a] text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Reset All Demo State to Default</span>
        </button>
      </div>
    </div>
  )
}
