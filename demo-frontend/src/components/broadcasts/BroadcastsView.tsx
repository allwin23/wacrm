'use client'

import React, { useState } from 'react'
import { useDemo } from '@/lib/demo-context'
import { Send, Plus, CheckCircle2, Clock, Users, ArrowUpRight } from 'lucide-react'

export function BroadcastsView() {
  const { broadcasts, createBroadcast, templates } = useDemo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [templateName, setTemplateName] = useState(templates[0]?.name || 'product_update_v2')
  const [recipients, setRecipients] = useState('500')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    createBroadcast({
      name,
      template_name: templateName,
      total_recipients: Number(recipients) || 500,
    })

    setName('')
    setIsModalOpen(false)
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">WhatsApp Broadcast Campaigns</h2>
          <p className="text-xs text-[#71717a]">
            Deliver bulk notifications via approved Meta message templates without risk of number bans
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Broadcast</span>
        </button>
      </div>

      {/* Broadcast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {broadcasts.map((bc) => {
          const readRate =
            bc.delivered_count > 0
              ? Math.round((bc.read_count / bc.delivered_count) * 100)
              : 88

          return (
            <div
              key={bc.id}
              className="p-4 rounded-lg bg-[#121214] border border-[#27272a] shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white">{bc.name}</h3>
                  <span className="text-[10px] font-mono text-[#71717a]">
                    Template: {bc.template_name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded capitalize font-medium ${
                    bc.status === 'sent'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : bc.status === 'sending'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      : 'bg-[#27272a] text-[#a1a1aa]'
                  }`}
                >
                  {bc.status}
                </span>
              </div>

              {/* Delivery Stats Bar */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded bg-[#18181b] border border-[#27272a] text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#71717a] block">Target Audience</span>
                  <span className="font-mono font-semibold text-white">
                    {bc.total_recipients.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#71717a] block">Delivered</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {bc.delivered_count.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#71717a] block">Read Rate</span>
                  <span className="font-mono font-semibold text-sky-400">{readRate}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#71717a]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Meta Webhook verified
                </span>
                <span className="font-mono">Created {new Date(bc.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* New Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121214] border border-[#27272a] rounded-lg p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h3 className="text-sm font-semibold text-white">Schedule New Broadcast</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#71717a] hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. November Product Launch"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Meta Message Template
                </label>
                <select
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Recipient Audience Size
                </label>
                <input
                  type="number"
                  required
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium"
                >
                  Schedule Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
