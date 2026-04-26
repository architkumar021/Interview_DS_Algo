/*
============================================================
Problem: Isomorphic Strings (LeetCode 205)
============================================================
Given two strings s and t, determine if they are isomorphic.
Two strings are isomorphic if characters in s can be replaced to get t.
No two characters may map to the same character, but a character may map to itself.

Example 1: Input: s="egg", t="add"       Output: true
Example 2: Input: s="foo", t="bar"       Output: false
Example 3: Input: s="paper", t="title"   Output: true

============================================================
APPROACH 1: BRUTE FORCE - Two Hash Maps
============================================================
Idea:
- Maintain two maps: s→t mapping and t→s mapping.
- For each pair (s[i], t[i]), check consistency in both directions.

Dry Run: s="egg", t="add"
  i=0: s='e', t='a' → maps empty → mps['e']='a', mpt['a']='e'
  i=1: s='g', t='d' → not in maps → mps['g']='d', mpt['d']='g'
  i=2: s='g', t='d' → mps['g']='d'==t[2]='d' ✓, mpt['d']='g'==s[2]='g' ✓
  Result: true  ✓

Dry Run: s="foo", t="bar"
  i=0: 'f'→'b', 'b'→'f'
  i=1: 'o'→'a', 'a'→'o'
  i=2: s='o', t='r' → mps['o']='a' != 'r' → return false  ✓

Time: O(N) | Space: O(N) — for two maps
*/

#include <bits/stdc++.h>
using namespace std;

bool isIsomorphic_BruteForce(string s, string t) {
    if (s.size() != t.size()) return false;

    unordered_map<char, char> mps, mpt;

    for (int i = 0; i < s.size(); i++) {
        if (mps.find(s[i]) == mps.end() && mpt.find(t[i]) == mpt.end()) {
            mps[s[i]] = t[i];
            mpt[t[i]] = s[i];
        } else if (mps[s[i]] != t[i] || mpt[t[i]] != s[i]) {
            return false;
        }
    }

    return true;
}

/*
============================================================
APPROACH 2: OPTIMAL - Array-based Mapping (Fixed Size)
============================================================
Idea:
- Use two arrays of size 256 (ASCII) to store last seen positions.
- For each index, check if the last position where s[i] and t[i] were seen match.
- If they differ, strings are not isomorphic.

Dry Run: s="foo", t="bar"
  Initialize: mapS[256]={0}, mapT[256]={0}
  i=0: mapS['f']=0, mapT['b']=0 → equal → set both to 1
  i=1: mapS['o']=0, mapT['a']=0 → equal → set both to 2
  i=2: mapS['o']=2, mapT['r']=0 → 2≠0 → return false  ✓

Time: O(N) | Space: O(1) — fixed 256 array
*/

bool isIsomorphic_Optimal(string s, string t) {
    if (s.size() != t.size()) return false;

    int mapS[256] = {0}, mapT[256] = {0};

    for (int i = 0; i < s.size(); i++) {
        if (mapS[(unsigned char)s[i]] != mapT[(unsigned char)t[i]])
            return false;
        mapS[(unsigned char)s[i]] = i + 1;
        mapT[(unsigned char)t[i]] = i + 1;
    }

    return true;
}

