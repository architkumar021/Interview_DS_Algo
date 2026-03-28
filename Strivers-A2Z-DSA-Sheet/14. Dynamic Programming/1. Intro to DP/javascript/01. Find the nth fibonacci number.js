/*
=============================================================================
  QUESTION: Find the Nth Fibonacci Number
=============================================================================

  Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...
  F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)

  Example: n=6 → 8, n=10 → 55

=============================================================================
  WHY DP? — Overlapping Subproblems
=============================================================================

  Plain recursion recalculates the same values repeatedly.

  Recursion Tree for fib(5):

                          fib(5)
                        /        \
                   fib(4)         fib(3)       ← fib(3) computed TWICE
                  /      \        /     \
             fib(3)    fib(2)  fib(2)  fib(1)  ← fib(2) computed 3 TIMES
            /    \     /   \    /  \
        fib(2) fib(1) f(1) f(0) f(1) f(0)
        / \
     f(1) f(0)

  Without DP: O(2^N) Time — exponential!
  With DP:    O(N) Time — each subproblem solved only ONCE.

=============================================================================
  APPROACH 1: Memoization (Top-Down) — O(N) Time, O(N) Space
=============================================================================

  How it works:
  1. Create dp[] array initialized to -1 (meaning "not computed yet").
  2. Recurse naturally: fib(n) = fib(n-1) + fib(n-2).
  3. Before computing, check dp[i] — if != -1, return cached value.
  4. After computing, store result in dp[i].

  Dry Run n=5:
    solve(5) → dp[5] = -1, compute solve(4) + solve(3)
    solve(4) → dp[4] = -1, compute solve(3) + solve(2)
    solve(3) → dp[3] = -1, compute solve(2) + solve(1)
    solve(2) → dp[2] = -1, compute solve(1) + solve(0) = 1 + 0 = 1 → dp[2]=1
    solve(1) → base case → return 1
    solve(3) = dp[2] + 1 = 1 + 1 = 2 → dp[3]=2
    solve(2) → dp[2]=1 ✓ (cached! no recomputation)
    solve(4) = 2 + 1 = 3 → dp[4]=3
    solve(3) → dp[3]=2 ✓ (cached!)
    solve(5) = 3 + 2 = 5 → dp[5]=5 ✓

  dp[] = [-1, 1, 1, 2, 3, 5]  →  Answer: 5

=============================================================================
*/

function fibMemo(n) {
    // dp[i] = -1 means "not computed yet"
    let dp = new Array(n + 1).fill(-1);

    function solve(i) {
        // Base cases
        if (i <= 1) return i;

        // Check cache — avoid recomputation
        if (dp[i] !== -1) return dp[i];

        // Compute and store
        return dp[i] = solve(i - 1) + solve(i - 2);
    }

    return solve(n);
}

/*
=============================================================================
  APPROACH 2: Tabulation (Bottom-Up) — O(N) Time, O(N) Space
=============================================================================

  How it works:
  1. Create dp[] array of size n+1.
  2. Set base cases: dp[0] = 0, dp[1] = 1.
  3. Fill left-to-right: dp[i] = dp[i-1] + dp[i-2].
  4. Answer is dp[n].

  Dry Run n=6:
    dp[0]=0, dp[1]=1
    dp[2] = dp[1] + dp[0] = 1 + 0 = 1
    dp[3] = dp[2] + dp[1] = 1 + 1 = 2
    dp[4] = dp[3] + dp[2] = 2 + 1 = 3
    dp[5] = dp[4] + dp[3] = 3 + 2 = 5
    dp[6] = dp[5] + dp[4] = 5 + 3 = 8 ✓

  dp[] = [0, 1, 1, 2, 3, 5, 8]

  Why better than memoization?
  - No recursion stack overhead (no stack overflow for large n).
  - Same time and space complexity, but iterative = faster in practice.

=============================================================================
*/

function fibTab(n) {
    if (n <= 1) return n;

    let dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  Observation: dp[i] only depends on dp[i-1] and dp[i-2].
  → We don't need the entire array! Just keep 2 variables.

  prev2 = dp[i-2], prev1 = dp[i-1]

  Dry Run n=6:
    Start: prev2=0 (fib0), prev1=1 (fib1)
    i=2: curr = 1+0 = 1  → prev2=1, prev1=1
    i=3: curr = 1+1 = 2  → prev2=1, prev1=2
    i=4: curr = 2+1 = 3  → prev2=2, prev1=3
    i=5: curr = 3+2 = 5  → prev2=3, prev1=5
    i=6: curr = 5+3 = 8  → prev2=5, prev1=8
    Answer: prev1 = 8 ✓

=============================================================================
*/

function fibOpt(n) {
    if (n <= 1) return n;

    let prev2 = 0, prev1 = 1;

    for (let i = 2; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log("Memoization:", fibMemo(6));   // 8
console.log("Tabulation:", fibTab(6));     // 8
console.log("Optimized:", fibOpt(6));      // 8
console.log("Memoization:", fibMemo(10));  // 55
console.log("Tabulation:", fibTab(10));    // 55
console.log("Optimized:", fibOpt(10));     // 55

