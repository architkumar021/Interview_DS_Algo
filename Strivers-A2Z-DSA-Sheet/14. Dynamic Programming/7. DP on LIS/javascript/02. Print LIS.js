/*
=============================================================================
  QUESTION: Print Longest Increasing Subsequence
=============================================================================

  Given array, return the ACTUAL LIS (not just length).

  Example: [10, 9, 2, 5, 3, 7, 101, 18] → [2, 5, 7, 101] or [2, 3, 7, 101]

=============================================================================
  APPROACH: DP + Parent Tracking — O(N²) Time, O(N) Space
=============================================================================

  1. Compute dp[i] = length of LIS ending at i (same as LIS problem).
  2. Also track prev[i] = index of previous element in LIS ending at i.
  3. Find index of max dp value → backtrack using prev[] to build LIS.

  Dry Run: [10, 9, 2, 5, 3, 7, 101, 18]
    dp   = [1, 1, 1, 2, 2, 3, 4, 4]
    prev = [-1,-1,-1, 2, 2, 4, 5, 5]

  Backtrack from idx=6 (dp[6]=4):
    idx=6 → nums[6]=101
    idx=prev[6]=5 → nums[5]=7
    idx=prev[5]=4 → nums[4]=3
    idx=prev[4]=2 → nums[2]=2
    idx=prev[2]=-1 → stop
  LIS = [2, 3, 7, 101] ✓

=============================================================================
*/

function printLIS(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(1);
    let prev = new Array(n).fill(-1);  // parent index tracking

    // Step 1: Compute dp[] and prev[]
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;  // j is parent of i in LIS
            }
        }
    }

    // Step 2: Find index with max dp value
    let idx = dp.indexOf(Math.max(...dp));

    // Step 3: Backtrack to build LIS
    let lis = [];
    while (idx >= 0) {
        lis.push(nums[idx]);
        idx = prev[idx];
    }
    return lis.reverse();
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(printLIS([10, 9, 2, 5, 3, 7, 101, 18]));  // [2, 3, 7, 101]
console.log(printLIS([0, 1, 0, 3, 2, 3]));             // [0, 1, 2, 3]
