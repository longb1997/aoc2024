const fs = require("fs");
const input = fs.readFileSync("input17.txt", "utf8");

let aInput = BigInt(input.trim().split("\n")[0].split(": ")[1]);
let bInput = BigInt(input.trim().split("\n")[1].split(": ")[1]);
let cInput = BigInt(input.trim().split("\n")[2].split(": ")[1]);

let program = input
  .trim()
  .split("Program: ")[1]
  .split(",")
  .map((b) => parseInt(b));

function getCombo(op, a, b, c) {
  switch (op) {
    case 0:
    case 1:
    case 2:
    case 3:
      return BigInt(op); // Trả về chính số op nếu op từ 0-3
    case 4:
      return a; // Trả về giá trị a
    case 5:
      return b; // Trả về giá trị b
    case 6:
      return c; // Trả về giá trị c
    default:
      console.log("Invalid operation");
  }
}

// Hàm div: Thực hiện phép chia số a cho 2^b
function div(a, b) {
  let den = 2n ** b;
  let res = a / den;
  return res;
}

function runMachine(candidate) {
  let ip = 0; // Con trỏ chỉ vị trí hiện tại trong program
  let p1 = []; // Mảng kết quả
  let a = candidate; // Giá trị ban đầu
  let b = bInput;
  let c = cInput;

  // Chạy cho đến khi hết program
  while (ip < program.length) {
    let instr = program[ip]; // Lệnh hiện tại
    let literal = program[ip + 1]; // Tham số của lệnh
    let combo = getCombo(literal, a, b, c);

    if (instr == 0) {
      a = div(a, combo); // Chia a cho 2^combo
    }
    if (instr == 1) {
      b = BigInt(literal) ^ b; // XOR b với literal
    }
    if (instr == 2) {
      b = combo & 7n; // AND với 7 (lấy 3 bit cuối)
    }
    if (instr == 3 && a != 0) {
      ip = literal; // Nhảy đến vị trí literal nếu a khác 0
      continue;
    }
    if (instr == 4) {
      b = c ^ b; // XOR b với c
    }
    if (instr == 5) {
      p1.push(Number(combo & 7n)); // Thêm 3 bit cuối vào kết quả
    }
    if (instr == 6) {
      b = div(a, combo); // Chia a cho 2^combo, gán vào b
    }
    if (instr == 7) {
      c = div(a, combo); // Chia a cho 2^combo, gán vào c
    }
    ip += 2; // Tiến 2 bước (vì mỗi lệnh gồm 2 số)
  }
  return p1;
}

// Hàm so sánh phần cuối của 2 mảng
function compareTails(a, b, len) {
  let s = b.slice(b.length - len); // Lấy len phần tử cuối của b
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== a[i]) {
      return false;
    }
  }
  return true;
}

// Hàm tìm số tiếp theo bằng cách thử các chữ số từ 0-7
// currentDigit: vị trí đang xét
// solvedDigits: các chữ số đã tìm được
function findNextDigit(currentDigit, solvedDigits) {
  let foundDigits = solvedDigits * 8n; // Nhân 8 để dịch sang trái 3 bit
  for (let i = 0n; i < 8n; i++) {
    let candidate = foundDigits + i;
    let result = runMachine(candidate);
    // Kiểm tra xem kết quả có khớp với program không
    if (compareTails(result, program, currentDigit)) {
      console.log(
        currentDigit +
          " " +
          JSON.stringify(result) +
          " " +
          candidate.toString(8) +
          " " +
          candidate
      );
      if (currentDigit == program.length) {
        return candidate;
      }
      // Đệ quy tìm chữ số tiếp theo
      let ret = findNextDigit(currentDigit + 1, candidate);
      if (ret !== -1) {
        return ret;
      }
    }
  }
  return -1;
}

console.log("Part 1 " + findNextDigit(1, 0n));
console.log("Part 2 " + findNextDigit(1, 0n));
