"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, AlertTriangle, Factory, BotIcon as Robot } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Zone utilization data
  const zoneData = [
    { name: "Empty", percentage: 20, color: "blue-500" },
    { name: "Injection", percentage: 15, color: "green-500" },
    { name: "Loading", percentage: 5, color: "amber-500" },
    { name: "WIP", percentage: 8, color: "orange-500" },
    { name: "FG", percentage: 25, color: "purple-500" },
    { name: "Paint", percentage: 17, color: "teal-500" },
    { name: "RM", percentage: 10, color: "blue-600" },
  ]

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 px-4 text-3xl font-bold">Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Inventory Items</span>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">243</div>
              <div className="mt-1 text-xs font-medium text-green-600">+12% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Pending Shipments</span>
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">18</div>
              <div className="mt-1 text-xs font-medium text-green-600">+3% from last week</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Production Jobs</span>
                <Factory className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">32</div>
              <div className="mt-1 text-xs font-medium text-green-600">+8% from yesterday</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Low Stock Alerts</span>
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">5</div>
              <div className="mt-1 text-xs font-medium text-amber-600">+2 new alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="mb-4 grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse Layout</TabsTrigger>
            <TabsTrigger value="stock">Stock Status</TabsTrigger>
            <TabsTrigger value="zone">Zone Statistics</TabsTrigger>
            <TabsTrigger value="amr">AMR Status</TabsTrigger>
            <TabsTrigger value="task">Task Statistics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Warehouse Overview */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Warehouse Overview</CardTitle>
                  <CardDescription>Real-time warehouse layout and stock status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[400px] w-full overflow-hidden rounded-md border bg-white">
                    {/* Main layout container */}
                    <div className="absolute inset-0 p-2">
                      <div className="grid h-full grid-cols-4 gap-1">
                        {/* Zone 1 - Left top section */}
                        <div className="border-2 border-blue-500 p-1">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs font-bold">Zone 1</span>
                            <div className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-red-500 bg-white text-xs font-bold text-red-500">
                              8
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 15 }).map((_, i) => (
                              <div key={`zone1-${i}`} className="h-5 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>

                        {/* Zone 2 - Right top section */}
                        <div className="col-span-2 border-2 border-blue-500 p-1">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs font-bold">Zone 2</span>
                            <div className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-red-500 bg-white text-xs font-bold text-red-500">
                              7
                            </div>
                          </div>
                          <div className="grid grid-cols-6 gap-1">
                            {Array.from({ length: 36 }).map((_, i) => (
                              <div key={`zone2-${i}`} className="h-5 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>

                        {/* Zone 3 - Top right section */}
                        <div className="border-2 border-blue-500 p-1">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs font-bold">Zone 3</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 15 }).map((_, i) => (
                              <div key={`zone3-${i}`} className="h-5 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>

                        {/* Zone 4 - Bottom left section */}
                        <div className="col-span-2 border-2 border-blue-500 p-1">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs font-bold">Zone 4</span>
                          </div>
                          <div className="grid grid-cols-6 gap-1">
                            {Array.from({ length: 36 }).map((_, i) => (
                              <div key={`zone4-${i}`} className="h-5 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>

                        {/* Zone 5 - Bottom middle section */}
                        <div className="border-2 border-blue-500 p-1">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs font-bold">Zone 5</span>
                            <div className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-red-500 bg-white text-xs font-bold text-red-500">
                              3
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="grid grid-rows-4 gap-1">
                              <div className="h-5 w-full rounded-sm bg-red-500" />
                              <div className="h-5 w-full rounded-sm bg-yellow-500" />
                              <div className="h-5 w-full rounded-sm bg-red-500" />
                              <div className="h-5 w-full rounded-sm bg-yellow-500" />
                            </div>
                            <div className="grid grid-rows-4 gap-1">
                              <div className="h-5 w-full rounded-sm bg-yellow-500" />
                              <div className="h-5 w-full rounded-sm bg-red-500" />
                              <div className="h-5 w-full rounded-sm bg-yellow-500" />
                              <div className="h-5 w-full rounded-sm bg-red-500" />
                            </div>
                          </div>
                          <div className="mt-1 rotate-90 text-center text-[8px]">Rack Stock</div>
                        </div>

                        {/* Zone 6 - Bottom right section */}
                        <div className="border-2 border-blue-500 p-1">
                          <div className="mb-1 flex justify-between">
                            <span className="text-xs font-bold">Zone 6</span>
                            <div className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-red-500 bg-white text-xs font-bold text-red-500">
                              4
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            <div className="h-5 w-full rounded-sm bg-pink-500" />
                            <div className="h-5 w-full rounded-sm bg-blue-500" />
                            <div className="h-5 w-full rounded-sm bg-green-500" />
                            <div className="h-5 w-full rounded-sm bg-pink-500" />
                            <div className="h-5 w-full rounded-sm bg-blue-500" />
                            <div className="h-5 w-full rounded-sm bg-green-500" />
                          </div>
                          <div className="mt-2 text-center text-[8px]">R/H PAINTING</div>
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between rounded-md bg-white/80 p-1 text-[8px]">
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-sm bg-red-500"></div>
                        <span>Rack bar RBP1</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-sm bg-yellow-500"></div>
                        <span>Rack bar RBP2</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-sm bg-green-500"></div>
                        <span>Empty Cart R/B</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-sm bg-blue-500"></div>
                        <span>CTP</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-sm bg-pink-500"></div>
                        <span>Empty Cart R/B</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Zone Utilization */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Zone Utilization</CardTitle>
                  <CardDescription>Current utilization by zone</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-48 w-48">
                      {/* Interactive pie chart visualization */}
                      <div
                        className="absolute inset-0 cursor-pointer rounded-full border-8 border-blue-500 transition-all hover:border-blue-600"
                        style={{ clipPath: "polygon(50% 50%, 0 0, 0 50%, 50% 100%, 100% 100%, 100% 0)" }}
                      ></div>
                      <div
                        className="absolute inset-0 cursor-pointer rounded-full border-8 border-purple-500 transition-all hover:border-purple-600"
                        style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 cursor-pointer rounded-full border-8 border-green-500 transition-all hover:border-green-600"
                        style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 cursor-pointer rounded-full border-8 border-amber-500 transition-all hover:border-amber-600"
                        style={{ clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)" }}
                      ></div>

                      {/* Center percentage display - Factory Average */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">68%</div>
                          <div className="text-sm">Factory Avg.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {zoneData.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`mr-2 h-3 w-3 rounded-full bg-${zone.color}`}></div>
                          <span className="text-sm">{zone.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full bg-${zone.color}`}
                              style={{ width: `${zone.percentage * 3}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{zone.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Active Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Jobs</CardTitle>
                  <CardDescription>Currently active TMS jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job No</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>AMR</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">JOB00001</TableCell>
                        <TableCell>Transfer</TableCell>
                        <TableCell>AMR-3</TableCell>
                        <TableCell>LOC-41</TableCell>
                        <TableCell>LOC-90</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">JOB00002</TableCell>
                        <TableCell>Pickup</TableCell>
                        <TableCell>AMR-4</TableCell>
                        <TableCell>LOC-79</TableCell>
                        <TableCell>LOC-61</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">JOB00003</TableCell>
                        <TableCell>Pickup</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>LOC-97</TableCell>
                        <TableCell>LOC-28</TableCell>
                        <TableCell>
                          <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">JOB00004</TableCell>
                        <TableCell>Transfer</TableCell>
                        <TableCell>AMR-2</TableCell>
                        <TableCell>LOC-44</TableCell>
                        <TableCell>LOC-99</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">JOB00005</TableCell>
                        <TableCell>Pickup</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>LOC-49</TableCell>
                        <TableCell>LOC-82</TableCell>
                        <TableCell>
                          <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* AGV Status */}
              <Card>
                <CardHeader>
                  <CardTitle>AMR Status</CardTitle>
                  <CardDescription>Current status of all AMRs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Robot className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">AMR-1</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">charging</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Robot className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">AMR-2</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">idle</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Robot className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">AMR-3</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">idle</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Robot className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">AMR-4</p>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">maintenance</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Robot className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">AMR-5</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">charging</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Warehouse Layout Tab */}
          <TabsContent value="warehouse">
          <Card>
    <CardHeader>
      <CardTitle>Warehouse Layout</CardTitle>
      <CardDescription>Detailed view of the warehouse floor plan</CardDescription>
    </CardHeader>
    <CardContent>
                <div className="relative h-[600px] w-full overflow-hidden rounded-md border bg-white">
                  {/* Warehouse layout visualization - more detailed version */}
                  <div className="absolute inset-0 p-4">
                    <div className="grid h-full grid-cols-6 gap-2">
                      {/* Storage Areas */}
                      <div className="col-span-4 grid grid-cols-4 grid-rows-3 gap-2">
                        <div className="rounded-md border-2 border-blue-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Storage Area A</div>
                          <div className="grid grid-cols-5 gap-1">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={`sa-${i}`} className="h-6 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md border-2 border-blue-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Storage Area B</div>
                          <div className="grid grid-cols-5 gap-1">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={`sb-${i}`} className="h-6 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md border-2 border-blue-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Storage Area C</div>
                          <div className="grid grid-cols-5 gap-1">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={`sc-${i}`} className="h-6 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md border-2 border-blue-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Storage Area D</div>
                          <div className="grid grid-cols-5 gap-1">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={`sd-${i}`} className="h-6 w-full rounded-sm bg-gray-800" />
                            ))}
                          </div>
                        </div>

                        {/* Production Areas */}
                        <div className="col-span-2 rounded-md border-2 border-green-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Production Line 1</div>
                          <div className="flex h-[80%] items-center justify-center">
                            <div className="h-4 w-full rounded-md bg-green-200"></div>
                          </div>
                        </div>
                        <div className="col-span-2 rounded-md border-2 border-green-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Production Line 2</div>
                          <div className="flex h-[80%] items-center justify-center">
                            <div className="h-4 w-full rounded-md bg-green-200"></div>
                          </div>
                        </div>

                        {/* Assembly Areas */}
                        <div className="col-span-2 rounded-md border-2 border-purple-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Assembly Area</div>
                          <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div key={`aa-${i}`} className="h-6 w-full rounded-sm bg-purple-300" />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md border-2 border-amber-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Packing</div>
                          <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={`pa-${i}`} className="h-6 w-full rounded-sm bg-amber-300" />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md border-2 border-red-500 bg-gray-100 p-2">
                          <div className="mb-2 text-sm font-bold">Shipping</div>
                          <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={`sh-${i}`} className="h-6 w-full rounded-sm bg-red-300" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Legend and Info */}
                      <div className="col-span-2 space-y-4">
                        <div className="rounded-md border bg-white p-4 shadow-sm">
                          <h3 className="mb-2 font-medium">Warehouse Zones</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border-2 border-blue-500"></div>
                              <span className="text-sm">Storage Areas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border-2 border-green-500"></div>
                              <span className="text-sm">Production Lines</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border-2 border-purple-500"></div>
                              <span className="text-sm">Assembly Areas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border-2 border-amber-500"></div>
                              <span className="text-sm">Packing Areas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border-2 border-red-500"></div>
                              <span className="text-sm">Shipping Areas</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-md border bg-white p-4 shadow-sm">
                          <h3 className="mb-2 font-medium">Warehouse Statistics</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Total Area:</span>
                              <span className="text-sm font-medium">10,000 sq ft</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Storage Capacity:</span>
                              <span className="text-sm font-medium">5,000 units</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Current Utilization:</span>
                              <span className="text-sm font-medium">68%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Active AMRs:</span>
                              <span className="text-sm font-medium">5</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-md border bg-white p-4 shadow-sm">
                          <h3 className="mb-2 font-medium">Recent Activities</h3>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>AMR-3 moved to Storage Area B</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                              <span>Production Line 1 at 85% capacity</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              <span>New shipment arrived at Dock 2</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>Storage Area D needs restocking</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </CardContent>
  </Card> {/* ปิด Card */}
</TabsContent> {/* ปิด TabsContent */}

          {/* Stock Status Tab */}
          <TabsContent value="stock">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Inventory Levels</CardTitle>
                  <CardDescription>Current stock levels by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Items</TableHead>
                        <TableHead>In Stock</TableHead>
                        <TableHead>Reserved</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Raw Materials</TableCell>
                        <TableCell>1,245</TableCell>
                        <TableCell>1,180</TableCell>
                        <TableCell>65</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">Today, 09:45 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Components</TableCell>
                        <TableCell>3,872</TableCell>
                        <TableCell>3,210</TableCell>
                        <TableCell>662</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">Today, 10:15 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Work in Progress</TableCell>
                        <TableCell>528</TableCell>
                        <TableCell>528</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">Today, 08:30 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Finished Goods</TableCell>
                        <TableCell>1,024</TableCell>
                        <TableCell>876</TableCell>
                        <TableCell>148</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">Today, 11:20 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Packaging Materials</TableCell>
                        <TableCell>456</TableCell>
                        <TableCell>312</TableCell>
                        <TableCell>144</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">Low</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">Yesterday, 04:15 PM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Spare Parts</TableCell>
                        <TableCell>789</TableCell>
                        <TableCell>720</TableCell>
                        <TableCell>69</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">Today, 09:00 AM</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Alerts</CardTitle>
                  <CardDescription>Items that need attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
                        <div>
                          <h3 className="font-medium text-red-600 dark:text-red-400">Critical Low Stock</h3>
                          <p className="mt-1 text-sm">Packaging Materials - Cardboard Boxes (CB-001)</p>
                          <p className="text-xs text-red-600">Current: 42 units (Min: 100)</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/50">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <div>
                          <h3 className="font-medium text-amber-600 dark:text-amber-400">Low Stock Warning</h3>
                          <p className="mt-1 text-sm">Raw Materials - Aluminum Sheets (RM-AL-001)</p>
                          <p className="text-xs text-amber-600">Current: 85 units (Min: 75)</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/50">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <div>
                          <h3 className="font-medium text-amber-600 dark:text-amber-400">Low Stock Warning</h3>
                          <p className="mt-1 text-sm">Components - Power Supply Units (PSU-750W)</p>
                          <p className="text-xs text-amber-600">Current: 28 units (Min: 25)</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/50">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <h3 className="font-medium text-blue-600 dark:text-blue-400">Reorder Recommendation</h3>
                          <p className="mt-1 text-sm">Spare Parts - Cooling Fans (SP-FAN-120)</p>
                          <p className="text-xs text-blue-600">Current: 45 units (Optimal: 60)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Zone Statistics Tab */}
          <TabsContent value="zone">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Zone Utilization Trends</CardTitle>
                  <CardDescription>Utilization percentage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full rounded-md border bg-white p-4">
                    <div className="flex h-full flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="space-x-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Storage
                          </Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Production
                          </Badge>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                            Assembly
                          </Badge>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            Packing
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Last 7 days</div>
                      </div>

                      <div className="flex-1">
                        {/* Simulated chart with bars */}
                        <div className="flex h-full items-end gap-4">
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-24 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-16 w-full bg-green-500"></div>
                              <div className="h-12 w-full bg-purple-500"></div>
                              <div className="h-8 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Mon</span>
                          </div>
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-28 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-14 w-full bg-green-500"></div>
                              <div className="h-10 w-full bg-purple-500"></div>
                              <div className="h-10 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Tue</span>
                          </div>
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-32 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-20 w-full bg-green-500"></div>
                              <div className="h-12 w-full bg-purple-500"></div>
                              <div className="h-8 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Wed</span>
                          </div>
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-36 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-24 w-full bg-green-500"></div>
                              <div className="h-16 w-full bg-purple-500"></div>
                              <div className="h-12 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Thu</span>
                          </div>
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-40 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-28 w-full bg-green-500"></div>
                              <div className="h-20 w-full bg-purple-500"></div>
                              <div className="h-16 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Fri</span>
                          </div>
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-32 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-20 w-full bg-green-500"></div>
                              <div className="h-12 w-full bg-purple-500"></div>
                              <div className="h-8 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Sat</span>
                          </div>
                          <div className="flex w-full flex-1 flex-col items-center">
                            <div className="mb-2 w-full space-y-1">
                              <div className="h-24 w-full rounded-t-sm bg-blue-500"></div>
                              <div className="h-12 w-full bg-green-500"></div>
                              <div className="h-8 w-full bg-purple-500"></div>
                              <div className="h-4 w-full rounded-b-sm bg-amber-500"></div>
                            </div>
                            <span className="text-xs">Sun</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zone Performance</CardTitle>
                  <CardDescription>Efficiency and utilization metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Storage Zones</h3>
                        <span className="text-sm font-bold">78%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[78%] rounded-full bg-blue-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Capacity: 5,000 units</span>
                        <span>Used: 3,900 units</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Production Zones</h3>
                        <span className="text-sm font-bold">85%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Capacity: 100 units/hour</span>
                        <span>Current: 85 units/hour</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Assembly Zones</h3>
                        <span className="text-sm font-bold">62%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[62%] rounded-full bg-purple-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Capacity: 80 units/hour</span>
                        <span>Current: 50 units/hour</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Packing Zones</h3>
                        <span className="text-sm font-bold">45%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[45%] rounded-full bg-amber-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Capacity: 120 units/hour</span>
                        <span>Current: 54 units/hour</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Shipping Zones</h3>
                        <span className="text-sm font-bold">70%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[70%] rounded-full bg-red-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Capacity: 200 units/day</span>
                        <span>Current: 140 units/day</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AGV Status Tab */}
          <TabsContent value="amr">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>AMR TMS Status</CardTitle>
                  <CardDescription>Real-time status of all automated guided vehicles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>AMR ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Current Location</TableHead>
                        <TableHead>Battery</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Current Task</TableHead>
                        <TableHead>Uptime</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">AMR-1</TableCell>
                        <TableCell>Forklift</TableCell>
                        <TableCell>Charging Station 2</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[65%] rounded-full bg-amber-500"></div>
                            </div>
                            <span className="text-xs">65%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">Charging</Badge>
                        </TableCell>
                        <TableCell>None</TableCell>
                        <TableCell>98.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AMR-2</TableCell>
                        <TableCell>Tow</TableCell>
                        <TableCell>Storage Zone A</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[82%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">82%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Idle</Badge>
                        </TableCell>
                        <TableCell>None</TableCell>
                        <TableCell>99.1%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AMR-3</TableCell>
                        <TableCell>Forklift</TableCell>
                        <TableCell>Production Line 1</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[78%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">78%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Working</Badge>
                        </TableCell>
                        <TableCell>JOB00004</TableCell>
                        <TableCell>97.8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AMR-4</TableCell>
                        <TableCell>Tow</TableCell>
                        <TableCell>Maintenance Bay</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[100%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">100%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
                        </TableCell>
                        <TableCell>None</TableCell>
                        <TableCell>94.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AMR-5</TableCell>
                        <TableCell>Forklift</TableCell>
                        <TableCell>Charging Station 1</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[45%] rounded-full bg-amber-500"></div>
                            </div>
                            <span className="text-xs">45%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">Charging</Badge>
                        </TableCell>
                        <TableCell>None</TableCell>
                        <TableCell>96.7%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AMR Performance</CardTitle>
                  <CardDescription>Operational metrics and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">TMS Utilization</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[72%] rounded-full bg-blue-500"></div>
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Average Battery Level</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[74%] rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-medium">74%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Tasks Completed Today</h3>
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs text-green-600">+8% from yesterday</div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Average Task Completion Time</h3>
                      <div className="text-2xl font-bold">14.5 min</div>
                      <div className="text-xs text-green-600">-2.3 min from last week</div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium">AMR Status Distribution</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-xs text-muted-foreground">Working</div>
                          <div className="text-lg font-bold text-blue-600">20%</div>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-xs text-muted-foreground">Idle</div>
                          <div className="text-lg font-bold text-green-600">40%</div>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-xs text-muted-foreground">Charging</div>
                          <div className="text-lg font-bold text-amber-600">30%</div>
                        </div>
                        <div className="rounded-md border p-2 text-center">
                          <div className="text-xs text-muted-foreground">Maintenance</div>
                          <div className="text-lg font-bold text-red-600">10%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Task Statistics Tab */}
          <TabsContent value="task">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Rate</CardTitle>
                  <CardDescription>Daily task completion statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border bg-white p-4">
                    <div className="flex h-full flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="space-x-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Completed
                          </Badge>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            In Progress
                          </Badge>
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Failed
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Last 7 days</div>
                      </div>

                      <div className="flex-1">
                        {/* Simulated chart with bars */}
                        <div className="flex h-full items-end gap-4">
                          {[
                            { day: "Mon", completed: 42, inProgress: 8, failed: 2 },
                            { day: "Tue", completed: 38, inProgress: 10, failed: 3 },
                            { day: "Wed", completed: 45, inProgress: 12, failed: 1 },
                            { day: "Thu", completed: 50, inProgress: 15, failed: 2 },
                            { day: "Fri", completed: 48, inProgress: 10, failed: 4 },
                            { day: "Sat", completed: 30, inProgress: 5, failed: 1 },
                            { day: "Sun", completed: 25, inProgress: 3, failed: 0 },
                          ].map((data, index) => (
                            <div key={index} className="flex w-full flex-1 flex-col items-center">
                              <div className="mb-2 w-full space-y-1">
                                <div
                                  className="w-full rounded-t-sm bg-green-500"
                                  style={{ height: `${data.completed * 2}px` }}
                                ></div>
                                <div
                                  className="w-full bg-amber-500"
                                  style={{ height: `${data.inProgress * 2}px` }}
                                ></div>
                                <div
                                  className="w-full rounded-b-sm bg-red-500"
                                  style={{ height: `${data.failed * 2}px` }}
                                ></div>
                              </div>
                              <span className="text-xs">{data.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground">Total Tasks</div>
                        <div className="text-2xl font-bold">278</div>
                        <div className="text-xs text-green-600">+12% from last week</div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                        <div className="text-2xl font-bold">94.2%</div>
                        <div className="text-xs text-green-600">+2.1% from last week</div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground">Avg. Completion Time</div>
                        <div className="text-2xl font-bold">18 min</div>
                        <div className="text-xs text-green-600">-2 min from last week</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Distribution</CardTitle>
                  <CardDescription>Tasks by type and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium">Tasks by Type</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Retrieve</span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[42%] rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Store</span>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[28%] rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Transfer</span>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[18%] rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Empty Rack</span>
                          <span className="text-sm font-medium">12%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 w-[12%] rounded-full bg-amber-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">Tasks by Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center rounded-md border p-4">
                        <div className="text-3xl font-bold text-green-600">78%</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-md border p-4">
                        <div className="text-3xl font-bold text-amber-600">15%</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-md border p-4">
                        <div className="text-3xl font-bold text-gray-600">5%</div>
                        <div className="text-sm text-muted-foreground">Pending</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-md border p-4">
                        <div className="text-3xl font-bold text-red-600">2%</div>
                        <div className="text-sm text-muted-foreground">Failed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Task Performance</CardTitle>
                  <CardDescription>Task completion times and efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task Type</TableHead>
                        <TableHead>Avg. Duration</TableHead>
                        <TableHead>Success Rate</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Retrieve</TableCell>
                        <TableCell>12 min</TableCell>
                        <TableCell>96.8%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[92%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">92%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600">↑ 3.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Store</TableCell>
                        <TableCell>15 min</TableCell>
                        <TableCell>94.5%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[88%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">88%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600">↑ 1.8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Transfer</TableCell>
                        <TableCell>22 min</TableCell>
                        <TableCell>92.1%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">85%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-amber-600">↓ 0.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Empty Rack</TableCell>
                        <TableCell>18 min</TableCell>
                        <TableCell>95.2%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div className="h-2 w-[90%] rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs">90%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600">↑ 2.4%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="mt-6 rounded-md border p-4">
                    <h3 className="mb-4 text-sm font-medium">Task Duration Distribution (minutes)</h3>
                    <div className="flex items-end gap-2">
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-12 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">0-5</span>
                      </div>
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-24 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">5-10</span>
                      </div>
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-32 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">10-15</span>
                      </div>
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-28 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">15-20</span>
                      </div>
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-20 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">20-25</span>
                      </div>
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-16 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">25-30</span>
                      </div>
                      <div className="flex h-32 w-full flex-1 flex-col items-center">
                        <div className="mb-2 h-8 w-8 rounded-t-sm bg-blue-500"></div>
                        <span className="text-xs">30+</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
