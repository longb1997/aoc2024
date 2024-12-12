const fs = require("fs");

let safeReport = 0;
const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

fs.readFileSync("input3.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const matches = [...line.matchAll(mulRegex)];
    
    matches.forEach(match => {
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      safeReport += num1 * num2;
    });
  });

console.log(safeReport);
