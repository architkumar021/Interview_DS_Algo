/*
Question:
Given an undirected graph with unit weight, find the shortest path from
the source vertex to all other vertices. Return -1 for unreachable vertices.

Approach:
- BFS from the source vertex. Each level = distance incremented by 1.

Time Complexity: O(N + M)
Space Complexity: O(N)
*/

function shortestPath(edges, N, M, src) {
    let adj = Array.from({ length: N }, () => []);
    for (let e of edges) {
        adj[e[0]].push(e[1]);
        adj[e[1]].push(e[0]);
    }

    let vis = new Array(N).fill(false);
    let dis = new Array(N).fill(-1);
    let queue = [src];
    vis[src] = true;

    let lvl = 0;
    while (queue.length > 0) {
        let next = [];
        for (let node of queue) {
            dis[node] = lvl;
            for (let v of adj[node]) {
                if (!vis[v]) {
                    next.push(v);
                    vis[v] = true;
                }
            }
        }
        queue = next;
        lvl++;
    }

    return dis;
}

