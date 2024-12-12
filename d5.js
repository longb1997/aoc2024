const fs = require('fs')

const input = fs.readFileSync('input5.txt', 'utf8').split('\r\n')

function solve(inputs, part) {
    // Tách input thành 2 phần: rules (quy tắc) và updates (dãy số cần kiểm tra)
    // rules: chứa các quy tắc về thứ tự (vd: "1|2" nghĩa là 1 phải đứng trước 2)
    // updates: chứa các dãy số cần kiểm tra thứ tự
    const [rules, updates] = inputs.join('\n').split('\n\n').map(p => p.split('\n'));

    // Tạo Map để lưu các quy tắc
    // Key: số bên trái của quy tắc
    // Value: Set chứa các số phải đứng sau số key
    const befores = new Map();
    for (let rule of rules) {
        const [l, r] = rule.split('|').map(Number);
        befores.set(l, (befores.get(l) ?? new Set()).add(r));
    }

    let answer = 0;
    for (let update of updates) {
        // Chuyển chuỗi số thành mảng số
        const nums = update.split(',').map(Number);
        
        // Sắp xếp lại mảng theo quy tắc
        // Nếu a phải đứng trước b theo quy tắc -> return -1
        const ordered = nums.toSorted((a, b) => befores.get(a)?.has(b) ? -1 : 1);
        
        // Kiểm tra xem dãy ban đầu có đúng thứ tự không
        const inOrder = nums.every((n, i) => n === ordered[i]);
        
        // Tính điểm:
        // Part 1: Nếu dãy đúng thứ tự -> lấy số ở giữa dãy ban đầu
        // Part 2: Nếu dãy sai thứ tự -> lấy số ở giữa dãy đã sắp xếp
        // Ngược lại -> cộng 0
        answer += part === 1 && inOrder
            ? nums[Math.floor(nums.length / 2)]
            : part === 2 && !inOrder
                ? ordered[Math.floor(ordered.length / 2)]
                : 0;
    }
    return answer;
}

console.log(solve(input, 1))
console.log(solve(input, 2))
