/*
============================================================
Problem: Remove Outermost Parentheses (LeetCode 1021)
============================================================
Given a valid parentheses string s, remove the outermost parentheses of every primitive
string in the primitive decomposition of s.

Example 1: Input: s = "(()())(())"   Output: "()()()"
Example 2: Input: s = "(()())(())(()()())"  Output: "()()()()()()"
Example 3: Input: s = "()()"   Output: ""

============================================================
APPROACH 1: BRUTE FORCE - Using Stack (Array)
============================================================
Approach:
1. Initialize an empty array as a stack and an empty result string.
2. Iterate through each character of the string.
3. For '(': If stack is NOT empty, it's an inner '(' → add to result. Then push onto stack.
4. For ')': Pop from stack. If stack is NOT empty after popping, it's an inner ')' → add to result.
5. The outermost parentheses are skipped because the stack is empty at those points.
6. Return the result string.

Dry Run: s = "(()())(())"
  i=0: '(' → stack empty → outermost, push → stack=['(']
  i=1: '(' → stack.length=1 > 0 → res+='(' , push → stack=['(','('], res="("
  i=2: ')' → pop → stack=['('], length=1 > 0 → res+=')' → res="()"
  i=3: '(' → stack.length=1 > 0 → res+='(' , push → stack=['(','('], res="()("
  i=4: ')' → pop → stack=['('], length > 0 → res+=')' → res="()()"
  i=5: ')' → pop → stack=[], length=0 → skip
  i=6: '(' → stack empty → outermost, push → stack=['(']
  i=7: '(' → stack.length=1 > 0 → res+='(' → push, res="()()(""
  i=8: ')' → pop → stack=['('], length > 0 → res+=')' → res="()()()"
  i=9: ')' → pop → stack=[], skip
  Result: "()()()"  ✓

Time: O(N) | Space: O(N)
*/

function removeOuterParentheses_BruteForce(s) {
    let res = "";
    let stack = [];

    for (let c of s) {
        if (c === '(') {
            if (stack.length > 0) {
                res += c;
            }
            stack.push(c);
        } else {
            stack.pop();
            if (stack.length > 0) {
                res += c;
            }
        }
    }

    return res;
}

/*
============================================================
APPROACH 2: OPTIMAL - Counter Variable
============================================================
Approach:
1. Use an integer counter 'opened' instead of a stack to track the nesting depth.
2. For '(': If opened > 0, it's inner → add to result. Then increment opened.
3. For ')': Decrement opened first. If opened > 0 after decrement, it's inner → add to result.
4. Return the result string.

Dry Run: s = "(()())(())"
  i=0: '(' → opened=0 → skip, opened=1
  i=1: '(' → opened=1>0 → res='(', opened=2
  i=2: ')' → opened=1, opened>0 → res='()'
  i=3: '(' → opened=1>0 → res='()(', opened=2
  i=4: ')' → opened=1, opened>0 → res='()()'
  i=5: ')' → opened=0, skip
  i=6: '(' → opened=0 → skip, opened=1
  i=7: '(' → opened=1>0 → res='()()(' , opened=2
  i=8: ')' → opened=1, opened>0 → res='()()()'
  i=9: ')' → opened=0, skip
  Result: "()()()"  ✓

Time: O(N) | Space: O(1)
*/

function removeOuterParentheses_Optimal(s) {
    let res = "";
    let opened = 0;

    for (let c of s) {
        if (c === '(') {
            if (opened > 0) res += c;
            opened++;
        } else {
            opened--;
            if (opened > 0) res += c;
        }
    }

    return res;
}

