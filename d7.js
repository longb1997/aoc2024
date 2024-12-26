const fs = require("fs");
const input = fs.readFileSync("input7.txt", "utf8");

function parseInput(str) {
    const [target, values] = str.split(":");
    return {
        target: parseInt(target),
        values: values.trim().split(" ").map(Number)
    };
}

// Tính toán tất cả các tổng có thể từ phép cộng và nhân
function calculateSums(numbers, allowConcat = false) {
    if (numbers.length === 1) return [numbers[0]];
    
    const current = numbers.pop();
    const results = calculateSums(numbers, allowConcat);
    const sums = [];

    for (const result of results) {
        sums.push(current + result);
        sums.push(current * result);
        if (allowConcat) {
            sums.push(parseInt(`${result}${current}`));
        }
    }

    return sums;
}

const cards = input.trim().split("\n").map(parseInput);
let [part1, part2] = [0, 0];

for (const {target, values} of cards) {
    // Part 1: Chỉ tính phép cộng và nhân
    const sums1 = calculateSums(structuredClone(values));
    if (sums1.includes(target)) part1 += target;
    
    // Part 2: Thêm phép nối chuỗi số
    const sums2 = calculateSums(structuredClone(values), true);
    if (sums2.includes(target)) part2 += target;
}

console.log(part1);
console.log(part2);