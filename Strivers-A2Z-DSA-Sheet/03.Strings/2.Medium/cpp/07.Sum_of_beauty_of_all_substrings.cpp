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
Idea:
- For each substring, build frequency array from scratch, compute beauty.

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
Idea:
- Same double loop but maintain frequency array incrementally.
- This is already O(N^2 * 26) ≈ O(N^2). There is no known sub-quadratic solution.
- Optimization: use a multiset or sorted structure to avoid scanning 26 each time.

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

