/*
QUESTION:
Given an array A of size N, the task is to check if the given array represents a Binary Max Heap.

APPROACH:
1. Start from the root node and recursively check if the current node satisfies the max-heap property.
2. The max-heap property states that every node should be greater than all of its descendants.
3. Check if the current node is greater than its left and right children.
4. Recursively check the max-heap property for the left and right subtrees.
5. If the current node is greater and the left and right subtrees also satisfy the max-heap property,
   then the array represents a binary max heap.

The solve function is implemented to recursively check the max-heap property for each node.
It checks if the current node is greater than its left and right children. If the current node
is greater and the left and right subtrees also satisfy the max-heap property, then the array
represents a binary max heap.

The isMaxHeap function is the main function that calls the solve function with the root node
(index 0) and the size of the array. It returns true if the array represents a binary max heap,
and false otherwise.

TIME COMPLEXITY:
The time complexity of the isMaxHeap function is O(N), where N is the size of the array.
This is because we need to check the max-heap property for each node in the array.

SPACE COMPLEXITY:
The space complexity is O(N) due to the recursive calls in the solve function.

CODE:-
*/

/**
 * Helper function to recursively check max-heap property
 * @param {number[]} arr - The input array
 * @param {number} node - Current node index
 * @param {number} n - Size of the array
 * @return {boolean} - True if subtree rooted at node satisfies max-heap property
 */
function solve(arr, node, n) {
    // Base case: if node is out of bounds, return true
    if (node >= n) {
        return true;
    }

    const left = (2 * node) + 1;
    const right = (2 * node) + 2;

    // Check if left child exists and violates max-heap property
    if (left < n && arr[node] < arr[left]) {
        return false;
    }

    // Check if right child exists and violates max-heap property
    if (right < n && arr[node] < arr[right]) {
        return false;
    }

    // Recursively check left and right subtrees
    return solve(arr, left, n) && solve(arr, right, n);
}

/**
 * Function to check if array represents a max heap
 * @param {number[]} arr - The input array
 * @param {number} n - Size of the array
 * @return {boolean} - True if array represents a max heap
 */
function isMaxHeap(arr, n) {
    return solve(arr, 0, n);
}

/**
 * Iterative approach to check if array is max heap
 * @param {number[]} arr - The input array
 * @param {number} n - Size of the array
 * @return {boolean} - True if array represents a max heap
 */
function isMaxHeapIterative(arr, n) {
    // Check all internal nodes (nodes with at least one child)
    for (let i = 0; i <= Math.floor(n / 2) - 1; i++) {
        const left = (2 * i) + 1;
        const right = (2 * i) + 2;

        // Check if left child is greater than parent
        if (left < n && arr[i] < arr[left]) {
            return false;
        }

        // Check if right child is greater than parent
        if (right < n && arr[i] < arr[right]) {
            return false;
        }
    }
    return true;
}

// Example usage:
// console.log(isMaxHeap([90, 15, 10, 7, 12, 2], 6)); // Output: true
// console.log(isMaxHeap([9, 15, 10, 7, 12, 11], 6)); // Output: false

// Time Complexity: O(N)
// Space Complexity: O(1)