const fs = require('fs')

const input = fs.readFileSync('input5.txt', 'utf8').split('\r\n')

function solve(inputs, part) {
    const [rules, updates] = inputs.join('\n').split('\n\n').map(p => p.split('\n'));


    const befores = new Map();
    for (let rule of rules) {
        const [l, r] = rule.split('|').map(Number);
        befores.set(l, (befores.get(l) ?? new Set()).add(r));
    }

    let answer = 0;
    for (let update of updates) {
        const nums = update.split(',').map(Number);
        
        const ordered = nums.toSorted((a, b) => befores.get(a)?.has(b) ? -1 : 1);
        
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
