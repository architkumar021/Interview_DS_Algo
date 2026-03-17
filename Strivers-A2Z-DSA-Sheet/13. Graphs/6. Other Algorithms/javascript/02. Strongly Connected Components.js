/*
Question:
Given a Directed Graph with V vertices and E edges, find the number of
strongly connected components in the graph.

Approach:
1. Kosaraju's algorithm: two DFS traversals.
2. First DFS: get topological ordering (finish time order).
3. Build reverse graph.
4. Second DFS: traverse in reverse finish-time order on reversed graph.
   Each new DFS call = one new SCC.

Time Complexity: O(V + E)
Space Complexity: O(V + E)
*/

function topo(node, vis, adj, stack) {
    vis[node] = true;
    for (let v of adj[node]) {
        if (!vis[v]) {
            topo(v, vis, adj, stack);
        }
    }
    stack.push(node);
}

function dfs(node, vis, revadj) {
    vis[node] = true;
    for (let v of revadj[node]) {
        if (!vis[v]) {
            dfs(v, vis, revadj);
        }
    }
}

function kosaraju(V, adj) {
    let stack = [];
    let vis = new Array(V).fill(false);
    for (let i = 0; i < V; i++) {
        if (!vis[i]) topo(i, vis, adj, stack);
    }

    let revadj = Array.from({ length: V }, () => []);
    for (let i = 0; i < V; i++) {
        for (let j of adj[i]) {
            revadj[j].push(i);
        }
    }

    let ans = 0;
    let visi = new Array(V).fill(false);
    while (stack.length > 0) {
        let node = stack.pop();
        if (!visi[node]) {
            dfs(node, visi, revadj);
            ans++;
        }
    }
    return ans;
}

