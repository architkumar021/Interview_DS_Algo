/*
QUESTION:
Given a singly linked list and an integer x (1-based index).
Delete the xth node from the linked list.

Example 1:
  Input:  1 -> 3 -> 4,  x = 3
  Output: 1 -> 3

Example 2:
  Input:  1 -> 5 -> 2 -> 9,  x = 2
  Output: 1 -> 2 -> 9

APPROACH:
1. If x === 1, the head itself is deleted → return head.next.
2. Traverse to the (x-1)th node using a counter.
3. Skip the xth node by linking (x-1).next to (x+1):
     curr.next = curr.next.next
4. Return the (possibly unchanged) head.

Time Complexity:  O(N) — traverse up to position x
Space Complexity: O(1)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function deleteNode(head, x) {
    // Deleting head node
    if (x === 1) return head.next;

    let cnt = 1;
    let curr = head;
    // Traverse to (x-1)th node
    while (cnt < x - 1) {
        curr = curr.next;
        cnt++;
    }
    // Skip the xth node
    curr.next = curr.next.next;
    return head;
}

// Helper: build linked list from array
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new Node(arr[i]); curr = curr.next;
    }
    return head;
}

// Helper: print linked list
function printLL(head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.data); curr = curr.next; }
    console.log(result.join(' -> '));
}

// Driver code
let head = buildLL([1, 3, 4]);
head = deleteNode(head, 3);
printLL(head); // 1 -> 3

head = buildLL([1, 5, 2, 9]);
head = deleteNode(head, 2);
printLL(head); // 1 -> 2 -> 9

