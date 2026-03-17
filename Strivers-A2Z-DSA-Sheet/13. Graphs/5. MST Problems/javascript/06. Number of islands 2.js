/*
Question:
Given an n x m grid (initially all water), process operations that turn sea cells to land.
Return the number of islands after each operation.

Approach:
- Use Disjoint Set. For each new land cell, check 4 neighbors.
- If neighbor is land and in different component, union and decrement island count.

Time Complexity: O(k * α(n*m))
Space Complexity: O(n * m)
*/

class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
    }

    findUPar(node) {
        if (this.parent[node] === node) return node;
        return this.parent[node] = this.findUPar(this.parent[node]);
    }

    unionSize(u, v) {
        let up = this.findUPar(u), vp = this.findUPar(v);
        if (this.size[up] > this.size[vp]) {
            this.parent[vp] = up;
            this.size[up] += this.size[vp];
        } else {
            this.parent[up] = vp;
            this.size[vp] += this.size[up];
        }
    }
}

function isLand(x, y, grid) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 1;
}

function numOfIslands(n, m, operators) {
    let ans = [];
    let islands = 0;
    let djs = new DisjointSet(n * m);
    let grid = Array.from({ length: n }, () => new Array(m).fill(0));

    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    for (let op of operators) {
        let [x, y] = op;
        if (grid[x][y] !== 1) {
            grid[x][y] = 1;
            islands++;
            let id = x * m + y;
            for (let i = 0; i < 4; i++) {
                let nx = x + dr[i], ny = y + dc[i];
                if (isLand(nx, ny, grid)) {
                    let nid = nx * m + ny;
                    if (djs.findUPar(id) !== djs.findUPar(nid)) {
                        djs.unionSize(id, nid);
                        islands--;
                    }
                }
            }
        }
        ans.push(islands);
    }
    return ans;
}

