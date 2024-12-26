const fs = require("fs");
const input = fs.readFileSync("input2.txt").toString().split("\n");

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

function solvePart1(input) {
    let safeReport = 0;
    
    input.forEach((line) => {
        const numbers = line.split(" ").map(n => parseInt(n));
        if (checkSequenceSafety(numbers)) {
            safeReport++;
        }
    });
    
    return safeReport;
}

function solvePart2(input) {
    let safeReport = 0;
    
    input.forEach((line) => {
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
    
    return safeReport;
}

console.log("Part 1:", solvePart1(input));
console.log("Part 2:", solvePart2(input));
