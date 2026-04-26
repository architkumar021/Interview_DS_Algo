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
Approach:
1. If lengths differ, return false immediately (anagrams must have same length).
2. Sort both strings — anagrams become identical when sorted.
3. Compare the sorted strings. If equal → anagram, otherwise not.

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
Approach:
1. If lengths differ, return false.
2. Create a frequency array of size 26 (for lowercase English letters), initialized to 0.
3. Iterate through both strings simultaneously: increment freq for s[i], decrement for t[i].
4. After processing, if all values in freq are 0, the strings are anagrams.
5. If any value is non-zero, characters don't match → not an anagram.

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

