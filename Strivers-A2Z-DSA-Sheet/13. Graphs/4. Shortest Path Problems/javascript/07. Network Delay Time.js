/*
Question:
Given a network of n nodes and travel times as directed edges, find the minimum time
for all nodes to receive a signal from node k. Return -1 if impossible.

Approach:
- Use Dijkstra's algorithm from node k.
- The answer is the maximum distance among all reachable nodes.

Time Complexity: O(E * log(V))
Space Complexity: O(V)
*/

function networkDelayTime(times, n, k) {
    let adj = Array.from({ length: n + 1 }, () => []);
    for (let time of times) {
        adj[time[0]].push([time[1], time[2]]);
    }

    let pq = [[0, k]]; // [distance, node]
    let dis = new Array(n + 1).fill(1e9);
    dis[k] = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [uwt, u] = pq.shift();
        for (let [v, vwt] of adj[u]) {
            if (dis[v] > uwt + vwt) {
                dis[v] = uwt + vwt;
                pq.push([dis[v], v]);
            }
        }
    }

    let ans = -Infinity;
    for (let i = 1; i <= n; i++) {
        if (dis[i] === 1e9) return -1;
        ans = Math.max(ans, dis[i]);
    }
    return ans;
}

