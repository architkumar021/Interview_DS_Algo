/*
QUESTION:
Given a doubly linked list, a position p (0-based), and an integer x.
Insert a new node with value x just after the pth node.

Example 1:
  Input:  2 <--> 4 <--> 5,  p = 2, x = 6
  Output: 2 <--> 4 <--> 5 <--> 6

Example 2:
  Input:  1 <--> 2 <--> 3 <--> 4,  p = 0, x = 44
  Output: 1 <--> 44 <--> 2 <--> 3 <--> 4

APPROACH:
1. Traverse to the pth node (0-based) using a counter.
2. Create a new node with value x.
3. Wire the new node:
   - newNode.next = curr.next     (point forward to what was after curr)
   - newNode.prev = curr          (point back to curr)
   - curr.next.prev = newNode     (if next exists, fix its back pointer)
   - curr.next = newNode          (curr now points forward to newNode)

Time Complexity:  O(N) — traverse to position p
Space Complexity: O(1) extra
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function addNode(head, pos, data) {
    let cnt = 0;
    let curr = head;

    // Traverse to pth node
    while (cnt < pos) {
        curr = curr.next;
        cnt++;
    }

    const newNode = new Node(data);
    const nxt = curr.next;

    newNode.next = nxt;         // new → old next
    newNode.prev = curr;        // new ← curr
    curr.next = newNode;        // curr → new
    if (nxt) nxt.prev = newNode; // old next ← new (if exists)
}

// Helper: build DLL from array
function buildDLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        const n = new Node(arr[i]);
        n.prev = curr; curr.next = n; curr = n;
    }
    return head;
}

// Helper: print DLL
function printDLL(head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.data); curr = curr.next; }
    console.log(result.join(' <--> '));
}

// Driver code
let head = buildDLL([2, 4, 5]);
addNode(head, 2, 6);
printDLL(head); // 2 <--> 4 <--> 5 <--> 6

head = buildDLL([1, 2, 3, 4]);
addNode(head, 0, 44);
printDLL(head); // 1 <--> 44 <--> 2 <--> 3 <--> 4

