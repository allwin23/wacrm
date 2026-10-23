import type { SupabaseClient, User } from '@supabase/supabase-js'
import {
  INITIAL_CONTACTS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_TAGS,
  INITIAL_CONTACT_TAGS,
  INITIAL_PIPELINES,
  INITIAL_STAGES,
  INITIAL_DEALS,
  INITIAL_BROADCASTS,
  INITIAL_BROADCAST_RECIPIENTS,
  INITIAL_AUTOMATIONS,
  INITIAL_AUTOMATION_STEPS,
  INITIAL_AUTOMATION_LOGS,
  INITIAL_TEMPLATES,
  INITIAL_FLOWS,
  INITIAL_FLOW_TEMPLATES,
  INITIAL_WHATSAPP_CONFIG,
  INITIAL_AI_CONFIG,
  INITIAL_CUSTOM_FIELDS,
  INITIAL_QUICK_REPLIES,
  INITIAL_MEMBERS,
} from '@/lib/demo-data'

export const DEMO_USER: User = {
  id: '00000000-0000-0000-0000-000000000001',
  app_metadata: { provider: 'email' },
  user_metadata: { full_name: 'Demo Admin' },
  aud: 'authenticated',
  created_at: '2026-08-01T00:00:00Z',
  email: 'demo@wacrm.local',
  phone: '',
  role: 'authenticated',
  updated_at: '2026-08-01T00:00:00Z',
}

export const DEMO_PROFILE = {
  id: '00000000-0000-0000-0000-000000000001',
  user_id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Demo Admin',
  email: 'demo@wacrm.local',
  avatar_url: null,
  role: 'owner',
  beta_features: ['flows'],
  account_id: '00000000-0000-0000-0000-000000000001',
  account_role: 'owner',
}

export const DEMO_ACCOUNT = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Demo Workspace',
  default_currency: 'USD',
}

const STORAGE_KEY = 'wacrm_demo_database_store_v1'

interface DemoDbStore {
  contacts: any[]
  conversations: any[]
  messages: any[]
  tags: any[]
  contact_tags: any[]
  pipelines: any[]
  pipeline_stages: any[]
  deals: any[]
  broadcasts: any[]
  broadcast_recipients: any[]
  automations: any[]
  automation_steps: any[]
  automation_logs: any[]
  message_templates: any[]
  flows: any[]
  flow_templates: any[]
  whatsapp_config: any[]
  ai_configs: any[]
  custom_fields: any[]
  quick_replies: any[]
  members: any[]
  profiles: any[]
  accounts: any[]
  message_reactions: any[]
  member_presence?: any[]
}

function createInitialStore(): DemoDbStore {
  const allMessages: any[] = []
  for (const convId in INITIAL_MESSAGES) {
    allMessages.push(...INITIAL_MESSAGES[convId])
  }

  return {
    contacts: JSON.parse(JSON.stringify(INITIAL_CONTACTS)),
    conversations: JSON.parse(JSON.stringify(INITIAL_CONVERSATIONS)),
    messages: JSON.parse(JSON.stringify(allMessages)),
    tags: JSON.parse(JSON.stringify(INITIAL_TAGS)),
    contact_tags: JSON.parse(JSON.stringify(INITIAL_CONTACT_TAGS)),
    pipelines: JSON.parse(JSON.stringify(INITIAL_PIPELINES)),
    pipeline_stages: JSON.parse(JSON.stringify(INITIAL_STAGES)),
    deals: JSON.parse(JSON.stringify(INITIAL_DEALS)),
    broadcasts: JSON.parse(JSON.stringify(INITIAL_BROADCASTS)),
    broadcast_recipients: JSON.parse(JSON.stringify(INITIAL_BROADCAST_RECIPIENTS)),
    automations: JSON.parse(JSON.stringify(INITIAL_AUTOMATIONS)),
    automation_steps: JSON.parse(JSON.stringify(INITIAL_AUTOMATION_STEPS)),
    automation_logs: JSON.parse(JSON.stringify(INITIAL_AUTOMATION_LOGS)),
    message_templates: JSON.parse(JSON.stringify(INITIAL_TEMPLATES)),
    flows: JSON.parse(JSON.stringify(INITIAL_FLOWS)),
    flow_templates: JSON.parse(JSON.stringify(INITIAL_FLOW_TEMPLATES)),
    whatsapp_config: [JSON.parse(JSON.stringify(INITIAL_WHATSAPP_CONFIG))],
    ai_configs: [JSON.parse(JSON.stringify(INITIAL_AI_CONFIG))],
    custom_fields: JSON.parse(JSON.stringify(INITIAL_CUSTOM_FIELDS)),
    quick_replies: JSON.parse(JSON.stringify(INITIAL_QUICK_REPLIES)),
    members: JSON.parse(JSON.stringify(INITIAL_MEMBERS)),
    profiles: [JSON.parse(JSON.stringify(DEMO_PROFILE))],
    accounts: [JSON.parse(JSON.stringify(DEMO_ACCOUNT))],
    message_reactions: [],
    member_presence: [
      { user_id: '00000000-0000-0000-0000-000000000001', status: 'online', updated_at: new Date().toISOString() },
    ],
  }
}

