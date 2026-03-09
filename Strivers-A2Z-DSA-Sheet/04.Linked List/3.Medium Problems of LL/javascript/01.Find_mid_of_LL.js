/*
QUESTION:
Given the head of a singly linked list, return the middle node.
If there are two middle nodes, return the second middle node.

Example 1:
  Input:  [1,2,3,4,5]    Output: [3,4,5]   (node 3 is middle)
Example 2:
  Input:  [1,2,3,4,5,6]  Output: [4,5,6]   (two middles → return 2nd)

APPROACH: Slow & Fast Pointer (Floyd's tortoise)
- slow moves 1 step, fast moves 2 steps.
- When fast reaches the end, slow is exactly at the middle.
- For even-length lists fast stops at last node → slow lands on 2nd middle.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow; // slow is at the middle
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
printLL(middleNode(buildLL([1,2,3,4,5])));   // 3 -> 4 -> 5
printLL(middleNode(buildLL([1,2,3,4,5,6]))); // 4 -> 5 -> 6

