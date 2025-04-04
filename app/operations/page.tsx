"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, ClipboardList, BarChart3, Calendar, AlertTriangle, Search, Filter, Plus, Download } from "lucide-react"

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("daily-tasks")

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold">Operations Management</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="daily-tasks" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="daily-tasks">
              <ClipboardList className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Daily Tasks</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="shipments">
              <Truck className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Shipments</span>
              <span className="sm:hidden">Ship</span>
            </TabsTrigger>
            <TabsTrigger value="inventory-alerts">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Inventory Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="production-schedule">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Production Schedule</span>
              <span className="sm:hidden">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Perf</span>
            </TabsTrigger>
          </TabsList>

          {/* Daily Tasks Tab */}
          <TabsContent value="daily-tasks">
            <Card>
              <CardHeader>
                <CardTitle>Daily Operational Tasks</CardTitle>
                <CardDescription>Manage and track daily operational tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search tasks..." className="pl-10" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">OT-1001</TableCell>
                      <TableCell>Morning inventory count</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Completed</Badge>
                      </TableCell>
                      <TableCell>08:00 AM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">OT-1002</TableCell>
                      <TableCell>Restock production line 1</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">In Progress</Badge>
                      </TableCell>
                      <TableCell>10:30 AM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">OT-1003</TableCell>
                      <TableCell>Quality check on incoming shipment</TableCell>
                      <TableCell>Mike Johnson</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">Normal</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>01:00 PM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">OT-1004</TableCell>
                      <TableCell>Prepare outgoing shipment</TableCell>
                      <TableCell>Sarah Williams</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>03:30 PM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">OT-1005</TableCell>
                      <TableCell>End of day inventory reconciliation</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>05:00 PM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 5 of 12 tasks</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Shipments Tab */}
          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Management</CardTitle>
                <CardDescription>Track incoming and outgoing shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="incoming">
                  <TabsList className="mb-4">
                    <TabsTrigger value="incoming">Incoming Shipments</TabsTrigger>
                    <TabsTrigger value="outgoing">Outgoing Shipments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="incoming">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Shipment ID</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Expected Arrival</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">IN-5001</TableCell>
                          <TableCell>Tech Components Inc.</TableCell>
                          <TableCell>15 items</TableCell>
                          <TableCell>Today, 11:00 AM</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">In Transit</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">IN-5002</TableCell>
                          <TableCell>Global Electronics</TableCell>
                          <TableCell>8 items</TableCell>
                          <TableCell>Tomorrow, 09:30 AM</TableCell>
                          <TableCell>
                            <Badge variant="outline">Scheduled</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">IN-5003</TableCell>
                          <TableCell>Circuit Systems</TableCell>
                          <TableCell>22 items</TableCell>
                          <TableCell>Dec 24, 02:00 PM</TableCell>
                          <TableCell>
                            <Badge variant="outline">Scheduled</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="outgoing">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Shipment ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Scheduled Departure</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">OUT-3001</TableCell>
                          <TableCell>Acme Corporation</TableCell>
                          <TableCell>12 items</TableCell>
                          <TableCell>Today, 04:00 PM</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">Preparing</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">OUT-3002</TableCell>
                          <TableCell>TechSolutions Ltd.</TableCell>
                          <TableCell>5 items</TableCell>
                          <TableCell>Tomorrow, 10:00 AM</TableCell>
                          <TableCell>
                            <Badge variant="outline">Scheduled</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">OUT-3003</TableCell>
                          <TableCell>Innovative Systems</TableCell>
                          <TableCell>18 items</TableCell>
                          <TableCell>Dec 23, 01:30 PM</TableCell>
                          <TableCell>
                            <Badge variant="outline">Scheduled</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Shipment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Inventory Alerts Tab */}
          <TabsContent value="inventory-alerts">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Critical inventory issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <h3 className="font-medium text-red-600 dark:text-red-400">Low Stock Alert</h3>
                        <p className="mt-1 text-sm">
                          Item <span className="font-medium">CPU9876-I7</span> (Intel i7 CPU) is below minimum
                          threshold. Current quantity: 10, Minimum: 15
                        </p>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 bg-red-100 text-red-600 hover:bg-red-200 dark:border-red-800 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                          >
                            Create Purchase Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <h3 className="font-medium text-red-600 dark:text-red-400">Low Stock Alert</h3>
                        <p className="mt-1 text-sm">
                          Item <span className="font-medium">PSU3456-750W</span> (750W Power Supply) is below minimum
                          threshold. Current quantity: 5, Minimum: 10
                        </p>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 bg-red-100 text-red-600 hover:bg-red-200 dark:border-red-800 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                          >
                            Create Purchase Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/50">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <h3 className="font-medium text-amber-600 dark:text-amber-400">Expiring Items Alert</h3>
                        <p className="mt-1 text-sm">
                          Item <span className="font-medium">EAM238102-212</span> (Computer) has 3 units expiring in 15
                          days
                        </p>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-200 bg-amber-100 text-amber-600 hover:bg-amber-200 dark:border-amber-800 dark:bg-amber-900 dark:text-amber-400 dark:hover:bg-amber-800"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/50">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">Inventory Discrepancy</h3>
                        <p className="mt-1 text-sm">
                          Item <span className="font-medium">MEM8765-DDR4</span> (DDR4 Memory) has a count discrepancy.
                          System: 25, Last physical count: 23
                        </p>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-200 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                          >
                            Schedule Recount
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Production Schedule Tab */}
          <TabsContent value="production-schedule">
            <Card>
              <CardHeader>
                <CardTitle>Production Schedule</CardTitle>
                <CardDescription>Daily production line schedules and material requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pd1">
                  <TabsList className="mb-4">
                    <TabsTrigger value="pd1">Production Line 1</TabsTrigger>
                    <TabsTrigger value="pd2">Production Line 2</TabsTrigger>
                    <TabsTrigger value="pd3">Production Line 3</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pd1">
                    <div className="mb-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Current Production</h3>
                          <p className="text-sm text-muted-foreground">Model X-1000 Circuit Boards</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium">Operator</p>
                          <p className="text-sm">John Doe</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Target</p>
                          <p className="text-sm">150 units</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-sm">87 units (58%)</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-2 font-medium">Upcoming Production Runs</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Materials Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>02:00 PM - 04:00 PM</TableCell>
                          <TableCell>Model Y-2000 Circuit Boards</TableCell>
                          <TableCell>75 units</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Ready</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>04:30 PM - 06:30 PM</TableCell>
                          <TableCell>Model Z-3000 Circuit Boards</TableCell>
                          <TableCell>50 units</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">Partial</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="pd2">
                    <div className="mb-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Current Production</h3>
                          <p className="text-sm text-muted-foreground">Power Supply Units</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium">Operator</p>
                          <p className="text-sm">Jane Smith</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Target</p>
                          <p className="text-sm">100 units</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-sm">42 units (42%)</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-2 font-medium">Upcoming Production Runs</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Materials Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>03:00 PM - 05:00 PM</TableCell>
                          <TableCell>CPU Cooling Units</TableCell>
                          <TableCell>60 units</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Ready</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="pd3">
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <p className="text-muted-foreground">Production Line 3 is currently inactive</p>
                        <Button variant="outline" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Schedule Production
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Operational Performance</CardTitle>
                <CardDescription>Key performance indicators and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Order Fulfillment Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">94.8%</div>
                      <p className="text-xs text-muted-foreground">+2.5% from last week</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[94.8%] rounded-full bg-green-500"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Robot Utilization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78.3%</div>
                      <p className="text-xs text-muted-foreground">-1.2% from last week</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[78.3%] rounded-full bg-amber-500"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Inventory Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">97.2%</div>
                      <p className="text-xs text-muted-foreground">+0.8% from last week</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[97.2%] rounded-full bg-green-500"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="mb-4 font-medium">Recent Performance Issues</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Robot AMR-04 downtime</TableCell>
                      <TableCell>Robot Fleet</TableCell>
                      <TableCell>Medium - Reduced capacity by 25%</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">In Progress</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Stock Zone 4 maintenance</TableCell>
                      <TableCell>Storage</TableCell>
                      <TableCell>Low - Alternative zones available</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">In Progress</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Production Line 3 inactive</TableCell>
                      <TableCell>Production</TableCell>
                      <TableCell>High - Reduced production capacity</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Unresolved</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

