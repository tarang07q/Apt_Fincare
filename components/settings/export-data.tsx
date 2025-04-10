"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { Loader2, Download } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Label } from "../ui/label"

export function ExportData() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState("all")

  const handleExport = async () => {
    if (!session?.user?.id) return

    setIsExporting(true)
    try {
      toast({
        title: "Exporting data",
        description: "Your data is being prepared for export",
      })

      const response = await fetch(`/api/users/${session.user.id}/export?type=${exportType}`)

      if (!response.ok) {
        throw new Error("Failed to export data")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `fintrack-export-${exportType}-${format(new Date(), "yyyy-MM-dd")}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export successful",
        description: "Your data has been exported successfully",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export data",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Export Your Data</h3>
        <p className="text-sm text-muted-foreground">Download a copy of your data in CSV or JSON format</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="export-type">Export Type</Label>
        <Select value={exportType} onValueChange={setExportType}>
          <SelectTrigger id="export-type" className="w-full">
            <SelectValue placeholder="Select what to export" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Data</SelectItem>
            <SelectItem value="transactions">Transactions Only</SelectItem>
            <SelectItem value="budgets">Budgets Only</SelectItem>
            <SelectItem value="categories">Categories Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </>
        )}
      </Button>
    </div>
  )
}

