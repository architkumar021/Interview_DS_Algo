/*
Question:
Given a binary tree, determine if it is height-balanced.
*/

// ─────────────────────────────────────────────────────────────
// BRUTE FORCE — O(N²)
// ─────────────────────────────────────────────────────────────
/*
Approach:
- For every node, separately compute the height of its left and
  right subtrees and check if the difference is > 1.
- If any node is unbalanced, return false immediately.
- Recurse the same check on left and right subtrees.

Why O(N²)?
- height() is called once per node, and each height() call itself
  visits all nodes in that subtree → O(N) work per node → O(N²) total.

Time:  O(N²) — height recomputed from scratch at every node.
Space: O(H)  — recursion stack.
*/

function height(node) {
    if (!node) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}

function isBalancedBrute(root) {
    if (!root) return true;

    const leftHeight  = height(root.left);
    const rightHeight = height(root.right);

    // Check current node and recursively check both subtrees
    return Math.abs(leftHeight - rightHeight) <= 1
        && isBalancedBrute(root.left)
        && isBalancedBrute(root.right);
}

// ─────────────────────────────────────────────────────────────
// OPTIMAL — O(N)
// ─────────────────────────────────────────────────────────────
/*
Approach:
- Use a single DFS that returns the height of a subtree, or -1 if it is unbalanced.
- For each node:
    - Recurse on left and right subtrees.
    - If either returns -1, propagate -1 upward immediately (short-circuit).
    - If the height difference at this node is > 1, return -1.
    - Otherwise return the actual height: 1 + max(leftHeight, rightHeight).
- The tree is balanced if the final result is not -1.

Why O(N)?
- Height and balance check happen in the SAME DFS pass.
- The -1 sentinel short-circuits further recursion as soon as
  an imbalance is found — no redundant recomputation.

Time:  O(N) — each node visited once.
Space: O(H) — recursion stack. O(log N) balanced, O(N) skewed.
*/

function getHeight(node) {
    if (!node) return 0;

    const left  = getHeight(node.left);
    if (left === -1) return -1;         // Left subtree already unbalanced

    const right = getHeight(node.right);
    if (right === -1) return -1;        // Right subtree already unbalanced

    if (Math.abs(left - right) > 1) return -1;  // Unbalanced at this node

    return 1 + Math.max(left, right);   // Balanced — return actual height
}

function isBalanced(root) {
    return getHeight(root) !== -1;
}
