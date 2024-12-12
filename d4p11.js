const fs = require("fs");

const input = fs
  .readFileSync("input4.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const findXMAS = (input) => {
  const str = "XMAS".split("");
  let count = 0;

  let matches = [];

  input.forEach((r, y) => {
    r.forEach((c, x) => {
      if (c !== str[0]) return;
      // Forward
      let match = true;
      for (let i = 1; i < str.length; i++) {
        let nx = x + i;
        if (input[y][nx] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "f"]);

      if (match) count++;
      // Backwards
      match = true;
      for (let i = 1; i < str.length; i++) {
        let nx = x - i;
        if (input[y][nx] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "b"]);
      if (match) count++;
      // Up
      match = true;
      for (let i = 1; i < str.length; i++) {
        let ny = y - i;
        if (input[ny]?.[x] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) count++;
      // Down
      match = true;
      for (let i = 1; i < str.length; i++) {
        let ny = y + i;
        if (input[ny]?.[x] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "d"]);
      if (match) count++;
      // Diagonal Up Right
      match = true;
      for (let i = 1; i < str.length; i++) {
        let ny = y - i;
        let nx = x + i;
        if (input[ny]?.[nx] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "ur"]);
      if (match) count++;
      // Diagonal Up left
      match = true;
      for (let i = 1; i < str.length; i++) {
        let ny = y - i;
        let nx = x - i;
        if (input[ny]?.[nx] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "ul"]);
      if (match) count++;
      // Diagonal Down right
      match = true;
      for (let i = 1; i < str.length; i++) {
        let ny = y + i;
        let nx = x + i;
        if (input[ny]?.[nx] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "dr"]);
      if (match) count++;
      // Diagonal Down left
      match = true;
      for (let i = 1; i < str.length; i++) {
        let ny = y + i;
        let nx = x - i;
        if (input[ny]?.[nx] !== str[i]) {
          match = false;
          break;
        }
      }
      if (match) matches.push([x, y, "dl"]);
      if (match) count++;
    });
  });

  console.log(count);
};

findXMAS(input);
