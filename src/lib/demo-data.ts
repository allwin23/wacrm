// ============================================================
// COMPREHENSIVE SEED & DEMO DATA STORE FOR WACRM SHOWCASE
// Strict Editorial Monochrome & Utilitarian Minimalism
// Zero backend dependencies — fully interactive in browser & Vercel
// ============================================================

export interface SeedContact {
  id: string
  account_id: string
  name: string
  phone: string
  email: string | null
  avatar_url: string | null
  notes: string | null
  custom_fields: Record<string, string>
  created_at: string
  tags?: { id: string; name: string; color: string }[]
}

export interface SeedConversation {
  id: string
  account_id: string
  contact_id: string
  status: 'open' | 'pending' | 'closed'
  unread_count: number
  last_message_at: string
  last_message_text: string
  assigned_to: string | null
  created_at: string
  contact?: SeedContact
}

export interface SeedMessage {
  id: string
  account_id: string
  conversation_id: string
  sender_type: 'customer' | 'agent' | 'bot'
  sender_id: string | null
  message_type: 'text' | 'image' | 'document' | 'interactive'
  content_text: string
  media_url: string | null
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  ai_generated?: boolean
  created_at: string
}

export interface SeedDeal {
  id: string
  account_id: string
  pipeline_id: string
  stage_id: string
  title: string
  value: number
  currency: string
  contact_id: string
  status: 'open' | 'won' | 'lost'
  position: number
  created_at: string
  updated_at: string
  contact?: SeedContact
}

export interface SeedStage {
  id: string
  pipeline_id: string
  name: string
  color: string
  position: number
}

export interface SeedBroadcast {
  id: string
  account_id: string
  name: string
  template_name: string
  template_id: string | null
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  total_recipients: number
  sent_count: number
  delivered_count: number
  read_count: number
  failed_count: number
  scheduled_for: string | null
  created_at: string
}

export interface SeedAutomation {
  id: string
  account_id: string
  name: string
  description: string
  trigger_type: string
  is_active: boolean
  execution_count: number
  last_executed_at: string | null
  created_at: string
}

export interface SeedTag {
  id: string
  account_id: string
  name: string
  color: string
  created_at: string
}

export const INITIAL_TAGS: SeedTag[] = [
  { id: 'tag-1', account_id: '00000000-0000-0000-0000-000000000001', name: 'VIP', color: '#111111', created_at: '2026-01-01T00:00:00Z' },
  { id: 'tag-2', account_id: '00000000-0000-0000-0000-000000000001', name: 'Enterprise', color: '#404040', created_at: '2026-01-01T00:00:00Z' },
  { id: 'tag-3', account_id: '00000000-0000-0000-0000-000000000001', name: 'Inbound Lead', color: '#737373', created_at: '2026-01-01T00:00:00Z' },
  { id: 'tag-4', account_id: '00000000-0000-0000-0000-000000000001', name: 'Customer', color: '#52525b', created_at: '2026-01-01T00:00:00Z' },
  { id: 'tag-5', account_id: '00000000-0000-0000-0000-000000000001', name: 'Partner', color: '#71717a', created_at: '2026-01-01T00:00:00Z' },
]

