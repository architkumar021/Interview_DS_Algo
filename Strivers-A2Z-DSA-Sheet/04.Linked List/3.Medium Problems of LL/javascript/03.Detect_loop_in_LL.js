/*
QUESTION:
Given head of a linked list, determine if the linked list has a cycle in it.
Return true if there is a cycle, otherwise false.

Example 1:  Input: [3,2,0,-4], pos=1  Output: true
Example 2:  Input: [1,2], pos=0       Output: true
Example 3:  Input: [1], pos=-1        Output: false

APPROACH: Floyd's Cycle Detection (Tortoise & Hare)
- slow moves 1 step, fast moves 2 steps.
- If there is a cycle, fast will eventually lap slow → they meet.
- If fast reaches null, no cycle exists.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true; // cycle detected
    }

    return false;
}

// Helpers
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) { curr.next = new ListNode(arr[i]); curr = curr.next; }
    return head;
}

// Driver
const head1 = buildLL([3,2,0,-4]);
head1.next.next.next.next = head1.next; // create cycle at pos 1
console.log(hasCycle(head1)); // true

const head2 = buildLL([1]);
console.log(hasCycle(head2)); // false

