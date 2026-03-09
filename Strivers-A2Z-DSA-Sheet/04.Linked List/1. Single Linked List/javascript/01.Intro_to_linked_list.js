/*
QUESTION:
Construct a linked list from an array and return the head of the linked list.

Example 1:
  Input:  arr = [1, 2, 3, 4, 5]
  Output: 1 -> 2 -> 3 -> 4 -> 5

Example 2:
  Input:  arr = [2, 4]
  Output: 2 -> 4

APPROACH:
1. Create the head node from the first element of the array.
2. Use a `curr` pointer starting at head.
3. For each remaining element, create a new node and attach it via curr.next.
4. Advance curr to the new node.
5. Return head.

Time Complexity:  O(N)
Space Complexity: O(N)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function constructLL(arr) {
    if (arr.length === 0) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new Node(arr[i]);
        curr = curr.next;
    }
    return head;
}

// Helper: print linked list
function printLL(head) {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(curr.data);
        curr = curr.next;
    }
    console.log(result.join(' -> '));
}

// Driver code
const head = constructLL([1, 2, 3, 4, 5]);
printLL(head); // 1 -> 2 -> 3 -> 4 -> 5

