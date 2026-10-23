/**
 * Shared display config for message_templates.status.
 *
 * The DB stores Meta's raw enum (DRAFT / APPROVED / PENDING / REJECTED /
 * PAUSED / DISABLED / IN_APPEAL / PENDING_DELETION) — the UI maps it to
 * a human label + dark-theme badge classes here so the template manager,
 * inbox picker, and broadcast picker stay aligned.
 */

import type { MessageTemplateStatus } from '@/types';

export interface TemplateStatusDisplay {
  label: string;
  classes: string;
}

export const templateStatusConfig: Record<
  MessageTemplateStatus,
  TemplateStatusDisplay
> = {
  DRAFT: {
    label: 'Draft',
    classes: 'bg-transparent text-muted-foreground border-border font-mono text-[10px] uppercase rounded-[4px]',
  },
  PENDING: {
    label: 'Pending',
    classes: 'bg-muted text-foreground border-border font-mono text-[10px] uppercase rounded-[4px]',
  },
  APPROVED: {
    label: 'Approved',
    classes: 'bg-foreground text-background border-foreground font-mono text-[10px] uppercase rounded-[4px]',
  },
  REJECTED: {
    label: 'Rejected',
    classes: 'bg-destructive/10 text-destructive border-destructive/30 font-mono text-[10px] uppercase rounded-[4px]',
  },
  PAUSED: {
    label: 'Paused',
    classes: 'bg-muted text-muted-foreground border-border font-mono text-[10px] uppercase rounded-[4px]',
  },
  DISABLED: {
    label: 'Disabled',
    classes: 'bg-muted text-muted-foreground border-border font-mono text-[10px] uppercase rounded-[4px]',
  },
  IN_APPEAL: {
    label: 'In Appeal',
    classes: 'bg-muted/80 text-foreground border-border font-mono text-[10px] uppercase rounded-[4px]',
  },
  PENDING_DELETION: {
    label: 'Pending Deletion',
    classes: 'bg-transparent text-muted-foreground border-dashed border-border font-mono text-[10px] uppercase rounded-[4px]',
  },
};
