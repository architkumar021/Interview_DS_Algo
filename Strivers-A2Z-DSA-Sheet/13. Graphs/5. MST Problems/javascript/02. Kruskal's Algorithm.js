/*
Question:
Given a weighted, undirected and connected graph, find the sum of weights of
the edges of the Minimum Spanning Tree using Kruskal's algorithm.

Approach:
- Sort all edges by weight.
- Use Disjoint Set (Union-Find) to add edges that connect different components.

Time Complexity: O(E * log(E))
Space Complexity: O(V)
*/

class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
    }

    findUParent(node) {
        if (this.parent[node] === node) return node;
        return this.parent[node] = this.findUParent(this.parent[node]);
    }

    unionBySize(u, v) {
        let uP = this.findUParent(u), vP = this.findUParent(v);
        if (uP === vP) return;
        if (this.size[uP] > this.size[vP]) {
            this.parent[vP] = uP;
            this.size[uP] += this.size[vP];
        } else {
            this.parent[uP] = vP;
            this.size[vP] += this.size[uP];
        }
    }
}

function minimumSpanningTree(edges, n) {
    let djs = new DisjointSet(n);
    edges.sort((a, b) => a[0] - b[0]);

    let ans = 0;
    for (let e of edges) {
        let [wt, u, v] = e;
        if (djs.findUParent(u) !== djs.findUParent(v)) {
            ans += wt;
            djs.unionBySize(u, v);
        }
    }

    return ans;
}

