// Question:
// Given a BST and a number X, find the Ceil of X.
// Ceil(X) = smallest value in BST that is >= X. Return -1 if not found.

// Approach:
// Traverse the BST. If current node >= X, it's a possible ceil — go left to find smaller.
// If current node < X, go right. Stop when null.
// - Time: O(H), Space: O(1)

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Iterative (Optimal)
function findCeil(root, x) {
    let ceil = -1;
    while (root) {
        if (root.data === x) return x;
        if (root.data > x) {
            ceil = root.data;
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return ceil;
}

// Recursive Alternative
function findCeilRecursive(root, x) {
    if (!root) return -1;
    if (root.data === x) return x;
    if (root.data < x) return findCeilRecursive(root.right, x);
    const leftCeil = findCeilRecursive(root.left, x);
    return leftCeil >= x ? leftCeil : root.data;
}
