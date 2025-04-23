import Link from "next/link"
import { Card } from "@/components/ui/card"
import { GameIcons } from "@/components/game-icons"
import { cn } from "@/lib/utils"

const games = [
  {
    id: "number-path",
    title: "Number Path",
    description: "Connect numbers in sequence to solve challenging puzzles",
    route: "/zip-start",
    icon: GameIcons.NumberPath,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    comingSoon: false,
  },
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
  {
    id: "crossclimb",
    title: "Crossclimb",
    description: "Climb your way through crossword-style challenges",
    route: "/crossclimb",
    icon: GameIcons.Crossclimb,
    color: "bg-gradient-to-br from-teal-500 to-teal-600",
    comingSoon: true,
  },
]

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Hero Section */}
      <section className="text-center mb-12 mt-24 sm:mt-20 md:mt-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Welcome to Puzzle Games
        </h1>
        <p className="text-lg sm:text-xl text-black max-w-2xl mx-auto drop-shadow">
          Challenge your mind with our collection of engaging puzzle games. 
          Exercise your brain while having fun!
        </p>
      </section>

      {/* Games List */}
      <div className="space-y-6 max-w-3xl mx-auto mt-8">
        {games.map((game, index) => (
          <Link
            key={game.id}
            href={game.route}
            className={cn(
              "block w-full animate-fade-in-up",
              `delay-${index + 1}`
            )}
          >
            <Card className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:justify-between hover:bg-white/90 transition-all duration-300 cursor-pointer glass-card hover-scale gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${game.id === 'number-path' ? 'bg-white rounded-2xl p-2' : game.color} rounded-2xl flex items-center justify-center shadow-lg overflow-hidden`}>
                  <game.icon />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 text-yellow-950">{game.title}</h2>
                  <p className="text-sm sm:text-base text-yellow-900/90">{game.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto mt-3 sm:mt-0">
                {game.comingSoon ? (
                  <span className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-medium text-sm sm:text-base">
                    Coming Soon
                  </span>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors text-sm sm:text-base">
                    Play Now
                  </span>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-white animate-fade-in-up delay-5 drop-shadow">
        <p>Select a game above to start playing!</p>
      </footer>
    </main>
  )
}
