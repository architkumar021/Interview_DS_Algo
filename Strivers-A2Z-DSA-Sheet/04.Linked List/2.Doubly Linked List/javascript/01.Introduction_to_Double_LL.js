/*
QUESTION:
Construct a doubly linked list from an array and return the head.
Each node has three fields: data, prev (pointer to previous), next (pointer to next).

Example 1:
  Input:  arr = [1, 2, 3, 4, 5]
  Output: 1 <--> 2 <--> 3 <--> 4 <--> 5

Example 2:
  Input:  arr = [3, 4, 5]
  Output: 3 <--> 4 <--> 5

APPROACH:
1. Create head node from arr[0], set head.prev = null.
2. Use a curr pointer starting at head.
3. For each remaining element, create a new node:
   - new.prev = curr
   - curr.next = new
4. Advance curr to the new node.
5. Return head.

Time Complexity:  O(N)
Space Complexity: O(N)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function constructDLL(arr) {
    if (arr.length === 0) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        const newNode = new Node(arr[i]);
        newNode.prev = curr;   // link back
        curr.next = newNode;   // link forward
        curr = newNode;
    }
    return head;
}

// Helper: print DLL forward
function printDLL(head) {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(curr.data);
        curr = curr.next;
    }
    console.log(result.join(' <--> '));
}

// Driver code
const head = constructDLL([1, 2, 3, 4, 5]);
printDLL(head); // 1 <--> 2 <--> 3 <--> 4 <--> 5

