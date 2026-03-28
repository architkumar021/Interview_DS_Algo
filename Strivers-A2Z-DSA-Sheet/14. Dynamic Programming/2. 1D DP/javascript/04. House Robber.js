/*
=============================================================================
  QUESTION: 198. House Robber (LeetCode)
=============================================================================

  You're a robber. Houses in a line, each has money nums[i].
  Can't rob two ADJACENT houses. Maximize stolen money.

  Example 1: nums = [1, 2, 3, 1]
    Rob house 0 & 2: 1 + 3 = 4
    Rob house 1 & 3: 2 + 1 = 3
    Answer: 4

  Example 2: nums = [2, 7, 9, 3, 1]
    Rob house 0,2,4: 2+9+1 = 12
    Answer: 12

=============================================================================
  PATTERN: Pick / Not-Pick (Classic DP Pattern)
=============================================================================

  At each house i, TWO choices:
    PICK (rob):     take nums[i], skip i-1, go to i-2 → nums[i] + solve(i-2)
    NOT-PICK (skip): skip i, go to i-1              → solve(i-1)

  Recursion Tree for [2, 7, 9, 3, 1]:

                          solve(4) = max(pick, skip)
                         /                  \
            pick: 1+solve(2)          skip: solve(3)
                  /     \                /         \
        pick:9+solve(0) skip:solve(1) pick:3+solve(1)  skip:solve(2)
             |            |               |              |
          9+2=11     solve(1)=7        3+7=10        solve(2)=11
                    pick:7+solve(-1)=7

  solve(4) = max(1+11, max(10,11)) = max(12, 11) = 12 ✓

=============================================================================
  APPROACH 1: Memoization — O(N) Time, O(N) Space
=============================================================================

  Dry Run: [2, 7, 9, 3, 1]
    solve(0) = 2 (base: only 1 house)
    solve(1) = max(pick: 7+0, skip: 2) = max(7, 2) = 7
    solve(2) = max(pick: 9+2, skip: 7) = max(11, 7) = 11
    solve(3) = max(pick: 3+7, skip: 11) = max(10, 11) = 11
    solve(4) = max(pick: 1+11, skip: 11) = max(12, 11) = 12 ✓

=============================================================================
*/

function robMemo(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(-1);

    function solve(i) {
        // Base cases
        if (i < 0) return 0;            // no houses left
        if (i === 0) return nums[0];    // only 1 house

        // Return cached
        if (dp[i] !== -1) return dp[i];

        // Pick: rob this house + solve(i-2)
        let take = nums[i] + solve(i - 2);
        // Not-Pick: skip this house
        let skip = solve(i - 1);

        return dp[i] = Math.max(take, skip);
    }

    return solve(n - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N) Time, O(N) Space
=============================================================================

  Dry Run: [2, 7, 9, 3, 1]
    dp[0] = 2
    dp[1] = max(7+0, 2) = 7
    dp[2] = max(9+dp[0], dp[1]) = max(11, 7) = 11
    dp[3] = max(3+dp[1], dp[2]) = max(10, 11) = 11
    dp[4] = max(1+dp[2], dp[3]) = max(12, 11) = 12 ✓

=============================================================================
*/

function robTab(nums) {
    let n = nums.length;
    if (n === 1) return nums[0];

    let dp = new Array(n);
    dp[0] = nums[0];

    for (let i = 1; i < n; i++) {
        let take = nums[i] + (i >= 2 ? dp[i - 2] : 0);
        let skip = dp[i - 1];
        dp[i] = Math.max(take, skip);
    }
    return dp[n - 1];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N) Time, O(1) Space
=============================================================================

  dp[i] depends on dp[i-1] and dp[i-2] only → keep 2 vars.

  Dry Run: [2, 7, 9, 3, 1]
    prev2=0, prev1=2    (before house 0)
    i=1: take=7+0=7, skip=2 → curr=7 → prev2=2, prev1=7
    i=2: take=9+2=11, skip=7 → curr=11 → prev2=7, prev1=11
    i=3: take=3+7=10, skip=11 → curr=11 → prev2=11, prev1=11
    i=4: take=1+11=12, skip=11 → curr=12 → prev2=11, prev1=12
    Answer: 12 ✓

=============================================================================
*/

function rob(nums) {
    let n = nums.length;
    if (n === 1) return nums[0];

    let prev2 = 0, prev1 = nums[0];

    for (let i = 1; i < n; i++) {
        let take = nums[i] + prev2;
        let skip = prev1;
        let curr = Math.max(take, skip);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(robMemo([1, 2, 3, 1]));     // 4
console.log(robTab([2, 7, 9, 3, 1]));   // 12
console.log(rob([1, 2, 3, 1]));          // 4
console.log(rob([2, 7, 9, 3, 1]));       // 12

