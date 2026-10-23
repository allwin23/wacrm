'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  Contact,
  Conversation,
  Message,
  DealStage,
  Deal,
  Broadcast,
  Automation,
  QuickReply,
  Template,
} from './types'
import {
  INITIAL_CONTACTS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_STAGES,
  INITIAL_DEALS,
  INITIAL_BROADCASTS,
  INITIAL_AUTOMATIONS,
  INITIAL_QUICK_REPLIES,
  INITIAL_TEMPLATES,
} from './seed-data'

interface DemoContextType {
  contacts: Contact[]
  conversations: Conversation[]
  messages: Record<string, Message[]>
  stages: DealStage[]
  deals: Deal[]
  broadcasts: Broadcast[]
  automations: Automation[]
  quickReplies: QuickReply[]
  templates: Template[]
  activeConversationId: string
  activeTab: string
  setActiveConversationId: (id: string) => void
  setActiveTab: (tab: string) => void
  sendMessage: (conversationId: string, text: string) => void
  addContact: (contact: Partial<Contact>) => void
  moveDeal: (dealId: string, targetStageId: string) => void
  createDeal: (deal: Partial<Deal>) => void
  toggleAutomation: (id: string) => void
  createBroadcast: (broadcast: Partial<Broadcast>) => void
  resetToDefault: () => void
}

const DemoContext = createContext<DemoContextType | null>(null)

const STORAGE_KEY = 'wacrm_demo_state_v1'

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS)
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES)
  const [stages] = useState<DealStage[]>(INITIAL_STAGES)
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS)
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>(INITIAL_BROADCASTS)
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS)
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1')
  const [activeTab, setActiveTab] = useState<string>('inbox')
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.contacts) setContacts(parsed.contacts)
        if (parsed.conversations) setConversations(parsed.conversations)
        if (parsed.messages) setMessages(parsed.messages)
        if (parsed.deals) setDeals(parsed.deals)
        if (parsed.broadcasts) setBroadcasts(parsed.broadcasts)
        if (parsed.automations) setAutomations(parsed.automations)
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true)
  }, [])

  // Sync to LocalStorage
  useEffect(() => {
    if (!isLoaded) return
    try {
      const state = {
        contacts,
        conversations,
        messages,
        deals,
        broadcasts,
        automations,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Ignore quota errors
    }
  }, [contacts, conversations, messages, deals, broadcasts, automations, isLoaded])

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const newMsg: Message = {
      id: 'msg-' + Date.now(),
      conversation_id: conversationId,
      sender_type: 'agent',
      sender_id: 'admin',
      message_type: 'text',
      content_text: text,
      media_url: null,
      status: 'delivered',
      created_at: timeStr,
    }

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }))

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              last_message_at: 'Just now',
              last_message_text: text,
            }
          : c
      )
    )

    // Simulate realistic auto-reply after 1.5 seconds
    setTimeout(() => {
      const replies = [
        'Thanks for the quick update! That sounds good to us.',
        'Got it. I will share this with our executive team right away.',
        'Perfect, looking forward to our next milestone.',
        'Thanks! Could you also send over the API documentation for this feature?',
        'Received, appreciate the prompt reply!',
      ]
      const randomReply = replies[Math.floor(Math.random() * replies.length)]

      const replyMsg: Message = {
        id: 'msg-' + (Date.now() + 1),
        conversation_id: conversationId,
        sender_type: 'customer',
        sender_id: null,
        message_type: 'text',
        content_text: randomReply,
        media_url: null,
        status: 'read',
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), replyMsg],
      }))

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                unread_count: 0,
                last_message_at: 'Just now',
                last_message_text: randomReply,
              }
            : c
        )
      )
    }, 1500)
  }

  const addContact = (data: Partial<Contact>) => {
    const newContact: Contact = {
      id: 'cnt-' + Date.now(),
      name: data.name || 'New Customer',
      phone: data.phone || '+1 (555) 000-0000',
      email: data.email || null,
      avatar_url: null,
      notes: data.notes || '',
      custom_fields: data.custom_fields || { Company: 'New Account', Region: 'Global' },
      tags: data.tags || [INITIAL_TAGS[2]],
      created_at: new Date().toISOString(),
    }

    setContacts((prev) => [newContact, ...prev])

    // Also create conversation for new contact
    const newConv: Conversation = {
      id: 'conv-' + Date.now(),
      contact_id: newContact.id,
      status: 'open',
      unread_count: 0,
      last_message_at: 'Just now',
      last_message_text: 'Contact created',
      assigned_to: 'Demo Admin',
      created_at: new Date().toISOString(),
      contact: newContact,
    }

    setConversations((prev) => [newConv, ...prev])
    setMessages((prev) => ({
      ...prev,
      [newConv.id]: [
        {
          id: 'msg-' + Date.now(),
          conversation_id: newConv.id,
          sender_type: 'agent',
          sender_id: 'admin',
          message_type: 'text',
          content_text: 'Hello ' + newContact.name + ', welcome to our WhatsApp CRM!',
          media_url: null,
          status: 'delivered',
          created_at: 'Just now',
        },
      ],
    }))
    setActiveConversationId(newConv.id)
  }

  const moveDeal = (dealId: string, targetStageId: string) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? {
              ...d,
              stage_id: targetStageId,
              status: targetStageId === 'stg-5' ? 'won' : 'open',
            }
          : d
      )
    )
  }

  const createDeal = (data: Partial<Deal>) => {
    const targetContact = contacts.find((c) => c.id === data.contact_id) || contacts[0]
    const newDeal: Deal = {
      id: 'deal-' + Date.now(),
      pipeline_id: 'pipe-1',
      stage_id: data.stage_id || 'stg-1',
      title: data.title || 'New Deal Opportunity',
      value: Number(data.value) || 10000,
      currency: 'USD',
      contact_id: targetContact.id,
      status: 'open',
      position: 0,
      created_at: new Date().toISOString(),
      contact: targetContact,
    }
    setDeals((prev) => [newDeal, ...prev])
  }

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_active: !a.is_active } : a))
    )
  }

  const createBroadcast = (data: Partial<Broadcast>) => {
    const newBroadcast: Broadcast = {
      id: 'bc-' + Date.now(),
      name: data.name || 'New Campaign',
      template_name: data.template_name || 'product_update_v2',
      status: 'scheduled',
      total_recipients: Number(data.total_recipients) || 500,
      sent_count: 0,
      delivered_count: 0,
      read_count: 0,
      failed_count: 0,
      created_at: new Date().toISOString(),
    }
    setBroadcasts((prev) => [newBroadcast, ...prev])
  }

  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setContacts(INITIAL_CONTACTS)
    setConversations(INITIAL_CONVERSATIONS)
    setMessages(INITIAL_MESSAGES)
    setDeals(INITIAL_DEALS)
    setBroadcasts(INITIAL_BROADCASTS)
    setAutomations(INITIAL_AUTOMATIONS)
    setActiveConversationId('conv-1')
  }

  return (
    <DemoContext.Provider
      value={{
        contacts,
        conversations,
        messages,
        stages,
        deals,
        broadcasts,
        automations,
        quickReplies: INITIAL_QUICK_REPLIES,
        templates: INITIAL_TEMPLATES,
        activeConversationId,
        activeTab,
        setActiveConversationId,
        setActiveTab,
        sendMessage,
        addContact,
        moveDeal,
        createDeal,
        toggleAutomation,
        createBroadcast,
        resetToDefault,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider')
  }
  return context
}
