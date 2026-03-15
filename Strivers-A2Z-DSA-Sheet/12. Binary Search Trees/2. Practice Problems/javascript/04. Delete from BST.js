/*
Question:
Given a BST root and a key, delete the node with that key and return the updated root.

─────────────────────────────────────────
APPROACH
─────────────────────────────────────────
Step 1: Search for the node using BST property (go left/right).
Step 2: Once found, handle 3 cases:
  Case 1 - Leaf node (no children)     → simply remove it (return null)
  Case 2 - One child                   → replace node with its only child
  Case 3 - Two children                → find in-order predecessor (rightmost of left subtree),
                                        copy its value here, then delete it from left subtree

Why in-order predecessor?
  It's the largest value smaller than the current node,
  so replacing with it keeps the BST property intact.

Time:  O(H) — H is height of BST (log N avg, N worst for skewed)
Space: O(H) — recursion stack

─────────────────────────────────────────
DRY RUN
─────────────────────────────────────────

      5
     / \
    3   6
   / \    \
  2   4    7

Delete key = 3

deleteNode(5, 3) → 3 < 5, go left
  deleteNode(3, 3) → key found!
    Has both children → find in-order predecessor
    Go to root.left = 2, keep going right → no right child → temp = 2
    Copy temp.val (2) into node: node becomes 2
    deleteNode(left=2, 2) → leaf → return null
    Node is now: { val:2, left:null, right:4 }
  return node
root.left = { val:2, left:null, right:4 }

Final tree:
      5
     / \
    2   6
     \    \
      4    7

✅ BST property maintained

─────────────────────────────────────────
APPROACH 2 — Using In-Order SUCCESSOR (leftmost of right subtree)
─────────────────────────────────────────
Instead of going to the left subtree for the largest smaller value (predecessor),
we can go to the RIGHT subtree and find the SMALLEST value there (successor).

Why successor works?
  It's the smallest value larger than the current node,
  so replacing with it also keeps the BST property intact.

DRY RUN (same tree, delete key = 3):

      5
     / \
    3   6
   / \    \
  2   4    7

deleteNode(5, 3) → 3 < 5, go left
  deleteNode(3, 3) → key found!
    Has both children → find in-order successor
    Go to root.right = 4, keep going left → no left child → successor = 4
    Copy successor.val (4) into node: node becomes 4
    deleteNode(right=4, 4) → leaf → return null
    Node is now: { val:4, left:2, right:null }
  return node
root.left = { val:4, left:2, right:null }

Final tree:
      5
     / \
    4   6
   /      \
  2        7

✅ BST property maintained

CODE:-
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function deleteNode(root, key) {
    if (!root) return null;

    if (key < root.val) {
        // Key is smaller → go left
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        // Key is larger → go right
        root.right = deleteNode(root.right, key);
    } else {
        // Node found — handle 3 cases

        // Case 1: Leaf node — just remove it
        if (!root.left && !root.right) return null;

        // Case 2: Only one child — replace with that child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3: Two children
        // Find in-order predecessor: rightmost node in left subtree
        let predecessor = root.left;
        while (predecessor.right) predecessor = predecessor.right;

        // Copy predecessor value into current node
        root.val = predecessor.val;

        // Delete the predecessor from left subtree
        root.left = deleteNode(root.left, predecessor.val);
    }

    return root;
}

// ─────────────────────────────────────────
// SOLUTION 2: Using In-Order Successor
// ─────────────────────────────────────────
// Same logic as above but for two-children case,
// find the SMALLEST node in the RIGHT subtree (in-order successor)
// and replace the deleted node's value with it.

function deleteNodeSuccessor(root, key) {
    if (!root) return null;

    if (key < root.val) {
        root.left = deleteNodeSuccessor(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNodeSuccessor(root.right, key);
    } else {
        // Case 1: Leaf node
        if (!root.left && !root.right) return null;

        // Case 2: One child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3: Two children — find in-order successor
        // Leftmost node in right subtree = smallest value > root.val
        let successor = root.right;
        while (successor.left) successor = successor.left;

        // Copy successor value into current node
        root.val = successor.val;

        // Delete the successor from right subtree
        root.right = deleteNodeSuccessor(root.right, successor.val);
    }

    return root;
}

