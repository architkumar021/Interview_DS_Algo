"""
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
                        /        \\
                   fib(4)         fib(3)       ← fib(3) computed TWICE
                  /      \\        /     \\
             fib(3)    fib(2)  fib(2)  fib(1)  ← fib(2) computed 3 TIMES
            /    \\     /   \\    /  \\
        fib(2) fib(1) f(1) f(0) f(1) f(0)

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
    solve(5) → dp[5]=-1, compute solve(4) + solve(3)
    solve(4) → dp[4]=-1, compute solve(3) + solve(2)
    solve(3) → dp[3]=-1, compute solve(2) + solve(1)
    solve(2) → dp[2]=-1, compute solve(1)+solve(0) = 1+0 = 1 → dp[2]=1
    solve(3) = dp[2]+1 = 2 → dp[3]=2
    solve(2) → dp[2]=1 ✓ (cached!)
    solve(4) = 2+1 = 3 → dp[4]=3
    solve(3) → dp[3]=2 ✓ (cached!)
    solve(5) = 3+2 = 5 → dp[5]=5 ✓

=============================================================================
"""


def fib_memo(n):
    # dp[i] = -1 means "not computed yet"
    dp = [-1] * (n + 1)

    def solve(i):
        # Base cases
        if i <= 1:
            return i

        # Check cache — avoid recomputation
        if dp[i] != -1:
            return dp[i]

        # Compute and store
        dp[i] = solve(i - 1) + solve(i - 2)
        return dp[i]

    return solve(n)


"""
=============================================================================
  APPROACH 2: Tabulation (Bottom-Up) — O(N) Time, O(N) Space
=============================================================================

  Dry Run n=6:
    dp = [0, 1, _, _, _, _, _]
    dp[2] = 0+1 = 1 → [0,1,1,_,_,_,_]
    dp[3] = 1+1 = 2 → [0,1,1,2,_,_,_]
    dp[4] = 2+1 = 3 → [0,1,1,2,3,_,_]
    dp[5] = 3+2 = 5 → [0,1,1,2,3,5,_]
    dp[6] = 5+3 = 8 → [0,1,1,2,3,5,8] ✓

  No recursion stack overhead — iterative = safer for large n.

=============================================================================
"""


def fib_tab(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


"""
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  dp[i] only depends on dp[i-1] and dp[i-2] → keep just 2 vars.

  Dry Run n=6:
    prev2=0, prev1=1
    i=2: curr=1  → prev2=1, prev1=1
    i=3: curr=2  → prev2=1, prev1=2
    i=4: curr=3  → prev2=2, prev1=3
    i=5: curr=5  → prev2=3, prev1=5
    i=6: curr=8  → prev2=5, prev1=8 ✓

=============================================================================
"""


def fib_opt(n):
    if n <= 1:
        return n

    prev2, prev1 = 0, 1

    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print("Memoization:", fib_memo(6))   # 8
    print("Tabulation:", fib_tab(6))     # 8
    print("Optimized:", fib_opt(6))      # 8
    print("Memoization:", fib_memo(10))  # 55
    print("Tabulation:", fib_tab(10))    # 55
    print("Optimized:", fib_opt(10))     # 55

