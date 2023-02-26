import { Board, Player, Unit } from "../../types";
import { Archer } from "../../types/dataModels";
import { hasPlayerLost } from "../actions";

describe("hasPlayerLost", () => {
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
  const player: Player = {
    name: "Player 1",
    handUnits: [],
    bag: [],
    recruitmentZone: [],
    controlledZones: 0,
    turns: 0,
    discardPile: [],
  };
  const unit: Unit = Archer;
  test("returns true if player has no units on the board, no hand units, no bag, and no units in recruitment zone", () => {
    expect(hasPlayerLost(board, player)).toBe(true);
  });

  test("returns false if player has units on the board", () => {
    board[1][1].unitOwner = player;
    expect(hasPlayerLost(board, player)).toBe(false);
  });

  test("returns false if player has hand units", () => {
    player.handUnits = [];
    expect(hasPlayerLost(board, player)).toBe(false);
  });

  test("returns false if player has units in bag", () => {
    player.bag = [unit];
    expect(hasPlayerLost(board, player)).toBe(false);
  });

  test("returns false if player has units in recruitment zone", () => {
    player.recruitmentZone = [unit];
    expect(hasPlayerLost(board, player)).toBe(false);
  });
});
