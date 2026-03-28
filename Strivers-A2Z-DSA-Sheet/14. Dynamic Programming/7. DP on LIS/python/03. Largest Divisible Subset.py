"""03. Largest Divisible Subset. Sort, LIS with %==0."""
def largest_divisible_subset(nums):
    nums.sort(); n = len(nums); dp = [1]*n; prev = [-1]*n
    for i in range(n):
        for j in range(i):
            if nums[i] % nums[j] == 0 and dp[i] < dp[j]+1: dp[i] = dp[j]+1; prev[i] = j
    idx = dp.index(max(dp)); res = []
    while idx >= 0: res.append(nums[idx]); idx = prev[idx]
    return res
if __name__ == "__main__": print(largest_divisible_subset([1,2,4,8]))

