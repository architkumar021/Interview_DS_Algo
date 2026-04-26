/*
============================================================
Problem: Longest Palindromic Substring (LeetCode 5)
============================================================
Given a string s, return the longest palindromic substring in s.

Example 1: Input: "babad"  Output: "bab" (or "aba")
Example 2: Input: "cbbd"   Output: "bb"

============================================================
APPROACH 1: BRUTE FORCE - Check All Substrings
============================================================
Idea:
- Generate all substrings, check if each is palindrome, track the longest.

Dry Run: s = "babad"
  Check all substrings:
    "b"✓(1), "ba"✗, "bab"✓(3), "baba"✗, "babad"✗
    "a"✓(1), "ab"✗, "aba"✓(3), "abad"✗
    "b"✓(1), "ba"✗, "bad"✗
    "a"✓(1), "ad"✗
    "d"✓(1)
  Longest = "bab" (length 3)  ✓

Time: O(N^3) — N^2 substrings × N to check palindrome | Space: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string& s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

string longestPalindrome_BruteForce(string s) {
    int n = s.size();
    int maxLen = 0, start = 0;

    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            if (isPalindrome(s, i, j) && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                start = i;
            }
        }
    }

    return s.substr(start, maxLen);
}

/*
============================================================
APPROACH 2: OPTIMAL - Expand Around Center
============================================================
Idea:
- For each index, expand outward for both odd-length and even-length palindromes.
- Track the longest found.

Dry Run: s = "babad"
  i=0: odd expand(0,0): "b"(1). even expand(-1,0): invalid
  i=1: odd expand(1,1): s[0]='b'≠s[2]='b'? Yes! expand → s[0..2]="bab"(3). s[-1] invalid → stop. maxLen=3
       even expand(0,1): s[0]='b'≠s[1]='a' → stop
  i=2: odd expand(2,2): s[1]='a'=s[3]='a' → expand → s[1..3]="aba"(3). s[0]='b'≠s[4]='d' → stop
       even expand(1,2): s[1]='a'≠s[2]='b' → stop
  i=3: odd expand(3,3): s[2]='b'≠s[4]='d' → "a"(1)
       even expand(2,3): s[2]='b'≠s[3]='a' → stop
  i=4: odd expand(4,4): "d"(1). even expand(3,4): s[3]≠s[4] → stop
  Longest: "bab" (length 3)  ✓

Time: O(N^2) | Space: O(1)
*/

void expandFromCenter(string& s, int left, int right, int& ans_start, int& ans_end, int& maxLen) {
    while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
            ans_start = left;
            ans_end = right;
        }
        left--;
        right++;
    }
}

string longestPalindrome_Optimal(string s) {
    int maxLen = 0, ans_start = 0, ans_end = 0;

    for (int i = 0; i < (int)s.size(); i++) {
        // Odd length
        expandFromCenter(s, i, i, ans_start, ans_end, maxLen);
        // Even length
        expandFromCenter(s, i, i + 1, ans_start, ans_end, maxLen);
    }

    return (maxLen == 0) ? "" : s.substr(ans_start, ans_end - ans_start + 1);
}

