"use client"

import React from 'react'
import { Icon } from '@iconify/react'

interface ThreeDIconProps {
  icon: string
  size?: number
  color?: string
  className?: string
}

export function ThreeDIcon({ icon, size = 24, color, className = "" }: ThreeDIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Icon 
        icon={icon} 
        width={size} 
        height={size} 
        style={{ color: color }}
      />
    </div>
  )
}
