import { JsonDB, Config } from "node-json-db";

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
const db = new JsonDB(new Config("myDataBase", true, true, "/"));

// This will create an array 'myarray' with the object '{obj:'test'}' at index 0
await db.push(
  "/arraytest/myarray[0]",
  {
    obj: "test",
  },
  true
);

// You can retrieve a property of an object included in an array
// testString = 'test';
var testString = await db.getData("/arraytest/myarray[0]/obj");
console.log("testString", testString);

// Doing this will delete the object stored at the index 0 of the array.
// Keep in mind this won't delete the array even if it's empty.
await db.delete("/arraytest/myarray[0]");

// You can also easily append new item to an existing array
// This set the next index with {obj: 'test'}
await db.push(
  "/arraytest/myarray[]",
  {
    obj: "test",
  },
  true
);

// The append feature can be used in conjuction with properties
// This will set the next index as an object {myTest: 'test'}
await db.push("/arraytest/myarray[]/myTest", "test", true);

export {};
