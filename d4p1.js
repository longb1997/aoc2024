const fs = require("fs");

const input = fs
  .readFileSync("input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));


const findXMAS = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1]
    ];

    function checkDirection(row, col, dx, dy) {
        const word = "XMAS";
        for (let i = 0; i < word.length; i++) {
            const newRow = row + (dx * i);
            const newCol = col + (dy * i);
            if (newRow < 0 || newRow >= rows || 
                newCol < 0 || newCol >= cols || 
                grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 'X') {
                for (const [dx, dy] of directions) {
                    if (checkDirection(row, col, dx, dy)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
};
const xmasCount = findXMAS(input);
console.log(xmasCount);
