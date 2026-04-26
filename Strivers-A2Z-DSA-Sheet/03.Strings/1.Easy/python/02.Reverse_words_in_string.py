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
Approach:
1. Use Python's split() which automatically splits on whitespace and removes empty entries.
2. Reverse the resulting list using slicing [::-1].
3. Join the reversed list with a single space.
4. Return the result.

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
Approach:
1. Start from the end of the string, traversing backwards.
2. Skip trailing spaces by decrementing the pointer i.
3. When a non-space character is found, mark it as word end (j).
4. Keep moving left until a space or string start — extract word from i+1 to j+1.
5. Append the word to a result list.
6. Repeat until the entire string is scanned.
7. Join the result list with spaces and return.

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

