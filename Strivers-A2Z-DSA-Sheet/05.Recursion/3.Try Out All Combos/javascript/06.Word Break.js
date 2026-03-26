/*
=============================================================================
  QUESTION: 139. Word Break (LeetCode)
=============================================================================

  Given string s and dictionary wordDict, return true if s can be segmented
  into a space-separated sequence of one or more dictionary words.

  Example 1: s="leetcode", wordDict=["leet","code"] → true ("leet code")
  Example 2: s="applepenapple", wordDict=["apple","pen"] → true
  Example 3: s="catsandog", wordDict=["cats","dog","sand","and","cat"] → false

=============================================================================
  APPROACH: Backtracking — Try All Possible Word Splits
=============================================================================

  Similar pattern to Palindrome Partitioning:
  - At each index, try every substring from index to end
  - If substring exists in dictionary → recurse on remaining string
  - If remaining string can be fully segmented → return true
  - Base case: index >= s.length → entire string segmented successfully

  DRY RUN with s="leetcode", dict={"leet","code"}:
  ──────────────────────────────────────────────────
  solve(0, "leetcode")
    Try s[0..0] = "l" → not in dict → skip
    Try s[0..1] = "le" → not in dict → skip
    Try s[0..2] = "lee" → not in dict → skip
    Try s[0..3] = "leet" → IN DICT ✓
      solve(4, "leetcode")
        Try s[4..4] = "c" → no
        Try s[4..5] = "co" → no
        Try s[4..6] = "cod" → no
        Try s[4..7] = "code" → IN DICT ✓
          solve(8, "leetcode")
            index >= length → return true ✓
        return true ✓
      return true ✓
    return true ✓

  DRY RUN with s="catsandog", dict={"cats","dog","sand","and","cat"}:
  ──────────────────────────────────────────────────────────────────────
  solve(0):
    "cat" → dict ✓ → solve(3):
      "sand" → dict ✓ → solve(7):
        "og" → no match for any → return false
      "san", "sa", "s" → none in dict → return false
    "cats" → dict ✓ → solve(4):
      "and" → dict ✓ → solve(7):
        "og" → no match → return false
      "andog", "ando", "an", "a" → none → return false
    remaining substrings → none → return false ✓

  NOTE: This brute force is O(2^N). Use memoization for O(N²) optimization.

  Time Complexity:  O(2^N) — brute force without memoization
  Space Complexity: O(N) — recursion depth

=============================================================================
*/

function solve(index, s, dict) {
    // Base case: entire string has been segmented
    if (index >= s.length) return true;

    // Try every substring starting from current index
    for (let i = index; i < s.length; i++) {
        let word = s.substring(index, i + 1);  // s[index..i]

        // If this word is in dictionary AND remaining can be segmented
        if (dict.has(word) && solve(i + 1, s, dict)) {
            return true;
        }
    }

    // No valid segmentation found
    return false;
}

function wordBreak(s, wordDict) {
    let dict = new Set(wordDict);  // O(1) lookup
    return solve(0, s, dict);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(wordBreak("leetcode", ["leet", "code"]));       // true
console.log(wordBreak("applepenapple", ["apple", "pen"]));   // true
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])); // false
