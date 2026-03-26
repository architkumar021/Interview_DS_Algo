"""
=============================================================================
  QUESTION: Implement atoi using Recursion (GFG)
=============================================================================

  Implement the function atoi which converts a string to an integer.
  No inbuilt functions allowed.

  Example 1: Input: "123"   → Output: 123
  Example 2: Input: "21a"   → Output: -1 (not all characters are digits)
  Example 3: Input: "-456"  → Output: -456

=============================================================================
  APPROACH: Recursive Digit Conversion (Right to Left)
=============================================================================

  Process string from RIGHT to LEFT recursively.
  - get_num(i, s) returns the integer formed by s[0..i]
  - Base case: i < 0 → return 0
  - At index 0, if char is '-', return 0 (handle sign in main)
  - If valid digit: result = get_num(i-1) * 10 + digit
  - Invalid character → return inf (sentinel)

  DRY RUN with "123":
    get_num(2): digit='3', prev=get_num(1)
      get_num(1): digit='2', prev=get_num(0)
        get_num(0): digit='1', prev=get_num(-1) → 0
        return 0*10+1 = 1
      return 1*10+2 = 12
    return 12*10+3 = 123 ✓

  DRY RUN with "21a":
    get_num(2): char='a', not 0-9 → return inf → result = -1 ✓

  Time: O(N), Space: O(N) — recursion stack
=============================================================================
"""


def get_num(i, s):
    # Base case: processed all characters
    if i < 0:
        return 0

    # Handle negative sign at index 0
    if i == 0 and s[i] == '-':
        return 0

    # Convert character to digit
    digit = ord(s[i]) - ord('0')

    # If valid digit (0-9), build number recursively
    if 0 <= digit <= 9:
        prev = get_num(i - 1, s)
        if prev != float('inf'):
            return prev * 10 + digit

    # Invalid character
    return float('inf')


def my_atoi(s):
    i = len(s) - 1
    ans = get_num(i, s)

    if ans == float('inf'):
        return -1
    if s[0] == '-':
        return -1 * ans
    return ans


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    print(my_atoi("123"))    # 123
    print(my_atoi("21a"))    # -1
    print(my_atoi("-456"))   # -456
    print(my_atoi("0"))      # 0
