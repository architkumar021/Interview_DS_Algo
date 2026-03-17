/*
Question:
Given a DAG with N vertices and weighted edges, find the shortest path from
source (vertex 0) to all other vertices. Return -1 for unreachable vertices.

Approach:
- Topological sort the DAG using DFS.
- Relax edges in topological order.

Time Complexity: O(N + M)
Space Complexity: O(N + M)
*/

function dfs(node, adj, vis, topo) {
    vis[node] = true;
    for (let [v] of adj[node]) {
        if (!vis[v]) {
            dfs(v, adj, vis, topo);
        }
    }
    topo.push(node);
}

function shortestPath(N, M, edges) {
    let adj = Array.from({ length: N }, () => []);
    for (let e of edges) {
        adj[e[0]].push([e[1], e[2]]);
    }

    let vis = new Array(N).fill(false);
    let topo = [];
    for (let i = 0; i < N; i++) {
        if (!vis[i]) {
            dfs(i, adj, vis, topo);
        }
    }
    topo.reverse();

    let dis = new Array(N).fill(1e9);
    dis[0] = 0;

    for (let u of topo) {
        for (let [v, d] of adj[u]) {
            dis[v] = Math.min(dis[v], dis[u] + d);
        }
    }

    for (let i = 0; i < N; i++) {
        if (dis[i] === 1e9) dis[i] = -1;
    }

    return dis;
}

