"""02. Min Cost to Cut Stick. Sort cuts, cost=stick length."""
import sys; sys.setrecursionlimit(10000)
def min_cost(n, cuts):
    c = [0] + sorted(cuts) + [n]; sz = len(c)
    dp = [[-1]*sz for _ in range(sz)]
    def solve(i, j):
        if i > j: return 0
        if dp[i][j] != -1: return dp[i][j]
        mn = float('inf')
        for k in range(i, j+1):
            cost = (c[j+1]-c[i-1]) + solve(i, k-1) + solve(k+1, j)
            mn = min(mn, cost)
        dp[i][j] = mn; return mn
    return solve(1, len(cuts))
if __name__ == "__main__": print(min_cost(7, [1,3,4,5]))  # 16

