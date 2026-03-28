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

=============================================================================
  APPROACH: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  Use House Robber's space-optimized solution on each range.

  Dry Run: [2, 3, 2]
    Case 1: robRange(0,1) → [2,3] → max(2,3) = 3
    Case 2: robRange(1,2) → [3,2] → max(3,2) = 3
    Answer: max(3, 3) = 3 ✓

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
console.log(rob([2, 3, 2]));      // 3
console.log(rob([1, 2, 3, 1]));   // 4
console.log(rob([1, 2, 3]));      // 3
