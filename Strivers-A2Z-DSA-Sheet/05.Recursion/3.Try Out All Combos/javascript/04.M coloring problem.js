/*
=============================================================================
  QUESTION: M-Coloring Problem (GFG)
=============================================================================

  Given undirected graph (adjacency matrix) and M colors, determine if
  graph can be colored with at most M colors such that no two adjacent
  vertices share the same color.

  Example: 4-node graph, M=3 → true | M=2 → false

=============================================================================
  APPROACH: Backtracking — Try Colors for Each Node — O(M^N) Time, O(N) Space
=============================================================================

  For each node: try colors 1 to M.
  - If safe (no neighbor has same color) → assign, recurse for next node.
  - If recursion fails → backtrack (reset to 0), try next color.
  - All nodes colored → return true. No color works → return false.

  Dry Run (triangle 0-1-2, M=3):
    node 0: color 1 ✓ → node 1: color 1 ✗ (adj to 0), color 2 ✓
      → node 2: color 1 ✗ (adj to 0), color 2 ✗ (adj to 1), color 3 ✓ → true ✓

=============================================================================
*/

function graphColoring(graph, m, n) {
    let color = new Array(n).fill(0);

    function isSafe(node, col) {
        for (let k = 0; k < n; k++)
            if (graph[node][k] === 1 && color[k] === col) return false;
        return true;
    }

    function solve(node) {
        if (node === n) return true;

        for (let c = 1; c <= m; c++) {
            if (isSafe(node, c)) {
                color[node] = c;
                if (solve(node + 1)) return true;
                color[node] = 0;  // Backtrack
            }
        }
        return false;
    }

    return solve(0);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let graph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
console.log(graphColoring(graph, 3, 4));  // true
console.log(graphColoring(graph, 2, 4));  // false

