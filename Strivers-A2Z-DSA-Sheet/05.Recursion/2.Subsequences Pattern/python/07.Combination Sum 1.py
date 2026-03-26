"""
=============================================================================
  QUESTION: 39. Combination Sum (LeetCode)
=============================================================================

  DISTINCT integers, target sum. Same number UNLIMITED times.
  Example: [2,3,6,7], target=7 → [[2,2,3],[7]]

  APPROACH: Pick (STAY at index) / Not-Pick (move to next)
  KEY: When picking, DON'T move to next index (can reuse).

  DRY RUN [2,3,7], target=7:
    Pick 2 → Pick 2 → Pick 2 → 1 left, can't pick 2 → Skip 2
      Pick 3 → target=0 → [2,2,3] ✓
    Skip 2 → Skip 3 → Pick 7 → target=0 → [7] ✓

  Time: O(N^target), Space: O(target)
=============================================================================
"""


def solve(index, candidates, target, temp, ans):
    if target == 0:
        ans.append(temp[:])
        return
    if index == len(candidates) or target < 0:
        return

    if candidates[index] <= target:
        temp.append(candidates[index])
        solve(index, candidates, target - candidates[index], temp, ans)
        temp.pop()

    solve(index + 1, candidates, target, temp, ans)


def combination_sum(candidates, target):
    ans = []
    candidates.sort()
    solve(0, candidates, target, [], ans)
    return ans


# Driver Code
if __name__ == "__main__":
    print(combination_sum([2, 3, 6, 7], 7))  # [[2,2,3],[7]]

