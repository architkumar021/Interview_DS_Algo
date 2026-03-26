/*
=============================================================================
  QUESTION: 78. Subsets / Power Set (LeetCode)
=============================================================================

  Given an integer array of unique elements, return all possible subsets.

  Example: [1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

=============================================================================
  APPROACH: Pick / Not-Pick (Include / Exclude) Pattern
=============================================================================

  This is the FUNDAMENTAL recursion pattern for subsequence problems.

  At each index, we have 2 choices:
  1. INCLUDE the element → add to temp, move to next index
  2. EXCLUDE the element → don't add, move to next index

  Base case: index == nums.length → we've decided for all elements → add temp to result

  Recursion Tree for [1, 2]:
  ───────────────────────────
                    []
                 /       \
            [1]            []         ← pick/skip 1
           /    \        /    \
       [1,2]   [1]    [2]     []     ← pick/skip 2
         ↓      ↓      ↓      ↓
       {1,2}   {1}    {2}    {}      ← base case: add to result

  DRY RUN with [1, 2, 3]:
  ─────────────────────────
  solve([], [1,2,3], 0)
    INCLUDE 1: solve([1], [1,2,3], 1)
      INCLUDE 2: solve([1,2], [1,2,3], 2)
        INCLUDE 3: solve([1,2,3], [1,2,3], 3) → PUSH [1,2,3] ✓
        EXCLUDE 3: solve([1,2], [1,2,3], 3)   → PUSH [1,2] ✓
      EXCLUDE 2: solve([1], [1,2,3], 2)
        INCLUDE 3: solve([1,3], [1,2,3], 3)   → PUSH [1,3] ✓
        EXCLUDE 3: solve([1], [1,2,3], 3)     → PUSH [1] ✓
    EXCLUDE 1: solve([], [1,2,3], 1)
      INCLUDE 2: solve([2], [1,2,3], 2)
        INCLUDE 3: solve([2,3], [1,2,3], 3)   → PUSH [2,3] ✓
        EXCLUDE 3: solve([2], [1,2,3], 3)     → PUSH [2] ✓
      EXCLUDE 2: solve([], [1,2,3], 2)
        INCLUDE 3: solve([3], [1,2,3], 3)     → PUSH [3] ✓
        EXCLUDE 3: solve([], [1,2,3], 3)      → PUSH [] ✓

  Result: [[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]] → 2^3 = 8 subsets ✓

  Time Complexity:  O(2^N) — 2 choices at each of N elements
  Space Complexity: O(N) — recursion depth + temp array

=============================================================================
*/

function solve(ans, temp, nums, index) {
    // Base case: decided for all elements
    if (index === nums.length) {
        ans.push([...temp]);  // Push a COPY of temp
        return;
    }

    // Choice 1: INCLUDE current element
    temp.push(nums[index]);
    solve(ans, temp, nums, index + 1);

    // Choice 2: EXCLUDE current element (backtrack)
    temp.pop();
    solve(ans, temp, nums, index + 1);
}

function subsets(nums) {
    let ans = [];
    solve(ans, [], nums, 0);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsets([1, 2, 3]));
// [[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]]
