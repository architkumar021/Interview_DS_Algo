/*
=============================================================================
  QUESTION: 221. Maximal Square (LeetCode)
=============================================================================

  Given m×n binary matrix (chars '0' and '1'), find largest square
  containing only 1's and return its AREA.

  Example: [["1","0","1","0","0"],
            ["1","0","1","1","1"],
            ["1","1","1","1","1"],
            ["1","0","0","1","0"]] → 4 (2×2 square)

=============================================================================
  KEY INSIGHT
=============================================================================

  dp[i][j] = side length of largest square with bottom-right corner at (i,j).

  If matrix[i][j] == '1':
    dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1
               ← top        ← diagonal     ← left

  WHY min of all three?
    To form a square of side s at (i,j), we need:
    - Square of side s-1 above (top)
    - Square of side s-1 diagonally (top-left)
    - Square of side s-1 to the left
    The SMALLEST of these limits our square size.

  Visualization (why dp[i][j] = min(top, diag, left) + 1):

    If dp values are:   Then at (i,j):
    ... 2  3             min(2, 2, 3) + 1 = 3
    ... 2  ?             We can form a 3×3 square!

    But if:              
    ... 1  3             min(1, 2, 3) + 1 = 2
    ... 2  ?             Limited by the '1' above!

=============================================================================
  APPROACH 1: Tabulation — O(M×N) Time, O(M×N) Space
=============================================================================

  dp table for example:
       0  1  2  3  4
  0 [  1  0  1  0  0 ]
  1 [  1  0  1  1  1 ]
  2 [  1  1  1  2  2 ]  ← 2×2 square found!
  3 [  1  0  0  1  0 ]

  maxSide = 2, Area = 2×2 = 4 ✓

=============================================================================
*/

function maximalSquareTab(matrix) {
    let m = matrix.length, n = matrix[0].length;
    let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    let maxSide = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                // min of top, diagonal, left → +1
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(M×N) Time, O(N) Space
=============================================================================

  dp[i][j] depends on dp[i-1][j], dp[i-1][j-1], dp[i][j-1].
  → Need prev row + diagonal value.

  Use prev[] for previous row, save diagonal before overwriting.

=============================================================================
*/

function maximalSquare(matrix) {
    let m = matrix.length, n = matrix[0].length;
    let prev = new Array(n + 1).fill(0);
    let maxSide = 0;

    for (let i = 1; i <= m; i++) {
        let curr = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                curr[j] = Math.min(prev[j], prev[j - 1], curr[j - 1]) + 1;
                maxSide = Math.max(maxSide, curr[j]);
            }
        }
        prev = curr;
    }
    return maxSide * maxSide;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maximalSquareTab([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
]));  // 4

console.log(maximalSquare([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
]));  // 4
