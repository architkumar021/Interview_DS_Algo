// Question:
// Given the root of a BST and a value `val`, find the node with that value.
// Return the subtree rooted at that node, or null if not found.

// Approach:
// Use BST property: go left if val < root, go right if val > root.
// - Time: O(log N) avg, O(N) worst (skewed tree)
// - Space: O(H) recursion stack

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function searchBST(root, val) {
    if (!root || root.val === val) return root;
    return val < root.val
        ? searchBST(root.left, val)
        : searchBST(root.right, val);
}
