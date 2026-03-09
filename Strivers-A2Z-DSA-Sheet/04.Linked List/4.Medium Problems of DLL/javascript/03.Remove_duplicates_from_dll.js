/*
QUESTION:
Given a SORTED doubly linked list, remove all duplicate nodes so that each
value appears only once. Return the head of the modified list.

Example 1:
  Input:  1 <-> 1 <-> 1 <-> 2 <-> 3 <-> 4
  Output: 1 <-> 2 <-> 3 <-> 4

Example 2:
  Input:  1 <-> 2 <-> 2 <-> 3 <-> 3 <-> 4 <-> 4
  Output: 1 <-> 2 <-> 3 <-> 4

APPROACH:
- Track current unique value in `dupVal` (start with head.data).
- Walk curr from head.next:
    - Inner while: while curr exists AND curr.data === dupVal
        → unlink curr: fix prev.next and next.prev, advance curr.
    - After inner while: curr is either null or a new unique value.
        → update dupVal = curr.data, advance curr = curr.next.

Since the list is SORTED, all duplicates are contiguous → single pass.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function removeDuplicates(head) {
    if (!head) return null;

    let dupVal = head.data;
    let curr   = head.next;

    while (curr) {
        // Remove all nodes with value === dupVal
        while (curr && curr.data === dupVal) {
            // Unlink curr from DLL
            curr.prev.next = curr.next;
            if (curr.next) curr.next.prev = curr.prev;
            curr = curr.next;
        }

        // curr is now at a new unique value (or null)
        if (curr) {
            dupVal = curr.data;
            curr   = curr.next;
        }
    }

    return head;
}

// Helpers
function buildDLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let c = head;
    for (let i = 1; i < arr.length; i++) {
        const n = new Node(arr[i]);
        n.prev = c; c.next = n; c = n;
    }
    return head;
}

function printDLL(head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.data); curr = curr.next; }
    console.log(result.join(' <-> '));
}

// Driver
let head = buildDLL([1, 1, 1, 2, 3, 4]);
printDLL(removeDuplicates(head)); // 1 <-> 2 <-> 3 <-> 4

head = buildDLL([1, 2, 2, 3, 3, 4, 4]);
printDLL(removeDuplicates(head)); // 1 <-> 2 <-> 3 <-> 4

head = buildDLL([1, 1, 2, 2, 3]);
printDLL(removeDuplicates(head)); // 1 <-> 2 <-> 3

