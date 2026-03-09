/*
QUESTION:
Given the head of a linked list, remove the nth node from the end and return head.

Example 1:  Input: [1,2,3,4,5], n=2  Output: [1,2,3,5]
Example 2:  Input: [1], n=1          Output: []
Example 3:  Input: [1,2], n=1        Output: [1]

APPROACH: Two Pointers (left & right)
1. Move right pointer n nodes ahead.
2. If right is null → the head itself is the nth from end → return head.next.
3. Move both left and right together until right.next is null.
4. Now left.next is the node to delete → left.next = left.next.next.

TIME COMPLEXITY:  O(N)  — single pass
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function removeNthFromEnd(head, n) {
    let left  = head;
    let right = head;

    // Move right n steps ahead
    for (let i = 0; i < n; i++) right = right.next;

    // If right is null, remove head
    if (!right) return head.next;

    // Move both until right reaches last node
    while (right.next) {
        left  = left.next;
        right = right.next;
    }

    // left.next is the node to delete
    left.next = left.next.next;
    return head;
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
    console.log(r.join(' -> ') || '[]');
}

// Driver
printLL(removeNthFromEnd(buildLL([1,2,3,4,5]), 2)); // 1 -> 2 -> 3 -> 5
printLL(removeNthFromEnd(buildLL([1]), 1));          // []
printLL(removeNthFromEnd(buildLL([1,2]), 1));        // 1

