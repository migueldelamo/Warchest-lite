const prompt = require("prompt-sync")();

import { Board, Player, Unit } from "../types";
import { MOVEMENTS } from "../types/dataModels";
import { initialSetup } from "../utils/initialSetup";

let { Wolf, Crow, board, currentPlayer } = initialSetup();

let nextTurnPlayer: Player | null;

function takeTurn(): void {
  let finish = false;

  // Print the game board and player information
  printBoard(); // TODO

  let actionsInTurn = 0;
  while (actionsInTurn < 3 && !finish) {
    // Allow the player to choose an action
    const inputAction = prompt(`Make an action (${MOVEMENTS.join("/")}): `);
    // Check if the action is typed okay
    if (inputAction && !MOVEMENTS.includes(inputAction)) {
      break;
    }

    let unitInput: string;
    let unit: Unit | undefined;
    let positionInput: string;
    let row: number | null;
    let column: number | null;

    switch (inputAction) {
      case "place":
        // Ask player for the unit to discard
        unitInput = prompt("Piece to place from Hand: ");
        unit = currentPlayer.handUnits.find(
          (unit: Unit) => unit.name === unitInput ?? null
        );
        if (!unit) {
          console.log("Not a valid unit");
          break;
        }
        // TODO: Remove the unit from hand and put in the discard pile
        currentPlayer.handUnits
          .splice(currentPlayer.handUnits.indexOf(unit), 1)
          .filter((u: Unit) => u !== unit);
        currentPlayer.discardPile.push(unit);
        // Ask the user for the position where the unit will be placed
        positionInput = prompt("Position to place (row,col): ");
        row = positionInput?.split(",")[0].charCodeAt(0);
        row = row >= 97 && row <= 122 ? row - 97 : null;
        column = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the position is inside the board
        if (
          row === null ||
          row < 0 ||
          row >= board.length ||
          column === null ||
          column < 0 ||
          column >= board[0].length ||
          !isPlaceValid() // TODO
        ) {
          // TODO: Manage error
          break;
        }
        placeUnit(); // TODO
        actionsInTurn++;
        break;
      case "control":
        // Ask player for the unit to discard
        unitInput = prompt("Piece to discard from Hand: ");
        unit = currentPlayer.handUnits.find(
          (unit: Unit) => unit.name === unitInput ?? null
        );
        if (!unit) {
          // TODO: Manage error
          break;
        }
        // TODO: Remove the unit from hand and put in the discard pile

        // Ask the player for the position to control
        positionInput = prompt("Position to control (row,col): ");
        row = positionInput?.split(",")[0].charCodeAt(0);
        row = row >= 97 && row <= 122 ? row - 97 : null;
        column = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the position is inside the board
        if (
          row === null ||
          row < 0 ||
          row >= board.length ||
          column === null ||
          column < 0 ||
          column >= board[0].length
        ) {
          console.log("The position cannot be controlled.");
          break;
        }
        // Check if the selected position is a control zone
        if (!board[row][column].controlZone) {
          // TODO: Manage error
          break;
        }
        // Check if there's already a unit in that position
        if (board[row][column].unitOwner?.name !== currentPlayer.name) {
          // TODO: Manage error
          break;
        }
        controlZone(); // TODO
        // TODO: Check if player has won

        actionsInTurn++;
        break;
      case "move":
        // Ask the player for the initial position
        positionInput = prompt("From position (row,col): ");
        row = positionInput?.split(",")[0].charCodeAt(0);
        row = row >= 97 && row <= 122 ? row - 97 : null;
        column = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the position is inside the board
        if (
          row === null ||
          row < 0 ||
          row >= board.length ||
          column === null ||
          column < 0 ||
          column >= board[0].length
        ) {
          // TODO: Manage error
          break;
        }
        // Ask player for the unit to discard
        unitInput = prompt("Select a piece of the same type in your hand: ");
        unit = currentPlayer.handUnits.find(
          (unit: Unit) => unit.name === unitInput ?? null
        );
        if (!unit) {
          // TODO: Manage error
          break;
        }
        // TODO: Remove the unit from hand and put in the discard pile

        positionInput = prompt("To position (row,col)");
        let endRow: number | null = positionInput?.split(",")[0].charCodeAt(0);
        endRow = endRow >= 97 && endRow <= 122 ? endRow - 97 : null;
        let endColumn = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the position is inside the board
        if (
          endRow === null ||
          endRow < 0 ||
          endRow >= board.length ||
          endColumn === null ||
          endColumn < 0 ||
          endColumn >= board[0].length
        ) {
          // TODO: Manage error
          break;
        }
        if (!isMoveValid()) {
          // TODO
          // TODO: Manage error
          break;
        }
        board[endRow][endColumn].unit = board[row][column].unit;
        board[row][column].unit = null;
        actionsInTurn++;
        break;
      case "recruit":
        // Ask player for the unit to discard
        unitInput = prompt(
          "Piece to discard from Hand to recruit the same kind: "
        );
        unit = currentPlayer.handUnits.find(
          (unit: Unit) => unit.name === unitInput ?? null
        );
        if (!unit) {
          // TODO: Manage error
          break;
        }
        // Remove the unit from hand and put in the discard pile
        if (unit.name === "royal") {
          unitInput = prompt(
            "Used Royal coin, type the piece you want to recruit: "
          );
          unit = currentPlayer.recruitmentZone.find(
            (unit: Unit) => unit.name === unitInput
          );
          if (!unit) {
            // Manage error
            break;
          }
          // TODO: Recruit a unit and push into the bag
        }
        actionsInTurn++;
        break;
      case "attack":
        // Ask player for the position of the attacker unit
        positionInput = prompt("Attack from position (row,col): ");
        row = positionInput?.split(",")[0].charCodeAt(0);
        row = row >= 97 && row <= 122 ? row - 97 : null;
        column = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the position is inside the board
        if (
          row === null ||
          row < 0 ||
          row >= board.length ||
          column === null ||
          column < 0 ||
          column >= board[0].length
        ) {
          // TODO: Manage error
          break;
        }
        // Ask player for the unit to discard
        unitInput = prompt("Select a piece of the same type in your hand: ");
        unit = currentPlayer.handUnits.find(
          (unit: Unit) => unit.name === unitInput ?? null
        );
        if (!unit) {
          // TODO: Manage error
          break;
        }
        // TODO: Remove the unit from hand and put in the discard pile

        // Ask player for the position to attack
        positionInput = prompt("To position (row,col): ");
        endRow = positionInput?.split(",")[0].charCodeAt(0);
        endRow = endRow >= 97 && endRow <= 122 ? endRow - 97 : null;
        endColumn = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the attacked position is valid
        if (
          endRow === null ||
          endRow < 0 ||
          endRow >= board.length ||
          endColumn === null ||
          endColumn < 0 ||
          endColumn >= board[0].length
        ) {
          // TODO: Manage error
          break;
        }
        // Check if the attack can be performed
        if (!isAttackValid()) {
          // TODO
          // TODO: Manager error
          break;
        }
        // TODO: Remove attacked unit

        actionsInTurn++;
        break;
      case "initiative":
        // Ask player for the unit to discard
        unitInput = prompt(
          "Piece to discard from Hand to recruit the same kind: "
        );
        unit = currentPlayer.handUnits.find(
          (unit: Unit) => unit.name === unitInput ?? null
        );
        if (!unit) {
          // TODO: Manage error
          break;
        }
        // Remove the unit from hand and put in the discard pile

        actionsInTurn++;
        break;
      case "forfeit":
        console.log(`¡¡¡FIN DEL JUEGO!!!`);
        console.log(`The player ${currentPlayer.name} has given up`);
        finish = true;
        break;
      default:
        break;
    }

    !finish &&
      console.log(
        `Hand: ${currentPlayer.handUnits
          .map((unit: Unit) => unit.name)
          .join(", ")}`
      );
  }

  if (!finish) {
    actionsInTurn = 0;
    currentPlayer = nextTurnPlayer
      ? nextTurnPlayer
      : currentPlayer === Wolf
      ? Crow
      : Wolf;
    nextTurnPlayer = null;
    takeTurn();
  }
}

takeTurn();

export {};
