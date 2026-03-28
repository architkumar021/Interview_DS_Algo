/*
=============================================================================
  QUESTION: Reverse a Stack using Recursion (GFG)
=============================================================================

  Reverse a stack of N integers using only recursion (no extra data structure).

  Example: [1, 2, 3, 4, 5] → [5, 4, 3, 2, 1]  (bottom → top)

=============================================================================
  APPROACH: Two Recursive Functions — O(N²) Time, O(N) Space
=============================================================================

  Two helpers:
  1. insertAtBottom(ele, stack) — inserts ele at the bottom of stack
  2. reverseStack(stack) — pops top, reverses rest, inserts top at bottom

  Think: Take cards from top one by one, reverse the rest,
         then put each card at the bottom.

  Dry Run [1, 2, 3] (1=bottom, 3=top):
  ─────────────────────────────────────
  reverseStack([1,2,3])
    pop 3 → reverseStack([1,2])
      pop 2 → reverseStack([1])
        pop 1 → reverseStack([]) → base case
        insertAtBottom(1, []) → [1]
      insertAtBottom(2, [1])
        pop 1 → insertAtBottom(2, []) → [2] → push 1 → [2, 1]
    insertAtBottom(3, [2, 1])
      pop 1 → pop 2 → insertAtBottom(3, []) → [3] → push 2 → [3, 2] → push 1 → [3, 2, 1]

  Result: [3, 2, 1] ✓

=============================================================================
*/

// Insert element at the bottom of stack
function insertAtBottom(ele, stack) {
    if (stack.length === 0) {
        stack.push(ele);
        return;
    }
    let top = stack.pop();
    insertAtBottom(ele, stack);
    stack.push(top);
}

// Reverse stack: pop top, reverse rest, insert top at bottom
function reverseStack(stack) {
    if (stack.length === 0) return;

    let top = stack.pop();
    reverseStack(stack);
    insertAtBottom(top, stack);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let stack = [1, 2, 3, 4, 5];
console.log("Before:", [...stack]);   // [1, 2, 3, 4, 5]
reverseStack(stack);
console.log("After:", [...stack]);    // [5, 4, 3, 2, 1]
