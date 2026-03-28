"""
=============================================================================
  QUESTION: 62. Unique Paths (LeetCode)
=============================================================================

  Robot at top-left of m×n grid → bottom-right. Move down/right only.
  Example: m=3, n=7 → 28

=============================================================================
  Memoization → Tabulation → Space Optimized
=============================================================================
"""
import sys
sys.setrecursionlimit(10000)


def unique_paths_memo(m, n):
    dp = [[-1]*n for _ in range(m)]
    def solve(i, j):
        if i == 0 and j == 0: return 1
        if i < 0 or j < 0: return 0
        if dp[i][j] != -1: return dp[i][j]
        dp[i][j] = solve(i-1, j) + solve(i, j-1)
        return dp[i][j]
    return solve(m-1, n-1)


def unique_paths(m, n):
    prev = [0] * n
    for i in range(m):
        curr = [0] * n
        for j in range(n):
            if i == 0 and j == 0: curr[0] = 1; continue
            top = prev[j] if i > 0 else 0
            left = curr[j-1] if j > 0 else 0
            curr[j] = top + left
        prev = curr
    return prev[n-1]


if __name__ == "__main__":
    print(unique_paths_memo(3, 7))  # 28
    print(unique_paths(3, 7))       # 28

