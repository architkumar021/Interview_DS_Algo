/*
=============================================================================
  QUESTION: 216. Combination Sum III (LeetCode)
=============================================================================

  Find all valid combinations of k numbers (1-9, each used at most once)
  that sum to n.

  Example: k=3, n=7 → [[1,2,4]]  (1+2+4=7)
  Example: k=3, n=9 → [[1,2,6],[1,3,5],[2,3,4]]

=============================================================================
  APPROACH: Pick / Not-Pick with Numbers 1-9
=============================================================================

  Same as Combination Sum 2 but:
  - Fixed candidate pool: numbers 1 through 9
  - Extra constraint: exactly k numbers must be picked
  - Each number used at most once

  Base cases:
  - target == 0 AND temp.length == k → valid combination
  - i > 9 or target < 0 → invalid

  DRY RUN with k=3, n=7:
  ────────────────────────
  solve(1, k=3, target=7, [])
    PICK 1: solve(2, target=6, [1])
      PICK 2: solve(3, target=4, [1,2])
        PICK 3: solve(4, target=1, [1,2,3]) → size=3 but target≠0 → skip
        SKIP 3: PICK 4: solve(5, target=0, [1,2,4])
          target==0 && size==3 → PUSH [1,2,4] ✓
        SKIP 4: PICK 5: target=-1 → invalid
      SKIP 2: PICK 3: solve(4, target=3, [1,3])
        PICK 4: target=-1 → invalid for size≠3 eventually
      ...all remaining too large
    SKIP 1: solve(2, target=7, [])
      PICK 2: solve(3, target=5, [2])
        PICK 3: solve(4, target=2, [2,3])
          No number 1-9 starting from 4 gives target=2 in 1 pick... nope
      ...no more valid

  Result: [[1,2,4]] ✓

  Time Complexity:  O(2^9) — only 9 numbers to choose from
  Space Complexity: O(k) — recursion depth

=============================================================================
*/

function solve(i, k, target, temp, ans) {
    // Found valid combination: exactly k numbers summing to target
    if (target === 0 && temp.length === k) {
        ans.push([...temp]);
        return;
    }

    // Invalid: out of range or exceeded target
    if (i > 9 || target < 0) return;

    // PICK current number
    if (i <= target) {
        temp.push(i);
        solve(i + 1, k, target - i, temp, ans);
        temp.pop();  // Backtrack
    }

    // NOT-PICK: skip current number
    solve(i + 1, k, target, temp, ans);
}

function combinationSum3(k, n) {
    let ans = [];
    solve(1, k, n, [], ans);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(combinationSum3(3, 7));   // [[1,2,4]]
console.log(combinationSum3(3, 9));   // [[1,2,6],[1,3,5],[2,3,4]]
console.log(combinationSum3(2, 5));   // [[1,4],[2,3]]
