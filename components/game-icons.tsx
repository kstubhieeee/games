import { Grid2X2, Hash, Crown, Target, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export const GameIcons = {
  NumberPath: () => (
    <div className="relative w-full h-full">
      <Image
        src="/number_path.png"
        alt="Number Path Game"
        fill
        className="object-contain p-1"
      />
    </div>
  ),
  Tango: () => <Target className="w-6 h-6 text-white" />,
  Queens: () => <Crown className="w-6 h-6 text-white" />,
  Pinpoint: () => <Grid2X2 className="w-6 h-6 text-white" />,
  Crossclimb: () => <ArrowUpRight className="w-6 h-6 text-white" />,
} 