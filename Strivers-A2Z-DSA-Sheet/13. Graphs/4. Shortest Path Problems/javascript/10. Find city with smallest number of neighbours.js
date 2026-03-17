/*
Question:
Given n cities and weighted bidirectional edges, find the city with the smallest number
of cities reachable within distanceThreshold. If tied, return the city with the greatest number.

Approach:
- Run Dijkstra from each city.
- Count neighbors within distanceThreshold for each city.
- Return the city with the minimum neighbor count (largest number on tie).

Time Complexity: O(V^3)
Space Complexity: O(V)
*/

function findTheCity(n, edges, distanceThreshold) {
    let adj = Array.from({ length: n }, () => []);
    for (let e of edges) {
        adj[e[0]].push([e[1], e[2]]);
        adj[e[1]].push([e[0], e[2]]);
    }

    let mp = new Map();

    for (let i = 0; i < n; i++) {
        let dis = new Array(n).fill(Infinity);
        dis[i] = 0;
        let pq = [[0, i]];

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

        let nbrCnt = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && dis[j] <= distanceThreshold) nbrCnt++;
        }
        mp.set(i, nbrCnt);
    }

    let mini = Infinity, ans = 0;
    for (let i = 0; i < n; i++) {
        if (mp.get(i) < mini) {
            mini = mp.get(i);
            ans = i;
        } else if (mp.get(i) === mini) {
            ans = Math.max(ans, i);
        }
    }

    return ans;
}

