/*
=============================================================================
  QUESTION: 123. Best Time to Buy and Sell Stock III (LeetCode)
=============================================================================

  At most 2 transactions. Maximize profit.

  Example: [3,3,5,0,0,3,1,4] → 6
    Txn 1: buy@0, sell@3 = 3
    Txn 2: buy@1, sell@4 = 3
    Total: 6

=============================================================================
  PATTERN: State Machine DP — (day, holding, cap)
=============================================================================

  State: solve(day, hold, cap)
    hold = 0/1 (holding stock or not)
    cap  = transactions used so far (0, 1, or 2)

  Transitions:
    If NOT holding:
      BUY:  -prices[i] + solve(i+1, 1, cap+1)   ← cap increments on BUY
      SKIP: solve(i+1, 0, cap)
    If holding:
      SELL: +prices[i] + solve(i+1, 0, cap)
      HOLD: solve(i+1, 1, cap)

  Base: i==n or cap==3 → return 0

  Dry Run: [3,3,5,0,0,3,1,4]
    Buy@0, sell@5: +3. Buy@1 sell@4: +3. Total: 6 ✓

=============================================================================
  APPROACH 1: Memoization — O(N×2×3) Time, O(N×2×3) Space
=============================================================================
*/

function maxProfitMemo(prices) {
    let n = prices.length;
    let dp = Array.from({ length: n }, () =>
        Array.from({ length: 2 }, () => new Array(3).fill(-1)));

    function solve(i, hold, cap) {
        if (i === n || cap === 3) return 0;
        if (dp[i][hold][cap] !== -1) return dp[i][hold][cap];

        if (hold) {
            // SELL or HOLD
            return dp[i][hold][cap] = Math.max(
                prices[i] + solve(i + 1, 0, cap),  // sell
                solve(i + 1, 1, cap)                 // hold
            );
        } else {
            // BUY (use cap) or SKIP
            return dp[i][hold][cap] = Math.max(
                -prices[i] + solve(i + 1, 1, cap + 1),  // buy
                solve(i + 1, 0, cap)                      // skip
            );
        }
    }

    return solve(0, 0, 0);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  Use 4 variables tracking 2 transactions:
    buy1  = max profit after 1st buy
    sell1 = max profit after 1st sell
    buy2  = max profit after 2nd buy
    sell2 = max profit after 2nd sell

=============================================================================
*/

function maxProfit(prices) {
    let buy1 = -Infinity, sell1 = 0;
    let buy2 = -Infinity, sell2 = 0;

    for (let p of prices) {
        buy1 = Math.max(buy1, -p);          // buy 1st
        sell1 = Math.max(sell1, buy1 + p);   // sell 1st
        buy2 = Math.max(buy2, sell1 - p);    // buy 2nd (reinvest profit)
        sell2 = Math.max(sell2, buy2 + p);   // sell 2nd
    }
    return sell2;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxProfitMemo([3, 3, 5, 0, 0, 3, 1, 4]));  // 6
console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));      // 6
console.log(maxProfit([1, 2, 3, 4, 5]));                 // 4
