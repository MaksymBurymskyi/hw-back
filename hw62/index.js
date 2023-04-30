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
  .catch((err) => console.error(err));

const newData = [
  { name: "Anna", age: 24 },
  { name: "Tom", age: 52 },
];

if (await isExist()) {
  promises
    .readFile(shortPath)
    .then((data) => {
      const usersData = JSON.parse(data);

      usersData.users = [...usersData.users, ...newData];

      return promises.writeFile(shortPath, JSON.stringify(usersData));
    })
    .then(() => {
      console.log("Data added to file");
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  console.log("wrong path");
}

async function isExist() {
  try {
    await promises.stat(shortPath);
    return true;
  } catch {
    return false;
  }
}
