"""
=============================================================================
  QUESTION: 40. Combination Sum II (LeetCode)
=============================================================================

  MAY HAVE DUPLICATES, each used ONLY ONCE. No duplicate combinations.
  Example: [10,1,2,7,6,1,5], target=8 → [[1,1,6],[1,2,5],[1,7],[2,6]]

  APPROACH: Combination Sum + Subset 2 duplicate-skip logic
  - Pick: move to index+1 (each used once)
  - Not-pick: skip all duplicates, then move to next

  DRY RUN sorted [1,1,2,5,6,7,10], target=8:
    Pick 1(0) → Pick 1(1) → ... → Pick 6 → target=0 → [1,1,6] ✓
    Pick 1(0) → Skip 1(1) → Pick 2 → Pick 5 → target=0 → [1,2,5] ✓
    Pick 1(0) → ... → Pick 7 → target=0 → [1,7] ✓
    Skip both 1s → Pick 2 → Pick 6 → target=0 → [2,6] ✓

  Time: O(N × 2^N), Space: O(target)
=============================================================================
"""


def solve(index, target, candidates, temp, ans):
    if target == 0:
        ans.append(temp[:])
        return
    if index == len(candidates) or target < 0:
        return

    if candidates[index] <= target:
        temp.append(candidates[index])
        solve(index + 1, target - candidates[index], candidates, temp, ans)
        temp.pop()

    # Skip duplicates
    while index + 1 < len(candidates) and candidates[index] == candidates[index + 1]:
        index += 1

    solve(index + 1, target, candidates, temp, ans)


def combination_sum2(candidates, target):
    ans = []
    candidates.sort()
    solve(0, target, candidates, [], ans)
    return ans


# Driver Code
if __name__ == "__main__":
    print(combination_sum2([10, 1, 2, 7, 6, 1, 5], 8))
    # [[1,1,6],[1,2,5],[1,7],[2,6]]

