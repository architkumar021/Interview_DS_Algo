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
- Walk curr from head, one node at a time.
- For each node, find the next node with a different value (nextDistinct).
- Skip all duplicates by linking curr directly to nextDistinct.
- Since the list is SORTED, all duplicates are contiguous → single pass.

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
    let curr = head;

    while (curr) {
        let nextDistinct = curr.next;

        // Skip all nodes with the same value as curr
        while (nextDistinct && nextDistinct.data === curr.data) {
            nextDistinct = nextDistinct.next;
        }

        // Link curr directly to the next distinct node
        curr.next = nextDistinct;
        if (nextDistinct) nextDistinct.prev = curr;

        curr = curr.next;
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
