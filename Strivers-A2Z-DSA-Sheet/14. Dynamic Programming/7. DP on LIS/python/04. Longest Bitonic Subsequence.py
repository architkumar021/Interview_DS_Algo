"""04. Longest Bitonic. LIS left + LIS right - 1."""
def longest_bitonic(nums):
    n = len(nums); left = [1]*n; right = [1]*n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]: left[i] = max(left[i], left[j]+1)
    for i in range(n-1, -1, -1):
        for j in range(i+1, n):
            if nums[j] < nums[i]: right[i] = max(right[i], right[j]+1)
    return max(left[i]+right[i]-1 for i in range(n))
if __name__ == "__main__": print(longest_bitonic([1,2,5,3,2]))  # 5

