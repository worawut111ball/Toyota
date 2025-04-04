"use client"

import { useState, useRef, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Upload,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  X,
  Save,
} from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for stock zones
const stockZones = [
  { id: "ST01", name: "Stock Zone 1", locationId: "AP34", status: "active", itemCount: 12, type: "stock" },
  { id: "ST02", name: "Stock Zone 2", locationId: "AP38", status: "active", itemCount: 8, type: "stock" },
  { id: "ST03", name: "Stock Zone 3", locationId: "AP42", status: "active", itemCount: 15, type: "stock" },
  { id: "ST04", name: "Stock Zone 4", locationId: "AP45", status: "maintenance", itemCount: 0, type: "stock" },
]

// Mock data for production zones
const productionZones = [
  {
    id: "PD1",
    name: "Production Line 1",
    locationId: "LM45",
    status: "active",
    operator: "John Doe",
    type: "production",
  },
  {
    id: "PD2",
    name: "Production Line 2",
    locationId: "LM48",
    status: "active",
    operator: "Jane Smith",
    type: "production",
  },
  {
    id: "PD3",
    name: "Production Line 3",
    locationId: "LM52",
    status: "inactive",
    operator: "None",
    type: "production",
  },
]

// Mock data for assembly zones
const assemblyZones = [
  {
    id: "AS01",
    name: "Assembly Line 1",
    locationId: "AL10",
    status: "active",
    supervisor: "Mike Johnson",
    capacity: "High",
    type: "assembly",
  },
  {
    id: "AS02",
    name: "Assembly Line 2",
    locationId: "AL15",
    status: "active",
    supervisor: "Sarah Williams",
    capacity: "Medium",
    type: "assembly",
  },
  {
    id: "AS03",
    name: "Assembly Line 3",
    locationId: "AL20",
    status: "maintenance",
    supervisor: "None",
    capacity: "High",
    type: "assembly",
  },
  {
    id: "AS04",
    name: "Sub-Assembly Area",
    locationId: "AL25",
    status: "active",
    supervisor: "David Lee",
    capacity: "Low",
    type: "assembly",
  },
]

// Mock data for other zones
const otherZones = [
  { id: "WZ01", name: "Wrap Zone 1", locationId: "WP12", status: "active", type: "other" },
  { id: "WZ02", name: "Wrap Zone 2", locationId: "WP15", status: "active", type: "other" },
  { id: "DZ01", name: "Delivery Zone 1", locationId: "DL20", status: "active", type: "other" },
  { id: "DZ02", name: "Delivery Zone 2", locationId: "DL25", status: "active", type: "other" },
  { id: "EP01", name: "Empty Pallet Zone", locationId: "EP30", status: "active", type: "other" },
]

