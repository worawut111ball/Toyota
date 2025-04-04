import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ReportsLoading() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-[400px]" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-[400px] w-full mb-8" />

          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

