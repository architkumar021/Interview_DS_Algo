"""
============================================================
Problem: Reverse Words in a String (LeetCode 151)
============================================================
Given an input string s, reverse the order of the words.

Example 1: Input: "the sky is blue"       Output: "blue is sky the"
Example 2: Input: "  hello world  "       Output: "world hello"
Example 3: Input: "a good   example"      Output: "example good a"

============================================================
APPROACH 1: BRUTE FORCE - Split and Reverse (Pythonic)
============================================================
Dry Run: s = "  hello world  "
  split() → ["hello", "world"]  (auto handles multiple spaces)
  reverse → ["world", "hello"]
  join → "world hello"  ✓

Time: O(N) | Space: O(N)
"""


def reverseWords_BruteForce(s: str) -> str:
    return ' '.join(s.split()[::-1])


"""
============================================================
APPROACH 2: OPTIMAL - Traverse from End, Pick Words
============================================================
Dry Run: s = "  hello world  "
  i=14, skip spaces → i=12
  j=12, move i left to 7 → word = s[8:13] = "world", res=["world"]
  skip spaces → i=6
  j=6, move i left to 1 → word = s[2:7] = "hello", res=["world","hello"]
  skip spaces → i<0, done
  Result: "world hello"  ✓

Time: O(N) | Space: O(1) extra (excluding output)
"""


def reverseWords_Optimal(s: str) -> str:
    res = []
    i = len(s) - 1

    while i >= 0:
        # Skip trailing spaces
        while i >= 0 and s[i] == ' ':
            i -= 1
        if i < 0:
            break

        # Find word boundary
        j = i
        while i >= 0 and s[i] != ' ':
            i -= 1

        # Extract word from i+1 to j+1
        res.append(s[i + 1:j + 1])

    return ' '.join(res)

