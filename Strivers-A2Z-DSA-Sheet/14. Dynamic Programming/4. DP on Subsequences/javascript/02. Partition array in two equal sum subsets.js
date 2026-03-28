/*
=============================================================================
  QUESTION: 416. Partition Equal Subset Sum (LeetCode)
=============================================================================

  Can array be split into two subsets with EQUAL sum?

  Example: [1,5,11,5] → true ([1,5,5]=11 & [11]=11)
  Example: [1,2,3,5] → false (sum=11, odd → impossible)

=============================================================================
  KEY INSIGHT: Reduction to Subset Sum
=============================================================================

  If totalSum is ODD → impossible (can't split equally).
  If totalSum is EVEN → check: "does a subset exist with sum = totalSum/2?"
  If yes → the remaining elements also sum to totalSum/2. Done!

  This directly reduces to the Subset Sum problem!

  Dry Run: [1, 5, 11, 5]
    totalSum = 22, target = 11
    Subset {11} sums to 11 → remaining {1,5,5} sums to 11 ✓

=============================================================================
  APPROACH 1: Memoization — O(N×sum) Time, O(N×sum) Space
  (Same as Subset Sum with target = totalSum/2)
=============================================================================
*/

function canPartitionMemo(nums) {
    let sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    let target = sum / 2, n = nums.length;
    let dp = Array.from({ length: n }, () => new Array(target + 1).fill(-1));

    function solve(i, s) {
        if (s === 0) return true;
        if (i === 0) return nums[0] === s;
        if (dp[i][s] !== -1) return dp[i][s];
        let take = nums[i] <= s ? solve(i - 1, s - nums[i]) : false;
        return dp[i][s] = take || solve(i - 1, s);
    }

    return solve(n - 1, target);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N×sum) Time, O(sum) Space
=============================================================================

  Dry Run: [1, 5, 11, 5], target=11
    prev[0]=T, prev[1]=T (arr[0]=1)
    i=1 (5): curr[5]=T, curr[6]=T (1+5)
    i=2 (11): curr[11]=T ← found! ✓

=============================================================================
*/

function canPartition(nums) {
    let sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    let target = sum / 2, n = nums.length;

    let prev = new Array(target + 1).fill(false);
    prev[0] = true;
    if (nums[0] <= target) prev[nums[0]] = true;

    for (let i = 1; i < n; i++) {
        let curr = new Array(target + 1).fill(false);
        curr[0] = true;
        for (let s = 1; s <= target; s++) {
            let take = nums[i] <= s ? prev[s - nums[i]] : false;
            curr[s] = take || prev[s];
        }
        prev = curr;
    }
    return prev[target];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(canPartitionMemo([1, 5, 11, 5]));  // true
console.log(canPartition([1, 5, 11, 5]));       // true
console.log(canPartition([1, 2, 3, 5]));        // false
