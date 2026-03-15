// Question:
// Given the root of a BST and integer k, return the kth smallest value (1-indexed).

// Approach:
// In-order traversal of a BST gives nodes in ascending sorted order.
// Count nodes as we visit — when count hits k, that's our answer.
// - Time:  O(H + k) — H to reach leftmost, then k steps
// - Space: O(H) — recursion stack

// Dry Run:
//       3
//      / \
//     1   4
//      \
//       2
//
// In-order: 1 → 2 → 3 → 4
// k = 2 → answer = 2
//
// inorder(3) → inorder(1) → inorder(null) return
//   visit 1 → cnt=1, k=2, not yet
//   inorder(2) → inorder(null) return
//     visit 2 → cnt=2 === k → ans = 2, return ✅

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function kthSmallest(root, k) {
    let cnt = 0, ans = -1;

    function inorder(node) {
        if (!node || ans !== -1) return;  // early exit once found
        inorder(node.left);
        if (++cnt === k) { ans = node.val; return; }
        inorder(node.right);
    }

    inorder(root);
    return ans;
}

// ─────────────────────────────────────────
// Kth LARGEST Element in BST
// ─────────────────────────────────────────
// Approach:
// Reverse in-order traversal (Right → Node → Left) gives nodes in DESCENDING order.
// Count nodes as we visit — when count hits k, that's our answer.
// - Time:  O(H + k)
// - Space: O(H)

// Dry Run:
//       3
//      / \
//     1   4
//      \
//       2
//
// Reverse in-order: 4 → 3 → 2 → 1
// k = 2 → answer = 3
//
// reverseInorder(3) → reverseInorder(4) → reverseInorder(null) return
//   visit 4 → cnt=1, k=2, not yet
//   reverseInorder(null) return
// visit 3 → cnt=2 === k → ans = 3 ✅

function kthLargest(root, k) {
    let cnt = 0, ans = -1;

    function reverseInorder(node) {
        if (!node || ans !== -1) return;  // early exit once found
        reverseInorder(node.right);       // go right first (larger values)
        if (++cnt === k) { ans = node.val; return; }
        reverseInorder(node.left);
    }

    reverseInorder(root);
    return ans;
}

