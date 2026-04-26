/*
============================================================
Problem: Rotate String (LeetCode 796)
============================================================
Given two strings s and goal, return true if s can become goal after some number of shifts.
A shift moves the leftmost character to the rightmost position.

Example 1: Input: s="abcde", goal="cdeab"  Output: true
Example 2: Input: s="abcde", goal="abced"  Output: false

============================================================
APPROACH 1: BRUTE FORCE - Try All Rotations
============================================================
Idea:
- Try all N possible rotations of s and check if any equals goal.

Dry Run: s="abcde", goal="cdeab"
  rot 0: "abcde" ≠ "cdeab"
  rot 1: "bcdea" ≠ "cdeab"
  rot 2: "cdeab" == "cdeab" ✓ → return true

Time: O(N^2) | Space: O(N)
*/

#include <bits/stdc++.h>
using namespace std;

bool rotateString_BruteForce(string s, string goal) {
    if (s.size() != goal.size()) return false;

    int n = s.size();
    for (int i = 0; i < n; i++) {
        // Rotate s by i positions: s[i..n-1] + s[0..i-1]
        string rotated = s.substr(i) + s.substr(0, i);
        if (rotated == goal) return true;
    }

    return false;
}

/*
============================================================
APPROACH 2: OPTIMAL - Concatenation Check
============================================================
Idea:
- Concatenate s with itself → contains ALL rotations as substrings.
- Check if goal is a substring of (s + s).

Dry Run: s="abcde", goal="cdeab"
  s+s = "abcdeabcde"
  Is "cdeab" in "abcdeabcde"?  → found at index 2 → true  ✓

Dry Run: s="abcde", goal="abced"
  s+s = "abcdeabcde"
  Is "abced" in "abcdeabcde"? → not found → false  ✓

Time: O(N) with KMP internally, O(N^2) with naive find | Space: O(N)
*/

bool rotateString_Optimal(string s, string goal) {
    if (s.size() != goal.size()) return false;
    return (s + s).find(goal) != string::npos;
}

