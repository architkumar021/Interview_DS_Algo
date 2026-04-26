/*
============================================================
Problem: Isomorphic Strings (LeetCode 205)
============================================================
Given two strings s and t, determine if they are isomorphic.

Example 1: Input: s="egg", t="add"       Output: true
Example 2: Input: s="foo", t="bar"       Output: false
Example 3: Input: s="paper", t="title"   Output: true

============================================================
APPROACH 1: BRUTE FORCE - Two Hash Maps
============================================================
Dry Run: s="egg", t="add"
  i=0: 'e'→'a', 'a'→'e'
  i=1: 'g'→'d', 'd'→'g'
  i=2: mps['g']='d'=='d' ✓, mpt['d']='g'=='g' ✓
  Result: true  ✓

Dry Run: s="foo", t="bar"
  i=0: 'f'→'b', 'b'→'f'
  i=1: 'o'→'a', 'a'→'o'
  i=2: mps['o']='a' != 'r' → false  ✓

Time: O(N) | Space: O(N)
*/

function isIsomorphic_BruteForce(s, t) {
    if (s.length !== t.length) return false;

    let mps = new Map(), mpt = new Map();

    for (let i = 0; i < s.length; i++) {
        if (!mps.has(s[i]) && !mpt.has(t[i])) {
            mps.set(s[i], t[i]);
            mpt.set(t[i], s[i]);
        } else if (mps.get(s[i]) !== t[i] || mpt.get(t[i]) !== s[i]) {
            return false;
        }
    }

    return true;
}

/*
============================================================
APPROACH 2: OPTIMAL - Last Seen Position Arrays
============================================================
Dry Run: s="foo", t="bar"
  mapS={}, mapT={}
  i=0: mapS['f']=undefined=mapT['b']=undefined → set both to 1
  i=1: mapS['o']=undefined=mapT['a']=undefined → set both to 2
  i=2: mapS['o']=2, mapT['r']=undefined → 2≠undefined → false  ✓

Time: O(N) | Space: O(1) — bounded by charset
*/

function isIsomorphic_Optimal(s, t) {
    if (s.length !== t.length) return false;

    let mapS = new Array(256).fill(0);
    let mapT = new Array(256).fill(0);

    for (let i = 0; i < s.length; i++) {
        if (mapS[s.charCodeAt(i)] !== mapT[t.charCodeAt(i)])
            return false;
        mapS[s.charCodeAt(i)] = i + 1;
        mapT[t.charCodeAt(i)] = i + 1;
    }

    return true;
}

