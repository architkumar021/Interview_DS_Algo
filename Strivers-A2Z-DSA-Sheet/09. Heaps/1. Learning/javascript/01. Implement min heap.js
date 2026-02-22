/*
QUESTION:
Implement a min heap with all the required methods.

APPROACH:
A min heap is a binary tree-based data structure where the value of each parent node
is less than or equal to the values of its children. The heapify operation is used to
maintain the heap property, where a node is compared with its children and swapped if necessary.

In the given code, the MinHeap class is implemented using an array to store the elements.
The heapify function is used to maintain the heap property by comparing the node with its
left and right children and swapping if necessary. The bottomUpHeapify function is used to
fix the heap property from a child node to its parent node.

The insert function adds an element to the heap by appending it to the array and performing
bottom-up heapification. The removeMin function removes the minimum element from the heap by
replacing it with the last element, removing the last element, and then performing heapify.
The minElement function returns the minimum element of the heap.

COMPLEXITY ANALYSIS:
- The heapify operation takes O(log n) time complexity, where n is the number of elements in the heap.
- The bottomUpHeapify operation also takes O(log n) time complexity.
- The insert operation takes O(log n) time complexity.
- The removeMin operation takes O(log n) time complexity.
- The minElement operation takes O(1) time complexity.

Overall, the time complexity of the MinHeap class methods is O(log n), where n is the number
of elements in the heap.

CODE:-
*/

class MinHeap {
    constructor() {
        this.pq = [];
    }

    // parent of node i is at index Math.floor((i - 1) / 2)
    getParent(i) { return Math.floor((i - 1) / 2); }

    // left child of node i is at index 2 * i + 1
    getLeft(i) { return 2 * i + 1; }

    // right child of node i is at index 2 * i + 2
    getRight(i) { return 2 * i + 2; }

    swap(i, j) {
        [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
    }

    // Function to heapify the heap (top-down)
    heapify(node) {
        const leftChild = (2 * node) + 1;
        const rightChild = (2 * node) + 2;
        let smallest = node;

        if (leftChild < this.pq.length && this.pq[leftChild] < this.pq[smallest]) {
            smallest = leftChild;
        }

        if (rightChild < this.pq.length && this.pq[rightChild] < this.pq[smallest]) {
            smallest = rightChild;
        }

        if (smallest !== node) {
            // Swap elements
            [this.pq[node], this.pq[smallest]] = [this.pq[smallest], this.pq[node]];
            this.heapify(smallest);
        }
    }

    // Function to heapify from bottom to top
    bottomUpHeapify(node) {
        const parent = Math.floor((node - 1) / 2);

        if (parent >= 0 && this.pq[parent] > this.pq[node]) {
            // Swap elements
            [this.pq[parent], this.pq[node]] = [this.pq[node], this.pq[parent]];
            this.bottomUpHeapify(parent);
        }
    }

    // Function to insert 'val' in the heap
    insert(val) {
        this.pq.push(val);
        this.bottomUpHeapify(this.pq.length - 1);
    }

    // Function to remove the minimum element
    removeMin() {
        if (this.pq.length === 0) return;

        this.pq[0] = this.pq[this.pq.length - 1];
        this.pq.pop();

        if (this.pq.length > 0) {
            this.heapify(0);
        }
    }

    // Function to return the minimum element
    minElement() {
        return this.pq.length === 0 ? -1 : this.pq[0];
    }

    // Function to get the size of the heap
    size() {
        return this.pq.length;
    }

    // Function to check if heap is empty
    isEmpty() {
        return this.pq.length === 0;
    }
}

// Example usage:
// const heap = new MinHeap();
// heap.insert(10);
// heap.insert(5);
// heap.insert(20);
// heap.insert(2);
// console.log(heap.minElement()); // Output: 2
// heap.removeMin();
// console.log(heap.minElement()); // Output: 5

