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

/*
============================================================
APPROACH 3: WITHOUT HASHMAP - Frequency Array + Bucket Sort
============================================================
Approach:
1. Use a fixed-size frequency array (size 128 for ASCII) instead of a HashMap/Object.
2. Scan the frequency array and place each character into a bucket indexed by its count.
3. Traverse buckets from highest to lowest, appending characters to result.
4. Avoids dynamic key-value structures — uses only arrays.

Dry Run: s = "tree"
  freq[116(t)]=1, freq[114(r)]=1, freq[101(e)]=2
  buckets[1] = ['t','r'], buckets[2] = ['e']
  i=4: empty, i=3: empty
  i=2: 'e' → "ee"
  i=1: 't' → "eet", 'r' → "eetr"
  Result: "eetr" ✓

Time: O(N) | Space: O(N)
*/

function frequencySort_WithoutHashMap(s) {
    // Step 1: Count frequency using fixed ASCII array
    let freq = new Array(128).fill(0);
    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i)]++;
    }

    // Step 2: Build buckets
    let buckets = Array.from({ length: s.length + 1 }, () => []);
    for (let code = 0; code < 128; code++) {
        if (freq[code] > 0) {
            buckets[freq[code]].push(String.fromCharCode(code));
        }
    }

    // Step 3: Build result from highest bucket down
    let res = "";
    for (let i = s.length; i >= 1; i--) {
        for (let ch of buckets[i]) {
            res += ch.repeat(i);
        }
    }

    return res;
}
