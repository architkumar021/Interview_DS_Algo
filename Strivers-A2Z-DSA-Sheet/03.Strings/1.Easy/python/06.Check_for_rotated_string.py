"""
============================================================
Problem: Rotate String (LeetCode 796)
============================================================
Given two strings s and goal, return true if s can become goal after some number of shifts.

Example 1: Input: s="abcde", goal="cdeab"  Output: true
Example 2: Input: s="abcde", goal="abced"  Output: false

============================================================
APPROACH 1: BRUTE FORCE - Try All Rotations
============================================================
Dry Run: s="abcde", goal="cdeab"
  rot 0: "abcde" ≠ "cdeab"
  rot 1: "bcdea" ≠ "cdeab"
  rot 2: "cdeab" == "cdeab" ✓ → True

Time: O(N^2) | Space: O(N)
"""


def rotateString_BruteForce(s: str, goal: str) -> bool:
    if len(s) != len(goal):
        return False

    for i in range(len(s)):
        rotated = s[i:] + s[:i]
        if rotated == goal:
            return True

    return False


"""
============================================================
APPROACH 2: OPTIMAL - Concatenation Check
============================================================
Dry Run: s="abcde", goal="cdeab"
  s+s = "abcdeabcde"
  "cdeab" in "abcdeabcde" → True  ✓

Time: O(N) | Space: O(N)
"""


def rotateString_Optimal(s: str, goal: str) -> bool:
    if len(s) != len(goal):
        return False
    return goal in (s + s)

