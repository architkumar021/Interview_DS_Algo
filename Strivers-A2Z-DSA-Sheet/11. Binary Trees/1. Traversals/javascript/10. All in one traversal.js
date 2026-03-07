/*
Question:
You have been given a Binary Tree of 'N' nodes, where the nodes have integer values.
Your task is to find the In-Order, Pre-Order, and Post-Order traversals of the given binary tree.

Approach:
- We can perform the tree traversals recursively using three functions:
    - In-Order Traversal: Visit the left subtree, visit the current node, visit the right subtree.
    - Pre-Order Traversal: Visit the current node, visit the left subtree, visit the right subtree.
    - Post-Order Traversal: Visit the left subtree, visit the right subtree, visit the current node.
- For each traversal, we can maintain an array to store the values of the visited nodes in the respective order.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node,
    the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we store the values of the nodes in arrays for each traversal.

Code:
*/

function traversal(root, pre, ino, pos) {
    if (root === null) {
        return;
    }

    // Pre-Order Traversal
    pre.push(root.data);
    traversal(root.left, pre, ino, pos);
    // In-Order Traversal
    ino.push(root.data);
    traversal(root.right, pre, ino, pos);
    // Post-Order Traversal
    pos.push(root.data);
}

function getTreeTraversal(root) {
    const pre = [];
    const ino = [];
    const pos = [];

    traversal(root, pre, ino, pos);

    return [ino, pre, pos];
}

/*


// In-Order, Pre-Order and Post-Order Traversal of Binary Tree in One Traversal

// Approach:

Start at the root of the binary tree.Initialise a stack that holds a tree node and an integer value
representing its state corresponding to pre order, inorder and postorder. Initialise empty arrays
to store the three traversals as well.Check if the tree is empty. If so, return empty traversals.

Push the root node onto the stack along with its state ‘1’ (preorder) to start the traversal.
While the stack isn’t empty, pop the top node of the stack and for each node:

    If the state is ‘1’ ie. preorder: store the node’s data in the preorder array
    and move its state to 2 (inorder) for this node. Push this updated state back onto the stack
    and push its left child as well.

    If the state is ‘2’ ie. inorder: store the node’s data is the inorder array
    and update its state to 3 (postorder) for this node. Push the updated state back onto the stack
    and push the right child onto the stack as well.

    If the state is ‘3’ ie. postorder: store the node’s data in the postorder array and pop it.

Return the preorder, inorder and postorder array.

Complexity Analysis:
- Time Complexity: O(3*N), we process each node thrice, once for every traversal.
Space Complexity: O(4*N), extra space used for storing postorder, inorder, preorder traversal and stack.
 */

// Node structure for the binary tree
class Node {
    // Constructor to initialize the node with a value
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

// Solution class containing the traversal function
class Solution {
    // Function to get the Preorder,
    // Inorder and Postorder traversal
    // Of Binary Tree in One traversal
    preInPostTraversal(root) {
        // Arrays to store traversals
        let pre = [], ino = [], post = [];

        // If the tree is empty, return empty traversals
        if (root === null) return [];

        // Stack to maintain nodes and their traversal state
        let st = [[root, 1]];

        while (st.length > 0) {
            let [node, state] = st.pop();

            // this is part of pre
            if (state === 1) {
                // Store the node's data in the preorder traversal
                pre.push(node.data);
                // Move to state 2 (inorder) for this node
                st.push([node, 2]);

                // Push left child onto the stack for processing
                if (node.left !== null) {
                    st.push([node.left, 1]);
                }
            }

            // this is a part of in
            else if (state === 2) {
                // Store the node's data in the inorder traversal
                ino.push(node.data);
                // Move to state 3 (postorder) for this node
                st.push([node, 3]);

                // Push right child onto the stack for processing
                if (node.right !== null) {
                    st.push([node.right, 1]);
                }
            }

            // this is part of post
            else {
                // Store the node's data in the postorder traversal
                post.push(node.data);
            }
        }

        // Returning the traversals
        return [pre, ino, post];
    }
}

// Main driver code
function main() {
    // Creating a sample binary tree
    let root = new Node(1);
    root.left = new Node(2);
    root.right = new Node(3);
    root.left.left = new Node(4);
    root.left.right = new Node(5);

    // Create object of Solution class
    let sol = new Solution();

    // Getting the traversals
    let [pre, ino, post] = sol.preInPostTraversal(root);

    // Printing the traversals
    console.log("Preorder traversal:", pre.join(" "));
    console.log("Inorder traversal:", ino.join(" "));
    console.log("Postorder traversal:", post.join(" "));
}

// Call the main function
main();
