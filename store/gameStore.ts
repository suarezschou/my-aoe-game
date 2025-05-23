// store/gameStore.ts
import { create } from 'zustand';
import { Unit } from '../types/unit';
import initialBoardData from '../app/components/initialBoard';

interface GameState {
  board: (Unit | null)[][];
  selectedUnit: { unit: Unit; position: { row: number; col: number } } | null;
  validMoves: { row: number; col: number }[];
}

interface GameActions {
  handleSquareClick: (row: number, col: number) => void;
}

type GameStore = GameState & GameActions;

// --- HELPER FUNCTIONS FOR MOVE VALIDATION ---

// Helper for Knight (Camel) movement
function _isValidKnightMove(startRow: number, startCol: number, endRow: number, endCol: number): boolean {
  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);

  // L-shape: 2 squares in one direction, 1 square in the perpendicular direction
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

// Helper for Rook (Spearman) 1-square movement
function _isValidRookOneSquareMove(startRow: number, startCol: number, endRow: number, endCol: number): boolean {
  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);

  // Must be exactly 1 square in a straight line (horizontal or vertical)
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// Main move validation function (internal to the store)
function isValidMove(
  unit: Unit,
  startPos: { row: number; col: number },
  endPos: { row: number; col: number },
  board: (Unit | null)[][] // Need the board to check for obstructions
): boolean {
  // Basic check: Cannot move to the exact same square
  if (startPos.row === endPos.row && startPos.col === endPos.col) {
    return false;
  }

  // Basic check: Cannot move outside the board (assuming 8x8)
  if (endPos.row < 0 || endPos.row >= 8 || endPos.col < 0 || endPos.col >= 8) {
    return false;
  }

  // Get the target square content
  const targetSquareContent = board[endPos.row][endPos.col];

  // For now, assume cannot move onto an occupied square (already handled by handleSquareClick flow, but good to keep in mind for future attack rules)
  if (targetSquareContent !== null) {
      // If the target is occupied, it's an invalid move for now.
      // Later, you'd add logic here for attacking/capturing.
      return false;
  }


  // Apply unit-specific movement rules
  switch (unit.movementType) {
    case 'knight':
      return _isValidKnightMove(startPos.row, startPos.col, endPos.row, endPos.col);
    case 'rook_one_square':
      // Rook-like moves (Spearman) need to check for path obstructions IF they could move more than 1 square.
      // Since it's only 1 square, no path obstruction check needed for this type.
      return _isValidRookOneSquareMove(startPos.row, startPos.col, endPos.row, endPos.col);
    // Add cases for other movement types as you implement them
    // case 'pawn': return _isValidPawnMove(...);
    default:
      // If a movement type is not implemented, disallow by default
      console.warn(`Movement type "${unit.movementType}" not implemented!`);
      return false;
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  board: initialBoardData,
  selectedUnit: null,
  validMoves: [],

  // Actions
  handleSquareClick: (row: number, col: number) => {
    const state = get(); // Get the current state
    const clickedUnit = state.board[row][col];

    if (clickedUnit) {
      set({ selectedUnit: { unit: clickedUnit, position: { row, col } } });
      const potentialValidMoves: { row: number; col: number }[] = [];

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (
            isValidMove(
              clickedUnit,
              { row, col }, // Start position
              { row: r, col: c }, // End position
              state.board
            )
          ) {
            potentialValidMoves.push({ row: r, col: c });
          }
        }
      }

      set({
        selectedUnit: { unit: clickedUnit, position: { row, col } },
        validMoves: potentialValidMoves, // Set the calculated valid moves
      });
    } else if (state.selectedUnit) {
      // If an empty square is clicked and a unit is selected, attempt to move

      const { unit: selectedUnitData, position: startPos } = state.selectedUnit;
      const endPos = { row, col };


      // --- NEW: Validate the move before proceeding ---
      if (isValidMove(selectedUnitData, startPos, endPos, state.board)) {
        console.log('Valid move! Attempting to move', selectedUnitData.name, 'to', row, col);

        // Create a new board array to update the state immutably
        const newBoard = state.board.map(rowArray => [...rowArray]);

        // Remove the unit from its original position
        newBoard[startPos.row][startPos.col] = null;

        // Place the unit in the new position
        newBoard[endPos.row][endPos.col] = selectedUnitData;

        // Update the board state and deselect the unit
        set({
          board: newBoard,
          selectedUnit: null,
          validMoves: [], // Clear valid moves after the move
        });
      } else {
        console.log('Invalid move for', selectedUnitData.name, 'to', row, col);
        // Optional: Deselect the unit on an invalid move attempt
        set({ selectedUnit: null, validMoves: [] });
      }
    } else {
      // Clicked on an empty square with no unit selected, deselect anything
      set({ selectedUnit: null, validMoves: [] });
    }
  },
}));