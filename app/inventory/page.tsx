"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Clock, ArrowUpDown } from "lucide-react"

// Mock inventory data
const inventoryItems = [
  {
    code: "2014954AEC-2547",
    name: "CMOS",
    stockZoneId: "ST01",
    locationId: "AP34",
    quantity: 15,
    unit: "pcs",
    dateAdded: "2023-12-10T08:30:00",
    status: "in-stock",
  },
  {
    code: "EAM238102-212",
    name: "Computer",
    stockZoneId: "ST02",
    locationId: "AP38",
    quantity: 8,
    unit: "sets",
    dateAdded: "2023-12-15T10:15:00",
    status: "in-stock",
  },
  {
    code: "TRM4521-001",
    name: "Terminal",
    stockZoneId: "ST01",
    locationId: "AP34",
    quantity: 12,
    unit: "pcs",
    dateAdded: "2023-12-05T14:20:00",
    status: "in-stock",
  },
  {
    code: "PCB7890-XYZ",
    name: "Circuit Board",
    stockZoneId: "ST03",
    locationId: "AP42",
    quantity: 30,
    unit: "pcs",
    dateAdded: "2023-12-18T09:45:00",
    status: "in-stock",
  },
  {
    code: "CAB4567-USB",
    name: "USB Cable",
    stockZoneId: "ST02",
    locationId: "AP38",
    quantity: 50,
    unit: "m",
    dateAdded: "2023-12-01T11:30:00",
    status: "in-stock",
  },
  {
    code: "MEM8765-DDR4",
    name: "DDR4 Memory",
    stockZoneId: "ST03",
    locationId: "AP42",
    quantity: 25,
    unit: "pcs",
    dateAdded: "2023-12-12T13:10:00",
    status: "in-stock",
  },
  {
    code: "CPU9876-I7",
    name: "Intel i7 CPU",
    stockZoneId: "ST01",
    locationId: "AP34",
    quantity: 10,
    unit: "pcs",
    dateAdded: "2023-12-08T15:40:00",
    status: "low-stock",
  },
  {
    code: "PSU3456-750W",
    name: "750W Power Supply",
    stockZoneId: "ST02",
    locationId: "AP38",
    quantity: 5,
    unit: "pcs",
    dateAdded: "2023-12-20T08:20:00",
    status: "low-stock",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterZone, setFilterZone] = useState("all")
  const [sortField, setSortField] = useState("dateAdded")
  const [sortDirection, setSortDirection] = useState("desc")

  // Filter and sort inventory items
  const filteredItems = inventoryItems
    .filter(
      (item) =>
        (searchTerm === "" ||
          item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterZone === "all" || item.stockZoneId === filterZone),
    )
    .sort((a, b) => {
      if (sortField === "dateAdded") {
        return sortDirection === "asc"
          ? new Date(a.dateAdded) - new Date(b.dateAdded)
          : new Date(b.dateAdded) - new Date(a.dateAdded)
      } else if (sortField === "quantity") {
        return sortDirection === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
      } else if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      return 0
    })

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Manage and track all items in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by code or name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterZone} onValueChange={setFilterZone}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="ST01">Stock Zone 1</SelectItem>
                    <SelectItem value="ST02">Stock Zone 2</SelectItem>
                    <SelectItem value="ST03">Stock Zone 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Select value={sortField} onValueChange={setSortField}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dateAdded">Date Added</SelectItem>
                    <SelectItem value="quantity">Quantity</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                >
                  <ArrowUpDown className={`h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Item Code</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
                    <div className="flex items-center">
                      Name
                      {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>Stock Zone</TableHead>
                  <TableHead>Location ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("quantity")}>
                    <div className="flex items-center">
                      Quantity
                      {sortField === "quantity" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("dateAdded")}>
                    <div className="flex items-center">
                      Date Added
                      {sortField === "dateAdded" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.stockZoneId}</TableCell>
                    <TableCell>{item.locationId}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{formatDate(item.dateAdded)}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "in-stock" ? "default" : "destructive"}>
                        {item.status === "in-stock" ? "In Stock" : "Low Stock"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

