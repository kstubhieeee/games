"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 z-50"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  )
} 