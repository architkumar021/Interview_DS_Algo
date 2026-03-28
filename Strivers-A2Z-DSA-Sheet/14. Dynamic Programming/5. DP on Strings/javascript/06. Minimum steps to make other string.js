/*
=============================================================================
  QUESTION: 583. Delete Operation for Two Strings (LeetCode)
=============================================================================

  Min steps to make two strings same. Each step: delete one char from either.
  Answer = (n + m) - 2 * LCS(word1, word2).
  Keep LCS, delete everything else from both.

  Example: "sea", "eat" → 2 (delete 's' from sea, 't' from eat → "ea")

=============================================================================
*/

function minDistance(word1, word2) {
    let n = word1.length, m = word2.length;
    let prev = new Array(m + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let curr = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) curr[j] = prev[j - 1] + 1;
            else curr[j] = Math.max(prev[j], curr[j - 1]);
        }
        prev = curr;
    }
    let lcs = prev[m];
    return (n + m) - 2 * lcs;
}

// ==========================================================================
console.log(minDistance("sea", "eat"));      // 2
console.log(minDistance("leetcode", "etco"));  // 4

