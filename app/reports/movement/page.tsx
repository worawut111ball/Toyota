import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Download, Filter, Printer, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Movement Report - IMS System",
  description: "Inventory movement and transactions",
}

export default function MovementReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart className="h-6 w-6" />
            Movement Report
          </h1>
          <p className="text-muted-foreground">Inventory movement and transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CardDescription>All movement transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inbound</CardTitle>
            <CardDescription>Receiving transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">215</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outbound</CardTitle>
            <CardDescription>Shipping transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">272</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="receiving">Receiving</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-[150px]">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="date" className="pl-8" />
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="relative w-full md:w-[150px]">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="date" className="pl-8" />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>TRX001</TableCell>
              <TableCell>2023-06-15</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Receiving
                </span>
              </TableCell>
              <TableCell>ITM001</TableCell>
              <TableCell>Laptop Computer</TableCell>
              <TableCell>Main Warehouse</TableCell>
              <TableCell className="text-right">+10</TableCell>
              <TableCell>PO-2023-0125</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX002</TableCell>
              <TableCell>2023-06-16</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Shipping
                </span>
              </TableCell>
              <TableCell>ITM002</TableCell>
              <TableCell>Office Chair</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell className="text-right">-5</TableCell>
              <TableCell>SO-2023-0089</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX003</TableCell>
              <TableCell>2023-06-17</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  Transfer
                </span>
              </TableCell>
              <TableCell>ITM004</TableCell>
              <TableCell>Wireless Mouse</TableCell>
              <TableCell>Main Warehouse</TableCell>
              <TableCell className="text-right">-15</TableCell>
              <TableCell>TF-2023-0032</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX004</TableCell>
              <TableCell>2023-06-17</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  Transfer
                </span>
              </TableCell>
              <TableCell>ITM004</TableCell>
              <TableCell>Wireless Mouse</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell className="text-right">+15</TableCell>
              <TableCell>TF-2023-0032</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRX005</TableCell>
              <TableCell>2023-06-18</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  Adjustment
                </span>
              </TableCell>
              <TableCell>ITM005</TableCell>
              <TableCell>Filing Cabinet</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell className="text-right">-2</TableCell>
              <TableCell>ADJ-2023-0015</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

