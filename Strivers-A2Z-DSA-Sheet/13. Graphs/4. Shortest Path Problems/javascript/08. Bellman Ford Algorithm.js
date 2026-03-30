/*
=============================================================================
  QUESTION: Bellman-Ford Algorithm (GFG)
=============================================================================

  Given a weighted, directed graph with V vertices and E edges, and a
  source vertex S, find the shortest distance from S to all vertices.

  SPECIAL: This algorithm handles NEGATIVE weight edges.
  If a negative weight cycle is reachable from source, return [-1].

  Example 1:
    V=5, S=0
    Edges: [[0,1,-1],[0,2,4],[1,2,3],[1,3,2],[1,4,2],[3,2,5],[3,1,1],[4,3,-3]]

    Output: [0, -1, 2, -2, 1]

    Explanation:
      - 0 → 0 = 0
      - 0 → 1 = -1 (edge 0→1 with weight -1)
      - 0 → 2 = 2  (0→1→4→3→2 is NOT shorter, 0→1→2 = -1+3 = 2)
      - 0 → 3 = -2 (0→1→4→3 = -1+2-3 = -2)
      - 0 → 4 = 1  (0→1→4 = -1+2 = 1)

  Example 2 (Negative Cycle):
    V=3, S=0
    Edges: [[0,1,1],[1,2,-1],[2,0,-1]]

    Output: [-1]

    Cycle: 0→1→2→0 has weight 1+(-1)+(-1) = -1 (negative!)
    Each traversal reduces distance — infinite loop of improvement.

=============================================================================
  WHY DIJKSTRA FAILS WITH NEGATIVE WEIGHTS
=============================================================================

  Dijkstra assumes: once a node is processed, its distance is final.
  With negative edges, a "longer" path might become shorter after
  traversing a negative edge — violating Dijkstra's greedy assumption.

  Example: 0→1 (weight 5), 0→2 (weight 3), 2→1 (weight -4)
  Dijkstra processes 2 first (dist=3), then 1 (dist=5).
  But path 0→2→1 = 3+(-4) = -1 is shorter! Dijkstra misses this.

=============================================================================
  APPROACH 1: Brute Force — DFS all paths (Exponential)
=============================================================================

  Try all paths from source to each destination.
  Track minimum distance for each node.

  With negative weights and no cycles, this works but is exponential.
  With cycles (even non-negative), DFS can loop infinitely.

  NOT practical. Bellman-Ford is the standard approach.

=============================================================================
  APPROACH 2: Optimal — Bellman-Ford Algorithm
=============================================================================

  Core Idea:
    - The shortest path from S to any vertex can have at most V-1 edges
      (in a graph with V vertices and no negative cycles).
    - Relaxing ALL edges once can find paths of length 1.
    - Relaxing ALL edges twice can find paths of length 2.
    - After V-1 relaxations, all shortest paths (up to V-1 edges) are found.

  Why V-1 iterations?
    - A shortest path visits at most V vertices = V-1 edges.
    - In each iteration, we extend the known shortest paths by one edge.
    - After V-1 iterations, we've considered paths of all possible lengths.

  Negative Cycle Detection:
    - After V-1 iterations, if ANY edge can still be relaxed (improve distance),
      it means there's a negative cycle (distances keep decreasing forever).

  Algorithm:
    1. Initialize dist[] = Infinity, dist[S] = 0.
    2. Repeat V-1 times:
       For each edge (u → v, weight):
         if dist[u] + weight < dist[v]: update dist[v].
    3. Check for negative cycle (Vth iteration):
       For each edge (u → v, weight):
         if dist[u] + weight < dist[v]: NEGATIVE CYCLE detected!
    4. Return dist[] or [-1] if negative cycle.

  Time Complexity:  O(V * E)
  Space Complexity: O(V)

  Dry Run:
    V=5, S=0
    Edges: [[0,1,-1],[0,2,4],[1,2,3],[1,3,2],[1,4,2],[3,2,5],[3,1,1],[4,3,-3]]

    dist = [0, ∞, ∞, ∞, ∞]

    Iteration 1 (paths with 1 edge):
      (0→1,-1): dist[1] = min(∞, 0-1) = -1
      (0→2, 4): dist[2] = min(∞, 0+4) = 4
      (1→2, 3): dist[2] = min(4, -1+3) = 2
      (1→3, 2): dist[3] = min(∞, -1+2) = 1
      (1→4, 2): dist[4] = min(∞, -1+2) = 1
      (3→2, 5): dist[2] = min(2, 1+5) = 2 → no change
      (3→1, 1): dist[1] = min(-1, 1+1) = -1 → no change
      (4→3,-3): dist[3] = min(1, 1-3) = -2
      dist = [0, -1, 2, -2, 1]

    Iteration 2:
      (0→1,-1): dist[1] = min(-1, -1) → no change
      (0→2, 4): dist[2] = min(2, 4) → no change
      (1→2, 3): dist[2] = min(2, -1+3=2) → no change
      (1→3, 2): dist[3] = min(-2, -1+2=1) → no change
      (1→4, 2): dist[4] = min(1, -1+2=1) → no change
      (3→2, 5): dist[2] = min(2, -2+5=3) → no change
      (3→1, 1): dist[1] = min(-1, -2+1=-1) → no change
      (4→3,-3): dist[3] = min(-2, 1-3=-2) → no change
      NO CHANGES → early termination possible

    Iterations 3, 4: Same — no changes

    Negative cycle check (iteration V):
      No edge can be relaxed → NO negative cycle

    Final: [0, -1, 2, -2, 1] ✓

=============================================================================
*/

