/*
=============================================================================
  QUESTION: 312. Burst Balloons (LeetCode)
=============================================================================

  Burst balloons to maximize coins. Bursting balloon i earns:
  nums[left] × nums[i] × nums[right] (neighbors of i).
  After bursting, left and right become adjacent.

  Example: [3, 1, 5, 8] → 167

=============================================================================
  KEY INSIGHT: Think about which balloon to burst LAST
=============================================================================

  Problem: If we think forward (which to burst first), after bursting i
  the neighbors change — hard to track!

  Trick: Instead, think "which balloon is the LAST one burst in range [i,j]?"
  If k is the last balloon burst in [i..j]:
    - All balloons in [i..k-1] already burst
    - All balloons in [k+1..j] already burst
    - k is alone, so its neighbors are i-1 and j+1 (boundary balloons)
    - coins = nums[i-1] × nums[k] × nums[j+1] + solve(i,k-1) + solve(k+1,j)

  Add dummy balloons: nums = [1, ...original, 1] (boundaries)

  Dry Run: nums = [1, 3, 1, 5, 8, 1] (with boundaries)
    solve(1,4) try k=1,2,3,4:
      k=4: 1×8×1 + solve(1,3) + solve(5,4)=0
      solve(1,3): k=3: 1×5×8 + solve(1,2) + 0 = 40 + solve(1,2)
      solve(1,2): k=2: 1×1×5 + solve(1,1) + 0 = 5 + solve(1,1)
      solve(1,1): k=1: 1×3×1=3 → solve(1,2) at k=1: 1×3×5 + 0 + solve(2,2)
    Eventually: 167 ✓

=============================================================================
  APPROACH: Memoization — O(N³) Time, O(N²) Space
=============================================================================
*/

function maxCoins(nums) {
    nums = [1, ...nums, 1];  // add boundary balloons
    let n = nums.length;
    let dp = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(i, j) {
        if (j < i) return 0;  // no balloons in range
        if (dp[i][j] !== -1) return dp[i][j];

        let ans = -Infinity;
        // Try each k as the LAST balloon burst in [i,j]
        for (let k = i; k <= j; k++) {
            let coins = nums[i - 1] * nums[k] * nums[j + 1]  // k is alone
                      + solve(i, k - 1)                        // left part done
                      + solve(k + 1, j);                       // right part done
            ans = Math.max(ans, coins);
        }
        return dp[i][j] = ans;
    }

    return solve(1, n - 2);  // burst balloons 1 to n-2 (skip boundaries)
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxCoins([3, 1, 5, 8]));  // 167
