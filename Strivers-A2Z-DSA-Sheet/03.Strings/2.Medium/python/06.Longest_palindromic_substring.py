"""
============================================================
Problem: Longest Palindromic Substring (LeetCode 5)
============================================================
Given a string s, return the longest palindromic substring in s.

Example 1: Input: "babad"  Output: "bab" (or "aba")
Example 2: Input: "cbbd"   Output: "bb"

============================================================
APPROACH 1: BRUTE FORCE - Check All Substrings
============================================================
Approach:
1. Generate all substrings using two nested loops.
2. Check each for palindrome by comparing from both ends inward.
3. Track the longest palindrome found.

Dry Run: s = "babad"
  Check all substrings: "bab"(3) palindrome, "aba"(3) palindrome
  Longest = "bab"  ✓

Time: O(N^3) | Space: O(1)
"""


def longestPalindrome_BruteForce(s: str) -> str:
    def is_palin(l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    max_len = 0
    start = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            if is_palin(i, j) and j - i + 1 > max_len:
                max_len = j - i + 1
                start = i

    return s[start:start + max_len]


"""
============================================================
APPROACH 2: OPTIMAL - Expand Around Center
============================================================
Approach:
1. For each index i, expand from center for both odd (i,i) and even (i,i+1) palindromes.
2. While characters match, keep expanding and track the longest.
3. Return the longest palindromic substring.

Dry Run: s = "babad"
  i=0: odd "b"(1), even skip
  i=1: odd expand(1,1) → s[0]='b'==s[2]='b' → "bab"(3), max_len=3
  i=2: odd expand(2,2) → s[1]='a'==s[3]='a' → "aba"(3), same length
  i=3,4: nothing longer
  Result: "bab"  ✓

Time: O(N^2) | Space: O(1)
"""


def longestPalindrome_Optimal(s: str) -> str:
    start = 0
    max_len = 0

    def expand(l, r):
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > max_len:
                max_len = r - l + 1
                start = l
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)       # odd length
        expand(i, i + 1)   # even length

    return s[start:start + max_len]

