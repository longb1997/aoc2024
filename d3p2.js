const fs = require("fs");

const part2 = (inputs) => {
  let answer = 0;
  const instructions = inputs.join("").split(/(?=do\(\)|don\'t\(\))/g);
  for (let instruction of instructions.filter(
    (inst) => !inst.startsWith("don't()")
  )) {
    const nums = instruction.match(/(?<=mul\()\d+,\d+(?=\))/g) ?? [];
    answer += nums
      .map((num) =>
        num
          .split(",")
          .map(Number)
          .reduce((pv, cv) => pv * cv)
      )
      .reduce((pv, cv) => pv + cv, 0);
  }
  return answer;
};

const inputs = fs.readFileSync("input3.txt").toString().split("\n");

console.log(part2(inputs));
