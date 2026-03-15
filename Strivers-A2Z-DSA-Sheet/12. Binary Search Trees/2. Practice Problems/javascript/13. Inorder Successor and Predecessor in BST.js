// Question:
// Given the root of a BST and a node `p`, find:
//   - Inorder Predecessor: the largest node smaller than p.val
//   - Inorder Successor:   the smallest node greater than p.val
// Return null if predecessor/successor doesn't exist.

// ─────────────────────────────────────────
// APPROACH
// ─────────────────────────────────────────
// Use BST property to traverse without visiting every node:
//
// Predecessor (largest value < p.val):
//   - If current.val < p.val  → it's a candidate, go RIGHT to find a larger one closer to p
//   - If current.val >= p.val → go LEFT (current is too large or equal)
//
// Successor (smallest value > p.val):
//   - If current.val > p.val  → it's a candidate, go LEFT to find a smaller one closer to p
//   - If current.val <= p.val → go RIGHT (current is too small or equal)
//
// Time:  O(H) — H is height of BST (log N avg, N worst for skewed)
// Space: O(1) — iterative, no extra space

// ─────────────────────────────────────────
// DRY RUN
// ─────────────────────────────────────────
//
//         20
//        /  \
//       8    22
//      / \
//     4   12
//        /  \
//       10  14
//
// Find Predecessor and Successor of p = 12
//
// ── Predecessor (largest < 12) ──
// curr=20, 20 >= 12 → go left
// curr=8,  8  <  12 → candidate! predecessor=8, go right
// curr=12, 12 >= 12 → go left
// curr=10, 10 <  12 → candidate! predecessor=10, go right
// curr=null → stop
// predecessor = 10 ✅
//
// ── Successor (smallest > 12) ──
// curr=20, 20 > 12 → candidate! successor=20, go left
// curr=8,  8  <= 12 → go right
// curr=12, 12 <= 12 → go right
// curr=14, 14 > 12 → candidate! successor=14, go left
// curr=null → stop
// successor = 14 ✅

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Returns the inorder predecessor (largest node with val < p.val)
function inorderPredecessor(root, p) {
    let predecessor = null;
    let curr = root;

    while (curr) {
        if (curr.val < p.val) {
            predecessor = curr;   // candidate — try to find something larger but still < p
            curr = curr.right;
        } else {
            curr = curr.left;     // curr is >= p, go left to find smaller values
        }
    }

    return predecessor;
}

// Returns the inorder successor (smallest node with val > p.val)
function inorderSuccessor(root, p) {
    let successor = null;
    let curr = root;

    while (curr) {
        if (curr.val > p.val) {
            successor = curr;     // candidate — try to find something smaller but still > p
            curr = curr.left;
        } else {
            curr = curr.right;    // curr is <= p, go right to find larger values
        }
    }

    return successor;
}

// Combined: returns both predecessor and successor
function findPredecessorSuccessor(root, p) {
    return {
        predecessor: inorderPredecessor(root, p),
        successor:   inorderSuccessor(root, p)
    };
}

