/*
=============================================================================
  QUESTION: 90. Subsets II (LeetCode) — Subset 2
=============================================================================

  Given integer array that MAY CONTAIN DUPLICATES, return all possible
  subsets WITHOUT duplicate subsets.

  Example: [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]
  (NOT [[],[1],[1,2],[1,2,2],[2],[2,2],[1,2]←dup,[2]←dup])

=============================================================================
  APPROACH: Pick / Not-Pick + Skip Duplicates
=============================================================================

  Key trick to avoid duplicates:
  1. SORT the array first → duplicates are adjacent
  2. When we EXCLUDE an element, skip ALL its duplicates
     (if we skip one '2', we must skip all remaining '2's too)

  Why? If we include first '2' and exclude second '2' → {2}
       If we exclude first '2' and include second '2' → {2} (DUPLICATE!)
  So when excluding, we skip all copies to avoid this.

  DRY RUN with [1, 2, 2]:
  ─────────────────────────
  solve(0, [1,2,2], [])
    INCLUDE 1: solve(1, [1,2,2], [1])
      INCLUDE 2(idx1): solve(2, [1,2,2], [1,2])
        INCLUDE 2(idx2): solve(3, ..., [1,2,2]) → PUSH [1,2,2] ✓
        EXCLUDE 2(idx2): no more dups → solve(3, ..., [1,2]) → PUSH [1,2] ✓
      EXCLUDE 2(idx1): skip idx2 (same '2') → solve(3, ..., [1]) → PUSH [1] ✓
    EXCLUDE 1: no dups of '1' → solve(1, [1,2,2], [])
      INCLUDE 2(idx1): solve(2, [1,2,2], [2])
        INCLUDE 2(idx2): solve(3, ..., [2,2]) → PUSH [2,2] ✓
        EXCLUDE 2(idx2): solve(3, ..., [2]) → PUSH [2] ✓
      EXCLUDE 2(idx1): skip idx2 → solve(3, ..., []) → PUSH [] ✓

  Result: [[1,2,2],[1,2],[1],[2,2],[2],[]] → 6 subsets, NO DUPLICATES ✓

  Time Complexity:  O(2^N)
  Space Complexity: O(N) — recursion depth

=============================================================================
*/

function solve(index, nums, temp, ans) {
    // Base case: decided for all elements
    if (index === nums.length) {
        ans.push([...temp]);
        return;
    }

    // INCLUDE current element
    temp.push(nums[index]);
    solve(index + 1, nums, temp, ans);
    temp.pop();  // Backtrack

    // SKIP ALL DUPLICATES of current element
    while (index + 1 < nums.length && nums[index] === nums[index + 1])
        index++;

    // EXCLUDE current element (and all its duplicates)
    solve(index + 1, nums, temp, ans);
}

function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);  // Sort to group duplicates
    let ans = [];
    solve(0, nums, [], ans);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsetsWithDup([1, 2, 2]));
// [[1,2,2],[1,2],[1],[2,2],[2],[]]
console.log(subsetsWithDup([0]));
// [[0],[]]
