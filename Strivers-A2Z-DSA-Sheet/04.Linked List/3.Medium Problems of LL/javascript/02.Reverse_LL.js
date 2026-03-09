/*
QUESTION:
Given the head of a singly linked list, reverse the list and return the reversed list.

Example 1:  Input: [1,2,3,4,5]  Output: [5,4,3,2,1]
Example 2:  Input: [1,2]        Output: [2,1]

APPROACH: Iterative — three pointers
- prev = null, curr = head, frwd = null
- For each node: save frwd = curr.next, flip curr.next = prev,
  advance prev = curr, curr = frwd.
- When curr is null, prev is the new head.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr) {
        const frwd = curr.next; // save next
        curr.next = prev;       // reverse link
        prev = curr;            // advance prev
        curr = frwd;            // advance curr
    }

    return prev; // prev is the new head
}

// Helpers
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) { curr.next = new ListNode(arr[i]); curr = curr.next; }
    return head;
}
function printLL(head) {
    const r = []; let c = head;
    while (c) { r.push(c.val); c = c.next; }
    console.log(r.join(' -> '));
}

// Driver
printLL(reverseList(buildLL([1,2,3,4,5]))); // 5 -> 4 -> 3 -> 2 -> 1
printLL(reverseList(buildLL([1,2])));        // 2 -> 1

