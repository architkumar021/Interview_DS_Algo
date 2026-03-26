"""
=============================================================================
  QUESTION: 139. Word Break (LeetCode)
=============================================================================

  Can string s be segmented into dictionary words?
  Example: s="leetcode", dict=["leet","code"] → True

  APPROACH: Backtracking — same pattern as Palindrome Partitioning.
  Try every substring from current index. If in dict → recurse on remaining.

  DRY RUN "leetcode":
    "l"→no "le"→no "lee"→no "leet"→YES → solve(4)
      "c"→no "co"→no "cod"→no "code"→YES → solve(8)
        index >= len → return True ✓

  DRY RUN "catsandog":
    "cat"→YES → "sandog": "sand"→YES → "og": no match → False
    "cats"→YES → "andog": "and"→YES → "og": no match → False ✓

  Time: O(2^N) brute, O(N²) with memo. Space: O(N)
=============================================================================
"""


def solve(index, s, word_set):
    if index >= len(s):
        return True

    for i in range(index, len(s)):
        word = s[index:i + 1]
        if word in word_set and solve(i + 1, s, word_set):
            return True
    return False


def word_break(s, word_dict):
    word_set = set(word_dict)
    return solve(0, s, word_set)


# Driver Code
if __name__ == "__main__":
    print(word_break("leetcode", ["leet", "code"]))        # True
    print(word_break("applepenapple", ["apple", "pen"]))    # True
    print(word_break("catsandog", ["cats","dog","sand","and","cat"]))  # False

