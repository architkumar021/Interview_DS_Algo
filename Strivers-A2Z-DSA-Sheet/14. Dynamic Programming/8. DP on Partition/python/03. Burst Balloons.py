"""03. Burst Balloons. Think: last balloon to burst in range."""
import sys; sys.setrecursionlimit(10000)
def max_coins(nums):
    nums = [1] + nums + [1]; n = len(nums)
    dp = [[-1]*n for _ in range(n)]
    def solve(i, j):
        if j < i: return 0
        if dp[i][j] != -1: return dp[i][j]
        ans = 0
        for k in range(i, j+1):
            coins = nums[i-1]*nums[k]*nums[j+1] + solve(i, k-1) + solve(k+1, j)
            ans = max(ans, coins)
        dp[i][j] = ans; return ans
    return solve(1, n-2)
if __name__ == "__main__": print(max_coins([3,1,5,8]))  # 167

