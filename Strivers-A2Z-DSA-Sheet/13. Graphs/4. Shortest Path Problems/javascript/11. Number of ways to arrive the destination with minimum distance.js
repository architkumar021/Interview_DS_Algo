/*
=============================================================================
  QUESTION: 1976. Number of Ways to Arrive at Destination (LeetCode)
=============================================================================

  You are in a city with n intersections numbered from 0 to n-1.
  Given bidirectional roads where roads[i] = [u, v, time].

  Find the NUMBER OF WAYS to travel from intersection 0 to intersection n-1
  in the SHORTEST amount of time. Return the answer modulo 10^9 + 7.

  Example 1:
    n=7, roads=[[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],
                [3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]

    Output: 4

    Shortest time from 0 to 6 = 7.
    There are 4 ways:
      0→6 (7)
      0→1→2→5→6 (2+3+1+1=7)
      0→1→3→5→6 (2+3+1+1=7)
      0→4→6 (5+2=7)

  Example 2:
    n=2, roads=[[1,0,10]]
    Output: 1

=============================================================================
  INTUITION
=============================================================================

  This is Dijkstra + counting paths.

  Key Idea: While running Dijkstra, maintain a ways[] array:
    - ways[v] = number of shortest paths from 0 to v.

  When relaxing edge (u → v):
    Case 1: Found a SHORTER path to v (dist[u] + wt < dist[v])
            → Reset: dist[v] = dist[u] + wt, ways[v] = ways[u]
    Case 2: Found an EQUAL length path to v (dist[u] + wt === dist[v])
            → Add: ways[v] += ways[u] (another shortest path!)
    Case 3: Found a LONGER path (dist[u] + wt > dist[v])
            → Skip (not a shortest path)

=============================================================================
  APPROACH 1: Brute Force — DFS (Try all paths)
=============================================================================

  Explore all paths from 0 to n-1. Find the shortest distance.
  Count how many paths have that exact distance.

  Time Complexity:  Exponential
  Space Complexity: O(V)

=============================================================================
*/

function countPathsBrute(n, roads) {
    // Build adjacency list
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v, w] of roads) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    let MOD = 1e9 + 7;
    let shortestDist = Infinity;
    let pathCount = 0;

    // DFS: find shortest distance first, then count paths
    let dist = new Array(n).fill(Infinity);
    dist[0] = 0;

    function dfs(node, currentDist) {
        if (node === n - 1) {
            if (currentDist < shortestDist) {
                shortestDist = currentDist;
                pathCount = 1;
            } else if (currentDist === shortestDist) {
                pathCount = (pathCount + 1) % MOD;
            }
            return;
        }

        for (let [neighbor, weight] of adj[node]) {
            if (currentDist + weight < dist[neighbor]) {
                let oldDist = dist[neighbor];
                dist[neighbor] = currentDist + weight;
                dfs(neighbor, currentDist + weight);
                dist[neighbor] = oldDist; // Backtrack
            }
        }
    }

    dfs(0, 0);
    return pathCount;
}

