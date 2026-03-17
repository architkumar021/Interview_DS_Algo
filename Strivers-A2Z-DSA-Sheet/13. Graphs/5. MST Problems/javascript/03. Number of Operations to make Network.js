/*
Question:
Given n computers and connections, return the minimum number of operations to make all
computers connected. Return -1 if impossible.

Approach:
- If connections < n-1, impossible.
- Use Disjoint Set to count connected components. Answer = components - 1.

Time Complexity: O(E + V)
Space Complexity: O(V)
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

    disconnected(n) {
        let cnt = 0;
        for (let i = 0; i < n; i++) {
            if (this.parent[i] === i) cnt++;
        }
        return cnt;
    }
}

function makeConnected(n, connections) {
    if (n - 1 > connections.length) return -1;

    let djs = new DisjointSet(n);
    for (let c of connections) {
        if (djs.findUPar(c[0]) !== djs.findUPar(c[1])) {
            djs.unionBySize(c[0], c[1]);
        }
    }

    return djs.disconnected(n) - 1;
}

