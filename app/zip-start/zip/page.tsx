"use client"

import { NumberPathGame } from "@/components/number-path-game"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { puzzles } from "@/lib/puzzles"

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [showLevelSelect, setShowLevelSelect] = useState(true)

  const selectLevel = (level: number) => {
    setSelectedLevel(level)
    setShowLevelSelect(false)
  }

  const resetLevel = () => {
    setSelectedLevel(null)
    setShowLevelSelect(true)
  }

  return (
    <main className="container mx-auto px-4 pt-16 pb-8 sm:pt-8 sm:py-8">
      <div className="flex flex-col items-center gap-8">
        <Card className="w-full max-w-4xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            
            {!showLevelSelect && (
              <Button 
                variant="outline" 
                className="ml-2 flex-shrink-0 bg-white/80 hover:bg-white"
                onClick={resetLevel}
              >
                Change Level
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {showLevelSelect ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {puzzles.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-24 text-xl font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-primary/20"
                    onClick={() => selectLevel(index + 1)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>Level {index + 1}</span>
                      <span className="text-sm font-normal opacity-70">
                        {puzzles[index].length} dots
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <NumberPathGame level={selectedLevel} />
            )}
          </CardContent>
        </Card>

        {!showLevelSelect && (
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">How to Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">1</div>
                  <p className="text-lg">Start from dot 1</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">2</div>
                  <p className="text-lg">Connect dots in sequence</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <p className="text-lg">Fill every cell in the grid</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
