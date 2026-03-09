/*
QUESTION:
Given a doubly linked list, reverse it in-place and return the new head.

Example 1:
  Input:  3 <--> 4 <--> 5
  Output: 5 <--> 4 <--> 3

Example 2:
  Input:  75 <--> 122 <--> 59 <--> 196
  Output: 196 <--> 59 <--> 122 <--> 75

APPROACH:
Traverse the list and for EVERY node, swap its next and prev pointers.
- Store curr.next in nxt before swapping (so we don't lose the reference).
- After swap: curr.prev holds the original curr.next (the way forward).
- When curr.prev becomes null after swap, curr is the new head (it was the last node).

  Before swap at node X:  X.prev → left,  X.next → right
  After  swap at node X:  X.prev → right, X.next → left
  New head = last node visited where new prev === null.

Time Complexity:  O(N) — every node visited once
Space Complexity: O(1) — no extra space
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function reverseDLL(head) {
    let curr = head;
    let newHead = null;

    while (curr) {
        const nxt = curr.next;   // save next before overwriting

        // Swap next and prev
        curr.next = curr.prev;
        curr.prev = nxt;

        // When curr.prev is null after swap, curr was the last node
        // → it is now the new head
        if (curr.prev === null) newHead = curr;

        curr = curr.prev;        // move forward (was nxt before swap)
    }

    return newHead;
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
let head = buildDLL([3, 4, 5]);
head = reverseDLL(head);
printDLL(head); // 5 <--> 4 <--> 3

head = buildDLL([75, 122, 59, 196]);
head = reverseDLL(head);
printDLL(head); // 196 <--> 59 <--> 122 <--> 75

