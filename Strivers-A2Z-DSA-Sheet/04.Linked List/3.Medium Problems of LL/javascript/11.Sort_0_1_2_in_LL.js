/*
QUESTION:
Given a linked list containing only 0s, 1s, and 2s, sort it so that
all 0s come first, then 1s, then 2s.

Example:
  Input:  [1,2,2,1,2,0,2,2]  Output: [0,1,1,2,2,2,2,2]

APPROACH: Count & Overwrite
1. Traverse once and count number of 0s, 1s, and 2s.
2. Traverse again and overwrite node values: first zeroCnt nodes = 0,
   next oneCnt nodes = 1, last twoCnt nodes = 2.

TIME COMPLEXITY:  O(N)  — two passes
SPACE COMPLEXITY: O(1)
*/

class Node {
    constructor(data) { this.data = data; this.next = null; }
}

function segregate(head) {
    let zeroCnt = 0, oneCnt = 0, twoCnt = 0;
    let curr = head;

    // Pass 1: count each value
    while (curr) {
        if (curr.data === 0) zeroCnt++;
        else if (curr.data === 1) oneCnt++;
        else twoCnt++;
        curr = curr.next;
    }

    // Pass 2: overwrite with counted values
    curr = head;
    while (zeroCnt--) { curr.data = 0; curr = curr.next; }
    while (oneCnt--)  { curr.data = 1; curr = curr.next; }
    while (twoCnt--)  { curr.data = 2; curr = curr.next; }

    return head;
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
printLL(segregate(buildLL([1,2,2,1,2,0,2,2]))); // 0 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 2
printLL(segregate(buildLL([0,1,2,0,1,2])));       // 0 -> 0 -> 1 -> 1 -> 2 -> 2

