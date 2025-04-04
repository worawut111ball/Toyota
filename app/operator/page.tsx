"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { QrCode, Eye, EyeOff } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Layout } from "@/components/layout"

export default function OperatorPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeScreen, setActiveScreen] = useState("menu")
  const [loginError, setLoginError] = useState("")
  const isMobile = useIsMobile()

  // Form data states
  const [rackNo, setRackNo] = useState("")
  const [loadingPoint, setLoadingPoint] = useState("")
  const [partNo, setPartNo] = useState("")
  const [location, setLocation] = useState("")
  const [wipItem, setWipItem] = useState("")
  const [wipStation, setWipStation] = useState("")
  const [fgItem, setFgItem] = useState("")
  const [fgDestination, setFgDestination] = useState("")
  const [locationCode, setLocationCode] = useState("")

  // First, add a new state for location status
  const [locationStatus, setLocationStatus] = useState("")

  // Mock login function
  const handleLogin = (e) => {
    e.preventDefault()
    // Simple validation
    if (!username || !password) {
      setLoginError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน")
      return
    }

    // Mock authentication (in a real app, this would call an API)
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true)
      setActiveScreen("menu")
      setLoginError("")
    } else {
      setLoginError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("test")
    setPassword("test")
    setActiveScreen("menu")
  }

  // Reset form data when changing screens
  useEffect(() => {
    setRackNo("")
    setLoadingPoint("")
    setPartNo("")
    setLocation("")
    setWipItem("")
    setWipStation("")
    setFgItem("")
    setFgDestination("")
    setLocationCode("")
    // In the useEffect hook that resets form data, add:
    setLocationStatus("")
  }, [activeScreen])

  // Mobile view components
  const MobileOperatorConsole = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex min-h-screen flex-col bg-gray-50">
          <header className="border-b bg-white p-4">
            <h1 className="text-center text-xl font-bold">CALL SYSTEM</h1>
          </header>

          <div className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-sm border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>CALL SYSTEM</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="rounded-full bg-gray-100"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const passwordInput = document.querySelector('input[type="password"]');
                          passwordInput?.focus();
                        }
                      }}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-full bg-gray-100 pr-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleLogin(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {loginError && <p className="text-center text-sm text-red-500">{loginError}</p>}
                  <div className="text-center text-xs">
                    <a href="#" className="text-sky-500">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="pt-2 text-center">
                    <Button type="submit" className="w-32 rounded-full bg-sky-500 hover:bg-sky-600">
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <footer className="border-t bg-white p-2 text-center text-xs text-gray-500">IMS System v1.0</footer>
        </div>
      )
    }

    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="border-b bg-white p-4">
          <h1 className="text-center text-xl font-bold">CALL SYSTEM</h1>
        </header>

        <div className="flex-1 p-4">
          {activeScreen === "menu" && (
            <Card className="border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>MENU</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-6">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={() => setActiveScreen("loading")}
                  >
                    LOADING
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={() => setActiveScreen("rm-call")}
                  >
                    RM Call
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={() => setActiveScreen("wip-call")}
                  >
                    WIP Call
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={() => setActiveScreen("fg-call")}
                  >
                    FG Call
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={() => setActiveScreen("location-check")}
                  >
                    Location Check
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <Button variant="outline" className="text-red-500" onClick={handleLogout}>
                  Logout
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeScreen === "loading" && (
            <Card className="border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>LOADING</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Rack No.</label>
                    <Input className="h-10 rounded-md" value={rackNo} onChange={(e) => setRackNo(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Loading Point</label>
                    <Input
                      className="h-10 rounded-md"
                      value={loadingPoint}
                      onChange={(e) => setLoadingPoint(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="h-24 w-24 rounded border-2 border-dashed border-gray-300 p-2">
                      <QrCode className="h-full w-full text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" onClick={() => setActiveScreen("menu")}>
                  Back
                </Button>
                <Button className="w-32 rounded-full bg-sky-500 hover:bg-sky-600">CONFIRM</Button>
              </CardFooter>
            </Card>
          )}

          {activeScreen === "rm-call" && (
            <Card className="border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>RM CALL</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Part No.</label>
                    <Input className="h-10 rounded-md" value={partNo} onChange={(e) => setPartNo(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Location</label>
                    <Input className="h-10 rounded-md" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="h-24 w-24 rounded border-2 border-dashed border-gray-300 p-2">
                      <QrCode className="h-full w-full text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" onClick={() => setActiveScreen("menu")}>
                  Back
                </Button>
                <Button className="w-32 rounded-full bg-sky-500 hover:bg-sky-600">CONFIRM</Button>
              </CardFooter>
            </Card>
          )}

          {activeScreen === "wip-call" && (
            <Card className="border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>WIP CALL</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">WIP Item</label>
                    <Input className="h-10 rounded-md" value={wipItem} onChange={(e) => setWipItem(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Work Station</label>
                    <Input
                      className="h-10 rounded-md"
                      value={wipStation}
                      onChange={(e) => setWipStation(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="h-24 w-24 rounded border-2 border-dashed border-gray-300 p-2">
                      <QrCode className="h-full w-full text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" onClick={() => setActiveScreen("menu")}>
                  Back
                </Button>
                <Button className="w-32 rounded-full bg-sky-500 hover:bg-sky-600">CONFIRM</Button>
              </CardFooter>
            </Card>
          )}

          {activeScreen === "fg-call" && (
            <Card className="border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>FG CALL</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Finished Good Item</label>
                    <Input className="h-10 rounded-md" value={fgItem} onChange={(e) => setFgItem(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Destination</label>
                    <Input
                      className="h-10 rounded-md"
                      value={fgDestination}
                      onChange={(e) => setFgDestination(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="h-24 w-24 rounded border-2 border-dashed border-gray-300 p-2">
                      <QrCode className="h-full w-full text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" onClick={() => setActiveScreen("menu")}>
                  Back
                </Button>
                <Button className="w-32 rounded-full bg-sky-500 hover:bg-sky-600">CONFIRM</Button>
              </CardFooter>
            </Card>
          )}

          {activeScreen === "location-check" && (
            <Card className="border-2">
              <CardHeader className="bg-gray-100 pb-2 pt-2 text-center">
                <CardTitle>LOCATION CHECK</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Location Code</label>
                    <Input
                      className="h-10 rounded-md"
                      value={locationCode}
                      onChange={(e) => setLocationCode(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="h-24 w-24 rounded border-2 border-dashed border-gray-300 p-2">
                      <QrCode className="h-full w-full text-gray-400" />
                    </div>
                  </div>

                  {locationCode && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <h3 className="mb-2 font-medium">Location Information</h3>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Zone:</span> Storage Zone A
                        </p>
                        <p>
                          <span className="font-medium">Rack:</span> R-101
                        </p>
                        <p>
                          <span className="font-medium">Status:</span> {locationStatus || "Available"}
                        </p>
                        <p>
                          <span className="font-medium">Items:</span> 12 items stored
                        </p>
                      </div>

                      <div className="mt-3">
                        <label className="mb-1 block text-sm font-medium">Change Status</label>
                        <select
                          className="w-full rounded-md border border-gray-300 p-2 text-sm"
                          value={locationStatus}
                          onChange={(e) => setLocationStatus(e.target.value)}
                        >
                          <option value="">Available</option>
                          <option value="Clear">Clear</option>
                          <option value="Block">Block</option>
                          <option value="Reset">Reset</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" onClick={() => setActiveScreen("menu")}>
                  Back
                </Button>
                <Button className="w-32 rounded-full bg-sky-500 hover:bg-sky-600">CHECK</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <footer className="border-t bg-white p-2 text-center text-xs text-gray-500">IMS System v1.0</footer>
      </div>
    )
  }

  // Desktop view
  const DesktopOperatorConsole = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">IMS System Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const passwordInput = document.querySelector('input[type="password"]');
                        passwordInput?.focus();
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleLogin(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                <div className="text-right text-sm">
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return (
      <Layout>
        <div className="container py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Operator Console</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-primary hover:shadow-md">
              <CardHeader>
                <CardTitle>Loading</CardTitle>
                <CardDescription>Manage loading operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Process loading operations for racks and pallets to specific loading points.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setActiveScreen("loading")}>
                  Open Loading
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:border-primary hover:shadow-md">
              <CardHeader>
                <CardTitle>RM Call</CardTitle>
                <CardDescription>Request raw materials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Request raw materials from storage to be delivered to production lines.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setActiveScreen("rm-call")}>
                  Open RM Call
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:border-primary hover:shadow-md">
              <CardHeader>
                <CardTitle>WIP Call</CardTitle>
                <CardDescription>Work in progress management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Request work-in-progress items to be moved between workstations.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setActiveScreen("wip-call")}>
                  Open WIP Call
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:border-primary hover:shadow-md">
              <CardHeader>
                <CardTitle>FG Call</CardTitle>
                <CardDescription>Finished goods management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Process finished goods for storage or shipping to destinations.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setActiveScreen("fg-call")}>
                  Open FG Call
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:border-primary hover:shadow-md">
              <CardHeader>
                <CardTitle>Location Check</CardTitle>
                <CardDescription>Verify location information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check details about specific locations, racks, and storage areas.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setActiveScreen("location-check")}>
                  Open Location Check
                </Button>
              </CardFooter>
            </Card>
          </div>

          {activeScreen !== "menu" && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {activeScreen === "loading" && "Loading Operation"}
                  {activeScreen === "rm-call" && "Raw Material Call"}
                  {activeScreen === "wip-call" && "Work In Progress Call"}
                  {activeScreen === "fg-call" && "Finished Goods Call"}
                  {activeScreen === "location-check" && "Location Check"}
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setActiveScreen("menu")}>
                  Back to Menu
                </Button>
              </CardHeader>
              <CardContent>
                {activeScreen === "loading" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rack No.</label>
                        <Input value={rackNo} onChange={(e) => setRackNo(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Loading Point</label>
                        <Input value={loadingPoint} onChange={(e) => setLoadingPoint(e.target.value)} />
                      </div>
                      <Button className="mt-4">Confirm Loading</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-48 w-48 rounded border-2 border-dashed border-gray-300 p-4">
                        <QrCode className="h-full w-full text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Scan QR code to load data</p>
                    </div>
                  </div>
                )}

                {activeScreen === "rm-call" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Part No.</label>
                        <Input value={partNo} onChange={(e) => setPartNo(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                      </div>
                      <Button className="mt-4">Confirm RM Call</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-48 w-48 rounded border-2 border-dashed border-gray-300 p-4">
                        <QrCode className="h-full w-full text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Scan QR code to load data</p>
                    </div>
                  </div>
                )}

                {activeScreen === "wip-call" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">WIP Item</label>
                        <Input value={wipItem} onChange={(e) => setWipItem(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Work Station</label>
                        <Input value={wipStation} onChange={(e) => setWipStation(e.target.value)} />
                      </div>
                      <Button className="mt-4">Confirm WIP Call</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-48 w-48 rounded border-2 border-dashed border-gray-300 p-4">
                        <QrCode className="h-full w-full text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Scan QR code to load data</p>
                    </div>
                  </div>
                )}

                {activeScreen === "fg-call" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Finished Good Item</label>
                        <Input value={fgItem} onChange={(e) => setFgItem(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Destination</label>
                        <Input value={fgDestination} onChange={(e) => setFgDestination(e.target.value)} />
                      </div>
                      <Button className="mt-4">Confirm FG Call</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-48 w-48 rounded border-2 border-dashed border-gray-300 p-4">
                        <QrCode className="h-full w-full text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Scan QR code to load data</p>
                    </div>
                  </div>
                )}

                {activeScreen === "location-check" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location Code</label>
                        <Input value={locationCode} onChange={(e) => setLocationCode(e.target.value)} />
                      </div>
                      <Button className="mt-4">Check Location</Button>

                      {locationCode && (
                        <div className="mt-4 rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Location Information</h3>
                          <div className="space-y-2">
                            <p>
                              <span className="font-medium">Zone:</span> Storage Zone A
                            </p>
                            <p>
                              <span className="font-medium">Rack:</span> R-101
                            </p>
                            <p>
                              <span className="font-medium">Status:</span> {locationStatus || "Available"}
                            </p>
                            <p>
                              <span className="font-medium">Items:</span> 12 items stored
                            </p>
                            <p>
                              <span className="font-medium">Last Updated:</span> Today, 10:45 AM
                            </p>
                          </div>

                          <div className="mt-4">
                            <label className="mb-2 block text-sm font-medium">Change Location Status</label>
                            <select
                              className="w-full rounded-md border border-gray-300 p-2"
                              value={locationStatus}
                              onChange={(e) => setLocationStatus(e.target.value)}
                            >
                              <option value="">Available</option>
                              <option value="Clear">Clear</option>
                              <option value="Block">Block</option>
                              <option value="Reset">Reset</option>
                            </select>

                            <Button className="mt-2">Update Status</Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-48 w-48 rounded border-2 border-dashed border-gray-300 p-4">
                        <QrCode className="h-full w-full text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Scan QR code to load data</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </Layout>
    )
  }

  // Render based on screen size
  return isMobile ? <MobileOperatorConsole /> : <DesktopOperatorConsole />
}

