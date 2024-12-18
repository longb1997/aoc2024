const fs = require("fs");

function parseInput(input) {
  const lines = input.split("\n");

  // Parse registers
  const registerA = parseInt(lines[0].split(":")[1].trim());
  const registerB = parseInt(lines[1].split(":")[1].trim());
  const registerC = parseInt(lines[2].split(":")[1].trim());

  // Parse program
  const program = lines[4].split(":")[1].trim().split(",").map(Number);

  return {
    registers: { A: registerA, B: registerB, C: registerC },
    program,
  };
}

function executeProgram(registers, program, part) {
  let output = [];
  let ip = 0;

  // Sử dụng BigInt để xử lý số lớn
  let regA = BigInt(registers.A);
  let regB = registers.B;
  let regC = registers.C;

  while (ip < program.length) {
    const opcode = program[ip];
    const operand = program[ip + 1];

    function getComboValue(operand) {
      if (operand <= 3) return operand;
      if (operand === 4) return Number(regA % 8n); // Chuyển BigInt về Number
      if (operand === 5) return regB;
      if (operand === 6) return regC;
      return 0;
    }

    switch (opcode) {
      case 0: // adv
        regA = regA >> BigInt(getComboValue(operand)); // Sử dụng bit shift thay vì chia
        break;

      case 1: // bxl
        regB = regB ^ operand;
        break;

      case 2: // bst
        regB = getComboValue(operand) % 8;
        break;

      case 3: // jnz
        if (regA !== 0n) {
          ip = operand;
          continue;
        }
        break;

      case 4: // bxc
        regB = regB ^ regC;
        break;

      case 5: // out
        output.push(getComboValue(operand) % 8);
        break;

      case 6: // bdv
        regB = Number(regA >> BigInt(getComboValue(operand))) % 8; // Chuyển về Number sau khi shift
        break;

      case 7: // cdv
        regC = Number(regA >> BigInt(getComboValue(operand))) % 8; // Chuyển về Number sau khi shift
        break;
    }

    ip += 2;
  }

  return output.join(",");
}

function solve(input, part = 1) {
  const { registers, program } = parseInput(input);
  return executeProgram(registers, program, part);
}

// Đọc input và chạy chương trình
const input = fs.readFileSync("input17.txt", "utf8");
console.log("Output:", solve(input, 1));
