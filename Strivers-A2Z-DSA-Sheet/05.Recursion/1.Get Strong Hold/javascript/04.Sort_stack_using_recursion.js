/*
=============================================================================
  QUESTION: Sort a Stack using Recursion (GFG)
=============================================================================

  Given a stack, sort it in descending order (top = greatest element).
  No extra data structures allowed — only recursion.

  Example: [11, 2, 32, 3, 41] → [41, 32, 11, 3, 2] (top → bottom)

=============================================================================
  APPROACH: Two Recursive Functions (Similar to Reverse Stack)
=============================================================================

  Very similar pattern to "Reverse Stack using Recursion":

  1. placeAtCorrectPos(ele, stack):
     - Goal: Insert 'ele' at the CORRECT sorted position
     - If stack is empty OR top < ele → push ele (correct spot!)
     - Else → pop top, place ele at correct position, push top back

  2. sortStack(stack):
     - Pop the top element
     - Recursively sort the remaining stack
     - Place the popped element at its correct position

  Think of it like Insertion Sort but using recursion stack as temp storage.

  DRY RUN with stack = [3, 1, 2] (3=bottom, 2=top):
  ──────────────────────────────────────────────────
  sortStack([3, 1, 2])
    pop 2, stack = [3, 1]
    sortStack([3, 1])
      pop 1, stack = [3]
      sortStack([3])
        pop 3, stack = []
        sortStack([]) → base case, return
        placeAtCorrectPos(3, [])
          empty → push 3 → stack = [3]
      placeAtCorrectPos(1, [3])
        top=3 > 1 → pop 3, stack = []
        placeAtCorrectPos(1, [])
          empty → push 1 → stack = [1]
        push 3 → stack = [1, 3]
    placeAtCorrectPos(2, [1, 3])
      top=3 > 2 → pop 3, stack = [1]
      placeAtCorrectPos(2, [1])
        top=1 < 2 → push 2 → stack = [1, 2]
      push 3 → stack = [1, 2, 3]

  Final: [1, 2, 3] → sorted (1=bottom, 3=top) ✓

  DRY RUN with stack = [11, 2, 32, 3, 41]:
  ──────────────────────────────────────────
  After all recursive calls:
  [2, 3, 11, 32, 41] → (2=bottom, 41=top)
  Descending from top: 41, 32, 11, 3, 2 ✓

  Time Complexity:  O(N²) — for each element, placeAtCorrectPos is O(N)
  Space Complexity: O(N) — recursion stack depth

=============================================================================
*/

function placeAtCorrectPos(ele, stack) {
    // Base: empty stack or top is smaller → this is the correct spot
    if (stack.length === 0 || stack[stack.length - 1] < ele) {
        stack.push(ele);
        return;
    }

    // Top is larger → hold it, find correct spot deeper
    let first = stack.pop();
    placeAtCorrectPos(ele, stack);
    // Put the held element back
    stack.push(first);
}

function sortStack(stack) {
    // Base case: empty stack is already sorted
    if (stack.length === 0) return;

    // Step 1: Remove top element
    let first = stack.pop();
    // Step 2: Sort remaining stack
    sortStack(stack);
    // Step 3: Place removed element at correct sorted position
    placeAtCorrectPos(first, stack);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let stack1 = [11, 2, 32, 3, 41];
console.log("Before:", [...stack1]);  // [11, 2, 32, 3, 41]
sortStack(stack1);
console.log("After:", [...stack1]);   // [2, 3, 11, 32, 41]

let stack2 = [3, 1, 2];
console.log("Before:", [...stack2]);  // [3, 1, 2]
sortStack(stack2);
console.log("After:", [...stack2]);   // [1, 2, 3]
