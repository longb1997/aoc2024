const fs = require("fs");

const input = fs
  .readFileSync("input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

// Tìm XMAS theo 8 hướng
const findXMASPattern1 = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [-1, -1], [1, -1], [-1, 1]
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

// Tìm AMS theo đường chéo với điều kiện đặc biệt
const findXMASPattern2 = (input) => {
    let count = 0;

    input.forEach((row, index) => {
        row.forEach((col, index2) => {
            if (col !== "A") return;
            let localMatches = 0;

            // Kiểm tra 4 hướng đường chéo
            if (input[index + 1]?.[index2 - 1] === "M" && 
                input[index - 1]?.[index2 + 1] === "S")
                localMatches++;

            if (input[index + 1]?.[index2 + 1] === "M" && 
                input[index - 1]?.[index2 - 1] === "S")
                localMatches++;

            if (input[index - 1]?.[index2 - 1] === "M" && 
                input[index + 1]?.[index2 + 1] === "S")
                localMatches++;

            if (input[index - 1]?.[index2 + 1] === "M" && 
                input[index + 1]?.[index2 - 1] === "S")
                localMatches++;

            if (localMatches >= 2) count++;
        });
    });

    return count;
};

const findAllPatterns = (input) => {
    const pattern1Count = findXMASPattern1(input);
    const pattern2Count = findXMASPattern2(input);
    
    console.log("Pattern 1 (XMAS) count:", pattern1Count);
    console.log("Pattern 2 (AMS) count:", pattern2Count);
};

findAllPatterns(input); 