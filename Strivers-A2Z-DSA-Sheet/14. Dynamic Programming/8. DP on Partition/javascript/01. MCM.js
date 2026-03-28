/*
=============================================================================
  QUESTION: Matrix Chain Multiplication (GFG)
=============================================================================

  Given dimensions array arr[] of n matrices. Matrix i has dimension
  arr[i-1] × arr[i]. Find minimum number of multiplications to multiply
  all matrices.

  Example: arr=[40, 20, 30, 10, 30]
  Matrices: A(40×20), B(20×30), C(30×10), D(10×30)
  Answer: 26000

=============================================================================
  PATTERN: Partition DP — Try ALL possible split points
=============================================================================

  Key idea: To multiply matrices i..j, we MUST split at some point k:
    cost = solve(i,k) + solve(k+1,j) + arr[i-1]*arr[k]*arr[j]
           ←left part→  ←right part→  ←cost to merge results→

  Try all k from i to j-1, take minimum.

  Base: i == j → 0 (single matrix, no multiplication)

  Example: arr=[40,20,30,10,30], matrices 1..4

  solve(1,4): try k=1,2,3
    k=1: solve(1,1)+solve(2,4)+40*20*30 = 0+solve(2,4)+24000
    k=2: solve(1,2)+solve(3,4)+40*30*30 = 24000+9000+36000 = 69000
    k=3: solve(1,3)+solve(4,4)+40*10*30 = ?+0+12000

  solve(2,4): try k=2,3
    k=2: solve(2,2)+solve(3,4)+20*30*30 = 0+9000+18000 = 27000
    k=3: solve(2,3)+solve(4,4)+20*10*30 = 6000+0+6000 = 12000
    → solve(2,4) = 12000

  solve(1,4) with k=1: 0+12000+24000 = 36000
  solve(1,3): try k=1,2
    k=1: 0+6000+40*20*10=8000 = 14000
    k=2: 24000+0+40*30*10=12000 = 36000
    → solve(1,3) = 14000
  solve(1,4) with k=3: 14000+0+12000 = 26000
  Answer: min(36000, 69000, 26000) = 26000 ✓

=============================================================================
  APPROACH 1: Memoization — O(N³) Time, O(N²) Space
=============================================================================
*/

function mcmMemo(arr) {
    let n = arr.length;
    let dp = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(i, j) {
        // Base: single matrix
        if (i === j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let mini = Infinity;
        // Try every partition point k
        for (let k = i; k < j; k++) {
            let cost = arr[i - 1] * arr[k] * arr[j]  // merge cost
                     + solve(i, k)                     // left part
                     + solve(k + 1, j);                // right part
            mini = Math.min(mini, cost);
        }
        return dp[i][j] = mini;
    }

    return solve(1, n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N³) Time, O(N²) Space
=============================================================================

  Fill diagonally: gap = length of chain - 1 (gap=0 is base case).
  For gap from 2 to n-1:
    For all valid (i,j) pairs with j-i = gap:
      Try all k in [i, j-1]

  Note: No further space optimization possible for partition DP
  since dp[i][j] depends on dp[i][k] and dp[k+1][j] — arbitrary ranges.

=============================================================================
*/

function matrixMultiplication(arr) {
    let n = arr.length;
    let dp = Array.from({ length: n }, () => new Array(n).fill(0));

    // gap: length of chain
    for (let gap = 2; gap < n; gap++) {
        for (let i = 1; i + gap - 1 < n; i++) {
            let j = i + gap - 1;
            dp[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                let cost = arr[i - 1] * arr[k] * arr[j] + dp[i][k] + dp[k + 1][j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n - 1];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(mcmMemo([40, 20, 30, 10, 30]));           // 26000
console.log(matrixMultiplication([40, 20, 30, 10, 30])); // 26000
