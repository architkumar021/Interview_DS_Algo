/*
Question:
Given the root of a binary tree, return the preorder traversal of its nodes' values.

Approach:
- We can perform a preorder traversal iteratively using a stack.
- We start by pushing the root node into the stack.
- Then, while the stack is not empty, we pop a node from the stack, add its value to the result array,
    and push its right child (if it exists) followed by its left child (if it exists) into the stack.
- By pushing the right child before the left child, we ensure that the left child is processed first
    during the traversal.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node,
  the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we store the node values in the result array.
- The auxiliary space complexity is O(logN) when the tree is balanced
  i.e. height of the tree O(H) + O(N) for the result array.

Code:
*/

function preorderTraversal(root) {
    if (!root) {
        return [];
    }
    const stack = [];
    stack.push(root);
    const ans = [];
    while (stack.length > 0) {
        const curr = stack.pop();
        ans.push(curr.val);
        if (curr.right) {
            stack.push(curr.right);
        }
        if (curr.left) {
            stack.push(curr.left);
        }
    }
    return ans;
}
