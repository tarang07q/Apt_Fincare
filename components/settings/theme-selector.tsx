"use client"

import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../ui/label"
import { Moon, Sun, Laptop } from "lucide-react"

type ThemeSelectorProps = {
  value: string
  onValueChange: (value: string) => void
}

export function ThemeSelector({ value, onValueChange }: ThemeSelectorProps) {
  // This is a controlled component - it doesn't directly update the theme
  // The parent component is responsible for updating the theme when the form is submitted
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="grid grid-cols-3 gap-4">
      <div>
        <RadioGroupItem value="light" id="light" className="peer sr-only" />
        <Label
          htmlFor="light"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Sun className="mb-3 h-6 w-6" />
          Light
        </Label>
      </div>
      <div>
        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
        <Label
          htmlFor="dark"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Moon className="mb-3 h-6 w-6" />
          Dark
        </Label>
      </div>
      <div>
        <RadioGroupItem value="system" id="system" className="peer sr-only" />
        <Label
          htmlFor="system"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Laptop className="mb-3 h-6 w-6" />
          System
        </Label>
      </div>
    </RadioGroup>
  )
}

