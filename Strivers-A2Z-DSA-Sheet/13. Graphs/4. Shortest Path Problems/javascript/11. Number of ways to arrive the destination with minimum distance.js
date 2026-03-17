/*
Question:
Find the number of ways to arrive at destination (n-1) from intersection 0 in the shortest
amount of time. Return the count modulo 10^9 + 7.

Approach:
- Use Dijkstra's algorithm. Track both shortest distance and number of ways.
- If a shorter path found, reset ways. If equal path found, add ways.

Time Complexity: O((N + E) * log(N))
Space Complexity: O(N)
*/

function countPaths(n, roads) {
    let adj = Array.from({ length: n }, () => []);
    for (let road of roads) {
        adj[road[0]].push([road[1], road[2]]);
        adj[road[1]].push([road[0], road[2]]);
    }

    let mod = 1e9 + 7;
    let pq = [[0, 0]]; // [distance, node]
    let dis = new Array(n).fill(Infinity);
    let ways = new Array(n).fill(0);

    dis[0] = 0;
    ways[0] = 1;

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [uwt, u] = pq.shift();

        for (let [v, vwt] of adj[u]) {
            if (dis[v] > uwt + vwt) {
                ways[v] = ways[u];
                dis[v] = uwt + vwt;
                pq.push([dis[v], v]);
            } else if (dis[v] === uwt + vwt) {
                ways[v] = (ways[v] + ways[u]) % mod;
            }
        }
    }

    return ways[n - 1] % mod;
}

