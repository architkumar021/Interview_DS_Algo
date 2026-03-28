/*
=============================================================================
  QUESTION: 673. Number of Longest Increasing Subsequences (LeetCode)
=============================================================================

  Return the NUMBER of longest increasing subsequences.

  Example: [1, 3, 5, 4, 7] → 2 (LIS: [1,3,5,7] and [1,3,4,7])

=============================================================================
  KEY INSIGHT: Track both length AND count
=============================================================================

  dp[i]  = length of LIS ending at i (same as regular LIS)
  cnt[i] = number of LIS of that length ending at i

  For each j < i where nums[j] < nums[i]:
    - If dp[j]+1 > dp[i]: found longer LIS → dp[i] = dp[j]+1, cnt[i] = cnt[j]
    - If dp[j]+1 == dp[i]: found another way → cnt[i] += cnt[j]

  Answer: sum of cnt[i] where dp[i] == maxLength

  Dry Run: [1, 3, 5, 4, 7]
    dp  = [1, 2, 3, 3, 4]
    cnt = [1, 1, 1, 1, 2]

    i=4 (7): j=2(5<7, dp=3+1=4>dp[4]) → dp[4]=4, cnt[4]=1
             j=3(4<7, dp=3+1=4==dp[4]) → cnt[4]+=1 → cnt[4]=2
    LIS length=4, count=2 ✓ (paths: 1→3→5→7 and 1→3→4→7)

=============================================================================
  APPROACH: DP — O(N²) Time, O(N) Space
=============================================================================
*/

function findNumberOfLIS(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(1);   // LIS length ending at i
    let cnt = new Array(n).fill(1);  // count of LIS of that length

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    cnt[i] = cnt[j];     // inherit count from j
                } else if (dp[j] + 1 === dp[i]) {
                    cnt[i] += cnt[j];    // add more ways
                }
            }
        }
    }

    let lis = Math.max(...dp);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === lis) ans += cnt[i];
    }
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(findNumberOfLIS([1, 3, 5, 4, 7]));  // 2
console.log(findNumberOfLIS([2, 2, 2, 2, 2]));  // 5
