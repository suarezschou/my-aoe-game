// types/unit.ts
export interface Unit {
  name: string;
  health: number;
  attack: number;
  imageSrc: string;
  movementType: 'knight' | 'rook_one_square';
}