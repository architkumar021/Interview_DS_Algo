/*
=============================================================================
  QUESTION: 213. House Robber II (LeetCode)
=============================================================================

  Same as House Robber but houses are arranged in a CIRCLE.
  First and last houses are ADJACENT → can't rob both.

  Example: [2,3,2] → 3 (rob house 1 only)
  Example: [1,2,3,1] → 4 (rob house 0 & 2: 1+3=4)

=============================================================================
  KEY INSIGHT: Break Circular Dependency
=============================================================================

  In a circle: house 0 and house n-1 are neighbors.
  So if you rob house 0, you can't rob house n-1, and vice versa.

  Trick: Solve TWO linear House Robber problems:
    Case 1: Consider houses [0 .. n-2] (exclude LAST house)
    Case 2: Consider houses [1 .. n-1] (exclude FIRST house)
    Answer: max(Case 1, Case 2)

  Why this works:
    - If optimal solution includes house 0 → it doesn't include n-1 → covered by Case 1
    - If optimal solution includes house n-1 → it doesn't include 0 → covered by Case 2
    - If optimal includes neither → covered by BOTH cases

  Dry Run: [1, 2, 3, 1]
    Case 1: [1, 2, 3] → rob 0,2 = 1+3 = 4
    Case 2: [2, 3, 1] → rob 1 = 3 (or rob 0,2 = 2+1 = 3)
    Answer: max(4, 3) = 4 ✓

  Visualization of the two cases:

      Houses:    [0]──[1]──[2]──[3]
                  └────────────────┘  ← circular link (0 & 3 adjacent)

      Case 1 (exclude last):  [0]──[1]──[2]      (ignore house 3)
      Case 2 (exclude first): [1]──[2]──[3]      (ignore house 0)

  Each case is just House Robber I on a subarray!

=============================================================================
  APPROACH 1: Memoization (Top-Down) — O(N) Time, O(N) Space
=============================================================================

  For each case, use memoized recursion (same as House Robber I).

  solve(i, start) = max robbery from house start..i
    PICK:     nums[i] + solve(i-2, start)
    NOT-PICK: solve(i-1, start)
    Base: i < start → 0, i == start → nums[start]

  Dry Run: [1, 2, 3, 1]

    Case 1: houses [0..2] → solveRange(2, 0)
      solve(0, 0) = nums[0] = 1  (base: single house)
      solve(1, 0) = max(pick: 2+0, skip: 1) = max(2, 1) = 2
      solve(2, 0) = max(pick: 3+1, skip: 2) = max(4, 2) = 4

    Case 2: houses [1..3] → solveRange(3, 1)
      solve(1, 1) = nums[1] = 2  (base: single house)
      solve(2, 1) = max(pick: 3+0, skip: 2) = max(3, 2) = 3
      solve(3, 1) = max(pick: 1+2, skip: 3) = max(3, 3) = 3

    Answer: max(4, 3) = 4 ✓

=============================================================================
*/

function robMemo(nums) {
    let n = nums.length;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);

    // Memoized House Robber I on subarray [start..end]
    function solveRange(start, end) {
        let dp = new Array(n).fill(-1);

        function solve(i) {
            // Base cases
            if (i < start) return 0;       // past the start boundary
            if (i === start) return nums[start];  // only 1 house in range

            // Return cached
            if (dp[i] !== -1) return dp[i];

            // PICK: rob house i, skip i-1, go to i-2
            let take = nums[i] + solve(i - 2);
            // NOT-PICK: skip house i, go to i-1
            let skip = solve(i - 1);

            return dp[i] = Math.max(take, skip);
        }

        return solve(end);
    }

    // Case 1: Exclude last house → [0 .. n-2]
    let excludeLast = solveRange(0, n - 2);

    // Case 2: Exclude first house → [1 .. n-1]
    let excludeFirst = solveRange(1, n - 1);

    return Math.max(excludeLast, excludeFirst);
}

