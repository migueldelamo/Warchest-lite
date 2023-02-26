import { Player } from "../../types";
import { isRoundCompleted } from "../actions";

describe("isRoundCompleted", () => {
  test("returns true if both players have the same number of turns", () => {
    const player1: Player = {
      name: "Player 1",
      turns: 3,
      handUnits: [],
      bag: [],
      recruitmentZone: [],
      controlledZones: 0,
      discardPile: [],
    };
    const player2: Player = {
      name: "Player 2",
      turns: 3,
      handUnits: [],
      bag: [],
      recruitmentZone: [],
      controlledZones: 0,
      discardPile: [],
    };
    expect(isRoundCompleted(player1, player2)).toBe(true);
  });

  test("returns false if both players have different number of turns", () => {
    const player1: Player = {
      name: "Player 1",
      turns: 3,
      handUnits: [],
      bag: [],
      recruitmentZone: [],
      controlledZones: 0,
      discardPile: [],
    };
    const player2: Player = {
      name: "Player 2",
      turns: 4,
      handUnits: [],
      bag: [],
      recruitmentZone: [],
      controlledZones: 0,
      discardPile: [],
    };
    expect(isRoundCompleted(player1, player2)).toBe(false);
  });
});
