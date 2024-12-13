const fs = require("fs");
const input = fs.readFileSync("input13.txt", "utf8").split("\n\n");

function solve(inputs, part) {
  const timestart = performance.now();
  let totalTokens = 0;

  for (const machine of inputs) {
    const lines = machine.split("\n");

    const prize = lines.find((line) => line.includes("Prize:"));
    let prizeX = parseInt(prize.split("X=")[1].split(",")[0]);
    let prizeY = parseInt(prize.split("Y=")[1]);

    const buttonA = lines.find((line) => line.includes("Button A:"));
    const buttonAX = parseInt(buttonA.split("X+")[1].split(",")[0]);
    const buttonAY = parseInt(buttonA.split("Y+")[1]);

    const buttonB = lines.find((line) => line.includes("Button B:"));
    const buttonBX = parseInt(buttonB.split("X+")[1].split(",")[0]);
    const buttonBY = parseInt(buttonB.split("Y+")[1]);

    if (part === 2) {
      prizeX += 10000000000000;
      prizeY += 10000000000000;
    }

    // Tính định thức của ma trận 2x2
    const det = buttonAX * buttonBY - buttonBX * buttonAY;
    if (det === 0) continue;

    // Kiểm tra và tính số lần nhấn nút A
    if ((buttonBY * prizeX - buttonBX * prizeY) % det !== 0) continue;
    const APresses = Math.floor((buttonBY * prizeX - buttonBX * prizeY) / det);

    // Kiểm tra và tính số lần nhấn nút B
    if ((buttonAX * prizeY - buttonAY * prizeX) % det !== 0) continue;
    const BPresses = Math.floor((buttonAX * prizeY - buttonAY * prizeX) / det);

    if (APresses >= 0 && BPresses >= 0) {
      totalTokens += 3 * APresses + BPresses;
    }
  }
  const timeend = performance.now();
  console.log(`Time taken: ${timeend - timestart} milliseconds`);
  return totalTokens;
}

console.log("Part 1:", solve(input, 1));
console.log("Part 2:", solve(input, 2));
