const memo = new Map();

function getKey(x, n) {
    return `${x},${n}`;
}

// KHOAI PHẾT

// Quy hoạch động
// x: số hiện tại, n: số bước còn lại
function dp(x, n) {
    // Điều kiện dừng: khi hết bước
    if (n === 0) return 1;
    
    // Kiểm tra xem kết quả đã được tính chưa
    const key = getKey(x, n);
    if (memo.has(key)) return memo.get(key);
    
    let result;
    if (x === 0) {
        // Nếu x = 0, chuyển thành 1 và giảm số bước
        result = dp(1, n - 1);
    } else {
        const strX = x.toString();
        if (strX.length % 2 === 0) {
            // Nếu số chữ số chẵn, chia đôi thành 2 số
            const mid = Math.floor(strX.length / 2);
            const a = parseInt(strX.slice(0, mid));  // Nửa đầu
            const b = parseInt(strX.slice(mid));     // Nửa sau
            // Tổng kết quả của cả 2 nhánh
            result = dp(a, n - 1) + dp(b, n - 1);
        } else {
            // Nếu số chữ số lẻ, nhân với 2024
            result = dp(x * 2024, n - 1);
        }
    }

    // Lưu kết quả vào memo để tái sử dụng
    memo.set(key, result);
    return result;
}

const fs = require('fs');

const main = (part) => {
    try {
        const timeStart = performance.now();
        
    const input = fs.readFileSync('input11.txt', 'utf8');
    const numbers = input.trim().split(' ').map(Number);
    

    if (part === 1) {
        const sum = numbers.reduce((acc, x) => acc + dp(x, 25), 0);
        console.log(sum.toString());
    } else {
        const sum = numbers.reduce((acc, x) => acc + dp(x, 75), 0);
        console.log(sum.toString());
    }
    
    console.log(`Time taken: ${performance.now() - timeStart} milliseconds`);
    } catch (err) {
        console.error('Error:', err);
    }
}

main(1)
main(2)