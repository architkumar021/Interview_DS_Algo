/*
=============================================================================
  QUESTION: 40. Combination Sum II (LeetCode)
=============================================================================

  Given candidates (MAY HAVE DUPLICATES) and target, find all unique
  combinations summing to target. Each number used ONLY ONCE.

  Example: [10,1,2,7,6,1,5], target=8 → [[1,1,6],[1,2,5],[1,7],[2,6]]

=============================================================================
  APPROACH: Pick / Not-Pick + Skip Duplicates — O(N × 2^N) Time, O(target) Space
=============================================================================

  Combines: Combination Sum (target tracking) + Subset 2 (skip duplicates).

  vs Combination Sum 1:
  - Each element used ONCE → move to index+1 when picking
  - Has duplicates → sort + skip all duplicates when excluding

  Dry Run sorted [1,1,2,5,6,7,10], target=8:
    pick 1(idx0) → pick 1(idx1) → pick 6 → t=0 → PUSH [1,1,6] ✓
                 → skip 1(idx1) → pick 2 → pick 5 → t=0 → PUSH [1,2,5] ✓
                                → skip 2 → pick 7 → t=0 → PUSH [1,7] ✓
    skip 1(idx0) → skip 1(idx1) too → pick 2 → pick 6 → t=0 → PUSH [2,6] ✓
    Result: [[1,1,6],[1,2,5],[1,7],[2,6]] ✓

=============================================================================
*/

function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b);
    let result = [];

    function solve(index, target, temp) {
        if (target === 0) { result.push([...temp]); return; }
        if (index === candidates.length || target < 0) return;

        // PICK current element (move to next — used once)
        if (candidates[index] <= target) {
            temp.push(candidates[index]);
            solve(index + 1, target - candidates[index], temp);
            temp.pop();
        }

        // Skip all duplicates, then EXCLUDE
        while (index + 1 < candidates.length && candidates[index] === candidates[index + 1])
            index++;
        solve(index + 1, target, temp);
    }

    solve(0, target, []);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
// [[1,1,6],[1,2,5],[1,7],[2,6]]
