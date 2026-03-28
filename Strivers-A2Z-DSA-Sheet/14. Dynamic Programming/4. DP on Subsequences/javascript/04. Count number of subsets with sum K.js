/*
=============================================================================
  QUESTION: Count Subsets with Sum K (GFG)
=============================================================================

  Count all subsets with sum = target. Answer mod 10^9+7.
  Example: arr=[2,3,5,6,8,10], sum=10 → 3 ({2,3,5},{2,8},{10})

  Edge case: arr[0]==0 → at i=0, sum=0: 2 ways (pick 0 or skip 0).

=============================================================================
  APPROACH 1: Memoization — O(N×sum) Time, O(N×sum) Space
=============================================================================
*/

const MOD = 1e9 + 7;

function countSubsetsMemo(arr, target) {
    let n = arr.length;
    let dp = Array.from({ length: n }, () => new Array(target + 1).fill(-1));

    function solve(i, sum) {
        if (i === 0) {
            if (sum === 0 && arr[0] === 0) return 2;
            if (sum === 0) return 1;
            return arr[0] === sum ? 1 : 0;
        }
        if (dp[i][sum] !== -1) return dp[i][sum];
        let take = arr[i] <= sum ? solve(i - 1, sum - arr[i]) : 0;
        let skip = solve(i - 1, sum);
        return dp[i][sum] = (take + skip) % MOD;
    }
    return solve(n - 1, target);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N×sum) Time, O(sum) Space
=============================================================================
*/

function countSubsets(arr, target) {
    let n = arr.length;
    let prev = new Array(target + 1).fill(0);
    if (arr[0] === 0) prev[0] = 2;
    else { prev[0] = 1; if (arr[0] <= target) prev[arr[0]] = 1; }

    for (let i = 1; i < n; i++) {
        let curr = new Array(target + 1).fill(0);
        for (let s = 0; s <= target; s++) {
            let take = arr[i] <= s ? prev[s - arr[i]] : 0;
            curr[s] = (take + prev[s]) % MOD;
        }
        prev = curr;
    }
    return prev[target];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(countSubsetsMemo([2,3,5,6,8,10], 10));  // 3
console.log(countSubsets([2,3,5,6,8,10], 10));       // 3

