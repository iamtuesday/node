import fs, { cp } from "fs";
import path from "path";
import { fileDirName } from "./lib/utils.js";

const { __dirname } = fileDirName(import.meta);

const PATH_FILE = path.join(__dirname, "data", "air_traffic.csv");

const readFileData = (pathFile) => {
  fs.readFile(pathFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let count = 0;
    const arrayLines = data.split("\n");

    for (const key in arrayLines) {
        let line = arrayLines[key];

      if (line.includes("Canada")) {
        count++;
      }
    }

    console.log(count);
  });
};

readFileData(PATH_FILE);
