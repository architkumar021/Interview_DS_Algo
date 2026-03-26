/*
=============================================================================
  QUESTION: 40. Combination Sum II (LeetCode)
=============================================================================

  Given candidates (MAY HAVE DUPLICATES) and target, find all unique
  combinations summing to target. Each number used ONLY ONCE.
  No duplicate combinations in result.

  Example: [10,1,2,7,6,1,5], target=8 → [[1,1,6],[1,2,5],[1,7],[2,6]]

=============================================================================
  APPROACH: Pick / Not-Pick + Skip Duplicates (Same as Subset 2)
=============================================================================

  Combines two concepts:
  1. Combination Sum logic (track target, pick reduces target)
  2. Subset 2 duplicate-skip logic (sort + skip same elements when excluding)

  KEY DIFFERENCES from Combination Sum 1:
  - Each element used ONLY ONCE → move to index+1 when picking
  - Array has duplicates → sort + skip duplicates when excluding

  DRY RUN with sorted [1,1,2,5,6,7,10], target=8:
  ──────────────────────────────────────────────────
  solve(0, target=8, [])
    PICK 1(idx0): solve(1, target=7, [1])
      PICK 1(idx1): solve(2, target=6, [1,1])
        PICK 2: solve(3, target=4, [1,1,2]) → ...no valid → backtrack
        SKIP 2: PICK 5: target=1 → no → PICK 6: solve(5, target=0, [1,1,6])
          target==0 → PUSH [1,1,6] ✓
      SKIP 1(idx1): (no more dup 1's) → solve(2, target=7, [1])
        PICK 2: solve(3, target=5, [1,2])
          PICK 5: solve(4, target=0, [1,2,5]) → PUSH [1,2,5] ✓
        SKIP 2: PICK 5: solve(4, target=2, [1,5]) → ...no valid
                 PICK 6: solve(5, target=1, [1,6]) → ...no valid
                 PICK 7: solve(6, target=0, [1,7]) → PUSH [1,7] ✓
    SKIP 1(idx0): skip 1(idx1) too → solve(2, target=8, [])
      PICK 2: solve(3, target=6, [2])
        PICK 6: solve(5, target=0, [2,6]) → PUSH [2,6] ✓
      ...remaining don't reach target

  Result: [[1,1,6],[1,2,5],[1,7],[2,6]] ✓

  Time Complexity:  O(N × 2^N)
  Space Complexity: O(target) — recursion depth

=============================================================================
*/

function solve(index, target, candidates, temp, ans) {
    // Found valid combination
    if (target === 0) {
        ans.push([...temp]);
        return;
    }

    // Invalid
    if (index === candidates.length || target < 0) return;

    // PICK current element (move to next — each used once)
    if (candidates[index] <= target) {
        temp.push(candidates[index]);
        solve(index + 1, target - candidates[index], candidates, temp, ans);
        temp.pop();  // Backtrack
    }

    // Skip ALL duplicates of current element
    while (index + 1 < candidates.length && candidates[index] === candidates[index + 1])
        index++;

    // NOT-PICK (skip current and all its duplicates)
    solve(index + 1, target, candidates, temp, ans);
}

function combinationSum2(candidates, target) {
    let ans = [];
    candidates.sort((a, b) => a - b);  // Sort to handle duplicates
    solve(0, target, candidates, [], ans);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
// [[1,1,6],[1,2,5],[1,7],[2,6]]
