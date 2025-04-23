import { Card } from "@/components/ui/card"
import { Crown, Puzzle, Grid3X3, LucideIcon, SquareUser } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
}

function FeatureCard({ title, description, icon: Icon, color }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm text-center">
      <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </Card>
  )
}

export default function QueensComingSoonPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center mt-16 mb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-br from-purple-500 to-purple-800 p-5 rounded-2xl mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/60 to-purple-600/60 opacity-80"></div>
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative">
              <Crown className="w-16 h-16 text-white drop-shadow-md" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Queens #357
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Classic chess-inspired puzzle with queen placement challenges.
            Test your strategic thinking and spatial reasoning.
          </p>
          <div className="inline-block bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl text-slate-800 font-bold">
            Coming Soon - September 2025
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
          <FeatureCard 
            title="Chess Strategy"
            description="Apply classic chess strategies to solve increasingly complex puzzles"
            icon={Crown}
            color="bg-gradient-to-br from-purple-500 to-purple-700"
          />
          <FeatureCard 
            title="Board Mastery"
            description="Master different board sizes and special rule variations"
            icon={Grid3X3}
            color="bg-gradient-to-br from-pink-500 to-red-600"
          />
          <FeatureCard 
            title="Advanced Challenges"
            description="Unlock special challenges with unique positioning requirements"
            icon={Puzzle}
            color="bg-gradient-to-br from-indigo-500 to-purple-600"
          />
        </div>

        {/* Newsletter Signup */}
        <Card className="w-full max-w-lg p-8 bg-white/90 backdrop-blur-sm mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-slate-800">Be the First to Know</h2>
          <p className="text-slate-600 mb-6 text-center">
            Sign up to be notified when Queens becomes available and get early access.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-gradient-to-br from-purple-500 to-purple-700 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-800 transition-colors shadow-md">
              Notify Me
            </button>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="w-full max-w-lg mb-12">
          <div className="flex justify-between mb-2">
            <span className="text-white font-medium">Development Progress</span>
            <span className="text-white font-medium">35%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-600 h-4 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center border-2 border-white shadow-md">
                <SquareUser className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
          <p className="text-white">Join 1,750+ chess enthusiasts waiting for Queens</p>
        </div>

        {/* Return Home Button */}
        <Link href="/" className="block w-full max-w-xs">
          <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium transition-colors shadow-sm">
            Return to Home
          </button>
        </Link>
      </div>
    </main>
  )
}
