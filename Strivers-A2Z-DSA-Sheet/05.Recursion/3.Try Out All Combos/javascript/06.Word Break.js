/*
=============================================================================
  QUESTION: 139. Word Break (LeetCode)
=============================================================================

  Given string s and dictionary, return true if s can be segmented into
  space-separated dictionary words.

  Examples:
    "leetcode", ["leet","code"] → true
    "catsandog", ["cats","dog","sand","and","cat"] → false

=============================================================================
  APPROACH: Backtracking — Try All Word Splits — O(2^N) Time, O(N) Space
=============================================================================

  Same pattern as Palindrome Partitioning:
  At each index, try every substring s[index..i].
  If it's in dict → recurse on remaining. If remaining resolves → true.

  Dry Run "leetcode", dict={"leet","code"}:
    solve(0) → "l" ✗ | "le" ✗ | "lee" ✗ | "leet" ✓
      → solve(4) → "c" ✗ | "co" ✗ | "cod" ✗ | "code" ✓
        → solve(8) → index >= length → true ✓

  NOTE: Add memoization for O(N²) optimization.

=============================================================================
*/

function wordBreak(s, wordDict) {
    let dict = new Set(wordDict);

    function solve(index) {
        if (index >= s.length) return true;

        for (let i = index; i < s.length; i++) {
            let word = s.substring(index, i + 1);
            if (dict.has(word) && solve(i + 1)) return true;
        }
        return false;
    }

    return solve(0);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(wordBreak("leetcode", ["leet", "code"]));                       // true
console.log(wordBreak("applepenapple", ["apple", "pen"]));                   // true
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"]));       // false
