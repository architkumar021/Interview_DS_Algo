/*
============================================================
Problem: Count Substrings with K Distinct Characters (GFG)
============================================================
Given a string of lowercase alphabets, count all possible substrings (not necessarily
distinct) that have exactly k distinct characters.

Example 1: Input: S="aba", K=2    Output: 3  ("ab","ba","aba")
Example 2: Input: S="abaaca", K=1 Output: 7  ("a","b","a","aa","a","c","a")

============================================================
APPROACH 1: BRUTE FORCE - Check All Substrings
============================================================
Idea:
- Generate all substrings, count distinct chars in each, increment if == k.

Dry Run: S="aba", K=2
  "a"→1 dist, "ab"→2 dist ✓, "aba"→2 dist ✓
  "b"→1 dist, "ba"→2 dist ✓
  "a"→1 dist
  Count = 3  ✓

Time: O(N^2 * 26) ≈ O(N^2) | Space: O(26) = O(1)
*/

#include <bits/stdc++.h>
using namespace std;

long long substrCount_BruteForce(string s, int k) {
    long long ans = 0;
    int n = s.size();

    for (int i = 0; i < n; i++) {
        int freq[26] = {0};
        int distinct = 0;
        for (int j = i; j < n; j++) {
            if (freq[s[j] - 'a'] == 0) distinct++;
            freq[s[j] - 'a']++;
            if (distinct == k) ans++;
        }
    }

    return ans;
}

/*
============================================================
APPROACH 2: OPTIMAL - Sliding Window: atMost(k) - atMost(k-1)
============================================================
Idea:
- exactlyK = atMostK(k) - atMostK(k-1)
- atMostK uses sliding window: expand right, shrink left when distinct > k.
- For each j, substrings ending at j with ≤ k distinct = j - i + 1.

Dry Run: S="aba", K=2
  atMost(2):
    j=0: 'a' mp={a:1}, dist=1≤2 → ans+=1 (1)
    j=1: 'b' mp={a:1,b:1}, dist=2≤2 → ans+=2 (3)
    j=2: 'a' mp={a:2,b:1}, dist=2≤2 → ans+=3 (6)
  atMost(2) = 6

  atMost(1):
    j=0: 'a' mp={a:1}, dist=1≤1 → ans+=1 (1)
    j=1: 'b' mp={a:1,b:1}, dist=2>1 → shrink: remove 'a', i=1, mp={b:1} → ans+=1 (2)
    j=2: 'a' mp={b:1,a:1}, dist=2>1 → shrink: remove 'b', i=2, mp={a:1} → ans+=1 (3)
  atMost(1) = 3

  exactlyK(2) = 6 - 3 = 3  ✓

Time: O(N) | Space: O(K)
*/

long long substrAtmostK(string s, int k) {
    long long ans = 0;
    unordered_map<char, int> mp;
    int i = 0;

    for (int j = 0; j < s.size(); j++) {
        mp[s[j]]++;

        while ((int)mp.size() > k) {
            mp[s[i]]--;
            if (mp[s[i]] == 0) mp.erase(s[i]);
            i++;
        }

        ans += j - i + 1;
    }

    return ans;
}

long long substrCount_Optimal(string s, int k) {
    return substrAtmostK(s, k) - substrAtmostK(s, k - 1);
}

