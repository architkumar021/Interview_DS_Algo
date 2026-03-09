/**
 QUESTION:
 Given the root of a binary tree, check whether it is a mirror of itself
 (i.e., symmetric around its center).
 
 Example:
 Input: root = [1,2,2,3,4,4,3]
 Output: true
 */

/**
 APPROACH:
 We can solve this problem using a recursive approach.
 1. Define a helper function "isMirror" that takes two tree nodes as input.
 2. Base case:
    - If both nodes are NULL, return true.
    - If either node is NULL, return false.
 3. Check if the values of the two nodes are equal.
 4. Recursively call "isMirror" on the left and right children of the two nodes:
    - isMirror(node1.left, node2.right)
    - isMirror(node1.right, node2.left)
 5. Return the logical AND of the above two recursive calls.
 6. In the main "isSymmetric" function, return the result of calling "isMirror" on the root's left and right children.
 
 COMPLEXITY ANALYSIS:
 - The time complexity is O(N), where N is the number of nodes in the binary tree, as we need to visit all the nodes once.
 - The space complexity is O(H), where H is the height of the tree, due to the recursive function calls on the stack.
   In the worst case, the height of the tree can be equal to the number of nodes, resulting in O(N) space complexity.

CODE:-
*/

function isMirror(node1, node2) {
    if (!node1 && !node2)
        return true;
    if (!node1 || !node2)
        return false;
    return (node1.val === node2.val) &&
           isMirror(node1.left, node2.right) &&
           isMirror(node1.right, node2.left);
}

function isSymmetric(root) {
    return isMirror(root.left, root.right);
}

// ─────────────────────────────────────────────────────────────
// ITERATIVE SOLUTION — Using a Stack
// ─────────────────────────────────────────────────────────────
/*
Approach:
- Instead of recursion, use a stack to simulate the mirror checks.
- Push the pair (root.left, root.right) onto the stack to start.
- Each iteration: pop a pair (left, right) and check:
    1. Both null          → symmetric so far, continue.
    2. One null, one not  → asymmetric, return false.
    3. Values differ      → asymmetric, return false.
    4. Otherwise          → push the next two mirror pairs:
         (left.left,  right.right)   ← outer pair
         (left.right, right.left)    ← inner pair
- If the stack empties without returning false → tree is symmetric.

Stack vs Queue:
- Both work correctly here since we just need to check ALL pairs —
  the order (LIFO vs FIFO) does not matter for correctness.
- Stack uses array.pop() (O(1)) vs queue's array.shift() (O(N)),
  making the stack version slightly more efficient in practice.

Time:  O(N) — every node visited once.
Space: O(H) — stack holds at most H pairs (H = height of tree).
              O(log N) balanced, O(N) skewed.

Dry Run:
  Tree: [1, 2, 2, 3, 4, 4, 3]
            1
           / \
          2   2
         / \ / \
        3  4 4  3

  Initial stack: [(2, 2)]

  Step 1: Pop (2, 2)
    Both non-null, values equal (2 === 2) ✓
    Push outer: (3, 3)  ← left.left  vs right.right
    Push inner: (4, 4)  ← left.right vs right.left
    stack = [(3,3), (4,4)]

  Step 2: Pop (4, 4)   ← LIFO: last pushed is first popped
    Both non-null, values equal (4 === 4) ✓
    4 has no children → push (null, null), (null, null)
    stack = [(3,3), (null,null), (null,null)]

  Step 3: Pop (null, null)
    Both null → continue.
    stack = [(3,3), (null,null)]

  Step 4: Pop (null, null)
    Both null → continue.
    stack = [(3,3)]

  Step 5: Pop (3, 3)
    Both non-null, values equal (3 === 3) ✓
    3 has no children → push (null, null), (null, null)
    stack = [(null,null), (null,null)]

  Step 6-7: Pop (null, null) × 2
    Both null → continue each time.
    stack = []  → done.

  Return true ✅
*/

function isSymmetricIterative(root) {
    if (!root) return true;

    const stack = [[root.left, root.right]];

    while (stack.length > 0) {
        const [left, right] = stack.pop();      // LIFO — pop from end

        if (!left && !right) continue;           // Both null → ok, skip
        if (!left || !right) return false;       // One null  → not symmetric
        if (left.val !== right.val) return false;// Values differ → not symmetric

        // Push mirror pairs onto stack
        stack.push(
            [left.left,  right.right],  // Outer pair
            [left.right, right.left]    // Inner pair
        );
    }

    return true;
}

