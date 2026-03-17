/*
Question:
Given an undirected graph with V vertices and E edges, check whether it contains any cycle or not.

Approach:
- Use DFS traversal and keep track of visited nodes and parent.
- If we encounter a visited node that is not the parent, a cycle exists.

Time Complexity: O(V + E)
Space Complexity: O(V)
*/

function dfs(node, parent, adj, vis) {
    vis[node] = true;
    for (let v of adj[node]) {
        if (!vis[v]) {
            if (dfs(v, node, adj, vis)) return true;
        } else if (v !== parent) {
            return true;
        }
    }
    return false;
}

function isCycle(V, adj) {
    let vis = new Array(V).fill(false);
    for (let i = 0; i < V; i++) {
        if (!vis[i]) {
            if (dfs(i, -1, adj, vis)) return true;
        }
    }
    return false;
}

