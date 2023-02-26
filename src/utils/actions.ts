import { Board, Player } from "../types";

// Function to check if a place is valid
export function isPlaceValid(
  currentPlayer: Player,
  board: Board,
  row: number,
  column: number
): boolean {
  // Check if the selected position has alreaddy another unit placed
  if (board[row][column].unit !== null) {
    return false;
  }
  // Check if the row and column are inside the Board
  if (
    row < 0 ||
    row >= board.length ||
    column < 0 ||
    column >= board[0].length
  ) {
    return false;
  }
  // Check if the selected position has an adjacent controlled zone by the player, to allow the placement
  if (
    (row - 1 >= 0 &&
      board[row - 1][column].controlledBy?.name === currentPlayer.name) ||
    (row + 1 < board.length &&
      board[row + 1][column].controlledBy?.name === currentPlayer.name) ||
    (column - 1 >= 0 &&
      board[row][column - 1].controlledBy?.name === currentPlayer.name) ||
    (column + 1 < board[0].length &&
      board[row][column + 1].controlledBy?.name === currentPlayer.name)
  ) {
    return true;
  }
  return false;
}
// Function to check if a move is valid
export function isMoveValid(
  board: Board,
  currentPlayer: Player,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): boolean {
  const selectedUnit = board[startRow][startCol].unit;
  if (!selectedUnit || !selectedUnit.movement?.range) {
    return false;
  }
  // Check if start position is controlled by the current player
  if (board[startRow][startCol].unitOwner !== currentPlayer) {
    return false;
  }
  // Check if end position is not free
  if (board[endRow][endCol].unit) {
    return false;
  }
  // Check if the unit can move to the end position
  const selectedUnitMovementRange = selectedUnit.movement.range;
  const selectedUnitMovementDirection = selectedUnit.movement.direction;
  const distance =
    selectedUnitMovementDirection === "orthogonal"
      ? Math.abs(startRow - endRow) + Math.abs(startCol - endCol)
      : Math.max(Math.abs(startRow - endRow), Math.abs(startCol - endCol));
  if (!selectedUnitMovementRange || distance > selectedUnitMovementRange) {
    return false;
  }
  return true;
}

// Function to check if a move is valid
export function isAttackValid(
  board: Board,
  currentPlayer: Player,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): boolean {
  const selectedUnit = board[startRow][startCol].unit;
  if (!selectedUnit || !selectedUnit.attack?.range) {
    return false;
  }

  const attackedUnit = board[endRow][endCol].unit;
  if (!attackedUnit) {
    return false;
  }

  // Check if start position is controlled by the current player
  if (board[startRow][startCol].unitOwner !== currentPlayer) {
    return false;
  }

  // Check if end position is controlled by the other player
  if (
    board[endRow][endCol].unitOwner === currentPlayer ||
    board[endRow][endCol].unitOwner === null
  ) {
    return false;
  }
  return true;
}

// Function to print the current state of the game board
export function printBoard(board: Board) {
  let boardString = `     ${board
    .map((row, index) => `${index}   `)
    .join("")}\n`;
  boardString += `   ${board.map((row, index) => `----`).join("")} \n`;

  for (let i = 0; i < board.length; i++) {
    let rowString = String.fromCharCode(97 + i) + " | ";
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j].controlledBy) {
        rowString +=
          board[i][j].controlledBy?.name === "Wolf"
            ? " W  "
            : board[i][j].controlledBy?.name === "Crow"
            ? " C  "
            : "";
      } else {
        rowString += board[i][j].unit
          ? ` ${board[i][j].unit?.abbreviation} `
          : board[i][j].controlZone
          ? " @  "
          : " ·  ";
      }
    }
    boardString += rowString;
    boardString += "\n";
  }
  console.log(boardString);
}

// Function to check if a player has won
export function hasPlayerWon(player: Player) {
  return player.controlledZones >= 4;
}

export function hasPlayerLost(board: Board, currentPlayer: Player) {
  let hasBoardUnits = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].unitOwner?.name === currentPlayer.name) {
        hasBoardUnits = true;
        break;
      }
    }
    if (hasBoardUnits) break;
  }
  return (
    !hasBoardUnits &&
    currentPlayer.handUnits.length === 0 &&
    currentPlayer.bag.length === 0 &&
    currentPlayer.recruitmentZone.length === 0
  );
}

export function isRoundCompleted(player1: Player, player2: Player) {
  return player1.turns === player2.turns;
}
