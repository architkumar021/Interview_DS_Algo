/*
=============================================================================
  QUESTION: Frog K Jumps (GFG) — Generalized Frog Jump
=============================================================================

  Frog at stair 0 → stair n-1. Can jump 1 to K stairs at a time.
  Energy cost of jump from i to j = |height[i] - height[j]|.
  Find MINIMUM total energy to reach stair n-1.

  Example: heights=[10,40,30,10], k=2 → 20
  (Same as regular Frog Jump when k=2)

  Example: heights=[10,40,30,10], k=3
  Can jump 0→3 directly: |10-10| = 0. Answer: 0!

=============================================================================
  GENERALIZATION FROM FROG JUMP
=============================================================================

  Frog Jump (k=2): solve(i) = min(from i-1, from i-2)
  Frog K Jumps:    solve(i) = min over j=1..k of (from i-j)

  solve(i) = min { solve(i-j) + |h[i] - h[i-j]| } for j=1 to k, where i-j >= 0

  Recursion Tree for heights=[10,40,30,10], k=3:

                         solve(3)
                       /     |       \
               solve(2)   solve(1)   solve(0)
              /    |         |          ↓ 0
        solve(1) solve(0)  solve(0)
           |       ↓ 0      ↓ 0
        solve(0)
          ↓ 0

=============================================================================
  APPROACH 1: Memoization — O(N×K) Time, O(N) Space
=============================================================================

  Dry Run: heights=[10,40,30,10], k=2
    solve(0) = 0
    solve(1): j=1 → solve(0)+|40-10| = 30  → dp[1]=30
    solve(2): j=1 → solve(1)+|30-40| = 40
              j=2 → solve(0)+|30-10| = 20  → dp[2]=20
    solve(3): j=1 → solve(2)+|10-30| = 40
              j=2 → solve(1)+|10-40| = 60  → dp[3]=40

  Wait, with k=3:
    solve(3): j=1 → 20+20=40, j=2 → 30+30=60, j=3 → 0+0=0 → dp[3]=0 ✓

=============================================================================
*/

function frogKMemo(heights, k) {
    let n = heights.length;
    let dp = new Array(n).fill(-1);

    function solve(i) {
        // Base: at stair 0, no cost
        if (i === 0) return 0;

        // Return cached
        if (dp[i] !== -1) return dp[i];

        // Try all jumps from 1 to k
        let minCost = Infinity;
        for (let j = 1; j <= k && i - j >= 0; j++) {
            let cost = solve(i - j) + Math.abs(heights[i] - heights[i - j]);
            minCost = Math.min(minCost, cost);
        }
        return dp[i] = minCost;
    }

    return solve(n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N×K) Time, O(N) Space
=============================================================================

  Dry Run: heights=[10,40,30,10], k=2
    dp = [0, ∞, ∞, ∞]
    i=1: j=1 → dp[0]+30=30 → dp[1]=30
    i=2: j=1 → dp[1]+10=40, j=2 → dp[0]+20=20 → dp[2]=20
    i=3: j=1 → dp[2]+20=40, j=2 → dp[1]+30=60 → dp[3]=40

  Note: Space optimization to O(1) is NOT possible here because
  dp[i] depends on up to K previous values (not just 2).

=============================================================================
*/

function frogKTab(heights, k) {
    let n = heights.length;
    let dp = new Array(n).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= k && i - j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j] + Math.abs(heights[i] - heights[i - j]));
        }
    }
    return dp[n - 1];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(frogKMemo([10, 40, 30, 10], 2));  // 40
console.log(frogKTab([10, 40, 30, 10], 2));   // 40
console.log(frogKMemo([10, 40, 30, 10], 3));  // 0
console.log(frogKTab([10, 40, 30, 10], 3));   // 0
