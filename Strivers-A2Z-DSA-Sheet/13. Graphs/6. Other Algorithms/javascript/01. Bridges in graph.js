/*
Question:
Find all critical connections (bridges) in a network of n servers.
A critical connection is one that, if removed, disconnects some servers.

Approach:
1. Use Tarjan's algorithm to find bridges in an undirected graph.
2. Perform DFS and track tin[] (discovery time) and low[] (lowest reachable time).
3. If low[v] > tin[u] for edge (u,v), it's a bridge.

Time Complexity: O(n + m)
Space Complexity: O(n + m)
*/

let timer = 0;

function dfs(node, parent, tin, low, adj, ans, vis) {
    vis[node] = true;
    low[node] = tin[node] = timer;
    timer++;

    for (let v of adj[node]) {
        if (v === parent) continue;
        if (vis[v]) {
            low[node] = Math.min(low[node], low[v]);
        } else {
            dfs(v, node, tin, low, adj, ans, vis);
            low[node] = Math.min(low[node], low[v]);
            if (low[v] > tin[node]) {
                ans.push([v, node]);
            }
        }
    }
}

function criticalConnections(n, connections) {
    timer = 0;
    let adj = Array.from({ length: n }, () => []);
    for (let c of connections) {
        adj[c[0]].push(c[1]);
        adj[c[1]].push(c[0]);
    }
    let ans = [];
    let vis = new Array(n).fill(false);
    let tin = new Array(n).fill(0);
    let low = new Array(n).fill(0);
    dfs(0, -1, tin, low, adj, ans, vis);
    return ans;
}