export const INITIAL_CONTACTS: SeedContact[] = [
  {
    id: 'cnt-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Sarah Chen',
    phone: '+1 (555) 234-5678',
    email: 'sarah.chen@techcorp.io',
    avatar_url: null,
    notes: 'CTO at TechCorp. Evaluating WhatsApp CRM for their 45-person support team.',
    custom_fields: { Company: 'TechCorp', 'Deal Size': '$12,000/yr', Region: 'North America' },
    created_at: '2026-09-12T14:20:00Z',
    tags: [INITIAL_TAGS[0], INITIAL_TAGS[1]],
  },
  {
    id: 'cnt-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Marcus Vance',
    phone: '+44 20 7946 0912',
    email: 'm.vance@velocitylabs.co.uk',
    avatar_url: null,
    notes: 'Head of Growth. Wants automated outbound broadcasts for webinar invitations.',
    custom_fields: { Company: 'Velocity Labs', 'Deal Size': '$14,000/yr', Region: 'EMEA' },
    created_at: '2026-09-18T10:15:00Z',
    tags: [INITIAL_TAGS[2]],
  },
  {
    id: 'cnt-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Elena Rostova',
    phone: '+49 30 1234567',
    email: 'elena@alpharetail.de',
    avatar_url: null,
    notes: 'E-commerce director. Multi-channel broadcast customer.',
    custom_fields: { Company: 'Alpha Retail GmbH', 'Deal Size': '$8,000/yr', Region: 'DACH' },
    created_at: '2026-08-04T09:00:00Z',
    tags: [INITIAL_TAGS[3]],
  },
  {
    id: 'cnt-4',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Alex Rivera',
    phone: '+1 (555) 876-5432',
    email: 'alex@horizondynamics.com',
    avatar_url: null,
    notes: 'Solution Architect. Integrating webhook triggers with internal billing stack.',
    custom_fields: { Company: 'Horizon Dynamics', Region: 'US West' },
    created_at: '2026-09-25T16:45:00Z',
    tags: [INITIAL_TAGS[4]],
  },
  {
    id: 'cnt-5',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'David Kim',
    phone: '+82 2 3456 7890',
    email: 'david.kim@nexaflow.kr',
    avatar_url: null,
    notes: 'VP of Product. Ready to sign Enterprise tier pending security review.',
    custom_fields: { Company: 'NexaFlow Corp', 'Deal Size': '$32,000/yr', Region: 'APAC' },
    created_at: '2026-10-01T08:30:00Z',
    tags: [INITIAL_TAGS[1]],
  },
  {
    id: 'cnt-6',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Chloe Dupont',
    phone: '+33 1 42 68 55 00',
    email: 'chloe@lumiere.paris',
    avatar_url: null,
    notes: 'Creative studio director. Inquiring about multi-language templates.',
    custom_fields: { Company: 'Lumiere Studio', Region: 'France' },
    created_at: '2026-10-10T11:20:00Z',
    tags: [INITIAL_TAGS[2]],
  },
  {
    id: 'cnt-7',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Mateo Silva',
    phone: '+55 11 98765-4321',
    email: 'mateo@saopaulolog.br',
    avatar_url: null,
    notes: 'Operations Manager. High volume order status updates.',
    custom_fields: { Company: 'SP Logistics', Region: 'LATAM' },
    created_at: '2026-10-12T15:00:00Z',
    tags: [INITIAL_TAGS[3]],
  },
  {
    id: 'cnt-8',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Amara Okafor',
    phone: '+234 802 345 6789',
    email: 'amara@apexgrowth.ng',
    avatar_url: null,
    notes: 'CEO. Scaling sales pipelines and agent performance metrics.',
    custom_fields: { Company: 'Apex Growth', 'Deal Size': '$40,000/yr', Region: 'Africa' },
    created_at: '2026-07-20T12:00:00Z',
    tags: [INITIAL_TAGS[0], INITIAL_TAGS[1]],
  },
]

export const INITIAL_CONTACT_TAGS = [
  { contact_id: 'cnt-1', tag_id: 'tag-1' },
  { contact_id: 'cnt-1', tag_id: 'tag-2' },
  { contact_id: 'cnt-2', tag_id: 'tag-3' },
  { contact_id: 'cnt-3', tag_id: 'tag-4' },
  { contact_id: 'cnt-4', tag_id: 'tag-5' },
  { contact_id: 'cnt-5', tag_id: 'tag-2' },
  { contact_id: 'cnt-6', tag_id: 'tag-3' },
  { contact_id: 'cnt-7', tag_id: 'tag-4' },
  { contact_id: 'cnt-8', tag_id: 'tag-1' },
  { contact_id: 'cnt-8', tag_id: 'tag-2' },
]

