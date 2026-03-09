/*
QUESTION:
Given the head of a linked list, reverse the nodes k at a time and return the modified list.
If the remaining nodes are less than k, leave them as-is.

Example 1:  Input: [1,2,3,4,5], k=2  Output: [2,1,4,3,5]
Example 2:  Input: [1,2,3,4,5], k=3  Output: [3,2,1,4,5]

APPROACH: Recursion
1. Check if at least k nodes remain — if not, return head unchanged.
2. Reverse exactly k nodes iteratively (prev/curr/frwd).
   - After loop: prev = new head of reversed group, head = tail of reversed group.
3. Recursively process the rest from frwd (k+1th node).
4. Connect tail of current reversed group → result of recursive call.
5. Return prev (new head of reversed group).

TIME COMPLEXITY:  O(N) — every node visited once
SPACE COMPLEXITY: O(N/k) — recursion depth = number of groups
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function reverseKGroup(head, k) {
    // Check if at least k nodes remain
    let ptr = head;
    for (let i = 0; i < k; i++) {
        if (!ptr) return head; // fewer than k nodes left → return as-is
        ptr = ptr.next;
    }

    // Reverse k nodes
    let prev = null;
    let curr = head;
    let frwd = null;
    let count = k;

    while (count && curr) {
        frwd      = curr.next;
        curr.next = prev;
        prev      = curr;
        curr      = frwd;
        count--;
    }

    // head is now the tail of the reversed group
    // Recursively reverse the rest and connect
    if (frwd) head.next = reverseKGroup(frwd, k);

    return prev; // prev is the new head of this reversed group
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
printLL(reverseKGroup(buildLL([1,2,3,4,5]), 2)); // 2 -> 1 -> 4 -> 3 -> 5
printLL(reverseKGroup(buildLL([1,2,3,4,5]), 3)); // 3 -> 2 -> 1 -> 4 -> 5
printLL(reverseKGroup(buildLL([1,2,3,4,5]), 1)); // 1 -> 2 -> 3 -> 4 -> 5

