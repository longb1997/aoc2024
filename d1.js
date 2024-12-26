const fs = require("fs");

const file = fs
  .readFileSync("input1.txt", "utf8")
  .trim()
  .split("\n")
  .map((r) => r.split(/\s+/));

const [left, right] = file.reduce(
  ([l, r], row) => {
    l.push(parseInt(row[0]));
    r.push(parseInt(row[1]));
    return [l, r];
  },
  [[], []]
);

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

const part1 = left.reduce((sum, val, i) => sum + Math.abs(val - right[i]), 0);

const part2 = left.reduce((sum, val) => {
  const count = right.filter((x) => x === val).length;
  return sum + count * val;
}, 0);
console.log("Part 1:", part1);
console.log("Part 2:", part2);
