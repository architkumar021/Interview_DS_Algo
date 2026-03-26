/*
=============================================================================
  QUESTION: M-Coloring Problem (GFG)
=============================================================================

  Given undirected graph (adjacency matrix) and integer M, determine if
  the graph can be colored with at most M colors such that no two adjacent
  vertices have the same color.

  Example: graph with 4 nodes, M=3 → true (can be colored)
           graph with 4 nodes, M=2 → false (need at least 3 colors)

=============================================================================
  APPROACH: Backtracking — Try Colors for Each Node
=============================================================================

  For each node (0 to N-1):
  1. Try each color from 1 to M
  2. Check if this color is SAFE (no adjacent node has same color)
  3. If safe → assign color, recurse for next node
  4. If recursion succeeds → return true
  5. If fails → backtrack (reset color to 0), try next color
  6. If no color works → return false

  isPossible(node, col): Check all neighbors of 'node'.
  If any neighbor has color 'col' → NOT safe.

  DRY RUN with triangle graph (0-1, 1-2, 0-2), M=3:
  ────────────────────────────────────────────────────
  solve(node=0):
    Try color 1: isPossible? yes (no neighbors colored yet)
      color = [1, 0, 0]
      solve(node=1):
        Try color 1: neighbor 0 has color 1 → NOT safe
        Try color 2: isPossible? yes
          color = [1, 2, 0]
          solve(node=2):
            Try color 1: neighbor 0 has 1 → NOT safe
            Try color 2: neighbor 1 has 2 → NOT safe
            Try color 3: isPossible? yes → color = [1, 2, 3]
              solve(node=3): node==N → return true ✓

  Result: true, coloring = [1, 2, 3] ✓

  DRY RUN with same triangle, M=2:
  ───────────────────────────────────
  All combinations of 2 colors fail because triangle needs 3 colors.
  return false ✓

  Time Complexity:  O(M^N) — M color choices for each of N nodes
  Space Complexity: O(N) — color array + recursion stack

=============================================================================
*/

function isPossible(graph, color, n, col, node) {
    // Check all neighbors of 'node'
    for (let k = 0; k < n; k++) {
        // If k is a neighbor (edge exists) and has same color → NOT safe
        if (k !== node && graph[node][k] === 1 && color[k] === col)
            return false;
    }
    return true;
}

function solve(graph, m, n, color, node) {
    // All nodes colored successfully
    if (node === n) return true;

    // Try each color from 1 to M
    for (let i = 1; i <= m; i++) {
        if (isPossible(graph, color, n, i, node)) {
            color[node] = i;                              // Assign color
            if (solve(graph, m, n, color, node + 1))      // Recurse
                return true;
            color[node] = 0;                              // Backtrack
        }
    }
    return false;  // No valid color found
}

function graphColoring(graph, m, n) {
    let color = new Array(n).fill(0);
    return solve(graph, m, n, color, 0);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
// Triangle graph: 0-1, 1-2, 0-2, 0-3
let graph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
console.log(graphColoring(graph, 3, 4));  // true
console.log(graphColoring(graph, 2, 4));  // false

