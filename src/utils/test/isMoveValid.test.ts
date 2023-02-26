import { Board, Player, Unit } from "../../types";
import { isMoveValid } from "../actions";

describe("isMoveValid", () => {
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

  const unitWithMovement: Unit = {
    movement: { range: 2, direction: "orthogonal" },
    name: "archer",
    abbreviation: "Ac",
    actions: 2,
    attack: {
      range: 2,
      direction: "orthogonal",
      times: 2,
    },
    total: 2,
  };
  const unitWithOneMovement: Unit = {
    movement: { range: 1, direction: "orthogonal" },
    name: "archer",
    abbreviation: "Ac",
    actions: 2,
    attack: {
      range: 2,
      direction: "orthogonal",
      times: 2,
    },
    total: 2,
  };

  const unitWithoutMovement: Unit = {
    movement: null,
    name: "archer",
    abbreviation: "Ac",
    actions: 2,
    attack: {
      range: 2,
      direction: "orthogonal",
      times: 2,
    },
    total: 2,
  };

  it("should return false if there is no unit at the start position", () => {
    const result = isMoveValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if the selected unit does not have a movement range", () => {
    board[0][0].unit = unitWithoutMovement;
    const result = isMoveValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if the start position is not controlled by the current player", () => {
    board[0][0].unit = unitWithMovement;
    board[0][0].unitOwner = player2;
    const result = isMoveValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if the end position is not free", () => {
    board[0][0].unitOwner = player1;
    board[1][1].unit = unitWithMovement;
    const result = isMoveValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return false if the unit cannot move to the end position", () => {
    board[0][0].unit = unitWithOneMovement;
    board[1][1].unit = null;
    const result = isMoveValid(board, player1, 0, 0, 1, 1);
    expect(result).toBe(false);
  });

  it("should return true if the move is valid", () => {
    board[0][0].unit = unitWithMovement;
    board[1][0].unit = null;
    const result = isMoveValid(board, player1, 0, 0, 1, 0);
    expect(result).toBe(true);
  });
});
