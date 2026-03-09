/*
QUESTION:
A number N is represented in a linked list where each node holds a single digit.
Add 1 to the number and return the updated linked list.

Example:
  Input:  1 -> 9 -> 9   (represents 199)
  Output: 2 -> 0 -> 0   (represents 200)

APPROACH: Reverse → Add → Reverse Back
1. Reverse the list so the least significant digit is at the head.
2. Add 1 to head, propagate carry through the list.
3. If carry remains after traversal, append a new node.
4. Reverse again to restore original order.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class Node {
    constructor(data) { this.data = data; this.next = null; }
}

function reverseLL(head) {
    let prev = null, curr = head;
    while (curr) {
        const frwd = curr.next;
        curr.next = prev;
        prev = curr;
        curr = frwd;
    }
    return prev;
}

function addOne(head) {
    // Step 1: reverse
    head = reverseLL(head);

    // Step 2: add 1 with carry
    let curr = head;
    let carry = 1;
    let last = null;

    while (curr) {
        const sum = curr.data + carry;
        curr.data = sum % 10;
        carry = Math.floor(sum / 10);
        if (!curr.next) last = curr;
        curr = curr.next;
    }

    // Step 3: if carry remains, append new node
    if (carry) last.next = new Node(carry);

    // Step 4: reverse back
    return reverseLL(head);
}

// Helpers
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let c = head;
    for (let i = 1; i < arr.length; i++) { c.next = new Node(arr[i]); c = c.next; }
    return head;
}
function printLL(head) {
    const r = []; let c = head;
    while (c) { r.push(c.data); c = c.next; }
    console.log(r.join(' -> '));
}

// Driver
printLL(addOne(buildLL([1,9,9]))); // 2 -> 0 -> 0
printLL(addOne(buildLL([9,9,9]))); // 1 -> 0 -> 0 -> 0
printLL(addOne(buildLL([1,2,3]))); // 1 -> 2 -> 4

