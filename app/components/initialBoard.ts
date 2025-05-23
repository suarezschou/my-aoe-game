// app/components/initialBoard.ts
import { unitDefinitions } from "@/types/unitDefinitions";
import { Unit } from "../../types/unit";

const initialBoard: (Unit | null)[][] = Array(8)
  .fill(null)
  .map(() => Array(8).fill(null));

// Place your initial units
initialBoard[1][1] = { ...unitDefinitions.SPEARMAN };
initialBoard[3][4] = { ...unitDefinitions.CAMEL };

export default initialBoard;