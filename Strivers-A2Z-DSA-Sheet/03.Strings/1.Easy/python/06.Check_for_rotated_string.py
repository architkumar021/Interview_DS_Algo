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
Approach:
1. If lengths differ, return False.
2. Concatenate s+s — contains all rotations as substrings.
3. Check if goal is in s+s using Python's 'in' operator.

Dry Run: s="abcde", goal="cdeab"
  s+s = "abcdeabcde"
  "cdeab" in "abcdeabcde" → True  ✓

Time: O(N) | Space: O(N)
"""


def rotateString_Optimal(s: str, goal: str) -> bool:
    if len(s) != len(goal):
        return False
    return goal in (s + s)


"""
============================================================
APPROACH 3: WITHOUT BUILT-IN - Manual Substring Search
============================================================
Approach:
1. If lengths differ, return False.
2. Concatenate s+s to get a string containing all rotations.
3. Instead of using 'in' operator, manually search for goal in the concatenated string:
   - For each starting index i (0 to n), compare characters one by one.
   - If all n characters match starting at i, return True.
4. If no match found, return False.

Dry Run: s="abcde", goal="cdeab"
  concat = "abcdeabcde", n=5
  i=0: 'a' vs 'c' → mismatch
  i=1: 'b' vs 'c' → mismatch
  i=2: 'c'=='c', 'd'=='d', 'e'=='e', 'a'=='a', 'b'=='b' → all 5 match → True ✓

Time: O(N^2) worst case | Space: O(N) for concatenation
"""


def rotateString_WithoutBuiltIn(s: str, goal: str) -> bool:
    if len(s) != len(goal):
        return False

    n = len(s)
    concat = s + s

    for i in range(n + 1):
        found = True
        for j in range(n):
            if concat[i + j] != goal[j]:
                found = False
                break
        if found:
            return True

    return False


