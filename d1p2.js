const fs = require("fs");

const col1 = [];
const col2 = [];
let sum = 0;
const data = new Map();

fs.readFileSync("inputd1.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const splitedLine = line.split("   ");

    col1.push(splitedLine[0]);
    col2.push(splitedLine[1].replace("\r", ""));
  });

for (let i = 0; i < col2.length; i++) {
  if (data.has(col2)) {
    data.set(col2, data.get(col2) + 1);
  } else {
    data.set(col2, 1);
  }
}

for (let i = 0; i < col1.length; i++) {
  if (data.has(col1)) {
    sum += data.get(col1) * col1;
  }
}

console.log(sum);
