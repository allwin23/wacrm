import type { AutomationTriggerType } from '@/types'

export interface TriggerMeta {
  pillClass: string
}

export const TRIGGER_META: Record<AutomationTriggerType, TriggerMeta> = {
  new_message_received: {
    pillClass: 'border-border bg-muted/60 text-foreground',
  },
  first_inbound_message: {
    pillClass: 'border-border bg-muted/60 text-foreground',
  },
  keyword_match: {
    pillClass: 'border-border bg-muted/60 text-foreground',
  },
  new_contact_created: {
    pillClass: 'border-border bg-muted/80 text-foreground font-medium',
  },
  conversation_assigned: {
    pillClass: 'border-border bg-muted/60 text-foreground',
  },
  tag_added: {
    pillClass: 'border-border bg-muted/60 text-foreground',
  },
  time_based: {
    pillClass: 'border-border/60 bg-muted/40 text-muted-foreground',
  },
  interactive_reply: {
    pillClass: 'border-border bg-muted/60 text-foreground',
  },
}

export function isKnownTrigger(t: string): t is AutomationTriggerType {
  return Object.prototype.hasOwnProperty.call(TRIGGER_META, t)
}

export function triggerMeta(t: AutomationTriggerType | string): TriggerMeta {
  return (
    TRIGGER_META[t as AutomationTriggerType] ?? {
      pillClass: 'border-border/60 bg-muted/40 text-muted-foreground',
    }
  )
}

export type RelativeTimeKey = 'never' | 'justNow' | 'minutesAgo' | 'hoursAgo' | 'daysAgo'

export type RelativeTimeTranslator = (key: RelativeTimeKey, values?: { n: number }) => string

export function formatRelative(iso: string | null | undefined, t: RelativeTimeTranslator): string {
  if (!iso) return t('never')
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return t('never')
  const diffSec = Math.round((Date.now() - then) / 1000)
  if (diffSec < 45) return t('justNow')
  if (diffSec < 3600) return t('minutesAgo', { n: Math.max(1, Math.round(diffSec / 60)) })
  if (diffSec < 86400) return t('hoursAgo', { n: Math.max(1, Math.round(diffSec / 3600)) })
  return t('daysAgo', { n: Math.max(1, Math.round(diffSec / 86400)) })
}
