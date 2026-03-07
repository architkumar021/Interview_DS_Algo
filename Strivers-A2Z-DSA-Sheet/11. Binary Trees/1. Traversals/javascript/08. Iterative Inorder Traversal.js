/*
Question:
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Approach:
- We can perform an inorder traversal iteratively using a stack.
- The idea is to push all the left children of a node into the stack until we reach a node with no left
    child.
- Then, we pop a node from the stack, add its value to the result array,
    and move to its right child (if it exists).
- We repeat this process until the stack is empty and all nodes are traversed.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node,
    the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we store the node values in the result array
    and use a stack to keep track of the nodes.

Code:
*/

function inorderTraversal(root) {
    const ans = [];
    const stack = [];
    let curr = root;

    while (curr || stack.length > 0) {
        while (curr) {          // Go all the way left
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();     // Visit node
        ans.push(curr.val);
        curr = curr.right;      // Move to right subtree
    }

    return ans;
}
