/*
=============================================================================
  QUESTION: Floyd Warshall Algorithm (GFG)
=============================================================================

  Given a matrix representation of a directed, weighted graph, find the
  shortest distances between EVERY pair of vertices.

  matrix[i][j] = weight of edge from i to j.
  matrix[i][j] = -1 means NO edge from i to j.
  matrix[i][i] = 0 (distance from a vertex to itself is 0).

  Modify the matrix IN-PLACE with shortest distances.
  After computation, if matrix[i][j] is still -1, vertex j is unreachable from i.

  Example:
    Input matrix:
      [[0, 2, -1, 6],
       [-1, 0, 3, -1],
       [7, -1, 0, 1],
       [-1, -1, -1, 0]]

    Meaning:
      0→1: 2,  0→3: 6
      1→2: 3
      2→0: 7,  2→3: 1

    Output matrix:
      [[0, 2, 5, 6],
       [10, 0, 3, 4],
       [7, 9, 0, 1],
       [-1, -1, -1, 0]]

    Explanation:
      0→1 = 2 (direct)
      0→2 = 5 (0→1→2 = 2+3)
      0→3 = 6 (direct edge 6, and 0→1→2→3 = 2+3+1 = 6, same)
      1→0 = 10 (1→2→0 = 3+7)
      1→3 = 4 (1→2→3 = 3+1)
      2→1 = 9 (2→0→1 = 7+2)
      3→anything = -1 (no outgoing edges from vertex 3)

=============================================================================
  WHY FLOYD WARSHALL — ALL PAIRS SHORTEST PATH
=============================================================================

  When do we need ALL pairs?
    - Multiple queries: "What's the shortest path from A to B?"
    - Instead of running Dijkstra V times, run Floyd Warshall once.

  Comparison:
    - Dijkstra V times: O(V * (V + E) * log V) — good for sparse graphs
    - Floyd Warshall: O(V^3) — always the same, good for dense graphs

  Floyd Warshall also handles negative edges (but not negative cycles).

=============================================================================
  APPROACH 1: Brute Force — Run Dijkstra/Bellman-Ford from each vertex
=============================================================================

  For each vertex i (0 to V-1), run single-source shortest path.
  - Dijkstra from each vertex: O(V * (V + E) log V)
  - Bellman-Ford from each vertex: O(V^2 * E)

  This works but Floyd Warshall is simpler to implement for all-pairs.

=============================================================================
  APPROACH 2: Optimal — Floyd Warshall Algorithm
=============================================================================

  Core Idea (Dynamic Programming):
    Consider each vertex k as a potential INTERMEDIATE vertex.
    For every pair (i, j), check:
      "Is going through k shorter than the direct path?"

    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    We iterate k from 0 to V-1 (trying each vertex as intermediate).

  Why this works:
    - When k=0: we consider paths that go through vertex 0.
    - When k=1: we consider paths through vertices 0 and 1.
    - When k=V-1: we've considered paths through ALL vertices.

  Algorithm:
    1. Replace -1 with Infinity (except diagonal which stays 0).
    2. For each intermediate vertex k (0 to V-1):
       For each source i (0 to V-1):
         For each destination j (0 to V-1):
           dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    3. Replace Infinity back with -1.

  Time Complexity:  O(V^3) — three nested loops
  Space Complexity: O(1) — in-place modification

  Dry Run:
    V = 4
    Initial matrix (∞ = unreachable):
      [[0, 2, ∞, 6],
       [∞, 0, 3, ∞],
       [7, ∞, 0, 1],
       [∞, ∞, ∞, 0]]

    k=0 (intermediate vertex = 0):
      Check all (i,j) pairs: "Is i→0→j shorter than i→j?"
      (1,2): dist[1][0]+dist[0][2] = ∞+∞ → no change
      (1,3): dist[1][0]+dist[0][3] = ∞+6 → no change
      (2,1): dist[2][0]+dist[0][1] = 7+2 = 9 < ∞ → dist[2][1] = 9
      (2,3): dist[2][0]+dist[0][3] = 7+6 = 13 > 1 → no change
      (3,1): dist[3][0]+dist[0][1] = ∞ → no change
      (3,2): dist[3][0]+dist[0][2] = ∞ → no change

      Matrix after k=0:
      [[0, 2, ∞, 6],
       [∞, 0, 3, ∞],
       [7, 9, 0, 1],
       [∞, ∞, ∞, 0]]

    k=1 (intermediate vertex = 1):
      (0,2): dist[0][1]+dist[1][2] = 2+3 = 5 < ∞ → dist[0][2] = 5
      (0,3): dist[0][1]+dist[1][3] = 2+∞ → no change
      (2,0): dist[2][1]+dist[1][0] = 9+∞ → no change
      (2,3): dist[2][1]+dist[1][3] = 9+∞ → no change
      (3,0): dist[3][1]+dist[1][0] = ∞ → no change
      (3,2): dist[3][1]+dist[1][2] = ∞ → no change

      Matrix after k=1:
      [[0, 2, 5, 6],
       [∞, 0, 3, ∞],
       [7, 9, 0, 1],
       [∞, ∞, ∞, 0]]

    k=2 (intermediate vertex = 2):
      (0,1): dist[0][2]+dist[2][1] = 5+9 = 14 > 2 → no change
      (0,3): dist[0][2]+dist[2][3] = 5+1 = 6 = current 6 → no change
      (1,0): dist[1][2]+dist[2][0] = 3+7 = 10 < ∞ → dist[1][0] = 10
      (1,3): dist[1][2]+dist[2][3] = 3+1 = 4 < ∞ → dist[1][3] = 4
      (3,0): dist[3][2]+dist[2][0] = ∞+7 → no change
      (3,1): dist[3][2]+dist[2][1] = ∞+9 → no change

      Matrix after k=2:
      [[0, 2, 5, 6],
       [10, 0, 3, 4],
       [7, 9, 0, 1],
       [∞, ∞, ∞, 0]]

    k=3 (intermediate vertex = 3):
      Vertex 3 has no outgoing edges (all dist[3][x] = ∞ except dist[3][3]=0).
      So no path i→3→j can improve any distance.
      No changes.

      Final Matrix:
      [[0, 2, 5, 6],
       [10, 0, 3, 4],
       [7, 9, 0, 1],
       [-1, -1, -1, 0]]  ✓

=============================================================================
*/

