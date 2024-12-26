const fs = require('fs');
const file = fs.readFileSync(`input19.txt`, 'utf8');

let towels = file.trim().split("\n\n")[0].split(", ")
let designs = file.trim().split("\n\n")[1].split("\n")

let cache = {}

function possible(design) {
    if (design.length == 0)
        return 1
    if (cache[design] !== undefined)
        return cache[design]
    let options = 0
    for (let towel of towels) {
        if (design.endsWith(towel)) {
            options += possible(design.slice(0, design.length - towel.length))
        }
    }
    cache[design] = options
    return options
}

let part1 = 0
let part2 = 0
for (let design of designs) {
    let options = possible(design);
    if (options > 0)
        part1++
    part2 += options
}

console.log("Part 1 " + part1)
console.log("Part 2 " + part2)