"""
============================================================
Problem: Longest Common Prefix (LeetCode 14)
============================================================
Find the longest common prefix string amongst an array of strings.

Example 1: Input: ["flower","flow","flight"]  Output: "fl"
Example 2: Input: ["dog","racecar","car"]     Output: ""

============================================================
APPROACH 1: BRUTE FORCE - Vertical Scanning
============================================================
Dry Run: strs = ["flower","flow","flight"]
  i=0: 'f','f','f' → match
  i=1: 'l','l','l' → match
  i=2: 'o','o','i' → mismatch → return "fl"  ✓

Time: O(N*M) | Space: O(1)
"""

from typing import List


def longestCommonPrefix_BruteForce(strs: List[str]) -> str:
    if not strs:
        return ""

    for i in range(len(strs[0])):
        c = strs[0][i]
        for j in range(1, len(strs)):
            if i >= len(strs[j]) or strs[j][i] != c:
                return strs[0][:i]

    return strs[0]


"""
============================================================
APPROACH 2: OPTIMAL - Sort and Compare First & Last
============================================================
Approach:
1. Sort strings lexicographically.
2. After sorting, first and last are most different.
3. Compare them character by character — their common prefix = answer.

Dry Run: strs = ["flower","flow","flight"]
  After sort: ["flight","flow","flower"]
  Compare "flight" vs "flower":
    i=0: 'f'=='f' ✓  i=1: 'l'=='l' ✓  i=2: 'i'!='o' ✗
  Result: "fl"  ✓

Time: O(N*M*log(N)) | Space: O(1) extra
"""


def longestCommonPrefix_Optimal(strs: List[str]) -> str:
    if not strs:
        return ""

    strs.sort()

    first, last = strs[0], strs[-1]
    i = 0

    while i < len(first) and i < len(last) and first[i] == last[i]:
        i += 1

    return first[:i]

