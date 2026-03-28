"""
  QUESTION: 64. Minimum Path Sum (LeetCode)
  m×n grid. Top-left → bottom-right. Move down/right. Minimize sum.
  Example: [[1,3,1],[1,5,1],[4,2,1]] → 7
"""
import sys; sys.setrecursionlimit(10000)

def min_path_sum_memo(grid):
    m, n = len(grid), len(grid[0])
    dp = [[-1]*n for _ in range(m)]
    def solve(i, j):
        if i == 0 and j == 0: return grid[0][0]
        if i < 0 or j < 0: return float('inf')
        if dp[i][j] != -1: return dp[i][j]
        dp[i][j] = min(solve(i-1, j), solve(i, j-1)) + grid[i][j]
        return dp[i][j]
    return solve(m-1, n-1)

def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    prev = [0] * n
    for i in range(m):
        curr = [0] * n
        for j in range(n):
            if i == 0 and j == 0: curr[j] = grid[0][0]; continue
            top = prev[j] if i > 0 else float('inf')
            left = curr[j-1] if j > 0 else float('inf')
            curr[j] = min(top, left) + grid[i][j]
        prev = curr
    return prev[n-1]

if __name__ == "__main__":
    print(min_path_sum_memo([[1,3,1],[1,5,1],[4,2,1]]))  # 7
    print(min_path_sum([[1,3,1],[1,5,1],[4,2,1]]))       # 7

