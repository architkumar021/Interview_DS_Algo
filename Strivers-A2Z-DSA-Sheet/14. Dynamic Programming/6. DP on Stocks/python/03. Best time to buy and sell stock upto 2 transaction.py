"""03. Stock III. At most 2 txns. 3D: (day,hold,cap). [3,3,5,0,0,3,1,4] → 6"""
import sys; sys.setrecursionlimit(10000)
def max_profit3(prices):
    n = len(prices); dp = [[[-1]*3 for _ in range(2)] for _ in range(n)]
    def solve(i, hold, cap):
        if i == n or cap == 3: return 0
        if dp[i][hold][cap] != -1: return dp[i][hold][cap]
        if hold: dp[i][hold][cap] = max(prices[i]+solve(i+1,0,cap), solve(i+1,1,cap))
        else: dp[i][hold][cap] = max(-prices[i]+solve(i+1,1,cap+1), solve(i+1,0,cap))
        return dp[i][hold][cap]
    return solve(0, 0, 0)
if __name__ == "__main__": print(max_profit3([3,3,5,0,0,3,1,4]))  # 6

