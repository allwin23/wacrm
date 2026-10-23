'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useDemo } from '@/lib/demo-context'
import {
  Search,
  CheckCheck,
  Send,
  Sparkles,
  Phone,
  Mail,
  Building,
  Tag as TagIcon,
  Clock,
  MoreVertical,
  Paperclip,
  Smile,
  Zap,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from 'lucide-react'

export function InboxView() {
  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    deals,
    quickReplies,
    templates,
  } = useDemo()

  const [filter, setFilter] = useState<'all' | 'open' | 'pending' | 'closed'>('all')
  const [search, setSearch] = useState('')
  const [inputText, setInputText] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0]

  const activeMessages = activeConv ? messages[activeConv.id] || [] : []
  const activeDeal = deals.find((d) => d.contact_id === activeConv?.contact.id)

  const filteredConversations = conversations.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const matchName = c.contact.name.toLowerCase().includes(q)
      const matchPhone = c.contact.phone.toLowerCase().includes(q)
      const matchMsg = c.last_message_text.toLowerCase().includes(q)
      return matchName || matchPhone || matchMsg
    }
    return true
  })

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeMessages])

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputText.trim() || !activeConv) return

    const text = inputText
    setInputText('')
    setShowQuickReplies(false)
    setShowTemplates(false)

    sendMessage(activeConv.id, text)

    // Simulate "typing..." status for incoming reply
    setTimeout(() => {
      setIsTyping(true)
    }, 600)
    setTimeout(() => {
      setIsTyping(false)
    }, 1500)
  }

  const applyQuickReply = (content: string) => {
    setInputText(content)
    setShowQuickReplies(false)
  }

  const applyTemplate = (body: string) => {
    const filled = body
      .replace('{{1}}', activeConv?.contact.name.split(' ')[0] || 'Customer')
      .replace('{{2}}', 'https://wacrm.io/updates')
    setInputText(filled)
    setShowTemplates(false)
  }

  return (
    <div className="flex-1 flex overflow-hidden h-[calc(100vh-3.5rem)]">
      {/* COLUMN 1: Conversation List */}
      <div className="w-80 border-r border-[#27272a] bg-[#0d0d0f] flex flex-col shrink-0">
        {/* Search & Filter Header */}
        <div className="p-3 border-b border-[#27272a] space-y-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search chats or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#18181b] border border-[#27272a] rounded-[4px] pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#71717a] focus:outline-none focus:border-foreground font-mono"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-1 p-0.5 bg-[#18181b] rounded-[4px] border border-[#27272a]">
            {(['all', 'open', 'pending', 'closed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 py-1 text-[10px] font-mono uppercase rounded-[2px] transition-colors ${
                  filter === tab
                    ? 'bg-[#27272a] text-white font-medium'
                    : 'text-[#71717a] hover:text-[#e4e4e7]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#18181b]">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#71717a]">
              No conversations found
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full text-left p-3 transition-colors flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#18181b] border-l-4 border-l-crimson'
                      : 'hover:bg-[#131316]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className={`w-9 h-9 rounded-[4px] border flex items-center justify-center text-xs font-mono font-medium ${
                      isSelected
                        ? 'bg-crimson/15 border-crimson text-crimson font-bold'
                        : 'bg-[#18181b] border-[#27272a] text-foreground'
                    }`}>
                      {conv.contact.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    {conv.status === 'open' && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-[1px] bg-crimson animate-pulse" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-white truncate">
                        {conv.contact.name}
                      </span>
                      <span className="text-[10px] text-[#71717a] shrink-0 font-mono">
                        {conv.last_message_at}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#a1a1aa] truncate leading-snug">
                      {conv.last_message_text}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      {conv.contact.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded-[2px] border border-[#27272a] bg-[#18181b] text-foreground"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {conv.unread_count > 0 && (
                        <span className="ml-auto text-[9px] font-mono px-1.5 py-0.2 rounded-[2px] bg-crimson text-white font-semibold">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* COLUMN 2: Central WhatsApp Chat Thread */}
      <div className="flex-1 flex flex-col bg-[#09090b] min-w-0">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="h-14 border-b border-[#27272a] bg-[#0d0d0f] px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-[4px] bg-[#18181b] border border-[#27272a] flex items-center justify-center text-xs font-mono font-semibold text-foreground">
                    {activeConv.contact.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-[1px] bg-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-xs font-semibold text-white">
                      {activeConv.contact.name}
                    </h2>
                    <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                    <span className="text-[10px] font-mono text-[#71717a]">
                      {activeConv.contact.phone}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#71717a] flex items-center gap-2">
                    <span>
                      {isTyping ? (
                        <span className="text-foreground animate-pulse font-medium">
                          typing...
                        </span>
                      ) : (
                        'WhatsApp Business • Online'
                      )}
                    </span>
                    <span>•</span>
                    <span>Assigned to {activeConv.assigned_to || 'Unassigned'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-[2px] bg-foreground text-background font-medium">
                  {activeConv.status}
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#09090b]">
              <div className="flex justify-center my-2">
                <span className="text-[10px] font-mono text-[#71717a] bg-[#18181b] px-2.5 py-0.5 rounded-[3px] border border-[#27272a]">
                  WhatsApp End-to-End Encrypted Session
                </span>
              </div>

              {activeMessages.map((msg) => {
                const isAgent = msg.sender_type === 'agent'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-[4px] p-3 text-xs leading-relaxed shadow-none ${
                        isAgent
                          ? 'bg-[#222226] border border-[#2e2e33] text-foreground'
                          : 'bg-[#18181b] border border-[#27272a] text-[#f4f4f5]'
                      }`}
                    >
                      <p>{msg.content_text}</p>
                      <div
                        className="flex items-center gap-1 mt-1.5 text-[9px] font-mono justify-end text-[#71717a]"
                      >
                        <span>{msg.created_at}</span>
                        {isAgent && <CheckCheck className="w-3.5 h-3.5 text-foreground" />}
                      </div>
                    </div>
                  </div>
                )
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-[#71717a] p-2 bg-[#18181b] w-fit rounded-[3px] border border-[#27272a]">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-[0.5px] animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-foreground rounded-[0.5px] animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-foreground rounded-[0.5px] animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply & Template Popovers */}
            {showQuickReplies && (
              <div className="px-4 py-2 border-t border-[#27272a] bg-[#121214] max-h-40 overflow-y-auto">
                <div className="text-[11px] font-medium text-[#71717a] mb-1.5 flex items-center justify-between">
                  <span>Quick Replies (Click to insert)</span>
                  <button
                    onClick={() => setShowQuickReplies(false)}
                    className="hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.id}
                      onClick={() => applyQuickReply(qr.content)}
                      className="w-full text-left p-1.5 rounded-[3px] hover:bg-[#18181b] text-xs text-[#e4e4e7] flex items-center gap-2 border border-transparent hover:border-[#27272a]"
                    >
                      <span className="font-mono text-crimson font-bold text-[10px]">
                        {qr.shortcut}
                      </span>
                      <span className="truncate text-[11px] font-mono text-[#a1a1aa]">
                        {qr.content}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showTemplates && (
              <div className="px-4 py-2 border-t border-[#27272a] bg-[#121214] max-h-40 overflow-y-auto">
                <div className="text-[11px] font-mono text-[#71717a] mb-1.5 flex items-center justify-between">
                  <span>META APPROVED TEMPLATES</span>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl.body_text)}
                      className="w-full text-left p-1.5 rounded-[3px] hover:bg-[#18181b] text-xs text-[#e4e4e7] border border-transparent hover:border-[#27272a]"
                    >
                      <div className="font-mono font-bold text-crimson text-[10px]">
                        {tpl.name} • {tpl.category}
                      </div>
                      <div className="truncate text-[11px] font-mono text-[#a1a1aa]">
                        {tpl.body_text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Composer */}
            <div className="p-3 border-t border-[#27272a] bg-[#0d0d0f]">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuickReplies(!showQuickReplies)
                    setShowTemplates(false)
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-[3px] text-[11px] font-mono text-[#a1a1aa] hover:text-white bg-[#18181b] border border-[#27272a]"
                >
                  <Zap className="w-3 h-3 text-foreground" />
                  <span>Quick Replies</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTemplates(!showTemplates)
                    setShowQuickReplies(false)
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-[3px] text-[11px] font-mono text-[#a1a1aa] hover:text-white bg-[#18181b] border border-[#27272a]"
                >
                  <Sparkles className="w-3 h-3 text-foreground" />
                  <span>Templates</span>
                </button>
              </div>

              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a WhatsApp message or type /for quick replies..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-[#18181b] border border-[#27272a] rounded-[4px] px-3 py-2 text-xs text-white placeholder-[#71717a] focus:outline-none focus:border-foreground"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-3.5 py-2 rounded-[4px] bg-crimson hover:bg-crimson-hover disabled:opacity-40 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors shadow-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs font-mono text-[#71717a]">
            Select a conversation to begin chatting
          </div>
        )}
      </div>

      {/* COLUMN 3: Contact CRM Profile Sidebar */}
      {activeConv && (
        <div className="w-72 border-l border-[#27272a] bg-[#0d0d0f] flex flex-col shrink-0 overflow-y-auto p-4 space-y-4">
          <div className="text-center pb-4 border-b border-[#27272a]">
            <div className="w-14 h-14 rounded-[4px] bg-[#18181b] border border-[#27272a] flex items-center justify-center text-sm font-mono font-semibold text-foreground mx-auto mb-2">
              {activeConv.contact.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <h3 className="text-sm font-semibold text-white">
              {activeConv.contact.name}
            </h3>
            <p className="text-[11px] text-[#71717a] font-mono">
              {activeConv.contact.phone}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">
              Contact Details
            </span>

            {activeConv.contact.email && (
              <div className="flex items-center gap-2 text-[#e4e4e7]">
                <Mail className="w-3.5 h-3.5 text-[#71717a]" />
                <span className="truncate">{activeConv.contact.email}</span>
              </div>
            )}

            {activeConv.contact.custom_fields.Company && (
              <div className="flex items-center gap-2 text-[#e4e4e7]">
                <Building className="w-3.5 h-3.5 text-[#71717a]" />
                <span>{activeConv.contact.custom_fields.Company}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-[#e4e4e7]">
              <Clock className="w-3.5 h-3.5 text-[#71717a]" />
              <span>Subscribed Sep 2026</span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2 pt-2 border-t border-[#27272a]">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">
              Assigned Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeConv.contact.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-[#27272a] bg-[#18181b] text-foreground"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Associated Pipeline Deal */}
          <div className="space-y-2 pt-2 border-t border-[#27272a]">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">
              Pipeline Deal
            </span>
            {activeDeal ? (
              <div className="p-2.5 rounded-[4px] bg-[#18181b] border border-[#27272a] space-y-1">
                <div className="text-xs font-medium text-white truncate">
                  {activeDeal.title}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-crimson font-mono font-bold text-sm">
                    ${activeDeal.value.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-crimson uppercase px-1.5 py-0.2 rounded bg-crimson/10 border border-crimson/30">
                    {activeDeal.status}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-[#71717a] italic">
                No open deal for this contact
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1.5 pt-2 border-t border-[#27272a]">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">
              Internal Notes
            </span>
            <p className="text-[11px] font-mono text-[#a1a1aa] bg-[#18181b] p-2.5 rounded-[4px] border border-[#27272a] leading-relaxed">
              {activeConv.contact.notes || 'No notes added yet.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
