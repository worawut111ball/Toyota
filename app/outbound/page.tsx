"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Mock outbound history data
const outboundItems = [
  {
    id: 1,
    outboundDate: "2024-10-10T17:04:22",
    itemCode: "P-5230H870",
    itemName: "PANEL RR SHELF LWR",
    orderNo: "SD-252408-001",
    lotNo: "2024-10-10",
    package: "PCS",
    packageQty: 1.0,
    quantity: 1.0,
    unit: "PCS",
    location: "F-1M-01",
    labelID: "635431979",
    status: "Store_Out",
    user: "admin",
    unitPrice: 0.0,
    amount: 0.0,
  },
  {
    id: 2,
    outboundDate: "2024-10-10T17:04:22",
    itemCode: "P-5230H870",
    itemName: "PANEL RR SHELF LWR",
    orderNo: "SD-252408-001",
    lotNo: "2024-10-10",
    package: "PCS",
    packageQty: 1.0,
    quantity: 1.0,
    unit: "PCS",
    location: "F-1M-01",
    labelID: "635431979",
    status: "Store_Out",
    user: "admin",
    unitPrice: 0.0,
    amount: 0.0,
  },
  {
    id: 3,
    outboundDate: "2024-10-10T17:04:22",
    itemCode: "P-5230H870",
    itemName: "PANEL RR SHELF LWR",
    orderNo: "SD-252408-001",
    lotNo: "2024-10-10",
    package: "PCS",
    packageQty: 1.0,
    quantity: 1.0,
    unit: "PCS",
    location: "F-1M-01",
    labelID: "635431979",
    status: "Store_Out",
    user: "admin",
    unitPrice: 0.0,
    amount: 0.0,
  },
  {
    id: 4,
    outboundDate: "2024-10-10T17:04:22",
    itemCode: "P-5230H870",
    itemName: "PANEL RR SHELF LWR",
    orderNo: "SD-252408-001",
    lotNo: "2024-10-10",
    package: "PCS",
    packageQty: 1.0,
    quantity: 1.0,
    unit: "PCS",
    location: "F-1M-01",
    labelID: "635431979",
    status: "Store_Out",
    user: "admin",
    unitPrice: 0.0,
    amount: 0.0,
  },
  {
    id: 5,
    outboundDate: "2024-10-10T17:04:22",
    itemCode: "P-5230H870",
    itemName: "PANEL RR SHELF LWR",
    orderNo: "SD-252408-001",
    lotNo: "2024-10-10",
    package: "PCS",
    packageQty: 1.0,
    quantity: 1.0,
    unit: "PCS",
    location: "F-1M-01",
    labelID: "635431979",
    status: "Store_Out",
    user: "admin",
    unitPrice: 0.0,
    amount: 0.0,
  },
]

export default function OutboundPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [orderNo, setOrderNo] = useState("ALL")
  const [partNo, setPartNo] = useState("ALL")

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 px-4 text-3xl font-bold">Outbound History</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Outbound Inquiry / Report</CardTitle>
            <CardDescription>View and search outbound history records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Outbound Date</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Order No</label>
                <Select value={orderNo} onValueChange={setOrderNo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">ALL</SelectItem>
                    <SelectItem value="SD-252408-001">SD-252408-001</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Part No</label>
                <Select value={partNo} onValueChange={setPartNo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select part number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">ALL</SelectItem>
                    <SelectItem value="P-5230H870">P-5230H870</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show</span>
                <Select defaultValue="50">
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm">entries</span>
              </div>

              <Button variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                CSV
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Outbound Date</TableHead>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Order No</TableHead>
                    <TableHead>Lot No</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Package Qty</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Label ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outboundItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{formatDate(item.outboundDate)}</TableCell>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.orderNo}</TableCell>
                      <TableCell>{item.lotNo}</TableCell>
                      <TableCell>{item.package}</TableCell>
                      <TableCell>{item.packageQty.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity.toFixed(2)}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.labelID}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">{item.status}</Badge>
                      </TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>{item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">Showing 1 to 5 of 48 entries</div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

