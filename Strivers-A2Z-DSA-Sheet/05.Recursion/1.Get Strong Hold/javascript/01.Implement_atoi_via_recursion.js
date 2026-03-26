/*
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

  The idea is to process the string from RIGHT to LEFT recursively.
  Each recursive call handles one digit and builds the number by
  multiplying the result of previous digits by 10.

  How it works:
  - getNum(i, str) returns the integer formed by str[0..i]
  - Base case: i < 0 → return 0 (no more characters)
  - At index 0, if char is '-', return 0 (handle sign in main function)
  - Convert char to digit: charCode - '0' charCode
  - If valid digit (0-9): result = getNum(i-1) * 10 + digit
  - If invalid character: return 1e9 (sentinel for "invalid")

  DRY RUN with "123":
  ────────────────────
  myAtoi("123") → getNum(2, "123")
    i=2, char='3', digit=3
    prev = getNum(1, "123")
      i=1, char='2', digit=2
      prev = getNum(0, "123")
        i=0, char='1', digit=1
        prev = getNum(-1, "123")
          i < 0 → return 0
        return 0 * 10 + 1 = 1
      return 1 * 10 + 2 = 12
    return 12 * 10 + 3 = 123
  ans = 123, str[0] ≠ '-' → return 123 ✓

  DRY RUN with "21a":
  ────────────────────
  myAtoi("21a") → getNum(2, "21a")
    i=2, char='a', digit = 'a'-'0' = 49 (not 0-9)
    return 1e9 (INVALID)
  ans = 1e9 → return -1 ✓

  DRY RUN with "-456":
  ─────────────────────
  myAtoi("-456") → getNum(2, "-456")
    i=2, '6' → prev = getNum(1, "-456")
      i=1, '5' → prev = getNum(0, "-456")
        i=0, char='-' → return 0 (special case)
      return 0 * 10 + 5 = 5
    return 5 * 10 + 6 = 56
  ans = 56 (not 1e9), but str[0] === '-' → return -1 * 56 = NOT right...

  Wait — issue with "-456": getNum skips '-', builds 56 from "45" and "6"
  Actually let me retrace:
    getNum(2): digit='6', prev=getNum(1)
      getNum(1): digit='5', prev=getNum(0)
        getNum(0): char='-' → return 0
      return 0*10 + 5 = 5
    return 5*10 + 6 = 56
  
  This is incorrect for "-456" — the original C++ code has the same issue
  since index 0 ('-') returns 0, which loses digit '4' at index... wait,
  "-456" has '-' at 0, '4' at 1, '5' at 2, '6' at 3.
    getNum(3): '6', prev=getNum(2)
      getNum(2): '5', prev=getNum(1)
        getNum(1): '4', prev=getNum(0)
          getNum(0): '-' → return 0
        return 0*10+4 = 4
      return 4*10+5 = 45
    return 45*10+6 = 456
  ans=456, str[0]='-' → return -456 ✓

  Time Complexity:  O(N) — one recursive call per character
  Space Complexity: O(N) — recursion stack depth = string length

=============================================================================
*/

function getNum(i, str) {
    // Base case: processed all characters
    if (i < 0) return 0;

    // Handle negative sign at index 0 — skip it, sign handled in myAtoi
    if (i === 0 && str[i] === '-') return 0;

    // Convert character to digit
    let digit = str.charCodeAt(i) - '0'.charCodeAt(0);

    // If valid digit (0-9), build number recursively
    if (digit >= 0 && digit <= 9) {
        let prev = getNum(i - 1, str);    // Get number formed by str[0..i-1]
        if (prev !== 1e9) {
            return prev * 10 + digit;      // Append current digit
        }
    }

    // Invalid character found — return sentinel
    return 1e9;
}

function myAtoi(str) {
    let i = str.length - 1;
    let ans = getNum(i, str);

    if (ans === 1e9) return -1;           // Invalid string
    if (str[0] === '-') return -1 * ans;  // Negative number
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(myAtoi("123"));    // 123
console.log(myAtoi("21a"));    // -1
console.log(myAtoi("-456"));   // -456
console.log(myAtoi("0"));      // 0
console.log(myAtoi("9999"));   // 9999
