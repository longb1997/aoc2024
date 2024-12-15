const fs = require("fs");
const input = fs.readFileSync("input15.txt", "utf8")

function simulateWarehouse(warehouse, moves) {
        // Chuyển đổi warehouse thành mảng 2 chiều
    const grid = warehouse.map(row => row.split(''));
    const rows = grid.length;
    const cols = rows > 0 ? grid[0].length : 0;

        // Tìm vị trí ban đầu của robot (@)

    let robotRow = -1, robotCol = -1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '@') {
                robotRow = r;
                robotCol = c;
                break;
            }
        }
        if (robotRow !== -1) break;
    }

    const DIR = {
        '^': [-1, 0],
        'v': [1, 0],
        '<': [0, -1],
        '>': [0, 1]
    };

    function inBounds(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }

    // Xử lý từng bước di chuyển
    for (const move of moves) {
        const [dr, dc] = DIR[move] || [0, 0];
        const nextR = robotRow + dr;
        const nextC = robotCol + dc;

                // Kiểm tra nếu đi ra ngoài hoặc gặp tường
        if (!inBounds(nextR, nextC) || grid[nextR][nextC] === '#') {
            continue;
        }

        if (grid[nextR][nextC] === '.') {
            // Di chuyển robot vào ô trống
            grid[robotRow][robotCol] = '.';
            grid[nextR][nextC] = '@';
            robotRow = nextR;
            robotCol = nextC;
        } else if (grid[nextR][nextC] === 'O') {
            // Xử lý đẩy hộp
            let boxPositions = [];
            let curR = nextR;
            let curC = nextC;
            let canPush = true;
            let finalEmptyR, finalEmptyC;

                        // Kiểm tra chuỗi hộp có thể đẩy được không
            while (true) {
                if (!inBounds(curR, curC) || grid[curR][curC] === '#') {
                    canPush = false;
                    break;
                }
                if (grid[curR][curC] === 'O') {
                    boxPositions.push([curR, curC]);
                    curR += dr;
                    curC += dc;
                } else {
                    if (grid[curR][curC] === '.') {
                        finalEmptyR = curR;
                        finalEmptyC = curC;
                        break;
                    } else {
                        canPush = false;
                        break;
                    }
                }
            }

            if (canPush && boxPositions.length > 0) {
                grid[robotRow][robotCol] = '.';
                boxPositions.reverse();
                grid[finalEmptyR][finalEmptyC] = 'O';
                // Di chuyển các hộp

                for (let i = 0; i < boxPositions.length - 1; i++) {
                    const [rFrom, cFrom] = boxPositions[i];
                    const rTo = rFrom + dr;
                    const cTo = cFrom + dc;
                    grid[rTo][cTo] = 'O';
                }
                // Xử lý hộp đầu tiên

                const [firstBoxR, firstBoxC] = boxPositions[boxPositions.length - 1];
                grid[firstBoxR][firstBoxC] = '.';

                // Di chuyển robot

                grid[nextR][nextC] = '@';
                robotRow = nextR;
                robotCol = nextC;
            }
        }
    }

    // Tính tổng tọa độ GPS của các hộp
    let totalSum = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 'O') {
                totalSum += 100 * r + c;
            }
        }
    }

    return totalSum;
}

function solve(inputs, part) {
    const warehouseMap = inputs.split("\n");
    const moves = inputs.split("\n").join("");
    return simulateWarehouse(warehouseMap, moves);
}

console.log(solve(input, 1)) 