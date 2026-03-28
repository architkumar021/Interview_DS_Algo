/*
=============================================================================
  QUESTION: Sort a Stack using Recursion (GFG)
=============================================================================

  Sort a stack in ascending order (top = largest) using only recursion.
  No extra data structures allowed.

  Example: [11, 2, 32, 3, 41] → [2, 3, 11, 32, 41]  (bottom → top)

=============================================================================
  APPROACH: Recursive Insertion Sort — O(N²) Time, O(N) Space
=============================================================================

  Same pattern as "Reverse Stack" but with sorted insertion:

  1. insertSorted(ele, stack) — insert ele at correct sorted position
  2. sortStack(stack) — pop top, sort rest, insert top at correct position

  Think: Like Insertion Sort, but recursion stack acts as temp storage.

  Dry Run [3, 1, 2] (3=bottom, 2=top):
  ─────────────────────────────────────
  sortStack([3,1,2])
    pop 2 → sortStack([3,1])
      pop 1 → sortStack([3])
        pop 3 → sortStack([]) → base case
        insertSorted(3, []) → [3]
      insertSorted(1, [3])
        top=3 > 1 → pop 3 → insertSorted(1, []) → [1] → push 3 → [1, 3]
    insertSorted(2, [1, 3])
      top=3 > 2 → pop 3 → insertSorted(2, [1])
        top=1 < 2 → push 2 → [1, 2]
      push 3 → [1, 2, 3]

  Result: [1, 2, 3] ✓

=============================================================================
*/

// Insert element at its correct sorted position in stack
function insertSorted(ele, stack) {
    // Base: empty stack or top is smaller → this is the correct spot
    if (stack.length === 0 || stack[stack.length - 1] < ele) {
        stack.push(ele);
        return;
    }

    // Top is larger → hold it, find correct spot deeper
    let top = stack.pop();
    insertSorted(ele, stack);
    // Put the held element back
    stack.push(top);
}

// Sort stack: pop top, sort rest, insert top at correct position
function sortStack(stack) {
    // Base case: empty stack is already sorted
    if (stack.length === 0) return;

    // Step 1: Remove top element
    let top = stack.pop();
    // Step 2: Sort remaining stack
    sortStack(stack);
    // Step 3: Place removed element at correct sorted position
    insertSorted(top, stack);
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
