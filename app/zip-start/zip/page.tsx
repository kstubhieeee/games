import { NumberPathGame } from "@/components/number-path-game"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 pt-16 pb-8 sm:pt-8 sm:py-8">
      <div className="flex flex-col items-center gap-8">
       

        <Card className="w-full max-w-2xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Game Board</CardTitle>
            <CardDescription>
              Connect the dots in order from 1 to 8, moving only horizontally or vertically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NumberPathGame />
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold">How to Play</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">1</div>
                <p>Start from dot 1 in the top-left corner</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">2</div>
                <p>Connect dots in sequence (1 to 8)</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <p>Fill every cell in the grid</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
