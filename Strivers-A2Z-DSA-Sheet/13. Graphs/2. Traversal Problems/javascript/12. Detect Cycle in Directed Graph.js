/*
Question:
Given a Directed Graph with V vertices and E edges, check whether it contains any cycle or not.

Approach:
- Use DFS with backtracking. Maintain a visited array.
- If we encounter a node that is already visited in the current DFS path, a cycle exists.
- On backtrack, unmark the node.

Time Complexity: O(V + E)
Space Complexity: O(V)
*/

function dfs(node, adj, vis) {
    vis[node] = true;
    for (let v of adj[node]) {
        if (!vis[v] && dfs(v, adj, vis)) {
            return true;
        } else if (vis[v]) {
            return true;
        }
    }
    vis[node] = false;
    return false;
}

function isCyclic(edges, v, e) {
    let adj = Array.from({ length: v }, () => []);
    for (let it of edges) {
        adj[it[0]].push(it[1]);
    }
    let vis = new Array(v).fill(false);
    for (let i = 0; i < v; i++) {
        if (!vis[i] && dfs(i, adj, vis)) {
            return true;
        }
    }
    return false;
}

