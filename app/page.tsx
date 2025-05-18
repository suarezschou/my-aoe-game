'use client';

import React, { useState } from 'react';
import Board from './components/board';
import initialBoardData from '../app/components/initialBoard';

console.log("initialBoardData:", initialBoardData);

export default function Game() {

  const [board, setBoard] = useState(initialBoardData);
  type SelectedUnit = { unit: any; position: { row: number; col: number } } | null;
  const [selectedUnit, setSelectedUnit] = useState<SelectedUnit>(null);

  const handleSquareClick = (row: number, col: number) => {
    const clickedUnit = board[row][col];
    console.log(`Clicked on row: ${row}, col: ${col}, Unit:`, clickedUnit);

    if (clickedUnit) {
      setSelectedUnit({ unit: clickedUnit, position: { row, col } });
    } else if (selectedUnit?.unit) {
      console.log('Attempting to move', selectedUnit.unit.name, 'to', row, col);

      const newBoard = board.map(rowArray => [...rowArray]);
      newBoard[row][col] = selectedUnit.unit;
      newBoard[selectedUnit.position.row][selectedUnit.position.col] = null;
      setBoard(newBoard);
      setSelectedUnit(null);

    } else {
      setSelectedUnit(null);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
        <Board board={board} onSquareClick={handleSquareClick} />
    </div>
  );
}