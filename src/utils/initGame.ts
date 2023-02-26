import { Config, JsonDB } from "node-json-db";
import { User } from "../types";
const prompt = require("prompt-sync")();

const db = new JsonDB(new Config("src/db/myDataBase.json", true, true, "/"));
export async function initGame() {
  const username1: string = prompt("Type username of Player 1: ");
  const username2: string = prompt("Type username of Player 2: ");
  const data: User[] = await db.getData("/users");
  let user1: User | null, user2: User | null;
  user1 = data.find((user) => user.username === username1) ?? null;
  user2 = data.find((user) => user.username === username2) ?? null;
  if (!user1) {
    user1 = {
      id: data.length,
      username: username1,
      games: 1,
      victories: 0,
      date: new Date(),
    };
    await db.push(`/users[${data.length ?? 0}]`, user1, true);
  } else {
    user1 = {
      ...user1,
      games: user1.games + 1,
      date: new Date(),
    };
    await db.push(`/users[${user1.id}]`, user1, true);
  }
  if (!user2) {
    user2 = {
      id: data.length,
      username: username2,
      games: 1,
      victories: 0,
      date: new Date(),
    };
    await db.push(`/users[${data.length ?? 0}]`, user2, true);
  } else {
    user2 = {
      ...user2,
      games: user2.games + 1,
      date: new Date(),
    };
    await db.push(`/users[${user2.id}]`, user2, true);
  }
  return { user1, user2 };
}
