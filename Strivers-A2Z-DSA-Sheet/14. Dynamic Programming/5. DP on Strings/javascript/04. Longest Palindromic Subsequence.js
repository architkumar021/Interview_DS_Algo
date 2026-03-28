/*
=============================================================================
  QUESTION: 516. Longest Palindromic Subsequence (LeetCode)
=============================================================================

  Find length of longest palindromic subsequence in string s.

  Example: "bbbab" → 4 ("bbbb")
  Example: "cbbd" → 2 ("bb")

=============================================================================
  KEY INSIGHT: LPS(s) = LCS(s, reverse(s))
=============================================================================

  A palindromic subsequence reads same forwards and backwards.
  The longest such subsequence is the LCS of s and its reverse!

  Why? If a subsequence appears in both s and reverse(s), it reads the same
  both ways → it's a palindrome.

  Example: s = "bbbab", r = "babbb"
    LCS("bbbab", "babbb") = "bbbb" → length 4 ✓

=============================================================================
  APPROACH: Space Optimized LCS — O(N²) Time, O(N) Space
=============================================================================
*/

function longestPalindromeSubseq(s) {
    let r = s.split('').reverse().join('');
    let n = s.length;
    let prev = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        let curr = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === r[j - 1])
                curr[j] = prev[j - 1] + 1;
            else
                curr[j] = Math.max(prev[j], curr[j - 1]);
        }
        prev = curr;
    }
    return prev[n];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(longestPalindromeSubseq("bbbab"));  // 4
console.log(longestPalindromeSubseq("cbbd"));   // 2
