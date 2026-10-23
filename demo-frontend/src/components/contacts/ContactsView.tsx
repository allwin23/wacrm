'use client'

import React, { useState } from 'react'
import { useDemo } from '@/lib/demo-context'
import {
  Search,
  Plus,
  MessageSquare,
  Building,
  Mail,
  Phone,
  Tag as TagIcon,
  Check,
  X,
} from 'lucide-react'

export function ContactsView({
  isAddModalOpen,
  setIsAddModalOpen,
}: {
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
}) {
  const { contacts, addContact, setActiveConversationId, setActiveTab, conversations } = useDemo()
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Form state
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newCompany, setNewCompany] = useState('')

  const filtered = contacts.filter((c) => {
    if (selectedTag !== 'all' && !c.tags.some((t) => t.id === selectedTag)) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.custom_fields.Company && c.custom_fields.Company.toLowerCase().includes(q))
      )
    }
    return true
  })

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newPhone.trim()) return

    addContact({
      name: newName,
      phone: newPhone,
      email: newEmail || null,
      custom_fields: { Company: newCompany || 'Independent' },
    })

    setNewName('')
    setNewPhone('')
    setNewEmail('')
    setNewCompany('')
    setIsAddModalOpen(false)
    setActiveTab('inbox')
  }

  const handleOpenChat = (contactId: string) => {
    const existing = conversations.find((c) => c.contact_id === contactId)
    if (existing) {
      setActiveConversationId(existing.id)
    }
    setActiveTab('inbox')
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#09090b]">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search contacts, phone, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121214] border border-[#27272a] rounded-md pl-9 pr-3 py-2 text-xs text-white placeholder-[#71717a] focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Contact</span>
        </button>
      </div>

      {/* Contacts Table */}
      <div className="rounded-lg border border-[#27272a] bg-[#121214] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#18181b] border-b border-[#27272a] text-[#71717a]">
            <tr>
              <th className="py-3 px-4 font-medium">Contact</th>
              <th className="py-3 px-4 font-medium">WhatsApp Number</th>
              <th className="py-3 px-4 font-medium hidden md:table-cell">Company</th>
              <th className="py-3 px-4 font-medium">Tags</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e24] text-[#e4e4e7]">
            {filtered.map((contact) => (
              <tr key={contact.id} className="hover:bg-[#18181b]/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold flex items-center justify-center text-[11px] shrink-0">
                      {contact.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="font-medium text-white">{contact.name}</div>
                      {contact.email && (
                        <div className="text-[11px] text-[#71717a]">{contact.email}</div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4 font-mono text-[#a1a1aa]">{contact.phone}</td>

                <td className="py-3 px-4 hidden md:table-cell text-[#a1a1aa]">
                  {contact.custom_fields.Company || '—'}
                </td>

                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag) => (
                      <span
                        key={tag.id}
                        style={{ borderColor: `${tag.color}40`, color: tag.color }}
                        className="text-[10px] px-1.5 py-0.2 rounded border bg-[#18181b]"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleOpenChat(contact.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#18181b] hover:bg-emerald-500 hover:text-white border border-[#27272a] text-[#e4e4e7] text-[11px] transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-400 group-hover:text-white" />
                    <span>Chat</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121214] border border-[#27272a] rounded-lg p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h3 className="text-sm font-semibold text-white">Add New WhatsApp Contact</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#71717a] hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Hayes"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  WhatsApp Phone (with Country Code) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 987-6543"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jordan@company.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#a1a1aa] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium"
                >
                  Save & Open Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
