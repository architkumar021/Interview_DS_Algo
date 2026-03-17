/*
Question:
Given an n x n binary matrix grid, change at most one 0 to 1.
Return the size of the largest island after the operation.

Approach:
- Use Disjoint Set to connect all 1-cells into islands.
- For each 0-cell, check the unique neighboring island sizes and compute potential island size.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
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

    unionBySize(u, v) {
        let uP = this.findUPar(u), vP = this.findUPar(v);
        if (this.size[uP] > this.size[vP]) {
            this.parent[vP] = uP;
            this.size[uP] += this.size[vP];
        } else {
            this.parent[uP] = vP;
            this.size[vP] += this.size[uP];
        }
    }
}

function isLand(i, j, grid) {
    return i >= 0 && i < grid.length && j >= 0 && j < grid.length && grid[i][j] === 1;
}

function largestIsland(grid) {
    let n = grid.length;
    let dr = [1, -1, 0, 0];
    let dc = [0, 0, 1, -1];
    let djs = new DisjointSet(n * n);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                let id = i * n + j;
                for (let d = 0; d < 4; d++) {
                    let ni = i + dr[d], nj = j + dc[d];
                    if (isLand(ni, nj, grid)) {
                        let nid = ni * n + nj;
                        if (djs.findUPar(id) !== djs.findUPar(nid)) {
                            djs.unionBySize(id, nid);
                        }
                    }
                }
            }
        }
    }

    let ans = -Infinity;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                let st = new Set();
                for (let d = 0; d < 4; d++) {
                    let ni = i + dr[d], nj = j + dc[d];
                    if (isLand(ni, nj, grid)) {
                        st.add(djs.findUPar(ni * n + nj));
                    }
                }
                let siz = 0;
                for (let u of st) siz += djs.size[u];
                ans = Math.max(ans, siz + 1);
            }
        }
    }

    for (let cellNo = 0; cellNo < n * n; cellNo++) {
        ans = Math.max(ans, djs.size[djs.findUPar(cellNo)]);
    }
    return ans;
}

