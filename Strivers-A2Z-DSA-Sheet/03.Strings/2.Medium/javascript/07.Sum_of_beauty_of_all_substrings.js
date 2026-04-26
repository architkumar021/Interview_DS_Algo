/*
============================================================
Problem: Sum of Beauty of All Substrings (LeetCode 1781)
============================================================
The beauty of a string is the difference between the max and min frequency
of any character. Return the sum of beauty of all substrings.

Example 1: Input: "aabcb"   Output: 5
Example 2: Input: "aabcbaa" Output: 17

============================================================
APPROACH 1: BRUTE FORCE - Generate All Substrings
============================================================
Dry Run: s = "aabcb"
  "aab"→ beauty=1, "aabc"→1, "aabcb"→1, "abcb"→1, "bcb"→1
  Sum = 5  ✓

Time: O(N^3) | Space: O(1)
*/

function beautySum_BruteForce(s) {
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        let freq = new Array(26).fill(0);
        for (let j = i; j < s.length; j++) {
            freq[s.charCodeAt(j) - 97]++;

            let maxF = 0, minF = s.length;
            for (let k = 0; k < 26; k++) {
                if (freq[k] > 0) {
                    maxF = Math.max(maxF, freq[k]);
                    minF = Math.min(minF, freq[k]);
                }
            }
            ans += maxF - minF;
        }
    }
    return ans;
}

/*
============================================================
APPROACH 2: OPTIMAL - Incremental Frequency (O(N^2))
============================================================
Same approach — no known sub-quadratic solution exists.
Optimization: scan 26 chars is O(1), so total is O(N^2).

Dry Run: Same as above, incrementally updating freq array.
  Sum = 5  ✓

Time: O(N^2) | Space: O(1)
*/

function beautySum_Optimal(s) {
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        let freq = new Array(26).fill(0);
        for (let j = i; j < s.length; j++) {
            freq[s.charCodeAt(j) - 97]++;

            let maxF = 0, minF = Infinity;
            for (let k = 0; k < 26; k++) {
                if (freq[k] > 0) {
                    if (freq[k] > maxF) maxF = freq[k];
                    if (freq[k] < minF) minF = freq[k];
                }
            }
            ans += maxF - minF;
        }
    }
    return ans;
}

