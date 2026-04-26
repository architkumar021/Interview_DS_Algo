/*
============================================================
Problem: Roman to Integer (LeetCode 13)
============================================================
Given a Roman numeral string, convert it to an integer.

Example 1: Input: "III"      Output: 3
Example 2: Input: "LVIII"    Output: 58
Example 3: Input: "MCMXCIV"  Output: 1994

============================================================
APPROACH 1: BRUTE FORCE - Left to Right with Lookahead
============================================================
Dry Run: s = "MCMXCIV"
  i=0: M=1000, next C=100 → 1000>100 → +1000, res=1000
  i=1: C=100, next M=1000 → 100<1000 → +900, res=1900, i=3
  i=3: X=10, next C=100 → 10<100 → +90, res=1990, i=5
  i=5: I=1, next V=5 → 1<5 → +4, res=1994, i=7
  Result: 1994  ✓

Time: O(N) | Space: O(1)
*/

function romanToInt_BruteForce(s) {
    const val = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000};
    let res = 0, i = 0;

    while (i < s.length) {
        if (i + 1 < s.length && val[s[i]] < val[s[i + 1]]) {
            res += val[s[i + 1]] - val[s[i]];
            i += 2;
        } else {
            res += val[s[i]];
            i++;
        }
    }
    return res;
}

/*
============================================================
APPROACH 2: OPTIMAL - Right to Left Traversal
============================================================
Dry Run: s = "MCMXCIV"
  i=6: V=5, prev=0 → +5, res=5
  i=5: I=1, prev=5 → 1<5 → -1, res=4
  i=4: C=100, prev=1 → +100, res=104
  i=3: X=10, prev=100 → -10, res=94
  i=2: M=1000, prev=10 → +1000, res=1094
  i=1: C=100, prev=1000 → -100, res=994
  i=0: M=1000, prev=100 → +1000, res=1994
  Result: 1994  ✓

Time: O(N) | Space: O(1)
*/

function romanToInt_Optimal(s) {
    const val = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000};
    let res = 0, prev = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        let curr = val[s[i]];
        if (curr < prev) res -= curr;
        else res += curr;
        prev = curr;
    }
    return res;
}

