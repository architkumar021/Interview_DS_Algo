/*
============================================================
Problem: Sort Characters By Frequency (LeetCode 451)
============================================================
Given a string s, sort it in decreasing order based on the frequency of the characters.

Example 1: Input: "tree"     Output: "eert"
Example 2: Input: "cccaaa"   Output: "aaaccc" or "cccaaa"

============================================================
APPROACH 1: BRUTE FORCE - HashMap + Sort
============================================================
Dry Run: s = "tree"
  freq: {t:1, r:1, e:2}
  Sort entries by freq desc → [['e',2],['t',1],['r',1]]
  Build: "ee"+"t"+"r" = "eetr"  ✓

Time: O(N log N) | Space: O(N)
*/

function frequencySort_BruteForce(s) {
    let freq = {};
    for (let c of s) freq[c] = (freq[c] || 0) + 1;

    let entries = Object.entries(freq);
    entries.sort((a, b) => b[1] - a[1]);

    let res = "";
    for (let [ch, cnt] of entries) {
        res += ch.repeat(cnt);
    }
    return res;
}

/*
============================================================
APPROACH 2: OPTIMAL - Bucket Sort
============================================================
Approach:
1. Count frequency of each character.
2. Create buckets where bucket[i] holds all characters with frequency i.
3. Iterate from the highest bucket to lowest, building the result.
4. This avoids O(N log N) sorting — bucket sort is O(N).

Dry Run: s = "tree"
  freq: {t:1, r:1, e:2}
  buckets: [0]:[], [1]:['t','r'], [2]:['e'], [3]:[], [4]:[]
  i=4: empty, i=3: empty
  i=2: 'e' → "ee"
  i=1: 't' → "eet", 'r' → "eetr"
  Result: "eetr"  ✓

Time: O(N) | Space: O(N)
*/

function frequencySort_Optimal(s) {
    let freq = {};
    for (let c of s) freq[c] = (freq[c] || 0) + 1;

    let buckets = new Array(s.length + 1).fill(null).map(() => []);
    for (let [ch, cnt] of Object.entries(freq)) {
        buckets[cnt].push(ch);
    }

    let res = "";
    for (let i = buckets.length - 1; i >= 1; i--) {
        for (let ch of buckets[i]) {
            res += ch.repeat(i);
        }
    }
    return res;
}

