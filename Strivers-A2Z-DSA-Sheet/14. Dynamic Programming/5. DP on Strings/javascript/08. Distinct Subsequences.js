/*
=============================================================================
  QUESTION: 115. Distinct Subsequences (LeetCode)
=============================================================================

  Given strings s and t, return number of distinct subsequences of s
  which equals t.

  Example: s="rabbbit", t="rabbit" → 3
    The 3 ways: ra_bbit, rab_bit, rabb_it (choosing different 'b')

  Example: s="babgbag", t="bag" → 5

=============================================================================
  PATTERN: String Matching DP
=============================================================================

  solve(i, j) = count of ways to form t[0..j] from s[0..i]

  If s[i] == t[j]:
    Two choices:
    1. MATCH: use s[i] to match t[j] → solve(i-1, j-1)
    2. SKIP:  don't use s[i]        → solve(i-1, j)
    Result: solve(i-1, j-1) + solve(i-1, j)

  If s[i] != t[j]:
    Can only skip s[i] → solve(i-1, j)

  Base cases:
    j < 0 → matched all of t → return 1
    i < 0 → exhausted s without matching t → return 0

=============================================================================
  APPROACH 1: Memoization — O(N×M) Time, O(N×M) Space
=============================================================================
*/

function numDistinctMemo(s, t) {
    let n = s.length, m = t.length;
    let dp = Array.from({ length: n }, () => new Array(m).fill(-1));

    function solve(i, j) {
        if (j < 0) return 1;    // matched all of t ✓
        if (i < 0) return 0;    // exhausted s ✗
        if (dp[i][j] !== -1) return dp[i][j];

        if (s[i] === t[j])
            return dp[i][j] = solve(i - 1, j - 1) + solve(i - 1, j);
        return dp[i][j] = solve(i - 1, j);
    }

    return solve(n - 1, m - 1);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N×M) Time, O(M) Space
=============================================================================
*/

function numDistinct(s, t) {
    let n = s.length, m = t.length;
    let prev = new Array(m + 1).fill(0);
    prev[0] = 1;  // empty t can be formed from any prefix of s

    for (let i = 1; i <= n; i++) {
        let curr = new Array(m + 1).fill(0);
        curr[0] = 1;
        for (let j = 1; j <= m; j++) {
            if (s[i - 1] === t[j - 1])
                curr[j] = prev[j - 1] + prev[j];
            else
                curr[j] = prev[j];
        }
        prev = curr;
    }
    return prev[m];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(numDistinctMemo("rabbbit", "rabbit"));  // 3
console.log(numDistinct("rabbbit", "rabbit"));       // 3
console.log(numDistinct("babgbag", "bag"));          // 5
