/*
Question:
Given the root of a binary tree, return the level order traversal of its nodes' values.
(i.e., from left to right, level by level).

Approach:
- We can perform a level order traversal using a queue.
- We start by pushing the root node into the queue.
- Then, while the queue is not empty, we process each level by taking the size of the queue
    and iterating over the nodes at that level.
- For each node, we add its value to the current level's array and push its left
    and right child nodes into the queue if they exist.
- After processing each level, we add the level's array to the result array.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node,
  the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we store the node values in the result array.

Code:
*/

function levelOrder(root) {
    const ans = [];
    if (!root) {
        return ans;
    }
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const level = [];
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            const curr = queue.shift();
            level.push(curr.val);
            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
        }
        ans.push(level);
    }

    return ans;
}
