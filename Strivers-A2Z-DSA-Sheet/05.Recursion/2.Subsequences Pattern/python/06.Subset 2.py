"""
=============================================================================
  QUESTION: 90. Subsets II (LeetCode) — Subset 2
=============================================================================

  Array MAY HAVE DUPLICATES. Return subsets WITHOUT duplicate subsets.
  Example: [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]

  APPROACH: Pick/Not-Pick + Skip Duplicates
  1. SORT array → duplicates adjacent
  2. When EXCLUDING, skip ALL copies of that element
  Why? Include-1st-exclude-2nd = exclude-1st-include-2nd → same subset!

  DRY RUN [1,2,2]:
    Inc 1 → Inc 2(idx1) → Inc 2(idx2) → [1,2,2]
    Inc 1 → Inc 2(idx1) → Exc 2(idx2) → [1,2]
    Inc 1 → Exc 2(idx1) → skip idx2 → [1]
    Exc 1 → Inc 2(idx1) → Inc 2(idx2) → [2,2]
    Exc 1 → Inc 2(idx1) → Exc 2(idx2) → [2]
    Exc 1 → Exc 2(idx1) → skip idx2 → [] ✓ (6 unique subsets)

  Time: O(2^N), Space: O(N)
=============================================================================
"""


def solve(index, nums, temp, ans):
    if index == len(nums):
        ans.append(temp[:])
        return

    # Include
    temp.append(nums[index])
    solve(index + 1, nums, temp, ans)
    temp.pop()

    # Skip duplicates then exclude
    while index + 1 < len(nums) and nums[index] == nums[index + 1]:
        index += 1

    # Exclude
    solve(index + 1, nums, temp, ans)


def subsets_with_dup(nums):
    nums.sort()
    ans = []
    solve(0, nums, [], ans)
    return ans


# Driver Code
if __name__ == "__main__":
    print(subsets_with_dup([1, 2, 2]))

