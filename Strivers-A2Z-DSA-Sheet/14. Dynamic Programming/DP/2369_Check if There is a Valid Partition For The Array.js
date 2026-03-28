/*
=============================================================================
  QUESTION: 2369. Check if There is a Valid Partition For The Array
=============================================================================

  Partition array into contiguous subarrays where each satisfies:
    1. Exactly 2 equal elements [a, a]
    2. Exactly 3 equal elements [a, a, a]
    3. Exactly 3 consecutive increasing elements [a, a+1, a+2]

  Example: [4,4,4,5,6] → true ([4,4] + [4,5,6])

=============================================================================
  APPROACH 1: Memoization — O(N) Time, O(N) Space
=============================================================================
*/

function validPartitionMemo(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(-1);

    function solve(i) {
        if (i === n) return true;
        if (dp[i] !== -1) return dp[i];

        let res = false;

        // Rule 1: 2 equal elements
        if (i + 1 < n && nums[i] === nums[i + 1])
            res = res || solve(i + 2);

        // Rule 2: 3 equal elements
        if (i + 2 < n && nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2])
            res = res || solve(i + 3);

        // Rule 3: 3 consecutive increasing elements
        if (i + 2 < n && nums[i + 1] - nums[i] === 1 && nums[i + 2] - nums[i + 1] === 1)
            res = res || solve(i + 3);

        return dp[i] = res;
    }

    return solve(0);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================

  dp[i] = true if nums[0..i-1] can be validly partitioned.

=============================================================================
*/

function validPartition(nums) {
    let n = nums.length;
    let dp = new Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 2; i <= n; i++) {
        // Rule 1: last 2 elements equal
        if (dp[i - 2] && nums[i - 1] === nums[i - 2])
            dp[i] = true;
        // Rule 2: last 3 elements equal
        if (i >= 3 && dp[i - 3] && nums[i - 1] === nums[i - 2] && nums[i - 2] === nums[i - 3])
            dp[i] = true;
        // Rule 3: last 3 elements consecutive
        if (i >= 3 && dp[i - 3] && nums[i - 1] - nums[i - 2] === 1 && nums[i - 2] - nums[i - 3] === 1)
            dp[i] = true;
    }
    return dp[n];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(validPartitionMemo([4, 4, 4, 5, 6]));  // true
console.log(validPartition([4, 4, 4, 5, 6]));      // true
