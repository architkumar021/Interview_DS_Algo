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
APPROACH 1: BRUTE FORCE - Using Stack
============================================================
Approach:
1. Initialize an empty stack and an empty result string.
2. Iterate through each character of the string.
3. If the character is '(':
   - If the stack is NOT empty, this '(' is an inner parenthesis → add to result.
   - Push '(' onto the stack (to track depth).
4. If the character is ')':
   - Pop from the stack (closing the current group).
   - If the stack is NOT empty after popping, this ')' is inner → add to result.
5. The outermost '(' and ')' are skipped because the stack is empty when we encounter them.
6. Return the result string.

Dry Run: s = "(()())(())"
  i=0: '(' → stack empty → outermost open, push '(' → stack=['(']
  i=1: '(' → stack.size()=1 > 0 → res+='(', push '(' → stack=['(','('], res="("
  i=2: ')' → pop → stack=['('], size=1 > 0 → res+=')' → res="()"
  i=3: '(' → stack.size()=1 > 0 → res+='(', push '(' → stack=['(','('], res="()("
  i=4: ')' → pop → stack=['('], size=1 > 0 → res+=')' → res="()()"
  i=5: ')' → pop → stack=[], size=0 → outermost close, skip
  i=6: '(' → stack empty → outermost open, push '(' → stack=['(']
  i=7: '(' → stack.size()=1 > 0 → res+='(', push '(' → stack=['(','('], res="()()(""
  i=8: ')' → pop → stack=['('], size=1 > 0 → res+=')' → res="()()()"
  i=9: ')' → pop → stack=[], size=0 → outermost close, skip
  Result: "()()()"  ✓

Time Complexity: O(N)
Space Complexity: O(N) — for the stack
*/

#include <bits/stdc++.h>
using namespace std;

string removeOuterParentheses_BruteForce(string s) {
    string res = "";
    stack<char> st;

    for (char c : s) {
        if (c == '(') {
            if (!st.empty()) {
                res += c;  // not outermost
            }
            st.push(c);
        } else {
            st.pop();
            if (!st.empty()) {
                res += c;  // not outermost
            }
        }
    }

    return res;
}

/*
============================================================
APPROACH 2: OPTIMAL - Counter Variable (No Stack)
============================================================
Approach:
1. Replace the stack with a single integer counter 'opened' to track depth.
2. Iterate through each character of the string.
3. For '(': If opened > 0, it's an inner parenthesis → add to result. Then increment opened.
4. For ')': Decrement opened first. If opened > 0, it's an inner parenthesis → add to result.
5. This avoids the overhead of a stack structure while maintaining the same logic.
6. Return the result string.

Dry Run: s = "(()())(())"
  i=0: '(' → opened=0 → skip, opened becomes 1
  i=1: '(' → opened=1 > 0 → res+='(', opened becomes 2, res="("
  i=2: ')' → opened becomes 1, opened > 0 → res+=')' → res="()"
  i=3: '(' → opened=1 > 0 → res+='(', opened becomes 2, res="()("
  i=4: ')' → opened becomes 1, opened > 0 → res+=')' → res="()()"
  i=5: ')' → opened becomes 0, opened=0 → skip
  i=6: '(' → opened=0 → skip, opened becomes 1
  i=7: '(' → opened=1 > 0 → res+='(', opened becomes 2, res="()()(""
  i=8: ')' → opened becomes 1, opened > 0 → res+=')' → res="()()()"
  i=9: ')' → opened becomes 0 → skip
  Result: "()()()"  ✓

Time Complexity: O(N)
Space Complexity: O(1) — only a counter variable (excluding output)
*/

string removeOuterParentheses_Optimal(string s) {
    string res;
    int opened = 0;

    for (char c : s) {
        if (c == '(') {
            if (opened > 0)
                res += c;
            opened++;
        } else {
            opened--;
            if (opened > 0)
                res += c;
        }
    }

    return res;
}

