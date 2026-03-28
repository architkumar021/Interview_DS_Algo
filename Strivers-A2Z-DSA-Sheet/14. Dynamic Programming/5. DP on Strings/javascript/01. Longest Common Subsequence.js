/*
=============================================================================
  QUESTION: 1143. Longest Common Subsequence (LeetCode)
=============================================================================

  Given two strings s and r, return length of their longest common
  subsequence. A subsequence = chars in order, not necessarily contiguous.

  Example: s="abcde", r="ace" → 3 ("ace")
  Example: s="abc", r="def" → 0 (no common chars)

=============================================================================
  INTUITION
=============================================================================

  Compare characters from the END of both strings.
  At each step (i, j):
    - If s[i] == r[j] → MATCH! Both are part of LCS → 1 + solve(i-1, j-1)
    - If s[i] != r[j] → Try dropping one char from either string:
                         max(solve(i-1, j), solve(i, j-1))

  Base case: if i < 0 or j < 0 → return 0 (empty string)

  Recursion Tree for s="abc", r="ac":

                         solve(2,1)        s[2]='c', r[1]='c'
                              |
                    MATCH! 1 + solve(1,0)  s[1]='b', r[0]='a'
                           /         \
                  solve(0,0)      solve(1,-1)
                 s[0]='a',r[0]='a'    ↓ 0
                      |
               MATCH! 1+solve(-1,-1)
                         ↓ 0
  
  Result: 1 + 1 = 2 ✓ (LCS = "ac")

=============================================================================
  APPROACH 1: Memoization (Top-Down) — O(N×M) Time, O(N×M) Space
=============================================================================

  Dry Run: s="abcde", r="ace"

    solve(4,2): s[4]='e'==r[2]='e' → MATCH → 1 + solve(3,1)
    solve(3,1): s[3]='d'!=r[1]='c' → max(solve(2,1), solve(3,0))
    solve(2,1): s[2]='c'==r[1]='c' → MATCH → 1 + solve(1,0)
    solve(1,0): s[1]='b'!=r[0]='a' → max(solve(0,0), solve(1,-1))
    solve(0,0): s[0]='a'==r[0]='a' → MATCH → 1 + solve(-1,-1) = 1
    solve(1,-1): base → 0
    dp[1][0] = max(1, 0) = 1
    dp[2][1] = 1 + 1 = 2
    solve(3,0): s[3]='d'!=r[0]='a' → max(solve(2,0), solve(3,-1))
    solve(2,0): s[2]='c'!=r[0]='a' → max(solve(1,0), solve(2,-1))
    dp[2][0] = max(1, 0) = 1
    dp[3][0] = max(1, 0) = 1
    dp[3][1] = max(2, 1) = 2
    dp[4][2] = 1 + 2 = 3 ✓

=============================================================================
*/

function lcsMemo(s, r) {
    let n = s.length, m = r.length;
    let dp = Array.from({ length: n }, () => new Array(m).fill(-1));

    function solve(i, j) {
        // Base: either string exhausted
        if (i < 0 || j < 0) return 0;

        // Return cached
        if (dp[i][j] !== -1) return dp[i][j];

        // Characters MATCH → part of LCS
        if (s[i] === r[j])
            return dp[i][j] = 1 + solve(i - 1, j - 1);

        // Don't match → try shrinking either string
        return dp[i][j] = Math.max(solve(i - 1, j), solve(i, j - 1));
    }

    return solve(n - 1, m - 1);
}

/*
=============================================================================
  APPROACH 2: Tabulation (Bottom-Up) — O(N×M) Time, O(N×M) Space
=============================================================================

  Shift indices by +1 to avoid negative index. dp[i][j] uses s[i-1], r[j-1].

  dp table for s="abcde", r="ace":

          ""  a  c  e
    ""  [  0  0  0  0 ]
     a  [  0  1  1  1 ]
     b  [  0  1  1  1 ]
     c  [  0  1  2  2 ]
     d  [  0  1  2  2 ]
     e  [  0  1  2  3 ]  ← Answer: 3

=============================================================================
*/

function lcsTab(s, r) {
    let n = s.length, m = r.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s[i - 1] === r[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;  // match → diagonal + 1
            else
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);  // max(up, left)
        }
    }
    return dp[n][m];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N×M) Time, O(M) Space
=============================================================================

  dp[i][j] depends on: dp[i-1][j-1] (diagonal), dp[i-1][j] (above), dp[i][j-1] (left)
  → Only need prev row and curr row → 2 arrays of size M+1.

=============================================================================
*/

function lcs(s, r) {
    let n = s.length, m = r.length;
    let prev = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        let curr = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (s[i - 1] === r[j - 1])
                curr[j] = prev[j - 1] + 1;
            else
                curr[j] = Math.max(prev[j], curr[j - 1]);
        }
        prev = curr;
    }
    return prev[m];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(lcsMemo("abcde", "ace"));  // 3
console.log(lcsTab("abcde", "ace"));   // 3
console.log(lcs("abcde", "ace"));      // 3
console.log(lcs("abc", "def"));        // 0
