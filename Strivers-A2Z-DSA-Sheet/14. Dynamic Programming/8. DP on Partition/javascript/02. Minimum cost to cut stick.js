/*
=============================================================================
  QUESTION: 1547. Minimum Cost to Cut a Stick (LeetCode)
=============================================================================

  Stick of length n. Given positions to cut. Cost of a cut = length of stick
  being cut. Find minimum total cost.

  Example: n=7, cuts=[1,3,4,5] → 16

=============================================================================
  PATTERN: Partition DP (similar to MCM)
=============================================================================

  Sort cuts. Add boundaries: cuts = [0, ...sorted, n].
  solve(i, j) = min cost to make all cuts between positions i and j.
  
  For each cut k in [i..j], cost = stick length (cuts[j+1] - cuts[i-1])
  + solve(i, k-1) + solve(k+1, j).

  Try all k, take minimum. Base: i > j → 0.

=============================================================================
  APPROACH: Memoization — O(C³) Time, O(C²) Space (C = cuts.length)
=============================================================================
*/

function minCost(n, cuts) {
    let c = [0, ...cuts.sort((a, b) => a - b), n];
    let sz = c.length;
    let dp = Array.from({ length: sz }, () => new Array(sz).fill(-1));

    function solve(i, j) {
        if (i > j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let mini = Infinity;
        for (let k = i; k <= j; k++) {
            // Cost = length of current stick + left part + right part
            let cost = (c[j + 1] - c[i - 1]) + solve(i, k - 1) + solve(k + 1, j);
            mini = Math.min(mini, cost);
        }
        return dp[i][j] = mini;
    }

    return solve(1, cuts.length);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minCost(7, [1, 3, 4, 5]));  // 16
console.log(minCost(9, [5, 6, 1, 4, 2])); // 22
