/*
QUESTION:
Given a doubly linked list and a position x (1-based). Delete the node at position x.

Example 1:
  Input:  1 <--> 3 <--> 4,  x = 3
  Output: 1 <--> 3

Example 2:
  Input:  1 <--> 5 <--> 2 <--> 9,  x = 1
  Output: 5 <--> 2 <--> 9

APPROACH:
1. If x == 1 → head is deleted. Return head.next (update its prev to null).
2. Otherwise traverse to node just BEFORE x (i.e. to position x-1).
3. Let delNode = curr.next (the node to delete).
4. curr.next = delNode.next       (skip delNode forward)
5. If delNode.next exists: delNode.next.prev = curr  (fix back pointer)

Time Complexity:  O(N)
Space Complexity: O(1)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function deleteNode(head, x) {
    // Deleting head node
    if (x === 1) {
        const newHead = head.next;
        if (newHead) newHead.prev = null; // unlink back pointer
        return newHead;
    }

    // Traverse to (x-1)th node
    let curr = head;
    for (let i = 1; i < x - 1; i++) {
        curr = curr.next;
    }

    const delNode = curr.next;        // node to be deleted
    curr.next = delNode.next;         // skip it forward
    if (delNode.next) {
        delNode.next.prev = curr;     // fix back pointer of next node
    }

    return head;
}

// Helper: build DLL from array
function buildDLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        const n = new Node(arr[i]);
        n.prev = curr; curr.next = n; curr = n;
    }
    return head;
}

// Helper: print DLL
function printDLL(head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.data); curr = curr.next; }
    console.log(result.join(' <--> '));
}

// Driver code
let head = buildDLL([1, 3, 4]);
head = deleteNode(head, 3);
printDLL(head); // 1 <--> 3

head = buildDLL([1, 5, 2, 9]);
head = deleteNode(head, 1);
printDLL(head); // 5 <--> 2 <--> 9

