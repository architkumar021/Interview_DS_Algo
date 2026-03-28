"""
=============================================================================
  QUESTION: 213. House Robber II (LeetCode)
=============================================================================

  Same as House Robber but houses are in a CIRCLE.
  First and last houses are adjacent → can't rob both.

  Example: [2,3,2] → 3, [1,2,3,1] → 4

  Trick: Run House Robber twice:
  1. Exclude LAST house  → rob(0 to n-2)
  2. Exclude FIRST house → rob(1 to n-1)
  Answer = max of both.

=============================================================================
  APPROACH: Space Optimized — O(N) Time, O(1) Space
=============================================================================
"""


def rob_range(nums, start, end):
    prev2, prev1 = 0, 0
    for i in range(start, end + 1):
        curr = max(nums[i] + prev2, prev1)
        prev2 = prev1
        prev1 = curr
    return prev1


def rob(nums):
    n = len(nums)
    if n == 1:
        return nums[0]
    if n == 2:
        return max(nums[0], nums[1])
    exclude_last = rob_range(nums, 0, n - 2)
    exclude_first = rob_range(nums, 1, n - 1)
    return max(exclude_last, exclude_first)


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print(rob([2, 3, 2]))      # 3
    print(rob([1, 2, 3, 1]))   # 4
    print(rob([1, 2, 3]))      # 3

