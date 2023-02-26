import { hasPlayerWon } from "../actions";

test("hasPlayerWon when he/she has won", () => {
  const result = hasPlayerWon({
    name: "Test",
    controlledZones: 4,
    turns: 0,
    handUnits: [],
    bag: [],
    recruitmentZone: [],
    discardPile: [],
  });
  expect(result).toBe(true);
});

test("hasPlayerWon when he/she hasn't won", () => {
  const result = hasPlayerWon({
    name: "Test",
    controlledZones: 3,
    turns: 0,
    handUnits: [],
    bag: [],
    recruitmentZone: [],
    discardPile: [],
  });
  expect(result).toBe(false);
});
