/*
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
  rot 2: "cdeab" == "cdeab" ✓ → true

Time: O(N^2) | Space: O(N)
*/

function rotateString_BruteForce(s, goal) {
    if (s.length !== goal.length) return false;

    for (let i = 0; i < s.length; i++) {
        let rotated = s.substring(i) + s.substring(0, i);
        if (rotated === goal) return true;
    }

    return false;
}

/*
============================================================
APPROACH 2: OPTIMAL - Concatenation Check
============================================================
Dry Run: s="abcde", goal="cdeab"
  s+s = "abcdeabcde"
  "cdeab" found at index 2 → true  ✓

Time: O(N) | Space: O(N)
*/

function rotateString_Optimal(s, goal) {
    if (s.length !== goal.length) return false;
    return (s + s).includes(goal);
}

