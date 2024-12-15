const fs = require("fs");
const input = fs.readFileSync("input14.txt", "utf8")

function solve(inputs, part) {
    // Mỗi robot có dạng [x, y, vx, vy] - vị trí và vận tốc
    const robots = inputs.split('\n').map(e => {
        const regex = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/;
        const match = regex.exec(e);
        return [+match[1], +match[2], +match[3], +match[4]];
    });

    const gridSize = [101, 103];


    if (part === 1) {

        // Mảng đếm số robot trong 4 phần tư của lưới
        const quads = [0, 0, 0, 0];
        // Tìm điểm giữa của lưới để chia 4 phần
        const midpoints = [Math.floor(gridSize[0] / 2), Math.floor(gridSize[1] / 2)];

        // Mô phỏng vị trí của mỗi robot sau 100 bước
        robots.forEach(e => {
            // Tính vị trí mới = vị trí cũ + vận tốc * 100
            let x = (e[0] + e[2] * 100) % gridSize[0];
            if (x < 0) x += gridSize[0]; // Xử lý số âm
            
            let y = (e[1] + e[3] * 100) % gridSize[1];
            if (y < 0) y += gridSize[1];

            // Phân loại robot vào 4 phần tư dựa trên midpoint
            if (x < midpoints[0] && y < midpoints[1]) quads[0]++;
            if (x < midpoints[0] && y > midpoints[1]) quads[1]++;
            if (x > midpoints[0] && y < midpoints[1]) quads[2]++;
            if (x > midpoints[0] && y > midpoints[1]) quads[3]++;
        });

        // Trả về tích số robot trong 4 phần
        return quads.reduce((p, v) => p * v);
    }

    if (part === 2) {
        for (let i = 0; i < 999999; i++) {
            const taken = new Set(); // Lưu các vị trí đã có robot
            let valid = true;

            // Di chuyển từng robot
            robots.forEach(e => {
                e[0] += e[2];
                e[0] %= gridSize[0];
                if (e[0] < 0) e[0] += gridSize[0];

                e[1] += e[3];
                e[1] %= gridSize[1];
                if (e[1] < 0) e[1] += gridSize[1];

                // Kiểm tra va chạm
                const pos = [e[0], e[1]].join('x');
                if (taken.has(pos)) {
                    valid = false; // Có va chạm
                }
                taken.add(pos);
            });

            // Nếu không có va chạm, trả về số bước
            if (valid) {
                return i + 1;
            }
        }
        return false;
    }
}

console.log("Part 1:", solve(input, 1));
console.log("Part 2:", solve(input, 2));