function bellmanFord(V, edges, S) {
    // Step 1: Initialize distances
    let dist = new Array(V).fill(1e8); // Using 1e8 as Infinity (GFG convention)
    dist[S] = 0;

    // Step 2: Relax ALL edges V-1 times
    for (let iteration = 0; iteration < V - 1; iteration++) {
        let updated = false;

        for (let [u, v, wt] of edges) {
            // Only relax if source is reachable
            if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                updated = true;
            }
        }

        // Optimization: if no update in this iteration, we're done
        if (!updated) break;
    }

    // Step 3: Check for negative weight cycle (Vth iteration)
    for (let [u, v, wt] of edges) {
        if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
            // Negative cycle detected!
            return [-1];
        }
    }

    return dist;
}

/*
=============================================================================
  APPROACH 3: Using Adjacency List (Alternative Implementation)
=============================================================================

  Same algorithm, but build adjacency list first for cleaner edge iteration.

=============================================================================
*/

function bellmanFordAdjList(V, edges, S) {
    // Build adjacency list
    let adj = Array.from({ length: V }, () => []);
    for (let [u, v, wt] of edges) {
        adj[u].push([v, wt]);
    }

    let dist = new Array(V).fill(1e8);
    dist[S] = 0;

    // V-1 relaxation iterations
    for (let iteration = 0; iteration < V - 1; iteration++) {
        let updated = false;

        // Iterate through all edges via adjacency list
        for (let u = 0; u < V; u++) {
            if (dist[u] === 1e8) continue; // Skip unreachable nodes

            for (let [v, wt] of adj[u]) {
                if (dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                    updated = true;
                }
            }
        }

        if (!updated) break;
    }

    // Negative cycle check
    for (let u = 0; u < V; u++) {
        if (dist[u] === 1e8) continue;
        for (let [v, wt] of adj[u]) {
            if (dist[u] + wt < dist[v]) {
                return [-1];
            }
        }
    }

    return dist;
}

/*
=============================================================================
  BELLMAN-FORD vs DIJKSTRA — Comparison
=============================================================================

  Feature               Bellman-Ford              Dijkstra
  ─────────────────────────────────────────────────────────────
  Negative edges        ✅ Yes                    ❌ No
  Negative cycle detect ✅ Yes                    ❌ No
  Time Complexity       O(V * E)                  O((V+E) log V)
  Space Complexity      O(V)                      O(V + E)
  Approach              Relax all edges V-1 times Greedy (min-heap)
  When to use           Negative weights/cycles   Non-negative weights

=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. Relax all edges V-1 times — handles negative weights.
  2. Vth iteration check — detects negative cycles.
  3. Time: O(V * E) — slower than Dijkstra but more general.
  4. Works with both directed and undirected graphs.
  5. Early termination: if no update in an iteration, stop early.

  Common Interview Variations:
    - "Can you detect a negative cycle?" → Bellman-Ford, Vth iteration
    - "Shortest path with at most k edges?" → Bellman-Ford with k iterations
      (This is what "Cheapest Flights" problem does!)

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    // No negative cycle
    let edges1 = [[0,1,-1],[0,2,4],[1,2,3],[1,3,2],[1,4,2],[3,2,5],[3,1,1],[4,3,-3]];
    console.log("Edge List:", bellmanFord(5, edges1, 0));
    // Output: [0, -1, 2, -2, 1]

    console.log("Adj List:", bellmanFordAdjList(5, edges1, 0));
    // Output: [0, -1, 2, -2, 1]

    // Negative cycle
    let edges2 = [[0,1,1],[1,2,-1],[2,0,-1]];
    console.log("Negative Cycle:", bellmanFord(3, edges2, 0));
    // Output: [-1]
}

test();
