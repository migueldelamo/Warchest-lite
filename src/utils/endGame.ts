import { Config, JsonDB } from "node-json-db";
import { User } from "../types";
const prompt = require("prompt-sync")();

const db = new JsonDB(new Config("src/db/myDataBase.json", true, true, "/"));
export async function endGame(winner: User) {
  // This will create an array 'myarray' with the object '{obj:'test'}' at index 0
  await db.push(
    `/users[${winner.id}]`,
    {
      ...winner,
      victories: winner.victories + 1,
    },
    true
  );
}
