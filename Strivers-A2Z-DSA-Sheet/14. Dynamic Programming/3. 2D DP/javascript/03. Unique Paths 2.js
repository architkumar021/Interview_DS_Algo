/*
=============================================================================
  QUESTION: 63. Unique Paths II (LeetCode) — With Obstacles
=============================================================================

  Same as Unique Paths but grid has obstacles (1 = obstacle, 0 = open).
  Robot can't walk through obstacles. Count unique paths.

  Example: [[0,0,0],[0,1,0],[0,0,0]] → 2

=============================================================================
  PATTERN: Grid DP + Obstacle Handling
=============================================================================

  Same as Unique Paths: dp[i][j] = dp[i-1][j] + dp[i][j-1]
  BUT: if grid[i][j] == 1 (obstacle) → dp[i][j] = 0 (no path through here)

  dp table for [[0,0,0],[0,1,0],[0,0,0]]:

       0   1   2
  0 [  1   1   1 ]
  1 [  1   0   1 ]   ← obstacle at (1,1) → 0 paths
  2 [  1   1   2 ]   ← Answer: 2

  Edge cases: if start or end is obstacle → return 0.

=============================================================================
  APPROACH 1: Memoization — O(M×N) Time, O(M×N) Space
=============================================================================
*/

function uniquePathsObsMemo(grid) {
    let m = grid.length, n = grid[0].length;
    if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) return 0;
    let dp = Array.from({ length: m }, () => new Array(n).fill(-1));

    function solve(i, j) {
        if (i < 0 || j < 0) return 0;
        if (grid[i][j] === 1) return 0;       // obstacle → 0 paths
        if (i === 0 && j === 0) return 1;
        if (dp[i][j] !== -1) return dp[i][j];
        return dp[i][j] = solve(i - 1, j) + solve(i, j - 1);
    }

    return solve(m - 1, n - 1);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(M×N) Time, O(N) Space
=============================================================================

  Dry Run: [[0,0,0],[0,1,0],[0,0,0]]
    i=0: curr = [1, 1, 1]
    i=1: curr = [1, 0, 1]   ← (1,1) is obstacle → 0
    i=2: curr = [1, 1, 2]   ← 1+1 = 2
    Answer: 2 ✓

=============================================================================
*/

function uniquePathsWithObstacles(grid) {
    let m = grid.length, n = grid[0].length;
    if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) return 0;

    let prev = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        let curr = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) { curr[j] = 0; continue; }
            if (i === 0 && j === 0) { curr[j] = 1; continue; }
            let top = i > 0 ? prev[j] : 0;
            let left = j > 0 ? curr[j - 1] : 0;
            curr[j] = top + left;
        }
        prev = curr;
    }
    return prev[n - 1];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(uniquePathsObsMemo([[0,0,0],[0,1,0],[0,0,0]]));      // 2
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // 2
console.log(uniquePathsWithObstacles([[0,1],[0,0]]));              // 1
