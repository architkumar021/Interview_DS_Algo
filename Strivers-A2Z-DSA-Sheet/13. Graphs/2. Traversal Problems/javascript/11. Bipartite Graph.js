/*
Question:
Given an undirected graph, determine if it is bipartite.
A graph is bipartite if nodes can be partitioned into two sets such that
every edge connects a node in set A to a node in set B.

Approach:
- Use DFS to color nodes with two colors (1 and -1).
- If a neighbor has the same color as the current node, it's not bipartite.

Time Complexity: O(V + E)
Space Complexity: O(V)
*/

function dfs(node, color, adj, vis) {
    vis[node] = color;
    for (let v of adj[node]) {
        if (!vis[v] && !dfs(v, -color, adj, vis)) {
            return false;
        }
        if (vis[v] === color) {
            return false;
        }
    }
    return true;
}

function isBipartite(graph) {
    let n = graph.length;
    let vis = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (!vis[i] && !dfs(i, 1, graph, vis)) {
            return false;
        }
    }
    return true;
}

