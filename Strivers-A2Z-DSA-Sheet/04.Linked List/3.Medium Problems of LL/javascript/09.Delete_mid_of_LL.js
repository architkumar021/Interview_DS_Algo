/*
QUESTION:
Delete the middle node of a linked list and return the head.
Middle = ⌊n/2⌋ index (0-based). For n=7, middle index is 3.

Example:
  Input:  [1,3,4,7,1,2,6]  Output: [1,3,4,1,2,6]  (node 7 removed)

APPROACH: Slow & Fast + prev pointer
- slow moves 1 step, fast moves 2 steps.
- Track prev (node before slow).
- When fast reaches end, slow is at middle.
- prev.next = slow.next  →  skips middle node.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function deleteMiddle(head) {
    // Edge case: single node
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head;
    let prev = null;

    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // slow is at the middle; skip it
    prev.next = slow.next;
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
printLL(deleteMiddle(buildLL([1,3,4,7,1,2,6]))); // 1 -> 3 -> 4 -> 1 -> 2 -> 6
printLL(deleteMiddle(buildLL([1,2,3,4])));         // 1 -> 2 -> 4
printLL(deleteMiddle(buildLL([1])));               // []

