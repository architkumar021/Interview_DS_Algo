/*
=============================================================================
  QUESTION: 518. Coin Change 2 (LeetCode) — Count Combinations
=============================================================================

  Given coins and amount, return NUMBER of combinations to make amount.
  Unlimited supply of each coin. Order doesn't matter.

  Example: coins=[1,2,5], amount=5 → 4
    Combinations: {5}, {2+2+1}, {2+1+1+1}, {1+1+1+1+1}

=============================================================================
  PATTERN: Unbounded Pick/Not-Pick (Count, not Min)
=============================================================================

  solve(i, amt) = number of ways using coins[0..i] to make amount amt

    PICK:     solve(i, amt - coins[i])    ← STAY at i (unlimited!)
    NOT-PICK: solve(i-1, amt)              ← move to next coin

    Result: pick + skip (count ALL ways)

  Base cases:
    amt == 0 → 1 (one way: take nothing)
    i == 0   → amt % coins[0] == 0 ? 1 : 0

  Difference from Coin Change (minimum):
    - Coin Change: min(take, skip) — minimize
    - Coin Change 2: take + skip — count all

  Dry Run: coins=[1,2,5], amount=5
    solve(2,5): pick=solve(2,0)=1, skip=solve(1,5)
    solve(1,5): pick=solve(1,3), skip=solve(0,5)=1
    solve(1,3): pick=solve(1,1), skip=solve(0,3)=1
    solve(1,1): pick→2>1→0, skip=solve(0,1)=1 → 1
    dp[1][3] = 0 + 1 + 1 = 2
    dp[1][5] = solve(1,3) + 1 = 2 + 1 = 3
    dp[2][5] = 1 + 3 = 4 ✓

=============================================================================
  APPROACH 1: Memoization — O(N×amount) Time, O(N×amount) Space
=============================================================================
*/

function changeMemo(coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n }, () => new Array(amount + 1).fill(-1));

    function solve(i, amt) {
        if (amt === 0) return 1;        // one way: take nothing
        if (i === 0) return amt % coins[0] === 0 ? 1 : 0;
        if (dp[i][amt] !== -1) return dp[i][amt];

        // PICK: stay at i (unlimited), NOT-PICK: move to i-1
        let take = coins[i] <= amt ? solve(i, amt - coins[i]) : 0;
        let skip = solve(i - 1, amt);
        return dp[i][amt] = take + skip;
    }

    return solve(n - 1, amount);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N×amount) Time, O(amount) Space
=============================================================================

  pick uses curr[a - coins[i]] (same row, unbounded).
  skip uses prev[a].

=============================================================================
*/

function change(coins, amount) {
    let n = coins.length;
    let prev = new Array(amount + 1).fill(0);
    for (let a = 0; a <= amount; a++) {
        prev[a] = a % coins[0] === 0 ? 1 : 0;
    }

    for (let i = 1; i < n; i++) {
        let curr = new Array(amount + 1).fill(0);
        for (let a = 0; a <= amount; a++) {
            let take = coins[i] <= a ? curr[a - coins[i]] : 0;
            curr[a] = take + prev[a];
        }
        prev = curr;
    }
    return prev[amount];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(changeMemo([1, 2, 5], 5));  // 4
console.log(change([1, 2, 5], 5));      // 4
console.log(change([2], 3));             // 0

