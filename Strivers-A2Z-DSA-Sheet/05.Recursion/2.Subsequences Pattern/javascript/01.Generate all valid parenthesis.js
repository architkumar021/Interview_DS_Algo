/*
=============================================================================
  QUESTION: 22. Generate Parentheses (LeetCode)
=============================================================================

  Given n pairs of parentheses, generate all valid (well-formed) combinations.

  Examples:
    n = 1 → ["()"]
    n = 3 → ["((()))","(()())","(())()","()(())","()()()"]

=============================================================================
  APPROACH: Recursion with Open/Close Count — O(2^N × N) Time, O(N) Space
=============================================================================

  Rules:
  - Add '(' if open < n
  - Add ')' only if close < open (can't close what isn't opened)
  - When both open and close == n → valid string, push to result

  Dry Run (n=2):
    ""  →  "("  →  "(("  →  "(()"  →  "(())" ✓
                →  "()"  →  "()("  →  "()()" ✓

=============================================================================
*/

function generateParenthesis(n) {
    let result = [];

    function solve(s, open, close) {
        if (open === n && close === n) {
            result.push(s);
            return;
        }
        if (open < n) solve(s + '(', open + 1, close);
        if (close < open) solve(s + ')', open, close + 1);
    }

    solve("", 0, 0);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(generateParenthesis(1));  // ["()"]
console.log(generateParenthesis(2));  // ["(())","()()"]
console.log(generateParenthesis(3));  // ["((()))","(()())","(())()","()(())","()()()"]
