import { Dot } from "@/components/number-path-game"

export const puzzles: Dot[][] = [
 
  // Puzzle 1
  [
    { id: 1, position: { row: 1, col: 2 } },
    { id: 2, position: { row: 3, col: 0 } },
    { id: 3, position: { row: 2, col: 2 } },
    { id: 4, position: { row: 2, col: 4 } },
    { id: 5, position: { row: 4, col: 3 } },
    { id: 6, position: { row: 3, col: 3 } },
  ],
  // Puzzle 2
  [
    { id: 1, position: { row: 4, col: 1 } },
    { id: 2, position: { row: 1, col: 4 } },
    { id: 3, position: { row: 4, col: 4 } },
    { id: 4, position: { row: 5, col: 2 } }, 
    { id: 5, position: { row: 0, col: 3 } },
    { id: 6, position: { row: 1, col: 1 } },
  ],
  // Puzzle 3
  [
    { id: 1, position: { row: 5, col: 0 } },
    { id: 2, position: { row: 1, col: 5 } },
    { id: 3, position: { row: 5, col: 5 } },
    { id: 4, position: { row: 5, col: 2 } },
    { id: 5, position: { row: 0, col: 2 } },
    { id: 6, position: { row: 1, col: 1 } },
  ],
  // Puzzle 4
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
  // Puzzle 5
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
  // Puzzle 6
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
  ],
  // Puzzle 7
  [
  { id: 1, position: { row: 3, col: 2 } },
  { id: 2, position: { row: 0, col: 5 } },
  { id: 3, position: { row: 5, col: 0 } },
  { id: 4, position: { row: 1, col: 1 } },
  { id: 5, position: { row: 2, col: 3 } },
  { id: 6, position: { row: 4, col: 4 } },
]

]

export function getRandomPuzzle(): Dot[] {
  const randomIndex = Math.floor(Math.random() * puzzles.length)
  return puzzles[randomIndex]
}

export function getPuzzleByLevel(level: number): Dot[] {
  // Level is 1-indexed, but array is 0-indexed
  const index = level - 1
  // Return the requested puzzle or the first one if index is out of bounds
  return index >= 0 && index < puzzles.length ? puzzles[index] : puzzles[0]
} 