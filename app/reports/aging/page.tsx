import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Download, Filter, Printer } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Aging Report - IMS System",
  description: "Inventory aging analysis",
}

export default function AgingReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart className="h-6 w-6" />
            Aging Report
          </h1>
          <p className="text-muted-foreground">Inventory aging analysis</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">0-30 Days</CardTitle>
            <CardDescription>Recent inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,250.75</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">31-60 Days</CardTitle>
            <CardDescription>Medium-term inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,180.50</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">61-90 Days</CardTitle>
            <CardDescription>Aging inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">$18,425.25</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">90+ Days</CardTitle>
            <CardDescription>Old inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">$9,875.40</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="office">Office Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="east">East Warehouse</SelectItem>
                <SelectItem value="west">West Warehouse</SelectItem>
              </SelectContent>
            </Select>
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
              <TableHead>Item Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Receipt Date</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ITM001</TableCell>
              <TableCell>Laptop Computer</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Main Warehouse</TableCell>
              <TableCell>2023-06-01</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell className="text-right">$8,999.90</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  25 days
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM002</TableCell>
              <TableCell>Office Chair</TableCell>
              <TableCell>Furniture</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell>2023-05-15</TableCell>
              <TableCell className="text-right">8</TableCell>
              <TableCell className="text-right">$1,199.92</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  42 days
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM005</TableCell>
              <TableCell>Filing Cabinet</TableCell>
              <TableCell>Furniture</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell>2023-04-10</TableCell>
              <TableCell className="text-right">5</TableCell>
              <TableCell className="text-right">$999.95</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  77 days
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM004</TableCell>
              <TableCell>Wireless Mouse</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Main Warehouse</TableCell>
              <TableCell>2023-03-15</TableCell>
              <TableCell className="text-right">20</TableCell>
              <TableCell className="text-right">$599.80</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  103 days
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM003</TableCell>
              <TableCell>Printer Paper</TableCell>
              <TableCell>Office Supplies</TableCell>
              <TableCell>West Warehouse</TableCell>
              <TableCell>2023-03-01</TableCell>
              <TableCell className="text-right">15</TableCell>
              <TableCell className="text-right">$374.85</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  117 days
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

