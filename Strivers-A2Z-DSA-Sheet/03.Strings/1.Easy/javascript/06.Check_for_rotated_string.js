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
Approach:
1. If lengths differ, return false.
2. Concatenate s+s — it contains all rotations as substrings.
3. Check if goal exists in s+s using includes().

Dry Run: s="abcde", goal="cdeab"
  s+s = "abcdeabcde"
  "cdeab" found at index 2 → true  ✓

Time: O(N) | Space: O(N)
*/

function rotateString_Optimal(s, goal) {
    if (s.length !== goal.length) return false;
    return (s + s).includes(goal);
}

/*
============================================================
APPROACH 3: WITHOUT BUILT-IN - Manual Substring Search
============================================================
Approach:
1. If lengths differ, return false.
2. Concatenate s+s to get a string containing all rotations.
3. Instead of using includes(), manually search for goal in s+s:
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

function rotateString_WithoutBuiltIn(s, goal) {
    if (s.length !== goal.length) return false;

    const n = s.length;
    const concat = s + s;

    for (let i = 0; i <= n; i++) {
        let found = true;
        for (let j = 0; j < n; j++) {
            if (concat[i + j] !== goal[j]) {
                found = false;
                break;
            }
        }
        if (found) return true;
    }

    return false;
}

