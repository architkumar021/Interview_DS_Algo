"""
============================================================
Problem: Roman to Integer (LeetCode 13)
============================================================
Given a Roman numeral string, convert it to an integer.

Example 1: Input: "III"      Output: 3
Example 2: Input: "LVIII"    Output: 58
Example 3: Input: "MCMXCIV"  Output: 1994

============================================================
APPROACH 1: BRUTE FORCE - Left to Right with Lookahead
============================================================
Dry Run: s = "MCMXCIV"
  i=0: M=1000 > C=100 → +1000, res=1000
  i=1: C=100 < M=1000 → +900, res=1900, skip to i=3
  i=3: X=10 < C=100 → +90, res=1990, skip to i=5
  i=5: I=1 < V=5 → +4, res=1994, skip to i=7
  Result: 1994  ✓

Time: O(N) | Space: O(1)
"""


def romanToInt_BruteForce(s: str) -> int:
    val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    res = 0
    i = 0

    while i < len(s):
        if i + 1 < len(s) and val[s[i]] < val[s[i + 1]]:
            res += val[s[i + 1]] - val[s[i]]
            i += 2
        else:
            res += val[s[i]]
            i += 1

    return res


"""
============================================================
APPROACH 2: OPTIMAL - Right to Left Traversal
============================================================
Dry Run: s = "MCMXCIV"
  i=6: V=5, prev=0 → +5, res=5
  i=5: I=1, prev=5 → -1, res=4
  i=4: C=100, prev=1 → +100, res=104
  i=3: X=10, prev=100 → -10, res=94
  i=2: M=1000, prev=10 → +1000, res=1094
  i=1: C=100, prev=1000 → -100, res=994
  i=0: M=1000, prev=100 → +1000, res=1994
  Result: 1994  ✓

Time: O(N) | Space: O(1)
"""


def romanToInt_Optimal(s: str) -> int:
    val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    res = 0
    prev = 0

    for i in range(len(s) - 1, -1, -1):
        curr = val[s[i]]
        if curr < prev:
            res -= curr
        else:
            res += curr
        prev = curr

    return res

