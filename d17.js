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

function findCorrectRegisterA(program) {
  const valids = {};
  // Khởi tạo giá trị tối thiểu với một số đủ lớn (8^17)
  // Sử dụng BigInt vì số quá lớn vượt quá giới hạn Number
  let minValid = 8n ** 17n;

  // Hàm đệ quy để tìm giá trị register A phù hợp
  // depth: độ sâu đệ quy (0-15), đại diện cho vị trí đang xét
  // score: giá trị tích lũy của register A đang được xây dựng
  function check(depth, score) {
    // Nếu đã xét đủ 16 vị trí, ta đã tìm được một giá trị hợp lệ

    if (depth === 16) {
      valids[score] = true; // Đánh dấu giá trị này là hợp lệ
      if (score < minValid) minValid = score; // Cập nhật giá trị nhỏ nhất nếu cần
      return -1;
    }

    // Mảng target chứa chuỗi output mong muốn
    // Mỗi phần tử là một số từ 0-7 mà chương trình cần tạo ra
    // Đọc target từ input thay vì hardcode
    const targetStr = fs
      .readFileSync("input17.txt", "utf8")
      .split("\n")
      .find((line) => line.startsWith("Program:"))
      .replace("Program:", "")
      .trim()
      .split(",")
      .map(Number);

    // Ta build register A từ phải qua trái vì:
    // 1. Register A là một số lớn được biểu diễn dưới dạng base-8 (cơ số 8)
    // 2. Mỗi chữ số trong số base-8 này sẽ tương ứng với một output của chương trình
    // 3. Khi chương trình chạy, nó sẽ lấy từng chữ số của A (bằng phép chia lấy dư cho 8)
    // 4. Do đó, chữ số cuối cùng (bên phải) của A sẽ tạo ra output đầu tiên
    // 5. Vì vậy ta cần đảo ngược mảng target để khớp với thứ tự xây dựng A
    // VD: Nếu target=[1,2,3] thì A=321 (base-8) sẽ cho output đúng thứ tự [1,2,3]
    const target = targetStr.reverse();

    // Thử tất cả các giá trị có thể (0-7) cho mỗi vị trí
    for (let i = 0; i < 8; i++) {
      // Tính giá trị mới cho register A bằng cách kết hợp
      // giá trị hiện tại (i) với score trước đó
      const testA = BigInt(i) + 8n * score;

      // Tạo trạng thái registers mới và chạy chương trình
      const registers = { A: testA, B: 0, C: 0 };
      const output = executeProgram(registers, program, 1)
        .split(",")
        .map(Number);

      // Nếu output đầu tiên khớp với giá trị target ở vị trí tương ứng
      // tiếp tục đệ quy với depth tăng lên và score mới
      if (output[0] === target[15 - depth]) {
        check(depth + 1, BigInt(i) + 8n * score);
      }

      console.log({ depth, i, output });
    }
  }

  // Bắt đầu tìm kiếm từ depth = 0 và score = 0
  check(0, 0n);

  // Trả về giá trị nhỏ nhất tìm được dưới dạng chuỗi
  return minValid.toString();
}

function solve(input, part = 1) {
  const { registers, program } = parseInput(input);

  if (part === 1) {
    return executeProgram(registers, program, part);
  } else {
    return findCorrectRegisterA(program);
  }
}

// Đọc input và chạy chương trình
const input = fs.readFileSync("input17.txt", "utf8");
console.log("Output:", solve(input, 1));
console.log("Output:", solve(input, 2));
