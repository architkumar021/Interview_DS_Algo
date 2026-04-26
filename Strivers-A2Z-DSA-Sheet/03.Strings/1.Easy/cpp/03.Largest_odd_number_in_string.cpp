/*
============================================================
Problem: Largest Odd Number in String (LeetCode 2264)
============================================================
Given a string num representing a large integer, return the largest-valued odd integer
(as a string) that is a non-empty substring of num, or "" if no odd integer exists.

Example 1: Input: "52"    Output: "5"
Example 2: Input: "4206"  Output: ""
Example 3: Input: "35427" Output: "35427"

============================================================
APPROACH 1: BRUTE FORCE - Check All Substrings
============================================================
Idea:
- Generate all substrings starting from index 0 with increasing length.
- The largest odd substring starting from 0 is the one ending at the rightmost odd digit.
- We can check all suffixes from index 0 to i for each i, but smartly we just need
  the longest prefix ending with an odd digit.

Dry Run: num = "35427"
  Check all substrings starting from 0:
    "3" → odd ✓  "35" → even  "354" → even  "3542" → even  "35427" → odd ✓
  Largest = "35427" (longest substring from start ending in odd digit)

  Actually for brute force, check every substring:
  All substrings ending with odd digit: "3","354","35427","5","542","54","5427","4","42","427","2","7"
  Largest value = "35427"  ✓

Time: O(N^2) | Space: O(N)
*/

#include <bits/stdc++.h>
using namespace std;

string largestOddNumber_BruteForce(string num) {
    string largest = "";
    // Generate substrings starting from index 0 (these are always the largest by value)
    // Find the rightmost odd digit
    for (int i = 0; i < num.size(); i++) {
        string sub = num.substr(0, i + 1);
        if ((sub.back() - '0') % 2 != 0) {
            largest = sub;  // keep updating, longer prefix = larger value
        }
    }
    return largest;
}

/*
============================================================
APPROACH 2: OPTIMAL - Scan from Right
============================================================
Idea:
- A number is odd if its last digit is odd.
- The largest odd substring of num starting from index 0 is num[0..i] where i is the
  rightmost index with an odd digit.
- Just scan from right to left, find first odd digit, return num[0..i].

Dry Run: num = "35427"
  i=4: '7' → odd → return "35427"  ✓

Dry Run: num = "4206"
  i=3: '6' → even
  i=2: '0' → even
  i=1: '2' → even
  i=0: '4' → even
  return ""  ✓

Time: O(N) | Space: O(1)
*/

string largestOddNumber_Optimal(string num) {
    for (int i = num.size() - 1; i >= 0; i--) {
        if ((num[i] - '0') % 2 != 0)
            return num.substr(0, i + 1);
    }
    return "";
}

