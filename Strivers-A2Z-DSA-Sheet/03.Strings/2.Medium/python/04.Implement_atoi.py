"""
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
Approach:
1. Skip leading whitespace.
2. Check for optional '+'/'-' sign.
3. Read consecutive digits, building the number.
4. Apply sign, then clamp to [INT_MIN, INT_MAX] range.
5. Return the result.

Dry Run: s = "   -42"
  Skip spaces → i=3
  s[3]='-' → sign=-1, i=4
  s[4]='4' → ans=4
  s[5]='2' → ans=42
  return -42  ✓

Time: O(N) | Space: O(1)
"""

INT_MAX = 2**31 - 1
INT_MIN = -(2**31)


def myAtoi_BruteForce(s: str) -> int:
    i, n = 0, len(s)

    # Skip whitespace
    while i < n and s[i] == ' ':
        i += 1
    if i == n:
        return 0

    # Sign
    sign = 1
    if s[i] == '-':
        sign = -1
        i += 1
    elif s[i] == '+':
        i += 1

    # Read digits
    ans = 0
    while i < n and s[i].isdigit():
        ans = ans * 10 + int(s[i])
        i += 1

    ans *= sign
    # Clamp
    if ans > INT_MAX:
        return INT_MAX
    if ans < INT_MIN:
        return INT_MIN
    return ans


"""
============================================================
APPROACH 2: OPTIMAL - Early overflow detection (no big int)
============================================================
Approach:
1. Same steps: whitespace → sign → digits.
2. Before multiplying, check if ans > INT_MAX//10 or (ans == INT_MAX//10 and digit > 7).
3. If overflow, return INT_MAX or INT_MIN immediately.
4. Apply sign and return.

Dry Run: s = "2147483648"
  ans builds: 2→21→214→...→214748364
  Next digit=8: 214748364 > 214748364? No. == and 8>7? Yes → overflow
  Return INT_MAX  ✓

Time: O(N) | Space: O(1)
"""


def myAtoi_Optimal(s: str) -> int:
    i, n = 0, len(s)

    while i < n and s[i] == ' ':
        i += 1
    if i == n:
        return 0

    sign = 1
    if s[i] == '-':
        sign = -1
        i += 1
    elif s[i] == '+':
        i += 1

    ans = 0
    limit = INT_MAX // 10

    while i < n and s[i].isdigit():
        digit = int(s[i])

        if ans > limit or (ans == limit and digit > 7):
            return INT_MAX if sign == 1 else INT_MIN

        ans = ans * 10 + digit
        i += 1

    return ans * sign

