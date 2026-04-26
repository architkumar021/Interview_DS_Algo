"""
============================================================
Problem: Count Substrings with K Distinct Characters (GFG)
============================================================
Given a string of lowercase alphabets, count all possible substrings that have
exactly k distinct characters.

Example 1: Input: S="aba", K=2    Output: 3
Example 2: Input: S="abaaca", K=1 Output: 7

============================================================
APPROACH 1: BRUTE FORCE - Check All Substrings
============================================================
Dry Run: S="aba", K=2
  "a"→1, "ab"→2 ✓, "aba"→2 ✓, "b"→1, "ba"→2 ✓, "a"→1
  Count = 3  ✓

Time: O(N^2) | Space: O(1)
"""


def substrCount_BruteForce(s: str, k: int) -> int:
    ans = 0
    n = len(s)

    for i in range(n):
        freq = [0] * 26
        distinct = 0
        for j in range(i, n):
            idx = ord(s[j]) - ord('a')
            if freq[idx] == 0:
                distinct += 1
            freq[idx] += 1
            if distinct == k:
                ans += 1

    return ans


"""
============================================================
APPROACH 2: OPTIMAL - Sliding Window: atMost(k) - atMost(k-1)
============================================================
Dry Run: S="aba", K=2
  atMost(2) = 6, atMost(1) = 3
  exactlyK = 6 - 3 = 3  ✓

Time: O(N) | Space: O(K)
"""


def substr_atmost_k(s: str, k: int) -> int:
    ans = 0
    mp = {}
    i = 0

    for j in range(len(s)):
        mp[s[j]] = mp.get(s[j], 0) + 1

        while len(mp) > k:
            mp[s[i]] -= 1
            if mp[s[i]] == 0:
                del mp[s[i]]
            i += 1

        ans += j - i + 1

    return ans


def substrCount_Optimal(s: str, k: int) -> int:
    return substr_atmost_k(s, k) - substr_atmost_k(s, k - 1)

