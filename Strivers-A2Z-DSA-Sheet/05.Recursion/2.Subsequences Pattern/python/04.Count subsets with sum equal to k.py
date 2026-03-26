"""
=============================================================================
  QUESTION: Count Subsets with Sum Equal to K (GFG)
=============================================================================

  Count all subsets with sum equal to given sum. Mod 10^9+7.
  Example: arr=[2,3,5,6,8,10], sum=10 → 3 ({2,3,5},{2,8},{10})

  APPROACH: Pick/Not-Pick from Right to Left
  - sum == 0 → found valid subset (return 1)
  - index == 0 → check if arr[0] == remaining sum
  - include (if arr[index] <= sum) + exclude

  DRY RUN arr=[2,3,5], sum=5:
    solve(2,5): Include 5→solve(1,0)→sum=0→1 | Exclude 5→solve(1,5)
      solve(1,5): Include 3→solve(0,2)→arr[0]=2=2→1 | Exclude 3→solve(0,5)→0
    Total: 1+1 = 2 ({5},{2,3}) ✓

  Time: O(2^N), Space: O(N)
=============================================================================
"""

MOD = 10**9 + 7


def solve(index, target, arr):
    if target == 0:
        return 1
    if index == 0:
        return 1 if arr[0] == target else 0

    include = 0
    if arr[index] <= target:
        include = solve(index - 1, target - arr[index], arr)

    exclude = solve(index - 1, target, arr)

    return (include + exclude) % MOD


def perfect_sum(arr, n, target):
    return solve(n - 1, target, arr) % MOD


# Driver Code
if __name__ == "__main__":
    print(perfect_sum([2, 3, 5, 6, 8, 10], 6, 10))  # 3

