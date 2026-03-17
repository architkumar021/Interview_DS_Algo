/*
Question:
Given a weighted, undirected, and connected graph, find the shortest distance
of all vertices from the source vertex S using Dijkstra's algorithm.

Approach:
- Use a min-heap (priority queue) to always process the nearest unvisited vertex.
- Relax edges and update distances.

Time Complexity: O(E + V*log(V))
Space Complexity: O(V + E)

Note: JavaScript doesn't have a built-in priority queue, so we use a simple
sorted array approach (or you can implement a MinHeap).
*/

function dijkstra(n, adj, s) {
    let dis = new Array(n).fill(1e9);
    // Simple priority queue using array (for interview purposes)
    let pq = []; // [distance, node]

    dis[s] = 0;
    pq.push([0, s]);

    while (pq.length > 0) {
        // Extract minimum
        pq.sort((a, b) => a[0] - b[0]);
        let [uwt, u] = pq.shift();

        for (let [v, wt] of adj[u]) {
            if (dis[u] + wt < dis[v]) {
                dis[v] = dis[u] + wt;
                pq.push([dis[v], v]);
            }
        }
    }

    return dis;
}

