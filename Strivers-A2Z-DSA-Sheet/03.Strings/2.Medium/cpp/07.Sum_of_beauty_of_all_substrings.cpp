/*
============================================================
Problem: Sum of Beauty of All Substrings (LeetCode 1781)
============================================================
The beauty of a string is the difference between the max and min frequency
of any character. Return the sum of beauty of all substrings.

Example 1: Input: "aabcb"   Output: 5
Example 2: Input: "aabcbaa" Output: 17

============================================================
APPROACH 1: BRUTE FORCE - Generate All Substrings, Count Freq
============================================================
Approach:
1. Use two nested loops to generate all substrings (i for start, j for end).
2. For each substring, maintain a frequency array of size 26.
3. At each step, update the frequency of s[j] and find the max and min non-zero frequencies.
4. The beauty of that substring = maxFreq - minFreq. Add it to the answer.
5. Return the total sum.

Dry Run: s = "aabcb"
  Substrings with beauty > 0:
  "aab"→ a:2,b:1 → beauty=2-1=1
  "aabc"→ a:2,b:1,c:1 → beauty=2-1=1
  "aabcb"→ a:2,b:2,c:1 → beauty=2-1=1
  "abcb"→ a:1,b:2,c:1 → beauty=2-1=1
  "bcb"→ b:2,c:1 → beauty=2-1=1
  Sum = 5  ✓

Time: O(N^3) | Space: O(26) = O(1)
*/

#include <bits/stdc++.h>
using namespace std;

int beautySum_BruteForce(string s) {
    int ans = 0, n = s.size();

    for (int i = 0; i < n; i++) {
        int freq[26] = {0};
        for (int j = i; j < n; j++) {
            freq[s[j] - 'a']++;

            // Calculate max and min freq
            int maxF = INT_MIN, minF = INT_MAX;
            for (int k = 0; k < 26; k++) {
                if (freq[k] > 0) {
                    maxF = max(maxF, freq[k]);
                    minF = min(minF, freq[k]);
                }
            }
            ans += maxF - minF;
        }
    }

    return ans;
}

/*
============================================================
APPROACH 2: OPTIMAL - Incremental Frequency Update
============================================================
Approach:
1. Same double-loop approach, but frequency array is updated incrementally (not rebuilt).
2. For each outer loop iteration (i), reset the frequency array.
3. For each inner loop iteration (j), increment freq[s[j]] and scan 26 entries for max/min.
4. Scanning 26 entries is O(1), making the total O(N²).
5. No known sub-quadratic solution exists for this problem.

Dry Run: s = "aabcb" (same as above, but freq updated incrementally)
  i=0: freq starts empty
    j=0: freq[a]=1, max=1,min=1, beauty=0
    j=1: freq[a]=2, max=2,min=2, beauty=0
    j=2: freq[b]=1, max=2,min=1, beauty=1, ans=1
    j=3: freq[c]=1, max=2,min=1, beauty=1, ans=2
    j=4: freq[b]=2, max=2,min=1, beauty=1, ans=3
  i=1: freq starts empty
    j=1: a:1→0, j=2: b:1→0, j=3: bc→0
    j=4: freq[b]=2,a:1,c:1 → max=2,min=1, beauty=1, ans=4
    (also abcb has beauty 1 → ans=5)
  ... Total = 5  ✓

Time: O(N^2) | Space: O(1)
*/

int beautySum_Optimal(string s) {
    int ans = 0, n = s.size();

    for (int i = 0; i < n; i++) {
        int freq[26] = {0};
        for (int j = i; j < n; j++) {
            freq[s[j] - 'a']++;

            int maxF = 0, minF = n;
            for (int k = 0; k < 26; k++) {
                if (freq[k] > 0) {
                    maxF = max(maxF, freq[k]);
                    minF = min(minF, freq[k]);
                }
            }
            ans += maxF - minF;
        }
    }

    return ans;
}

