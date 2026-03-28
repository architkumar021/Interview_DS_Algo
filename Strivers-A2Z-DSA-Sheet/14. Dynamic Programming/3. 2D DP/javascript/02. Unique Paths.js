/*
=============================================================================
  QUESTION: 62. Unique Paths (LeetCode)
=============================================================================

  Robot at top-left (0,0) of m×n grid → reach bottom-right (m-1, n-1).
  Can only move DOWN or RIGHT. Count all unique paths.

  Example: m=3, n=3 → 6 paths
  Example: m=3, n=7 → 28 paths

=============================================================================
  PATTERN: Grid DP — Count paths
=============================================================================

  At cell (i,j), robot could have come from:
    - (i-1, j) — moved DOWN
    - (i, j-1) — moved RIGHT

  dp[i][j] = dp[i-1][j] + dp[i][j-1]
  Base: dp[0][0] = 1 (starting point)

  Recursion Tree for m=3, n=3:

                     solve(2,2)
                    /          \
           solve(1,2)         solve(2,1)
           /      \           /        \
     solve(0,2)  solve(1,1)  solve(1,1)  solve(2,0)
        ↓ 1      /     \      (cached)     ↓ 1
          solve(0,1) solve(1,0)
            ↓ 1        ↓ 1

  dp table (3×3):
      0   1   2
  0 [ 1   1   1 ]
  1 [ 1   2   3 ]
  2 [ 1   3   6 ]  ← Answer: 6

=============================================================================
  APPROACH 1: Memoization — O(M×N) Time, O(M×N) Space
=============================================================================

  Dry Run m=3, n=3:
    solve(0,0) = 1 (base)
    solve(0,j) = 1 for all j (only right moves)
    solve(i,0) = 1 for all i (only down moves)
    solve(1,1) = solve(0,1) + solve(1,0) = 1 + 1 = 2
    solve(1,2) = solve(0,2) + solve(1,1) = 1 + 2 = 3
    solve(2,1) = solve(1,1) + solve(2,0) = 2 + 1 = 3
    solve(2,2) = solve(1,2) + solve(2,1) = 3 + 3 = 6 ✓

=============================================================================
*/

function uniquePathsMemo(m, n) {
    let dp = Array.from({ length: m }, () => new Array(n).fill(-1));

    function solve(i, j) {
        // Base: reached start
        if (i === 0 && j === 0) return 1;
        // Out of bounds
        if (i < 0 || j < 0) return 0;
        // Return cached
        if (dp[i][j] !== -1) return dp[i][j];

        // Paths = from above + from left
        return dp[i][j] = solve(i - 1, j) + solve(i, j - 1);
    }

    return solve(m - 1, n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(M×N) Time, O(M×N) Space
=============================================================================

  Fill row by row, left to right. First row & first col are all 1's.

  dp table for m=3, n=7:
      0  1  2  3  4  5  6
  0 [ 1  1  1  1  1  1  1 ]
  1 [ 1  2  3  4  5  6  7 ]
  2 [ 1  3  6 10 15 21 28 ]  ← Answer: 28

=============================================================================
*/

function uniquePathsTab(m, n) {
    let dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            let top = i > 0 ? dp[i - 1][j] : 0;
            let left = j > 0 ? dp[i][j - 1] : 0;
            dp[i][j] = top + left;
        }
    }
    return dp[m - 1][n - 1];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(M×N) Time, O(N) Space
=============================================================================

  dp[i][j] depends on dp[i-1][j] (above = prev row) and dp[i][j-1] (left = same row).
  → Only need prev row! curr[j] = prev[j] + curr[j-1].

  Dry Run m=3, n=3:
    prev = [1, 1, 1]      ← row 0
    i=1: curr = [1, 2, 3]  (1=prev[0], 2=prev[1]+curr[0], 3=prev[2]+curr[1])
    prev = [1, 2, 3]
    i=2: curr = [1, 3, 6]
    Answer: 6 ✓

=============================================================================
*/

function uniquePaths(m, n) {
    let prev = new Array(n).fill(0);
    prev[0] = 1;
    for (let i = 0; i < m; i++) {
        let curr = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) { curr[0] = 1; continue; }
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
console.log(uniquePathsMemo(3, 7));  // 28
console.log(uniquePathsTab(3, 7));   // 28
console.log(uniquePaths(3, 7));      // 28

