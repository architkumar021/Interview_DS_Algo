/*
=============================================================================
  QUESTION: Subset Sum Equal to K (GFG)
=============================================================================

  Given array arr[] and target sum. Check if ANY subset sums to target.
  Example: arr=[3,34,4,12,5,2], target=9 → true (4+3+2 = 9)
  Example: arr=[3,34,4,12,5,2], target=30 → false

=============================================================================
  PATTERN: Pick / Not-Pick (Boolean DP)
=============================================================================

  solve(i, sum) = "can we form sum using elements 0..i?"

  At each element i:
    PICK:     solve(i-1, sum - arr[i])   (if arr[i] <= sum)
    NOT-PICK: solve(i-1, sum)
    Result:   pick OR skip (either way works!)

  Base cases:
    sum == 0 → TRUE (empty subset)
    i == 0   → arr[0] == sum

  Recursion Tree for arr=[3,4,2], target=5:

                       solve(2, 5)
                      /            \
          pick: solve(1, 3)      skip: solve(1, 5)
              /        \            /         \
      pick:solve(0,0) skip:s(0,3) pick:s(0,1) skip:s(0,5)
         ↓ TRUE(sum=0)  ↓ TRUE    ↓ FALSE     ↓ FALSE

  solve(1,3) = TRUE (3+... or just 3), solve(2,5) = TRUE ✓
  Subset: {3, 2} = 5 ✓

=============================================================================
  APPROACH 1: Memoization — O(N×sum) Time, O(N×sum) Space
=============================================================================

  Dry Run: arr=[3,34,4,12,5,2], target=9
    solve(0,3)=TRUE (arr[0]=3=sum)
    solve(1,9): pick→solve(0,9-34)<0→FALSE, skip→solve(0,9)=FALSE → FALSE
    solve(2,9): pick→solve(1,5), skip→solve(1,9)=FALSE
    solve(2,5): pick→solve(1,1), skip→solve(1,5)
    ...eventually: solve(5,9) = TRUE ✓

=============================================================================
*/

function subsetSumMemo(arr, target) {
    let n = arr.length;
    let dp = Array.from({ length: n }, () => new Array(target + 1).fill(-1));

    function solve(i, sum) {
        // Base: target achieved → empty subset
        if (sum === 0) return true;
        // Base: only first element → does it equal target?
        if (i === 0) return arr[0] === sum;
        // Return cached
        if (dp[i][sum] !== -1) return dp[i][sum];

        // PICK: include arr[i] in subset
        let take = arr[i] <= sum ? solve(i - 1, sum - arr[i]) : false;
        // NOT-PICK: exclude arr[i]
        let skip = solve(i - 1, sum);

        return dp[i][sum] = take || skip;
    }

    return solve(n - 1, target);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N×sum) Time, O(N×sum) Space
=============================================================================

  dp[i][s] = true/false: can we form sum s using elements 0..i?

  Base: dp[i][0] = true for all i (empty subset)
        dp[0][arr[0]] = true (first element alone)

=============================================================================
*/

function subsetSumTab(arr, target) {
    let n = arr.length;
    let dp = Array.from({ length: n }, () => new Array(target + 1).fill(false));

    // Base: sum=0 is always achievable
    for (let i = 0; i < n; i++) dp[i][0] = true;
    // Base: first element
    if (arr[0] <= target) dp[0][arr[0]] = true;

    for (let i = 1; i < n; i++) {
        for (let s = 1; s <= target; s++) {
            let take = arr[i] <= s ? dp[i - 1][s - arr[i]] : false;
            dp[i][s] = take || dp[i - 1][s];
        }
    }
    return dp[n - 1][target];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N×sum) Time, O(sum) Space
=============================================================================

  dp[i][s] only needs dp[i-1][...] → use prev/curr rows.

=============================================================================
*/

function subsetSum(arr, target) {
    let n = arr.length;
    let prev = new Array(target + 1).fill(false);
    prev[0] = true;
    if (arr[0] <= target) prev[arr[0]] = true;

    for (let i = 1; i < n; i++) {
        let curr = new Array(target + 1).fill(false);
        curr[0] = true;
        for (let s = 1; s <= target; s++) {
            let take = arr[i] <= s ? prev[s - arr[i]] : false;
            curr[s] = take || prev[s];
        }
        prev = curr;
    }
    return prev[target];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsetSumMemo([3,34,4,12,5,2], 9));  // true
console.log(subsetSumTab([3,34,4,12,5,2], 9));   // true
console.log(subsetSum([3,34,4,12,5,2], 9));       // true
console.log(subsetSum([3,34,4,12,5,2], 30));      // false

