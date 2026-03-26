"""
=============================================================================
  QUESTION: 78. Subsets / Power Set (LeetCode)
=============================================================================

  Given integer array of unique elements, return all possible subsets.
  Example: [1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

  APPROACH: Pick / Not-Pick (FUNDAMENTAL recursion pattern)
  At each index: INCLUDE element or EXCLUDE it.
  Base: index == len(nums) → add current subset to result.

  Recursion Tree for [1,2]:
              []
           /       \\
      [1]            []          ← pick/skip 1
     /    \\        /    \\
   [1,2]  [1]    [2]    []      ← pick/skip 2

  DRY RUN [1,2,3]:
    Include 1 → Include 2 → Include 3 → PUSH [1,2,3]
    Include 1 → Include 2 → Exclude 3 → PUSH [1,2]
    Include 1 → Exclude 2 → Include 3 → PUSH [1,3]
    ...etc → 2^3 = 8 subsets total ✓

  Time: O(2^N), Space: O(N)
=============================================================================
"""


def solve(ans, temp, nums, index):
    if index == len(nums):
        ans.append(temp[:])
        return

    # Include
    temp.append(nums[index])
    solve(ans, temp, nums, index + 1)

    # Exclude
    temp.pop()
    solve(ans, temp, nums, index + 1)


def subsets(nums):
    ans = []
    solve(ans, [], nums, 0)
    return ans


# Driver Code
if __name__ == "__main__":
    print(subsets([1, 2, 3]))

