// 206. Reverse Linked List

// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example 1:


// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:


// Input: head = [1,2]
// Output: [2,1]
// Example 3:

// Input: head = []
// Output: []
 

// Constraints:

// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000
 

// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?




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
  
  // Function to print the linked list
  function printLinkedList(head) {
    let temp = head;
    while (temp !== null) {
      process.stdout.write(temp.data + ' ');
      temp = temp.next;
    }
    console.log();
  }
  
  // Create a linked list with
  // values 1, 3, 2, and 4
  const head = new Node(1);
  head.next = new Node(3);
  head.next.next = new Node(2);
  head.next.next.next = new Node(4);
  
  // Print the original linked list
  process.stdout.write('Original Linked List: ');
  printLinkedList(head);
  
  // Reverse the linked list
  reverseLinkedList(head);
  
  // Print the reversed linked list
  process.stdout.write('Reversed Linked List: ');
  printLinkedList(head);
  

// Recursive Approach

  class Node {
    constructor(data, next = null) {
      this.data = data;
      this.next = next;
    }
  }
  
  // Function to reverse a singly
  // linked list using a recursion
  function reverseLinkedList(head) {
      // Base case:
      // If the linked list is empty or has only one node,
      // return the head as it is already reversed.
      if (head === null || head.next === null) {
          return head;
      }
      
      // Recursive step:
      // Reverse the linked list starting
      // from the second node (head.next).
      var newHead = reverseLinkedList(head.next);
      
      // Save a reference to the node following
      // the current 'head' node.
      var front = head.next;
      
      // Make the 'front' node point to the current
      // 'head' node in the reversed order.
      front.next = head;
      
      // Break the link from the current 'head' node
      // to the 'front' node to avoid cycles.
      head.next = null;
      
      // Return the 'newHead,' which is the new
      // head of the reversed linked list.
      return newHead;
  }
  
  
  // Function to print the linked list
  function printLinkedList(head) {
    let temp = head;
    while (temp !== null) {
      process.stdout.write(temp.data + ' ');
      temp = temp.next;
    }
    console.log();
  }
  
  // Create a linked list with
  // values 1, 3, 2, and 4
  const head = new Node(1);
  head.next = new Node(3);
  head.next.next = new Node(2);
  head.next.next.next = new Node(4);
  
  // Print the original linked list
  process.stdout.write('Original Linked List: ');
  printLinkedList(head);
  
  // Reverse the linked list
  reverseLinkedList(head);
  
  // Print the reversed linked list
  process.stdout.write('Reversed Linked List: ');
  printLinkedList(head);
  
  
    

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
var reverseList = function(head) {
    let current = head;
    let prev = null;

    while(current) {
        let temp = current.next;
        current.next = prev;
        prev = current;
        current = temp;
    }
    return prev;
};

// TC: O(n)
// SC: O(1)