// In-memory global store with browser localStorage sync
let memoryStore: DemoDbStore | null = null

function getStore(): DemoDbStore {
  if (memoryStore) return memoryStore

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        memoryStore = JSON.parse(saved)
        return memoryStore!
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  memoryStore = createInitialStore()
  return memoryStore
}

function persistStore() {
  if (typeof window !== 'undefined' && memoryStore) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore))
    } catch {
      // Ignore localStorage quotas
    }
  }
}

// Realtime listeners
type Listener = (payload: { eventType: 'INSERT' | 'UPDATE' | 'DELETE'; new: any; old: any }) => void
const channelListeners: Map<string, Set<Listener>> = new Map()

function notifyListeners(table: string, eventType: 'INSERT' | 'UPDATE' | 'DELETE', newRow: any, oldRow: any) {
  for (const [, listeners] of channelListeners.entries()) {
    for (const listener of listeners) {
      try {
        listener({ eventType, new: newRow, old: oldRow })
      } catch {
        // Safe dispatch
      }
    }
  }
}

class MockQueryBuilder {
  private table: string
  private isHead: boolean = false
  private countMode: string | null = null
  private filters: Array<(row: any) => boolean> = []
  private sortFn: ((a: any, b: any) => number) | null = null
  private limitCount: number | null = null
  private rangeOffset: number = 0
  private rangeLimit: number | null = null
  private pendingInsert: any = null
  private pendingUpdate: any = null
  private isDelete: boolean = false
  private isSingleResult: boolean = false

  constructor(table: string) {
    this.table = table
  }

  select(_columns = '*', options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) {
    if (options?.head) this.isHead = true
    if (options?.count) this.countMode = options.count
    return this
  }

  insert(data: any) {
    this.pendingInsert = data
    return this
  }

  update(data: any) {
    this.pendingUpdate = data
    return this
  }

  upsert(data: any) {
    this.pendingInsert = data
    return this
  }

  delete() {
    this.isDelete = true
    return this
  }

  eq(column: string, value: any) {
    this.filters.push((row) => row && row[column] === value)
    return this
  }

  neq(column: string, value: any) {
    this.filters.push((row) => row && row[column] !== value)
    return this
  }

  gte(column: string, value: any) {
    this.filters.push((row) => row && row[column] >= value)
    return this
  }

  gt(column: string, value: any) {
    this.filters.push((row) => row && row[column] > value)
    return this
  }

  lte(column: string, value: any) {
    this.filters.push((row) => row && row[column] <= value)
    return this
  }

  lt(column: string, value: any) {
    this.filters.push((row) => row && row[column] < value)
    return this
  }

  in(column: string, values: any[]) {
    this.filters.push((row) => row && values.includes(row[column]))
    return this
  }

  is(column: string, value: any) {
    this.filters.push((row) => row && row[column] === value)
    return this
  }

  ilike(column: string, pattern: string) {
    const raw = pattern.replace(/%/g, '').toLowerCase()
    this.filters.push((row) => {
      const val = row && row[column]
      return typeof val === 'string' && val.toLowerCase().includes(raw)
    })
    return this
  }

