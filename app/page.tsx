'use client';

import React from 'react';
import Board from './components/board';
import { useGameStore } from '../store/gameStore'; 

export default function Game() {
  // Select the necessary state and the single handleSquareClick action from your store
  const board = useGameStore((state) => state.board);
  const handleSquareClick = useGameStore((state) => state.handleSquareClick);
  // You might still want to select selectedUnit if you need to display it in page.tsx
  // For example, to highlight the selected square:
  const selectedUnit = useGameStore((state) => state.selectedUnit);
  const validMoves = useGameStore((state) => state.validMoves);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Board board={board} onSquareClick={handleSquareClick} selectedUnit={selectedUnit} validMoves={validMoves}/>
    </div>
  );
}