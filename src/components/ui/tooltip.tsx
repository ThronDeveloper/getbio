import * as React from "react"
import { cn } from "@/lib/utils"

export interface TooltipProviderProps {
  children: React.ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>
}
