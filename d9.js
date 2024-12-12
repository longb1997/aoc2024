const fs = require("fs");
const input = fs.readFileSync("input9.txt", "utf8").trim().split("");

// Helper function to get range of consecutive same values
function getRange(disk, i) {
    let a = i, b = i;
    while (a >= 1 && disk[a - 1] === disk[i]) a--;
    while (b + 1 < disk.length && disk[b + 1] === disk[i]) b++;
    return [a, b];
}

function solve(input, part) {
  const startTime = performance.now();
  const numbers = input.map((n) => parseInt(n));
  let disk = [];
  let fileId = 0;

  // Build initial array
  for (let i = 0; i < numbers.length; i++) {
    const len = numbers[i];
    for (let j = 0; j < len; j++) {
      if (i % 2 === 0) {
        disk.push(fileId);
      } else {
        disk.push(".");  // Using "." instead of -1 to maintain compatibility
      }
    }
    if (i % 2 === 1) {
      fileId++;
    }
  }

  if (part === 1) {
    // Part 1 logic remains the same
    let left = 0;
    let right = disk.length - 1;

    while (true) {
      while (left < disk.length && disk[left] !== ".") {
        left++;
      }
      while (right > left && disk[right] === ".") {
        right--;
      }

      if (left >= right) {
        break;
      }

      [disk[left], disk[right]] = [disk[right], disk[left]];
    }
  }

  if (part === 2) {
    // New optimized Part 2 logic
    const attempted = new Set();

    for (let j = disk.length - 1; j >= 0; j--) {
      if (disk[j] === "." || attempted.has(disk[j])) continue;
      
      attempted.add(disk[j]);
      const [a, b] = getRange(disk, j);
      const lenJ = b - a + 1;
      
      let i = 0;
      while (i < j) {
        if (disk[i] !== ".") {
          i++;
          continue;
        }
        
        const [c, d] = getRange(disk, i);
        const lenI = d - c + 1;
        
        if (lenI >= lenJ) {
          // Swap ranges
          for (let k = 0; k < lenJ; k++) {
            [disk[c + k], disk[a + k]] = [disk[a + k], disk[c + k]];
          }
          break;
        } else {
          i = d + 1;
        }
      }
    }
  }

  // Calculate checksum
  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== ".") {
      checksum += i * disk[i];
    }
  }
  
  const endTime = performance.now();
  console.log(`Call took ${endTime - startTime} milliseconds`);
  return checksum;
}

console.log("Part 1:", solve(input, 1));
console.log("Part 2:", solve(input, 2));
