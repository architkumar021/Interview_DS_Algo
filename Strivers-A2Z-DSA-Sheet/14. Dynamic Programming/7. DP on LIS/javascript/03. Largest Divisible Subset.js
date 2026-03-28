/*
=============================================================================
  QUESTION: 368. Largest Divisible Subset (LeetCode)
=============================================================================

  Given distinct positive integers, return largest subset where for every
  pair (a, b): a % b == 0 OR b % a == 0.

  Example: [1, 2, 4, 8] → [1, 2, 4, 8] (each divides the next)
  Example: [1, 2, 3] → [1, 2] or [1, 3]

=============================================================================
  KEY INSIGHT: Sort + LIS variant
=============================================================================

  After sorting, if nums[i] % nums[j] == 0, we can extend the chain.
  This is exactly LIS with condition: nums[i] % nums[j] == 0 instead of >.

  Sort → dp[i] = longest divisible chain ending at i.
  Use parent tracking (same as Print LIS) to reconstruct the subset.

  Dry Run: [1, 2, 4, 8]
    dp   = [1, 2, 3, 4]  (each divides the next)
    prev = [-1, 0, 1, 2]
    Backtrack from idx=3: 8→4→2→1 → [1,2,4,8] ✓

=============================================================================
  APPROACH: Sort + LIS DP — O(N²) Time, O(N) Space
=============================================================================
*/

function largestDivisibleSubset(nums) {
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let dp = new Array(n).fill(1);
    let prev = new Array(n).fill(-1);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0 && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }

    // Backtrack to build subset
    let idx = dp.indexOf(Math.max(...dp));
    let res = [];
    while (idx >= 0) {
        res.push(nums[idx]);
        idx = prev[idx];
    }
    return res.reverse();
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(largestDivisibleSubset([1, 2, 4, 8]));  // [1, 2, 4, 8]
console.log(largestDivisibleSubset([1, 2, 3]));      // [1, 2] or [1, 3]
