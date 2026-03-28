/*
=============================================================================
  QUESTION: 39. Combination Sum (LeetCode)
=============================================================================

  Given array of DISTINCT integers and target, return all unique combinations
  summing to target. Same number can be used UNLIMITED times.

  Example: [2,3,6,7], target=7 → [[2,2,3],[7]]

=============================================================================
  APPROACH: Pick (stay) / Not-Pick (move) — O(N^target) Time, O(target) Space
=============================================================================

  KEY: When we PICK, we STAY at same index (unlimited reuse).
       When we SKIP, we move to next index (never pick again).

  Dry Run [2, 3, 7], target=7:
    solve(0, t=7) → pick 2, stay: solve(0, t=5)
                      → pick 2, stay: solve(0, t=3)
                          → pick 2, stay: solve(0, t=1) → 2>1, skip all → dead
                          → skip 2: solve(1, t=3) → pick 3: solve(1, t=0) → PUSH [2,2,3] ✓
                      → skip 2: solve(1, t=5) → ...no valid
                  → skip 2: solve(1, t=7)
                      → skip 3: solve(2, t=7) → pick 7: solve(2, t=0) → PUSH [7] ✓
    Result: [[2,2,3], [7]] ✓

=============================================================================
*/

function combinationSum(candidates, target) {
    candidates.sort((a, b) => a - b);
    let result = [];

    function solve(index, target, temp) {
        if (target === 0) { result.push([...temp]); return; }
        if (index === candidates.length || target < 0) return;

        // PICK: stay at same index (can reuse)
        if (candidates[index] <= target) {
            temp.push(candidates[index]);
            solve(index, target - candidates[index], temp);
            temp.pop();
        }

        // SKIP: move to next index
        solve(index + 1, target, temp);
    }

    solve(0, target, []);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(combinationSum([2, 3, 6, 7], 7));   // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 5], 8));       // [[2,2,2,2],[2,3,3],[3,5]]
