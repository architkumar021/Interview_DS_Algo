/*
=============================================================================
  QUESTION: 62. Unique Paths (LeetCode)
=============================================================================

  Robot at top-left (0,0) of m×n grid → reach bottom-right (m-1, n-1).
  Can only move DOWN or RIGHT. Count all unique paths.

  Example: m=3, n=7 → 28
  Example: m=3, n=2 → 3

  NOTE: Also solved in "3. 2D DP/02. Unique Paths.js" with full breakdown.

=============================================================================
  APPROACH 1: Memoization — O(M×N) Time, O(M×N) Space
=============================================================================
*/

function uniquePathsMemo(m, n) {
    let dp = Array.from({ length: m }, () => new Array(n).fill(-1));

    function solve(i, j) {
        if (i === 0 && j === 0) return 1;
        if (i < 0 || j < 0) return 0;
        if (dp[i][j] !== -1) return dp[i][j];
        return dp[i][j] = solve(i - 1, j) + solve(i, j - 1);
    }

    return solve(m - 1, n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(M×N) Time, O(M×N) Space
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
console.log(uniquePathsTab(3, 2));   // 3
console.log(uniquePaths(3, 7));      // 28
