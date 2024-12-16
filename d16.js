const fs = require("fs");
const input = fs.readFileSync("input16.txt", "utf8");

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function getKey(c, dir) {
  return `${c.x},${c.y},${dir}`;
}

function getScore(lines, width, height, start, end) {
  const queue = [];
  // [row, col, direction, cost]
  queue.push([start[1], start[0], 0, 0]);

  // Set để lưu các đường đã qua
  const visited = new Set();

  let minCost = Infinity;

  while (queue.length > 0) {
    // Lấy đường có chi phí thấp nhất
    queue.sort((a, b) => a[3] - b[3]);
    const [row, col, dir, cost] = queue.shift();

    // Kiểm tra đích
    if (row === end[1] && col === end[0]) {
      minCost = Math.min(minCost, cost);
      continue;
    }

    const state = `${row},${col},${dir}`;
    if (visited.has(state)) continue;
    visited.add(state);

    // Thử các hướng mới
    for (let newDir = 0; newDir < 4; newDir++) {
      const turnCost = (newDir - dir + 4) % 4 === 0 ? 0 : 1000;
      const [dr, dc] = directions[newDir];
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width)
        continue;
      if (lines[newRow][newCol] === "#") continue;

      queue.push([newRow, newCol, newDir, cost + turnCost + 1]);
    }
  }
  return minCost;
}

const getPaths = (grid, start, end, lowestScore) => {
  const queue = [[start[0], start[1], 1, 0, [{ x: start[0], y: start[1] }]]];
  const visited = new Map();
  const paths = [];

  while (queue.length) {
    const [x, y, dir, score, path] = queue.shift();
    const key = getKey({ x, y }, dir);

    if (score > lowestScore) continue;
    if (visited.has(key) && visited.get(key) < score) continue;
    visited.set(key, score);

    if (x === end[0] && y === end[1] && score === lowestScore) {
      paths.push(path);
      continue;
    }

    const nx = x + directions[dir][0];
    const ny = y + directions[dir][1];
    if (grid[ny]?.[nx] !== "#") {
      queue.push([nx, ny, dir, score + 1, [...path, { x: nx, y: ny }]]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000, [...path]]);
    queue.push([x, y, (dir + 3) % 4, score + 1000, [...path]]);
  }

  return paths;
};

function solve(input, part) {
  const lines = input.split("\n");
  const height = lines.length;
  const width = lines[0].length;

  let start, end;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (lines[i][j] === "S") start = [j, i];
      if (lines[i][j] === "E") end = [j, i];
    }
  }
  if (part === 1) {
    return getScore(lines, width, height, start, end);
  }

  const startTime = performance.now();
  if (part === 2) {
    const lowest = getScore(lines, width, height, start, end);
    const paths = getPaths(lines, start, end, lowest);
    const uniquePaths = new Set();
    paths.forEach((path) => {
      path.forEach((p) => uniquePaths.add(getKey(p, 0)));
    });
    const endTime = performance.now();
    console.log(`Time taken: ${endTime - startTime} milliseconds`);
    return uniquePaths.size;
  }
}

console.log("Part 1:", solve(input, 1));
console.log("Part 2:", solve(input, 2));
