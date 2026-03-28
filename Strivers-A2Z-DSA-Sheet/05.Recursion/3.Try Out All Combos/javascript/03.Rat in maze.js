/*
=============================================================================
  QUESTION: Rat in a Maze (GFG)
=============================================================================

  Rat at (0,0) in N×N matrix must reach (N-1,N-1). 1=open, 0=blocked.
  Find ALL paths. Moves: D(down), L(left), R(right), U(up).

  Example: [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]] → ["DDRDRR","DRDDRR"]

=============================================================================
  APPROACH: DFS Backtracking — O(3^(N²)) Time, O(N²) Space
=============================================================================

  Same as Word Search: at each cell, mark visited (set 0), try 4 directions
  in alphabetical order (D,L,R,U for sorted output), restore on backtrack.

  Dry Run:
    (0,0)→D(1,0)→D(2,0)→R(2,1)→D(3,1)→R(3,2)→R(3,3) → push "DDRDRR" ✓
    (0,0)→D(1,0)→R(1,1)→D(2,1)→D(3,1)→R(3,2)→R(3,3) → push "DRDDRR" ✓

=============================================================================
*/

function findPath(m, n) {
    if (m[0][0] === 0 || m[n - 1][n - 1] === 0) return [];
    let result = [];

    function isValid(i, j) {
        return i >= 0 && i < n && j >= 0 && j < n && m[i][j] === 1;
    }

    function solve(i, j, path) {
        if (i === n - 1 && j === n - 1) { result.push(path); return; }
        if (!isValid(i, j)) return;

        m[i][j] = 0;  // Mark visited
        solve(i + 1, j, path + 'D');  // Down
        solve(i, j - 1, path + 'L');  // Left
        solve(i, j + 1, path + 'R');  // Right
        solve(i - 1, j, path + 'U');  // Up
        m[i][j] = 1;  // Restore
    }

    solve(0, 0, "");
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let maze = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]];
console.log(findPath(maze, 4));  // ["DDRDRR","DRDDRR"]
