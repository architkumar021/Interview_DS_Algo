"""
=============================================================================
  QUESTION: Frog Jump (GFG) — Minimum Energy
=============================================================================

  Frog at stair 0 must reach stair n-1. Can jump 1 or 2 stairs.
  Energy cost = |height[i] - height[j]|. Find minimum total energy.

  Example: heights=[10,20,30,10] → 20 (0→1→3: |10-20|+|20-10|=20)

=============================================================================
  APPROACH 1: Memoization — O(N) Time, O(N) Space
=============================================================================
"""
import sys
sys.setrecursionlimit(10000)


def frog_memo(heights):
    n = len(heights)
    dp = [-1] * n

    def solve(i):
        if i == 0:
            return 0
        if dp[i] != -1:
            return dp[i]
        one = solve(i - 1) + abs(heights[i] - heights[i - 1])
        two = solve(i - 2) + abs(heights[i] - heights[i - 2]) if i >= 2 else float('inf')
        dp[i] = min(one, two)
        return dp[i]

    return solve(n - 1)


"""
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================
"""

def frog_tab(heights):
    n = len(heights)
    dp = [0] * n
    for i in range(1, n):
        one = dp[i - 1] + abs(heights[i] - heights[i - 1])
        two = dp[i - 2] + abs(heights[i] - heights[i - 2]) if i >= 2 else float('inf')
        dp[i] = min(one, two)
    return dp[n - 1]


"""
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================
"""

def frog_opt(heights):
    n = len(heights)
    prev2, prev1 = 0, 0
    for i in range(1, n):
        one = prev1 + abs(heights[i] - heights[i - 1])
        two = prev2 + abs(heights[i] - heights[i - 2]) if i >= 2 else float('inf')
        curr = min(one, two)
        prev2 = prev1
        prev1 = curr
    return prev1


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print(frog_memo([10, 20, 30, 10]))  # 20
    print(frog_tab([10, 20, 30, 10]))   # 20
    print(frog_opt([10, 20, 30, 10]))   # 20

