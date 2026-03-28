/*
=============================================================================
  QUESTION: Implement atoi using Recursion (GFG)
=============================================================================

  Convert a string to an integer using recursion (no inbuilt functions).
  Return -1 if string has any non-digit character (except leading '-').

  Examples:
    "123"  → 123
    "21a"  → -1  (invalid char 'a')
    "-456" → -456

=============================================================================
  APPROACH: Build Number Left to Right — O(N) Time, O(N) Space
=============================================================================

  Idea:
  - Process characters left to right using recursion.
  - Each call: result so far × 10 + current digit.
  - If any char is not a digit → return -1.
  - Handle '-' sign separately in the wrapper function.

  Dry Run ("123"):
    solve(0, 0) → '1' is digit → solve(1, 0*10 + 1 = 1)
    solve(1, 1) → '2' is digit → solve(2, 1*10 + 2 = 12)
    solve(2, 12) → '3' is digit → solve(3, 12*10 + 3 = 123)
    solve(3, 123) → i === len → return 123 ✓

  Dry Run ("21a"):
    solve(0, 0) → '2' → solve(1, 2)
    solve(1, 2) → '1' → solve(2, 21)
    solve(2, 21) → 'a' → not a digit → return -1 ✓

  Dry Run ("-456"):
    myAtoi detects '-' → starts from index 1
    solve(1, 0) → '4' → solve(2, 4)
    solve(2, 4) → '5' → solve(3, 45)
    solve(3, 45) → '6' → solve(4, 456)
    solve(4, 456) → i === len → return 456
    Apply sign → -456 ✓

=============================================================================
*/

function myAtoi(str) {
    let start = 0;
    let isNegative = false;

    // Handle negative sign
    if (str[0] === '-') {
        isNegative = true;
        start = 1;
    }

    function solve(i, num) {
        // Base: processed all characters
        if (i === str.length) return num;

        let digit = str.charCodeAt(i) - 48;  // '0' is 48

        // Invalid character
        if (digit < 0 || digit > 9) return -1;

        // Build number: shift left and add digit
        return solve(i + 1, num * 10 + digit);
    }

    let result = solve(start, 0);
    if (result === -1) return -1;
    return isNegative ? -result : result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(myAtoi("123"));    // 123
console.log(myAtoi("21a"));    // -1
console.log(myAtoi("-456"));   // -456
console.log(myAtoi("0"));      // 0
console.log(myAtoi("9999"));   // 9999
