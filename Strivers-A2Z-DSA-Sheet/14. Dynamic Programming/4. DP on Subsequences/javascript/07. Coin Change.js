/*
=============================================================================
  QUESTION: 322. Coin Change (LeetCode)
=============================================================================

  Given coins of different denominations and a total amount.
  Return FEWEST coins to make that amount. Return -1 if impossible.
  Each coin can be used UNLIMITED times.

  Example: coins=[1,2,5], amount=11
    11 = 5+5+1 → 3 coins  ← Minimum
    11 = 5+2+2+2 → 4 coins
    Answer: 3

=============================================================================
  PATTERN: Unbounded Pick / Not-Pick
=============================================================================

  Key difference from 0/1 Knapsack:
    - 0/1 Knapsack: after picking item i → move to i-1 (can't reuse)
    - Coin Change: after picking coin i → STAY at i (can reuse!)

  solve(i, amt) = min coins using coins[0..i] to make amount amt

  At each coin i:
    PICK:     1 + solve(i, amt - coins[i])     ← STAY at i (unlimited use!)
    NOT-PICK: solve(i-1, amt)                   ← move to next coin

  Base cases:
    amt == 0 → 0 (no coins needed)
    i == 0   → amt divisible by coins[0]? amt/coins[0] : impossible (1e9)

  Recursion Tree for coins=[1,2,5], amt=7 (simplified):

                          solve(2, 7)
                         /            \
              pick: 1+solve(2,2)    skip: solve(1,7)
                   /        \         /          \
        pick:1+solve(2,-3)  skip:solve(1,2)  pick:1+solve(1,5)  skip:solve(0,7)
              ↓ invalid                          ...              7/1=7

=============================================================================
  APPROACH 1: Memoization — O(N×amount) Time, O(N×amount) Space
=============================================================================

  Dry Run: coins=[1,2,5], amount=11

    solve(2,11): pick=1+solve(2,6), skip=solve(1,11)
    solve(2,6):  pick=1+solve(2,1), skip=solve(1,6)
    solve(2,1):  5>1 can't pick. skip=solve(1,1)
    solve(1,1):  2>1 can't pick. skip=solve(0,1) = 1/1 = 1
    dp[1][1] = 1
    dp[2][1] = 1
    solve(1,6): pick=1+solve(1,4), skip=solve(0,6) = 6
    solve(1,4): pick=1+solve(1,2), skip=solve(0,4) = 4
    solve(1,2): pick=1+solve(1,0)=1+0=1, skip=solve(0,2)=2 → min(1,2) = 1
    dp[1][4] = min(1+1, 4) = 2
    dp[1][6] = min(1+2, 6) = 3
    dp[2][6] = min(1+1, 3) = 2   (5+1=6 → 2 coins)
    dp[2][11] = min(1+2, ...) = 3 (5+5+1=11 → 3 coins) ✓

=============================================================================
*/

function coinChangeMemo(coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n }, () => new Array(amount + 1).fill(-1));

    function solve(i, amt) {
        // Base: amount achieved
        if (amt === 0) return 0;

        // Base: only first coin available
        if (i === 0) return amt % coins[0] === 0 ? Math.floor(amt / coins[0]) : 1e9;

        // Return cached
        if (dp[i][amt] !== -1) return dp[i][amt];

        // PICK: use coin[i], STAY at i (unlimited!)
        let take = coins[i] <= amt ? 1 + solve(i, amt - coins[i]) : 1e9;

        // NOT-PICK: skip this coin
        let skip = solve(i - 1, amt);

        return dp[i][amt] = Math.min(take, skip);
    }

    let ans = solve(n - 1, amount);
    return ans >= 1e9 ? -1 : ans;
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N×amount) Time, O(N×amount) Space
=============================================================================

  2D table: dp[i][amt] = min coins using coins[0..i] for amount amt.

  Base row (i=0):
    dp[0][amt] = amt/coins[0] if divisible, else 1e9

  Transition:
    dp[i][amt] = min(1 + dp[i][amt-coins[i]],   ← pick (SAME row! unlimited)
                     dp[i-1][amt])                ← skip (prev row)

=============================================================================
*/

function coinChangeTab(coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n }, () => new Array(amount + 1).fill(1e9));

    // Base row: first coin only
    for (let a = 0; a <= amount; a++) {
        dp[0][a] = a % coins[0] === 0 ? Math.floor(a / coins[0]) : 1e9;
    }

    for (let i = 1; i < n; i++) {
        dp[i][0] = 0;  // 0 amount = 0 coins
        for (let a = 1; a <= amount; a++) {
            let take = coins[i] <= a ? 1 + dp[i][a - coins[i]] : 1e9;
            dp[i][a] = Math.min(take, dp[i - 1][a]);
        }
    }
    return dp[n - 1][amount] >= 1e9 ? -1 : dp[n - 1][amount];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N×amount) Time, O(amount) Space
=============================================================================

  Key: pick uses dp[i][amt-coins[i]] → SAME row (curr, not prev).
       skip uses dp[i-1][amt] → previous row (prev).

  So we use curr[a - coins[i]] (already computed in current iteration)
  and prev[a] from previous row.

=============================================================================
*/

function coinChange(coins, amount) {
    let n = coins.length;
    let prev = new Array(amount + 1).fill(1e9);

    // Base: first coin only
    for (let a = 0; a <= amount; a++) {
        prev[a] = a % coins[0] === 0 ? Math.floor(a / coins[0]) : 1e9;
    }

    for (let i = 1; i < n; i++) {
        let curr = new Array(amount + 1).fill(1e9);
        curr[0] = 0;
        for (let a = 1; a <= amount; a++) {
            // pick: curr[a-coins[i]] (same row → already computed left to right!)
            let take = coins[i] <= a ? 1 + curr[a - coins[i]] : 1e9;
            // skip: prev[a]
            curr[a] = Math.min(take, prev[a]);
        }
        prev = curr;
    }
    return prev[amount] >= 1e9 ? -1 : prev[amount];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(coinChangeMemo([1, 2, 5], 11));  // 3
console.log(coinChangeTab([1, 2, 5], 11));   // 3
console.log(coinChange([1, 2, 5], 11));      // 3
console.log(coinChange([2], 3));              // -1

