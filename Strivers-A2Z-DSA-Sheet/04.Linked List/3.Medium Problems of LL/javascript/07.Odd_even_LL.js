/*
QUESTION:
Given the head of a singly linked list, group all nodes with odd indices together
followed by nodes with even indices, and return the reordered list.
(Indices are 1-based: first node = odd, second = even, ...)

Example 1:  Input: [1,2,3,4,5]      Output: [1,3,5,2,4]
Example 2:  Input: [2,1,3,5,6,4,7]  Output: [2,3,6,7,1,5,4]

APPROACH:
- Maintain two separate chains: odd-indexed and even-indexed nodes.
- odd pointer weaves through nodes 1,3,5,... | even through 2,4,6,...
- Save evenHead before modifying links.
- At the end, join: odd.next = evenHead.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function oddEvenList(head) {
    if (!head || !head.next) return head;

    let odd     = head;
    let even    = head.next;
    const evenHead = even; // save start of even list

    while (odd.next && even) {
        odd.next  = even.next;          // odd chain skips even node
        if (odd.next) {
            even.next = odd.next.next;  // even chain skips odd node
            odd = odd.next;             // advance odd pointer
        }
        even = even.next;               // advance even pointer
    }

    odd.next = evenHead; // join odd chain tail to even chain head
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
    console.log(r.join(' -> '));
}

// Driver
printLL(oddEvenList(buildLL([1,2,3,4,5])));       // 1 -> 3 -> 5 -> 2 -> 4
printLL(oddEvenList(buildLL([2,1,3,5,6,4,7])));   // 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4

