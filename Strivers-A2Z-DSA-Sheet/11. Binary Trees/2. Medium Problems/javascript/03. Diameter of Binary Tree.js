/*
Question:
Given the root of a binary tree, return the length of the diameter of the tree.
The diameter is the length of the longest path between any two nodes (counted in edges).
This path may or may not pass through the root.
*/

// ─────────────────────────────────────────────────────────────
// BRUTE FORCE — O(N²)
// ─────────────────────────────────────────────────────────────
/*
Approach:
- For every node, the diameter THROUGH it = height(left) + height(right).
- Compute this at every node and track the global maximum.
- height() is called separately for each node from scratch.

Why O(N²)?
- height() visits all nodes in a subtree → O(N) per node.
- Called once for every node → O(N) × O(N) = O(N²) total.

Time:  O(N²) — height recomputed from scratch at every node.
Space: O(H)  — recursion stack.
*/

function height(node) {
    if (!node) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}

function diameterOfBinaryTreeBrute(root) {
    if (!root) return 0;

    // Diameter passing through current root
    const throughRoot = height(root.left) + height(root.right);

    // Diameter may lie entirely in left or right subtree
    const leftDiameter  = diameterOfBinaryTreeBrute(root.left);
    const rightDiameter = diameterOfBinaryTreeBrute(root.right);

    return Math.max(throughRoot, leftDiameter, rightDiameter);
}

// ─────────────────────────────────────────────────────────────
// OPTIMAL — O(N)
// ─────────────────────────────────────────────────────────────
/*
Approach:
- Compute height and diameter in the SAME single DFS pass.
- For every node, the diameter through it = leftHeight + rightHeight.
- Use a closure variable `maxDiameter` to track the global max.
- Return the height upward so the parent can use it directly —
  no need to recompute height separately.

Why O(N)?
- Each node is visited exactly once.
- Height and diameter check happen together at each node.

Time:  O(N) — single DFS pass.
Space: O(H) — recursion stack.
*/

function diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function dfs(node) {
        if (!node) return 0;
        const left  = dfs(node.left);
        const right = dfs(node.right);
        maxDiameter = Math.max(maxDiameter, left + right); // Diameter through this node
        return 1 + Math.max(left, right);                  // Return height to parent
    }

    dfs(root);
    return maxDiameter;
}
