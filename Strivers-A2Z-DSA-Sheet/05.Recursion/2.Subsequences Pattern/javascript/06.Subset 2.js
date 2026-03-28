/*
=============================================================================
  QUESTION: 90. Subsets II (LeetCode) — Subset 2
=============================================================================

  Given array with DUPLICATES, return all subsets WITHOUT duplicate subsets.

  Example: [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]

=============================================================================
  APPROACH: Pick / Not-Pick + Skip Duplicates — O(2^N) Time, O(N) Space
=============================================================================

  Key trick:
  1. SORT array → duplicates become adjacent
  2. When we EXCLUDE an element, skip ALL its duplicates too

  Why? pick 1st '2' skip 2nd '2' → {2}
       skip 1st '2' pick 2nd '2' → {2}  ← DUPLICATE!
  So when skipping, skip all copies.

  Dry Run [1, 2, 2]:
    solve(0, [])
      pick 1 → solve(1, [1])
        pick 2(idx1) → solve(2, [1,2])
          pick 2(idx2) → push [1,2,2] ✓ | skip → push [1,2] ✓
        skip 2(idx1) → skip idx2 too → push [1] ✓
      skip 1 → solve(1, [])
        pick 2(idx1) → solve(2, [2])
          pick 2(idx2) → push [2,2] ✓ | skip → push [2] ✓
        skip 2(idx1) → skip idx2 too → push [] ✓
    Result: 6 subsets, no duplicates ✓

=============================================================================
*/

function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    let result = [];

    function solve(index, temp) {
        if (index === nums.length) {
            result.push([...temp]);
            return;
        }

        // INCLUDE current element
        temp.push(nums[index]);
        solve(index + 1, temp);
        temp.pop();

        // SKIP all duplicates, then EXCLUDE
        while (index + 1 < nums.length && nums[index] === nums[index + 1])
            index++;
        solve(index + 1, temp);
    }

    solve(0, []);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsetsWithDup([1, 2, 2]));
// [[1,2,2],[1,2],[1],[2,2],[2],[]]
console.log(subsetsWithDup([0]));
// [[0],[]]
