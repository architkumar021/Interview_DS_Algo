/*
Question:
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes
has an edge connecting them. A node can only appear once. The path does not need
to pass through the root.
Given the root of a binary tree, return the maximum path sum of any non-empty path.

Approach:
- For each node, the best path THROUGH it = node.val + leftGain + rightGain.
  where gain = max(0, dfs(child)) — negative subtrees are ignored (clamped to 0).
- Track the global max across all nodes via a closure variable.
- Return only the SINGLE best branch (left or right) to the parent —
  a path cannot split in two directions when extending upward.

Time:  O(N) — each node visited once.
Space: O(H) — recursion stack.

Code:
*/

function maxPathSum(root) {
    let maxSum = -Infinity;

    function dfs(node) {
        if (!node) return 0;
        const left  = Math.max(0, dfs(node.left));   // Ignore negative gains
        const right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, node.val + left + right); // Best path through this node
        return node.val + Math.max(left, right);            // Best single branch to parent
    }

    dfs(root);
    return maxSum;
}
