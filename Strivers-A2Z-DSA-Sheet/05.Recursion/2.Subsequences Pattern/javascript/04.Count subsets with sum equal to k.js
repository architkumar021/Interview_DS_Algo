/*
=============================================================================
  QUESTION: Count Subsets with Sum Equal to K (GFG)
=============================================================================

  Given array of non-negative integers and target sum, count subsets
  with sum equal to target. Answer modulo 10^9 + 7.

  Example: arr=[2,3,5,6,8,10], sum=10 → 3  ({2,3,5}, {2,8}, {10})

=============================================================================
  APPROACH: Pick / Not-Pick (Right to Left) — O(2^N) Time, O(N) Space
=============================================================================

  Process from last index backward (DP-style recursion):
  - sum == 0 → found valid subset → return 1
  - index == 0 → return 1 if arr[0] == sum, else 0
  - Pick: if arr[index] <= sum → solve(index-1, sum - arr[index])
  - Skip: solve(index-1, sum)
  - Total = pick + skip

  Dry Run arr=[2,3,5], sum=5:
    solve(2, 5): pick 5 → solve(1, 0) → sum=0 → 1  ({5})
                 skip 5 → solve(1, 5): pick 3 → solve(0, 2) → arr[0]=2=2 → 1  ({2,3})
                                        skip 3 → solve(0, 5) → 2≠5 → 0
    Result: 1 + 1 = 2 ✓

=============================================================================
*/

function perfectSum(arr, n, sum) {
    function solve(index, rem) {
        if (rem === 0) return 1;
        if (index === 0) return arr[0] === rem ? 1 : 0;

        let pick = 0;
        if (arr[index] <= rem)
            pick = solve(index - 1, rem - arr[index]);

        let skip = solve(index - 1, rem);

        return (pick + skip) % (1e9 + 7);
    }

    return solve(n - 1, sum);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(perfectSum([2, 3, 5, 6, 8, 10], 6, 10));  // 3
console.log(perfectSum([2, 3, 5], 3, 5));               // 2
console.log(perfectSum([1, 1, 1], 3, 2));               // 3
