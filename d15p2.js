const fs = require("fs");

function addt(x, y) {
  if (x.length === 2) {
    // console.log('x', x, y)
    return [x[0] + y[0], x[1] + y[1]];
  }
  
  return x.map((val, i) => val + y[i]);
}

const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const D = [">", "<", "v", "^"];

function left(pos) {
  return [pos[0], pos[1] - 1];
}

function right(pos) {
  return [pos[0], pos[1] + 1];
}

function solve(input) {
  const parts = input.trim().split("\n\n");
  const room = parts[0].split("\n");
  const movesStr = parts[1].replace(/\n/g, "");
  const moves = [...movesStr].map((m) => DIRS[D.indexOf(m)]);

  const walls = new Set();
  let boxes = new Set();
  let robot;

  // Đọc từng ký tự và lưu vào các Set tương ứng
  // Chú ý: Mỗi ô được nhân đôi chiều rộng (j2 = j*2)
  for (let i = 0; i < room.length; i++) {
    for (let j = 0; j < room[i].length; j++) {
      const ch = room[i][j];
      const j2 = j * 2;
      if (ch === "#") {
        walls.add(`${i},${j2}`);
        walls.add(`${i},${j2 + 1}`);
      }
      if (ch === "O") {
        boxes.add(`${i},${j2}`);
      }
      if (ch === "@") {
        robot = [i, j2];
      }
    }
  }

  function push(box, d) {
    // Kiểm tra có thể đẩy hộp theo hướng d không
    // Xử lý các trường hợp đẩy hộp:
    // - Đẩy lên/xuống
    // - Đẩy sang trái/phải
    // - Xử lý đẩy nhiều hộp cùng lúc

    // Trả về null nếu không thể đẩy
    // Trả về true nếu đẩy thành công

    const [boxX, boxY] = box.split(",").map(Number);
    const boxArr = [boxX, boxY];

    if (!boxes.has(`${boxX},${boxY}`)) return null;

    const nxt = addt(boxArr, d);
    const nxtStr = nxt.join(",");

    if (walls.has(nxtStr) || walls.has(right(nxt).join(","))) {
      return null;
    }

    if (d[0]) {
      // Di chuyển lên/xuống
      if (boxes.has(nxtStr)) {
        const r = push(nxtStr, d);
        if (r === null) return null;
      }
      if (boxes.has(left(nxt).join(","))) {
        const r = push(left(nxt).join(","), d);
        if (r === null) return null;
      }
      if (boxes.has(right(nxt).join(","))) {
        const r = push(right(nxt).join(","), d);
        if (r === null) return null;
      }
    }

    if (d[1] === 1) {
      // Đẩy sang phải
      if (boxes.has(right(nxt).join(","))) {
        const r = push(right(nxt).join(","), d);
        if (r === null) return null;
      }
    }

    if (d[1] === -1) {
      // Đẩy sang trái
      if (boxes.has(left(nxt).join(","))) {
        const r = push(left(nxt).join(","), d);
        if (r === null) return null;
      }
    }

    boxes.delete(box);
    boxes.add(nxtStr);
    return true;
  }

  // Xử lý các bước di chuyển
  for (const move of moves) {
    // Tính vị trí mới của robot
    // Kiểm tra va chạm với tường
    // Xử lý đẩy hộp nếu gặp
    // Cập nhật vị trí robot

    const next = addt(robot, move);
    const nextStr = next.join(",");
    // console.log({next, nextStr})

    if (walls.has(nextStr)) continue;

    if (boxes.has(nextStr)) {
      const boxesCopy = new Set(boxes);
      console.log('boxesCopy', boxesCopy)
      const r = push(nextStr, move);
      if (r === null) {
        boxes = boxesCopy;
        continue;
      }
    } else if (boxes.has(left(next).join(","))) {
      const boxesCopy = new Set(boxes);
      const r = push(left(next).join(","), move);
      if (r === null) {
        boxes = boxesCopy;
        continue;
      }
    }

    robot = next;
  }

  // Tính tổng điểm
  // Tính tổng điểm dựa trên công thức:
  // điểm = 100 * x + y
  // với x,y là tọa độ của mỗi hộp
  let c = 0;
  for (const box of boxes) {
    const [x, y] = box.split(",").map(Number);
    c += 100 * x + y;
  }
  return c;
}

const input = fs.readFileSync("input8.txt", "utf8");
console.log(solve(input));
