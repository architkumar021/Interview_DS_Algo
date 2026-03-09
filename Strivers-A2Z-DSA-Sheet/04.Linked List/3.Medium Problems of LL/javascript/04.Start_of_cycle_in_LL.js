/*
QUESTION:
Given the head of a linked list, return the node where the cycle begins.
If there is no cycle, return null.

Example 1:  Input: [3,2,0,-4], pos=1  Output: node with val 2
Example 2:  Input: [1,2], pos=0       Output: node with val 1

APPROACH: Floyd's Cycle Detection + Cycle Entry
Step 1 — Detect meeting point:
  - slow moves 1 step, fast moves 2 steps.
  - If they meet → cycle exists.

Step 2 — Find cycle start:
  - Reset fast to head, keep slow at meeting point.
  - Move both 1 step at a time.
  - Where they meet again = start of the cycle.

WHY it works: The distance from head to cycle start equals
the distance from the meeting point to cycle start (proven by math).

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function detectCycle(head) {
    let slow = head;
    let fast = head;

    // Step 1: detect meeting point inside cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            // Step 2: find cycle start
            fast = head; // reset one pointer to head
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow; // meeting point = cycle start
        }
    }

    return null; // no cycle
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
head1.next.next.next.next = head1.next; // cycle at pos 1
console.log(detectCycle(head1).val); // 2

const head2 = buildLL([1]);
console.log(detectCycle(head2));      // null

