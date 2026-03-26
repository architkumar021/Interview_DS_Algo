/*
=============================================================================
  QUESTION: Rat in a Maze (GFG)
=============================================================================

  Rat at (0,0) in N×N matrix must reach (N-1,N-1). 1=open, 0=blocked.
  Find ALL paths using moves: D(down), L(left), R(right), U(up).

  Example:
  [[1,0,0,0],    Output: ["DDRDRR","DRDDRR"]
   [1,1,0,1],
   [1,1,0,0],
   [0,1,1,1]]

=============================================================================
  APPROACH: DFS Backtracking (Same as Word Search pattern)
=============================================================================

  1. Start DFS from (0,0). At each cell, try all 4 directions.
  2. Mark cell as 0 (visited) to avoid cycles.
  3. If reached (N-1, N-1) → add path string to result.
  4. Restore cell to 1 on backtrack.

  Validity check: cell must be within bounds AND value must be 1.

  DRY RUN with 4×4 matrix above:
  ────────────────────────────────
  solve(0,0, "")
    mark m[0][0]=0
    D: solve(1,0, "D")
      mark m[1][0]=0
      D: solve(2,0, "DD")
        mark m[2][0]=0
        D: invalid (m[3][0]=0)
        R: solve(2,1, "DDR")
          mark m[2][1]=0
          D: solve(3,1, "DDRD")
            mark m[3][1]=0
            R: solve(3,2, "DDRDR")
              mark m[3][2]=0
              R: solve(3,3, "DDRDRR")
                i==3, j==3 → PUSH "DDRDRR" ✓
              restore m[3][2]=1
            restore m[3][1]=1
          restore m[2][1]=1
        restore m[2][0]=1
      R: solve(1,1, "DR")
        mark m[1][1]=0
        D: solve(2,1, "DRD")
          mark m[2][1]=0
          D: solve(3,1, "DRDD")
            mark m[3][1]=0
            R: solve(3,2, "DRDDR")
              R: solve(3,3, "DRDDRR") → PUSH "DRDDRR" ✓
    ...remaining paths don't reach (3,3)

  Result: ["DDRDRR","DRDDRR"] ✓

  Time Complexity:  O(3^(N²)) — at each cell, 3 directions (exclude where came from)
  Space Complexity: O(N²) — recursion stack + path string

=============================================================================
*/

function isValid(i, j, m, n) {
    return i >= 0 && i < n && j >= 0 && j < n && m[i][j] === 1;
}

function solve(i, j, temp, ans, m, n) {
    // Reached destination
    if (i === n - 1 && j === n - 1) {
        ans.push(temp);
        return;
    }

    // Invalid cell
    if (!isValid(i, j, m, n)) return;

    // Mark visited
    m[i][j] = 0;

    // Try all 4 directions (alphabetical: D, L, R, U for sorted output)
    solve(i + 1, j, temp + 'D', ans, m, n);     // Down
    solve(i, j - 1, temp + 'L', ans, m, n);     // Left
    solve(i, j + 1, temp + 'R', ans, m, n);     // Right
    solve(i - 1, j, temp + 'U', ans, m, n);     // Up

    // Restore (backtrack)
    m[i][j] = 1;
}

function findPath(m, n) {
    if (m[0][0] === 0 || m[n - 1][n - 1] === 0) return [];

    let ans = [];
    solve(0, 0, "", ans, m, n);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let maze = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]];
console.log(findPath(maze, 4));  // ["DDRDRR","DRDDRR"]
