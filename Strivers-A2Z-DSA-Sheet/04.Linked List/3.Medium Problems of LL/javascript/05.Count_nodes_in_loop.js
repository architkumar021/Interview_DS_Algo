/*
QUESTION:
Given a linked list, check if it has a loop. If yes, return the count of nodes in the loop.
If no loop, return 0.

Example 1:
  Input:  25->14->19->33->10->21->39->90->58->45, C=4
  Output: 7   (loop: 33->10->21->39->90->58->45->33)

Example 2:
  Input:  1->0, C=1
  Output: 2

APPROACH: Floyd's Detection + Count
Step 1 — Detect loop using slow/fast pointers.
Step 2 — Once they meet inside the loop, count nodes by
  keeping one pointer fixed and moving the other one full
  loop until they meet again, counting steps.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class Node {
    constructor(data) { this.data = data; this.next = null; }
}

function countNodesInLoop(head) {
    let slow = head;
    let fast = head;

    // Step 1: detect meeting point
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            // Step 2: count nodes in the loop
            let count = 1;
            slow = slow.next;
            while (slow !== fast) {
                slow = slow.next;
                count++;
            }
            return count;
        }
    }

    return 0; // no loop
}

// Helpers
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) { curr.next = new Node(arr[i]); curr = curr.next; }
    return head;
}

// Driver
// Build: 1->2->3->4->5, cycle at pos 2 (node with val 3)
const head = buildLL([1,2,3,4,5]);
let n3 = head.next.next;
head.next.next.next.next.next = n3; // 5 -> 3 (loop of length 3)
console.log(countNodesInLoop(head)); // 3

