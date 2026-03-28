"""
=============================================================================
  QUESTION: Frog K Jumps (GFG)
=============================================================================

  Frog at stair 0 → stair n-1. Can jump 1 to K stairs.
  Energy cost = |height[i] - height[j]|. Find minimum total energy.

  Example: heights=[10,40,30,10], k=2 → 20

=============================================================================
  APPROACH 1: Memoization — O(N×K) Time, O(N) Space
=============================================================================
"""
import sys
sys.setrecursionlimit(10000)


def frog_k_memo(heights, k):
    n = len(heights)
    dp = [-1] * n

    def solve(i):
        if i == 0:
            return 0
        if dp[i] != -1:
            return dp[i]
        ans = float('inf')
        for j in range(1, k + 1):
            if i - j >= 0:
                ans = min(ans, solve(i - j) + abs(heights[i] - heights[i - j]))
        dp[i] = ans
        return dp[i]

    return solve(n - 1)


"""
=============================================================================
  APPROACH 2: Tabulation — O(N×K) Time, O(N) Space
  No further space optimization — need K previous values.
=============================================================================
"""

def frog_k_tab(heights, k):
    n = len(heights)
    dp = [float('inf')] * n
    dp[0] = 0
    for i in range(1, n):
        for j in range(1, k + 1):
            if i - j >= 0:
                dp[i] = min(dp[i], dp[i - j] + abs(heights[i] - heights[i - j]))
    return dp[n - 1]


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print(frog_k_memo([10, 40, 30, 10], 2))  # 20
    print(frog_k_tab([10, 40, 30, 10], 2))   # 20

