"""02. Print LIS. Track prev to reconstruct."""
def print_lis(nums):
    n = len(nums); dp = [1]*n; prev = [-1]*n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i] and dp[i] < dp[j]+1: dp[i] = dp[j]+1; prev[i] = j
    idx = dp.index(max(dp)); lis = []
    while idx >= 0: lis.append(nums[idx]); idx = prev[idx]
    return lis[::-1]
if __name__ == "__main__": print(print_lis([10,9,2,5,3,7,101,18]))

