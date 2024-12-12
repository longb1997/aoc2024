// Sử dụng Map để lưu trữ kết quả đã tính (memoization)
const memo = new Map();

// Tạo key duy nhất cho mỗi cặp (x,n) để lưu vào memo
function getKey(x, n) {
    return `${x},${n}`;
}

function dp(x, n) {
    // Case1: khi hết bước (n=0), trả về 1
    if (n === 0) return 1;
    
    // Kiểm tra xem kết quả đã được tính trước đó chưa
    const key = getKey(x, n);
    if (memo.has(key)) return memo.get(key);
    
    // Trường hợp x = 0: chuyển thành 1 và giảm n đi 1
    if (x === 0) {
        const result = dp(1, n - 1);
        memo.set(key, result);
        return result;
    }
    
    const strX = x.toString();
    // Trường hợp số chẵn số chữ số: chia thành 2 nửa bằng nhau
    if (strX.length % 2 === 0) {
        const mid = Math.floor(strX.length / 2);
        // Tách thành 2 số a và b
        const a = parseInt(strX.slice(0, mid));
        const b = parseInt(strX.slice(mid));
        // Tính tổng kết quả của việc xử lý từng nửa
        const result = dp(a, n - 1) + dp(b, n - 1);
        memo.set(key, result);
        return result;
    } else {
        // Trường hợp số lẻ số chữ số: nhân với 2024
        const result = dp(x * 2024, n - 1);
        memo.set(key, result);
        return result;
    }
}

const fs = require('fs');

try {
    const timeStart = performance.now();
    // Đọc dữ liệu từ file input
    const input = fs.readFileSync('input11.txt', 'utf8');
    // Chuyển đổi input thành mảng các số
    const numbers = input.trim().split(' ').map(x => parseInt(x));
    
    // Tính tổng kết quả cho mỗi số trong input
    let sum = 0;
    for (const x of numbers) {
        sum += dp(x, 75);
    }
    
    console.log(sum.toString());
    const timeEnd = performance.now();
    console.log(`Time taken: ${timeEnd - timeStart} milliseconds`);
} catch (err) {
    console.error('error:', err);
}