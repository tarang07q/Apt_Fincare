"use client"

import { useEffect, useState } from "react"

// Define device types based on the screenshot
export type DeviceType = 
  | "Nexus 7"
  | "Nokia Lumia 520"
  | "Nokia N9"
  | "Pixel 3"
  | "Pixel 4"
  | "iPhone 4"
  | "iPhone 5/SE"
  | "iPhone XR"
  | "iPhone 12 Pro"
  | "iPhone 14 Pro Max"
  | "Pixel 3 XL"
  | "Samsung Galaxy S8+"
  | "Samsung Galaxy S20 Ultra"
  | "iPad Mini"
  | "iPad Air"
  | "Surface Pro 7"
  | "Surface Duo"
  | "Galaxy Z Fold 2"
  | "Desktop"

// Define device dimensions
const deviceDimensions: Record<DeviceType, { width: number; height: number }> = {
  "Nexus 7": { width: 600, height: 960 },
  "Nokia Lumia 520": { width: 320, height: 533 },
  "Nokia N9": { width: 480, height: 854 },
  "Pixel 3": { width: 393, height: 786 },
  "Pixel 4": { width: 393, height: 786 },
  "iPhone 4": { width: 320, height: 480 },
  "iPhone 5/SE": { width: 320, height: 568 },
  "iPhone XR": { width: 414, height: 896 },
  "iPhone 12 Pro": { width: 390, height: 844 },
  "iPhone 14 Pro Max": { width: 430, height: 932 },
  "Pixel 3 XL": { width: 412, height: 846 },
  "Samsung Galaxy S8+": { width: 360, height: 740 },
  "Samsung Galaxy S20 Ultra": { width: 412, height: 915 },
  "iPad Mini": { width: 768, height: 1024 },
  "iPad Air": { width: 820, height: 1180 },
  "Surface Pro 7": { width: 912, height: 1368 },
  "Surface Duo": { width: 540, height: 720 },
  "Galaxy Z Fold 2": { width: 884, height: 1104 },
  "Desktop": { width: 1920, height: 1080 },
}

// Hook to detect current device type
export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("Desktop")

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Find the closest matching device
      let closestDevice: DeviceType = "Desktop"
      let minDifference = Number.MAX_VALUE

      Object.entries(deviceDimensions).forEach(([device, dimensions]) => {
        const widthDiff = Math.abs(dimensions.width - width)
        const heightDiff = Math.abs(dimensions.height - height)
        const totalDiff = widthDiff + heightDiff

        if (totalDiff < minDifference) {
          minDifference = totalDiff
          closestDevice = device as DeviceType
        }
      })

      setDeviceType(closestDevice)
    }

    // Initial detection
    detectDevice()

    // Add resize listener
    window.addEventListener("resize", detectDevice)

    // Cleanup
    return () => {
      window.removeEventListener("resize", detectDevice)
    }
  }, [])

  return deviceType
}

// Component to apply device-specific styles
export function DeviceResponsive({ 
  children,
  className = "",
  styles = {}
}: { 
  children: React.ReactNode
  className?: string
  styles?: Record<DeviceType, string>
}) {
  const deviceType = useDeviceType()
  
  // Apply device-specific class if available
  const deviceClass = styles[deviceType] || ""
  
  return (
    <div className={`${className} ${deviceClass}`}>
      {children}
    </div>
  )
}

// Hook to check if the current device is a mobile device
export function useIsMobileDevice(): boolean {
  const deviceType = useDeviceType()
  
  const mobileDevices: DeviceType[] = [
    "Nexus 7",
    "Nokia Lumia 520",
    "Nokia N9",
    "Pixel 3",
    "Pixel 4",
    "iPhone 4",
    "iPhone 5/SE",
    "iPhone XR",
    "iPhone 12 Pro",
    "iPhone 14 Pro Max",
    "Pixel 3 XL",
    "Samsung Galaxy S8+",
    "Samsung Galaxy S20 Ultra"
  ]
  
  return mobileDevices.includes(deviceType)
}

// Hook to check if the current device is a tablet
export function useIsTabletDevice(): boolean {
  const deviceType = useDeviceType()
  
  const tabletDevices: DeviceType[] = [
    "iPad Mini",
    "iPad Air",
    "Surface Pro 7",
    "Surface Duo",
    "Galaxy Z Fold 2"
  ]
  
  return tabletDevices.includes(deviceType)
}
