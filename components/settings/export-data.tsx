"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { Loader2, Download } from "lucide-react"
import { format } from "date-fns"
import { useCurrencyContext } from "../currency-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Label } from "../ui/label"

export function ExportData() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const { currency } = useCurrencyContext()
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState("all")
  const [exportFormat, setExportFormat] = useState("csv")

  const handleExport = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to export data",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      toast({
        title: "Exporting data",
        description: "Your data is being prepared for export",
      })

      // Create the export URL with current settings
      const exportUrl = `/api/users/${session.user.id}/export?type=${exportType}&format=${exportFormat}&currency=${currency}`
      console.log("Export URL:", exportUrl)

      // Open in a new tab instead of using fetch
      window.open(exportUrl, '_blank')

      toast({
        title: "Export initiated",
        description: "Your data export has been initiated. If it doesn't download automatically, check your browser settings.",
      })
    } catch (error) {
      console.error("Export error:", error)
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

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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

        <div className="space-y-2">
          <Label htmlFor="export-format">Export Format</Label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger id="export-format" className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

