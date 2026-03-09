// 25. Reverse Nodes in k-Group
// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

// Example 1:


// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]
// Example 2:


// Input: head = [1,2,3,4,5], k = 3
// Output: [3,2,1,4,5]
 

// Constraints:

// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000
 

// Follow-up: Can you solve the problem in O(1) extra memory space?

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// Function to reverse a linked list
// using the 3-pointer approach
function reverseLinkedList(head) {
    
    // Initialize pointer 'temp' at
    // head of the linked list
    let temp = head;  
    
    // Initialize a pointer 'prev' to null
    // representing the previous node
    // (initially none)
    let prev = null;  

    // Traversing the list, continue until
    // 'temp' reaches the end (null)
    while (temp !== null) {  
        // Store the next node in
        // 'front' to preserve the reference
        let front = temp.next;  
        
        // Reverse direction of current node's
        // 'next' pointer to point to 'prev'
        temp.next = prev;  
        
        // Move 'prev' to the current node,
        // preparing it for the next iteration
        prev = temp;
        
        // Move 'temp' to the 'front' node
        // (the next node), advancing traversal
        temp = front;  
    }

    // Return the new head of
    // the reversed linked list
    return prev;  
}

// Function to get the Kth node from
// a given position in the linked list
function getKthNode(temp, k) {
    // Decrement K as we already
    // start from the 1st node
    k -= 1;

    // Decrement K until it reaches
    // the desired position
    while (temp !== null && k > 0) {
        // Decrement k as temp progresses
        k--;

        // Move to the next node
        temp = temp.next;
    }

    // Return the Kth node
    return temp;
}

// Function to reverse nodes in groups of K
function kReverse(head, k) {
    // Initialize a temporary
    // node to traverse the list
    let temp = head;

    // Initialize a pointer to track the
    // last node of the previous group
    let prevLast = null;

    // Traverse through the linked list
    while (temp !== null) {
        // Get the Kth node of the current group
        let kThNode = getKthNode(temp, k);

        // If the Kth node is NULL
        // (not a complete group)
        if (kThNode === null) {
            // If there was a previous group,
            // link the last node to the current node
            if (prevLast) {
                prevLast.next = temp;
            }

            // Exit the loop
            break;
        }

        // Store the next node
        // after the Kth node
        let nextNode = kThNode.next;

        // Disconnect the Kth node
        // to prepare for reversal
        kThNode.next = null;

        // Reverse the nodes from
        // temp to the Kth node
        let reversedHead = reverseLinkedList(temp);

        if(prevLast) {
            prevLast.next = reversedHead;
        } else {
            head =  reversedHead;
        }

        // Update the pointer to the
        // last node of the previous group
        prevLast = temp;

        // Move to the next group
        temp = nextNode;
    }

    // Return the head of the
    // modified linked list
    return head;
}

// Function to reverse the linked list
function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    let next = null;

    while (current !== null) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    head = prev;
}

// Function to print the linked list
function printLinkedList(head) {
    let temp = head;
    let result = "";
    while (temp !== null) {
        result += temp.data + " ";
        temp = temp.next;
    }
    console.log(result);
}

// Create a linked list with
// values 5, 4, 3, 7, 9, and 2
let head = new Node(5);
head.next = new Node(4);
head.next.next = new Node(3);
head.next.next.next = new Node(7);
head.next.next.next.next = new Node(9);
head.next.next.next.next.next = new Node(2);

// Print the original linked list
console.log("Original Linked List: ");
printLinkedList(head);

// Reverse the linked list
head = kReverse(head, 4);

// Print the reversed linked list
console.log("Reversed Linked List: ");
printLinkedList(head);
// Output:
// Original Linked List: 5 4 3 7 9 2 K = 4
// Linked List Reversed in groups of 4: 7 3 4 5 9 2 

// Time Complexity: O(2N) The time complexity consists of actions of reversing segments of K and finding the Kth node which operates in linear time. Thus, O(N) + O(N) = O(2N), which simplifies to O(N).

// Space Complexity: O(1) The space complexity is O(1) as the algorithm operates in place without any additional space requirements.


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    function reverse(head) {
        let current = head;
        let prev= null;

        while(current) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    function getKthNode(node, k) {
        let temp = node;
        k -= 1;

        while(temp && k > 0) {
            k--;
            temp = temp.next;
        }
        return temp;
    }

    let current = head;
    let prevLast = null;

    while(current) {
        let kthNode = getKthNode(current, k);

        if(!kthNode) {
            if(prevLast) {
                prevLast.next = current;
            }
            break;
        }

        let nextNode = kthNode.next;
        kthNode.next = null;

        let reversedHead = reverse(current);

        if(prevLast) {
            prevLast.next = reversedHead;
        } else {
            head =  reversedHead;
        }

        prevLast = current;
        current = nextNode;
    }
    return head;
};



var reverseKGroup = function(head, k) {
    function reverse(head) {
        let prev = null;
        let current = head;

        while (current) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        return prev;
    }

    function getKthNode(node, k) {
        while (node && k > 1) {
            node = node.next;
            k--;
        }
        return node;
    }

    let dummy = new ListNode(-1);
    dummy.next = head;
    let prevGroupEnd = dummy;

    while (true) {
        let kth = getKthNode(prevGroupEnd.next, k);
        if (!kth) break;

        let groupStart = prevGroupEnd.next;
        let nextGroupStart = kth.next;
        kth.next = null;

        let newGroupHead = reverse(groupStart);
        prevGroupEnd.next = newGroupHead;

        groupStart.next = nextGroupStart;
        prevGroupEnd = groupStart;
    }

    return dummy.next;
};
