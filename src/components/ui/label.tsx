// src/components/ui/label.tsx (Simplified to remove Radix UI dependency for build)
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement, // Changed from ElementRef of LabelPrimitive.Root
  React.LabelHTMLAttributes<HTMLLabelElement> // Changed from ComponentPropsWithoutRef of LabelPrimitive.Root
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", // Basic styling from shadcn
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
