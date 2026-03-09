/*
QUESTION:
Given a singly linked list, find the length (number of nodes) of the linked list.

Example 1:
  Input:  1 -> 2 -> 3 -> 4 -> 5
  Output: 5

Example 2:
  Input:  2 -> 4 -> 6 -> 7 -> 5 -> 1 -> 0
  Output: 7

APPROACH:
1. Initialize a counter cnt = 0.
2. Traverse the list from head to null, incrementing cnt at each node.
3. Return cnt.

Time Complexity:  O(N) — visit every node once
Space Complexity: O(1)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function getCount(head) {
    let cnt = 0;
    let curr = head;
    while (curr) {
        cnt++;
        curr = curr.next;
    }
    return cnt;
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
const head1 = buildLL([1, 2, 3, 4, 5]);
console.log(getCount(head1)); // 5

const head2 = buildLL([2, 4, 6, 7, 5, 1, 0]);
console.log(getCount(head2)); // 7

