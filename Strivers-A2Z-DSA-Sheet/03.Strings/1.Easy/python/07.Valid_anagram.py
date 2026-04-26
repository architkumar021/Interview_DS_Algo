"""
============================================================
Problem: Valid Anagram (LeetCode 242)
============================================================
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Example 1: Input: s="anagram", t="nagaram"  Output: true
Example 2: Input: s="rat", t="car"          Output: false

============================================================
APPROACH 1: BRUTE FORCE - Sort and Compare
============================================================
Dry Run: s="anagram", t="nagaram"
  sorted(s) = "aaagnmr", sorted(t) = "aaagnmr" → equal → True  ✓

Time: O(N log N) | Space: O(N)
"""


def isAnagram_BruteForce(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return sorted(s) == sorted(t)


"""
============================================================
APPROACH 2: OPTIMAL - Frequency Count Array
============================================================
Approach:
1. If lengths differ, return False.
2. Use a frequency array of size 26.
3. Increment for each char in s, decrement for each char in t.
4. If all zeros → anagram.

Dry Run: s="rat", t="car"
  freq after s: r=1, a=1, t=1
  freq after t: c=-1, a=0, r=0 → t still 1 → not all zero → False  ✓

Dry Run: s="anagram", t="nagaram"
  Increment for s, decrement for t → all zeros → True  ✓

Time: O(N) | Space: O(1) — fixed 26 array
"""


def isAnagram_Optimal(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    freq = [0] * 26

    for i in range(len(s)):
        freq[ord(s[i]) - ord('a')] += 1
        freq[ord(t[i]) - ord('a')] -= 1

    return all(v == 0 for v in freq)

