const fs = require("fs");

const input = fs
  .readFileSync("input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

// Tìm các mẫu chữ "XMAS" theo đường chéo
const findXMAS = (input) => {
  let count = 0;

  // Duyệt qua từng ô trong mảng 2 chiều
  input.forEach((row, index) => {
    row.forEach((col, index2) => {
      // Chỉ xét các ô chứa chữ 'A'
      if (col !== "A") return;
      let localMatches = 0;

      // Kiểm tra 4 hướng đường chéo có thể tạo thành mẫu "AMS":
      // A là điểm trung tâm, M và S nằm ở 2 đầu đường chéo

      // Kiểm tra đường chéo: A ở giữa, M bên dưới trái, S bên trên phải
      if (
        input[index + 1]?.[index2 - 1] === "M" &&
        input[index - 1]?.[index2 + 1] === "S"
      )
        localMatches++;

      // Kiểm tra đường chéo: A ở giữa, M bên trên trái, S bên dưới phải
      if (
        input[index + 1]?.[index2 + 1] === "M" &&
        input[index - 1]?.[index2 - 1] === "S"
      )
        localMatches++;

      // Kiểm tra đường chéo: A ở giữa, M bên dưới trái, S bên trên phải
      if (
        input[index - 1]?.[index2 - 1] === "M" &&
        input[index + 1]?.[index2 + 1] === "S"
      )
        localMatches++;

      // Kiểm tra đường chéo: A ở giữa, M bên trên trái, S bên dưới phải
      if (
        input[index - 1]?.[index2 + 1] === "M" &&
        input[index + 1]?.[index2 - 1] === "S"
      )
        localMatches++;

      if (localMatches >= 2) count++;
    });
  });

  return count;
};

const xmasCount = findXMAS(input);
console.log(xmasCount);