function shortestDistance(matrix) {
    let v = matrix.length;

    // Step 1: Replace -1 with Infinity (no edge = infinite distance)
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            if (matrix[i][j] === -1) {
                matrix[i][j] = 1e9; // Large value as infinity
            }
        }
    }

    // Step 2: Floyd Warshall — try each vertex k as intermediate
    for (let k = 0; k < v; k++) {
        for (let i = 0; i < v; i++) {
            for (let j = 0; j < v; j++) {
                // Self-loop distance is always 0
                if (i === j) {
                    matrix[i][j] = 0;
                    continue;
                }

                // Is path i→k→j shorter than current i→j?
                if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
                    matrix[i][j] = matrix[i][k] + matrix[k][j];
                }
            }
        }
    }

    // Step 3: Replace Infinity back with -1 (unreachable)
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            if (matrix[i][j] >= 1e9) {
                matrix[i][j] = -1;
            }
        }
    }
}

/*
=============================================================================
  DETECTING NEGATIVE CYCLES WITH FLOYD WARSHALL
=============================================================================

  After running Floyd Warshall, if any matrix[i][i] < 0,
  there's a negative cycle involving vertex i.

  This is because matrix[i][i] represents the shortest path from i back
  to i. If it's negative, we can keep going around the cycle to reduce
  distance forever.

=============================================================================
*/

function shortestDistanceWithCycleCheck(matrix) {
    let v = matrix.length;

    // Replace -1 with Infinity
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            if (matrix[i][j] === -1) matrix[i][j] = 1e9;
        }
    }

    // Floyd Warshall
    for (let k = 0; k < v; k++) {
        for (let i = 0; i < v; i++) {
            for (let j = 0; j < v; j++) {
                if (i === j) { matrix[i][j] = 0; continue; }
                if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
                    matrix[i][j] = matrix[i][k] + matrix[k][j];
                }
            }
        }
    }

    // Check for negative cycles
    for (let i = 0; i < v; i++) {
        if (matrix[i][i] < 0) {
            console.log("Negative cycle detected involving vertex", i);
            return false;
        }
    }

    // Replace Infinity back with -1
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            if (matrix[i][j] >= 1e9) matrix[i][j] = -1;
        }
    }

    return true;
}

/*
=============================================================================
  ALL PAIRS SHORTEST PATH — Approach Comparison
=============================================================================

  Method                          Time              Space   Neg Weights?
  ──────────────────────────────────────────────────────────────────────
  Dijkstra V times (no neg)       O(V*(V+E)*logV)   O(V+E) ❌
  Bellman-Ford V times             O(V^2 * E)        O(V)   ✅
  Floyd Warshall                  O(V^3)            O(1)*   ✅

  * Floyd Warshall modifies matrix in-place.

  When to use Floyd Warshall:
    - Dense graphs (E ≈ V^2) → all approaches are similar
    - Need ALL pairs shortest path
    - Matrix representation already given
    - Simplicity: only 3 nested loops

  When NOT to use:
    - Very sparse graphs → Dijkstra V times is better
    - Only need single-source → use Dijkstra or Bellman-Ford

=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. Floyd Warshall = Dynamic Programming for all-pairs shortest path.
  2. Core formula: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
  3. Try each vertex k as intermediate → O(V^3).
  4. Handles negative edges. Detect negative cycles via diagonal < 0.
  5. In-place: modifies the input matrix directly.
  6. The order of loops MATTERS: k must be the outermost loop!
     (i and j order doesn't matter)

  Common Mistake:
    - Making i or j the outer loop instead of k → WRONG results!
    - k must be outermost because we build up solutions incrementally:
      "paths using vertices {0..k} as intermediates."

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let matrix = [
        [0, 2, -1, 6],
        [-1, 0, 3, -1],
        [7, -1, 0, 1],
        [-1, -1, -1, 0]
    ];

    shortestDistance(matrix);
    console.log("Floyd Warshall Result:");
    for (let row of matrix) {
        console.log(row);
    }
    // Expected:
    // [0, 2, 5, 6]
    // [10, 0, 3, 4]
    // [7, 9, 0, 1]
    // [-1, -1, -1, 0]

    // Simple 3-node test
    let matrix2 = [
        [0, 1, -1],
        [-1, 0, 1],
        [1, -1, 0]
    ];
    shortestDistance(matrix2);
    console.log("\nSimple 3-node:");
    for (let row of matrix2) {
        console.log(row);
    }
    // Expected: [[0,1,2],[2,0,1],[1,2,0]]
}

test();