/*
=============================================================================
  APPROACH 2: Tabulation (Bottom-Up) — O(N) Time, O(N) Space
=============================================================================

  Convert recursion to iteration for each case.
  dp[i] = max robbery considering houses [start..i]

  Base: dp[start] = nums[start]
  Transition: dp[i] = max(nums[i] + dp[i-2], dp[i-1])
  Answer: dp[end]

  Dry Run: [2, 3, 2]

    Case 1: houses [0..1]
      dp[0] = 2
      dp[1] = max(3+0, 2) = max(3, 2) = 3
      → excludeLast = 3

    Case 2: houses [1..2]
      dp[1] = 3
      dp[2] = max(2+0, 3) = max(2, 3) = 3
      → excludeFirst = 3

    Answer: max(3, 3) = 3 ✓

  Dry Run: [1, 2, 3, 1]

    Case 1: houses [0..2]
      dp[0] = 1
      dp[1] = max(2+0, 1) = 2
      dp[2] = max(3+dp[0], dp[1]) = max(3+1, 2) = 4
      → excludeLast = 4

    Case 2: houses [1..3]
      dp[1] = 2
      dp[2] = max(3+0, 2) = 3
      dp[3] = max(1+dp[1], dp[2]) = max(1+2, 3) = 3
      → excludeFirst = 3

    Answer: max(4, 3) = 4 ✓

  Dry Run: [2, 7, 9, 3, 1]

    Case 1: houses [0..3]
      dp[0] = 2
      dp[1] = max(7+0, 2) = 7
      dp[2] = max(9+2, 7) = 11
      dp[3] = max(3+7, 11) = 11
      → excludeLast = 11

    Case 2: houses [1..4]
      dp[1] = 7
      dp[2] = max(9+0, 7) = 9
      dp[3] = max(3+7, 9) = 10
      dp[4] = max(1+9, 10) = 10
      → excludeFirst = 10

    Answer: max(11, 10) = 11 ✓

=============================================================================
*/

function robTab(nums) {
    let n = nums.length;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);

    // Tabulated House Robber I on subarray [start..end]
    function solveRange(start, end) {
        let dp = new Array(n).fill(0);
        dp[start] = nums[start];

        for (let i = start + 1; i <= end; i++) {
            let take = nums[i] + (i >= start + 2 ? dp[i - 2] : 0);
            let skip = dp[i - 1];
            dp[i] = Math.max(take, skip);
        }
        return dp[end];
    }

    // Case 1: Exclude last house → [0 .. n-2]
    let excludeLast = solveRange(0, n - 2);

    // Case 2: Exclude first house → [1 .. n-1]
    let excludeFirst = solveRange(1, n - 1);

    return Math.max(excludeLast, excludeFirst);
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  dp[i] depends only on dp[i-1] and dp[i-2] → just keep 2 variables.
  prev2 = dp[i-2], prev1 = dp[i-1]

  Dry Run: [2, 3, 2]

    Case 1: houses [0..1]
      prev2=0, prev1=0
      i=0: take=2+0=2, skip=0 → curr=2 → prev2=0, prev1=2
      i=1: take=3+0=3, skip=2 → curr=3 → prev2=2, prev1=3
      → excludeLast = 3

    Case 2: houses [1..2]
      prev2=0, prev1=0
      i=1: take=3+0=3, skip=0 → curr=3 → prev2=0, prev1=3
      i=2: take=2+0=2, skip=3 → curr=3 → prev2=3, prev1=3
      → excludeFirst = 3

    Answer: max(3, 3) = 3 ✓

  Dry Run: [1, 2, 3, 1]

    Case 1: houses [0..2]
      prev2=0, prev1=0
      i=0: take=1+0=1, skip=0 → curr=1 → prev2=0, prev1=1
      i=1: take=2+0=2, skip=1 → curr=2 → prev2=1, prev1=2
      i=2: take=3+1=4, skip=2 → curr=4 → prev2=2, prev1=4
      → excludeLast = 4

    Case 2: houses [1..3]
      prev2=0, prev1=0
      i=1: take=2+0=2, skip=0 → curr=2 → prev2=0, prev1=2
      i=2: take=3+0=3, skip=2 → curr=3 → prev2=2, prev1=3
      i=3: take=1+2=3, skip=3 → curr=3 → prev2=3, prev1=3
      → excludeFirst = 3

    Answer: max(4, 3) = 4 ✓

=============================================================================
*/

// Helper: House Robber on subarray [start..end]
function robRange(nums, start, end) {
    let prev2 = 0, prev1 = 0;
    for (let i = start; i <= end; i++) {
        let take = nums[i] + prev2;
        let skip = prev1;
        let curr = Math.max(take, skip);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

function rob(nums) {
    let n = nums.length;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);

    // Case 1: Exclude last house (0 to n-2)
    let excludeLast = robRange(nums, 0, n - 2);

    // Case 2: Exclude first house (1 to n-1)
    let excludeFirst = robRange(nums, 1, n - 1);

    return Math.max(excludeLast, excludeFirst);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log("Memoization:", robMemo([2, 3, 2]));      // 3
console.log("Memoization:", robMemo([1, 2, 3, 1]));   // 4
console.log("Memoization:", robMemo([2, 7, 9, 3, 1]));// 11

console.log("Tabulation:", robTab([2, 3, 2]));         // 3
console.log("Tabulation:", robTab([1, 2, 3, 1]));      // 4
console.log("Tabulation:", robTab([2, 7, 9, 3, 1]));   // 11

console.log("Optimized:", rob([2, 3, 2]));              // 3
console.log("Optimized:", rob([1, 2, 3, 1]));           // 4
console.log("Optimized:", rob([2, 7, 9, 3, 1]));        // 11
