import type { BroadcastStatus, RecipientStatus } from "@/types";

export interface StatusDisplay {
  label: string;
  classes: string;
  pulse?: boolean;
}

export const broadcastStatusConfig: Record<BroadcastStatus, StatusDisplay> = {
  draft: {
    label: "draft",
    classes: "bg-muted/10 text-muted-foreground border-border/20",
  },
  scheduled: {
    label: "scheduled",
    classes: "bg-muted/10 text-foreground border-border/20",
  },
  sending: {
    label: "sending",
    classes: "bg-muted/10 text-foreground border-border/20 font-medium",
    pulse: true,
  },
  sent: {
    label: "sent",
    classes: "bg-foreground/10 text-foreground border-border/20",
  },
  failed: {
    label: "failed",
    classes: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export const recipientStatusConfig: Record<RecipientStatus, StatusDisplay> = {
  pending: {
    label: "pending",
    classes: "bg-muted/10 text-muted-foreground border-border/20",
  },
  sent: {
    label: "sent",
    classes: "bg-muted/10 text-foreground border-border/20",
  },
  delivered: {
    label: "delivered",
    classes: "bg-muted/10 text-foreground border-border/20",
  },
  read: {
    label: "read",
    classes: "bg-foreground/10 text-foreground border-border/20 font-medium",
  },
  replied: {
    label: "replied",
    classes: "bg-muted/10 text-foreground border-border/20",
  },
  failed: {
    label: "failed",
    classes: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function getBroadcastStatus(status: string): StatusDisplay {
  return (
    broadcastStatusConfig[status as BroadcastStatus] ??
    broadcastStatusConfig.draft
  );
}

export function getRecipientStatus(status: string): StatusDisplay {
  return (
    recipientStatusConfig[status as RecipientStatus] ??
    recipientStatusConfig.pending
  );
}
