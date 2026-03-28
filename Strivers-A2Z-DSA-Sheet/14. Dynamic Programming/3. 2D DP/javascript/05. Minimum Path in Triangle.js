/*
=============================================================================
  QUESTION: 120. Triangle — Minimum Path Sum (LeetCode)
=============================================================================

  Given triangle array, find minimum path sum from top to bottom.
  From row i, index j → can move to index j or j+1 on next row.

  Example: [[2],[3,4],[6,5,7],[4,1,8,3]] → 11

  Triangle visualization:
       2
      3 4
     6 5 7
    4 1 8 3

  Path: 2→3→5→1 = 11 ✓

=============================================================================
  PATTERN: Variable Start/End Points
=============================================================================

  Unlike grid problems (fixed start/end), triangle has:
  - Fixed START: top (0,0)
  - Variable END: any element in last row

  solve(i,j) = triangle[i][j] + min(solve(i+1,j), solve(i+1,j+1))
  Base: last row → return triangle[n-1][j]

  Recursion Tree for [[2],[3,4],[6,5,7],[4,1,8,3]]:

                      solve(0,0) = 2 + min(solve(1,0), solve(1,1))
                     /                        \
          solve(1,0) = 3+min(s(2,0),s(2,1))   solve(1,1) = 4+min(s(2,1),s(2,2))
              /            \                      /             \
    s(2,0)=6+min(4,1)=7  s(2,1)=5+min(1,8)=6  s(2,1)=6(cached) s(2,2)=7+min(8,3)=10

  solve(1,0) = 3+min(7,6) = 9
  solve(1,1) = 4+min(6,10) = 10
  solve(0,0) = 2+min(9,10) = 11 ✓

=============================================================================
  APPROACH 1: Memoization — O(N²) Time, O(N²) Space
=============================================================================
*/

function minimumTotalMemo(triangle) {
    let n = triangle.length;
    let dp = Array.from({ length: n }, (_, i) => new Array(i + 1).fill(-1));

    function solve(i, j) {
        // Base: last row — just return the value
        if (i === n - 1) return triangle[i][j];
        if (dp[i][j] !== -1) return dp[i][j];

        // Go down-left (j) or down-right (j+1)
        return dp[i][j] = Math.min(solve(i + 1, j), solve(i + 1, j + 1)) + triangle[i][j];
    }

    return solve(0, 0);
}

/*
=============================================================================
  APPROACH 2: Tabulation (Bottom-Up) — O(N²) Time, O(N²) Space
=============================================================================

  Fill from bottom row upward.

  Dry Run: [[2],[3,4],[6,5,7],[4,1,8,3]]
    Start: dp = [4,1,8,3]  (last row)
    Row 2: dp[0]=6+min(4,1)=7, dp[1]=5+min(1,8)=6, dp[2]=7+min(8,3)=10
    Row 1: dp[0]=3+min(7,6)=9, dp[1]=4+min(6,10)=10
    Row 0: dp[0]=2+min(9,10)=11 ✓

=============================================================================
*/

function minimumTotalTab(triangle) {
    let n = triangle.length;
    let dp = Array.from({ length: n }, (_, i) => [...triangle[i]]);

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
        }
    }
    return dp[0][0];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N²) Time, O(N) Space
=============================================================================

  Only need one row at a time (bottom-up). prev = current bottom row.

  Dry Run: [[2],[3,4],[6,5,7],[4,1,8,3]]
    prev = [4, 1, 8, 3]
    i=2: curr = [7, 6, 10]
    i=1: curr = [9, 10]
    i=0: curr = [11]
    Answer: 11 ✓

=============================================================================
*/

function minimumTotal(triangle) {
    let n = triangle.length;
    let prev = [...triangle[n - 1]]; // copy last row

    for (let i = n - 2; i >= 0; i--) {
        let curr = new Array(i + 1);
        for (let j = i; j >= 0; j--) {
            curr[j] = Math.min(prev[j], prev[j + 1]) + triangle[i][j];
        }
        prev = curr;
    }
    return prev[0];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minimumTotalMemo([[2],[3,4],[6,5,7],[4,1,8,3]]));  // 11
console.log(minimumTotalTab([[2],[3,4],[6,5,7],[4,1,8,3]]));   // 11
console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]));      // 11
