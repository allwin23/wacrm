'use client'

import React, { useState } from 'react'
import { useDemo } from '@/lib/demo-context'
import {
  Plus,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Building,
  CheckCircle2,
  Calendar,
} from 'lucide-react'

export function PipelinesView({
  isAddDealOpen,
  setIsAddDealOpen,
}: {
  isAddDealOpen: boolean
  setIsAddDealOpen: (open: boolean) => void
}) {
  const { stages, deals, moveDeal, createDeal, contacts } = useDemo()

  const [title, setTitle] = useState('')
  const [value, setValue] = useState('10000')
  const [contactId, setContactId] = useState(contacts[0]?.id || '')
  const [stageId, setStageId] = useState(stages[0]?.id || '')

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    createDeal({
      title,
      value: Number(value) || 5000,
      contact_id: contactId,
      stage_id: stageId,
    })

    setTitle('')
    setValue('10000')
    setIsAddDealOpen(false)
  }

  return (
    <div className="flex-1 overflow-x-auto p-6 bg-[#09090b] flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Pipeline Header Summary */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-xs text-[#71717a]">
            Total Pipeline Value:{' '}
            <span className="text-white font-mono font-bold text-sm ml-1 text-emerald-400">
              ${deals.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-[#71717a]">
            Active Deals:{' '}
            <span className="text-white font-mono font-semibold ml-1">{deals.length}</span>
          </div>
        </div>

        <button
          onClick={() => setIsAddDealOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Deal</span>
        </button>
      </div>

      {/* Kanban Columns Grid */}
      <div className="flex-1 flex gap-4 min-w-[1000px] pb-4">
        {stages.map((stage, idx) => {
          const stageDeals = deals.filter((d) => d.stage_id === stage.id)
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0)

          return (
            <div
              key={stage.id}
              className="flex-1 flex flex-col rounded-lg bg-[#121214] border border-[#27272a] overflow-hidden"
            >
              {/* Column Header */}
              <div className="p-3 border-b border-[#27272a] bg-[#18181b]/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-xs font-semibold text-white tracking-tight">
                    {stage.name}
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#27272a] text-[#a1a1aa]">
                    {stageDeals.length}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#a1a1aa]">
                  ${stageTotal.toLocaleString()}
                </span>
              </div>

              {/* Deal Cards Container */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {stageDeals.length === 0 ? (
                  <div className="p-6 text-center text-[11px] text-[#71717a] border border-dashed border-[#27272a] rounded">
                    No deals in this stage
                  </div>
                ) : (
                  stageDeals.map((deal) => {
                    const contact = contacts.find((c) => c.id === deal.contact_id)
                    return (
                      <div
                        key={deal.id}
                        className="p-3 rounded-md bg-[#18181b] border border-[#27272a] shadow-sm hover:border-[#3f3f46] transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-medium text-white leading-tight">
                            {deal.title}
                          </h4>
                          <span className="text-xs font-mono font-semibold text-emerald-400 shrink-0">
                            ${deal.value.toLocaleString()}
                          </span>
                        </div>

                        {contact && (
                          <div className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa]">
                            <Building className="w-3 h-3 text-[#71717a]" />
                            <span className="truncate">
                              {contact.name} • {contact.custom_fields.Company || 'Direct'}
                            </span>
                          </div>
                        )}

                        {/* Move Actions */}
                        <div className="pt-2 border-t border-[#27272a]/80 flex items-center justify-between text-[11px]">
                          {idx > 0 ? (
                            <button
                              onClick={() => moveDeal(deal.id, stages[idx - 1].id)}
                              className="text-[#71717a] hover:text-white flex items-center gap-0.5"
                            >
                              <ChevronLeft className="w-3 h-3" />
                              <span>Back</span>
                            </button>
                          ) : (
                            <span />
                          )}

                          {idx < stages.length - 1 ? (
                            <button
                              onClick={() => moveDeal(deal.id, stages[idx + 1].id)}
                              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-0.5 ml-auto"
                            >
                              <span>Next Stage</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Won
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Deal Modal */}
      {isAddDealOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121214] border border-[#27272a] rounded-lg p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h3 className="text-sm font-semibold text-white">Create New Pipeline Deal</h3>
              <button
                onClick={() => setIsAddDealOpen(false)}
                className="text-[#71717a] hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Deal Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Enterprise License"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Estimated Deal Value ($ USD) *
                </label>
                <input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Associated WhatsApp Contact
                </label>
                <select
                  value={contactId}
                  onChange={(e) => setContactId(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Starting Pipeline Stage
                </label>
                <select
                  value={stageId}
                  onChange={(e) => setStageId(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {stages.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => setIsAddDealOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