/*
=============================================================================
  APPROACH 2: Optimal — Dijkstra with Path Counting
=============================================================================

  Algorithm:
    1. Build adjacency list from roads.
    2. Initialize dist[] = Infinity, dist[0] = 0.
    3. Initialize ways[] = 0, ways[0] = 1 (one way to reach start).
    4. Run Dijkstra:
       - Pop minimum distance node u.
       - For each neighbor v:
         a) If dist[u] + wt < dist[v]:
            dist[v] = dist[u] + wt
            ways[v] = ways[u] (new shortest path replaces old)
            Push to heap.
         b) If dist[u] + wt === dist[v]:
            ways[v] = (ways[v] + ways[u]) % MOD (add paths)
    5. Return ways[n-1].

  Time Complexity:  O((V + E) * log V)
  Space Complexity: O(V + E)

  Dry Run:
    n=7, roads=[[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],
                [3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]

    adj (simplified):
      0 → [(6,7),(1,2),(4,5)]
      1 → [(0,2),(2,3),(3,3)]
      2 → [(1,3),(5,1)]
      3 → [(1,3),(6,3),(5,1)]
      4 → [(0,5),(6,2)]
      5 → [(3,1),(6,1),(2,1)]
      6 → [(0,7),(3,3),(5,1),(4,2)]

    dist = [0, ∞, ∞, ∞, ∞, ∞, ∞]
    ways = [1, 0, 0, 0, 0, 0, 0]
    PQ = [(0, 0)]

    Pop (0, 0): Process node 0
      → (6, 7): dist[6] = 7, ways[6] = 1, push (7, 6)
      → (1, 2): dist[1] = 2, ways[1] = 1, push (2, 1)
      → (4, 5): dist[4] = 5, ways[4] = 1, push (5, 4)
    dist = [0, 2, ∞, ∞, 5, ∞, 7]
    ways = [1, 1, 0, 0, 1, 0, 1]

    Pop (2, 1): Process node 1
      → (0, 2): 2+2=4 > 0 → skip
      → (2, 3): dist[2] = 5, ways[2] = 1, push (5, 2)
      → (3, 3): dist[3] = 5, ways[3] = 1, push (5, 3)
    dist = [0, 2, 5, 5, 5, ∞, 7]
    ways = [1, 1, 1, 1, 1, 0, 1]

    Pop (5, 2): Process node 2
      → (1, 3): 5+3=8 > 2 → skip
      → (5, 1): dist[5] = 6, ways[5] = 1, push (6, 5)
    dist = [0, 2, 5, 5, 5, 6, 7]
    ways = [1, 1, 1, 1, 1, 1, 1]

    Pop (5, 3): Process node 3
      → (1, 3): 5+3=8 > 2 → skip
      → (6, 3): 5+3=8 > 7 → skip
      → (5, 1): 5+1=6 = dist[5]=6 → EQUAL! ways[5] += ways[3] = 1+1 = 2
    ways = [1, 1, 1, 1, 1, 2, 1]

    Pop (5, 4): Process node 4
      → (0, 5): 5+5=10 > 0 → skip
      → (6, 2): 5+2=7 = dist[6]=7 → EQUAL! ways[6] += ways[4] = 1+1 = 2
    ways = [1, 1, 1, 1, 1, 2, 2]

    Pop (6, 5): Process node 5
      → (3, 1): 6+1=7 > 5 → skip
      → (6, 1): 6+1=7 = dist[6]=7 → EQUAL! ways[6] += ways[5] = 2+2 = 4
      → (2, 1): 6+1=7 > 5 → skip
    ways = [1, 1, 1, 1, 1, 2, 4]

    Pop (7, 6): Node 6 = destination
      (Processing its neighbors won't find shorter paths)

    Result: ways[6] = 4 ✓

    The 4 paths are:
      0→6 (7)
      0→4→6 (5+2=7)
      0→1→2→5→6 (2+3+1+1=7)
      0→1→3→5→6 (2+3+1+1=7)

=============================================================================
*/

function countPaths(n, roads) {
    // Step 1: Build adjacency list
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v, w] of roads) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    let MOD = 1e9 + 7;

    // Step 2: Initialize distances and ways
    let dist = new Array(n).fill(Infinity);
    let ways = new Array(n).fill(0);
    dist[0] = 0;
    ways[0] = 1; // One way to reach the start (being there already)

    // Step 3: Dijkstra with path counting
    let pq = [[0, 0]]; // [distance, node]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [currentDist, node] = pq.shift();

        // Skip stale entries
        if (currentDist > dist[node]) continue;

        for (let [neighbor, weight] of adj[node]) {
            let newDist = currentDist + weight;

            if (newDist < dist[neighbor]) {
                // Case 1: Found SHORTER path → reset ways
                dist[neighbor] = newDist;
                ways[neighbor] = ways[node];
                pq.push([newDist, neighbor]);

            } else if (newDist === dist[neighbor]) {
                // Case 2: Found EQUAL length path → add ways
                ways[neighbor] = (ways[neighbor] + ways[node]) % MOD;
            }
            // Case 3: Longer path → skip (implicit)
        }
    }

    return ways[n - 1] % MOD;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. This combines Dijkstra's shortest path with path counting.
  2. Two arrays: dist[] for shortest distance, ways[] for path count.
  3. When relaxing:
     - Shorter path → REPLACE ways
     - Equal path → ADD ways
     - Longer path → IGNORE
  4. The MOD operation prevents integer overflow (10^9 + 7).
  5. The stale entry check (currentDist > dist[node]) is CRUCIAL.
     Without it, we might incorrectly add ways from outdated paths.

  Similar Problems:
    - Unique Paths (grid DP)
    - Number of Shortest Paths in a Graph
    - Shortest Path + Count (common Dijkstra variation)

  Pattern: "Dijkstra + extra info tracking"
    - Track ways[] for path counting
    - Track parent[] for path reconstruction
    - Track maxWeight[] for bottleneck paths

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let roads1 = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],
                   [3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]];
    console.log("Dijkstra:", countPaths(7, roads1)); // Output: 4

    let roads2 = [[1,0,10]];
    console.log("Dijkstra:", countPaths(2, roads2)); // Output: 1
}

test();
