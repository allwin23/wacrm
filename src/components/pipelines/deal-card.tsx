"use client";

import type { Deal, PipelineStage } from "@/types";
import { Calendar, Check, X } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import { useTranslations } from "next-intl";

interface DealCardProps {
  deal: Deal;
  stage: PipelineStage | null;
  onEdit: (deal: Deal) => void;
  isOverlay?: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function initials(name?: string, fallback?: string) {
  const source = (name || fallback || "?").trim();
  if (!source) return "?";
  return source.charAt(0).toUpperCase();
}

export function DealCard({ deal, stage, onEdit, isOverlay }: DealCardProps) {
  const t = useTranslations("Pipelines.card");
  const contactLabel = deal.contact?.name || deal.contact?.phone || t("noContact");
  const assigneeLabel = deal.assignee?.full_name || null;

  return (
    <button
      type="button"
      onClick={(e) => {
        // `onClick` still fires after a non-drag tap because the PointerSensor
        // requires 5px movement before it counts as a drag.
        if (isOverlay) return;
        e.stopPropagation();
        onEdit(deal);
      }}
      className={`group relative w-full cursor-pointer rounded-[4px] border border-border bg-card p-3 text-left transition-colors ${
        isOverlay
          ? "border-foreground bg-muted/60"
          : "hover:border-foreground/50 hover:bg-muted/20"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="flex-1 text-xs font-medium leading-snug text-foreground break-words">
          {deal.title}
        </h4>
        {deal.status === "won" && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-[3px] border border-border bg-foreground px-1.5 py-0.5 text-[9px] font-mono uppercase text-background">
            <Check className="h-3 w-3" />
            {t("won")}
          </span>
        )}
        {deal.status === "lost" && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-[3px] border border-border bg-muted px-1.5 py-0.5 text-[9px] font-mono uppercase text-muted-foreground">
            <X className="h-3 w-3" />
            {t("lost")}
          </span>
        )}
      </div>

      {/* Contact row */}
      <div className="mt-2 flex items-center gap-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-[2px] border border-border bg-muted/60 font-mono text-[9px] font-medium text-foreground">
          {initials(deal.contact?.name, deal.contact?.phone)}
        </span>
        <span className="truncate text-[11px] text-muted-foreground">{contactLabel}</span>
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2">
        <span className="font-mono text-xs font-semibold text-foreground">
          {formatCurrency(deal.value, deal.currency)}
        </span>
        {deal.expected_close_date && (
          <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formatDate(deal.expected_close_date)}
          </span>
        )}
      </div>

      {assigneeLabel && (
        <div className="mt-2 flex items-center justify-end">
          <span
            title={assigneeLabel}
            className="flex h-4 w-4 items-center justify-center rounded-[2px] border border-border bg-muted font-mono text-[9px] font-medium text-foreground"
          >
            {initials(assigneeLabel)}
          </span>
        </div>
      )}
    </button>
  );
}