export const INITIAL_CONVERSATIONS: SeedConversation[] = [
  {
    id: 'conv-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    contact_id: 'cnt-1',
    status: 'open',
    unread_count: 2,
    last_message_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    last_message_text: "Does 2:00 PM EST work for your team next Tuesday?",
    assigned_to: '00000000-0000-0000-0000-000000000001',
    created_at: '2026-09-12T14:20:00Z',
    contact: INITIAL_CONTACTS[0],
  },
  {
    id: 'conv-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    contact_id: 'cnt-2',
    status: 'open',
    unread_count: 1,
    last_message_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    last_message_text: 'Awesome, testing out the conditional branching now.',
    assigned_to: '00000000-0000-0000-0000-000000000001',
    created_at: '2026-09-18T10:15:00Z',
    contact: INITIAL_CONTACTS[1],
  },
  {
    id: 'conv-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    contact_id: 'cnt-3',
    status: 'pending',
    unread_count: 0,
    last_message_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    last_message_text: 'Understood, thank you for clarifying the Meta tier limits!',
    assigned_to: null,
    created_at: '2026-08-04T09:00:00Z',
    contact: INITIAL_CONTACTS[2],
  },
  {
    id: 'conv-4',
    account_id: '00000000-0000-0000-0000-000000000001',
    contact_id: 'cnt-4',
    status: 'open',
    unread_count: 0,
    last_message_at: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
    last_message_text: 'The new webhook endpoints are working seamlessly with our stack.',
    assigned_to: '00000000-0000-0000-0000-000000000001',
    created_at: '2026-09-25T16:45:00Z',
    contact: INITIAL_CONTACTS[3],
  },
  {
    id: 'conv-5',
    account_id: '00000000-0000-0000-0000-000000000001',
    contact_id: 'cnt-5',
    status: 'closed',
    unread_count: 0,
    last_message_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    last_message_text: 'Looking forward to working together, David!',
    assigned_to: '00000000-0000-0000-0000-000000000001',
    created_at: '2026-10-01T08:30:00Z',
    contact: INITIAL_CONTACTS[4],
  },
  {
    id: 'conv-6',
    account_id: '00000000-0000-0000-0000-000000000001',
    contact_id: 'cnt-6',
    status: 'open',
    unread_count: 2,
    last_message_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    last_message_text: 'Bonjour! Could you also explain how multi-agent assignment works?',
    assigned_to: null,
    created_at: '2026-10-10T11:20:00Z',
    contact: INITIAL_CONTACTS[5],
  },
]

