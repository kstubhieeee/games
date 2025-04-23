"use client"

import { X, Flag, Share2, Flame } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { GameIcons } from "@/components/game-icons"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const profiles = [
  { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", alt: "Player 1" },
  { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", alt: "Player 2" },
  { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper", alt: "Player 3" },
  { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna", alt: "Player 4" },
  { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya", alt: "Player 5" },
]

const games = [
  {
    id: "tango",
    title: "Tango #197",
    description: "A unique puzzle combining pattern recognition and strategy",
    route: "/tango",
    icon: GameIcons.Tango,
    color: "bg-gradient-to-br from-slate-600 to-slate-700",
    comingSoon: true,
  },
  {
    id: "queens",
    title: "Queens #357",
    description: "Classic chess-inspired puzzle with queen placement challenges",
    route: "/queens",
    icon: GameIcons.Queens,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    comingSoon: true,
  },
  {
    id: "pinpoint",
    title: "Pinpoint #357",
    description: "Test your precision and spatial awareness",
    route: "/pinpoint",
    icon: GameIcons.Pinpoint,
    color: "bg-gradient-to-br from-blue-600 to-blue-700",
    comingSoon: true,
  },
]

// Format time in MM:SS format
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const time = searchParams.get('time') || '0'
  const backtracks = searchParams.get('backtracks') || '0'
  
  // State for next puzzle countdown
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 })

  // Update countdown every second
  useEffect(() => {
    // Get tomorrow's date at midnight
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const timer = setInterval(() => {
      const now = new Date()
      const diff = tomorrow.getTime() - now.getTime()

      if (diff <= 0) {
        // Reset countdown if we've reached tomorrow
        setCountdown({ hours: 23, minutes: 59, seconds: 59 })
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setCountdown({ hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Header */}
     

      {/* Content */}
      <div className="w-full max-w-md space-y-8 text-center mb-12">
        {/* Victory Flag */}
        <div className="text-yellow-300">
          <Flag className="w-16 h-16 mx-auto mb-2" />
        </div> 

        {/* Game Info */}
        <div className="space-y-2 text-white">
          <h2 className="text-2xl">Zip #37</h2>
          <h3 className="text-4xl font-bold">Epic skills!</h3>
        </div>

        {/* Next Puzzle Timer */}
        <div className="bg-white/90 rounded-xl p-4 text-black">
          <p className="text-lg mb-2">Next puzzle available in</p>
          <div className="flex justify-center gap-2 text-3xl font-mono">
            <span>{countdown.hours.toString().padStart(2, '0')}</span>
            <span>:</span>
            <span>{countdown.minutes.toString().padStart(2, '0')}</span>
            <span>:</span>
            <span>{countdown.seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Stats Carousel */}
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {/* Time Card */}
            <CarouselItem>
              <Card className="bg-white/90 p-6 rounded-xl">
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">{formatTime(parseInt(time))}</h3>
                  <p className="text-lg">with {backtracks} backtracks</p>
                  <div className="w-16 h-16 rounded-lg mx-auto flex items-center justify-center">
                    <Image
                      src="/number_path.png"
                      alt="Number Path"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Today's avg: 0:25</p>
                  <button className="text-blue-500 flex items-center justify-center gap-2 w-full">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </Card>
            </CarouselItem>

            {/* Streak Card */}
            <CarouselItem>
              <Card className="bg-white/90 p-6 rounded-xl">
                <div className="space-y-4">
                  <Flame className="w-16 h-16 text-yellow-500 mx-auto" />
                  <h3 className="text-2xl font-bold">On fire</h3>
                  <p className="text-lg">2-day streak!</p>
                  <button className="text-blue-500 flex items-center justify-center gap-2 w-full">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Connections */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-center">
            <div className="flex -space-x-3">
              {profiles.map((profile, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-black bg-white overflow-hidden relative hover:z-10 transition-transform hover:scale-110"
                >
                  <Image
                    src={profile.src}
                    alt={profile.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-white text-sm">8 connections played</p>
        </div>
      </div>

      {/* More Games to Play Section */}
      <div className="w-full max-w-md mt-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">More Games to Play</h2>
        <div className="space-y-4">
          {games.map((game, index) => (
            <Link
              key={game.id}
              href={game.route}
              className={cn(
                "block w-full",
                `delay-${index + 1}`
              )}
            >
              <Card className="p-4 flex flex-row items-center justify-between hover:bg-white/90 transition-all duration-300 cursor-pointer glass-card hover-scale">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${game.color} rounded-xl flex items-center justify-center shadow-lg overflow-hidden`}>
                    <game.icon />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-yellow-950">{game.title}</h3>
                    <p className="text-xs text-yellow-900/90 line-clamp-1">{game.description}</p>
                  </div>
                </div>
                <div>
                  <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white font-medium text-xs shadow-sm border border-amber-400/30">
                    Coming Soon
                  </span>
                </div>
              </Card>
            </Link>
          ))}
          
          <Link href="/" className="block w-full">
            <button className="mt-4 w-full py-3 text-sm bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium transition-colors">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
