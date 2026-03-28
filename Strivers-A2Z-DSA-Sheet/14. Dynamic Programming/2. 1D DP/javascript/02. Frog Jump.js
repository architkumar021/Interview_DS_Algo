/*
=============================================================================
  QUESTION: Frog Jump (GFG) — Minimum Energy
=============================================================================

  Frog at stair 0 must reach stair n-1. Can jump 1 or 2 stairs.
  Energy cost of jump from i to j = |height[i] - height[j]|.
  Find MINIMUM total energy to reach stair n-1.

  Example 1: heights = [10, 20, 30, 10]
  Paths:  0→1→2→3 = |10-20| + |20-30| + |30-10| = 10+10+20 = 40
          0→1→3   = |10-20| + |20-10| = 10+10 = 20    ← Minimum
          0→2→3   = |10-30| + |30-10| = 20+20 = 40
  Answer: 20

=============================================================================
  PATTERN: Pick/Not-Pick (1 step vs 2 step) — Minimize cost
=============================================================================

  Recursion Tree for heights = [10, 20, 30, 10] (n=4):

                         solve(3)
                        /         \
               solve(2)            solve(1)
              /       \                |
        solve(1)    solve(0)       solve(0)
           |          ↓ 0            ↓ 0
       solve(0)
         ↓ 0

  solve(i) = min( solve(i-1) + |h[i]-h[i-1]|,     ← 1-step jump
                  solve(i-2) + |h[i]-h[i-2]| )     ← 2-step jump

  Base case: solve(0) = 0 (already at stair 0, no cost)

=============================================================================
  APPROACH 1: Memoization (Top-Down) — O(N) Time, O(N) Space
=============================================================================

  Dry Run: heights = [10, 20, 30, 10]

    solve(3):
      one = solve(2) + |10-30| = ? + 20
      two = solve(1) + |10-20| = ? + 10
    solve(2):
      one = solve(1) + |30-20| = ? + 10
      two = solve(0) + |30-10| = 0 + 20 = 20
    solve(1):
      one = solve(0) + |20-10| = 0 + 10 = 10
      two = not possible (i-2 < 0)
    → dp[1] = 10
    → dp[2] = min(10+10, 20) = min(20, 20) = 20
    → dp[3] = min(20+20, 10+10) = min(40, 20) = 20 ✓

=============================================================================
*/

function frogMemo(heights) {
    let n = heights.length;
    let dp = new Array(n).fill(-1);

    function solve(i) {
        // Base case: at stair 0, no energy needed
        if (i === 0) return 0;

        // Return cached result
        if (dp[i] !== -1) return dp[i];

        // Option 1: Jump 1 step from (i-1)
        let one = solve(i - 1) + Math.abs(heights[i] - heights[i - 1]);

        // Option 2: Jump 2 steps from (i-2) — only if i >= 2
        let two = i >= 2
            ? solve(i - 2) + Math.abs(heights[i] - heights[i - 2])
            : Infinity;

        // Take minimum of both options
        return dp[i] = Math.min(one, two);
    }

    return solve(n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation (Bottom-Up) — O(N) Time, O(N) Space
=============================================================================

  Convert recursion to iteration:
    - dp[0] = 0 (base case)
    - dp[i] = min(dp[i-1] + |h[i]-h[i-1]|, dp[i-2] + |h[i]-h[i-2]|)
    - Answer: dp[n-1]

  Dry Run: heights = [10, 20, 30, 10]
    dp[0] = 0
    dp[1] = dp[0] + |20-10| = 0 + 10 = 10
    dp[2] = min(dp[1]+|30-20|, dp[0]+|30-10|) = min(20, 20) = 20
    dp[3] = min(dp[2]+|10-30|, dp[1]+|10-20|) = min(40, 20) = 20 ✓

=============================================================================
*/

function frogTab(heights) {
    let n = heights.length;
    let dp = new Array(n).fill(0);

    for (let i = 1; i < n; i++) {
        let one = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]);
        let two = i >= 2
            ? dp[i - 2] + Math.abs(heights[i] - heights[i - 2])
            : Infinity;
        dp[i] = Math.min(one, two);
    }
    return dp[n - 1];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  dp[i] only depends on dp[i-1] and dp[i-2] → use 2 variables.

  prev2 = dp[i-2], prev1 = dp[i-1]

  Dry Run: heights = [10, 20, 30, 10]
    Start: prev2=0, prev1=0
    i=1: one = 0+10=10, two=∞ → curr=10 → prev2=0, prev1=10
    i=2: one = 10+10=20, two=0+20=20 → curr=20 → prev2=10, prev1=20
    i=3: one = 20+20=40, two=10+10=20 → curr=20 → prev2=20, prev1=20
    Answer: 20 ✓

=============================================================================
*/

function frogOpt(heights) {
    let n = heights.length;
    let prev2 = 0, prev1 = 0;

    for (let i = 1; i < n; i++) {
        let one = prev1 + Math.abs(heights[i] - heights[i - 1]);
        let two = i >= 2
            ? prev2 + Math.abs(heights[i] - heights[i - 2])
            : Infinity;
        let curr = Math.min(one, two);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(frogMemo([10, 20, 30, 10]));  // 20
console.log(frogTab([10, 20, 30, 10]));   // 20
console.log(frogOpt([10, 20, 30, 10]));   // 20
console.log(frogOpt([10, 40, 30, 10]));   // 20

