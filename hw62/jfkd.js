import { error } from "console";
import { Stats, promises } from "fs";
import fs from "fs";
import os from "os";
import path from "path";

const users = [
  { name: "Mike", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Nikola", age: 17 },
];

const usersData = { users: users };

console.log("System: " + os.platform());
console.log("Home directory: " + os.homedir());
const filePath = path.join(os.homedir(), "data.json"); // - шлях для запису файла отримуємо від поточної ОС. Для зручності я того не робитиму та і не треба мені той мусор)

const shortPath = "data.json"; // - короткий шлях натомість

promises
  .writeFile(shortPath, JSON.stringify(usersData))
  .then(() => console.log("Data written to file"))
  .catch((err) => console.error(error));
