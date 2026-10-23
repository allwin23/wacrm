import {
  Crown,
  Shield,
  UserCog,
  UserIcon,
  type LucideIcon,
} from 'lucide-react';

import type { AccountRole } from '@/lib/auth/roles';
import type { ChipVariant } from './settings-chip';

/**
 * Single source of truth for per-role chip metadata across settings
 * surfaces (the Overview identity chip and the Members roster/invite
 * chips). Previously duplicated in both files; hoisted here so a label,
 * icon, or colour change lands once.
 *
 * `variant` drives the token-based <SettingsChip>; `className` is the
 * inline Tailwind string the Members tab applies to its own spans.
 */
export const ROLE_META: Record<
  AccountRole,
  { icon: LucideIcon; label: string; variant: ChipVariant; className: string }
> = {
  owner: {
    icon: Crown,
    label: 'owner',
    variant: 'owner',
    className: 'border-foreground/30 bg-foreground/10 text-foreground font-mono uppercase text-[10px] rounded-[4px]',
  },
  admin: {
    icon: Shield,
    label: 'admin',
    variant: 'admin',
    className: 'border-border bg-muted text-foreground font-mono uppercase text-[10px] rounded-[4px]',
  },
  agent: {
    icon: UserCog,
    label: 'agent',
    variant: 'muted',
    className: 'border-border bg-muted text-muted-foreground font-mono uppercase text-[10px] rounded-[4px]',
  },
  viewer: {
    icon: UserIcon,
    label: 'viewer',
    variant: 'muted',
    // Outline-only so it stays quieter than the filled Agent chip in
    // both modes — bg-card would blend into a card surface in light mode.
    className: 'border-border bg-transparent text-muted-foreground font-mono uppercase text-[10px] rounded-[4px]',
  },
};
