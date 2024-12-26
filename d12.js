const fs = require("fs");
const input = fs.readFileSync("input12.txt", "utf8").split("\n");

// Đề nay khoai vl

function posToString([r, c]) {
  return `${r},${c}`;
}

function perimeter(points) {
  const pointSet = new Set(points.map(posToString));
  let ans = 0;

  for (const [r, c] of points) {
    const neighbors = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (const neighbor of neighbors) {
      if (!pointSet.has(posToString(neighbor))) {
        ans++;
      }
    }
  }
  return ans;
}

function sides(points) {
  // Tạo một Set chứa tất cả các điểm trong vùng dưới dạng chuỗi "row,col"
  const pointSet = new Set(points.map(posToString));
  // Set này sẽ lưu tất cả các cạnh dưới dạng "x1,y1,x2,y2"
  // trong đó (x1,y1) là điểm ngoài vùng và (x2,y2) là điểm trong vùng
  const perim = new Set();

  // Duyệt qua từng điểm trong vùng
  for (const [r, c] of points) {
    const neighbors = [
      [r + 1, c], // Dưới
      [r - 1, c], // Trên
      [r, c + 1], // Phải
      [r, c - 1], // Trái
    ];

    // Kiểm tra từng pos
    for (const [nr, nc] of neighbors) {
      // Nếu pos không thuộc vùng (không có trong pointSet)
      if (!pointSet.has(posToString([nr, nc]))) {
        // Thêm cạnh mới vào perim
        // Cạnh được lưu dưới dạng "nr,nc,r,c" với:
        // - nr,nc: tọa độ điểm lân cận (ngoài vùng)
        // - r,c: tọa độ điểm gốc (trong vùng)
        perim.add(`${nr},${nc},${r},${c}`);
      }
    }
  }

  let ans = 0;

  // Duyệt qua từng cạnh trong perim
  for (const edge of perim) {
    // Tách chuỗi cạnh thành tọa độ của 2 điểm
    const [x, y, ox, oy] = edge.split(",").map(Number);

    // Kiểm tra 2 trường hợp cạnh song song:
    // 1. Cạnh song song theo chiều ngang (cùng y)
    if (perim.has(`${x - 1},${y},${ox - 1},${oy}`)) continue;

    // 2. Cạnh song song theo chiều dọc (cùng x)
    if (perim.has(`${x},${y - 1},${ox},${oy - 1}`)) continue;

    // Nếu không có cạnh song song nào → đây là cạnh độc lập
    ans++;
  }

  // Trả về tổng số cạnh độc lập
  return ans;
}

function findRegion(garden, pos, seen) {
  seen.add(posToString(pos));
  const points = [pos];

  for (const [r, c] of points) {
    const neighbors = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (const [nr, nc] of neighbors) {
      if (
        nr >= 0 &&
        nr < garden.length &&
        nc >= 0 &&
        nc < garden[0].length &&
        garden[nr][nc] === garden[pos[0]][pos[1]] &&
        !seen.has(posToString([nr, nc]))
      ) {
        points.push([nr, nc]);
        seen.add(posToString([nr, nc]));
      }
    }
  }

  return points;
}

function solver(garden, part) {
  const startTime = performance.now();
  let price = 0;
  const seen = new Set();

  for (let r = 0; r < garden.length; r++) {
    for (let c = 0; c < garden[r].length; c++) {
      const pos = [r, c];
      if (!seen.has(posToString(pos))) {
        const region = findRegion(garden, pos, seen);
        const area = region.length;
        const calValue = part === 1 ? perimeter(region) : sides(region);
        price += area * calValue;
      }
    }
  }
  const endTime = performance.now();
  console.log(`Time taken: ${endTime - startTime} milliseconds`);
  return price;
}

console.log("Part 1:", solver(input, 1));
console.log("Part 2:", solver(input, 2));
