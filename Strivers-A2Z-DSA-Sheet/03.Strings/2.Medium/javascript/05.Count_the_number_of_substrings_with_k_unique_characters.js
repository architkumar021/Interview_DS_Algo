/*
============================================================
Problem: Count Substrings with K Distinct Characters (GFG)
============================================================
Given a string of lowercase alphabets, count all possible substrings that have
exactly k distinct characters.

Example 1: Input: S="aba", K=2    Output: 3
Example 2: Input: S="abaaca", K=1 Output: 7

============================================================
APPROACH 1: BRUTE FORCE - Check All Substrings
============================================================
Dry Run: S="aba", K=2
  "a"→1, "ab"→2 ✓, "aba"→2 ✓, "b"→1, "ba"→2 ✓, "a"→1
  Count = 3  ✓

Time: O(N^2) | Space: O(1)
*/

function substrCount_BruteForce(s, k) {
    let ans = 0;

    for (let i = 0; i < s.length; i++) {
        let freq = new Array(26).fill(0);
        let distinct = 0;
        for (let j = i; j < s.length; j++) {
            let idx = s.charCodeAt(j) - 97;
            if (freq[idx] === 0) distinct++;
            freq[idx]++;
            if (distinct === k) ans++;
        }
    }

    return ans;
}

/*
============================================================
APPROACH 2: OPTIMAL - Sliding Window: atMost(k) - atMost(k-1)
============================================================
Dry Run: S="aba", K=2
  atMost(2) = 6, atMost(1) = 3
  exactlyK = 6 - 3 = 3  ✓

Time: O(N) | Space: O(K)
*/

function substrAtmostK(s, k) {
    let ans = 0;
    let mp = {};
    let distinct = 0;
    let i = 0;

    for (let j = 0; j < s.length; j++) {
        if (!mp[s[j]]) { mp[s[j]] = 0; distinct++; }
        mp[s[j]]++;

        while (distinct > k) {
            mp[s[i]]--;
            if (mp[s[i]] === 0) { delete mp[s[i]]; distinct--; }
            i++;
        }

        ans += j - i + 1;
    }

    return ans;
}

function substrCount_Optimal(s, k) {
    return substrAtmostK(s, k) - substrAtmostK(s, k - 1);
}

