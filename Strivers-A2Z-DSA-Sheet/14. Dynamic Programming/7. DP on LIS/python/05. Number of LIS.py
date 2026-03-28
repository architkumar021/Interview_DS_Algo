"""05. Number of LIS. dp=length, cnt=count."""
def find_number_of_lis(nums):
    n = len(nums); dp = [1]*n; cnt = [1]*n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                if dp[j]+1 > dp[i]: dp[i] = dp[j]+1; cnt[i] = cnt[j]
                elif dp[j]+1 == dp[i]: cnt[i] += cnt[j]
    lis = max(dp)
    return sum(cnt[i] for i in range(n) if dp[i] == lis)
if __name__ == "__main__": print(find_number_of_lis([1,3,5,4,7]))  # 2

