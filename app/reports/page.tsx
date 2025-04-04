"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, BarChart3, Table2, FileSpreadsheet } from "lucide-react"
import { Line, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the charts - IMS focused
const inventoryTrendData = [
  { day: 1, stockLevel: 243, inbound: 15, outbound: 8 },
  { day: 2, stockLevel: 250, inbound: 12, outbound: 10 },
  { day: 3, stockLevel: 252, inbound: 18, outbound: 22 },
  { day: 4, stockLevel: 248, inbound: 10, outbound: 15 },
  { day: 5, stockLevel: 243, inbound: 5, outbound: 12 },
  { day: 6, stockLevel: 236, inbound: 8, outbound: 18 },
  { day: 7, stockLevel: 226, inbound: 12, outbound: 10 },
  { day: 8, stockLevel: 228, inbound: 15, outbound: 8 },
  { day: 9, stockLevel: 235, inbound: 10, outbound: 5 },
  { day: 10, stockLevel: 240, inbound: 8, outbound: 12 },
  { day: 11, stockLevel: 236, inbound: 5, outbound: 10 },
  { day: 12, stockLevel: 231, inbound: 10, outbound: 8 },
  { day: 13, stockLevel: 233, inbound: 12, outbound: 5 },
  { day: 14, stockLevel: 240, inbound: 8, outbound: 10 },
  { day: 15, stockLevel: 238, inbound: 5, outbound: 12 },
]

const stockUtilizationData = [
  { zone: "Zone 1", utilization: 85 },
  { zone: "Zone 2", utilization: 72 },
  { zone: "Zone 3", utilization: 65 },
  { zone: "Zone 4", utilization: 90 },
  { zone: "Zone 5", utilization: 45 },
  { zone: "Zone 6", utilization: 30 },
]

const taskCompletionData = [
  { day: 1, completed: 25, pending: 5 },
  { day: 2, completed: 22, pending: 8 },
  { day: 3, completed: 30, pending: 3 },
  { day: 4, completed: 18, pending: 10 },
  { day: 5, completed: 27, pending: 6 },
  { day: 6, completed: 24, pending: 4 },
  { day: 7, completed: 20, pending: 7 },
]

const lowStockItemsData = [
  {
    id: 1,
    itemCode: "ITM001",
    itemName: "Cardboard Box (Large)",
    currentStock: 15,
    minStock: 20,
    supplier: "Package Co.",
  },
  {
    id: 2,
    itemCode: "ITM045",
    itemName: "Plastic Wrap (Roll)",
    currentStock: 8,
    minStock: 15,
    supplier: "Wrap Solutions",
  },
  { id: 3, itemCode: "ITM112", itemName: "Adhesive Tape", currentStock: 12, minStock: 25, supplier: "Adhesive Inc." },
  {
    id: 4,
    itemCode: "ITM078",
    itemName: "Pallet Wrap",
    currentStock: 5,
    minStock: 10,
    supplier: "Industrial Supplies",
  },
  {
    id: 5,
    itemCode: "ITM234",
    itemName: "Shipping Labels",
    currentStock: 150,
    minStock: 200,
    supplier: "Label Masters",
  },
]

// Top inventory items by value
const topInventoryData = [
  { id: 1, itemCode: "ITM089", itemName: "Electronic Component A", quantity: 1250, value: 125000, location: "Zone 1" },
  { id: 2, itemCode: "ITM156", itemName: "Premium Packaging", quantity: 3500, value: 87500, location: "Zone 2" },
  { id: 3, itemCode: "ITM023", itemName: "Raw Material X", quantity: 850, value: 76500, location: "Zone 1" },
  { id: 4, itemCode: "ITM067", itemName: "Finished Product Y", quantity: 320, value: 64000, location: "Zone 4" },
  { id: 5, itemCode: "ITM198", itemName: "Component Assembly B", quantity: 450, value: 58500, location: "Zone 3" },
]

export default function ReportsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"chart" | "table" | "export">("chart")

  // Function to handle Excel export
  const handleExport = () => {
    // In a real application, this would generate and download an Excel file
    console.log("Exporting to Excel...")
    alert("Excel export functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <Tabs defaultValue="inventoryTrend">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="inventoryTrend">Inventory Trend</TabsTrigger>
            <TabsTrigger value="stockUtilization">Stock Utilization</TabsTrigger>
            <TabsTrigger value="taskCompletion">Task Completion</TabsTrigger>
            <TabsTrigger value="lowStock">Low Stock</TabsTrigger>
            <TabsTrigger value="topInventory">Top Inventory</TabsTrigger>
            <TabsTrigger value="excelAll">Excel All</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "MMMM yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="month"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                <SelectItem value="distribution">Distribution Center</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "chart" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("chart")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <Table2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "export" ? "default" : "ghost"}
                size="icon"
                onClick={() => {
                  setViewMode("export")
                  handleExport()
                }}
              >
                <FileSpreadsheet className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <TabsContent value="inventoryTrend">
              {viewMode === "chart" ? (
                <ChartContainer
                  config={{
                    stockLevel: {
                      label: "Stock Level",
                      color: "hsl(var(--chart-1))",
                    },
                    inbound: {
                      label: "Inbound",
                      color: "hsl(var(--chart-2))",
                    },
                    outbound: {
                      label: "Outbound",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={inventoryTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" label={{ value: "Day", position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: "Quantity", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="inbound" fill="#4ade80" />
                      <Bar dataKey="outbound" fill="#f87171" />
                      <Line type="monotone" dataKey="stockLevel" stroke="#60a5fa" strokeWidth={2} />
                      <Legend />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Inbound</TableHead>
                      <TableHead>Outbound</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryTrendData.map((item) => (
                      <TableRow key={item.day}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.stockLevel}</TableCell>
                        <TableCell>{item.inbound}</TableCell>
                        <TableCell>{item.outbound}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="stockUtilization">
              {viewMode === "chart" ? (
                <ChartContainer
                  config={{
                    utilization: {
                      label: "Utilization (%)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockUtilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="zone" />
                      <YAxis label={{ value: "Utilization (%)", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="utilization" fill="#60a5fa" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zone</TableHead>
                      <TableHead>Utilization (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockUtilizationData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.zone}</TableCell>
                        <TableCell>{item.utilization}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="taskCompletion">
              {viewMode === "chart" ? (
                <ChartContainer
                  config={{
                    completed: {
                      label: "Completed Tasks",
                      color: "hsl(var(--chart-3))",
                    },
                    pending: {
                      label: "Pending Tasks",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completed" fill="#4ade80" />
                      <Bar dataKey="pending" fill="#f87171" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Completed Tasks</TableHead>
                      <TableHead>Pending Tasks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taskCompletionData.map((item) => (
                      <TableRow key={item.day}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.completed}</TableCell>
                        <TableCell>{item.pending}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="lowStock">
              <h3 className="text-lg font-medium mb-4">Low Stock Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min Stock</TableHead>
                    <TableHead>Supplier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockItemsData.map((item) => (
                    <TableRow key={item.id} className={item.currentStock < item.minStock / 2 ? "bg-red-50" : ""}>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.currentStock}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="topInventory">
              <h3 className="text-lg font-medium mb-4">Top Inventory Items by Value</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Value ($)</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topInventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.value.toLocaleString()}</TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="excelAll">
              <div className="flex flex-col items-center justify-center py-12">
                <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Export All Reports</h3>
                <p className="text-muted-foreground mb-6">Export all inventory management reports to Excel format</p>
                <Button onClick={handleExport} className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Export to Excel
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

