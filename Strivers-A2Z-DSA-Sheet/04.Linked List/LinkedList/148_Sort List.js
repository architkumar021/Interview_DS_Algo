// 148. Sort List

// Given the head of a linked list, return the list after sorting it in ascending order.

 

// Example 1:


// Input: head = [4,2,1,3]
// Output: [1,2,3,4]
// Example 2:


// Input: head = [-1,5,3,4,0]
// Output: [-1,0,3,4,5]
// Example 3:

// Input: head = []
// Output: []
 

// Constraints:

// The number of nodes in the list is in the range [0, 5 * 104].
// -105 <= Node.val <= 105
 

// Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?



// Brute force Solution
// A naive solution could be converting the linked list into an array, sorting the array,
//  and then creating a new linked list from the sorted array's values.
                            
// Node class represents a
// node in a linked list
class Node {
    constructor(data, next = null) {
        // Data stored in the node
        this.data = data;
        // Pointer to the next node in the list
        this.next = next;
    }
}

// Function to sort a linked list
// using Brute Force approach
function sortLL(head) {
    // Create an array to
    // store node values
    let arr = [];
    
    // Temporary pointer to
    // traverse the linked list
    let temp = head;
    
    // Traverse the linked list and
    // store node values in the array
    while (temp !== null) {
        arr.push(temp.data);
        temp = temp.next;
    }
    
    // Sort the array
    // containing node values
    arr.sort((a, b) => a - b);
    
    // Reassign sorted values to
    // the linked list nodes
    temp = head;
    for (let i = 0; i < arr.length; i++) {
        // Update the node's data
        // with the sorted values
        temp.data = arr[i]; 
        // Move to the next node
        temp = temp.next; 
    }
    
    // Return the head of the
    // sorted linked list
    return head; 
}

// Function to print the linked list
function printLinkedList(head) {
    let temp = head;
    while (temp !== null) {
        // Print the data of the current node
        console.log(temp.data + " "); 
        // Move to the next node
        temp = temp.next; 
    }
    console.log();
}

// Linked List: 3 2 5 4 1
let head = new Node(3);
head.next = new Node(2);
head.next.next = new Node(5);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(1);

console.log("Original Linked List: ");
printLinkedList(head);

// Sort the linked list
head = sortLL(head);

console.log("Sorted Linked List: ");
printLinkedList(head);


// Optimal Approach
                            
 // Node class represents a node in a linked list
class Node {
    constructor(data, nextNode = null) {
        this.data = data;
        this.next = nextNode;
    }
}

// Function to merge two sorted linked lists
function mergeTwoSortedLinkedLists(list1, list2) {
    // Create a dummy node to serve
    // as the head of the merged list
    let dummyNode = new Node(-1);
    let temp = dummyNode;

    // Traverse both lists simultaneously
    while (list1 !== null && list2 !== null) {
        // Compare elements of both lists and
        // link the smaller node to the merged list
        if (list1.data <= list2.data) {
            temp.next = list1;
            list1 = list1.next;
        } else {
            temp.next = list2;
            list2 = list2.next;
        }
        // Move the temporary pointer to the next node
        temp = temp.next;
    }

    // If any list still has remaining elements,
    // append them to the merged list
    if (list1 !== null) {
        temp.next = list1;
    } else {
        temp.next = list2;
    }
    // Return the merged list starting
    // from the next of the dummy node
    return dummyNode.next;
}

// Function to find the middle of a linked list
function findMiddle(head) {
    // If the list is empty or has only one node,
    // the middle is the head itself
    if (head === null || head.next === null) {
        return head;
    }

    // Initializing slow and fast pointers
    let slow = head;
    let fast = head.next;

    // Move the fast pointer twice
    // as fast as the slow pointer
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // When the fast pointer reaches the end,
    // the slow pointer will be at the middle
    return slow;
}

// Function to perform merge sort on a linked list
function sortLL(head) {
    // Base case: if the list is empty or has only
    // one node, it is already sorted, so return the head
    if (head === null || head.next === null) {
        return head;
    }

    // Find the middle of the list
    // using the findMiddle function
    let middle = findMiddle(head);

    // Divide the list into two halves
    let right = middle.next;
    middle.next = null;
    let left = head;

    // Recursively sort the left and right halves
    left = sortLL(left);
    right = sortLL(right);

    // Merge the sorted halves using
    // the mergeTwoSortedLinkedLists function
    return mergeTwoSortedLinkedLists(left, right);
}

// Function to print the linked list
function printLinkedList(head) {
    let temp = head;
    while (temp !== null) {
        // Print the data of the current node
        console.log(temp.data + " ");
        // Move to the next node
        temp = temp.next;
    }
    console.log("\n");
}

// Creating and sorting the linked list in JavaScript
let head = new Node(3);
head.next = new Node(2);
head.next.next = new Node(5);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(1);

console.log("Original Linked List: ");
printLinkedList(head);

// Sort the linked list
head = sortLL(head);

console.log("Sorted Linked List: ");
printLinkedList(head);

                            
// Leetcode solution

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {

    // Function to merge two sorted linked lists
    function mergeTwoSortedLinkedLists(list1, list2) {
        // Create a dummy node to serve
        // as the head of the merged list
        let dummyNode = new ListNode(-1);
        let temp = dummyNode;

        // Traverse both lists simultaneously
        while(list1 && list2) {
            // Compare elements of both lists and
            // link the smaller node to the merged list
            if(list1.val <= list2.val) {
                temp.next = list1;
                list1 = list1.next
            } else {
                temp.next = list2;
                list2 = list2.next;
            }
            // Move the temporary pointer to the next node
            temp = temp.next;
        }

        // If any list still has remaining elements,
        // append them to the merged list
        while(list1) {
            temp.next = list1;
            list1 = list1.next;
            temp = temp.next;
        }

        while(list2) {
            temp.next = list2;
            list2 = list2.next;
            temp = temp.next;
        }
        
        // Return the merged list starting
        // from the next of the dummy node
        return dummyNode.next;
    }

    function findMiddle(head) {
        if(!head || !head.next) return head;

        let slow = head;
        let fast = head.next;

        while(fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    function sortLinkedList(head) {
        // Base case: if the list is empty or has only
        // one node, it is already sorted, so return the head
        if(!head || !head.next) return head;

        // Find the middle of the list
        let mid = findMiddle(head);

        // Divide the list into two halves
        let right = mid.next;
        mid.next = null;
        let left = head;

        // Recursively sort the left and right halves
        left = sortLinkedList(left);
        right = sortLinkedList(right);

        // Merge the sorted halves using
        // the mergeTwoSortedLinkedLists function
        return mergeTwoSortedLinkedLists(left, right);
    }
    
    // Sort the linked list
    return sortLinkedList(head);
};

// Time Complexity: O(N log N)where N is the number of nodes in the linked list. Finding the middle node of the linked list requires traversing it linearly taking O(N) time complexity and to reach the individual nodes of the list, it has to be split log N times (continuously halve the list until we have individual elements).

// Space Complexity : O(1) as no additional data structures or space is allocated for storage during the merging process. However, space proportional to O(log N) stack space is required for the recursive calls. THe maximum recursion depth of log N height is occupied on the call stack.