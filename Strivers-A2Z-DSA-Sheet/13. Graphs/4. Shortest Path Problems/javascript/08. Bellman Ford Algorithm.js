/*
Question:
Given a weighted directed graph, find shortest distance from source S to all vertices
using Bellman-Ford algorithm. Return [-1] if a negative cycle exists.

Approach:
- Relax all edges V-1 times.
- If any edge can still be relaxed in the Vth iteration, negative cycle exists.

Time Complexity: O(V * E)
Space Complexity: O(V)
*/

function bellmanFord(V, edges, S) {
    let adj = Array.from({ length: V }, () => []);
    for (let e of edges) {
        adj[e[0]].push([e[1], e[2]]);
    }

    let dis = new Array(V).fill(1e8);
    dis[S] = 0;

    for (let i = 0; i < V; i++) {
        for (let u = 0; u < V; u++) {
            for (let [v, wt] of adj[u]) {
                if (dis[u] !== 1e8) {
                    dis[v] = Math.min(dis[v], dis[u] + wt);
                }
            }
        }
    }

    // Check for negative cycle
    for (let u = 0; u < V; u++) {
        for (let [v, wt] of adj[u]) {
            if (dis[u] !== 1e8 && dis[v] > dis[u] + wt) {
                return [-1];
            }
        }
    }

    return dis;
}

