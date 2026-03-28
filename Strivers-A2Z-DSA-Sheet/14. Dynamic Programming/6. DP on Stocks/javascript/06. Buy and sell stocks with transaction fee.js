/*
=============================================================================
  QUESTION: 714. Best Time to Buy and Sell Stock with Transaction Fee
=============================================================================

  Unlimited transactions but DEDUCT fee on each sell.
  Example: [1,3,2,8,4,9], fee=2 → 8
    Txn1: buy@1 sell@8 = 7-2=5. Txn2: buy@4 sell@9 = 5-2=3. Total: 8

=============================================================================
  PATTERN: Same as Stock II, but subtract fee on sell
=============================================================================

  Transitions:
    Holding: SELL = prices[i] - fee + solve(i+1, 0) | HOLD = solve(i+1, 1)
    Not holding: BUY = -prices[i] + solve(i+1, 1) | SKIP = solve(i+1, 0)

=============================================================================
  APPROACH 1: Memoization — O(N×2) Time, O(N×2) Space
=============================================================================
*/

function maxProfitMemo(prices, fee) {
    let n = prices.length;
    let dp = Array.from({ length: n }, () => [-1, -1]);

    function solve(i, hold) {
        if (i === n) return 0;
        if (dp[i][hold] !== -1) return dp[i][hold];

        if (hold) {
            return dp[i][hold] = Math.max(
                prices[i] - fee + solve(i + 1, 0),  // sell (pay fee)
                solve(i + 1, 1)                       // hold
            );
        }
        return dp[i][hold] = Math.max(
            -prices[i] + solve(i + 1, 1),  // buy
            solve(i + 1, 0)                 // skip
        );
    }

    return solve(0, 0);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N) Time, O(1) Space
=============================================================================
*/

function maxProfit(prices, fee) {
    let nextNotHold = 0, nextHold = 0;

    for (let i = prices.length - 1; i >= 0; i--) {
        let currNotHold = Math.max(-prices[i] + nextHold, nextNotHold);
        let currHold = Math.max(prices[i] - fee + nextNotHold, nextHold);
        nextNotHold = currNotHold;
        nextHold = currHold;
    }
    return nextNotHold;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxProfitMemo([1, 3, 2, 8, 4, 9], 2));  // 8
console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));      // 8
