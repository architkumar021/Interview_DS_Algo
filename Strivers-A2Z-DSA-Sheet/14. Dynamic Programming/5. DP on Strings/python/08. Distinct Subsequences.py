"""08. Distinct Subsequences. Example: "rabbbit","rabbit" → 3"""
import sys; sys.setrecursionlimit(10000)

def num_distinct(s, t):
    n, m = len(s), len(t)
    dp = [[-1]*m for _ in range(n)]
    def solve(i, j):
        if j < 0: return 1
        if i < 0: return 0
        if dp[i][j] != -1: return dp[i][j]
        if s[i] == t[j]: dp[i][j] = solve(i-1, j-1) + solve(i-1, j)
        else: dp[i][j] = solve(i-1, j)
        return dp[i][j]
    return solve(n-1, m-1)

if __name__ == "__main__":
    print(num_distinct("rabbbit", "rabbit"))  # 3
    print(num_distinct("babgbag", "bag"))      # 5

