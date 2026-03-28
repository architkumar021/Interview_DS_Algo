"""05. Stock with Cooldown. After sell, wait 1 day. [1,2,3,0,2] → 3"""
import sys; sys.setrecursionlimit(10000)
def max_profit_cooldown(prices):
    n = len(prices); dp = [[-1]*2 for _ in range(n+2)]
    def solve(i, hold):
        if i >= n: return 0
        if dp[i][hold] != -1: return dp[i][hold]
        if hold: dp[i][hold] = max(prices[i]+solve(i+2,0), solve(i+1,1))
        else: dp[i][hold] = max(-prices[i]+solve(i+1,1), solve(i+1,0))
        return dp[i][hold]
    return solve(0, 0)
if __name__ == "__main__": print(max_profit_cooldown([1,2,3,0,2]))  # 3

