"""
=============================================================================
  QUESTION: 22. Generate Parentheses (LeetCode)
=============================================================================

  Given n pairs of parentheses, generate all combinations of well-formed parentheses.
  Example: n=3 → ["((()))","(()())","(())()","()(())","()()()"]

  APPROACH: Recursion with Open/Close Count
  - Add '(' if open < n. Add ')' ONLY if close < open.
  - Base: open == n and close == n → valid string found.

  Recursion tree for n=2:
                    ""
                    |
                   "("
                 /      \\
             "(("        "()"
            /    \\          |
        "(()"   INVALID   "()(""
          |                  |
       "(())"             "()()"

  DRY RUN n=2:
    solve("",0,0) → solve("(",1,0) → solve("((",2,0) → solve("(()",2,1)
      → solve("(())",2,2) → PUSH "(())" ✓
    solve("(",1,0) → solve("()",1,1) → solve("()(",2,1) → solve("()()",2,2) → PUSH "()()" ✓

  Time: O(2^N × N), Space: O(N)
=============================================================================
"""


def solve(ans, s, open_count, close_count, n):
    if open_count == n and close_count == n:
        ans.append(s)
        return

    if open_count <= n:
        solve(ans, s + '(', open_count + 1, close_count, n)
    if open_count > close_count:
        solve(ans, s + ')', open_count, close_count + 1, n)


def generate_parenthesis(n):
    ans = []
    solve(ans, "", 0, 0, n)
    return ans


# Driver Code
if __name__ == "__main__":
    print(generate_parenthesis(3))
    # ["((()))","(()())","(())()","()(())","()()()"]

