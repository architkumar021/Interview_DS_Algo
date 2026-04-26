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
Approach:
1. Generate all substrings using two nested loops.
2. For each substring, check if it's a palindrome (compare from both ends inward).
3. Track the longest palindrome found.

Dry Run: s = "babad"
  "bab" is palindrome (length 3), "aba" is palindrome (length 3)
  No longer palindrome found → return "bab"  ✓

Time: O(N^3) | Space: O(1)
*/

function longestPalindrome_BruteForce(s) {
    function isPalin(l, r) {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++; r--;
        }
        return true;
    }

    let maxLen = 0, start = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (isPalin(i, j) && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                start = i;
            }
        }
    }
    return s.substring(start, start + maxLen);
}

/*
============================================================
APPROACH 2: OPTIMAL - Expand Around Center
============================================================
Approach:
1. For each index i, treat it as a center and expand outward:
   - expand(i, i) for odd-length palindromes.
   - expand(i, i+1) for even-length palindromes.
2. While characters on both sides match, keep expanding and track the longest.
3. Return the longest palindromic substring.

Dry Run: s = "babad"
  i=0: odd "b"(1), even "ba"✗
  i=1: odd → expand(1,1): s[0]='b'==s[2]='b'→"bab"(3), s[-1] stop. maxLen=3
       even → s[1]≠s[2] stop
  i=2: odd → expand(2,2): s[1]='a'==s[3]='a'→"aba"(3). stop
  i=3,4: nothing longer
  Result: "bab"  ✓

Time: O(N^2) | Space: O(1)
*/

function longestPalindrome_Optimal(s) {
    let start = 0, maxLen = 0;

    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > maxLen) {
                maxLen = r - l + 1;
                start = l;
            }
            l--; r++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expand(i, i);       // odd
        expand(i, i + 1);   // even
    }

    return s.substring(start, start + maxLen);
}

