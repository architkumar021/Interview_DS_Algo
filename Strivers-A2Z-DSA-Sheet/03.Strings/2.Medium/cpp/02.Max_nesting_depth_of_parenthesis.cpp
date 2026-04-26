/*
============================================================
Problem: Maximum Nesting Depth of the Parentheses (LeetCode 1614)
============================================================
Given a VPS (valid parenthesized string) s, return the nesting depth of s.

Example 1: Input: "(1+(2*3)+((8)/4))+1"  Output: 3
Example 2: Input: "(1)+((2))+(((3)))"    Output: 3
Example 3: Input: "1+(2*3)/(2-1)"        Output: 1

============================================================
APPROACH 1: BRUTE FORCE - Using Stack
============================================================
Approach:
1. Use a stack to track open parentheses.
2. On '(': push to stack, update max depth as max(maxD, stack.size()).
3. On ')': pop from stack.
4. Ignore all other characters.
5. Return the maximum depth recorded.

Dry Run: s = "(1+(2*3)+((8)/4))+1"
  '(' → stack=['('], max=1
  '(' → stack=['(','('], max=2
  ')' → stack=['('], max=2
  '(' → stack=['(','('], max=2
  '(' → stack=['(','(','('], max=3
  ')' → stack=['(','('], max=3
  ')' → stack=['('], max=3
  ')' → stack=[], max=3
  Result: 3  ✓

Time: O(N) | Space: O(N) — for the stack
*/

#include <bits/stdc++.h>
using namespace std;

int maxDepth_BruteForce(string s) {
    stack<char> st;
    int maxD = 0;

    for (char c : s) {
        if (c == '(') {
            st.push(c);
            maxD = max(maxD, (int)st.size());
        } else if (c == ')') {
            st.pop();
        }
    }

    return maxD;
}

/*
============================================================
APPROACH 2: OPTIMAL - Counter Variable (No Stack)
============================================================
Approach:
1. Replace the stack with an integer counter 'opened' to track depth.
2. On '(': increment the counter, then update maxD = max(maxD, opened).
3. On ')': decrement the counter.
4. Ignore all other characters.
5. Return maxD — the maximum depth recorded.

Dry Run: s = "(1+(2*3)+((8)/4))+1"
  '(' → opened=1, max=1
  '(' → opened=2, max=2
  ')' → opened=1
  '(' → opened=2
  '(' → opened=3, max=3
  ')' → opened=2
  ')' → opened=1
  ')' → opened=0
  Result: 3  ✓

Time: O(N) | Space: O(1)
*/

int maxDepth_Optimal(string s) {
    int opened = 0, maxD = 0;

    for (char c : s) {
        if (c == '(') {
            opened++;
            maxD = max(maxD, opened);
        } else if (c == ')') {
            opened--;
        }
    }

    return maxD;
}

