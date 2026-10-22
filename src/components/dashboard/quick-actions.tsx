"use client"

import Link from 'next/link'
import { UserPlus, Briefcase, Radio, Zap } from 'lucide-react'
import type { ComponentType } from 'react'

import { useTranslations } from 'next-intl'

interface Action {
  labelKey: string
  href: string
  icon: ComponentType<{ className?: string }>
}

const ACTIONS: Action[] = [
  { labelKey: 'newContact', href: '/contacts', icon: UserPlus },
  { labelKey: 'newDeal', href: '/pipelines', icon: Briefcase },
  { labelKey: 'newBroadcast', href: '/broadcasts/new', icon: Radio },
  { labelKey: 'newAutomation', href: '/automations/new', icon: Zap },
]

export function QuickActions() {
  const t = useTranslations('Dashboard.quickActions')
  
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ACTIONS.map((a) => {
        const Icon = a.icon
        return (
          <Link
            key={a.href}
            href={a.href}
            className="group flex items-center gap-3 rounded-[8px] border border-border bg-card px-3.5 py-2.5 transition-colors hover:border-foreground/30 hover:bg-muted/40"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-border bg-muted/60 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-medium text-foreground tracking-tight">{t(a.labelKey as string)}</span>
          </Link>
        )
      })}
    </div>
  )
}
