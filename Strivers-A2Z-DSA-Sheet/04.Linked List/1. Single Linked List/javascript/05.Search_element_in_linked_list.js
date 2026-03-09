/*
QUESTION:
Given a linked list of n nodes and a key, check if the key is present in the linked list.

Example:
  Input:  1 -> 2 -> 3 -> 4,  key = 3
  Output: true

  Input:  1 -> 2 -> 3 -> 4,  key = 7
  Output: false

APPROACH:
Traverse the entire linked list. If any node's data matches the key, return true.
If we reach the end without a match, return false.

Time Complexity:  O(N) — worst case visit every node
Space Complexity: O(1)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function searchKey(head, key) {
    let curr = head;
    while (curr) {
        if (curr.data === key) return true;
        curr = curr.next;
    }
    return false;
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

// Driver code
const head = buildLL([1, 2, 3, 4]);
console.log(searchKey(head, 3)); // true
console.log(searchKey(head, 7)); // false

