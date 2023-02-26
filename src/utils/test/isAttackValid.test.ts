import { Board, Player, Unit } from "../../types";
import { isAttackValid } from "../actions";
import { Archer, Knight } from "../../types/dataModels";

describe("isAttackValid", () => {
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

  const player1: Player = {
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

  const attackingUnit = Archer;
  const attackedUnit = Knight;

  it("should return false if there is no unit at the start position", () => {
    const result = isAttackValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if there is no unit at the end position", () => {
    board[0][0].unit = attackingUnit;
    board[1][1].unit = null;
    const result = isAttackValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if the start position is not controlled by the current player", () => {
    board[0][0].unit = attackingUnit;
    board[0][0].unitOwner = player2;
    board[1][1].unit = attackedUnit;
    const result = isAttackValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if the end position is not controlled by the other player", () => {
    board[0][0].unit = attackingUnit;
    board[0][0].unitOwner = player1;
    board[1][1].unitOwner = board[0][0].unitOwner;
    const result = isAttackValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return true if the attack is valid", () => {
    board[0][0].unit = attackingUnit;
    board[0][0].unitOwner = player1;
    board[1][1].unit = attackedUnit;
    board[1][1].unitOwner = player2;
    const result = isAttackValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(true);
  });
});
