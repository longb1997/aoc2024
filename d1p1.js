const fs = require("fs");

const col1 = [];
const col2 = [];
let sum = 0;

fs.readFileSync("inputd1.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const splitedLine = line.split("   ");

    col1.push(splitedLine[0]);
    col2.push(splitedLine[1].replace("\r", ""));
  });

col1.sort((a, b) => a - b);
col2.sort((a, b) => a - b);

for (let i = 0; i < col1.length; i++) {
  const result = Number(col2[i]) - Number(col1[i]);

  sum += Math.abs(result);
}

console.log(sum);
