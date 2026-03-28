/*
=============================================================================
  QUESTION: 494. Target Sum (LeetCode)
=============================================================================

  Assign + or - to each element. Count ways to reach target sum.

  Example: nums=[1,1,1,1,1], target=3 → 5 ways
    -1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1, +1+1+1-1+1, +1+1+1+1-1

=============================================================================
  KEY INSIGHT: Reduce to Count Subsets with Sum
=============================================================================

  Split nums into two groups: P (positive) and N (negative).
  P - N = target
  P + N = total
  → P = (total + target) / 2

  So: count subsets with sum = (total + target) / 2.

  Edge cases:
    |target| > total → impossible
    (total + target) is odd → impossible

=============================================================================
  APPROACH: Space Optimized — O(N×S) Time, O(S) Space
=============================================================================
*/

function findTargetSumWays(nums, target) {
    let total = nums.reduce((a, b) => a + b, 0);
    if (Math.abs(target) > total) return 0;
    if ((total + target) % 2 !== 0) return 0;
    let s = (total + target) / 2;

    let n = nums.length;
    let prev = new Array(s + 1).fill(0);
    // Handle zeros: 0 can be +0 or -0, both contribute
    if (nums[0] === 0) prev[0] = 2;
    else { prev[0] = 1; if (nums[0] <= s) prev[nums[0]] = 1; }

    for (let i = 1; i < n; i++) {
        let curr = new Array(s + 1).fill(0);
        for (let t = 0; t <= s; t++) {
            let take = nums[i] <= t ? prev[t - nums[i]] : 0;
            curr[t] = take + prev[t];
        }
        prev = curr;
    }
    return prev[s];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));  // 5
console.log(findTargetSumWays([1], 1));                // 1
