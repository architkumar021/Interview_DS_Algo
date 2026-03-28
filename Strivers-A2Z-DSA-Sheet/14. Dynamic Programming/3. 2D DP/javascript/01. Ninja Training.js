/*
=============================================================================
  QUESTION: Ninja Training (GFG / Coding Ninjas)
=============================================================================

  n days, 3 activities (0,1,2) each day. Each has merit points.
  CONSTRAINT: Can't do SAME activity on consecutive days.
  Maximize total merit points.

  Example: points = [[1,2,5],[3,1,1],[3,3,3]]
    Day 0: Activity 2 → 5
    Day 1: Activity 0 → 3  (can't do 2 again)
    Day 2: Activity 1 → 3  (can't do 0 again)
    Total: 5+3+3 = 11 ✓

=============================================================================
  PATTERN: 2D State = (day, last activity performed)
=============================================================================

  solve(day, prev) = max points from day 0..day, where prev = last activity

  At each day, try all 3 activities EXCEPT prev:
    for i in {0,1,2}, i != prev:
      ans = max(ans, points[day][i] + solve(day-1, i))

  Base case: day < 0 → return 0

  Recursion Tree for [[1,2,5],[3,1,1],[3,3,3]]:

                          solve(2, 3)          ← 3 = no previous
                      /       |       \
             a=0: 3+solve(1,0)  a=1: 3+solve(1,1)  a=2: 3+solve(1,2)
                  /    \            /    \             /     \
          a=1:1+s(0,1) a=2:1+s(0,2) a=0:3+s(0,0) a=2:1+s(0,2) a=0:3+s(0,0) a=1:1+s(0,1)

  solve(0,0) = max(pts[0][1], pts[0][2]) = max(2,5) = 5
  solve(0,1) = max(pts[0][0], pts[0][2]) = max(1,5) = 5
  solve(0,2) = max(pts[0][0], pts[0][1]) = max(1,2) = 2

=============================================================================
  APPROACH 1: Memoization — O(N×4) Time, O(N×4) Space
=============================================================================

  Dry Run: [[1,2,5],[3,1,1],[3,3,3]]
    solve(0,0)=5, solve(0,1)=5, solve(0,2)=2
    solve(1,0): a=1→1+5=6, a=2→1+2=3 → 6
    solve(1,1): a=0→3+5=8, a=2→1+2=3 → 8
    solve(1,2): a=0→3+5=8, a=1→1+5=6 → 8
    solve(2,3): a=0→3+8=11, a=1→3+8=11, a=2→3+6=9 → 11 ✓

=============================================================================
*/

function ninjaTrainingMemo(points) {
    let n = points.length;
    // dp[day][prev]: prev=0,1,2 (last activity), 3=none
    let dp = Array.from({ length: n }, () => new Array(4).fill(-1));

    function solve(day, prev) {
        if (day < 0) return 0;
        if (dp[day][prev] !== -1) return dp[day][prev];

        let ans = 0;
        for (let i = 0; i < 3; i++) {
            if (i !== prev) {
                ans = Math.max(ans, points[day][i] + solve(day - 1, i));
            }
        }
        return dp[day][prev] = ans;
    }

    return solve(n - 1, 3); // 3 = no previous activity
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N×3) Time, O(N×3) Space
=============================================================================

  Simplified: dp[i][j] = max points on day i choosing activity j.
  dp[i][j] = points[i][j] + max(dp[i-1][k]) for k != j

  Dry Run: [[1,2,5],[3,1,1],[3,3,3]]
    dp[0] = [1, 2, 5]
    dp[1][0] = 3 + max(dp[0][1], dp[0][2]) = 3 + max(2,5) = 8
    dp[1][1] = 1 + max(dp[0][0], dp[0][2]) = 1 + max(1,5) = 6
    dp[1][2] = 1 + max(dp[0][0], dp[0][1]) = 1 + max(1,2) = 3
    dp[2][0] = 3 + max(6,3) = 9
    dp[2][1] = 3 + max(8,3) = 11
    dp[2][2] = 3 + max(8,6) = 11
    Answer: max(9, 11, 11) = 11 ✓

=============================================================================
*/

function ninjaTrainingTab(points) {
    let n = points.length;
    let dp = Array.from({ length: n }, () => new Array(3).fill(0));

    // Base: day 0
    for (let j = 0; j < 3; j++) dp[0][j] = points[0][j];

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (j !== k) {
                    dp[i][j] = Math.max(dp[i][j], points[i][j] + dp[i - 1][k]);
                }
            }
        }
    }
    return Math.max(...dp[n - 1]);
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N×3) Time, O(1) Space
=============================================================================

  dp[i][j] only depends on dp[i-1][...] → keep just prev row (3 values).

  Dry Run: [[1,2,5],[3,1,1],[3,3,3]]
    prev = [1, 2, 5]
    i=1: curr[0]=3+max(2,5)=8, curr[1]=1+max(1,5)=6, curr[2]=1+max(1,2)=3
    prev = [8, 6, 3]
    i=2: curr[0]=3+max(6,3)=9, curr[1]=3+max(8,3)=11, curr[2]=3+max(8,6)=11
    Answer: max(9, 11, 11) = 11 ✓

=============================================================================
*/

function ninjaTraining(points) {
    let n = points.length;
    let prev = [...points[0]];

    for (let i = 1; i < n; i++) {
        let curr = [0, 0, 0];
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (j !== k) {
                    curr[j] = Math.max(curr[j], points[i][j] + prev[k]);
                }
            }
        }
        prev = curr;
    }
    return Math.max(...prev);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(ninjaTrainingMemo([[1,2,5],[3,1,1],[3,3,3]]));  // 11
console.log(ninjaTrainingTab([[1,2,5],[3,1,1],[3,3,3]]));   // 11
console.log(ninjaTraining([[1,2,5],[3,1,1],[3,3,3]]));      // 11

