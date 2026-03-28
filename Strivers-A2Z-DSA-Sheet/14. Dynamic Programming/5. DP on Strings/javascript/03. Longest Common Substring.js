/*
=============================================================================
  QUESTION: Longest Common Substring (GFG)
=============================================================================

  Find length of longest common substring (must be contiguous).
  Example: "ABCDGH", "ACDGHR" → 4 ("CDGH")

  Key diff from LCS: if chars don't match → dp[i][j] = 0 (reset).
  Track global max.

=============================================================================
  APPROACH: Tabulation — O(N×M) Time, O(N×M) Space
=============================================================================
*/

function longestCommonSubstr(s1, s2) {
    let n = s1.length, m = s2.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    let maxLen = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLen = Math.max(maxLen, dp[i][j]);
            } else {
                dp[i][j] = 0;  // reset — must be contiguous
            }
        }
    }
    return maxLen;
}

// ==========================================================================
console.log(longestCommonSubstr("ABCDGH", "ACDGHR"));  // 4
console.log(longestCommonSubstr("abc", "abc"));          // 3

