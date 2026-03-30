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
  APPROACH 2: Tabulation (Bottom-Up) — O(M×N) Time, O(M×N) Space
=============================================================================

  Build dp table iteratively from top-left to bottom-right.
  dp[row][col] = number of ways to reach (row, col) from (0, 0).

  Steps:
    1. If start or end cell is obstacle → return 0.
    2. dp[0][0] = 1 (1 way to be at start).
    3. For each cell (row, col):
       - If obstacle → dp[row][col] = 0.
       - Else → dp[row][col] = paths from top + paths from left.
    4. Answer is dp[m-1][n-1].

  Dry Run: [[0,0,0],[0,1,0],[0,0,0]]

    row=0: dp = [1, 1, 1]         ← no obstacles in first row
    row=1: dp = [1, 0, 1]         ← (1,1) is obstacle → 0, (1,2) = 0+1 = 1
    row=2: dp = [1, 1, 2]         ← (2,1) = 1+0 = 1, (2,2) = 1+1 = 2
    Answer: dp[2][2] = 2 ✓

=============================================================================
*/

function uniquePathsObsTab(grid) {
    let m = grid.length, n = grid[0].length;
    if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) return 0;

    let dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = 1;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                dp[row][col] = 0;          // obstacle → no path
                continue;
            }
            if (row === 0 && col === 0) continue;  // already set to 1

            let top  = row > 0 ? dp[row - 1][col] : 0;   // paths from above
            let left = col > 0 ? dp[row][col - 1] : 0;   // paths from left
            dp[row][col] = top + left;
        }
    }
    return dp[m - 1][n - 1];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(M×N) Time, O(N) Space
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
console.log(uniquePathsObsTab([[0,0,0],[0,1,0],[0,0,0]]));       // 2
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // 2
console.log(uniquePathsWithObstacles([[0,1],[0,0]]));              // 1
