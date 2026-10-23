"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

// Root: primary token when checked (responds to the active color theme),
// slate when unchecked.
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-[4px] border border-border transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "data-[checked]:bg-foreground data-[checked]:border-foreground data-[unchecked]:bg-muted",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-3.5 w-3.5 rounded-[2px] bg-background shadow-none transition-transform",
          "data-[checked]:translate-x-4 data-[unchecked]:translate-x-0.5",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
