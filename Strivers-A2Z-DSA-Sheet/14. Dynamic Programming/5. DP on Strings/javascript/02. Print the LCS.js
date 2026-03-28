/*
=============================================================================
  QUESTION: Print the Longest Common Subsequence
=============================================================================

  Build LCS dp table, then backtrack to reconstruct the actual string.

  Backtrack: if s[i-1]==s2[j-1] → add char, move diagonal.
  Else → move towards larger dp value.

  Example: "abcde", "ace" → "ace"

=============================================================================
  APPROACH: Tabulation + Backtrack — O(N×M) Time, O(N×M) Space
=============================================================================
*/

function findLCS(s1, s2) {
    let n = s1.length, m = s2.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    // Backtrack to build the LCS string
    let i = n, j = m, result = "";
    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            result = s1[i - 1] + result;
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return result;
}

// ==========================================================================
console.log(findLCS("abcde", "ace"));  // "ace"
console.log(findLCS("abc", "abc"));    // "abc"

