"""
  QUESTION: 931. Minimum Falling Path Sum (LeetCode)
  n×n matrix. Start ANY col in row 0. Move down/diag-left/diag-right. Min sum.
  Example: [[2,1,3],[6,5,4],[7,8,9]] → 13
"""
import sys; sys.setrecursionlimit(10000)

def min_falling_path_sum_memo(matrix):
    n = len(matrix)
    dp = [[-1]*n for _ in range(n)]
    def solve(i, j):
        if j < 0 or j >= n: return float('inf')
        if i == 0: return matrix[0][j]
        if dp[i][j] != -1: return dp[i][j]
        dp[i][j] = min(solve(i-1,j-1), solve(i-1,j), solve(i-1,j+1)) + matrix[i][j]
        return dp[i][j]
    ans = float('inf')
    for j in range(n): ans = min(ans, solve(n-1, j))
    return ans

def min_falling_path_sum(matrix):
    n = len(matrix)
    prev = matrix[0][:]
    for i in range(1, n):
        curr = [0] * n
        for j in range(n):
            a = prev[j-1] if j > 0 else float('inf')
            b = prev[j]
            c = prev[j+1] if j < n-1 else float('inf')
            curr[j] = min(a, b, c) + matrix[i][j]
        prev = curr
    return min(prev)

if __name__ == "__main__":
    print(min_falling_path_sum_memo([[2,1,3],[6,5,4],[7,8,9]]))  # 13
    print(min_falling_path_sum([[2,1,3],[6,5,4],[7,8,9]]))       # 13

