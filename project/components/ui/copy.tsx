"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CopyProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

export function Copy({ value, className, src, ...props }: CopyProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative h-8 w-8", className)}
      onClick={copyToClipboard}
      {...props}
    >
      {hasCopied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  )
}