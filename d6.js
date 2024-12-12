const fs = require("fs");
const input = fs.readFileSync("input6.txt", "utf8").split("\n");

function solve(inputs, part) {

  const startTime = performance.now();
  let DIRS = {
    0: [-1, 0],  // up
    1: [0, 1],   // right
    2: [1, 0],   // down
    3: [0, -1]   // left
  };

  // Find start position
  const y = inputs.findIndex(line => line?.includes('^'));
  const x = inputs[y].indexOf('^');
  const height = inputs.length;
  const width = inputs[0].length;

  // Part 1
  if (part === 1) {
    // Create a deep copy of inputs to modify
    let game = inputs.map(row => row.split(''));
    
    let pos = { x: y, y: x }; // Note: x,y are already found above
    let dir = 0;
    
    while (true) {
      if (!isInBounds(pos.x, pos.y)) break;
      
      // Mark visited position
      game[pos.x][pos.y] = 'X';
      
      // Turn right while hitting walls
      while (isInBounds(pos.x + DIRS[dir][0], pos.y + DIRS[dir][1]) && 
             inputs[pos.x + DIRS[dir][0]][pos.y + DIRS[dir][1]] === '#') {
        dir = (dir + 1) % 4;
      }
      
      // Move to next position
      pos.x += DIRS[dir][0];
      pos.y += DIRS[dir][1];
    }
    
    // Count visited positions
    let count = 0;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (game[i][j] === 'X') count++;
      }
    }
    
    return count;
  }

  // Part 2

  function isInBounds(x, y) {
    return x >= 0 && x < height && y >= 0 && y < width;
  }

  // First collect the original path
  function firstWalk(startX, startY) {
    const path = new Set();
    let x = startX;
    let y = startY;
    let dir = 0;

    while (true) {
      if (!isInBounds(x, y)) break;
      
      path.add(`${x},${y}`);

      // Turn right while hitting walls
      while (isInBounds(x + DIRS[dir][0], y + DIRS[dir][1]) && 
             inputs[x + DIRS[dir][0]][y + DIRS[dir][1]] === '#') {
        dir = (dir + 1) % 4;
      }

      x += DIRS[dir][0];
      y += DIRS[dir][1];
    }
    return path;
  }

  function checkLoop(startX, startY) {
    const visited = new Set();
    let x = startX;
    let y = startY;
    let dir = 0;

    while (true) {
      if (!isInBounds(x, y)) break;

      const state = `${x},${y},${dir}`;
      if (visited.has(state)) return true;
      visited.add(state);

      // Turn right while hitting walls
      while (isInBounds(x + DIRS[dir][0], y + DIRS[dir][1]) && 
             inputs[x + DIRS[dir][0]][y + DIRS[dir][1]] === '#') {
        dir = (dir + 1) % 4;
      }

      x += DIRS[dir][0];
      y += DIRS[dir][1];
    }
    return false;
  }

  let trappedCount = 0;
  
  if (part === 2) {
    const path = firstWalk(y, x);

    // Check each position in the original path
    for (const posStr of path) {
      const [checkY, checkX] = posStr.split(',').map(Number);
      if (inputs[checkY][checkX] === '.') {
        // Temporarily modify the position
        inputs[checkY] = inputs[checkY].substring(0, checkX) + '#' + 
                        inputs[checkY].substring(checkX + 1);
        
        if (checkLoop(y, x)) trappedCount++;
        
        // Restore the original position
        inputs[checkY] = inputs[checkY].substring(0, checkX) + '.' + 
                        inputs[checkY].substring(checkX + 1);
      }
    }
  }

  const endTime = performance.now();
  console.log(`Call took ${endTime - startTime} milliseconds`);

  return trappedCount;
}

console.log("Part 1:", solve(input, 1));
console.log("Part 2:", solve(input, 2));
