/*
QUESTION:
Given the head of a linked list, rotate the list to the RIGHT by k places.

Example 1:  Input: [1,2,3,4,5], k=2  Output: [4,5,1,2,3]
Example 2:  Input: [0,1,2],     k=4  Output: [2,0,1]

APPROACH:
1. Find the length of the list; simultaneously reach the tail node.
2. Make the list circular: tail.next = head.
3. Effective rotations = k % length  (rotating by length = no change).
4. New tail is at position (length - k - 1) from original head.
5. New head = newTail.next; break the circle: newTail.next = null.

WHY circular? Avoids special-casing the wrap-around by naturally
connecting tail back to head, then just finding the split point.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function rotateRight(head, k) {
    if (!head || !head.next || k === 0) return head;

    // Step 1: find length and reach tail
    let tail = head;
    let len  = 1;
    while (tail.next) { tail = tail.next; len++; }

    // Step 2: make circular
    tail.next = head;

    // Step 3: effective rotations
    k = k % len;
    if (k === 0) {
        tail.next = null; // break circle
        return head;
    }

    // Step 4: traverse to new tail (length - k - 1 steps from head)
    let newTail = head;
    for (let i = 0; i < len - k - 1; i++) newTail = newTail.next;

    // Step 5: set new head and break circle
    const newHead  = newTail.next;
    newTail.next   = null;

    return newHead;
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
printLL(rotateRight(buildLL([1,2,3,4,5]), 2)); // 4 -> 5 -> 1 -> 2 -> 3
printLL(rotateRight(buildLL([0,1,2]),     4)); // 2 -> 0 -> 1
printLL(rotateRight(buildLL([1,2,3]),     0)); // 1 -> 2 -> 3

