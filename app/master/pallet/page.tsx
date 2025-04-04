import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Palette, Plus, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Standard Pallet Size - IMS System",
  description: "Manage standard pallet sizes in the Inventory Management System",
}

export default function PalletSizePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Palette className="h-6 w-6" />
            Standard Pallet Size
          </h1>
          <p className="text-muted-foreground">Manage and configure standard pallet sizes</p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add New Pallet Size
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search pallet sizes..." className="pl-8 w-full" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pallet ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Dimensions (cm)</TableHead>
              <TableHead>Weight Capacity (kg)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>PAL001</TableCell>
              <TableCell>Standard Euro Pallet</TableCell>
              <TableCell>120 x 80 x 14.4</TableCell>
              <TableCell>1500</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PAL002</TableCell>
              <TableCell>Standard US Pallet</TableCell>
              <TableCell>120 x 100 x 14.4</TableCell>
              <TableCell>1800</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PAL003</TableCell>
              <TableCell>Half Pallet</TableCell>
              <TableCell>80 x 60 x 14.4</TableCell>
              <TableCell>750</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

