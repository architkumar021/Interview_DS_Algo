/*
=============================================================================
  QUESTION: 22. Generate Parentheses (LeetCode)
=============================================================================

  Given n pairs of parentheses, generate all combinations of well-formed parentheses.

  Example: n=3 → ["((()))","(()())","(())()","()(())","()()()"]
  Example: n=1 → ["()"]

=============================================================================
  APPROACH: Recursion with Open/Close Count
=============================================================================

  Rules for valid parentheses:
  1. We can add '(' if open count < n
  2. We can add ')' ONLY if close count < open count
     (can't close what hasn't been opened)
  3. When open == n && close == n → valid string of length 2n

  Recursion tree for n=2:
  ────────────────────────
                      ""
                      |
                     "("
                   /      \
               "(("        "()"
              /    \          |
          "(()"   INVALID   "()(""
            |                  |
         "(())"             "()()"
            ✓                  ✓

  DRY RUN with n=2:
  ──────────────────
  solve("", open=0, close=0, n=2)
    open(0) <= n(2) → solve("(", 1, 0, 2)
      open(1) <= n(2) → solve("((", 2, 0, 2)
        open(2) > close(0) → solve("(()", 2, 1, 2)
          open(2) > close(1) → solve("(())", 2, 2, 2)
            open==n && close==n → PUSH "(())" ✓
      open(1) > close(0) → solve("()", 1, 1, 2)
        open(1) <= n(2) → solve("()(", 2, 1, 2)
          open(2) > close(1) → solve("()()", 2, 2, 2)
            open==n && close==n → PUSH "()()" ✓

  Result: ["(())", "()()"] ✓

  Time Complexity:  O(2^N × N) — Catalan number of valid strings
  Space Complexity: O(N) — recursion depth = 2N

=============================================================================
*/

function solve(ans, s, open, close, n) {
    // Base case: used all n open and n close brackets
    if (open === n && close === n) {
        ans.push(s);
        return;
    }

    // Can add '(' if we haven't used all n opening brackets
    if (open <= n)
        solve(ans, s + '(', open + 1, close, n);

    // Can add ')' only if there's an unmatched '(' (close < open)
    if (open > close)
        solve(ans, s + ')', open, close + 1, n);
}

function generateParenthesis(n) {
    let ans = [];
    solve(ans, "", 0, 0, n);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(generateParenthesis(1));  // ["()"]
console.log(generateParenthesis(2));  // ["(())","()()"]
console.log(generateParenthesis(3));  // ["((()))","(()())","(())()","()(())","()()()"]
