/*
=============================================================================
  QUESTION: 122. Best Time to Buy and Sell Stock II (LeetCode)
=============================================================================

  Given prices[], you can buy/sell as many times as you want (UNLIMITED txns).
  Must sell before buying again. Maximize total profit.

  Example: [7,1,5,3,6,4] → 7 (buy@1 sell@5=4, buy@3 sell@6=3 → 4+3=7)
  Example: [1,2,3,4,5] → 4 (buy@1 sell@5, or buy/sell each day)

=============================================================================
  PATTERN: State Machine DP — (day, holding)
=============================================================================

  State: solve(day, holding)
    holding = 1: you currently hold a stock
    holding = 0: you don't hold a stock

  Transitions:
    If holding (hold=1):
      SELL:  +prices[day] + solve(day+1, 0)   ← sell and become not-holding
      HOLD:  solve(day+1, 1)                   ← keep holding

    If not holding (hold=0):
      BUY:   -prices[day] + solve(day+1, 1)   ← buy and become holding
      SKIP:  solve(day+1, 0)                   ← stay not-holding

  Base: day == n → return 0 (no more days)

  Dry Run: [7, 1, 5, 3, 6, 4]
    Day 0 (hold=0): buy@7 vs skip → skip (prices will drop)
    Day 1 (hold=0): buy@1 → holding=1
    Day 2 (hold=1): sell@5 → profit=4, holding=0
    Day 3 (hold=0): buy@3 → holding=1
    Day 4 (hold=1): sell@6 → profit=3, holding=0
    Day 5: done. Total: 4+3 = 7 ✓

=============================================================================
  APPROACH 1: Memoization — O(N×2) Time, O(N×2) Space
=============================================================================
*/

function maxProfitMemo(prices) {
    let n = prices.length;
    let dp = Array.from({ length: n }, () => [-1, -1]);

    function solve(i, hold) {
        // Base: past last day
        if (i === n) return 0;
        if (dp[i][hold] !== -1) return dp[i][hold];

        if (hold) {
            // SELL today or HOLD
            return dp[i][hold] = Math.max(
                prices[i] + solve(i + 1, 0),   // sell
                solve(i + 1, 1)                 // hold
            );
        } else {
            // BUY today or SKIP
            return dp[i][hold] = Math.max(
                -prices[i] + solve(i + 1, 1),  // buy
                solve(i + 1, 0)                 // skip
            );
        }
    }

    return solve(0, 0);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N×2) Time, O(N×2) Space
=============================================================================

  Fill from day n-1 back to day 0.
  dp[i][hold] = max profit from day i onward.

=============================================================================
*/

function maxProfitTab(prices) {
    let n = prices.length;
    let dp = Array.from({ length: n + 1 }, () => [0, 0]);

    for (let i = n - 1; i >= 0; i--) {
        // Not holding: buy or skip
        dp[i][0] = Math.max(-prices[i] + dp[i + 1][1], dp[i + 1][0]);
        // Holding: sell or hold
        dp[i][1] = Math.max(prices[i] + dp[i + 1][0], dp[i + 1][1]);
    }
    return dp[0][0];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  dp[i] only depends on dp[i+1] → just keep next[0] and next[1].

  Dry Run: [7, 1, 5, 3, 6, 4]
    Start: next = [0, 0]
    i=5: curr[0]=max(-4+0, 0)=0, curr[1]=max(4+0, 0)=4
    i=4: curr[0]=max(-6+4, 0)=-2→0, curr[1]=max(6+0, 4)=6
    i=3: curr[0]=max(-3+6, 0)=3, curr[1]=max(3+3, 6)=6
    i=2: curr[0]=max(-5+6, 3)=3, curr[1]=max(5+3, 6)=8
    i=1: curr[0]=max(-1+8, 3)=7, curr[1]=max(1+3, 8)=8
    i=0: curr[0]=max(-7+8, 7)=7
    Answer: 7 ✓

=============================================================================
*/

function maxProfit(prices) {
    let n = prices.length;
    let nextNotHold = 0, nextHold = 0;

    for (let i = n - 1; i >= 0; i--) {
        let currNotHold = Math.max(-prices[i] + nextHold, nextNotHold);
        let currHold = Math.max(prices[i] + nextNotHold, nextHold);
        nextNotHold = currNotHold;
        nextHold = currHold;
    }
    return nextNotHold;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxProfitMemo([7, 1, 5, 3, 6, 4]));  // 7
console.log(maxProfitTab([7, 1, 5, 3, 6, 4]));   // 7
console.log(maxProfit([7, 1, 5, 3, 6, 4]));      // 7
console.log(maxProfit([1, 2, 3, 4, 5]));          // 4
