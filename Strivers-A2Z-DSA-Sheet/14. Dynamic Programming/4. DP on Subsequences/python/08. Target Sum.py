"""
  QUESTION: 494. Target Sum (LeetCode)
  Assign +/- to each element. Count ways to reach target.
  Reduces to: count subsets with sum = (total + target) / 2
  Example: nums=[1,1,1,1,1], target=3 → 5
"""

def find_target_sum_ways(nums, target):
    total = sum(nums)
    if abs(target) > total or (total + target) % 2 != 0: return 0
    s = (total + target) // 2
    n = len(nums)
    prev = [0]*(s+1)
    if nums[0] == 0: prev[0] = 2
    else:
        prev[0] = 1
        if nums[0] <= s: prev[nums[0]] = 1
    for i in range(1, n):
        curr = [0]*(s+1)
        for t in range(s+1):
            take = prev[t-nums[i]] if nums[i] <= t else 0
            curr[t] = take + prev[t]
        prev = curr
    return prev[s]

if __name__ == "__main__":
    print(find_target_sum_ways([1,1,1,1,1], 3))  # 5

