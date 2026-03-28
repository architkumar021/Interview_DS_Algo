/*
=============================================================================
  QUESTION: Unbounded Knapsack (GFG)
=============================================================================

  Same as 0/1 Knapsack but each item can be taken UNLIMITED times.
  Maximize total value within weight limit W.

  Example: wt=[2,1], val=[1,1], W=3
    Pick item 1 (wt=1) three times: val=1×3=3 ✓

=============================================================================
  KEY DIFFERENCE FROM 0/1 KNAPSACK
=============================================================================

  0/1 Knapsack:      PICK → solve(i-1, w-wt[i])    ← move to i-1 (can't reuse)
  Unbounded Knapsack: PICK → solve(i, w-wt[i])      ← STAY at i (can reuse!)

  Base case: i==0 → can take item 0 unlimited times → floor(w/wt[0]) * val[0]

=============================================================================
  APPROACH 1: Memoization — O(N×W) Time, O(N×W) Space
=============================================================================

  Dry Run: wt=[2,1], val=[1,1], W=3
    solve(0, w): floor(w/2)*1 → w=0:0, w=1:0, w=2:1, w=3:1
    solve(1, 3): pick=1+solve(1,2), skip=solve(0,3)=1
    solve(1, 2): pick=1+solve(1,1), skip=solve(0,2)=1
    solve(1, 1): pick=1+solve(1,0)=1, skip=solve(0,1)=0 → 1
    dp[1][2] = max(1+1, 1) = 2
    dp[1][3] = max(1+2, 1) = 3 ✓

=============================================================================
*/

function unboundedKnapsackMemo(wt, val, W) {
    let n = wt.length;
    let dp = Array.from({ length: n }, () => new Array(W + 1).fill(-1));

    function solve(i, w) {
        // Base: first item only — take as many as fit
        if (i === 0) return w >= wt[0] ? Math.floor(w / wt[0]) * val[0] : 0;
        if (dp[i][w] !== -1) return dp[i][w];

        // PICK: stay at i (unlimited!), NOT-PICK: move to i-1
        let take = w >= wt[i] ? val[i] + solve(i, w - wt[i]) : -Infinity;
        let skip = solve(i - 1, w);
        return dp[i][w] = Math.max(take, skip);
    }

    return solve(n - 1, W);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N×W) Time, O(W) Space
=============================================================================

  pick uses curr[w-wt[i]] (SAME row — unbounded, left to right!).
  skip uses prev[w].

=============================================================================
*/

function unboundedKnapsack(wt, val, W) {
    let n = wt.length;
    let prev = new Array(W + 1).fill(0);
    for (let w = 0; w <= W; w++) {
        prev[w] = w >= wt[0] ? Math.floor(w / wt[0]) * val[0] : 0;
    }

    for (let i = 1; i < n; i++) {
        let curr = new Array(W + 1).fill(0);
        for (let w = 0; w <= W; w++) {
            // curr[w-wt[i]] not prev — because we can reuse item i!
            let take = w >= wt[i] ? val[i] + curr[w - wt[i]] : -Infinity;
            curr[w] = Math.max(take, prev[w]);
        }
        prev = curr;
    }
    return prev[W];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(unboundedKnapsackMemo([2, 1], [1, 1], 3));  // 3
console.log(unboundedKnapsack([2, 1], [1, 1], 3));      // 3
