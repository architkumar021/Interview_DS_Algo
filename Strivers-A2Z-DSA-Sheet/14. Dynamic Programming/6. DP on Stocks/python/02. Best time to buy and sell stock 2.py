"""02. Stock II. Unlimited txns. State: (day, holding). [7,1,5,3,6,4] → 7"""
import sys; sys.setrecursionlimit(10000)
def max_profit2(prices):
    n = len(prices); dp = [[-1]*2 for _ in range(n)]
    def solve(i, hold):
        if i == n: return 0
        if dp[i][hold] != -1: return dp[i][hold]
        if hold: dp[i][hold] = max(prices[i]+solve(i+1,0), solve(i+1,1))
        else: dp[i][hold] = max(-prices[i]+solve(i+1,1), solve(i+1,0))
        return dp[i][hold]
    return solve(0, 0)
if __name__ == "__main__": print(max_profit2([7,1,5,3,6,4]))  # 7

