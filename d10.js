const fs = require("fs");
const d = fs.readFileSync("input10.txt", "utf8").trim().split("\n").map(b => b.split("").map(c => parseInt(c)))

// Khó VL, Comment chi tiết kẻo sau đọc lại éo hiểu gì

// Hàm tìm các bước tiếp theo có thể đi được
// Trả về mảng các vị trí [row, col] có giá trị bằng giá trị hiện tại + 1
function nextStep(row, col) {
    let here = d[row][col]
    // Nếu đã đến 9, không còn bước tiếp theo
    if (here == 9)
        return []
    let ret = []
    // Kiểm tra 4 hướng xung quanh (trên, dưới, trái, phải)
    // Chỉ đi được nếu giá trị ô tiếp theo = giá trị hiện tại + 1
    if (row > 0 && d[row - 1][col] == here + 1) {
        ret.push([row - 1, col])  // Kiểm tra ô phía trên
    }
    if (row < d.length - 1 && d[row + 1][col] == here + 1) {
        ret.push([row + 1, col])  // Kiểm tra ô phía dưới
    }
    if (col > 0 && d[row][col - 1] == here + 1) {
        ret.push([row, col - 1])  // Kiểm tra ô bên trái
    }
    if (col < d.length - 1 && d[row][col + 1] == here + 1) {
        ret.push([row, col + 1])  // Kiểm tra ô bên phải
    }
    return ret
}

// Tìm tất cả các điểm xuất phát (có giá trị = 0)
let head = []
for (let row = 0; row < d.length; row++) {
    for (let col = 0; col < d[row].length; col++) {
        if (d[row][col] == 0)
            head.push([row, col])
    }
}

function getKey(row, col) {
    return `${row},${col}`
}

function countTrail(row, col) {
    let score = {}
    let next = [[row, col, getKey(row, col)]]
    while (next.length > 0) {
        let [nrow, ncol, pastPath] = next.pop()
        pastPath = pastPath + "-" + getKey(nrow, ncol)
        if (d[nrow][ncol] == 9) {
            score[pastPath] = getKey(nrow, ncol)
        }
        let ns = nextStep(nrow, ncol)
        for (let i = 0; i < ns.length; i++) {
            next.push([ns[i][0], ns[i][1], pastPath])
        }
    }
    return score
}

const solve = (part) => {
    const startTime = performance.now();
    let result = 0;
    for (let i = 0; i < head.length; i++) {
        let trails = countTrail(head[i][0], head[i][1])
        if (part === 1) {
            result += new Set(Object.values(trails)).size
        } else {
            result += Object.keys(trails).length
        }
    }
    const endTime = performance.now();
    console.log(`Call took ${endTime - startTime} milliseconds`);
    return result
}

console.log("Part 1:", solve(1))
console.log("Part 2:", solve(2))
