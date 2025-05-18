// app/components/initialBoard.ts
import { Unit } from "../../types/unit";

const initialBoard: (Unit | null)[][] = Array(8)
  .fill(null)
  .map(() => Array(8).fill(null));

// Place your initial units
initialBoard[1][1] = { name: 'Camel', health: 100, attack: 20, imageSrc: '/g_camel_scout.gif' };
initialBoard[3][4] = { name: 'Spearman', health: 70, attack: 15, imageSrc: '/g_spearman.gif' };

export default initialBoard;