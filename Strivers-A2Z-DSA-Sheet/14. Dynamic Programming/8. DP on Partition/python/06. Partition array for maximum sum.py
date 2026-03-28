"""06. Partition Array for Max Sum. Subarrays ≤ k length."""
import sys; sys.setrecursionlimit(10000)
def max_sum_after_partitioning(arr, k):
    n = len(arr); dp = [-1]*n
    def solve(i):
        if i == n: return 0
        if dp[i] != -1: return dp[i]
        mx, ans = 0, 0
        for j in range(i, min(i+k, n)):
            mx = max(mx, arr[j])
            ans = max(ans, mx*(j-i+1) + solve(j+1))
        dp[i] = ans; return ans
    return solve(0)
if __name__ == "__main__": print(max_sum_after_partitioning([1,15,7,9,2,5,10], 3))  # 84

