/*
=============================================================================
  QUESTION: Count Subsets with Sum Equal to K (GFG)
=============================================================================

  Given array of non-negative integers and integer sum, count all subsets
  with sum equal to given sum. Answer modulo 10^9 + 7.

  Example: arr=[2,3,5,6,8,10], sum=10 → 3
  Subsets: {2,3,5}, {2,8}, {10}

=============================================================================
  APPROACH: Pick / Not-Pick from Right to Left
=============================================================================

  Process from the LAST index backwards (common in DP-style recursion):
  - If remaining sum == 0 → found a valid subset (return 1)
  - If index == 0 → check if arr[0] equals remaining sum
  - At each index:
    Include: if arr[index] <= sum → solve(index-1, sum - arr[index])
    Exclude: solve(index-1, sum)
  - Total = include + exclude

  DRY RUN with arr=[2,3,5], sum=5:
  ──────────────────────────────────
  solve(2, 5)  → arr[2]=5
    Include 5: solve(1, 0) → sum==0 → return 1 ✓  (subset: {5})
    Exclude 5: solve(1, 5)
      Include 3: solve(0, 2) → arr[0]=2==2 → return 1 ✓ (subset: {2,3})
      Exclude 3: solve(0, 5) → arr[0]=2≠5 → return 0
      return 1 + 0 = 1
    return 1 + 1 = 2

  Result: 2 subsets → {5} and {2,3} ✓

  Time Complexity:  O(N × sum) — with memoization, else O(2^N)
  Space Complexity: O(N) — recursion stack

=============================================================================
*/

function solve(index, sum, arr) {
    // Base case: remaining sum is 0 → found valid subset
    if (sum === 0) return 1;

    // Base case: reached first element
    if (index === 0) return arr[0] === sum ? 1 : 0;

    // Include current element (only if it doesn't exceed remaining sum)
    let include = 0;
    if (arr[index] <= sum)
        include = solve(index - 1, sum - arr[index], arr);

    // Exclude current element
    let exclude = solve(index - 1, sum, arr);

    return (include + exclude) % (1e9 + 7);
}

function perfectSum(arr, n, sum) {
    return solve(n - 1, sum, arr) % (1e9 + 7);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(perfectSum([2, 3, 5, 6, 8, 10], 6, 10));  // 3
console.log(perfectSum([2, 3, 5], 3, 5));               // 2
console.log(perfectSum([1, 1, 1], 3, 2));               // 3
