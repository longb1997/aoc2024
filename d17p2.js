console.time('Execution Time');

const program = [2,4,1,1,7,5,4,6,0,3,1,4,5,5,3,0];

function runProgram(registerA, registerB, registerC, program) {
  let instructionPointer = 0;
  const output = [];

  const getComboOperandValue = (operand) => {
    const comboOperands = [
      () => operand,
      () => operand,
      () => operand,
      () => operand,
      () => registerA,
      () => registerB,
      () => registerC,
      () => { throw new Error("Invalid combo operand"); }
    ];
    return comboOperands[operand]();
  };

  const adv = (operand) => {
    registerA = Math.floor(registerA / 2 ** getComboOperandValue(operand));
    instructionPointer += 2;
  };
  const bxl = (operand) => {
    registerB ^= operand;
    instructionPointer += 2;
  };
  const bst = (operand) => {
    registerB = getComboOperandValue(operand) % 8;
    instructionPointer += 2;
  };
  const jnz = (operand) => {
    if (registerA !== 0) {
      instructionPointer = operand;
    } else {
      instructionPointer += 2;
    }
  };
  const bxc = () => {
    registerB ^= registerC;
    instructionPointer += 2;
  };
  const out = (operand) => {
    output.push((getComboOperandValue(operand) % 8 + 8) % 8);
    instructionPointer += 2;
  };
  const bdv = (operand) => {
    registerB = Math.floor(registerA / 2 ** getComboOperandValue(operand));
    instructionPointer += 2;
  };
  const cdv = (operand) => {
    registerC = Math.floor(registerA / 2 ** getComboOperandValue(operand));
    instructionPointer += 2;
  };

  const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];
    instructions[opcode](operand);
  }

  return output;
}

function getRegisterAValue(program, cursor, soFar) {
  for (let candidate = 0; candidate < 8; candidate++) {
    const testInput = soFar * 8 + candidate;
    const output = runProgram(testInput, 0, 0, program);
    if (JSON.stringify(output) === JSON.stringify(program.slice(cursor))) {
      if (cursor === 0) {
        return testInput;
      }
      const result = getRegisterAValue(program, cursor - 1, testInput);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}

console.log(getRegisterAValue(program, program.length - 1, 0));

console.timeEnd('Execution Time');