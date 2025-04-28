"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "../../lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-md border bg-card text-foreground shadow-md outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {/* Add visually hidden title and description for accessibility */}
      {!React.Children.toArray(props.children).some(
        child => React.isValidElement(child) &&
                child.type === PopoverPrimitive.Title
      ) && (
        <PopoverPrimitive.Title className="sr-only">
          Popover
        </PopoverPrimitive.Title>
      )}
      {!React.Children.toArray(props.children).some(
        child => React.isValidElement(child) &&
                child.type === PopoverPrimitive.Description
      ) && (
        <PopoverPrimitive.Description className="sr-only">
          Popover Description
        </PopoverPrimitive.Description>
      )}
      {props.children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverTitle = PopoverPrimitive.Title
PopoverTitle.displayName = PopoverPrimitive.Title.displayName

const PopoverDescription = PopoverPrimitive.Description
PopoverDescription.displayName = PopoverPrimitive.Description.displayName

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription
}
