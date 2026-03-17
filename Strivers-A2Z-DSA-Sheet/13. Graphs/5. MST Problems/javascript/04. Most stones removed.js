/*
Question:
Given n stones at integer coordinates, a stone can be removed if it shares row or column
with another stone. Return the largest number of stones that can be removed.

Approach:
- Use Disjoint Set to group stones sharing same row or column.
- Answer = total stones - number of connected components.

Time Complexity: O(n)
Space Complexity: O(n)
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
        if (uP === vP) return;
        if (this.size[uP] > this.size[vP]) {
            this.parent[vP] = uP;
            this.size[uP] += this.size[vP];
        } else {
            this.parent[uP] = vP;
            this.size[vP] += this.size[uP];
        }
    }

    countComponents(n) {
        let cnt = 0;
        for (let i = 0; i < n; i++) {
            if (this.parent[i] === i) cnt++;
        }
        return cnt;
    }
}

function removeStones(n, connections) {
    if (n - 1 > connections.length) return -1;

    let djs = new DisjointSet(n);
    for (let c of connections) {
        if (djs.findUPar(c[0]) !== djs.findUPar(c[1])) {
            djs.unionBySize(c[0], c[1]);
        }
    }

    return djs.countComponents(n) - 1;
}

