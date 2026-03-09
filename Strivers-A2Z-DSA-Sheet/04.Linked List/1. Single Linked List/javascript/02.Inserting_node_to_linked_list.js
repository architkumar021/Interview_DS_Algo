/*
QUESTION:
Create a linked list of size N from input literals. Each integer is accompanied by
an indicator (0 or 1). If 0 → insert at the beginning. If 1 → insert at the end.

Example 1:
  Input:  9 0 | 5 1 | 6 1 | 2 0 | 5 0
  Output: 5 -> 2 -> 9 -> 5 -> 6

Example 2:
  Input:  5 1 | 6 1 | 9 1
  Output: 5 -> 6 -> 9

APPROACH:
- insertAtBeginning: Create a new node, point its next to head, return new node as head.
- insertAtEnd: Traverse to last node, attach new node at the end.

Time Complexity:  O(N) for insertAtBeginning, O(N) for insertAtEnd per call
Space Complexity: O(1) extra per operation
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Insert a new node at the beginning
function insertAtBeginning(head, x) {
    const temp = new Node(x);
    temp.next = head;   // New node points to current head
    return temp;        // New node is the new head
}

// Insert a new node at the end
function insertAtEnd(head, x) {
    const temp = new Node(x);
    if (!head) return temp;     // Empty list → new node is head
    let curr = head;
    while (curr.next) {
        curr = curr.next;       // Traverse to last node
    }
    curr.next = temp;
    return head;
}

// Helper: print linked list
function printLL(head) {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(curr.data);
        curr = curr.next;
    }
    console.log(result.join(' -> '));
}

// Driver code
// Input: 9→0, 5→1, 6→1, 2→0, 5→0
let head = null;
const input = [[9, 0], [5, 1], [6, 1], [2, 0], [5, 0]];

for (const [val, pos] of input) {
    if (pos === 0) head = insertAtBeginning(head, val);
    else           head = insertAtEnd(head, val);
}

printLL(head); // 5 -> 2 -> 9 -> 5 -> 6

