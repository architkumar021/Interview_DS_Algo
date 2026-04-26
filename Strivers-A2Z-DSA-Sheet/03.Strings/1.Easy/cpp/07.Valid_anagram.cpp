/*
============================================================
Problem: Valid Anagram (LeetCode 242)
============================================================
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Example 1: Input: s="anagram", t="nagaram"  Output: true
Example 2: Input: s="rat", t="car"          Output: false

============================================================
APPROACH 1: BRUTE FORCE - Sort and Compare
============================================================
Idea:
- Sort both strings and compare. Anagrams become identical when sorted.

Dry Run: s="anagram", t="nagaram"
  sort(s) = "aaagnmr"
  sort(t) = "aaagnmr"
  Equal → true  ✓

Time: O(N log N) | Space: O(1) if in-place sort
*/

#include <bits/stdc++.h>
using namespace std;

bool isAnagram_BruteForce(string s, string t) {
    if (s.size() != t.size()) return false;

    sort(s.begin(), s.end());
    sort(t.begin(), t.end());

    return s == t;
}

/*
============================================================
APPROACH 2: OPTIMAL - Frequency Count Array
============================================================
Idea:
- Use a fixed array of size 26 for character counts.
- Increment for s, decrement for t. If all zeros at end → anagram.

Dry Run: s="rat", t="car"
  After s: r=1, a=1, t=1
  After t: c→freq[2]=-1 → at end not all zero → false  ✓

Dry Run: s="anagram", t="nagaram"
  After s: a=3, n=1, g=1, r=1, m=1
  After t: n-1=0, a-1=2, g-1=0, a-1=1, r-1=0, a-1=0, m-1=0
  All zeros → true  ✓

Time: O(N) | Space: O(1) — fixed 26 array
*/

bool isAnagram_Optimal(string s, string t) {
    if (s.size() != t.size()) return false;

    int freq[26] = {0};

    for (int i = 0; i < s.size(); i++) {
        freq[s[i] - 'a']++;
        freq[t[i] - 'a']--;
    }

    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0) return false;
    }

    return true;
}