// Combine all zones
const allZones = [...stockZones, ...productionZones, ...assemblyZones, ...otherZones]

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mapZoom, setMapZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapMarkers, setMapMarkers] = useState([])
  const [selectedZoneType, setSelectedZoneType] = useState("all")
  const [availableZones, setAvailableZones] = useState([])
  const [selectedZone, setSelectedZone] = useState("")
  const [isAddingMarker, setIsAddingMarker] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const mapContainerRef = useRef(null)
  const [draggedMarker, setDraggedMarker] = useState(null)

  // Initialize available zones
  useEffect(() => {
    updateAvailableZones(selectedZoneType)
  }, [selectedZoneType, mapMarkers])

  // Update available zones based on selected type and already placed markers
  const updateAvailableZones = (zoneType) => {
    const placedZoneIds = mapMarkers.map((marker) => marker.id)

    let filteredZones
    if (zoneType === "all") {
      filteredZones = allZones.filter((zone) => !placedZoneIds.includes(zone.id))
    } else {
      filteredZones = allZones.filter((zone) => zone.type === zoneType && !placedZoneIds.includes(zone.id))
    }

    setAvailableZones(filteredZones)
  }

  // Filter function for search
  const filterLocations = (locations) => {
    return locations.filter(
      (location) =>
        location.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.locationId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Handle zoom controls
  const zoomIn = () => {
    if (mapZoom < 2) setMapZoom(mapZoom + 0.2)
  }

  const zoomOut = () => {
    if (mapZoom > 0.5) setMapZoom(mapZoom - 0.2)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle adding a marker to the map
  const handleAddMarker = () => {
    if (!selectedZone) return

    const zone = allZones.find((z) => z.id === selectedZone)
    if (!zone) return

    // Get random position if map container exists
    let position = { x: 50, y: 50 } // Default position
    if (mapContainerRef.current) {
      const container = mapContainerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      position = {
        x: Math.floor(Math.random() * (width - 100) + 50),
        y: Math.floor(Math.random() * (height - 100) + 50),
      }
    }

    const newMarker = {
      id: zone.id,
      name: zone.name,
      type: zone.type,
      position,
    }

    setMapMarkers([...mapMarkers, newMarker])
    setSelectedZone("")
    setIsAddingMarker(false)
  }

  // Handle marker drag start
  const handleMarkerDragStart = (e, marker) => {
    if (!isEditMode) return

    setDraggedMarker(marker)

    // Set data for drag operation
    e.dataTransfer.setData("text/plain", marker.id)
    e.dataTransfer.effectAllowed = "move"

    // Set a custom ghost image (optional)
    const ghostElement = document.createElement("div")
    ghostElement.classList.add("w-8", "h-8", "bg-primary", "rounded-full", "flex", "items-center", "justify-center")
    ghostElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
    document.body.appendChild(ghostElement)
    e.dataTransfer.setDragImage(ghostElement, 12, 12)
    setTimeout(() => {
      document.body.removeChild(ghostElement)
    }, 0)
  }

  // Handle map drag over
  const handleMapDragOver = (e) => {
    if (!isEditMode) return
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  // Handle map drop
  const handleMapDrop = (e) => {
    if (!isEditMode || !draggedMarker) return
    e.preventDefault()

    const markerId = e.dataTransfer.getData("text/plain")
    if (!markerId) return

    // Calculate position relative to the map container
    const rect = mapContainerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / mapZoom
    const y = (e.clientY - rect.top) / mapZoom

    // Update marker position
    const updatedMarkers = mapMarkers.map((marker) => {
      if (marker.id === markerId) {
        return { ...marker, position: { x, y } }
      }
      return marker
    })

    setMapMarkers(updatedMarkers)
    setDraggedMarker(null)
  }

  // Handle removing a marker
  const handleRemoveMarker = (markerId) => {
    setMapMarkers(mapMarkers.filter((marker) => marker.id !== markerId))
  }

  // Get marker color based on type
  const getMarkerColor = (type) => {
    switch (type) {
      case "stock":
        return "bg-red-500 hover:bg-red-600"
      case "production":
        return "bg-blue-500 hover:bg-blue-600"
      case "assembly":
        return "bg-green-500 hover:bg-green-600"
      case "other":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold">Location Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Location
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="stock">
          <TabsList className="mb-4">
            <TabsTrigger value="stock">Stock Zones</TabsTrigger>
            <TabsTrigger value="production">Production Zones</TabsTrigger>
            <TabsTrigger value="assembly">Assembly Zones</TabsTrigger>
            <TabsTrigger value="other">Other Zones</TabsTrigger>
            <TabsTrigger value="map">Location Map</TabsTrigger>
          </TabsList>

          <TabsContent value="stock">
            <Card>
              <CardHeader>
                <CardTitle>Stock Zones</CardTitle>
                <CardDescription>Manage storage locations for inventory items</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zone ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterLocations(stockZones).map((zone) => (
                      <TableRow key={zone.id}>
                        <TableCell className="font-medium">{zone.id}</TableCell>
                        <TableCell>{zone.name}</TableCell>
                        <TableCell>{zone.locationId}</TableCell>
                        <TableCell>
                          <Badge variant={zone.status === "active" ? "default" : "secondary"}>{zone.status}</Badge>
                        </TableCell>
                        <TableCell>{zone.itemCount}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <Card>
              <CardHeader>
                <CardTitle>Production Zones</CardTitle>
                <CardDescription>Manage production line locations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zone ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterLocations(productionZones).map((zone) => (
                      <TableRow key={zone.id}>
                        <TableCell className="font-medium">{zone.id}</TableCell>
                        <TableCell>{zone.name}</TableCell>
                        <TableCell>{zone.locationId}</TableCell>
                        <TableCell>
                          <Badge variant={zone.status === "active" ? "default" : "secondary"}>{zone.status}</Badge>
                        </TableCell>
                        <TableCell>{zone.operator}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assembly">
            <Card>
              <CardHeader>
                <CardTitle>Assembly Zones</CardTitle>
                <CardDescription>Manage assembly line locations and areas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zone ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Supervisor</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterLocations(assemblyZones).map((zone) => (
                      <TableRow key={zone.id}>
                        <TableCell className="font-medium">{zone.id}</TableCell>
                        <TableCell>{zone.name}</TableCell>
                        <TableCell>{zone.locationId}</TableCell>
                        <TableCell>
                          <Badge variant={zone.status === "active" ? "default" : "secondary"}>{zone.status}</Badge>
                        </TableCell>
                        <TableCell>{zone.supervisor}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              zone.capacity === "High"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : zone.capacity === "Medium"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                            }
                          >
                            {zone.capacity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card>
              <CardHeader>
                <CardTitle>Other Zones</CardTitle>
                <CardDescription>Manage wrap zones, delivery zones, and empty pallet storage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zone ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterLocations(otherZones).map((zone) => (
                      <TableRow key={zone.id}>
                        <TableCell className="font-medium">{zone.id}</TableCell>
                        <TableCell>{zone.name}</TableCell>
                        <TableCell>{zone.locationId}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{zone.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={zone.status === "active" ? "default" : "secondary"}>{zone.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Location Map</CardTitle>
                  <CardDescription>Visual representation of all locations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isEditMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditMode ? "Exit Edit Mode" : "Edit Map"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Map
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : "h-[600px]"} w-full overflow-auto rounded-lg border bg-muted/20`}
                >
                  {isFullscreen && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-4 z-10"
                      onClick={toggleFullscreen}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  )}

                  {isEditMode && (
                    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-lg border bg-background p-3 shadow-md">
                      <h3 className="text-sm font-medium">Map Editor</h3>
                      <div className="flex items-center gap-2">
                        <Dialog open={isAddingMarker} onOpenChange={setIsAddingMarker}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="mr-2 h-3 w-3" />
                              Add Zone
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Zone to Map</DialogTitle>
                              <DialogDescription>
                                Select a zone to add to the map. You can drag and position it after adding.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="zone-type" className="text-right text-sm font-medium">
                                  Zone Type
                                </label>
                                <Select
                                  value={selectedZoneType}
                                  onValueChange={(value) => {
                                    setSelectedZoneType(value)
                                    setSelectedZone("")
                                  }}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select zone type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">All Zones</SelectItem>
                                    <SelectItem value="stock">Stock Zones</SelectItem>
                                    <SelectItem value="production">Production Zones</SelectItem>
                                    <SelectItem value="assembly">Assembly Zones</SelectItem>
                                    <SelectItem value="other">Other Zones</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="zone" className="text-right text-sm font-medium">
                                  Zone
                                </label>
                                <Select
                                  value={selectedZone}
                                  onValueChange={setSelectedZone}
                                  disabled={availableZones.length === 0}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a zone" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableZones.length === 0 ? (
                                      <SelectItem value="" disabled>
                                        No available zones
                                      </SelectItem>
                                    ) : (
                                      availableZones.map((zone) => (
                                        <SelectItem key={zone.id} value={zone.id}>
                                          {zone.id} - {zone.name}
                                        </SelectItem>
                                      ))
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsAddingMarker(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddMarker} disabled={!selectedZone}>
                                Add to Map
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setMapMarkers([])}
                          disabled={mapMarkers.length === 0}
                        >
                          Clear All
                        </Button>
                      </div>

                      {mapMarkers.length > 0 && (
                        <div className="mt-2 max-h-40 overflow-y-auto">
                          <h4 className="mb-1 text-xs font-medium text-muted-foreground">Placed Zones:</h4>
                          <div className="space-y-1">
                            {mapMarkers.map((marker) => {
                              const zone = allZones.find((z) => z.id === marker.id)
                              return (
                                <div key={marker.id} className="flex items-center justify-between text-xs">
                                  <span>
                                    {marker.id} - {marker.name}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleRemoveMarker(marker.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    ref={mapContainerRef}
                    className="relative h-full w-full overflow-auto"
                    onDragOver={handleMapDragOver}
                    onDrop={handleMapDrop}
                  >
                    <div
                      className="relative inline-block min-w-full transform transition-transform duration-200"
                      style={{ transform: `scale(${mapZoom})`, transformOrigin: "top left" }}
                    >
                      <Image
                        src="/images/factory-layout.png"
                        alt="Factory Layout Map"
                        width={1800}
                        height={1000}
                        className="min-w-full"
                      />

                      {/* Map markers */}
                      {mapMarkers.map((marker) => (
                        <div
                          key={marker.id}
                          className={`absolute cursor-${isEditMode ? "move" : "pointer"} rounded-full p-2 text-white ${getMarkerColor(marker.type)}`}
                          style={{
                            left: `${marker.position.x}px`,
                            top: `${marker.position.y}px`,
                            zIndex: draggedMarker?.id === marker.id ? 100 : 10,
                          }}
                          draggable={isEditMode}
                          onDragStart={(e) => handleMarkerDragStart(e, marker)}
                        >
                          <MapPin className="h-4 w-4" />
                          <div className="absolute left-full ml-2 top-0 z-20 whitespace-nowrap rounded-md bg-white p-2 shadow-lg">
                            <p className="font-medium">{marker.name}</p>
                            <p className="text-xs text-muted-foreground">{marker.id}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Stock Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Production Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Assembly Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Other Zones</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                {isEditMode && (
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Map Layout
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

