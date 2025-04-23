import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function StartPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 sm:pt-24 sm:py-16">
      <div className="w-full max-w-md mx-auto text-center space-y-12">
       
        {/* Game Icon */}
        <div className="my-8 sm:my-12 relative w-32 h-32 sm:w-48 sm:h-48 mx-auto">
          <Image
            src="/number_path.png"
            alt="Number Path Game"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Game Title */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-black">
            BRAIN
          </h2>
          <p className="text-xl sm:text-2xl font-medium text-black">
            Complete the path
          </p>
          <p className="text-lg sm:text-xl text-black/80">
            Quiz #12
          </p>
        </div>

        {/* Start Button */}
        <Link 
          href="/zip-start/zip"
          className="inline-block mt-8 sm:mt-12 px-10 sm:px-12 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white text-xl sm:text-2xl font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          START NOW
        </Link>
      </div>
    </main>
  )
}
