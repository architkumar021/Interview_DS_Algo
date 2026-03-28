/*
=============================================================================
  QUESTION: 309. Best Time to Buy and Sell Stock with Cooldown (LeetCode)
=============================================================================

  Unlimited transactions. After selling, must WAIT 1 day (cooldown).
  Maximize total profit.

  Example: [1,2,3,0,2] → 3 (buy@1 sell@3=2, cooldown, buy@0 sell@2=2 → wrong)
  Actually: buy@1 sell@3=2, wait, buy@0 sell@2=2? No overlaps. → 3

=============================================================================
  PATTERN: Same as Stock II but SELL → skip to i+2 (cooldown)
=============================================================================

  Transitions:
    Not holding: BUY = -p + solve(i+1, 1) | SKIP = solve(i+1, 0)
    Holding:     SELL = +p + solve(i+2, 0) | HOLD = solve(i+1, 1)
                                    ↑ skip next day (cooldown!)

  Base: i >= n → return 0

=============================================================================
  APPROACH 1: Memoization — O(N×2) Time, O(N×2) Space
=============================================================================
*/

function maxProfitMemo(prices) {
    let n = prices.length;
    let dp = Array.from({ length: n + 2 }, () => [-1, -1]);

    function solve(i, hold) {
        if (i >= n) return 0;
        if (dp[i][hold] !== -1) return dp[i][hold];

        if (hold) {
            return dp[i][hold] = Math.max(
                prices[i] + solve(i + 2, 0),   // SELL + cooldown (skip i+1)
                solve(i + 1, 1)                  // HOLD
            );
        }
        return dp[i][hold] = Math.max(
            -prices[i] + solve(i + 1, 1),   // BUY
            solve(i + 1, 0)                  // SKIP
        );
    }

    return solve(0, 0);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================
*/

function maxProfit(prices) {
    let n = prices.length;
    let dp = Array.from({ length: n + 2 }, () => [0, 0]);

    for (let i = n - 1; i >= 0; i--) {
        dp[i][0] = Math.max(-prices[i] + dp[i + 1][1], dp[i + 1][0]);
        dp[i][1] = Math.max(prices[i] + dp[i + 2][0], dp[i + 1][1]);  // i+2 for cooldown
    }
    return dp[0][0];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxProfitMemo([1, 2, 3, 0, 2]));  // 3
console.log(maxProfit([1, 2, 3, 0, 2]));      // 3
