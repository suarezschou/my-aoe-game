// types/unitDefinitions.ts
import { Unit } from './unit'; // Import the Unit interface

export const unitDefinitions: Record<string, Unit> = {
    SPEARMAN: {
      name: 'Spearman',
      health: 70,
      attack: 15,
      movementType: 'rook_one_square',
      imageSrc: '/g_spearman.gif'
    },
    CAMEL: {
        name: 'Camel',
        health: 100,
        attack: 20,
        movementType: 'knight',
        imageSrc: '/g_camel_scout.gif'
    },
};
