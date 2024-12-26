const fs = require("fs");

const part1 = (inputs) => {
  let safeReport = 0;
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  inputs.forEach((line) => {
    const matches = [...line.matchAll(mulRegex)];
    
    matches.forEach(match => {
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      safeReport += num1 * num2;
    });
  });

  return safeReport;
};

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

const main = () => {
  const inputs = fs.readFileSync("input3.txt").toString().split("\n");
  
  console.log("Part 1:", part1(inputs));
  console.log("Part 2:", part2(inputs));
};

main(); 