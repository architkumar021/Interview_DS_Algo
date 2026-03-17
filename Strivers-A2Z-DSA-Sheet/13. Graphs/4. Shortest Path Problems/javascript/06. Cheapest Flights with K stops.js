/*
Question:
Find the cheapest price from src to dst with at most k stops.

Approach:
- Use BFS with level-by-level traversal (each level = one stop).
- Track distances and update only if a cheaper route is found.

Time Complexity: O(n * k)
Space Complexity: O(n)
*/

function findCheapestPrice(n, flights, src, dst, k) {
    let adj = Array.from({ length: n }, () => []);
    for (let flight of flights) {
        adj[flight[0]].push([flight[1], flight[2]]);
    }

    let queue = [[src, 0]];
    let dis = new Array(n).fill(1e9);

    let stops = 0;
    while (queue.length > 0 && stops <= k) {
        let next = [];
        for (let [u, uwt] of queue) {
            for (let [v, vwt] of adj[u]) {
                if (vwt + uwt < dis[v]) {
                    dis[v] = uwt + vwt;
                    next.push([v, dis[v]]);
                }
            }
        }
        queue = next;
        stops++;
    }

    return dis[dst] === 1e9 ? -1 : dis[dst];
}

