/*
============================================================
Problem: Roman to Integer (LeetCode 13)
============================================================
Given a Roman numeral string, convert it to an integer.

Symbol:  I=1, V=5, X=10, L=50, C=100, D=500, M=1000
Subtraction cases: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900

Example 1: Input: "III"      Output: 3
Example 2: Input: "LVIII"    Output: 58
Example 3: Input: "MCMXCIV"  Output: 1994

============================================================
APPROACH 1: BRUTE FORCE - Left to Right with Lookahead
============================================================
Approach:
1. Create a map of Roman symbol → integer value (I=1, V=5, X=10, L=50, C=100, D=500, M=1000).
2. Traverse the string left to right using index i.
3. At each position, compare current symbol value with the next symbol value.
4. If current < next, it's a subtraction case (e.g., IV=4) → add (next - current) to result, and skip ahead by 2.
5. Otherwise, simply add the current value and move by 1.
6. Return the result.

Dry Run: s = "MCMXCIV"
  i=0: M=1000, next C=100, 1000>100 → add 1000, res=1000, i=1
  i=1: C=100, next M=1000, 100<1000 → subtract: add 1000-100=900, res=1900, i=3
  i=3: X=10, next C=100, 10<100 → add 100-10=90, res=1990, i=5
  i=5: I=1, next V=5, 1<5 → add 5-1=4, res=1994, i=7
  Result: 1994  ✓

Time: O(N) | Space: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

int romanToInt_BruteForce(string s) {
    unordered_map<char, int> val = {
        {'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}
    };

    int res = 0;
    int i = 0;
    while (i < s.size()) {
        if (i + 1 < s.size() && val[s[i]] < val[s[i + 1]]) {
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
Approach:
1. Create a Roman symbol → value map.
2. Traverse the string from RIGHT to LEFT, keeping track of the previous value.
3. If current value < previous value, SUBTRACT it (subtraction case like IV, IX).
4. Otherwise, ADD it.
5. Update previous value to current at each step.
6. Return the accumulated result.

Dry Run: s = "MCMXCIV"
  i=6: V=5, prev=0 → 5≥0 → add, res=5, prev=5
  i=5: I=1, prev=5 → 1<5 → subtract, res=4, prev=1
  i=4: C=100, prev=1 → 100≥1 → add, res=104, prev=100
  i=3: X=10, prev=100 → 10<100 → subtract, res=94, prev=10
  i=2: M=1000, prev=10 → 1000≥10 → add, res=1094, prev=1000
  i=1: C=100, prev=1000 → 100<1000 → subtract, res=994, prev=100
  i=0: M=1000, prev=100 → 1000≥100 → add, res=1994, prev=1000
  Result: 1994  ✓

Time: O(N) | Space: O(1)
*/

int romanToInt_Optimal(string s) {
    unordered_map<char, int> val = {
        {'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}
    };

    int res = 0, prev = 0;
    for (int i = s.size() - 1; i >= 0; i--) {
        int curr = val[s[i]];
        if (curr < prev)
            res -= curr;
        else
            res += curr;
        prev = curr;
    }
    return res;
}

