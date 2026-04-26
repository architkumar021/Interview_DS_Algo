/*
============================================================
Problem: String to Integer (atoi) (LeetCode 8)
============================================================
Implement myAtoi(string s) which converts a string to a 32-bit signed integer.

Example 1: Input: "42"       Output: 42
Example 2: Input: "   -42"   Output: -42
Example 3: Input: "4193 with words"  Output: 4193

============================================================
APPROACH 1: BRUTE FORCE - Parse Step by Step
============================================================
Dry Run: s = "   -42"
  Skip spaces → i=3
  s[3]='-' → sign=-1, i=4
  s[4]='4' → ans=4, i=5
  s[5]='2' → ans=42, i=6
  ans * sign = -42
  In range → return -42  ✓

Time: O(N) | Space: O(1)
*/

function myAtoi_BruteForce(s) {
    const INT_MAX = 2147483647, INT_MIN = -2147483648;
    let i = 0, n = s.length;

    // Skip whitespace
    while (i < n && s[i] === ' ') i++;
    if (i === n) return 0;

    // Sign
    let sign = 1;
    if (s[i] === '-') { sign = -1; i++; }
    else if (s[i] === '+') { i++; }

    // Read digits
    let ans = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        ans = ans * 10 + (s.charCodeAt(i) - 48);
        if (sign === 1 && ans >= INT_MAX) return INT_MAX;
        if (sign === -1 && ans * -1 <= INT_MIN) return INT_MIN;
        i++;
    }

    return ans * sign;
}

/*
============================================================
APPROACH 2: OPTIMAL - Same with early overflow detection
============================================================
Dry Run: s = "2147483648"
  Digits: 2,1,4,7,4,8,3,6,4,8
  ans builds: 2→21→214→2147→21474→214748→2147483→21474836→214748364
  Next digit=8 → 214748364 * 10 + 8 = 2147483648 > INT_MAX → return INT_MAX  ✓

Time: O(N) | Space: O(1)
*/

function myAtoi_Optimal(s) {
    const INT_MAX = 2147483647, INT_MIN = -2147483648;
    let i = 0, n = s.length;

    while (i < n && s[i] === ' ') i++;
    if (i === n) return 0;

    let sign = 1;
    if (s[i] === '-') { sign = -1; i++; }
    else if (s[i] === '+') { i++; }

    let ans = 0;
    const limit = Math.floor(INT_MAX / 10);

    while (i < n && s[i] >= '0' && s[i] <= '9') {
        let digit = s.charCodeAt(i) - 48;

        if (ans > limit || (ans === limit && digit > 7)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }

        ans = ans * 10 + digit;
        i++;
    }

    return ans * sign;
}

