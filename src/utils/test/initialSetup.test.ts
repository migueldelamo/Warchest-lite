import { initialSetup } from "../initialSetup";

test("Should create a board of length 9", () => {
  const result = initialSetup(9);
  expect(result.board.length).toBe(9);
  expect(result.board[0].length).toBe(9);
});

test("Should return 6 control zones when boardSize is 5 ", () => {
  const result = initialSetup(5);
  expect(result.controlZones.length).toBe(6);
});
