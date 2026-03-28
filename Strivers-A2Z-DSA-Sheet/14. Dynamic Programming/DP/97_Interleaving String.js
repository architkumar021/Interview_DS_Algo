/*
=============================================================================
  QUESTION: 97. Interleaving String (LeetCode)
=============================================================================

  Given strings s1, s2, and s3, check if s3 is formed by interleaving
  s1 and s2. Characters from s1 and s2 must maintain their relative order.

  Example: s1="aabcc", s2="dbbca", s3="aadbbcbcac" → true
  Example: s1="aabcc", s2="dbbca", s3="aadbbbaccc" → false

=============================================================================
  KEY INSIGHT
=============================================================================

  At position i+j in s3, the character must come from s1[i] or s2[j].
  State: (i, j) = how many chars used from s1 and s2.

  solve(i, j):
    - If s1[i] == s3[i+j] → try using s1[i]: solve(i+1, j)
    - If s2[j] == s3[i+j] → try using s2[j]: solve(i, j+1)
    - Either path returns true → true

  Base: i==m && j==n → true (both strings fully used)

=============================================================================
  APPROACH 1: Memoization — O(M×N) Time, O(M×N) Space
=============================================================================
*/

function isInterleaveMemo(s1, s2, s3) {
    let m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;
    let visited = new Set();

    function solve(i, j) {
        if (i === m && j === n) return true;
        let key = `${i}-${j}`;
        if (visited.has(key)) return false;
        visited.add(key);

        if (i < m && s1[i] === s3[i + j] && solve(i + 1, j)) return true;
        if (j < n && s2[j] === s3[i + j] && solve(i, j + 1)) return true;
        return false;
    }

    return solve(0, 0);
}

/*
=============================================================================
  APPROACH 2: Space Optimized DP — O(M×N) Time, O(N) Space
=============================================================================

  dp[j] = can s1[0..i-1] and s2[0..j-1] interleave to form s3[0..i+j-1]?
  Reuse 1D array, updating row by row.

=============================================================================
*/

function isInterleave(s1, s2, s3) {
    let m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;

    let dp = new Array(n + 1).fill(false);
    dp[0] = true;

    // Base row: only s2 characters
    for (let j = 1; j <= n; j++) {
        dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
    }

    for (let i = 1; i <= m; i++) {
        dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
        for (let j = 1; j <= n; j++) {
            dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1])
                  || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }

    return dp[n];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(isInterleaveMemo("aabcc", "dbbca", "aadbbcbcac"));  // true
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));      // true
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc"));      // false
console.log(isInterleave("", "", ""));                            // true


