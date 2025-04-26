import { Dot } from "@/components/number-path-game"

export const puzzles: Dot[][] = [
 
  // Puzzle 2 - From Image
  [
    { id: 1, position: { row: 1, col: 2 } },
    { id: 2, position: { row: 3, col: 0 } },
    { id: 3, position: { row: 2, col: 2 } },
    { id: 4, position: { row: 2, col: 4 } },
    { id: 5, position: { row: 4, col: 3 } },
    { id: 6, position: { row: 3, col: 3 } },
  ],
  // Puzzle from screenshot - Grid puzzle
  [
    { id: 1, position: { row: 4, col: 1 } },
    { id: 2, position: { row: 1, col: 4 } },
    { id: 3, position: { row: 4, col: 4 } },
    { id: 4, position: { row: 5, col: 2 } }, 
    { id: 5, position: { row: 0, col: 3 } },
    { id: 6, position: { row: 1, col: 1 } },
  ],
  // Puzzle from screenshot - Maze puzzle
  [
    { id: 1, position: { row: 5, col: 0 } },
    { id: 2, position: { row: 1, col: 5 } },
    { id: 3, position: { row: 5, col: 5 } },
    { id: 4, position: { row: 5, col: 2 } },
    { id: 5, position: { row: 0, col: 2 } },
    { id: 6, position: { row: 1, col: 1 } },
  ],
  [
  { id: 1, position: { row: 2, col: 2 } },
  { id: 2, position: { row: 5, col: 2 } },
  { id: 3, position: { row: 4, col: 5 } },
  { id: 4, position: { row: 0, col: 3 } },
  { id: 5, position: { row: 1, col: 0 } },
  { id: 6, position: { row: 3, col: 3 } },
  { id: 7, position: { row: 4, col: 1 } },
  { id: 8, position: { row: 1, col: 4 } },
  ],
  [
  { id: 1, position: { row: 3, col: 4 } },
  { id: 2, position: { row: 1, col: 1 } },
  { id: 3, position: { row: 2, col: 1 } },
  { id: 4, position: { row: 4, col: 4 } },
  { id: 5, position: { row: 4, col: 3 } },
  { id: 6, position: { row: 2, col: 4 } },
  { id: 7, position: { row: 1, col: 4 } },
  { id: 8, position: { row: 1, col: 3 } },
  { id: 9, position: { row: 1, col: 2 } },
  { id: 10, position: { row: 3, col: 1 } },
  { id: 11, position: { row: 4, col: 1 } },
  { id: 12, position: { row: 4, col: 2 } },
  ],
  [
  { id: 1, position: { row: 0, col: 1 } },
  { id: 2, position: { row: 4, col: 1 } },
  { id: 3, position: { row: 5, col: 3 } },
  { id: 4, position: { row: 2, col: 5 } },
  { id: 5, position: { row: 1, col: 3 } },
  { id: 6, position: { row: 0, col: 3 } },
  { id: 7, position: { row: 2, col: 4 } },
  { id: 8, position: { row: 4, col: 3 } },  // 8 is at col 2
  { id: 9, position: { row: 3, col: 1 } },
  { id: 10, position: { row: 1, col: 1 } },
]



]

export function getRandomPuzzle(): Dot[] {
  const randomIndex = Math.floor(Math.random() * puzzles.length)
  return puzzles[randomIndex]
} 