  or(filterStr: string) {
    // Basic support for "col1.ilike.%val%,col2.ilike.%val%"
    const conditions = filterStr.split(',').map((part) => {
      const [col, op, ...rest] = part.split('.')
      const val = rest.join('.').replace(/%/g, '').toLowerCase()
      return { col, op, val }
    })
    this.filters.push((row) => {
      if (!row) return false
      return conditions.some(({ col, val }) => {
        const itemVal = row[col]
        return typeof itemVal === 'string' && itemVal.toLowerCase().includes(val)
      })
    })
    return this
  }

  order(column: string, options?: { ascending?: boolean }) {
    const asc = options?.ascending ?? true
    this.sortFn = (a, b) => {
      const valA = a[column]
      const valB = b[column]
      if (valA === valB) return 0
      if (valA === null || valA === undefined) return 1
      if (valB === null || valB === undefined) return -1
      if (asc) return valA < valB ? -1 : 1
      return valA > valB ? -1 : 1
    }
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  range(from: number, to: number) {
    this.rangeOffset = from
    this.rangeLimit = to - from + 1
    return this
  }

  single() {
    this.isSingleResult = true
    return this
  }

  maybeSingle() {
    this.isSingleResult = true
    return this
  }

  private execute(): { data: any; error: null; count: number } {
    const store = getStore()
    const tableKey = this.table as keyof DemoDbStore

    if (!store[tableKey]) {
      ;(store as any)[tableKey] = []
    }

    let rows: any[] = store[tableKey] || []

    // 1. Handle INSERT
    if (this.pendingInsert) {
      const items = Array.isArray(this.pendingInsert) ? this.pendingInsert : [this.pendingInsert]
      const inserted: any[] = []
      for (const item of items) {
        const row = {
          id: item.id || `gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          created_at: item.created_at || new Date().toISOString(),
          ...item,
        }
        rows.push(row)
        inserted.push(row)
        notifyListeners(this.table, 'INSERT', row, {})
      }
      persistStore()
      return {
        data: this.isSingleResult ? inserted[0] : inserted,
        error: null,
        count: inserted.length,
      }
    }

    // 2. Filter rows
    let filtered = rows
    for (const filter of this.filters) {
      filtered = filtered.filter(filter)
    }

    // 3. Handle DELETE
    if (this.isDelete) {
      const idsToDelete = new Set(filtered.map((r) => r.id))
      store[tableKey] = rows.filter((r) => !idsToDelete.has(r.id))
      for (const deletedRow of filtered) {
        notifyListeners(this.table, 'DELETE', {}, deletedRow)
      }
      persistStore()
      return { data: filtered, error: null, count: filtered.length }
    }

    // 4. Handle UPDATE
    if (this.pendingUpdate) {
      const updated: any[] = []
      for (const row of filtered) {
        const oldRow = { ...row }
        Object.assign(row, this.pendingUpdate)
        row.updated_at = new Date().toISOString()
        updated.push(row)
        notifyListeners(this.table, 'UPDATE', row, oldRow)
      }
      persistStore()
      return {
        data: this.isSingleResult ? updated[0] || null : updated,
        error: null,
        count: updated.length,
      }
    }

    const totalCount = filtered.length

    if (this.isHead) {
      return { data: null, error: null, count: totalCount }
    }

    // 5. Sort
    if (this.sortFn) {
      filtered = [...filtered].sort(this.sortFn)
    }

    // 6. Pagination
    if (this.rangeLimit !== null) {
      filtered = filtered.slice(this.rangeOffset, this.rangeOffset + this.rangeLimit)
    } else if (this.limitCount !== null) {
      filtered = filtered.slice(0, this.limitCount)
    }

    // 7. Embed Relationships / Joins
    const processed = filtered.map((row) => {
      const copy = { ...row }
      if (this.table === 'conversations') {
        const contact = store.contacts.find((c) => c.id === copy.contact_id)
        if (contact) {
          const contactTags = store.contact_tags
            .filter((ct) => ct.contact_id === contact.id)
            .map((ct) => ({
              tags: store.tags.find((t) => t.id === ct.tag_id) || null,
            }))
          copy.contact = {
            ...contact,
            contact_tags: contactTags,
            tags: contactTags.map((ct) => ct.tags).filter(Boolean),
          }
        }
      } else if (this.table === 'deals') {
        copy.contact = store.contacts.find((c) => c.id === copy.contact_id) || null
      }
      return copy
    })

    const finalData = this.isSingleResult ? (processed[0] ?? null) : processed

    return {
      data: finalData,
      error: null,
      count: totalCount,
    }
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: null; count: number }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const res = this.execute()
    return Promise.resolve(res).then(onfulfilled, onrejected)
  }
}

class MockRealtimeChannel {
  private channelName: string

  constructor(name: string) {
    this.channelName = name
  }

  on(_event: string, _filter: any, callback: Listener) {
    if (!channelListeners.has(this.channelName)) {
      channelListeners.set(this.channelName, new Set())
    }
    channelListeners.get(this.channelName)!.add(callback)
    return this
  }

  subscribe(callback?: (status: string) => void) {
    if (callback) {
      setTimeout(() => callback('SUBSCRIBED'), 0)
    }
    return this
  }

  unsubscribe() {
    channelListeners.delete(this.channelName)
    return Promise.resolve()
  }
}

export function createClient(): SupabaseClient {
  const client: any = {
    from(tableName: string) {
      return new MockQueryBuilder(tableName)
    },
    rpc(fnName: string, args?: any) {
      const store = getStore()
      if (fnName === 'filter_contacts_by_tags') {
        const tagIds: string[] = args?.p_tag_ids || []
        const search: string = (args?.p_search || '').trim().toLowerCase()
        const limit: number = args?.p_limit ?? 25
        const offset: number = args?.p_offset ?? 0

        // Find contact IDs having any of the selected tags
        const matchingContactIds = new Set(
          store.contact_tags
            .filter((ct) => tagIds.length === 0 || tagIds.includes(ct.tag_id))
            .map((ct) => ct.contact_id)
        )

        let matching = store.contacts.filter((c) => {
          if (tagIds.length > 0 && !matchingContactIds.has(c.id)) return false
          if (search) {
            const inName = c.name?.toLowerCase().includes(search)
            const inPhone = c.phone?.toLowerCase().includes(search)
            const inEmail = c.email?.toLowerCase().includes(search)
            return inName || inPhone || inEmail
          }
          return true
        })

        const totalCount = matching.length
        const paged = matching.slice(offset, offset + limit)
        const rows = paged.map((contact) => ({
          contact,
          total_count: totalCount,
        }))

        return Promise.resolve({ data: rows, error: null })
      }

      if (fnName === 'reopen_conversation') {
        const conv = store.conversations.find((c) => c.id === args?.p_conversation_id)
        if (conv) {
          conv.status = 'open'
          persistStore()
        }
        return Promise.resolve({ data: true, error: null })
      }

      if (fnName === 'touch_presence') {
        return Promise.resolve({ data: true, error: null })
      }

      return Promise.resolve({ data: null, error: null })
    },
    channel(name: string) {
      return new MockRealtimeChannel(name)
    },
    removeChannel(channel: any) {
      if (channel && typeof channel.unsubscribe === 'function') {
        channel.unsubscribe()
      }
      return Promise.resolve()
    },
    storage: {
      from(_bucket: string) {
        return {
          upload(path: string, _file: any) {
            return Promise.resolve({ data: { path }, error: null })
          },
          getPublicUrl(path: string) {
            return { data: { publicUrl: `/placeholder-avatar.png` } }
          },
          remove(paths: string[]) {
            return Promise.resolve({ data: paths, error: null })
          },
        }
      },
    },
    auth: {
      getUser() {
        return Promise.resolve({ data: { user: DEMO_USER }, error: null })
      },
      getSession() {
        return Promise.resolve({
          data: {
            session: {
              user: DEMO_USER,
              access_token: 'demo-token',
              refresh_token: 'demo-refresh',
              expires_at: 9999999999,
            },
          },
          error: null,
        })
      },
      onAuthStateChange(callback: (event: string, session: any) => void) {
        setTimeout(() => {
          callback('SIGNED_IN', { user: DEMO_USER })
        }, 0)
        return {
          data: {
            subscription: {
              unsubscribe: () => {},
            },
          },
        }
      },
      signOut() {
        return Promise.resolve({ error: null })
      },
      signInWithPassword() {
        return Promise.resolve({
          data: { user: DEMO_USER, session: { user: DEMO_USER } },
          error: null,
        })
      },
      updateUser(_attrs: any) {
        return Promise.resolve({ data: { user: DEMO_USER }, error: null })
      },
    },
  }

  return client as SupabaseClient
}
