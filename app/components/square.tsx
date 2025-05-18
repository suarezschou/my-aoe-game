"use client"
import type React from "react"
import Image from "next/image"
import type { Unit } from "../../types/unit"

interface SquareProps {
  row: number
  col: number
  unit: Unit | null
  onSquareClick: (row: number, col: number) => void;
}

const Square: React.FC<SquareProps> = ({ row, col, unit, onSquareClick }) => {
  const isBlack = (row + col) % 2 === 1
  const backgroundColorClass = isBlack ? "bg-fuchsia-800" : "bg-white"

  return (
    <div
      className={`cursor-pointer border border-black w-12 h-12 flex justify-center items-center xl:w-20 xl:h-20 ${backgroundColorClass}`}
      onClick={() => onSquareClick(row, col)}
    >
      {unit && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {unit.imageSrc && (
            <div className="relative h-10 w-10">
              <Image
                src={unit.imageSrc || "/placeholder.svg"}
                alt={unit.name}
                fill
                className="object-contain"
                unoptimized // Important for GIFs to animate properly
              />
            </div>
          )}
          <div className="text-black flex flex-col text-xs">    
            <p>
                {unit.name}
            </p>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default Square