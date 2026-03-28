/*
=============================================================================
  QUESTION: 931. Minimum Falling Path Sum (LeetCode)
=============================================================================

  n×n matrix. Start from ANY element in first row, reach last row.
  From (row, col) can move to: (row+1, col-1), (row+1, col), (row+1, col+1).
  Find minimum sum of any falling path.

  Example: [[2,1,3],[6,5,4],[7,8,9]] → 13

  Matrix:
    2  1  3     ← start at 1 (column 1)
    6  5  4     ← go to 5 (column 1)
    7  8  9     ← go to 7 (column 0)
  Path: 1→5→7 = 13 ✓

=============================================================================
  PATTERN: Variable Start, Variable End (Grid DP)
=============================================================================

  Unlike min path sum which starts at (0,0), here we can start from
  ANY column in row 0, and end at ANY column in last row.

  solve(i,j) = matrix[i][j] + min(solve(i-1,j-1), solve(i-1,j), solve(i-1,j+1))
  Base: i==0 → matrix[0][j]
  Answer: min(solve(n-1, j)) for all j

=============================================================================
  APPROACH 1: Memoization — O(N²) Time, O(N²) Space
=============================================================================

  Dry Run: [[2,1,3],[6,5,4],[7,8,9]]
    Row 0: dp = [2, 1, 3]
    solve(1,0) = 6 + min(∞, 2, 1) = 7
    solve(1,1) = 5 + min(2, 1, 3) = 6
    solve(1,2) = 4 + min(1, 3, ∞) = 5
    solve(2,0) = 7 + min(∞, 7, 6) = 13
    solve(2,1) = 8 + min(7, 6, 5) = 13
    solve(2,2) = 9 + min(6, 5, ∞) = 14
    Answer: min(13, 13, 14) = 13 ✓

=============================================================================
*/

function minFallingPathSumMemo(matrix) {
    let n = matrix.length;
    let dp = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(i, j) {
        // Out of bounds
        if (j < 0 || j >= n) return 1e9;
        // Base: first row
        if (i === 0) return matrix[0][j];
        if (dp[i][j] !== -1) return dp[i][j];

        // Three possible parents: up-left, up, up-right
        let a = solve(i - 1, j - 1);
        let b = solve(i - 1, j);
        let c = solve(i - 1, j + 1);
        return dp[i][j] = Math.min(a, b, c) + matrix[i][j];
    }

    // Try all columns in last row
    let ans = 1e9;
    for (let j = 0; j < n; j++) {
        ans = Math.min(ans, solve(n - 1, j));
    }
    return ans;
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N²) Time, O(N) Space
=============================================================================

  dp[i][j] depends on dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1] → just prev row.

  Dry Run: [[2,1,3],[6,5,4],[7,8,9]]
    prev = [2, 1, 3]
    i=1: curr = [7, 6, 5]
    i=2: curr = [13, 13, 14]
    Answer: min(13, 13, 14) = 13 ✓

=============================================================================
*/

function minFallingPathSum(matrix) {
    let n = matrix.length;
    let prev = [...matrix[0]];

    for (let i = 1; i < n; i++) {
        let curr = new Array(n);
        for (let j = 0; j < n; j++) {
            let a = j > 0 ? prev[j - 1] : 1e9;
            let b = prev[j];
            let c = j < n - 1 ? prev[j + 1] : 1e9;
            curr[j] = Math.min(a, b, c) + matrix[i][j];
        }
        prev = curr;
    }
    return Math.min(...prev);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minFallingPathSumMemo([[2,1,3],[6,5,4],[7,8,9]]));  // 13
console.log(minFallingPathSum([[2,1,3],[6,5,4],[7,8,9]]));      // 13

