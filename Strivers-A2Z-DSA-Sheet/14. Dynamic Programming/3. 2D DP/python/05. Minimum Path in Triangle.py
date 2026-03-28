"""
  QUESTION: 120. Triangle — Minimum Path Sum (LeetCode)
  Example: [[2],[3,4],[6,5,7],[4,1,8,3]] → 11
"""
import sys; sys.setrecursionlimit(10000)

def minimum_total_memo(triangle):
    n = len(triangle)
    dp = [[-1]*(i+1) for i in range(n)]
    def solve(i, j):
        if i == n - 1: return triangle[i][j]
        if dp[i][j] != -1: return dp[i][j]
        dp[i][j] = min(solve(i+1, j), solve(i+1, j+1)) + triangle[i][j]
        return dp[i][j]
    return solve(0, 0)

def minimum_total(triangle):
    n = len(triangle)
    prev = triangle[n-1][:]
    for i in range(n-2, -1, -1):
        curr = [0] * (i + 1)
        for j in range(i, -1, -1):
            curr[j] = min(prev[j], prev[j+1]) + triangle[i][j]
        prev = curr
    return prev[0]

if __name__ == "__main__":
    print(minimum_total_memo([[2],[3,4],[6,5,7],[4,1,8,3]]))  # 11
    print(minimum_total([[2],[3,4],[6,5,7],[4,1,8,3]]))        # 11

