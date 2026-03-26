"""
=============================================================================
  QUESTION: Subset Sums (GFG) — Subset 1
=============================================================================

  Print sums of all subsets.
  Example: [2,3] → [0,2,3,5]

  APPROACH: Pick/Not-Pick tracking running SUM (not actual subsets).
  Base: index == len(arr) → append current sum.

  DRY RUN [2,3]:
    Include 2, Include 3 → sum=5 | Include 2, Exclude 3 → sum=2
    Exclude 2, Include 3 → sum=3 | Exclude 2, Exclude 3 → sum=0
    Sorted: [0,2,3,5] ✓

  Time: O(2^N × N) for sorting, Space: O(2^N)
=============================================================================
"""


def solve(index, total, arr, ans):
    if index == len(arr):
        ans.append(total)
        return

    solve(index + 1, total + arr[index], arr, ans)  # Include
    solve(index + 1, total, arr, ans)                # Exclude


def subset_sums(arr):
    ans = []
    solve(0, 0, arr, ans)
    ans.sort()
    return ans


# Driver Code
if __name__ == "__main__":
    print(subset_sums([2, 3]))      # [0, 2, 3, 5]
    print(subset_sums([1, 2, 3]))   # [0, 1, 2, 3, 3, 4, 5, 6]

