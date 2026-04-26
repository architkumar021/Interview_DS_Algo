"""
============================================================
Problem: Sum of Beauty of All Substrings (LeetCode 1781)
============================================================
The beauty of a string is the difference between the max and min frequency
of any character. Return the sum of beauty of all substrings.

Example 1: Input: "aabcb"   Output: 5
Example 2: Input: "aabcbaa" Output: 17

============================================================
APPROACH 1: BRUTE FORCE - Generate All Substrings
============================================================
Dry Run: s = "aabcb"
  "aab"→ a:2,b:1 → beauty=1
  "aabc"→ a:2,b:1,c:1 → beauty=1
  "aabcb"→ a:2,b:2,c:1 → beauty=1
  "abcb"→ a:1,b:2,c:1 → beauty=1
  "bcb"→ b:2,c:1 → beauty=1
  Sum = 5  ✓

Time: O(N^3) | Space: O(1)
"""


def beautySum_BruteForce(s: str) -> int:
    ans = 0
    n = len(s)

    for i in range(n):
        freq = [0] * 26
        for j in range(i, n):
            freq[ord(s[j]) - ord('a')] += 1

            present = [f for f in freq if f > 0]
            ans += max(present) - min(present)

    return ans


"""
============================================================
APPROACH 2: OPTIMAL - Incremental Frequency (O(N^2))
============================================================
No known sub-quadratic solution. Scan 26 chars per step = O(1).

Dry Run: Same incremental approach → Sum = 5  ✓

Time: O(N^2) | Space: O(1)
"""


def beautySum_Optimal(s: str) -> int:
    ans = 0
    n = len(s)

    for i in range(n):
        freq = [0] * 26
        for j in range(i, n):
            freq[ord(s[j]) - ord('a')] += 1

            max_f = 0
            min_f = n
            for k in range(26):
                if freq[k] > 0:
                    if freq[k] > max_f:
                        max_f = freq[k]
                    if freq[k] < min_f:
                        min_f = freq[k]

            ans += max_f - min_f

    return ans

