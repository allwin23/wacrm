export interface Contact {
  id: string
  name: string
  phone: string
  email: string | null
  avatar_url: string | null
  notes: string | null
  custom_fields: Record<string, string>
  tags: Tag[]
  created_at: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface Conversation {
  id: string
  contact_id: string
  status: 'open' | 'pending' | 'closed'
  unread_count: number
  last_message_at: string
  last_message_text: string
  assigned_to: string | null
  created_at: string
  contact: Contact
}

export interface Message {
  id: string
  conversation_id: string
  sender_type: 'customer' | 'agent' | 'bot'
  sender_id: string | null
  message_type: 'text' | 'image' | 'audio' | 'document' | 'interactive'
  content_text: string
  media_url: string | null
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  created_at: string
}

export interface DealStage {
  id: string
  name: string
  color: string
  position: number
}

export interface Deal {
  id: string
  pipeline_id: string
  stage_id: string
  title: string
  value: number
  currency: string
  contact_id: string
  status: 'open' | 'won' | 'lost'
  position: number
  created_at: string
  contact?: Contact
}

export interface Broadcast {
  id: string
  name: string
  template_name: string
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  total_recipients: number
  sent_count: number
  delivered_count: number
  read_count: number
  failed_count: number
  created_at: string
}

export type WorkflowNodeType = 'trigger' | 'condition' | 'action' | 'ai' | 'webhook' | 'delay'

export interface WorkflowNodeConfig {
  event?: string
  keyword?: string
  actionType?: 'send_message' | 'send_template' | 'add_tag' | 'create_deal' | 'webhook'
  templateName?: string
  messageBody?: string
  tagName?: string
  dealTitle?: string
  dealStage?: string
  dealValue?: number
  webhookUrl?: string
  delayMinutes?: number
  conditionField?: string
  conditionOperator?: 'contains' | 'equals' | 'starts_with'
  conditionValue?: string
}

export interface WorkflowNode {
  id: string
  type: WorkflowNodeType
  title: string
  subtitle: string
  x: number
  y: number
  config: WorkflowNodeConfig
}

export interface WorkflowConnection {
  id: string
  fromNodeId: string
  fromHandle?: 'default' | 'true' | 'false'
  toNodeId: string
}

export interface WorkflowDefinition {
  id: string
  name: string
  description: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  createdAt: string
  lastRun?: string
}

export interface Automation {
  id: string
  name: string
  description: string
  trigger_type: string
  is_active: boolean
  execution_count: number
  last_executed_at: string | null
  created_at: string
  workflow?: WorkflowDefinition
}

export interface QuickReply {
  id: string
  shortcut: string
  content: string
}

export interface Template {
  id: string
  name: string
  category: string
  language: string
  status: string
  body_text: string
}
