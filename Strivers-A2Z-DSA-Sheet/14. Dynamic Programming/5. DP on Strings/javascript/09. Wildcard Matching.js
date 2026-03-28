/*
=============================================================================
  QUESTION: 44. Wildcard Matching (LeetCode)
=============================================================================

  Given string s and pattern p with wildcards:
    '?' matches any SINGLE character
    '*' matches any sequence of characters (including empty)

  Example: s="cb", p="?a" → false ('?' matches 'c', but 'b' ≠ 'a')
  Example: s="adceb", p="*a*b" → true ('*'→"", 'a'→'a', '*'→"dce", 'b'→'b')

=============================================================================
  PATTERN: Two-String DP with Special Rules
=============================================================================

  solve(i, j) = does s[0..i] match p[0..j]?

  Three cases:
  1. s[i] == p[j] or p[j] == '?' → characters match → solve(i-1, j-1)
  2. p[j] == '*' → two sub-cases:
     a. '*' matches EMPTY sequence → solve(i, j-1)    (skip the '*')
     b. '*' matches s[i]          → solve(i-1, j)     (consume s[i], keep '*')
     Result: solve(i-1, j) || solve(i, j-1)
  3. Characters don't match → false

  Base cases:
    i < 0 AND j < 0 → both empty → true
    j < 0 (pattern empty, string not) → false
    i < 0 (string empty, pattern remains) → true only if all remaining are '*'

=============================================================================
  APPROACH: Memoization — O(N×M) Time, O(N×M) Space
=============================================================================
*/

function isMatch(s, p) {
    let n = s.length, m = p.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(-1));

    function allStars(j) {
        for (let k = 0; k < j; k++) if (p[k] !== '*') return false;
        return true;
    }

    function solve(i, j) {
        if (i < 0 && j < 0) return true;
        if (j < 0) return false;
        if (i < 0) return allStars(j + 1);
        if (dp[i][j] !== -1) return dp[i][j];

        // Case 1: exact match or '?'
        if (s[i] === p[j] || p[j] === '?')
            return dp[i][j] = solve(i - 1, j - 1);

        // Case 2: '*' — match empty or consume one char
        if (p[j] === '*')
            return dp[i][j] = solve(i - 1, j) || solve(i, j - 1);

        // Case 3: no match
        return dp[i][j] = false;
    }

    return solve(n - 1, m - 1);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(isMatch("cb", "?a"));       // false
console.log(isMatch("adceb", "*a*b"));  // true
console.log(isMatch("", "****"));       // true
