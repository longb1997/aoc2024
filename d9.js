const fs = require("fs");

// Khó VL

// Đọc và parse input
const input = fs.readFileSync("input9.txt", "utf8")
  .trim()
  .split("")
  .map(Number);

// Hàm tạo disk ban đầu
function createDisk(input) {
  const disk = [];
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      // File ID
      for (let j = 0; j < input[i]; j++) {
        disk.push(i / 2);
      }
    } else {
      // Khoảng trống
      for (let j = 0; j < input[i]; j++) {
        disk.push(-1); 
      }
    }
  }
  return disk;
}

// Part 1: Di chuyển file từ phải sang trái
function solvePart1(disk) {
  const diskCopy = [...disk];
  
  for (let left = 0; left < diskCopy.length; left++) {
    if (diskCopy[left] !== -1) continue;

    for (let right = diskCopy.length - 1; right >= 0; right--) {
      if (left >= right) break;
      if (diskCopy[right] === -1) continue;
      
      diskCopy[left] = diskCopy[right];
      diskCopy[right] = -1;
      break;
    }
  }

  return calculateScore(diskCopy);
}

// Part 2: Di chuyển file liên tiếp từ phải sang trái
function solvePart2(disk) {
  const diskCopy = [...disk];
  const moved = new Set();

  for (let right = diskCopy.length - 1; right > 0; right--) {
    const fileId = diskCopy[right];
    if (fileId === -1 || moved.has(fileId)) continue;

    // Tìm kích thước file
    let fileStart = right;
    while (diskCopy[fileStart] === fileId && fileStart > 0) {
      fileStart--;
    }
    const fileSize = right - fileStart;

    // Tìm vị trí trống phù hợp bên trái
    let left = 0;
    let fits = false;
    
    while (left < right) {
      if (diskCopy[left] !== -1) {
        left++;
        continue;
      }

      fits = true;
      for (let i = 0; i < fileSize; i++) {
        if (diskCopy[left + i] !== -1) {
          fits = false;
          left += i;
          break;
        }
      }
      
      if (fits) break;
      left++;
    }

    // Di chuyển file nếu tìm được vị trí phù hợp
    if (fits) {
      for (let i = 0; i < fileSize; i++) {
        diskCopy[left + i] = fileId;
        diskCopy[right - i] = -1;
      }
      moved.add(fileId);
    }
    right = fileStart + 1;
  }

  return calculateScore(diskCopy);
}

// Tính điểm dựa trên vị trí các file
function calculateScore(disk) {
  return disk.reduce((score, fileId, index) => {
    return fileId !== -1 ? score + fileId * index : score;
  }, 0);
}

const disk = createDisk(input);
console.log("Part 1:", solvePart1(disk));
console.log("Part 2:", solvePart2(disk));
