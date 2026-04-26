"""
============================================================
Problem: Sort Characters By Frequency (LeetCode 451)
============================================================
Given a string s, sort it in decreasing order based on the frequency of the characters.

Example 1: Input: "tree"     Output: "eert"
Example 2: Input: "cccaaa"   Output: "aaaccc" or "cccaaa"

============================================================
APPROACH 1: BRUTE FORCE - Counter + Sort
============================================================
Dry Run: s = "tree"
  freq: {'t':1, 'r':1, 'e':2}
  Sort by freq desc → [('e',2),('t',1),('r',1)]
  Build: "ee"+"t"+"r" = "eetr"  ✓

Time: O(N log N) | Space: O(N)
"""

from collections import Counter
import heapq


def frequencySort_BruteForce(s: str) -> str:
    freq = Counter(s)
    sorted_chars = sorted(freq.items(), key=lambda x: -x[1])
    return ''.join(ch * cnt for ch, cnt in sorted_chars)


"""
============================================================
APPROACH 2: OPTIMAL - Counter + Max Heap
============================================================
Dry Run: s = "tree"
  freq: {'t':1, 'r':1, 'e':2}
  heap (negated): [(-2,'e'),(-1,'r'),(-1,'t')]
  Pop (-2,'e') → "ee"
  Pop (-1,'r') → "eer"
  Pop (-1,'t') → "eert"
  Result: "eert"  ✓

Time: O(N log K) where K = unique chars | Space: O(N)
"""


def frequencySort_Optimal(s: str) -> str:
    freq = Counter(s)
    heap = [(-cnt, ch) for ch, cnt in freq.items()]
    heapq.heapify(heap)

    res = []
    while heap:
        cnt, ch = heapq.heappop(heap)
        res.append(ch * (-cnt))

    return ''.join(res)

