/*
============================================================
Problem: Maximum Nesting Depth of the Parentheses (LeetCode 1614)
============================================================
Given a VPS s, return the nesting depth of s.

Example 1: Input: "(1+(2*3)+((8)/4))+1"  Output: 3
Example 2: Input: "(1)+((2))+(((3)))"    Output: 3

============================================================
APPROACH 1: BRUTE FORCE - Using Stack (Array)
============================================================
Dry Run: s = "(1+(2*3)+((8)/4))+1"
  '(' → stack=[1], max=1
  '(' → stack=[1,1], max=2
  ')' → stack=[1]
  '(' → stack=[1,1]
  '(' → stack=[1,1,1], max=3
  ')' → stack=[1,1]  ')' → stack=[1]  ')' → stack=[]
  Result: 3  ✓

Time: O(N) | Space: O(N)
*/

function maxDepth_BruteForce(s) {
    let stack = [];
    let maxD = 0;

    for (let c of s) {
        if (c === '(') {
            stack.push('(');
            maxD = Math.max(maxD, stack.length);
        } else if (c === ')') {
            stack.pop();
        }
    }

    return maxD;
}

/*
============================================================
APPROACH 2: OPTIMAL - Counter Variable
============================================================
Dry Run: s = "(1+(2*3)+((8)/4))+1"
  '(' → opened=1, max=1
  '(' → opened=2, max=2
  ')' → opened=1
  '(' → opened=2  '(' → opened=3, max=3
  ')' → 2  ')' → 1  ')' → 0
  Result: 3  ✓

Time: O(N) | Space: O(1)
*/

function maxDepth_Optimal(s) {
    let opened = 0, maxD = 0;

    for (let c of s) {
        if (c === '(') {
            opened++;
            maxD = Math.max(maxD, opened);
        } else if (c === ')') {
            opened--;
        }
    }

    return maxD;
}

