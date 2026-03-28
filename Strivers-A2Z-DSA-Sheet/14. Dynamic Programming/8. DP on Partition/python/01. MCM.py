"""01. MCM. dp[i][j] = min mults for matrices i..j. O(N³)."""
import sys; sys.setrecursionlimit(10000)
def mcm(arr):
    n = len(arr); dp = [[-1]*n for _ in range(n)]
    def solve(i, j):
        if i == j: return 0
        if dp[i][j] != -1: return dp[i][j]
        mn = float('inf')
        for k in range(i, j):
            cost = arr[i-1]*arr[k]*arr[j] + solve(i, k) + solve(k+1, j)
            mn = min(mn, cost)
        dp[i][j] = mn; return mn
    return solve(1, n-1)
if __name__ == "__main__": print(mcm([40,20,30,10,30]))  # 26000

