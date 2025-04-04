"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react"

// Mock task data
const activeTasks = [
  {
    id: "T1001",
    type: "retrieve",
    source: "ST01",
    destination: "PD1",
    itemCode: "2014954AEC-2547",
    robot: "AMR-01",
    status: "in-progress",
    progress: 65,
    createdAt: "2023-12-22T09:30:00",
    estimatedCompletion: "2023-12-22T09:45:00",
  },
  {
    id: "T1002",
    type: "store",
    source: "PD2",
    destination: "ST02",
    itemCode: "EAM238102-212",
    robot: "AMR-02",
    status: "in-progress",
    progress: 30,
    createdAt: "2023-12-22T09:35:00",
    estimatedCompletion: "2023-12-22T09:50:00",
  },
  {
    id: "T1003",
    type: "empty-rack",
    source: "EP01",
    destination: "PD1",
    itemCode: "N/A",
    robot: "AMR-03",
    status: "in-progress",
    progress: 80,
    createdAt: "2023-12-22T09:40:00",
    estimatedCompletion: "2023-12-22T09:55:00",
  },
]

const completedTasks = [
  {
    id: "T0998",
    type: "retrieve",
    source: "ST03",
    destination: "PD2",
    itemCode: "PCB7890-XYZ",
    robot: "AMR-01",
    status: "completed",
    completedAt: "2023-12-22T09:15:00",
  },
  {
    id: "T0997",
    type: "store",
    source: "PD1",
    destination: "ST01",
    itemCode: "MEM8765-DDR4",
    robot: "AMR-02",
    status: "completed",
    completedAt: "2023-12-22T09:10:00",
  },
  {
    id: "T0996",
    type: "empty-rack",
    source: "EP01",
    destination: "PD2",
    itemCode: "N/A",
    robot: "AMR-03",
    status: "completed",
    completedAt: "2023-12-22T09:05:00",
  },
  {
    id: "T0995",
    type: "retrieve",
    source: "ST02",
    destination: "PD1",
    itemCode: "CAB4567-USB",
    robot: "AMR-01",
    status: "completed",
    completedAt: "2023-12-22T09:00:00",
  },
]

const errorTasks = [
  {
    id: "T0999",
    type: "retrieve",
    source: "ST02",
    destination: "PD1",
    itemCode: "CPU9876-I7",
    robot: "AMR-03",
    status: "error",
    error: "Path blocked",
    createdAt: "2023-12-22T09:20:00",
  },
  {
    id: "T0994",
    type: "store",
    source: "PD2",
    destination: "ST03",
    itemCode: "PSU3456-750W",
    robot: "AMR-02",
    status: "error",
    error: "Item not found",
    createdAt: "2023-12-22T08:55:00",
  },
]

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("active")

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  // Get task type badge
  const getTaskTypeBadge = (type) => {
    switch (type) {
      case "retrieve":
        return <Badge className="bg-blue-500">Retrieve</Badge>
      case "store":
        return <Badge className="bg-green-500">Store</Badge>
      case "empty-rack":
        return <Badge className="bg-purple-500">Empty Rack</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Get task status badge
  const getTaskStatusBadge = (status) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-amber-500">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Task
          </Button>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">
              Active Tasks
              <Badge className="ml-2 bg-amber-500">{activeTasks.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed Tasks
              <Badge className="ml-2 bg-green-500">{completedTasks.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="error">
              Error Tasks
              <Badge className="ml-2 bg-red-500">{errorTasks.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
                <CardDescription>Currently running robot tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Item Code</TableHead>
                      <TableHead>Robot</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Est. Completion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.id}</TableCell>
                        <TableCell>{getTaskTypeBadge(task.type)}</TableCell>
                        <TableCell>{task.source}</TableCell>
                        <TableCell>{task.destination}</TableCell>
                        <TableCell>{task.itemCode}</TableCell>
                        <TableCell>{task.robot}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={task.progress} className="h-2 w-[100px]" />
                            <span className="text-xs">{task.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(task.createdAt)}</TableCell>
                        <TableCell>{formatDate(task.estimatedCompletion)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>Successfully completed robot tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Item Code</TableHead>
                      <TableHead>Robot</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Completed At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.id}</TableCell>
                        <TableCell>{getTaskTypeBadge(task.type)}</TableCell>
                        <TableCell>{task.source}</TableCell>
                        <TableCell>{task.destination}</TableCell>
                        <TableCell>{task.itemCode}</TableCell>
                        <TableCell>{task.robot}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Completed</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(task.completedAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="error">
            <Card>
              <CardHeader>
                <CardTitle>Error Tasks</CardTitle>
                <CardDescription>Tasks that encountered errors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Item Code</TableHead>
                      <TableHead>Robot</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errorTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.id}</TableCell>
                        <TableCell>{getTaskTypeBadge(task.type)}</TableCell>
                        <TableCell>{task.source}</TableCell>
                        <TableCell>{task.destination}</TableCell>
                        <TableCell>{task.itemCode}</TableCell>
                        <TableCell>{task.robot}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span>Error</span>
                          </div>
                        </TableCell>
                        <TableCell>{task.error}</TableCell>
                        <TableCell>{formatDate(task.createdAt)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Retry
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

