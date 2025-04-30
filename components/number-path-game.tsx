"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { getRandomPuzzle, getPuzzleByLevel } from "@/lib/puzzles"

type Position = {
  row: number
  col: number
}

export type Dot = {
  id: number
  position: Position
}

type CellState = {
  isPath: boolean
  isDot: boolean
  dotId?: number
}

// Default puzzle to use for initial server render
const defaultPuzzle: Dot[] = [
  { id: 1, position: { row: 0, col: 0 } },
  { id: 2, position: { row: 5, col: 5 } },
  { id: 3, position: { row: 3, col: 1 } },
  { id: 4, position: { row: 2, col: 1 } },
  { id: 5, position: { row: 3, col: 4 } },
  { id: 6, position: { row: 2, col: 2 } },
  { id: 7, position: { row: 1, col: 4 } },
  { id: 8, position: { row: 2, col: 3 } },
]

type NumberPathGameProps = {
  level?: number
}

export function NumberPathGame({ level }: NumberPathGameProps) {
  const router = useRouter()
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [backtrackCount, setBacktrackCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  const gridSize = 6
  // Use default puzzle for initial render to avoid hydration mismatch
  const [dots, setDots] = useState<Dot[]>(defaultPuzzle)
  const [isClientSide, setIsClientSide] = useState(false)

  // Only select puzzle on client side
  useEffect(() => {
    setIsClientSide(true)
    if (level) {
      setDots(getPuzzleByLevel(level))
    } else {
      setDots(getRandomPuzzle())
    }
  }, [level])

  const [path, setPath] = useState<Position[]>([])
  const [currentDotIndex, setCurrentDotIndex] = useState(0)
  const [instructionsOpen, setInstructionsOpen] = useState(true)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const [grid, setGrid] = useState<CellState[][]>(
    Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize)
          .fill(null)
          .map(() => ({ isPath: false, isDot: false })),
      ),
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Start timer when component mounts
  useEffect(() => {
    if (!startTime && !gameCompleted && isClientSide) {
      const now = Date.now()
      setStartTime(now)
      
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      // Set up new timer
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - now) / 1000))
      }, 1000)
    }
  }, [startTime, gameCompleted, isClientSide])

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Initialize grid with dots
  useEffect(() => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize)
          .fill(null)
          .map(() => ({ isPath: false, isDot: false })),
      )

    dots.forEach((dot) => {
      newGrid[dot.position.row][dot.position.col] = {
        isPath: false,
        isDot: true,
        dotId: dot.id,
      }
    })

    setGrid(newGrid)
  }, [dots, gridSize])

  // Update grid when path changes
  useEffect(() => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize)
          .fill(null)
          .map(() => ({ isPath: false, isDot: false })),
      )

    dots.forEach((dot) => {
      newGrid[dot.position.row][dot.position.col] = {
        isPath: false,
        isDot: true,
        dotId: dot.id,
      }
    })

    path.forEach((pos) => {
      const dot = dots.find((d) => d.position.row === pos.row && d.position.col === pos.col)
      if (dot) {
        newGrid[pos.row][pos.col] = {
          isPath: true,
          isDot: true,
          dotId: dot.id,
        }
      } else {
        newGrid[pos.row][pos.col] = {
          isPath: true,
          isDot: false,
        }
      }
    })

    setGrid(newGrid)

    // Check if game is completed
    if (path.length > 0) {
      const allDotsConnected = dots.every((dot) =>
        path.some((pos) => pos.row === dot.position.row && dot.position.col === dot.position.col),
      )

      const allCellsFilled = newGrid.every((row) => row.every((cell) => cell.isPath))

      if (allDotsConnected && allCellsFilled && !gameCompleted) {
        setGameCompleted(true)
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [path, dots, gridSize, gameCompleted])

  // Draw the grid and path whenever path changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw path
    if (path.length > 1) {
      ctx.beginPath()
      ctx.strokeStyle = gameCompleted ? "#10b981" : "#3b82f6"
      ctx.lineWidth = 6
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      const cellSize = canvas.width / gridSize
      const halfCell = cellSize / 2

      path.forEach((pos, index) => {
        const x = pos.col * cellSize + halfCell
        const y = pos.row * cellSize + halfCell

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    }
  }, [path, gridSize, gameCompleted])

  // Prevent scrolling during gameplay
  useEffect(() => {
    if (!isClientSide) return

    // Function to prevent all scrolling and touch movement during gameplay
    const preventScroll = (e: TouchEvent) => {
      if (gameContainerRef.current?.contains(e.target as Node) || !gameCompleted) {
        e.preventDefault()
      }
    }

    // Function to handle touchmove specifically for the game container
    const preventDefaultForGameContainer = (e: Event) => {
      if (!gameCompleted) {
        e.preventDefault()
      }
    }

    // Lock viewport width to prevent horizontal scroll on mobile
    const setViewportMeta = () => {
      let viewportMeta = document.querySelector('meta[name="viewport"]')
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta')
        viewportMeta.setAttribute('name', 'viewport')
        document.head.appendChild(viewportMeta)
      }
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    }

    // Apply the viewport settings
    setViewportMeta()

    // Add event listeners with passive: false to ensure preventDefault works
    document.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('touchstart', preventScroll, { passive: false })
    
    const gameContainer = gameContainerRef.current
    if (gameContainer) {
      gameContainer.addEventListener('touchmove', preventDefaultForGameContainer, { passive: false })
    }

    // Add overflow hidden to body during gameplay
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'

    return () => {
      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('touchstart', preventScroll)
      if (gameContainer) {
        gameContainer.removeEventListener('touchmove', preventDefaultForGameContainer)
      }
      
      // Restore body styles when component unmounts
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
    }
  }, [isClientSide, gameCompleted])

  const isAdjacent = (pos1: Position, pos2: Position) => {
    // Only allow horizontal and vertical moves
    return (
      (Math.abs(pos1.row - pos2.row) === 1 && pos1.col === pos2.col) || // Vertical move
      (Math.abs(pos1.col - pos2.col) === 1 && pos1.row === pos2.row)    // Horizontal move
    )
  }

  const [isDragging, setIsDragging] = useState(false)
  const [lastHoveredCell, setLastHoveredCell] = useState<Position | null>(null)

  const handleCellMouseDown = (row: number, col: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (gameCompleted) return
    
    // If we're just starting
    if (path.length === 0) {
      if (row === dots[0].position.row && col === dots[0].position.col) {
        setPath([{ row, col }])
        setCurrentDotIndex(1)
        setLastHoveredCell({ row, col })
        setIsDragging(true)
        return
      } else {
        toast({
          title: "Invalid move",
          description: "You must start with dot 1",
          variant: "destructive",
        })
        return
      }
    }
    
    // Check if this cell is part of our existing path
    const cellIndex = path.findIndex(pos => pos.row === row && pos.col === col);
    
    // If we clicked on a cell that's part of our path
    if (cellIndex !== -1) {
      // Trim path up to this cell
      const newPath = path.slice(0, cellIndex + 1);
      setPath(newPath);
      
      // Update current dot index based on the new path
      const lastPos = newPath[newPath.length - 1];
      const lastDot = dots.find(dot => 
        dot.position.row === lastPos.row && dot.position.col === lastPos.col
      );
      
      if (lastDot) {
        setCurrentDotIndex(lastDot.id);
      }
      
      setLastHoveredCell({ row, col });
      setIsDragging(true);
      return;
    }
    
    // If clicked on a valid adjacent cell to continue the path
    const lastCell = path[path.length - 1];
    if (isAdjacent(lastCell, { row, col })) {
      handleCellClick(row, col);
      setIsDragging(true);
      return;
    }
    
    // Otherwise, it's an invalid move
    toast({
      title: "Invalid move",
      description: "You can only continue from your current path",
      variant: "destructive",
    });
  }

  const handleCellMouseEnter = (row: number, col: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (!isDragging || gameCompleted) return

    const currentPos = { row, col }
    
    // For any moves when dragging
    if (lastHoveredCell && isAdjacent(lastHoveredCell, currentPos)) {
      // Check if the cell is already in the path
      if (!path.some(pos => pos.row === row && pos.col === col)) {
        handleCellClick(row, col)
      }
    }
    
    setLastHoveredCell(currentPos)
  }

  const handleCellMouseUp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setIsDragging(false)
    setLastHoveredCell(null)
  }

  // Touch event handlers
  const handleCellTouchStart = (row: number, col: number, e: React.TouchEvent) => {
    e.preventDefault()
    handleCellMouseDown(row, col)
  }

  const handleCellTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!isDragging || gameCompleted) return
    
    const touch = e.touches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    
    if (element) {
      // Extract row and col from element's key attribute or dataset
      const cellElement = element.closest('[data-row][data-col]')
      if (cellElement) {
        const row = parseInt(cellElement.getAttribute('data-row') || '-1')
        const col = parseInt(cellElement.getAttribute('data-col') || '-1')
        
        if (row !== -1 && col !== -1) {
          handleCellMouseEnter(row, col)
        }
      }
    }
  }

  const handleCellTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    handleCellMouseUp()
  }

  // Add event listeners for mouse up outside the grid
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      setLastHoveredCell(null)
    }

    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('touchend', handleGlobalMouseUp)
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('touchend', handleGlobalMouseUp)
    }
  }, [])

  const handleCellClick = (row: number, col: number) => {
    if (gameCompleted) return

    // If we're just starting or clicked on the first dot
    if (path.length === 0) {
      if (row === dots[0].position.row && col === dots[0].position.col) {
        setPath([{ row, col }])
        setCurrentDotIndex(1) // Set to 1 because we're looking for dot 2 next
        return
      } else {
        toast({
          title: "Invalid move",
          description: "You must start with dot 1",
          variant: "destructive",
        })
        return
      }
    }

    // If we've already started
    if (path.length > 0) {
      const lastCell = path[path.length - 1]

      // Check if the cell is adjacent to the last cell in the path
      if (!isAdjacent(lastCell, { row, col })) {
        toast({
          title: "Invalid move",
          description: "You can only connect to adjacent cells",
          variant: "destructive",
        })
        return
      }

      // Check if the cell is not already in the path
      if (path.some((pos) => pos.row === row && pos.col === col)) {
        toast({
          title: "Invalid move",
          description: "You cannot revisit cells",
          variant: "destructive",
        })
        return
      }

      // If we clicked on a dot
      const clickedDot = dots.find((d) => d.position.row === row && d.position.col === col)
      if (clickedDot) {
        // If it's the next dot in sequence
        if (clickedDot.id === currentDotIndex + 1) {
          setPath([...path, { row, col }])
          setCurrentDotIndex(currentDotIndex + 1)
          return
        } else {
          toast({
            title: "Invalid move",
            description: `You need to connect dot ${currentDotIndex + 1} next`,
            variant: "destructive",
          })
          return
        }
      }

      // If we clicked on an empty cell
      setPath([...path, { row, col }])
    }
  }

  const handleUndo = () => {
    if (gameCompleted) return

    if (path.length <= 1) {
      setPath([])
      setCurrentDotIndex(0)
    } else {
      const lastPos = path[path.length - 1]
      const lastDot = dots.find((dot) => dot.position.row === lastPos.row && dot.position.col === lastPos.col)

      if (lastDot && lastDot.id === currentDotIndex) {
        setCurrentDotIndex(lastDot.id - 1)
      }

      setPath(path.slice(0, -1))
      setBacktrackCount(prev => prev + 1)
    }
  }

  const handleHint = () => {
    if (path.length === 0) {
      toast({
        title: "Hint",
        description: "Start by clicking on dot 1 in the top-left corner",
      })
      return
    }

    if (currentDotIndex <= dots.length) {
      const nextDot = dots.find((d) => d.id === currentDotIndex)
      if (nextDot) {
        toast({
          title: "Hint",
          description: `Try to find a path to dot ${currentDotIndex}`,
        })
      }
    } else {
      toast({
        title: "Hint",
        description: "Make sure to fill every cell in the grid",
      })
    }
  }

  const resetGame = () => {
    setPath([])
    setCurrentDotIndex(0)
    setGameCompleted(false)
    setStartTime(null)
    setElapsedTime(0)
    setBacktrackCount(0)
  }

  // Start countdown when game is completed
  useEffect(() => {
    if (gameCompleted) {
      setCountdown(10)
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) {
              clearInterval(countdownRef.current)
            }
            router.push(`/zip-start/zip/result?time=${elapsedTime}&backtracks=${backtrackCount}`)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [gameCompleted, elapsedTime, backtrackCount, router])

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto touch-none overflow-hidden">
      {/* Timer Display */}
      {startTime && !gameCompleted && (
        <div className="mb-4 text-xl font-mono">
          Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
        </div>
      )}

      <div 
        ref={gameContainerRef}
        className="relative w-full aspect-square bg-white rounded-3xl shadow-sm border border-gray-200 mb-4 overflow-hidden touch-none"
        onTouchMove={handleCellTouchMove}
        onTouchEnd={handleCellTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* Canvas for drawing paths */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />

        {/* Grid */}
        <div className="grid grid-cols-6 grid-rows-6 w-full h-full touch-none">
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const row = Math.floor(index / gridSize)
            const col = index % gridSize
            const cellState = grid[row][col]
            const dot = dots.find((d) => d.position.row === row && d.position.col === col)

            return (
              <div
                key={index}
                data-row={row}
                data-col={col}
                className={`
                  border border-gray-200 flex items-center justify-center relative
                  ${cellState.isPath ? (gameCompleted ? "bg-green-100" : "bg-blue-50") : ""}
                  ${gameCompleted ? "cursor-default" : "cursor-pointer"}
                  transition-colors duration-200 touch-none
                `}
                onMouseDown={(e) => handleCellMouseDown(row, col, e)}
                onMouseEnter={(e) => handleCellMouseEnter(row, col, e)}
                onMouseUp={handleCellMouseUp}
                onTouchStart={(e) => handleCellTouchStart(row, col, e)}
              >
                {dot && (
                  <div
                    className={`
                      absolute w-8 h-8 rounded-full bg-black text-white 
                      flex items-center justify-center font-bold z-20
                      ${
                        path.some((p) => p.row === row && p.col === col)
                          ? gameCompleted
                            ? "ring-2 ring-green-500"
                            : "ring-2 ring-blue-500"
                          : ""
                      }
                    `}
                  >
                    {dot.id}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Game completed overlay */}
        {gameCompleted && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-30 pointer-events-auto">
            <div className="bg-white px-6 py-4 rounded-xl shadow-lg transform -translate-y-10">
              <h2 className="text-xl font-bold text-green-600 mb-2">Puzzle Completed!</h2>
              <p className="text-gray-600 mb-4">Redirecting to results in {countdown} seconds...</p>
              <div className="flex gap-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    if (countdownRef.current) {
                      clearInterval(countdownRef.current)
                    }
                    router.push(`/zip-start/zip/result?time=${elapsedTime}&backtracks=${backtrackCount}`)
                  }}
                >
                  View Results
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    if (countdownRef.current) {
                      clearInterval(countdownRef.current)
                    }
                    resetGame()
                  }}
                >
                  Play Again
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full gap-4 mb-4 justify-center">
        <Button
          variant="outline"
          className="flex-1 max-w-[200px] bg-gray-200 hover:bg-gray-300 text-black rounded-xl"
          onClick={handleUndo}
          disabled={gameCompleted || path.length === 0}
        >
          Undo
        </Button>
        <Button
          variant="outline"
          className="flex-1 max-w-[200px] bg-white hover:bg-gray-100 text-black rounded-xl border border-gray-300"
          onClick={handleHint}
          disabled={gameCompleted}
        >
          Hint
        </Button>
      </div>

      <Toaster />
    </div>
  )
}
