"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BotIcon as Robot, Battery, MapPin, AlertCircle, CheckCircle2, Zap } from "lucide-react"

// Mock robot data
const robots = [
  {
    id: "AMR-01",
    name: "Robot 1",
    status: "active",
    battery: 85,
    location: "ST01 (AP34)",
    lastTask: "T1001",
    lastTaskTime: "2023-12-22T09:30:00",
    totalTasks: 156,
    uptime: "98.5%",
  },
  {
    id: "AMR-02",
    name: "Robot 2",
    status: "active",
    battery: 62,
    location: "PD2 (LM48)",
    lastTask: "T1002",
    lastTaskTime: "2023-12-22T09:35:00",
    totalTasks: 142,
    uptime: "97.2%",
  },
  {
    id: "AMR-03",
    name: "Robot 3",
    status: "active",
    battery: 78,
    location: "EP01 (EP30)",
    lastTask: "T1003",
    lastTaskTime: "2023-12-22T09:40:00",
    totalTasks: 138,
    uptime: "99.1%",
  },
  {
    id: "AMR-04",
    name: "Robot 4",
    status: "maintenance",
    battery: 100,
    location: "Maintenance Bay",
    lastTask: "T0990",
    lastTaskTime: "2023-12-22T08:15:00",
    totalTasks: 125,
    uptime: "94.8%",
  },
]

export default function RobotsPage() {
  const [selectedRobot, setSelectedRobot] = useState(robots[0])

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  // Get battery status color
  const getBatteryColor = (level) => {
    if (level > 70) return "text-green-500"
    if (level > 30) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold">Robot Fleet Management</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Robot Fleet</CardTitle>
                <CardDescription>Status of all robots in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {robots.map((robot) => (
                    <Button
                      key={robot.id}
                      variant={selectedRobot.id === robot.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedRobot(robot)}
                    >
                      <Robot className="mr-2 h-4 w-4" />
                      <div className="flex flex-1 items-center justify-between">
                        <span>{robot.name}</span>
                        <Badge variant={robot.status === "active" ? "default" : "secondary"}>{robot.status}</Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedRobot.name} ({selectedRobot.id})
                    </CardTitle>
                    <CardDescription>Detailed robot information and controls</CardDescription>
                  </div>
                  <Badge variant={selectedRobot.status === "active" ? "default" : "secondary"} className="px-3 py-1">
                    {selectedRobot.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="status">
                  <TabsList className="mb-4">
                    <TabsTrigger value="status">Status</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="status">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 text-sm font-medium">Battery Level</h3>
                          <div className="flex items-center gap-2">
                            <Battery className={`h-5 w-5 ${getBatteryColor(selectedRobot.battery)}`} />
                            <Progress value={selectedRobot.battery} className="h-2 flex-1" />
                            <span className={`text-sm font-medium ${getBatteryColor(selectedRobot.battery)}`}>
                              {selectedRobot.battery}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-sm font-medium">Current Location</h3>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>{selectedRobot.location}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-sm font-medium">Last Task</h3>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>
                              {selectedRobot.lastTask} ({formatDate(selectedRobot.lastTaskTime)})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 text-sm font-medium">Total Tasks Completed</h3>
                          <div className="text-2xl font-bold">{selectedRobot.totalTasks}</div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-sm font-medium">Uptime</h3>
                          <div className="text-2xl font-bold">{selectedRobot.uptime}</div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-sm font-medium">Status</h3>
                          <div className="flex items-center gap-2">
                            {selectedRobot.status === "active" ? (
                              <>
                                <Zap className="h-5 w-5 text-green-500" />
                                <span className="text-green-500">Operational</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                                <span className="text-amber-500">In Maintenance</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">T1001</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Retrieve</Badge>
                          </TableCell>
                          <TableCell>ST01</TableCell>
                          <TableCell>PD1</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">In Progress</Badge>
                          </TableCell>
                          <TableCell>09:30:00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">T0998</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Retrieve</Badge>
                          </TableCell>
                          <TableCell>ST03</TableCell>
                          <TableCell>PD2</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Completed</Badge>
                          </TableCell>
                          <TableCell>09:15:00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">T0995</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Retrieve</Badge>
                          </TableCell>
                          <TableCell>ST02</TableCell>
                          <TableCell>PD1</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Completed</Badge>
                          </TableCell>
                          <TableCell>09:00:00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="maintenance">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">Last Maintenance</h3>
                        <p>2023-12-15 (7 days ago)</p>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">Next Scheduled Maintenance</h3>
                        <p>2024-01-15 (24 days remaining)</p>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">Maintenance History</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Technician</TableHead>
                              <TableHead>Notes</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>2023-12-15</TableCell>
                              <TableCell>Regular</TableCell>
                              <TableCell>John Smith</TableCell>
                              <TableCell>Battery check, software update</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2023-11-15</TableCell>
                              <TableCell>Regular</TableCell>
                              <TableCell>Jane Doe</TableCell>
                              <TableCell>Wheel calibration</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2023-10-15</TableCell>
                              <TableCell>Regular</TableCell>
                              <TableCell>John Smith</TableCell>
                              <TableCell>Sensor cleaning</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Send to Charging</Button>
                <Button variant="outline">Schedule Maintenance</Button>
                <Button>Assign Task</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

