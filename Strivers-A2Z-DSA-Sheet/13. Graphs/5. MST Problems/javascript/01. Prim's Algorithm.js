/*
Question:
Given a weighted, undirected and connected graph, find the sum of weights of
the edges of the Minimum Spanning Tree using Prim's algorithm.

Approach:
- Start from vertex 0. Use a min-heap to always pick the cheapest edge.
- Add the cheapest edge to MST if the destination vertex is not yet in MST.

Time Complexity: O(E + V*log(V))
Space Complexity: O(V)
*/

function minimumSpanningTree(edges, n) {
    let adj = Array.from({ length: n }, () => []);
    for (let e of edges) {
        adj[e[0]].push([e[2], e[1]]);
        adj[e[1]].push([e[2], e[0]]);
    }

    let mst = new Array(n).fill(false);
    let pq = [[0, 0]]; // [weight, node]
    let ans = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [uwt, u] = pq.shift();

        if (!mst[u]) {
            mst[u] = true;
            ans += uwt;
            for (let [vwt, v] of adj[u]) {
                if (!mst[v]) pq.push([vwt, v]);
            }
        }
    }

    return ans;
}

