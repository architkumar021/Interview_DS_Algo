"""
=============================================================================
  QUESTION: 216. Combination Sum III (LeetCode)
=============================================================================

  Find all combinations of k numbers (1-9, each at most once) summing to n.
  Example: k=3, n=7 → [[1,2,4]] (1+2+4=7)

  APPROACH: Pick/Not-Pick with numbers 1-9.
  Extra constraint: exactly k numbers must be picked.
  Base: target == 0 AND len(temp) == k → valid.

  DRY RUN k=3, n=7:
    Pick 1 → Pick 2 → Pick 3(sum=6≠7) → Skip 3 → Pick 4(sum=7, k=3) → [1,2,4] ✓
    All other combos either exceed 7 or have wrong count.

  Time: O(2^9), Space: O(k)
=============================================================================
"""


def solve(i, k, target, temp, ans):
    if target == 0 and len(temp) == k:
        ans.append(temp[:])
        return
    if i > 9 or target < 0:
        return

    if i <= target:
        temp.append(i)
        solve(i + 1, k, target - i, temp, ans)
        temp.pop()

    solve(i + 1, k, target, temp, ans)


def combination_sum3(k, n):
    ans = []
    solve(1, k, n, [], ans)
    return ans


# Driver Code
if __name__ == "__main__":
    print(combination_sum3(3, 7))   # [[1,2,4]]
    print(combination_sum3(3, 9))   # [[1,2,6],[1,3,5],[2,3,4]]

