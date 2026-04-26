"""
============================================================
Problem: Maximum Nesting Depth of the Parentheses (LeetCode 1614)
============================================================
Given a VPS s, return the nesting depth of s.

Example 1: Input: "(1+(2*3)+((8)/4))+1"  Output: 3
Example 2: Input: "(1)+((2))+(((3)))"    Output: 3

============================================================
APPROACH 1: BRUTE FORCE - Using Stack (List)
============================================================
Approach:
1. Use a list as a stack to track open parentheses.
2. On '(': push to stack, update max_d = max(max_d, len(stack)).
3. On ')': pop from stack.
4. Return the maximum depth recorded.

Dry Run: s = "(1+(2*3)+((8)/4))+1"
  '(' → stack=['('], max=1
  '(' → stack=['(','('], max=2
  ')' → stack=['(']
  '(' → stack=['(','(']  '(' → stack=['(','(','('], max=3
  ')' → 2  ')' → 1  ')' → 0
  Result: 3  ✓

Time: O(N) | Space: O(N)
"""


def maxDepth_BruteForce(s: str) -> int:
    stack = []
    max_d = 0

    for c in s:
        if c == '(':
            stack.append('(')
            max_d = max(max_d, len(stack))
        elif c == ')':
            stack.pop()

    return max_d


"""
============================================================
APPROACH 2: OPTIMAL - Counter Variable
============================================================
Approach:
1. Use an integer counter 'opened' instead of a stack.
2. On '(': increment, update max_d.
3. On ')': decrement.
4. Return max_d.

Dry Run: s = "(1+(2*3)+((8)/4))+1"
  '(' → opened=1, max=1
  '(' → opened=2, max=2
  ')' → opened=1
  '(' → opened=2  '(' → opened=3, max=3
  ')' → 2  ')' → 1  ')' → 0
  Result: 3  ✓

Time: O(N) | Space: O(1)
"""


def maxDepth_Optimal(s: str) -> int:
    opened = 0
    max_d = 0

    for c in s:
        if c == '(':
            opened += 1
            max_d = max(max_d, opened)
        elif c == ')':
            opened -= 1

    return max_d

