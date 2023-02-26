const prompt = require("prompt-sync")();

import {
  hasPlayerLost,
  hasPlayerWon,
  isAttackValid,
  isMoveValid,
  isPlaceValid,
  printBoard,
} from "../utils/actions";
import { initialSetup } from "../utils/initialSetup";
import { Player, Unit } from "../types";
import { MOVEMENTS } from "../types/dataModels";

let { boardSize, Wolf, Crow, board, currentPlayer } = initialSetup();

let nextTurnPlayer: Player | null;

function takeTurn(): void {
  let finish = false;

  // Print the game board and player information
  printBoard(board);
  console.log(
    `${board.map((row, index) => `==`).join("")} ${
      currentPlayer.name
    } (${currentPlayer.name.substring(0, 1).toUpperCase()}) ${board
      .map((row, index) => `==`)
      .join("")}`
  );
  console.log(
    `Hand: ${currentPlayer.handUnits.map((u: Unit) => u.name).join(", ")}`
  );
  currentPlayer.recruitmentZone.map((unit: Unit) => {
    let count = currentPlayer.recruitmentZone.filter((u: Unit) => unit === u);
    return `${count} ${unit.name}`;
  });
  console.log(
    `Recruitment pieces: ${currentPlayer.recruitmentZone
      .filter(
        (unit: Unit, index: number) =>
          currentPlayer.recruitmentZone.indexOf(unit) === index
      )
      .map((unit: Unit) => {
        let count = currentPlayer.recruitmentZone.filter(
          (u: Unit) => unit === u
        ).length;
        return `${count} ${unit.name}`;
      })
      .join(", ")}`
  );
  console.log(
    `Discard pile: ${currentPlayer.discardPile
      .filter(
        (u: Unit, index: number) =>
          currentPlayer.discardPile.indexOf(u) === index
      )
      .map((unit: Unit) => {
        let count = currentPlayer.discardPile.filter(
          (u: Unit) => unit === u
        ).length;
        return `${count} ${unit.name}`;
      })
      .join(", ")}\n`
  );
  console.log(`Control tokens: ${4 - currentPlayer.controlledZones}`);

  // Variable that count the actions taken in a turn
  let actionsInTurn = 0;
  while (actionsInTurn < 3 && !finish) {
    // Allow the player to choose an action
    const inputAction = prompt(`Make an action (${MOVEMENTS.join("/")}): `);

    // Check if the action is typed okay
    if (inputAction && !MOVEMENTS.includes(inputAction)) {
      break;
    }

    // Helper variables
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
          (u: Unit) => u.name === unitInput ?? null
        );

        // Check if the unit exists in the hand
        if (!unit) {
          console.log("Not a valid unit");
          break;
        }

        // Remove the unit from hand and put in the discard pile
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
          row >= boardSize ||
          column === null ||
          column < 0 ||
          column >= boardSize ||
          !isPlaceValid(currentPlayer, board, row, column)
        ) {
          console.log("Error: The unit cannot be place in that position");
          return;
        }

        // Place the unit in the board
        board[row][column] = {
          controlZone: board[row][column].controlZone,
          controlledBy: board[row][column].controlledBy,
          unit: unit,
          unitOwner: currentPlayer,
        };
        actionsInTurn++;
        break;
      case "control":
        // Ask player for the unit to discard
        unitInput = prompt("Piece to discard from Hand: ");
        unit = currentPlayer.handUnits.find(
          (u: Unit) => u.name === unitInput ?? null
        );

        // Check if the unit exists in the hand
        if (!unit) {
          console.log("Not a valid unit");
          break;
        }

        // Remove the unit from hand and put in the discard pile
        currentPlayer.handUnits
          .splice(currentPlayer.handUnits.indexOf(unit), 1)
          .filter((u: Unit) => u !== unit);
        currentPlayer.discardPile.push(unit);

        // Ask the player for the position to control
        positionInput = prompt("Position to control (row,col): ");
        row = positionInput?.split(",")[0].charCodeAt(0);
        row = row >= 97 && row <= 122 ? row - 97 : null;
        column = Number(positionInput?.split(",")[1]) ?? null;

        // Check if the position is inside the board
        if (
          row === null ||
          row < 0 ||
          row >= boardSize ||
          column === null ||
          column < 0 ||
          column >= boardSize
        ) {
          console.log("The position cannot be controlled.");
          break;
        }

        // Check if the selected position is a control zone
        if (!board[row][column].controlZone) {
          console.log("It is not a control zone");
          break;
        }
        // Check if there's already a unit in that position
        if (board[row][column].unitOwner?.name !== currentPlayer.name) {
          console.log("You don't already have a unit in this position");
          break;
        }

        // Assign the control zone to the Player
        board[row][column] = {
          controlZone: board[row][column].controlZone,
          controlledBy: currentPlayer,
          unitOwner: currentPlayer,
          unit: board[row][column].unit,
        };
        currentPlayer.controlledZones++;

        // Check if player has won
        if (hasPlayerWon(currentPlayer)) {
          console.log(`¡¡¡FIN DEL JUEGO!!! `);
          console.log(`Ganador: ${currentPlayer.name}`);
          finish = true;
        }
        actionsInTurn++;
        break;
      case "move":
        // Ask the user for the initial position of the unit
        positionInput = prompt("From position (row,col): ");
        row = positionInput?.split(",")[0].charCodeAt(0);
        row = row >= 97 && row <= 122 ? row - 97 : null;
        column = Number(positionInput?.split(",")[1]) ?? null;

        // Check if the position is inside the board
        if (
          !unit ||
          row === null ||
          row < 0 ||
          row >= boardSize ||
          column === null ||
          column < 0 ||
          column >= boardSize
        ) {
          console.log("Not valid position");
          break;
        }

        // Ask player for the unit to discard from the hand
        unitInput = prompt("Select a piece of the same type in your hand: ");
        unit = currentPlayer.handUnits.find(
          (u: Unit) => u.name === unitInput ?? null
        );
        // Check if the unit exists
        if (!unit) {
          console.log("Not a valid unit");
          break;
        }
        // Remove the unit from hand and put in the discard pile
        currentPlayer.handUnits
          .splice(currentPlayer.handUnits.indexOf(unit), 1)
          .filter((u: Unit) => u !== unit);
        currentPlayer.discardPile.push(unit);

        // Ask player for the final position
        positionInput = prompt("To position (row,col)");
        let endRow: number | null = positionInput?.split(",")[0].charCodeAt(0);
        endRow = endRow >= 97 && endRow <= 122 ? endRow - 97 : null;
        let endColumn = Number(positionInput?.split(",")[1]) ?? null;

        // Check if the position is inside the board
        if (
          endRow === null ||
          endRow < 0 ||
          endRow >= boardSize ||
          endColumn === null ||
          endColumn < 0 ||
          endColumn >= boardSize
        ) {
          console.log("Not valid position");
          break;
        }
        // Check if the movement is valid
        if (
          !isMoveValid(board, currentPlayer, row, column, endRow, endColumn)
        ) {
          console.log("Not valid movement");
          break;
        }
        // Move the unit
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
          (u: Unit) => u.name === unitInput ?? null
        );
        // Check if the unit exists
        if (!unit) {
          console.log("Not valid unit");
          break;
        }
        // Remove the unit from hand and put in the discard pile
        currentPlayer.handUnits
          .splice(currentPlayer.handUnits.indexOf(unit), 1)
          .filter((u: Unit) => u !== unit);
        currentPlayer.discardPile.push(unit);
        // Check if the unit is Royal
        if (unit.name === "royal") {
          // Ask the user for the unit to recruit
          unitInput = prompt(
            "Used Royal coin, type the piece you want to recruit: "
          );
          unit = currentPlayer.recruitmentZone.find(
            (u: Unit) => u.name === unitInput
          );
          // Check if the unit exists
          if (!unit) {
            console.log("Not valid unit");
            break;
          }
          // Move the unit from the recruitment zone to the bag
          currentPlayer.bag.push(unit);
          for (let i = 0; i < currentPlayer.recruitmentZone.length; i++) {
            if (unit === currentPlayer.recruitmentZone[i]) {
              currentPlayer.recruitmentZone.splice(i, 1);
              break;
            }
          }
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
          row >= boardSize ||
          column === null ||
          column < 0 ||
          column >= boardSize
        ) {
          console.log("Not valid position");
          break;
        }
        // Ask player for the unit to discard
        unitInput = prompt("Select a piece of the same type in your hand: ");
        unit = currentPlayer.handUnits.find(
          (u: Unit) => u.name === unitInput ?? null
        );
        // Check if the unit exists
        if (!unit) {
          console.log("Not a valid unit");
          break;
        }
        // Remove the unit from hand and put in the discard pile
        currentPlayer.handUnits
          .splice(currentPlayer.handUnits.indexOf(unit), 1)
          .filter((u: Unit) => u !== unit);
        currentPlayer.discardPile.push(unit);
        // Ask player for the position to attack
        positionInput = prompt("To position (row,col): ");
        endRow = positionInput?.split(",")[0].charCodeAt(0);
        endRow = endRow >= 97 && endRow <= 122 ? endRow - 97 : null;
        endColumn = Number(positionInput?.split(",")[1]) ?? null;
        // Check if the attacked position is valid
        if (
          endRow === null ||
          endRow < 0 ||
          endRow >= boardSize ||
          endColumn === null ||
          endColumn < 0 ||
          endColumn >= boardSize
        ) {
          console.log("Not valid position");
          break;
        }
        // Check if the attack can be performed
        if (
          !isAttackValid(board, currentPlayer, row, column, endRow, endColumn)
        ) {
          console.log("Attack not valid");
          break;
        }
        // Remove attacked unit
        board[endRow][endColumn] = {
          controlZone: board[endRow][endColumn].controlZone,
          controlledBy: board[endRow][endColumn].controlledBy,
          unit: null,
          unitOwner: null,
        };
        actionsInTurn++;
        break;
      case "initiative":
        // Ask player for the unit to discard
        unitInput = prompt(
          "Piece to discard from Hand to recruit the same kind: "
        );
        unit = currentPlayer.handUnits.find(
          (u: Unit) => u.name === unitInput ?? null
        );
        // Check if the unit exists
        if (!unit) {
          console.log("Not valid unit");
          break;
        }
        // Remove the unit from hand and put in the discard pile
        currentPlayer.handUnits
          .splice(currentPlayer.handUnits.indexOf(unit), 1)
          .filter((u: Unit) => u !== unit);
        currentPlayer.discardPile.push(unit);
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
    // If the game doesn't end, print the hand of the player
    !finish &&
      console.log(
        `Hand: ${currentPlayer.handUnits.map((u: Unit) => u.name).join(", ")}`
      );
    // Check if the player has lost before continuing the next action (or the next turn)
    if (hasPlayerLost(board, currentPlayer)) {
      console.log(`¡¡¡FIN DEL JUEGO!!!`);
      console.log(`Ganador: ${currentPlayer === Wolf ? Crow.name : Wolf.name}`);
      finish = true;
      break;
    }
  }
  // Switch the player
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
