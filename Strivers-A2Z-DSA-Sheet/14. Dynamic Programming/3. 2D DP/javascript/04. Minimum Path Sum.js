/*
=============================================================================
  QUESTION: 64. Minimum Path Sum (LeetCode)
=============================================================================

  m×n grid of non-negative numbers. Find path from top-left to bottom-right
  that MINIMIZES the sum. Can only move DOWN or RIGHT.

  Example: [[1,3,1],[1,5,1],[4,2,1]] → 7 (path: 1→3→1→1→1)

=============================================================================
  PATTERN: Grid DP — Minimize path cost
=============================================================================

  dp[i][j] = minimum cost to reach (i,j)
           = grid[i][j] + min(dp[i-1][j], dp[i][j-1])

  Base: dp[0][0] = grid[0][0]

  dp table for [[1,3,1],[1,5,1],[4,2,1]]:

       0   1   2
  0 [  1   4   5 ]
  1 [  2   7   6 ]
  2 [  6   8   7 ]  ← Answer: 7

  Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2) = 1+3+1+1+1 = 7 ✓

=============================================================================
  APPROACH 1: Memoization — O(M×N) Time, O(M×N) Space
=============================================================================

  Dry Run: [[1,3,1],[1,5,1],[4,2,1]]
    solve(0,0) = 1
    solve(0,1) = 1+3 = 4
    solve(0,2) = 4+1 = 5
    solve(1,0) = 1+1 = 2
    solve(1,1) = 5 + min(4, 2) = 5+2 = 7
    solve(1,2) = 1 + min(5, 7) = 1+5 = 6
    solve(2,0) = 4+2 = 6
    solve(2,1) = 2 + min(7, 6) = 2+6 = 8
    solve(2,2) = 1 + min(6, 8) = 1+6 = 7 ✓

=============================================================================
*/

function minPathSumMemo(grid) {
    let m = grid.length, n = grid[0].length;
    let dp = Array.from({ length: m }, () => new Array(n).fill(-1));

    function solve(i, j) {
        // Base: start cell
        if (i === 0 && j === 0) return grid[0][0];
        // Out of bounds
        if (i < 0 || j < 0) return 1e9;
        // Return cached
        if (dp[i][j] !== -1) return dp[i][j];

        // Min of coming from above or left, plus current cell
        return dp[i][j] = Math.min(solve(i - 1, j), solve(i, j - 1)) + grid[i][j];
    }

    return solve(m - 1, n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(M×N) Time, O(M×N) Space
=============================================================================

  Same dp table as shown above, filled row by row.

=============================================================================
*/

function minPathSumTab(grid) {
    let m = grid.length, n = grid[0].length;
    let dp = Array.from({ length: m }, () => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) { dp[0][0] = grid[0][0]; continue; }
            let top = i > 0 ? dp[i - 1][j] : 1e9;
            let left = j > 0 ? dp[i][j - 1] : 1e9;
            dp[i][j] = Math.min(top, left) + grid[i][j];
        }
    }
    return dp[m - 1][n - 1];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(M×N) Time, O(N) Space
=============================================================================

  dp[i][j] depends on dp[i-1][j] (prev row) and dp[i][j-1] (curr row).
  → Only need prev row array.

  Dry Run: [[1,3,1],[1,5,1],[4,2,1]]
    prev = [1, 4, 5]            ← row 0
    i=1: curr = [2, 7, 6]       ← min(prev,left) + grid
    i=2: curr = [6, 8, 7]       ← Answer: 7 ✓

=============================================================================
*/

function minPathSum(grid) {
    let m = grid.length, n = grid[0].length;
    let prev = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        let curr = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) { curr[j] = grid[0][0]; continue; }
            let top = i > 0 ? prev[j] : 1e9;
            let left = j > 0 ? curr[j - 1] : 1e9;
            curr[j] = Math.min(top, left) + grid[i][j];
        }
        prev = curr;
    }
    return prev[n - 1];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minPathSumMemo([[1,3,1],[1,5,1],[4,2,1]]));  // 7
console.log(minPathSumTab([[1,3,1],[1,5,1],[4,2,1]]));   // 7
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));      // 7
