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
Approach:
1. If lengths differ, return false.
2. Concatenate s with itself: s+s contains ALL possible rotations of s as substrings.
3. Check if goal is a substring of s+s.
4. If found, goal is a valid rotation of s → return true. Otherwise false.

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

/*
============================================================
APPROACH 3: WITHOUT BUILT-IN - Manual Substring Search
============================================================
Approach:
1. If lengths differ, return false.
2. Concatenate s+s to get a string containing all rotations.
3. Instead of using find(), manually search for goal in the concatenated string:
   - For each starting index i (0 to n), compare characters one by one.
   - If all n characters match starting at i, return true.
4. If no match found, return false.

Dry Run: s="abcde", goal="cdeab"
  concat = "abcdeabcde", n=5
  i=0: 'a' vs 'c' → mismatch
  i=1: 'b' vs 'c' → mismatch
  i=2: 'c'=='c', 'd'=='d', 'e'=='e', 'a'=='a', 'b'=='b' → all 5 match → true ✓

Time: O(N^2) worst case | Space: O(N) for concatenation
*/

bool rotateString_WithoutBuiltIn(string s, string goal) {
    if (s.size() != goal.size()) return false;

    int n = s.size();
    string concat = s + s;

    for (int i = 0; i <= n; i++) {
        bool found = true;
        for (int j = 0; j < n; j++) {
            if (concat[i + j] != goal[j]) {
                found = false;
                break;
            }
        }
        if (found) return true;
    }

    return false;
}