export const INITIAL_MESSAGES: Record<string, SeedMessage[]> = {
  'conv-1': [
    {
      id: 'msg-101',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-1',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Hey! We reviewed the enterprise proposal with our CTO. We'd like to schedule a quick technical demo next Tuesday if possible.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    },
    {
      id: 'msg-102',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-1',
      sender_type: 'agent',
      sender_id: '00000000-0000-0000-0000-000000000001',
      message_type: 'text',
      content_text: "Hi Sarah! That's wonderful to hear. We'd love to walk your engineering team through the architecture, SLA guarantees, and WhatsApp Business API integration.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      id: 'msg-103',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-1',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Does 2:00 PM EST work for your team next Tuesday?",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
  ],
  'conv-2': [
    {
      id: 'msg-201',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-2',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Can we configure custom automated routing rules for incoming contacts from different country codes?",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    },
    {
      id: 'msg-202',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-2',
      sender_type: 'agent',
      sender_id: '00000000-0000-0000-0000-000000000001',
      message_type: 'text',
      content_text: "Yes, absolutely! The visual flow builder supports conditional branching based on phone country prefixes, keyword matches, or contact tags.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      id: 'msg-203',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-2',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Awesome, testing out the conditional branching now.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
  ],
  'conv-3': [
    {
      id: 'msg-301',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-3',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Quick question about the broadcast sending rate limit: does Meta impose tier caps on fresh phone numbers?",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    },
    {
      id: 'msg-302',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-3',
      sender_type: 'agent',
      sender_id: '00000000-0000-0000-0000-000000000001',
      message_type: 'text',
      content_text: "Meta starts new numbers on Tier 1 (1,000 unique contacts/24h) and automatically scales up to Tier 2 (10,000) as you maintain a clean delivery quality score.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    },
    {
      id: 'msg-303',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-3',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Understood, thank you for clarifying the Meta tier limits!",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
  ],
  'conv-4': [
    {
      id: 'msg-401',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-4',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "The new webhook endpoints are working seamlessly with our stack.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
    },
  ],
  'conv-5': [
    {
      id: 'msg-501',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-5',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Thanks for the walkthrough earlier today! We'll sign the order form by EOD.",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 1500).toISOString(),
    },
    {
      id: 'msg-502',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-5',
      sender_type: 'agent',
      sender_id: '00000000-0000-0000-0000-000000000001',
      message_type: 'text',
      content_text: "Looking forward to working together, David!",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    },
  ],
  'conv-6': [
    {
      id: 'msg-601',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-6',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Bonjour! Do you offer French localization in the template?",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'msg-602',
      account_id: '00000000-0000-0000-0000-000000000001',
      conversation_id: 'conv-6',
      sender_type: 'customer',
      sender_id: null,
      message_type: 'text',
      content_text: "Bonjour! Could you also explain how multi-agent assignment works?",
      media_url: null,
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
  ],
}

export const INITIAL_PIPELINES = [
  {
    id: 'pipe-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Sales Pipeline',
    is_default: true,
    created_at: '2026-08-01T00:00:00Z',
  },
]

export const INITIAL_STAGES: SeedStage[] = [
  { id: 'stg-1', pipeline_id: 'pipe-1', name: 'Lead', color: '#111111', position: 0 },
  { id: 'stg-2', pipeline_id: 'pipe-1', name: 'Contacted', color: '#52525b', position: 1 },
  { id: 'stg-3', pipeline_id: 'pipe-1', name: 'Demo Scheduled', color: '#71717a', position: 2 },
  { id: 'stg-4', pipeline_id: 'pipe-1', name: 'Proposal Sent', color: '#a1a1aa', position: 3 },
  { id: 'stg-5', pipeline_id: 'pipe-1', name: 'Closed Won', color: '#d4d4d8', position: 4 },
]

export const INITIAL_DEALS: SeedDeal[] = [
  {
    id: 'deal-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    pipeline_id: 'pipe-1',
    stage_id: 'stg-1',
    title: 'TechCorp Expansion',
    value: 12000,
    currency: 'USD',
    contact_id: 'cnt-1',
    status: 'open',
    position: 0,
    created_at: '2026-09-15T00:00:00Z',
    updated_at: '2026-09-15T00:00:00Z',
    contact: INITIAL_CONTACTS[0],
  },
  {
    id: 'deal-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    pipeline_id: 'pipe-1',
    stage_id: 'stg-1',
    title: 'SP Logistics Route Integration',
    value: 6500,
    currency: 'USD',
    contact_id: 'cnt-7',
    status: 'open',
    position: 1,
    created_at: '2026-10-02T00:00:00Z',
    updated_at: '2026-10-02T00:00:00Z',
    contact: INITIAL_CONTACTS[6],
  },
  {
    id: 'deal-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    pipeline_id: 'pipe-1',
    stage_id: 'stg-2',
    title: 'Velocity Labs Automated Broadcast',
    value: 14000,
    currency: 'USD',
    contact_id: 'cnt-2',
    status: 'open',
    position: 0,
    created_at: '2026-09-20T00:00:00Z',
    updated_at: '2026-09-20T00:00:00Z',
    contact: INITIAL_CONTACTS[1],
  },
  {
    id: 'deal-4',
    account_id: '00000000-0000-0000-0000-000000000001',
    pipeline_id: 'pipe-1',
    stage_id: 'stg-3',
    title: 'Lumiere Studio Team License',
    value: 15000,
    currency: 'USD',
    contact_id: 'cnt-6',
    status: 'open',
    position: 0,
    created_at: '2026-10-11T00:00:00Z',
    updated_at: '2026-10-11T00:00:00Z',
    contact: INITIAL_CONTACTS[5],
  },
  {
    id: 'deal-5',
    account_id: '00000000-0000-0000-0000-000000000001',
    pipeline_id: 'pipe-1',
    stage_id: 'stg-4',
    title: 'NexaFlow 100-Seat Tier',
    value: 32000,
    currency: 'USD',
    contact_id: 'cnt-5',
    status: 'open',
    position: 0,
    created_at: '2026-10-05T00:00:00Z',
    updated_at: '2026-10-05T00:00:00Z',
    contact: INITIAL_CONTACTS[4],
  },
  {
    id: 'deal-6',
    account_id: '00000000-0000-0000-0000-000000000001',
    pipeline_id: 'pipe-1',
    stage_id: 'stg-5',
    title: 'Apex Growth Global Rollout',
    value: 40000,
    currency: 'USD',
    contact_id: 'cnt-8',
    status: 'won',
    position: 0,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    contact: INITIAL_CONTACTS[7],
  },
]

export const INITIAL_BROADCASTS: SeedBroadcast[] = [
  {
    id: 'bc-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Product Update 2.4 Announcement',
    template_name: 'product_update_v2',
    template_id: 'tpl-1',
    status: 'sent',
    total_recipients: 1420,
    sent_count: 1420,
    delivered_count: 1392,
    read_count: 1136,
    failed_count: 28,
    scheduled_for: null,
    created_at: '2026-10-15T10:00:00Z',
  },
  {
    id: 'bc-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'VIP Enterprise Technical Webinar',
    template_name: 'webinar_invite',
    template_id: 'tpl-2',
    status: 'sent',
    total_recipients: 480,
    sent_count: 480,
    delivered_count: 472,
    read_count: 395,
    failed_count: 8,
    scheduled_for: null,
    created_at: '2026-10-18T14:30:00Z',
  },
  {
    id: 'bc-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Q4 Customer Appreciation Offer',
    template_name: 'special_offer_q4',
    template_id: 'tpl-3',
    status: 'sending',
    total_recipients: 850,
    sent_count: 620,
    delivered_count: 605,
    read_count: 442,
    failed_count: 15,
    scheduled_for: null,
    created_at: '2026-10-22T17:00:00Z',
  },
  {
    id: 'bc-4',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'New Onboarding Checklist & Guides',
    template_name: 'onboarding_guide',
    template_id: 'tpl-4',
    status: 'sent',
    total_recipients: 310,
    sent_count: 310,
    delivered_count: 305,
    read_count: 260,
    failed_count: 5,
    scheduled_for: null,
    created_at: '2026-10-05T09:00:00Z',
  },
]

export const INITIAL_BROADCAST_RECIPIENTS = [
  { id: 'bcr-1', broadcast_id: 'bc-1', contact_id: 'cnt-1', status: 'read', error_message: null, created_at: '2026-10-15T10:00:01Z' },
  { id: 'bcr-2', broadcast_id: 'bc-1', contact_id: 'cnt-2', status: 'read', error_message: null, created_at: '2026-10-15T10:00:02Z' },
  { id: 'bcr-3', broadcast_id: 'bc-1', contact_id: 'cnt-3', status: 'delivered', error_message: null, created_at: '2026-10-15T10:00:03Z' },
  { id: 'bcr-4', broadcast_id: 'bc-1', contact_id: 'cnt-4', status: 'sent', error_message: null, created_at: '2026-10-15T10:00:04Z' },
]

export const INITIAL_AUTOMATIONS: SeedAutomation[] = [
  {
    id: 'auto-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Welcome & Instant Onboarding Flow',
    description: 'Sends instant greeting and company overview when a new customer initiates chat.',
    trigger_type: 'new_message_received',
    is_active: true,
    execution_count: 1842,
    last_executed_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'auto-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Inbound Lead Qualification & Triage',
    description: 'Tags inbound inquiries by company size and auto-assigns to account executive.',
    trigger_type: 'first_inbound_message',
    is_active: true,
    execution_count: 654,
    last_executed_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    created_at: '2026-08-15T00:00:00Z',
  },
  {
    id: 'auto-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'After-Hours Auto-Responder',
    description: 'Replies automatically between 6 PM and 8 AM with working hours and emergency contacts.',
    trigger_type: 'time_based',
    is_active: true,
    execution_count: 312,
    last_executed_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    created_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'auto-4',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: "Keyword Trigger: 'DEMO' / 'PRICING'",
    description: 'Sends automated pricing deck and direct calendar booking link.',
    trigger_type: 'keyword_match',
    is_active: true,
    execution_count: 489,
    last_executed_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    created_at: '2026-09-10T00:00:00Z',
  },
]

export const INITIAL_AUTOMATION_STEPS = [
  { id: 'step-1', automation_id: 'auto-1', action_type: 'send_message', config: { text: 'Welcome to our platform! How can we assist you today?' }, position: 0 },
  { id: 'step-2', automation_id: 'auto-1', action_type: 'add_tag', config: { tag_id: 'tag-3' }, position: 1 },
]

export const INITIAL_AUTOMATION_LOGS = [
  { id: 'log-1', automation_id: 'auto-1', event_name: 'Workflow Completed', status: 'success', created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: 'log-2', automation_id: 'auto-2', event_name: 'Lead Tagged VIP', status: 'success', created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { id: 'log-3', automation_id: 'auto-4', event_name: 'Keyword Matched: PRICING', status: 'success', created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
]

export const INITIAL_TEMPLATES = [
  {
    id: 'tpl-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'product_update_v2',
    category: 'MARKETING',
    language: 'en_US',
    status: 'APPROVED',
    body_text: 'Hi {{1}}, we just released Version 2.4 featuring our new real-time workflow automations. Check out the release notes here: {{2}}',
    header_type: 'NONE',
    buttons: [],
    created_at: '2026-10-01T00:00:00Z',
  },
  {
    id: 'tpl-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'webinar_invite',
    category: 'MARKETING',
    language: 'en_US',
    status: 'APPROVED',
    body_text: 'Hello {{1}}, join our senior architects this Thursday at 2 PM EST for an exclusive deep dive on conversational AI in WhatsApp.',
    header_type: 'NONE',
    buttons: [],
    created_at: '2026-10-05T00:00:00Z',
  },
  {
    id: 'tpl-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'special_offer_q4',
    category: 'MARKETING',
    language: 'en_US',
    status: 'APPROVED',
    body_text: 'Hi {{1}}, upgrade before the end of Q4 to lock in grandfathered pricing for your entire team. Reply YES to claim.',
    header_type: 'NONE',
    buttons: [],
    created_at: '2026-10-10T00:00:00Z',
  },
  {
    id: 'tpl-4',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'onboarding_guide',
    category: 'UTILITY',
    language: 'en_US',
    status: 'APPROVED',
    body_text: 'Welcome {{1}}! Here is your quickstart guide to setting up your workspace and connecting team inboxes.',
    header_type: 'NONE',
    buttons: [],
    created_at: '2026-10-02T00:00:00Z',
  },
]

export const INITIAL_FLOWS = [
  {
    id: 'flow-1',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Enterprise Inbound Qualifier',
    description: 'Screens new leads, collects company size, and schedules meetings',
    status: 'active',
    trigger_type: 'first_inbound_message',
    trigger_config: {},
    execution_count: 1420,
    last_executed_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-10-20T00:00:00Z',
  },
  {
    id: 'flow-2',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Support Triage & FAQ Bot',
    description: 'Instant answers for common customer inquiries and ticket deflection',
    status: 'active',
    trigger_type: 'keyword',
    trigger_config: { keywords: ['help', 'pricing', 'support'] },
    execution_count: 2890,
    last_executed_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    created_at: '2026-08-15T00:00:00Z',
    updated_at: '2026-10-21T00:00:00Z',
  },
  {
    id: 'flow-3',
    account_id: '00000000-0000-0000-0000-000000000001',
    name: 'Post-Webinar Engagement Sequence',
    description: 'Sends deck PDF and surveys 24 hours after event attendance',
    status: 'draft',
    trigger_type: 'manual',
    trigger_config: {},
    execution_count: 0,
    last_executed_at: null,
    created_at: '2026-10-18T00:00:00Z',
    updated_at: '2026-10-18T00:00:00Z',
  },
]

export const INITIAL_FLOW_TEMPLATES = [
  {
    slug: 'lead-qualification',
    name: 'Lead Qualification & Scoring',
    description: 'Ask 3 qualifying questions and route high-value leads directly to an account executive.',
    icon: 'UserPlus' as const,
    trigger_type: 'first_inbound_message',
    node_count: 5,
  },
  {
    slug: 'support-faq',
    name: 'Keyword FAQ Responder',
    description: 'Match keywords like "pricing", "docs", "support" and reply with interactive choices.',
    icon: 'HelpCircle' as const,
    trigger_type: 'keyword',
    node_count: 4,
  },
  {
    slug: 'simple-greeting',
    name: 'Simple Welcome Greeting',
    description: 'Instantly greet first-time senders during off-hours with your operating schedule.',
    icon: 'MessageSquare' as const,
    trigger_type: 'first_inbound_message',
    node_count: 2,
  },
]

export const INITIAL_WHATSAPP_CONFIG = {
  id: 'wac-1',
  account_id: '00000000-0000-0000-0000-000000000001',
  phone_number_id: '109823475923',
  waba_id: '982374982374',
  business_name: 'Antigravity Studio',
  status: 'connected',
  created_at: '2026-08-01T00:00:00Z',
}

export const INITIAL_AI_CONFIG = {
  id: 'ai-1',
  account_id: '00000000-0000-0000-0000-000000000001',
  provider: 'openai',
  model: 'gpt-4o',
  system_prompt: 'You are an editorial, precise AI assistant for our enterprise WhatsApp CRM.',
  temperature: 0.3,
  configured: true,
  is_active: true,
  created_at: '2026-08-01T00:00:00Z',
}

export const INITIAL_CUSTOM_FIELDS = [
  { id: 'cf-1', account_id: '00000000-0000-0000-0000-000000000001', name: 'Company', field_type: 'text', required: true, created_at: '2026-08-01T00:00:00Z' },
  { id: 'cf-2', account_id: '00000000-0000-0000-0000-000000000001', name: 'Deal Size', field_type: 'text', required: false, created_at: '2026-08-01T00:00:00Z' },
  { id: 'cf-3', account_id: '00000000-0000-0000-0000-000000000001', name: 'Region', field_type: 'text', required: false, created_at: '2026-08-01T00:00:00Z' },
]

export const INITIAL_QUICK_REPLIES = [
  { id: 'qr-1', account_id: '00000000-0000-0000-0000-000000000001', shortcut: '/intro', content: 'Hi there! Thanks for reaching out to our team. How can we assist you today?', created_at: '2026-08-01T00:00:00Z' },
  { id: 'qr-2', account_id: '00000000-0000-0000-0000-000000000001', shortcut: '/pricing', content: 'Our standard plan starts at $49/mo and enterprise tier includes dedicated API endpoints and custom webhook automations.', created_at: '2026-08-01T00:00:00Z' },
  { id: 'qr-3', account_id: '00000000-0000-0000-0000-000000000001', shortcut: '/demo', content: 'You can book a 20-minute live architecture demo with our engineering team here: cal.com/wacrm-demo', created_at: '2026-08-01T00:00:00Z' },
]

export const INITIAL_MEMBERS = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    user_id: '00000000-0000-0000-0000-000000000001',
    account_id: '00000000-0000-0000-0000-000000000001',
    email: 'demo@wacrm.local',
    full_name: 'Demo Admin',
    role: 'owner',
    avatar_url: null,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    user_id: '00000000-0000-0000-0000-000000000002',
    account_id: '00000000-0000-0000-0000-000000000001',
    email: 'agent@wacrm.local',
    full_name: 'Jessica Agent',
    role: 'agent',
    avatar_url: null,
    created_at: '2026-08-10T00:00:00Z',
  },
]
