/*
=============================================================================
  QUESTION: Reverse a Stack using Recursion (GFG)
=============================================================================

  Reverse a given stack of N integers using recursion.
  No extra space allowed other than the internal stack space (recursion).

  Example: [1, 2, 3, 4, 5] → [5, 4, 3, 2, 1]
           (bottom → top)      (bottom → top)

=============================================================================
  APPROACH: Two Recursive Functions
=============================================================================

  We need TWO helper functions:

  1. insertAtBottom(ele, stack):
     - Goal: Insert 'ele' at the BOTTOM of the stack
     - If stack is empty → push ele (it's at the bottom now!)
     - Else → pop the top, insert ele at bottom, push top back
     - This essentially "holds" elements on the recursion stack
       while we push ele at the very bottom

  2. reverseStack(stack):
     - Pop the top element
     - Recursively reverse the remaining stack
     - Insert the popped element at the bottom of the reversed stack

  Visual Intuition:
  ─────────────────
  Think of it like taking cards from top of a pile one by one,
  reversing the remaining pile, then putting each card at the bottom.

  DRY RUN with stack = [1, 2, 3] (1=bottom, 3=top):
  ───────────────────────────────────────────────────
  reverseStack([1, 2, 3])
    pop 3, stack = [1, 2]
    reverseStack([1, 2])
      pop 2, stack = [1]
      reverseStack([1])
        pop 1, stack = []
        reverseStack([])  → base case, return
        insertAtBottom(1, [])
          empty → push 1 → stack = [1]
      insertAtBottom(2, [1])
        pop 1, stack = []
        insertAtBottom(2, [])
          empty → push 2 → stack = [2]
        push 1 → stack = [2, 1]
    insertAtBottom(3, [2, 1])
      pop 1, stack = [2]
      insertAtBottom(3, [2])
        pop 2, stack = []
        insertAtBottom(3, [])
          empty → push 3 → stack = [3]
        push 2 → stack = [3, 2]
      push 1 → stack = [3, 2, 1]

  Final: [3, 2, 1] (3=bottom, 1=top) → REVERSED ✓

  Time Complexity:  O(N²) — for each of N elements, insertAtBottom takes O(N)
  Space Complexity: O(N) — recursion stack depth

=============================================================================
*/

function insertAtBottom(ele, stack) {
    // Base case: stack is empty → element goes to bottom
    if (stack.length === 0) {
        stack.push(ele);
        return;
    }

    // Hold the top element on recursion stack
    let temp = stack.pop();
    // Recurse to reach the bottom
    insertAtBottom(ele, stack);
    // Put the held element back on top
    stack.push(temp);
}

function reverseStack(stack) {
    // Base case: empty stack is already reversed
    if (stack.length === 0) return;

    // Step 1: Remove top element
    let first = stack.pop();
    // Step 2: Reverse the remaining stack
    reverseStack(stack);
    // Step 3: Insert removed element at the bottom
    insertAtBottom(first, stack);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let stack = [1, 2, 3, 4, 5];
console.log("Before:", [...stack]);   // [1, 2, 3, 4, 5]
reverseStack(stack);
console.log("After:", [...stack]);    // [5, 4, 3, 2, 1]
