/*
=============================================================================
  QUESTION: 188. Best Time to Buy and Sell Stock IV (LeetCode)
=============================================================================

  At most K transactions. Maximize profit.
  Generalized version of Stock III (which is K=2).

  Example: k=2, [2,4,1] → 2 (buy@2 sell@4)
  Example: k=2, [3,2,6,5,0,3] → 7 (buy@2 sell@6=4, buy@0 sell@3=3)

=============================================================================
  PATTERN: Same as Stock III, replace cap limit 3 with k+1
=============================================================================

  State: solve(day, hold, cap) where cap = txns completed (0 to k)
  Transitions are identical to Stock III.

  Time: O(N × 2 × K), Space: O(N × 2 × K)

=============================================================================
  APPROACH: Memoization — O(N×2×K) Time, O(N×2×K) Space
=============================================================================
*/

function maxProfit(k, prices) {
    let n = prices.length;
    let dp = Array.from({ length: n }, () =>
        Array.from({ length: 2 }, () => new Array(k + 1).fill(-1)));

    function solve(i, hold, cap) {
        if (i === n || cap === k + 1) return 0;
        if (dp[i][hold][cap] !== -1) return dp[i][hold][cap];

        if (hold) {
            return dp[i][hold][cap] = Math.max(
                prices[i] + solve(i + 1, 0, cap),   // sell
                solve(i + 1, 1, cap)                  // hold
            );
        }
        return dp[i][hold][cap] = Math.max(
            -prices[i] + solve(i + 1, 1, cap + 1),  // buy (cap++)
            solve(i + 1, 0, cap)                      // skip
        );
    }

    return solve(0, 0, 0);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxProfit(2, [2, 4, 1]));         // 2
console.log(maxProfit(2, [3, 2, 6, 5, 0, 3])); // 7
