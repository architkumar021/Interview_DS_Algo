/*
QUESTION:
Given the head of a doubly linked list and a key, delete ALL occurrences
of the key and return the updated head.

Example:
  Input:  2 <-> 2 <-> 10 <-> 8 <-> 4 <-> 2 <-> 5 <-> 2,  key = 2
  Output: 10 <-> 8 <-> 4 <-> 5

APPROACH:
Traverse every node. When curr.data === key, handle 3 cases:
  1. Head node  (curr.prev === null) → update head to curr.next, fix new head's prev
  2. Tail node  (curr.next === null) → curr.prev.next = null
  3. Middle node                    → wire prev and next around curr

Save curr.next BEFORE unlinking so traversal continues correctly.

TIME COMPLEXITY:  O(N) — single pass
SPACE COMPLEXITY: O(1)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function deleteAllOccurrences(head, key) {
    let curr = head;

    while (curr) {
        const nextNode = curr.next; // save next before potential unlink

        if (curr.data === key) {
            if (!curr.prev) {
                // Case 1: deleting head node
                head = curr.next;
                if (head) head.prev = null;
            } else if (!curr.next) {
                // Case 2: deleting tail node
                curr.prev.next = null;
            } else {
                // Case 3: deleting middle node
                curr.prev.next = curr.next;
                curr.next.prev = curr.prev;
            }
        }

        curr = nextNode; // move to saved next
    }

    return head;
}

// Helpers
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

function printDLL(head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.data); curr = curr.next; }
    console.log(result.join(' <-> ') || '(empty)');
}

// Driver
let head = buildDLL([2, 2, 10, 8, 4, 2, 5, 2]);
head = deleteAllOccurrences(head, 2);
printDLL(head); // 10 <-> 8 <-> 4 <-> 5

head = buildDLL([1, 2, 3, 2, 4]);
head = deleteAllOccurrences(head, 2);
printDLL(head); // 1 <-> 3 <-> 4

head = buildDLL([5, 5, 5]);
head = deleteAllOccurrences(head, 5);
printDLL(head); // (empty)

