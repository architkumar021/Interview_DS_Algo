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

