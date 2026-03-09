/*
Question:
Given a Binary Tree, find its Boundary Traversal. The traversal should be in the following order:

Left boundary nodes: defined as the path from the root to the left-most node, i.e., the leaf node you could reach when you always travel preferring the left subtree over the right subtree.
Leaf nodes: All the leaf nodes except for the ones that are part of the left or right boundary.
Reverse right boundary nodes: defined as the path from the right-most node to the root. The right-most node is the leaf node you could reach when you always travel preferring the right subtree over the left subtree. Exclude the root from this as it was already included in the traversal of left boundary nodes.
Note: If the root doesn't have a left subtree or right subtree, then the root itself is the left or right boundary.

Approach:
- We can divide the boundary traversal into three parts: left boundary nodes, leaf nodes, and reverse right boundary nodes.
- To find the left boundary nodes, we can traverse the left subtree from the root to the leftmost leaf node. We add the values of the nodes to the answer array during this traversal.
- To find the leaf nodes, we can perform a separate recursive traversal of the binary tree and add the values of the leaf nodes (excluding the ones already included in the left boundary or right boundary) to the answer array.
- To find the reverse right boundary nodes, we can traverse the right subtree from the root to the rightmost leaf node (excluding the root). We add the values of the nodes to the answer array during this traversal.
- Finally, we return the answer array containing the boundary traversal.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(H), where H is the height of the binary tree. In the worst case, the height of the binary tree can be N, resulting in O(N) space complexity.

Code:
*/

function leftTraversal(root, ans) {
    if (!root) return;
    if (!root.left && !root.right) return;

    ans.push(root.val);

    if (root.left)
        leftTraversal(root.left, ans);
    else
        leftTraversal(root.right, ans);
}

function leafTraversal(root, ans) {
    if (!root) return;
    if (!root.left && !root.right) {
        ans.push(root.val);
    }
    leafTraversal(root.left, ans);
    leafTraversal(root.right, ans);
}

function rightTraversal(root, ans) {
    if (!root) return;
    if (!root.left && !root.right) return;

    const temp = root.val;

    if (root.right)
        rightTraversal(root.right, ans);
    else
        rightTraversal(root.left, ans);

    ans.push(temp);
}

function boundaryTraversal(root) {
    if (!root) return [];
    const ans = [];

    ans.push(root.val);
    leftTraversal(root.left, ans);
    leafTraversal(root.left, ans);
    leafTraversal(root.right, ans);
    rightTraversal(root.right, ans);

    return ans;
}

// Solution 2

// Node structure for the binary tree
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    // Function to check if a node is a leaf
    isLeaf(root) {
        return !root.left && !root.right;
    }

    // Function to add the left boundary of the tree
    addLeftBoundary(root, res) {
        let curr = root.left;
        while (curr) {
            // If the current node is not a leaf, add its value to the result
            if (!this.isLeaf(curr)) {
                res.push(curr.data);
            }
            // Move to the left child if it exists, otherwise move to the right child
            if (curr.left) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
    }

    // Function to add the right boundary of the tree
    addRightBoundary(root, res) {
        let curr = root.right;
        let temp = [];
        while (curr) {
            // If the current node is not a leaf, add its value to a temporary vector
            if (!this.isLeaf(curr)) {
                temp.push(curr.data);
            }
            // Move to the right child if it exists, otherwise move to the left child
            if (curr.right) {
                curr = curr.right;
            } else {
                curr = curr.left;
            }
        }
        // Reverse and add the values from the temporary vector to the result
        for (let i = temp.length - 1; i >= 0; --i) {
            res.push(temp[i]);
        }
    }

    // Function to add the leaves of the tree
    addLeaves(root, res) {
        // If the current node is a leaf, add its value to the result
        if (this.isLeaf(root)) {
            res.push(root.data);
            return;
        }
        // Recursively add leaves of the left and right subtrees
        if (root.left) {
            this.addLeaves(root.left, res);
        }
        if (root.right) {
            this.addLeaves(root.right, res);
        }
    }

    // Main function to perform the boundary traversal of the binary tree
    printBoundary(root) {
        let res = [];
        if (!root) {
            return res;
        }
        // If the root is not a leaf, add its value to the result
        if (!this.isLeaf(root)) {
            res.push(root.data);
        }

        // Add the left boundary, leaves, and right boundary in order
        this.addLeftBoundary(root, res);
        this.addLeaves(root, res);
        this.addRightBoundary(root, res);

        return res;
    }
}

// Helper function to print the result
function printResult(result) {
    for (let val of result) {
        console.log(val + " ");
    }
    console.log();
}

// Creating a sample binary tree
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

let solution = new Solution();

// Get the boundary traversal
let result = solution.printBoundary(root);

// Print the result
console.log("Boundary Traversal: ");
printResult(result);