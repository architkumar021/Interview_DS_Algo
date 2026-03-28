"""
=============================================================================
  QUESTION: 198. House Robber (LeetCode)
=============================================================================

  Rob houses, can't rob adjacent. Return max money.
  Example: [1,2,3,1] → 4 (rob house 0 & 2: 1+3)

=============================================================================
  APPROACH 1: Memoization — O(N) Time, O(N) Space
  Pick/Not-Pick: take = nums[i] + solve(i-2), skip = solve(i-1)
=============================================================================
"""
import sys
sys.setrecursionlimit(10000)


def rob_memo(nums):
    n = len(nums)
    dp = [-1] * n

    def solve(i):
        if i < 0:
            return 0
        if i == 0:
            return nums[0]
        if dp[i] != -1:
            return dp[i]
        take = nums[i] + solve(i - 2)
        skip = solve(i - 1)
        dp[i] = max(take, skip)
        return dp[i]

    return solve(n - 1)


"""
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================
"""

def rob_tab(nums):
    n = len(nums)
    if n == 1:
        return nums[0]
    dp = [0] * n
    dp[0] = nums[0]
    for i in range(1, n):
        take = nums[i] + (dp[i - 2] if i >= 2 else 0)
        skip = dp[i - 1]
        dp[i] = max(take, skip)
    return dp[n - 1]


"""
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================
"""

def rob(nums):
    n = len(nums)
    if n == 1:
        return nums[0]
    prev2, prev1 = 0, nums[0]
    for i in range(1, n):
        take = nums[i] + prev2
        skip = prev1
        curr = max(take, skip)
        prev2 = prev1
        prev1 = curr
    return prev1


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print(rob_memo([1, 2, 3, 1]))     # 4
    print(rob_tab([2, 7, 9, 3, 1]))   # 12
    print(rob([1, 2, 3, 1]))           # 4
    print(rob([2, 7, 9, 3, 1]))        # 12

