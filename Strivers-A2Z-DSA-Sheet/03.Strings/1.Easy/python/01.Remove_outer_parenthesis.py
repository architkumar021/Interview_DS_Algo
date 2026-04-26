"""
============================================================
Problem: Remove Outermost Parentheses (LeetCode 1021)
============================================================
Given a valid parentheses string s, remove the outermost parentheses of every primitive
string in the primitive decomposition of s.

Example 1: Input: s = "(()())(())"   Output: "()()()"
Example 2: Input: s = "(()())(())(()()())"  Output: "()()()()()()"
Example 3: Input: s = "()()"   Output: ""

============================================================
APPROACH 1: BRUTE FORCE - Using Stack (List)
============================================================
Approach:
1. Initialize an empty list as a stack and a result list.
2. Iterate through each character of the string.
3. For '(': If stack is NOT empty, it's an inner '(' → append to result. Then push onto stack.
4. For ')': Pop from stack. If stack is NOT empty after popping, it's an inner ')' → append to result.
5. The outermost parentheses are skipped because the stack is empty at those points.
6. Join and return the result.

Dry Run: s = "(()())(())"
  i=0: '(' → stack empty → outermost, push → stack=['(']
  i=1: '(' → len(stack)=1>0 → res+='(', push → stack=['(','('], res="("
  i=2: ')' → pop → stack=['('], len>0 → res+=')' → res="()"
  i=3: '(' → len=1>0 → res+='(', push → res="()("
  i=4: ')' → pop → stack=['('], len>0 → res+=')' → res="()()"
  i=5: ')' → pop → stack=[], len=0 → skip
  i=6: '(' → stack empty → push
  i=7: '(' → len=1>0 → res+='(' → res="()()("
  i=8: ')' → pop → len=1>0 → res+=')' → res="()()()"
  i=9: ')' → pop → stack=[], skip
  Result: "()()()"  ✓

Time: O(N) | Space: O(N)
"""


def removeOuterParentheses_BruteForce(s: str) -> str:
    res = []
    stack = []

    for c in s:
        if c == '(':
            if stack:
                res.append(c)
            stack.append(c)
        else:
            stack.pop()
            if stack:
                res.append(c)

    return ''.join(res)


"""
============================================================
APPROACH 2: OPTIMAL - Counter Variable
============================================================
Approach:
1. Use an integer counter 'opened' instead of a stack to track nesting depth.
2. For '(': If opened > 0, it's inner → append to result. Then increment opened.
3. For ')': Decrement opened first. If opened > 0, it's inner → append to result.
4. Join and return the result.

Dry Run: s = "(()())(())"
  i=0: '(' → opened=0 → skip, opened=1
  i=1: '(' → opened=1>0 → res='(', opened=2
  i=2: ')' → opened=1, >0 → res='()'
  i=3: '(' → opened=1>0 → res='()(', opened=2
  i=4: ')' → opened=1, >0 → res='()()'
  i=5: ')' → opened=0, skip
  i=6: '(' → opened=0 → skip, opened=1
  i=7: '(' → opened=1>0 → res='()()('
  i=8: ')' → opened=1, >0 → res='()()()'
  i=9: ')' → opened=0, skip
  Result: "()()()"  ✓

Time: O(N) | Space: O(1)
"""


def removeOuterParentheses_Optimal(s: str) -> str:
    res = []
    opened = 0

    for c in s:
        if c == '(':
            if opened > 0:
                res.append(c)
            opened += 1
        else:
            opened -= 1
            if opened > 0:
                res.append(c)

    return ''.join(res)

