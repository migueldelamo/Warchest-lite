import { Board, Player } from "../../types";
import { Archer, Knight } from "../../types/dataModels";
import { isPlaceValid } from "../actions";

describe("isPlaceValid", () => {
  const currentPlayer: Player = {
    name: "player1",
    controlledZones: 0,
    turns: 0,
    handUnits: [],
    bag: [],
    recruitmentZone: [],
    discardPile: [],
  };
  const player2: Player = {
    name: "player2",
    controlledZones: 0,
    turns: 0,
    handUnits: [],
    bag: [],
    recruitmentZone: [],
    discardPile: [],
  };

  const board: Board = [
    [
      { controlZone: true, controlledBy: null, unit: null, unitOwner: null },
      { controlZone: false, controlledBy: null, unit: null, unitOwner: null },
    ],
    [
      { controlZone: true, controlledBy: null, unit: null, unitOwner: null },
      { controlZone: false, controlledBy: null, unit: null, unitOwner: null },
    ],
  ];

  const attackingUnit = Archer;
  const attackedUnit = Knight;
  it("should return true for a valid place", () => {
    // Place a controlled zone adjacent to the selected position
    board[0][1].controlledBy = currentPlayer;
    expect(isPlaceValid(currentPlayer, board, 1, 1)).toBe(true);
  });

  it("should return false for an occupied place", () => {
    // Place a unit at the selected position
    board[1][0].unit = Knight;
    board[1][0].unitOwner = currentPlayer;
    expect(isPlaceValid(currentPlayer, board, 1, 0)).toBe(false);
  });

  it("should return false for a position outside the board", () => {
    expect(isPlaceValid(currentPlayer, board, -1, 0)).toBe(false);
    expect(isPlaceValid(currentPlayer, board, 2, 0)).toBe(false);
    expect(isPlaceValid(currentPlayer, board, 0, -1)).toBe(false);
    expect(isPlaceValid(currentPlayer, board, 0, 2)).toBe(false);
  });

  it("should return false for a position without adjacent controlled zones", () => {
    // No controlled zone adjacent to the selected position
    board[0][1].controlledBy = null;
    expect(isPlaceValid(currentPlayer, board, 1, 1)).toBe(false);
  });
});
