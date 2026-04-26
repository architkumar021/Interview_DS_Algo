/*
============================================================
Problem: String to Integer (atoi) (LeetCode 8)
============================================================
Implement myAtoi(string s) which converts a string to a 32-bit signed integer.

Algorithm:
1. Skip leading whitespace
2. Check for '+'/'-' sign
3. Read digits until non-digit or end
4. Clamp to [-2^31, 2^31-1]

Example 1: Input: "42"       Output: 42
Example 2: Input: "   -42"   Output: -42
Example 3: Input: "4193 with words"  Output: 4193
Example 4: Input: "words and 987"    Output: 0

============================================================
APPROACH 1: BRUTE FORCE - Parse Step by Step
============================================================
Idea:
- Handle whitespace, sign, digits explicitly in sequence.
- Use long long to detect overflow before clamping.

Dry Run: s = "   -42"
  Skip spaces → i=3
  s[3]='-' → sign=false, i=4
  s[4]='4' → ans=4, i=5
  s[5]='2' → ans=42, i=6
  sign=false → ans=-42
  In range → return -42  ✓

Time: O(N) | Space: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

int myAtoi_BruteForce(string s) {
    int i = 0, n = s.size();

    // Step 1: Skip whitespace
    while (i < n && s[i] == ' ') i++;
    if (i == n) return 0;

    // Step 2: Sign
    bool positive = true;
    if (s[i] == '-') { positive = false; i++; }
    else if (s[i] == '+') { i++; }

    // Step 3: Read digits
    long long ans = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        ans = ans * 10 + (s[i] - '0');
        // Step 4: Overflow check
        if (ans > INT_MAX) {
            return positive ? INT_MAX : INT_MIN;
        }
        i++;
    }

    ans = positive ? ans : -ans;
    return (int)ans;
}

/*
============================================================
APPROACH 2: OPTIMAL - Same logic, overflow check without long long
============================================================
Idea:
- Use int only. Before multiplying by 10, check if it would overflow:
  if ans > INT_MAX/10, or ans == INT_MAX/10 and digit > 7 → overflow.

Dry Run: s = "2147483648"  (INT_MAX + 1)
  Process: ans builds up: 2,21,214,2147,21474,214748,2147483,21474836
  Next: ans=21474836, digit=4 → 21474836 == INT_MAX/10 (214748364)? No, 21474836 < 214748364
  Continue... ans=214748364, digit=8 → 214748364 == INT_MAX/10 and 8>7 → overflow!
  positive → return INT_MAX = 2147483647  ✓

Time: O(N) | Space: O(1)
*/

int myAtoi_Optimal(string s) {
    int i = 0, n = s.size();

    while (i < n && s[i] == ' ') i++;
    if (i == n) return 0;

    bool positive = true;
    if (s[i] == '-') { positive = false; i++; }
    else if (s[i] == '+') { i++; }

    int ans = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        int digit = s[i] - '0';

        // Check overflow before update
        if (ans > INT_MAX / 10 || (ans == INT_MAX / 10 && digit > 7)) {
            return positive ? INT_MAX : INT_MIN;
        }

        ans = ans * 10 + digit;
        i++;
    }

    return positive ? ans : -ans;
}

