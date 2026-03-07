/*
Question:
Given the root of a binary tree, return the preorder traversal of its nodes' values.

Approach:
- Preorder traversal visits the root node first, followed by the left subtree, and then the right subtree.
- We can solve this problem recursively by following the preorder traversal order.
- Starting from the root node, we can add the node's value to the result array, then recursively traverse the left subtree and right subtree.

Complexity Analysis:
- Since we are visiting each node once, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we are using the call stack for recursion.
  The worst case space complexity is O(N) when the tree is skewed.
  The best case space complexity is O(logN) when the tree is balanced.
  The auxiliary space complexity is O(logN) when the tree is balanced
  i.e. height of the tree O(H) + O(N) for the result array.

Code:
*/

function preorderTraversal(root) {
    const ans = [];
    solve(root, ans);
    return ans;
}

function solve(root, ans) {
    if (!root) {
        return;
    }
    ans.push(root.val);
    solve(root.left, ans);
    solve(root.right, ans);
}

// Solution 2:
var preorderTraversal = function(root) {
    let ans = [];

    function dfs(root) {
        if(!root) return;

        ans.push(root.val);
        dfs(root.left);
        dfs(root.right);
    }

    dfs(root);

    return ans;
};