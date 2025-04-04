"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react"
import Image from "next/image"


// Define location points
const locationPoints = [
  { id: "LM1", name: "Location 1", x: 442, y: 360, color: "orange" },
  { id: "LM2", name: "Location 2", x: 175, y: 260, color: "orange" },
  { id: "LM3", name: "Location 3", x: 265, y: 260, color: "orange" },
  { id: "LM4", name: "Location 4", x: 355, y: 260, color: "orange" },
  { id: "LM5", name: "Location 5", x: 485, y: 260, color: "orange" },
  { id: "LM6", name: "Location 6", x: 585, y: 150, color: "orange" },
  { id: "LM7", name: "Location 7", x: 705, y: 150, color: "orange" },
  { id: "CP8", name: "Control Point 8", x: 93, y: 260, color: "green" },
]

export default function ManualControlPage() {
  const [robotId, setRobotId] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [action, setAction] = useState<"pickup" | "place">("pickup")
  const [mapZoom, setMapZoom] = useState(1)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId)
  }

  const handleSendCommand = () => {
    if (!robotId || !selectedLocation) return

    // In a real application, this would send the command to the robot
    console.log(`Sending command to robot ${robotId}: ${action} at location ${selectedLocation}`)

    // Show a success message or update UI
    alert(`Command sent to robot ${robotId}: ${action} at location ${selectedLocation}`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Manual Robot Control</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Warehouse Floor Plan</CardTitle>
              <CardDescription>Click on a location to select destination</CardDescription>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setMapZoom((prev) => Math.min(prev + 0.1, 1.5))}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMapZoom((prev) => Math.max(prev - 0.1, 0.8))}>
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-md overflow-hidden" style={{ height: "500px" }}>
                <div
                  className="relative"
                  style={{ transform: `scale(${mapZoom})`, transformOrigin: "top left", height: "100%", width: "100%" }}
                >
                  <Image
                    src="/images/warehouse-floor-plan.png"
                    alt="Warehouse Floor Plan"
                    width={800}
                    height={500}
                    className="object-contain"
                  />

                  {/* Location Points */}
                  {locationPoints.map((location) => (
                    <div
                      key={location.id}
                      className={`absolute cursor-pointer transition-all duration-200 ${selectedLocation === location.id ? "ring-2 ring-blue-500 scale-110" : ""}`}
                      style={{
                        top: `${location.y}px`,
                        left: `${location.x}px`,
                        width: "20px",
                        height: "20px",
                        backgroundColor: selectedLocation === location.id ? "blue" : location.color,
                        borderRadius: "50%",
                        transform: `translate(-50%, -50%) ${selectedLocation === location.id ? "scale(1.2)" : "scale(1)"}`,
                      }}
                      onClick={() => handleLocationClick(location.id)}
                      onMouseEnter={() => setShowTooltip(location.id)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      {showTooltip === location.id && (
                        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          {location.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Control Panel</CardTitle>
              <CardDescription>Configure robot commands</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="robotId">Robot ID</Label>
                <Input
                  id="robotId"
                  value={robotId}
                  onChange={(e) => setRobotId(e.target.value)}
                  placeholder="Enter Robot ID"
                />
              </div>

              <div className="grid gap-2">
                <Label>Selected Location</Label>
                <Select value={selectedLocation || ""} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationPoints.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Action</Label>
                <RadioGroup value={action} onValueChange={(value) => setAction(value as "pickup" | "place")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Pick Up Item</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="place" id="place" />
                    <Label htmlFor="place">Place Item</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-4">
                <Button className="w-full" disabled={!robotId || !selectedLocation} onClick={handleSendCommand}>
                  Send Command to Robot
                </Button>
              </div>

              <div className="mt-6">
                <Label className="mb-2 block">Manual Movement</Label>
                <div className="flex justify-center">
                  <div className="grid gap-2">
                    <Button size="icon" className="h-10 w-10 mx-auto">
                      <ArrowUp className="h-5 w-5" />
                      <span className="sr-only">Move Forward</span>
                    </Button>
                    <div className="flex">
                      <Button size="icon" className="h-10 w-10 mr-2">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Move Left</span>
                      </Button>
                      <Button size="icon" className="h-10 w-10">
                        <ArrowRight className="h-5 w-5" />
                        <span className="sr-only">Move Right</span>
                      </Button>
                    </div>
                    <Button size="icon" className="h-10 w-10 mx-auto">
                      <ArrowDown className="h-5 w-5" />
                      <span className="sr-only">Move Backward</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline">Stop</Button>
                <Button>Start</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

