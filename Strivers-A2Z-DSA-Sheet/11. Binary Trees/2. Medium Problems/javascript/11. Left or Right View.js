/*
Question: Given the root of a binary tree, imagine yourself standing on the right side of it,
return the values of the nodes you can see ordered from top to bottom.
*/

/*
Approach:
- Perform a level order traversal of the binary tree.
- For each level, keep track of the last node encountered (the rightmost node from the viewer's perspective).
- Add the value of the last node at each level to the result.

Complexity Analysis:
- Time complexity: O(N), where N is the number of nodes in the binary tree.
- Space complexity: O(M), where M is the maximum number of nodes at any level in the tree.

CODE:-
*/
function rightSideView(root) {
    if (!root) return [];

    const ans = [];
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            const curr = queue.shift();
            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
            // Add only the last node of the level to the answer for right view
            // in case of left view push only the first element
            if (i === n - 1) {
                ans.push(curr.val);
            }
        }
    }

    return ans;
}
