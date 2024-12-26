const fs = require("fs");

const MAX_BITS = 100;
const PREFIX_UNDER_10 = "z0";
const PREFIX_OVER_10 = "z";

// PART 2 ĐỌC ÉO HIỂU GÌ =)), THÔI LƯỜI QUÁ KHÔNG LÀM NỮA

const file = fs.readFileSync("input24.txt", "utf8");
const [inputSection, rulesSection] = file.trim().split("\n\n");

const incoming = Object.fromEntries(
  inputSection.split("\n").map((line) => {
    const [key, value] = line.split(": ");
    return [key, parseInt(value)];
  })
);

const rules = rulesSection.split("\n").map((line, index) => {
  const [operation, result] = line.split(" -> ");
  const [param1, operator, param2] = operation.split(" ");
  return {
    par1: param1,
    op: operator,
    par2: param2,
    to: result,
    id: index,
  };
});

// Kiểm tra xem đã có đủ tất cả các giá trị Z chưa
function haveAllZs(values) {
  return rules.every((rule) => rule.to in values);
}

// Part 1
function solvePart1(values, rules) {
  const workingValues = { ...values };

  // Lặp cho đến khi có đủ các giá trị Z
  while (!haveAllZs(workingValues)) {
    for (const { par1, par2, op, to } of rules) {
      // Bỏ qua nếu thiếu tham số đầu vào
      if (!(par1 in workingValues) || !(par2 in workingValues)) continue;

      // Thực hiện phép toán bit tương ứng
      const a = workingValues[par1];
      const b = workingValues[par2];
      let result = 0;

      if (op === "AND") result = a & b;
      if (op === "OR") result = a | b;
      if (op === "XOR") result = a ^ b;

      workingValues[to] = result;
    }
  }

  // Tạo chuỗi kết quả từ các giá trị Z
  let p1 = "";
  for (let i = 0; i < MAX_BITS; i++) {
    const key = i < 10 ? `${PREFIX_UNDER_10}${i}` : `${PREFIX_OVER_10}${i}`;
    if (!(key in workingValues)) break;
    p1 += workingValues[key];
  }

  // Đảo ngược chuỗi và chuyển sang số thập phân
  return parseInt(stringReverse(p1), 2);
}

function stringReverse(s) {
  return s.split("").reverse().join("");
}

console.log(`Part 1: ${solvePart1(incoming, rules)}`);
