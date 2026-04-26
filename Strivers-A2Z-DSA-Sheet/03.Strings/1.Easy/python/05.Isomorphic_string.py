"""
============================================================
Problem: Isomorphic Strings (LeetCode 205)
============================================================
Given two strings s and t, determine if they are isomorphic.

Example 1: Input: s="egg", t="add"       Output: true
Example 2: Input: s="foo", t="bar"       Output: false
Example 3: Input: s="paper", t="title"   Output: true

============================================================
APPROACH 1: BRUTE FORCE - Two Hash Maps
============================================================
Dry Run: s="egg", t="add"
  i=0: 'e'→'a', 'a'→'e'
  i=1: 'g'→'d', 'd'→'g'
  i=2: mps['g']='d'=='d' ✓, mpt['d']='g'=='g' ✓
  Result: True  ✓

Time: O(N) | Space: O(N)
"""


def isIsomorphic_BruteForce(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    mps, mpt = {}, {}

    for i in range(len(s)):
        if s[i] not in mps and t[i] not in mpt:
            mps[s[i]] = t[i]
            mpt[t[i]] = s[i]
        elif mps.get(s[i]) != t[i] or mpt.get(t[i]) != s[i]:
            return False

    return True


"""
============================================================
APPROACH 2: OPTIMAL - Last Seen Position Arrays
============================================================
Approach:
1. Use two lists of size 256 to store the last-seen position of each character.
2. For each index i, if last-seen positions of s[i] and t[i] differ → return False.
3. Update both arrays with the current position (i+1).
4. If no mismatch, return True.

Dry Run: s="foo", t="bar"
  mapS=[0]*256, mapT=[0]*256
  i=0: mapS['f']=0 == mapT['b']=0 → set both to 1
  i=1: mapS['o']=0 == mapT['a']=0 → set both to 2
  i=2: mapS['o']=2 != mapT['r']=0 → return False  ✓

Time: O(N) | Space: O(1) — fixed 256 array
"""


def isIsomorphic_Optimal(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    mapS = [0] * 256
    mapT = [0] * 256

    for i in range(len(s)):
        if mapS[ord(s[i])] != mapT[ord(t[i])]:
            return False
        mapS[ord(s[i])] = i + 1
        mapT[ord(t[i])] = i + 1

    return True

