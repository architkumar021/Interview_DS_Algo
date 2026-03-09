// 2095. Delete the Middle Node of a Linked List

// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

// The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

// For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.
 

// Example 1:


// Input: head = [1,3,4,7,1,2,6]
// Output: [1,3,4,1,2,6]
// Explanation:
// The above figure represents the given linked list. The indices of the nodes are written below.
// Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
// We return the new list after removing this node. 
// Example 2:


// Input: head = [1,2,3,4]
// Output: [1,2,4]
// Explanation:
// The above figure represents the given linked list.
// For n = 4, node 2 with value 3 is the middle node, which is marked in red.
// Example 3:


// Input: head = [2,1]
// Output: [2]
// Explanation:
// The above figure represents the given linked list.
// For n = 2, node 1 with value 1 is the middle node, which is marked in red.
// Node 0 with value 2 is the only node remaining after removing node 1.
 

// Constraints:

// The number of nodes in the list is in the range [1, 105].
// 1 <= Node.val <= 105


var deleteMiddle = function(head) {    
    if (!head || !head.next) {
        // If the list is empty or has only one node, return the null as it has no middle node to delete
        return null;
    }

    // Two Pointer Approach, slow at x steps and fast at 2x step. slow will reach middle. Both start from head.
    // Also, track previous pointer of slow pointer

    let fast = head;
    let slow = head;
    let prev = null

    while (fast && fast.next) {    
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }

    if (prev) {
        prev.next = slow.next;
    } else {
        head = head.next;
    }
    return head;
};

// TC: O(n)
// SC: O(1)

// Time complexity: O(n)
// Space complexity: O(1)
var deleteMiddle = function(head) {
    // Initialize slow and fast pointers to reach middle of linked list...
    let slow = fast = head;
    // Find the middle and previous of middle...
    let prev = null;
    // To store previous of slow pointer...
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    // Delete the middle node...
    if (!prev) return null;
    prev.next = slow.next;
    return head;
};




// Node class represents a node
// in a linked list
class Node {
    constructor(data, next) {
        // Data stored in the node
        this.data = data;   
        // Pointer to the next node in the list
        this.next = next;    
    }
}

// Function to delete the
// middle node of a linked list
function deleteMiddle(head) {
    /* If the list is empty or has only,
     * one node return null as there is no
     * middle node to delete */
    if (head === null || head.next === null) {
        return null;
    }

    // Initialize slow and fast pointers
    let slow = head;
    let fast = head;
    fast = head.next.next;

    // Move 'fast' pointer twice as fast as 'slow'
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Delete the middle node by skipping it
    slow.next = slow.next.next;
    return head;
}

function printLL(head) {
    let temp = head;
    while (temp !== null) {
        console.log(temp.data + " ");
        temp = temp.next;
    }
    console.log("\n");
}

// Creating a sample linked list
let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

// Display the original linked list
console.log("Original Linked List: ");
printLL(head);

// Deleting the middle node
head = deleteMiddle(head);

// Displaying the updated linked list
console.log("Updated Linked List: ");
printLL(head);

