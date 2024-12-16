
const fs = require("fs");
const input = fs.readFileSync("input16.txt", "utf8");

const parseInput = (rawInput) => {
  const grid = rawInput.split("\n").map((row) => row.split(""));
  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 0 };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "S") {
        start.x = j;
        start.y = i;
      }
      if (grid[i][j] === "E") {
        end.x = j;
        end.y = i;
      }
    }
  }
  return { grid, start, end };
};

function getKey(c, dir) {
  return `${c.x},${c.y},${dir}`;
}

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

const getScore = (grid, start, end) => {
  let score = 0;

  const queue = [[start.x, start.y, 1, 0]];
  const visited = new Set();

  while (queue.length) {
    // Poor man's priority queue / Dijkstra's algorithm
    queue.sort((a, b) => a[3] - b[3]);

    const [x, y, dir, score] = queue.shift();
    const key = getKey({ x, y }, dir);

    if (x === end.x && y === end.y) return score;
    if (visited.has(key)) continue;

    visited.add(key);

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny]?.[nx] !== "#") {
      queue.push([nx, ny, dir, score + 1]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000]);
    queue.push([x, y, (dir + 3) % 4, score + 1000]);
  }

  return score;
};

const getPaths = (
  grid,
  start,
  end,
  lowestScore,
)=> {
  const queue = [
    [start.x, start.y, 1, 0, [start]],
  ];
  const visited = new Map();
  const paths = [];

  while (queue.length) {
    const [x, y, dir, score, path] = queue.shift();
    const key = getKey({ x, y }, dir);

    if (score > lowestScore) continue;
    if (visited.has(key) && visited.get(key) < score) continue;
    visited.set(key, score);

    if (x === end.x && y === end.y && score === lowestScore) {
      paths.push(path);
      continue;
    }

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny]?.[nx] !== "#") {
      queue.push([nx, ny, dir, score + 1, [...path, { x: nx, y: ny }]]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000, [...path]]);
    queue.push([x, y, (dir + 3) % 4, score + 1000, [...path]]);
  }

  return paths;
};

const part1 = (rawInput) => {
  const { grid, start, end } = parseInput(rawInput);
  return getScore(grid, start, end);
};

const part2 = (rawInput) => {
  const startTime = performance.now();
  const input = parseInput(rawInput);
  const lowest = getScore(input.grid, input.start, input.end);
  console.log("lowest", lowest);
  const paths = getPaths(input.grid, input.start, input.end, lowest);
  const uniquePaths = new Set();
  paths.forEach((path) => {
    path.forEach((p) => uniquePaths.add(getKey(p, 0)));
  });
  const endTime = performance.now();
  console.log(`Time taken: ${endTime - startTime} milliseconds`);
  return uniquePaths.size;
};

console.log(part1(input));
console.log(part2(input));
