/*
=============================================================================
  QUESTION: 70. Climbing Stairs (LeetCode)
=============================================================================

  Takes n steps to reach top. Each time climb 1 or 2 steps.
  How many DISTINCT ways to climb to the top?

  Example: n=3 → 3 ways (1+1+1, 1+2, 2+1)
  Example: n=5 → 8 ways

=============================================================================
  PATTERN: Same as Fibonacci!
=============================================================================

  At step i, you could have arrived from step i-1 (1 step) or i-2 (2 steps).
  f(n) = f(n-1) + f(n-2)
  f(1) = 1 (only 1 way: just 1 step)
  f(2) = 2 (two ways: 1+1 or 2)

  Recursion Tree for n=5:

                          climb(5)
                        /           \
                  climb(4)          climb(3)
                 /       \         /       \
           climb(3)   climb(2)  climb(2)  climb(1)
           /    \       ↓ 2      ↓ 2       ↓ 1
      climb(2) climb(1)
        ↓ 2      ↓ 1

  Without DP: O(2^N) — many repeated subproblems
  With DP:    O(N)   — each step computed once

=============================================================================
  APPROACH 1: Memoization — O(N) Time, O(N) Space
=============================================================================

  Dry Run n=5:
    solve(1) = 1, solve(2) = 2
    solve(3) = solve(2) + solve(1) = 2 + 1 = 3
    solve(4) = solve(3) + solve(2) = 3 + 2 = 5
    solve(5) = solve(4) + solve(3) = 5 + 3 = 8 ✓

=============================================================================
*/

// Memoization
function climbMemo(n) {
    let dp = new Array(n + 1).fill(-1);

    function solve(i) {
        // Base cases
        if (i <= 2) return i;

        // Return cached
        if (dp[i] !== -1) return dp[i];

        // Ways to reach step i = ways from (i-1) + ways from (i-2)
        return dp[i] = solve(i - 1) + solve(i - 2);
    }

    return solve(n);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================

  Dry Run n=5:
    dp[1]=1, dp[2]=2
    dp[3] = dp[2]+dp[1] = 3
    dp[4] = dp[3]+dp[2] = 5
    dp[5] = dp[4]+dp[3] = 8 ✓

    dp[] = [_, 1, 2, 3, 5, 8]

=============================================================================
*/

function climbTab(n) {
    if (n <= 2) return n;
    let dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  dp[i] depends only on dp[i-1] and dp[i-2] → 2 variables.

  Dry Run n=5:
    prev2=1 (step 1), prev1=2 (step 2)
    i=3: curr = 2+1 = 3 → prev2=2, prev1=3
    i=4: curr = 3+2 = 5 → prev2=3, prev1=5
    i=5: curr = 5+3 = 8 → prev2=5, prev1=8
    Answer: 8 ✓

=============================================================================
*/

function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(climbMemo(5));     // 8
console.log(climbTab(5));      // 8
console.log(climbStairs(5));   // 8

