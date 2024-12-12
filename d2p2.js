const fs = require("fs");

let safeReport = 0;

function checkSequenceSafety(numbers) {
  let lastDiff = null;
  let directionChanged = false;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];
    
    if (Math.abs(diff) > 3 || diff === 0) {
      return false;
    }

    if (lastDiff !== null) {
      if ((lastDiff > 0 && diff < 0) || (lastDiff < 0 && diff > 0)) {
        directionChanged = true;
        break;
      }
    }
    lastDiff = diff;
  }

  return !directionChanged;
}

fs.readFileSync("inputd2.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const numbers = line.split(" ").map(n => parseInt(n));
    
    if (checkSequenceSafety(numbers)) {
      safeReport++;
      return;
    }
    
    for (let i = 0; i < numbers.length; i++) {
      const modifiedSequence = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
      if (checkSequenceSafety(modifiedSequence)) {
        safeReport++;
        break;
      }
    }
  });

console.log(safeReport);
