/*
Question:
Given the root of a binary tree, return the postorder traversal of its nodes' values.

Approach:
- Use two stacks.
- Push root onto stack1. While stack1 is not empty:
    - Pop a node from stack1, push it onto stack2.
    - Push its left child then right child onto stack1.
- Drain stack2 into the result — the reverse order gives Left → Right → Root (postorder).

Complexity Analysis:
- Time:  O(N) — every node visited once.
- Space: O(N) — two stacks hold at most N nodes total.

Code:
*/

function postorderTraversal(root) {
    const ans = [];
    if (!root) return ans;

    const stack1 = [root];
    const stack2 = [];

    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);
        if (node.left)  stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }

    while (stack2.length > 0) {
        ans.push(stack2.pop().val);
    }

    return ans;
}


// ─────────────────────────────────────────────────────────────
// ONE STACK SOLUTION
// ─────────────────────────────────────────────────────────────
/*
Approach:
- We simulate postorder (Left → Right → Root) using one stack
  and a `prev` pointer that tracks the last visited node.
- At each step we peek at the top of the stack (do NOT pop yet):

  1. If the top node has a LEFT child we haven't gone into yet
     → push left child and keep going left.

  2. Else if the top node has a RIGHT child AND we didn't just
     come back FROM that right child (prev !== top.right)
     → push right child and explore right.

  3. Otherwise both subtrees are done (or don't exist)
     → pop and record the node, update prev to this node.

Why track `prev`?
- After we finish the right subtree and come back up, the top
  of the stack is the parent. Without `prev` we'd push the
  right child again. Checking `prev === top.right` tells us
  "we already processed the right subtree — time to visit root".

Time  Complexity: O(N) — each node pushed and popped once.
Space Complexity: O(H) — stack holds at most H nodes (H = height).
                  O(log N) balanced, O(N) skewed.
*/

function postorderTraversalOneStack(root) {
    const ans = [];
    if (!root) return ans;

    const stack = [];
    let curr = root;
    let prev = null;    // Tracks the last visited node

    while (curr || stack.length > 0) {

        // Phase 1: Go all the way left
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }

        // Peek at top — don't pop yet
        const top = stack[stack.length - 1];

        // Phase 2: If right subtree exists and not yet visited → go right
        if (top.right && top.right !== prev) {
            curr = top.right;
        } else {
            // Phase 3: Both subtrees done → visit node
            ans.push(top.val);
            prev = stack.pop();  // Mark this node as last visited
        }
    }

    return ans;
}

