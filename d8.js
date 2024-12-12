const fs = require("fs");

// Đọc nội dung file input
function readInput() {
  return fs.readFileSync("input8.txt", "utf-8");
}

// Chuyển input thành mảng 2 chiều
function parseInput() {
  const data = readInput();
  return data.split("\n").map((line) => line.trim().split(""));
}

// Generator function để duyệt qua từng ô trong grid
function* makeGridIterator(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      yield { x, y, value: grid[y][x], grid };
    }
  }
}

// Tạo grid trống với giá trị mặc định là "."
function emptyGrid(grid) {
  const empty = [];
  for (let y = 0; y < grid.length; y++) {
    let row = [];
    for (let x = 0; x < grid[0].length; x++) {
      row.push(".");
    }
    empty.push(row);
  }
  return empty;
}

// Kiểm tra xem một vị trí có nằm trong grid không
function isInside(position, grid) {
  return (
    position.x >= 0 &&
    position.x <= grid[0].length - 1 &&
    position.y >= 0 &&
    position.y <= grid.length - 1
  );
}

// So sánh hai vị trí có bằng nhau không
function equalsPosition(a, b) {
  return a.x === b.x && a.y === b.y;
}

function solvePart1() {
  const grid = parseInput();
  // Map lưu trữ vị trí của các anten cùng loại
  const antennaToPositionsMap = new Map();
  
  // Duyệt grid để tìm vị trí các anten
  const gridIterator = makeGridIterator(grid);
  for (const { x, y, value } of gridIterator) {
    if (value === ".") {
      continue;
    }
    if (antennaToPositionsMap.has(value)) {
      antennaToPositionsMap.get(value).push({ x, y });
    } else {
      antennaToPositionsMap.set(value, [{ x, y }]);
    }
  }

  // Grid để đánh dấu vị trí các antinode
  const antinodes = emptyGrid(grid);
  
  // Xử lý từng cặp anten cùng loại
  antennaToPositionsMap.forEach((positions, key) => {
    for (let i = 0; i < positions.length; i++) {
      for (let j = 1; j < positions.length; j++) {
        // Tính vector khoảng cách giữa hai anten
        const xDiff = positions[i].x - positions[j].x;
        const yDiff = positions[i].y - positions[j].y;

        // Tạo 4 điểm antinode tiềm năng
        const potentialAntinodes = [
          { x: positions[i].x + xDiff, y: positions[i].y + yDiff },
          { x: positions[i].x - xDiff, y: positions[i].y - yDiff },
          { x: positions[j].x + xDiff, y: positions[j].y + yDiff },
          { x: positions[j].x - xDiff, y: positions[j].y - yDiff },
        ];
        potentialAntinodes
          .filter(
            (antinode) =>
              !equalsPosition(positions[i], antinode) &&
              !equalsPosition(positions[j], antinode) &&
              isInside(antinode, grid),
          )
          .forEach((antinode) => {
            antinodes[antinode.y][antinode.x] = "#";
          });
      }
    }
  });
  return antinodes.flatMap((v) => v).filter((v) => v === "#").length;
}

function solvePart2() {
  const grid = parseInput();
  const antennaToPositionsMap = new Map();
  const gridIterator = makeGridIterator(grid);
  for (const { x, y, value } of gridIterator) {
    if (value === ".") {
      continue;
    }
    if (antennaToPositionsMap.has(value)) {
      antennaToPositionsMap.get(value).push({ x, y });
    } else {
      antennaToPositionsMap.set(value, [{ x, y }]);
    }
  }

  const antinodes = emptyGrid(grid);
  antennaToPositionsMap.forEach((positions, key) => {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const xDiff = positions[i].x - positions[j].x;
        const yDiff = positions[i].y - positions[j].y;

        const potentialAntinodes = [];
        let count = 1;
        while (
          Math.abs(count * xDiff) < grid[0].length &&
          Math.abs(count * yDiff) < grid.length
        ) {
          potentialAntinodes.push({
            x: positions[i].x + count * xDiff,
            y: positions[i].y + count * yDiff,
          });
          potentialAntinodes.push({
            x: positions[i].x - count * xDiff,
            y: positions[i].y - count * yDiff,
          });
          potentialAntinodes.push({
            x: positions[j].x + count * xDiff,
            y: positions[j].y + count * yDiff,
          });
          potentialAntinodes.push({
            x: positions[j].x - count * xDiff,
            y: positions[j].y - count * yDiff,
          });
          count += 1;
        }

        potentialAntinodes
          .filter((antinode) => isInside(antinode, grid))
          .forEach((antinode) => {
            antinodes[antinode.y][antinode.x] = "#";
          });
      }
    }
  });
  return antinodes.flatMap((v) => v).filter((v) => v === "#").length;
}

const part1Result = solvePart1();
console.log(`p1: ${part1Result}`);
const part2Result = solvePart2();
console.log(`p2: ${part2Result}`);
