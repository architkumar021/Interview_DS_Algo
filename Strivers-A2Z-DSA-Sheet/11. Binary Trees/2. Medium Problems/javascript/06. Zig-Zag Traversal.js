/*
Question:
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
(i.e., from left to right, then right to left for the next level and alternate between).

Approach:
- Use a queue for standard BFS level-order traversal.
- Keep a `reverse` boolean flag — false means left→right, true means right→left.
- For each level, instead of reversing the array after filling it, place each value
  directly at its correct index:
    - left→right (reverse=false): index = i
    - right→left (reverse=true) : index = n - 1 - i
- Push children (left then right) into the queue as normal regardless of direction.
- Flip `reverse` after each level.

Complexity Analysis:
- Time:  O(N) — each node visited once.
- Space: O(N) — queue holds at most N/2 nodes at the widest level.

Code:
*/

function zigzagLevelOrder(root) {
    if (!root) return [];

    const ans = [];
    const queue = [];
    queue.push(root);
    let reverse = false;

    while (queue.length > 0) {
        const n = queue.length;
        const level = new Array(n);

        for (let i = 0; i < n; i++) {
            const curr = queue.shift();
            const index = reverse ? n - 1 - i : i;  // Place at correct position directly
            level[index] = curr.val;
            if (curr.left)  queue.push(curr.left);
            if (curr.right) queue.push(curr.right);
        }

        ans.push(level);
        reverse = !reverse;
    }

    return ans;
}


// Class to represent a binary tree node
class TreeNode {
    constructor(x) {
        this.val = x;        // Value of the node
        this.left = null;    // Pointer to left child
        this.right = null;   // Pointer to right child
    }
}

class Solution {
    // Function to perform zigzag (spiral) level order traversal
    zigzagLevelOrder(root) {
        // Array to store the final zigzag traversal result
        const result = [];

        // If tree is empty, return empty array
        if (!root) return result;

        // Queue for BFS traversal
        const q = [root];

        // Boolean flag to control traversal direction
        let leftToRight = true;

        // Loop until all levels are processed
        while (q.length > 0) {
            // Get the number of nodes at the current level
            const size = q.length;

            // Temporary array to store current level's values
            const level = new Array(size);

            // Process each node in the current level
            for (let i = 0; i < size; i++) {
                // Remove first node from queue
                const node = q.shift();

                // Determine index where this value should be stored
                const index = leftToRight ? i : size - 1 - i;
                level[index] = node.val;

                // Add left child to queue if it exists
                if (node.left) q.push(node.left);
                // Add right child to queue if it exists
                if (node.right) q.push(node.right);
            }

            // Flip traversal direction for next level
            leftToRight = !leftToRight;

            // Add current level to final result
            result.push(level);
        }

        // Return zigzag traversal result
        return result;
    }
}

// Driver code
function main() {
    // Create binary tree:
    //        1
    //      /   \
    //     2     3
    //    / \     \
    //   4   5     6
    let root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);

    // Create solution object
    let sol = new Solution();

    // Get zigzag traversal
    let ans = sol.zigzagLevelOrder(root);

    // Print result
    console.log(ans);
}

main();
