"""
  QUESTION: 416. Partition Equal Subset Sum (LeetCode)
  Can array split into 2 subsets with equal sum?
  Trick: totalSum odd → False. Else check subsetSum(totalSum/2).
  Example: [1,5,11,5] → True
"""

def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    n = len(nums)
    prev = [False]*(target+1)
    prev[0] = True
    if nums[0] <= target: prev[nums[0]] = True
    for i in range(1, n):
        curr = [False]*(target+1)
        curr[0] = True
        for s in range(1, target+1):
            take = prev[s-nums[i]] if nums[i] <= s else False
            curr[s] = take or prev[s]
        prev = curr
    return prev[target]

if __name__ == "__main__":
    print(can_partition([1,5,11,5]))  # True
    print(can_partition([1,2,3,5]))   # False

