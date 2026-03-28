"""
=============================================================================
  QUESTION: 70. Climbing Stairs (LeetCode)
=============================================================================

  Takes n steps to reach top. Each time climb 1 or 2 steps.
  How many distinct ways to climb to the top?

  Example: n=3 → 3 (1+1+1, 1+2, 2+1), n=5 → 8

=============================================================================
  APPROACH 1: Memoization — O(N) Time, O(N) Space
=============================================================================

  f(n) = f(n-1) + f(n-2). Same as Fibonacci!
  f(1) = 1, f(2) = 2.

=============================================================================
"""

def climb_memo(n):
    dp = [-1] * (n + 1)

    def solve(i):
        if i <= 2:
            return i
        if dp[i] != -1:
            return dp[i]
        dp[i] = solve(i - 1) + solve(i - 2)
        return dp[i]

    return solve(n)


"""
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================
"""

def climb_tab(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]


"""
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================
"""

def climb_stairs(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print(climb_memo(5))     # 8
    print(climb_tab(5))      # 8
    print(climb_stairs(5))   # 8

