"use client"
import type React from "react"
import Square from "./square"
import type { Unit } from "../../types/unit"

interface BoardProps {
  board: (Unit | null)[][]
  onSquareClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onSquareClick }) => {
  return (
    <div className="grid grid-cols-8 border-black border-10">

      {board.map((row, rowIndex) =>
        
        row.map((unit, colIndex) => (
          <Square 
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            unit={unit} 
            onSquareClick={onSquareClick}
          />
        )),
      )}
    </div>
  )
}

export default Board
