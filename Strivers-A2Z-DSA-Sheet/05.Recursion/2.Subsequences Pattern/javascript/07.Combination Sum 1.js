/*
=============================================================================
  QUESTION: 39. Combination Sum (LeetCode)
=============================================================================

  Given array of DISTINCT integers and a target, return all unique combinations
  where chosen numbers sum to target. Same number can be used UNLIMITED times.

  Example: [2,3,6,7], target=7 → [[2,2,3],[7]]
  (2+2+3=7 ✓, 7=7 ✓)

=============================================================================
  APPROACH: Pick (stay) / Not-Pick (move) Pattern
=============================================================================

  KEY DIFFERENCE from Subset problems:
  - When we INCLUDE an element, we DON'T move to the next index!
  - We STAY at the same index (can pick it again — unlimited use)
  - When we EXCLUDE, we move to next index (never pick this element again)

  Decisions at each index:
  1. PICK: add to temp, reduce target, STAY at same index
  2. NOT-PICK: move to next index, same target

  Base cases:
  - target == 0 → found valid combination
  - target < 0 or index == end → invalid, return

  DRY RUN with [2, 3, 7], target=7:
  ───────────────────────────────────
  solve(0, [2,3,7], target=7, [])
    PICK 2: solve(0, target=5, [2])        ← stay at index 0!
      PICK 2: solve(0, target=3, [2,2])
        PICK 2: solve(0, target=1, [2,2,2])
          PICK 2: target=1-2=-1 < 0 → skip
          SKIP 2: solve(1, target=1, [2,2,2])
            3 > 1 → skip
            SKIP 3: solve(2, target=1, [2,2,2])
              7 > 1 → skip → return
        SKIP 2: solve(1, target=3, [2,2])
          PICK 3: solve(1, target=0, [2,2,3]) → target==0 → PUSH [2,2,3] ✓
          SKIP 3: solve(2, target=3, [2,2])
            7 > 3 → skip → return
      SKIP 2: solve(1, target=5, [2])
        PICK 3: solve(1, target=2, [2,3])
          PICK 3: 3>2 → skip
          SKIP 3: solve(2, target=2, [2,3])
            7>2 → skip → return
        SKIP 3: solve(2, target=5, [2])
          7>5 → skip → return
    SKIP 2: solve(1, target=7, [])
      PICK 3: solve(1, target=4, [3])
        PICK 3: solve(1, target=1, [3,3])
          3>1 → skip
          SKIP: solve(2, target=1, [3,3]) → 7>1 → return
        SKIP 3: solve(2, target=4, [3]) → 7>4 → return
      SKIP 3: solve(2, target=7, [])
        PICK 7: solve(2, target=0, [7]) → target==0 → PUSH [7] ✓
        SKIP 7: return

  Result: [[2,2,3], [7]] ✓

  Time Complexity:  O(N^target) — in worst case
  Space Complexity: O(target) — max recursion depth

=============================================================================
*/

function solve(index, candidates, target, temp, ans) {
    // Found valid combination
    if (target === 0) {
        ans.push([...temp]);
        return;
    }

    // Invalid: exceeded target or ran out of candidates
    if (index === candidates.length || target < 0) return;

    // PICK: use current element (stay at same index for re-use)
    if (candidates[index] <= target) {
        temp.push(candidates[index]);
        solve(index, candidates, target - candidates[index], temp, ans);
        temp.pop();  // Backtrack
    }

    // NOT-PICK: skip current element forever, move to next
    solve(index + 1, candidates, target, temp, ans);
}

function combinationSum(candidates, target) {
    let ans = [];
    candidates.sort((a, b) => a - b);  // Sort for optimization
    solve(0, candidates, target, [], ans);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(combinationSum([2, 3, 6, 7], 7));   // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 5], 8));       // [[2,2,2,2],[2,3,3],[3,5]]
