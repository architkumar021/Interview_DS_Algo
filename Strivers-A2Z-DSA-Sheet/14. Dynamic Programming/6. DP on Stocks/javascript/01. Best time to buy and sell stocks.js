/*
=============================================================================
  QUESTION: 121. Best Time to Buy and Sell Stock (LeetCode)
=============================================================================

  Given prices[] where prices[i] = stock price on day i.
  ONE transaction only (buy once, sell once). Maximize profit.

  Example: [7,1,5,3,6,4] → 5 (buy@1 day1, sell@6 day4)
  Example: [7,6,4,3,1] → 0 (prices always decrease, no profit)

=============================================================================
  APPROACH: Greedy / Single Pass — O(N) Time, O(1) Space
=============================================================================

  Key Insight: For each day, if I sell today, I want to have bought at the
  LOWEST price seen so far. Track minPrice as we go.

  profit = max(prices[i] - minPrice)

  Dry Run: [7, 1, 5, 3, 6, 4]
    Day 0: price=7, minPrice=7, profit=0
    Day 1: price=1, minPrice=1, profit=0  ← new minimum found!
    Day 2: price=5, profit=max(0, 5-1)=4
    Day 3: price=3, profit=max(4, 3-1)=4
    Day 4: price=6, profit=max(4, 6-1)=5  ← new best profit!
    Day 5: price=4, profit=max(5, 4-1)=5
    Answer: 5 ✓

  Why this works:
  - We always know the best buy price so far (minPrice)
  - At each day we check: "if I sell today, what's my profit?"
  - We keep the best profit found

  Note: This is NOT a DP problem per se — it's greedy.
  But it's the foundation for DP on Stocks problems (Buy/Sell II, III, IV).

=============================================================================
*/

function maxProfit(prices) {
    let minPrice = prices[0];
    let ans = 0;

    for (let i = 1; i < prices.length; i++) {
        // If I sell today, my profit = today's price - lowest price seen
        ans = Math.max(ans, prices[i] - minPrice);
        // Update the lowest price seen so far
        minPrice = Math.min(minPrice, prices[i]);
    }
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxProfit([7, 1, 5, 3, 6, 4]));  // 5
console.log(maxProfit([7, 6, 4, 3, 1]));      // 0
