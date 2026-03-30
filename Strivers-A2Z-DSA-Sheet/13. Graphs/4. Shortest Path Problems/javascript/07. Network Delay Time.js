/*
=============================================================================
  QUESTION: 743. Network Delay Time (LeetCode)
=============================================================================

  You are given a network of n nodes, labeled from 1 to n.
  You are given times, a list of travel times as directed edges:
    times[i] = [source, target, time]

  Send a signal from node k. Return the MINIMUM time for all n nodes
  to receive the signal. If it's impossible for all nodes to receive
  the signal, return -1.

  In other words: Find shortest path from k to ALL other nodes.
  Answer = the MAXIMUM of all shortest paths (last node to receive signal).

  Example 1:
    times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
    Output: 2

    Explanation:
      - Node 2 → Node 1: time = 1
      - Node 2 → Node 3: time = 1
      - Node 2 → Node 3 → Node 4: time = 1 + 1 = 2
      Answer = max(1, 1, 2) = 2

  Example 2:
    times = [[1,2,1]], n = 2, k = 2
    Output: -1

    Explanation: Signal starts at node 2, but no edge from 2 to 1.
    Node 1 can never receive the signal.

  Example 3:
    times = [[1,2,1]], n = 2, k = 1
    Output: 1

=============================================================================
  THIS IS JUST DIJKSTRA + MAX OF ALL DISTANCES
=============================================================================

  Step 1: Run Dijkstra from node k to find shortest distance to all nodes.
  Step 2: Return max(dist[1], dist[2], ..., dist[n]).
  Step 3: If any node has dist = Infinity (unreachable), return -1.

=============================================================================
  APPROACH 1: Brute Force — BFS/DFS trying all paths
=============================================================================

  For each node, find all possible paths from k and track minimum time.
  Then return the maximum among all minimum times.

  Time Complexity:  Exponential — not practical
  Space Complexity: O(n)

  Note: This DFS uses distance-based pruning — if we arrive at a node with
  a distance >= the already-known shortest, we stop. This prevents infinite
  loops on cycles because each revisit must have strictly smaller distance,
  which can only happen finitely many times.

=============================================================================
*/

function networkDelayTimeBrute(times, n, k) {
    // Build adjacency list
    let adj = Array.from({ length: n + 1 }, () => []);
    for (let [u, v, w] of times) {
        adj[u].push([v, w]);
    }

    // DFS to find shortest path to each node
    // dist[node] tracks the best known distance — acts as pruning
    let dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    function dfs(node, currentTime) {
        // Prune: only continue if this path is strictly better
        if (currentTime > dist[node]) return;
        dist[node] = currentTime;

        for (let [neighbor, weight] of adj[node]) {
            // Only recurse if we can improve the neighbor's distance
            if (currentTime + weight < dist[neighbor]) {
                dfs(neighbor, currentTime + weight);
            }
        }
    }

    dfs(k, 0);

    // Find maximum of all distances
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }

    return maxTime;
}

/*
=============================================================================
  APPROACH 2: Optimal — Dijkstra's Algorithm
=============================================================================

  Standard Dijkstra from source node k.
  After finding all shortest distances, return the maximum distance.

  Algorithm:
    1. Build adjacency list from times[].
    2. Run Dijkstra from node k.
    3. Find max among dist[1..n].
    4. If any dist is Infinity → return -1.

  Time Complexity:  O((V + E) * log V)
  Space Complexity: O(V + E)

  Dry Run:
    times = [[2,1,1],[2,3,1],[3,4,1]], n=4, k=2

    Adjacency List (1-indexed):
      1 → []
      2 → [(1,1), (3,1)]
      3 → [(4,1)]
      4 → []

    dist = [_, ∞, 0, ∞, ∞]  (index 0 unused, k=2 so dist[2]=0)
    PQ = [(0, 2)]

    Pop (0, 2):
      → neighbor 1: 0+1=1 < ∞ → dist[1]=1, push (1,1)
      → neighbor 3: 0+1=1 < ∞ → dist[3]=1, push (1,3)
    PQ = [(1,1), (1,3)]

    Pop (1, 1):
      → no neighbors
    PQ = [(1,3)]

    Pop (1, 3):
      → neighbor 4: 1+1=2 < ∞ → dist[4]=2, push (2,4)
    PQ = [(2,4)]

    Pop (2, 4):
      → no neighbors
    PQ = []

    dist = [_, 1, 0, 1, 2]
    max(1, 0, 1, 2) = 2 ✓

=============================================================================
*/

function networkDelayTime(times, n, k) {
    // Step 1: Build adjacency list (1-indexed)
    let adj = Array.from({ length: n + 1 }, () => []);
    for (let [source, target, time] of times) {
        adj[source].push([target, time]);
    }

    // Step 2: Initialize distances
    let dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    // Step 3: Dijkstra with priority queue (simulated with sorted array)
    let pq = [[0, k]]; // [distance, node]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [currentDist, node] = pq.shift();

        // Skip stale entries
        if (currentDist > dist[node]) continue;

        for (let [neighbor, weight] of adj[node]) {
            let newDist = dist[node] + weight;

            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }

    // Step 4: Find the maximum distance (time for last node to receive signal)
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1; // Node unreachable
        maxTime = Math.max(maxTime, dist[i]);
    }

    return maxTime;
}

/*
=============================================================================
  APPROACH 3: Bellman-Ford (handles negative weights too)
=============================================================================

  Even though this problem has no negative weights, Bellman-Ford can solve it.
  Relax all edges n-1 times.

  Time Complexity:  O(V * E)
  Space Complexity: O(V)

=============================================================================
*/

function networkDelayTimeBellman(times, n, k) {
    let dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    // Relax all edges n-1 times
    for (let i = 0; i < n - 1; i++) {
        let updated = false;

        for (let [u, v, w] of times) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }

        // Early termination if no updates
        if (!updated) break;
    }

    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }

    return maxTime;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. This is essentially "Single Source Shortest Path + find the max dist."
  2. Dijkstra is the standard approach: O((V + E) log V).
  3. Bellman-Ford works too but slower: O(V * E).
  4. The answer is the MAX of all shortest distances (time for the last node
     to receive the signal).
  5. If any node is unreachable (dist = ∞), return -1.

  Note: Nodes are 1-indexed in this problem!

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    console.log("Brute:", networkDelayTimeBrute([[2,1,1],[2,3,1],[3,4,1]], 4, 2));   // 2
    console.log("Dijkstra:", networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2));      // 2
    console.log("Bellman:", networkDelayTimeBellman([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // 2

    console.log("Dijkstra:", networkDelayTime([[1,2,1]], 2, 2));                       // -1
    console.log("Dijkstra:", networkDelayTime([[1,2,1]], 2, 1));                       // 1
}

test();
