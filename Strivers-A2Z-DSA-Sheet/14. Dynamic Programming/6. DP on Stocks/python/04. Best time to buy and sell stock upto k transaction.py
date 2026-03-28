"""04. Stock IV. At most k txns. Example: k=2, [2,4,1] → 2"""
import sys; sys.setrecursionlimit(10000)
def max_profit4(k, prices):
    n = len(prices); dp = [[[-1]*(k+1) for _ in range(2)] for _ in range(n)]
    def solve(i, hold, cap):
        if i == n or cap == k+1: return 0
        if dp[i][hold][cap] != -1: return dp[i][hold][cap]
        if hold: dp[i][hold][cap] = max(prices[i]+solve(i+1,0,cap), solve(i+1,1,cap))
        else: dp[i][hold][cap] = max(-prices[i]+solve(i+1,1,cap+1), solve(i+1,0,cap))
        return dp[i][hold][cap]
    return solve(0, 0, 0)
if __name__ == "__main__": print(max_profit4(2, [2,4,1]))  # 2

