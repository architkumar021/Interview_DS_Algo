"""01. LIS. O(N²)."""
def length_of_lis(nums):
    n = len(nums); dp = [1]*n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]: dp[i] = max(dp[i], dp[j]+1)
    return max(dp)
if __name__ == "__main__": print(length_of_lis([10,9,2,5,3,7,101,18]))  # 4

