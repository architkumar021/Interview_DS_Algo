/*
=============================================================================
  QUESTION: 1043. Partition Array for Maximum Sum (LeetCode)
=============================================================================

  Partition array into contiguous subarrays of length at most k.
  After partitioning, replace each element with the MAX of its subarray.
  Return maximum sum.

  Example: arr=[1,15,7,9,2,5,10], k=3 → 84
    Partition: [15,15,15] + [9,9] + [10,10] = 45+18+20 = 83? 
    Actually: [15,15] + [15] + [9,9] + [10,10] → 84

=============================================================================
  PATTERN: Front Partition DP
=============================================================================

  solve(i) = max sum for arr[i..n-1].
  At index i, try partition lengths 1 to k:
    For each j from i to min(i+k-1, n-1):
      subarray [i..j]: length = j-i+1, max element = maxi
      contribution = maxi × (j-i+1) + solve(j+1)
  Take maximum over all j.

  Base: i == n → 0

=============================================================================
  APPROACH: Memoization — O(N×K) Time, O(N) Space
=============================================================================
*/

function maxSumAfterPartitioning(arr, k) {
    let n = arr.length;
    let dp = new Array(n).fill(-1);

    function solve(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let maxi = 0, ans = 0;
        for (let j = i; j < Math.min(i + k, n); j++) {
            maxi = Math.max(maxi, arr[j]);
            // Replace all elements in [i..j] with maxi
            ans = Math.max(ans, maxi * (j - i + 1) + solve(j + 1));
        }
        return dp[i] = ans;
    }

    return solve(0);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3));  // 84
