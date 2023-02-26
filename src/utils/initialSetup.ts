import { Board, Player, Unit } from "../types";
import {
  Archer,
  Berserker,
  Cavalry,
  Crossbowman,
  Knight,
  Lancer,
  Mercenary,
  Royal,
  Swordsman,
} from "../types/dataModels";

export function initialSetup() {
  const units = [
    Archer,
    Berserker,
    Cavalry,
    Swordsman,
    Knight,
    Crossbowman,
    Mercenary,
    Lancer,
  ];
  // Define the game board size
  let boardSize = 9;

  function randomize(max: number): number {
    return Math.floor(Math.random() * max);
  }

  // Define the players attributes
  let initialUnits: Unit[] = [];
  for (let i = 0; i < 4; i++) {
    let position = randomize(units.length);
    if (!initialUnits.includes(units[position])) {
      initialUnits.push(units[position]);
    } else {
      i--;
    }
  }
  let bag = [...initialUnits, ...initialUnits, Royal];
  let handUnits: Unit[] = [];
  for (let i = 0; i < 3; i++) {
    let position = randomize(units.length);
    if (
      handUnits.filter((unit) => bag[position] === unit).length <
      bag.filter((unit) => bag[position] === unit).length
    ) {
      handUnits.push(bag[position]);
    } else {
      i--;
    }
  }

  const Wolf: Player = {
    name: "Wolf",
    controlledZones: 1,
    handUnits: handUnits,
    bag: bag,
    recruitmentZone: [...initialUnits, ...initialUnits],
    discardPile: [],
  };

  initialUnits = units.filter((unit) => !initialUnits.includes(unit));
  bag = [...initialUnits, ...initialUnits, Royal];
  handUnits = [];
  for (let i = 0; i < 3; i++) {
    handUnits.push(bag[randomize(bag.length)]);
  }
  const Crow: Player = {
    name: "Crow",
    controlledZones: 1,
    handUnits: handUnits,
    bag: bag,
    recruitmentZone: [...initialUnits, ...initialUnits],
    discardPile: [],
  };

  // Define the game board

  let controlZones: number[][] = [];
  if (boardSize === 5)
    controlZones = [
      [0, 1],
      [1, 1],
      [1, 3],
      [3, 2],
      [3, 4],
      [4, 3],
    ];
  if (boardSize === 9) {
    controlZones = [
      [0, 2],
      [0, 6],
      [3, 1],
      [3, 3],
      [3, 6],
      [5, 3],
      [5, 5],
      [5, 7],
      [8, 2],
      [8, 6],
    ];
  }
  const board: Board = new Array(boardSize).fill(null).map((elm, i) =>
    new Array(boardSize).fill(null).map((e, j) => ({
      controlZone: controlZones.some((zone) => zone[0] === i && zone[1] === j),
      controlledBy: null,
      unit: null,
      unitOwner: null,
    }))
  );

  board[controlZones[0][0]][controlZones[0][1]] = {
    controlZone: true,
    controlledBy: Crow,
    unit: null,
    unitOwner: null,
  };
  board[controlZones[1][0]][controlZones[1][1]] = {
    controlZone: true,
    controlledBy: Crow,
    unit: null,
    unitOwner: null,
  };
  board[controlZones[9][0]][controlZones[9][1]] = {
    controlZone: true,
    controlledBy: Wolf,
    unit: null,
    unitOwner: null,
  };
  board[controlZones[8][0]][controlZones[8][1]] = {
    controlZone: true,
    controlledBy: Wolf,
    unit: null,
    unitOwner: null,
  };
  let currentPlayer = Wolf;

  return {
    boardSize,
    Wolf,
    Crow,
    controlZones,
    board,
    currentPlayer,
  };
}
