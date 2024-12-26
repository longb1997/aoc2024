const fs = require('fs');

function parseInput(filename) {
    const file = fs.readFileSync(filename, 'utf8');
    return file.trim().split("\n").map(line => line.split("-"));
}

// Xây dựng graph từ connections
function buildGraph(connections) {
    const graph = {};
    for (const [from, to] of connections) {
        graph[from] = graph[from] || [];
        graph[to] = graph[to] || [];
        graph[from].push(to);
        graph[to].push(from);
    }
    return graph;
}

// Tìm các triple hợp lệ (3 node kết nối với nhau)
function findValidTriples(graph) {
    const validTriples = {};
    
    for (const node of Object.keys(graph)) {
        const neighbors = graph[node];
        
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = i; j < neighbors.length; j++) {
                if (graph[neighbors[i]].includes(neighbors[j])) {
                    const triple = [node, neighbors[i], neighbors[j]].sort();
                    const key = triple.join("-");
                    
                    if (triple.some(node => node[0] === "t")) {
                        validTriples[key] = true;
                    }
                }
            }
        }
    }
    
    return validTriples;
}

// Tìm thành phần liên thông lớn nhất
function findLargestConnectedComponent(graph) {
    let maxSize = 0;
    let maxComponent = "";
    
    for (const startNode of Object.keys(graph)) {
        const component = findConnectedNodes(graph, startNode);
        
        if (component.length > maxSize) {
            maxSize = component.length;
            maxComponent = component.sort().join(",");
        }
    }
    
    return { size: maxSize, nodes: maxComponent };
}

// Tìm các node được kết nối
function findConnectedNodes(graph, startNode) {
    const connected = [];
    const toCheck = [startNode];
    
    while (toCheck.length > 0) {
        const current = toCheck.pop();
        
        if (connected.includes(current)) continue;
        
        // Kiểm tra xem node hiện tại có kết nối với tất cả các node đã có không
        const isFullyConnected = connected.every(node => 
            graph[current].includes(node)
        );
        
        if (!isFullyConnected) continue;
        
        connected.push(current);
        
        // Thêm các node hàng xóm vào danh sách cần kiểm tra
        for (const neighbor of graph[current]) {
            if (!connected.includes(neighbor)) {
                toCheck.push(neighbor);
            }
        }
    }
    
    return connected;
}

function main() {
    const connections = parseInput('input23.txt');
    const graph = buildGraph(connections);
    
    // Part 1
    const validTriples = findValidTriples(graph);
    console.log("Part 1:", Object.keys(validTriples).length);
    
    // Part 2
    const largestComponent = findLargestConnectedComponent(graph);
    console.log("Part 2:", largestComponent.size, 
                ", result:", largestComponent.nodes);
}

main();