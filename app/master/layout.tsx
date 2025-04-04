import type React from "react"
import { Layout } from "@/components/layout" // Change to named import

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}