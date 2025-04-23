import { Dot } from "@/components/number-path-game"

export const puzzles: Dot[][] = [
  // Puzzle 1 - Easy
  [
     { id: 1, position: { row: 0, col: 0 } },
    { id: 2, position: { row: 5, col: 5 } },
    { id: 3, position: { row: 3, col: 1 } },
    { id: 4, position: { row: 2, col: 1 } },
    { id: 5, position: { row: 3, col: 4 } },
    { id: 6, position: { row: 2, col: 2 } },
    { id: 7, position: { row: 1, col: 4 } },
    { id: 8, position: { row: 2, col: 3 } },
  ],
  // Puzzle 2 - From Image
  [
    { id: 1, position: { row: 1, col: 2 } },
    { id: 2, position: { row: 3, col: 0 } },
    { id: 3, position: { row: 2, col: 2 } },
    { id: 4, position: { row: 2, col: 4 } },
    { id: 5, position: { row: 4, col: 3 } },
    { id: 6, position: { row: 3, col: 3 } },
  ],
]

export function getRandomPuzzle(): Dot[] {
  const randomIndex = Math.floor(Math.random() * puzzles.length)
  return puzzles[randomIndex]
} 