import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Download, Filter, Printer } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Inventory Report - IMS System",
  description: "Current inventory levels and status",
}

export default function InventoryReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart className="h-6 w-6" />
            Inventory Report
          </h1>
          <p className="text-muted-foreground">Current inventory levels and status</p>
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
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <CardDescription>All inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <CardDescription>Items below minimum level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <CardDescription>Items with zero quantity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">12</div>
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
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Cost</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ITM001</TableCell>
              <TableCell>Laptop Computer</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Main Warehouse</TableCell>
              <TableCell className="text-right">24</TableCell>
              <TableCell className="text-right">$899.99</TableCell>
              <TableCell className="text-right">$21,599.76</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  In Stock
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM002</TableCell>
              <TableCell>Office Chair</TableCell>
              <TableCell>Furniture</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell className="text-right">8</TableCell>
              <TableCell className="text-right">$149.99</TableCell>
              <TableCell className="text-right">$1,199.92</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  Low Stock
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM003</TableCell>
              <TableCell>Printer Paper</TableCell>
              <TableCell>Office Supplies</TableCell>
              <TableCell>West Warehouse</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">$24.99</TableCell>
              <TableCell className="text-right">$0.00</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  Out of Stock
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM004</TableCell>
              <TableCell>Wireless Mouse</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Main Warehouse</TableCell>
              <TableCell className="text-right">45</TableCell>
              <TableCell className="text-right">$29.99</TableCell>
              <TableCell className="text-right">$1,349.55</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  In Stock
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITM005</TableCell>
              <TableCell>Filing Cabinet</TableCell>
              <TableCell>Furniture</TableCell>
              <TableCell>East Warehouse</TableCell>
              <TableCell className="text-right">12</TableCell>
              <TableCell className="text-right">$199.99</TableCell>
              <TableCell className="text-right">$2,399.88</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  In Stock
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

