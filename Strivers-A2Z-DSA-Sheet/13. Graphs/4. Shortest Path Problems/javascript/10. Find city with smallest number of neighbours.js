/*
=============================================================================
  QUESTION: 1334. Find the City With the Smallest Number of Neighbors at
  a Threshold Distance (LeetCode)
=============================================================================

  There are n cities numbered from 0 to n-1. Given:
    - edges[i] = [from, to, weight] — BIDIRECTIONAL weighted edges
    - distanceThreshold — maximum distance to consider a city as "reachable"

  For each city, count how many OTHER cities are reachable within
  distanceThreshold. Return the city with the SMALLEST count.
  If there's a tie, return the city with the GREATEST number.

  Example 1:
    n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold=4

    Output: 3

    Explanation:
      Shortest distances (bidirectional, so use shortest path):
        0→1 = 3,  0→2 = 4 (0→1→2),  0→3 = 5 (0→1→2→3)
        1→0 = 3,  1→2 = 1,           1→3 = 2 (1→2→3)
        2→0 = 4,  2→1 = 1,           2→3 = 1
        3→0 = 5,  3→1 = 2 (3→2→1),  3→2 = 1

      Count reachable cities within threshold=4:
        City 0: {1(3), 2(4)}         → 2 neighbors
        City 1: {0(3), 2(1), 3(2)}   → 3 neighbors
        City 2: {0(4), 1(1), 3(1)}   → 3 neighbors
        City 3: {1(2), 2(1)}         → 2 neighbors

      Cities 0 and 3 both have 2 neighbors (TIE).
      Return the one with GREATEST index → return 3 ✓

  Example 2:
    n=5, edges=[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], threshold=2
    Output: 0

=============================================================================
  THIS IS AN "ALL PAIRS SHORTEST PATH" PROBLEM
=============================================================================

  We need shortest distances between ALL pairs of cities, then count
  neighbors within the threshold for each city.

  Two main approaches:
    1. Floyd Warshall — O(V^3), simpler code
    2. Dijkstra from each city — O(V * (V + E) log V), better for sparse graphs

=============================================================================
  APPROACH 1: Floyd Warshall + Count Neighbors
=============================================================================

  Algorithm:
    1. Create distance matrix from edges.
    2. Run Floyd Warshall to get all-pairs shortest distances.
    3. For each city, count neighbors within threshold.
    4. Return city with smallest count (largest number on tie).

  Time Complexity:  O(V^3) — Floyd Warshall dominates
  Space Complexity: O(V^2) — distance matrix

  Dry Run:
    n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], threshold=4

    Initial Matrix (∞ = no direct edge):
      [[0, 3, ∞, ∞],
       [3, 0, 1, 4],
       [∞, 1, 0, 1],
       [∞, 4, 1, 0]]

    After Floyd Warshall:
      [[0, 3, 4, 5],
       [3, 0, 1, 2],
       [4, 1, 0, 1],
       [5, 2, 1, 0]]

    Count neighbors (dist ≤ 4):
      City 0: {1(3), 2(4)} → 2
      City 1: {0(3), 2(1), 3(2)} → 3
      City 2: {0(4), 1(1), 3(1)} → 3
      City 3: {1(2), 2(1)} → 2

    Cities with min count (2): {0, 3} → return max = 3 ✓

=============================================================================
*/

function findTheCityFloyd(n, edges, distanceThreshold) {
    // Step 1: Build distance matrix
    let dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));

    // Distance from a city to itself = 0
    for (let i = 0; i < n; i++) dist[i][i] = 0;

    // Fill in edges (bidirectional)
    for (let [u, v, w] of edges) {
        dist[u][v] = w;
        dist[v][u] = w;
    }

    // Step 2: Floyd Warshall
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Step 3: Count reachable neighbors for each city
    let minNeighbors = Infinity;
    let resultCity = 0;

    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && dist[i][j] <= distanceThreshold) {
                count++;
            }
        }

        // Update result: smallest count (or largest city number on tie)
        if (count <= minNeighbors) {
            minNeighbors = count;
            resultCity = i;
        }
    }

    return resultCity;
}

/*
=============================================================================
  APPROACH 2: Dijkstra from Each City
=============================================================================

  Run Dijkstra starting from each city. For each, count how many other
  cities have distance ≤ threshold.

  Time Complexity:  O(V * (V + E) * log V)
  Space Complexity: O(V + E)

  Better for sparse graphs where E << V^2.

  Dry Run: (Same result, using Dijkstra V times instead of Floyd Warshall)

=============================================================================
*/

function findTheCity(n, edges, distanceThreshold) {
    // Step 1: Build adjacency list (bidirectional)
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    // Step 2: Run Dijkstra from each city
    let minNeighbors = Infinity;
    let resultCity = 0;

    for (let src = 0; src < n; src++) {
        // Dijkstra from src
        let dist = new Array(n).fill(Infinity);
        dist[src] = 0;
        let pq = [[0, src]]; // [distance, node]

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            let [currentDist, node] = pq.shift();

            // Skip stale entries
            if (currentDist > dist[node]) continue;

            // Optimization: if current distance exceeds threshold, no need to explore further
            if (currentDist > distanceThreshold) continue;

            for (let [neighbor, weight] of adj[node]) {
                let newDist = dist[node] + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    pq.push([newDist, neighbor]);
                }
            }
        }

        // Count neighbors within threshold
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (src !== j && dist[j] <= distanceThreshold) {
                count++;
            }
        }

        // Update result
        if (count <= minNeighbors) {
            minNeighbors = count;
            resultCity = src;
        }
    }

    return resultCity;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. This is an all-pairs shortest path problem → Floyd Warshall or
     Dijkstra from each vertex.
  2. Floyd Warshall: O(V^3), simpler to code, good for dense graphs.
  3. Dijkstra V times: O(V * (V+E) log V), better for sparse graphs.
  4. Tie-breaking: return the city with the LARGEST index.
  5. Using <= for threshold comparison (not just <).

  Optimization Tips:
    - In Dijkstra, skip nodes whose distance exceeds threshold.
    - This prunes unnecessary exploration.

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let edges1 = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]];
    console.log("Floyd:", findTheCityFloyd(4, edges1, 4));  // Output: 3
    console.log("Dijkstra:", findTheCity(4, edges1, 4));    // Output: 3

    let edges2 = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]];
    console.log("Floyd:", findTheCityFloyd(5, edges2, 2));  // Output: 0
    console.log("Dijkstra:", findTheCity(5, edges2, 2));    // Output: 0
}

test();
