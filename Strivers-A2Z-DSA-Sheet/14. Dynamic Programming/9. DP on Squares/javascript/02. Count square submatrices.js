/*
=============================================================================
  QUESTION: 1277. Count Square Submatrices with All Ones (LeetCode)
=============================================================================

  Count total number of square submatrices that have all ones.

  Example: [[0,1,1,1],[1,1,1,1],[0,1,1,1]] → 15

=============================================================================
  KEY INSIGHT: Same dp as Maximal Square, but SUM instead of MAX
=============================================================================

  dp[i][j] = side of largest square with bottom-right corner at (i,j).
  Same formula: dp[i][j] = min(top, diagonal, left) + 1

  But here: dp[i][j] = 3 means there are squares of size 1×1, 2×2, 3×3 at (i,j).
  So dp[i][j] itself IS the count of squares ending at (i,j)!
  Total = sum of all dp[i][j].

  dp table for [[0,1,1,1],[1,1,1,1],[0,1,1,1]]:
       0  1  2  3
  0 [  0  1  1  1 ]   row sum: 3
  1 [  1  1  2  2 ]   row sum: 6
  2 [  0  1  2  3 ]   row sum: 6
  Total: 3+6+6 = 15 ✓

=============================================================================
  APPROACH: Tabulation — O(M×N) Time, O(M×N) Space
=============================================================================
*/

function countSquares(matrix) {
    let m = matrix.length, n = matrix[0].length;
    let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    let ans = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === 1) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
                ans += dp[i][j];  // count all squares ending here
            }
        }
    }
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(countSquares([[0,1,1,1],[1,1,1,1],[0,1,1,1]]));  // 15
console.log(countSquares([[1,0,1],[1,1,0],[1,1,0]]));         // 7
