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
Dry Run: s="anagram", t="nagaram"
  sort(s) = "aaagnmr", sort(t) = "aaagnmr" → equal → true  ✓

Time: O(N log N) | Space: O(N)
*/

function isAnagram_BruteForce(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}

/*
============================================================
APPROACH 2: OPTIMAL - Frequency Count Array
============================================================
Approach:
1. If lengths differ, return false.
2. Use a frequency array of size 26 initialized to 0.
3. Increment for each char in s, decrement for each char in t.
4. If all values are 0 at the end → anagram.

Dry Run: s="rat", t="car"
  After processing: r=1,a=0,t=1,c=-1 → not all zero → false  ✓

Dry Run: s="anagram", t="nagaram"
  Increment for s, decrement for t → all zeros → true  ✓

Time: O(N) | Space: O(1) — fixed 26 array
*/

function isAnagram_Optimal(s, t) {
    if (s.length !== t.length) return false;

    let freq = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - 97]++;
        freq[t.charCodeAt(i) - 97]--;
    }

    return freq.every(v => v === 0);
}

