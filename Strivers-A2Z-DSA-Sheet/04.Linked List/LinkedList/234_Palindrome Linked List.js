// 234. Palindrome Linked List

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

 

// Example 1:


// Input: head = [1,2,2,1]
// Output: true
// Example 2:


// Input: head = [1,2]
// Output: false
 

// Constraints:

// The number of nodes in the list is in the range [1, 105].
// 0 <= Node.val <= 9
 

// Follow up: Could you do it in O(n) time and O(1) space?


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if(!head || !head.next) return true; // Because a single-node list is a palindrome

    let slow = head;
    let fast = head;
    let prev = null;

    // start reversing the first half of list
    while(fast && fast.next) {
        fast = fast.next.next;

        // start reversing the list
        let temp = slow.next;
        slow.next = prev;
        prev = slow;
        slow = temp;
    }

    // If the list has an odd number of nodes, skip the middle element
    if (fast) {
        slow = slow.next;
    }

    while(prev && slow) {
        if(prev.val !== slow.val) return false;
        prev = prev.next;
        slow = slow.next;
    }
    
    return true;
};



class Node {
    constructor(data, next = null) {
      this.data = data;
      this.next = next;
    }
  }
  
  // Function to reverse a linked list
  // using the recursive approach
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
  
  // Function to check if a linked list
  // is a palindrome
  function isPalindrome(head) {
      // Check if the linked list is empty
      // or has only one node
      if (head === null || head.next === null) {
          // It's a palindrome by definition
          return true;
      }
  
      // Initialize two pointers, slow and fast, 
      // to find the middle of the linked list
      let slow = head;
      let fast = head;
  
      // Traverse the linked list to find
      // the middle using slow and fast pointers
      while (fast.next !== null && fast.next.next !== null) {
          
          // Move slow pointer one step at a time
          slow = slow.next;
          // Move fast pointer two steps at a time
          fast = fast.next.next;
      }
  
      // Reverse the second half of the
      // linked list starting from the middle
      const newHead = reverseLinkedList(slow.next);
  
      // Pointer to the first half
      let first = head;
  
      // Pointer to the reversed second half
      let second = newHead;
  
      while (second !== null) {
          // Compare data values of nodes from both halves
          if (first.data !== second.data) {
              
              // Reverse the second half
              // back to its original state
              reverseLinkedList(newHead);
              // Not a palindrome
              return false;
          }
          // Move the first pointer
          first = first.next;
          // Move the second pointer
          second = second.next;
      }
  
      // Reverse the second half
      // back to its original state
      reverseLinkedList(newHead);
  
      // The linked list is a palindrome
      return true;
  }
  
  // Function to print the linked list
  function printLinkedList(head) {
      let temp = head;
      while (temp !== null) {
          console.log(temp.data + " ");
          temp = temp.next;
      }
      console.log();
  }
  
  // Main function
  function main() {
      // Create a linked list with values
      // 1, 5, 2, 5, and 1 (15251, a palindrome)
      const head = new Node(1);
      head.next = new Node(5);
      head.next.next = new Node(2);
      head.next.next.next = new Node(5);
      head.next.next.next.next = new Node(1);
  
      // Print the original linked list
      console.log("Original Linked List: ");
      printLinkedList(head);
  
      // Check if the linked list is a palindrome
      if (isPalindrome(head)) {
          console.log("The linked list is a palindrome.");
      } else {
          console.log("The linked list is not a palindrome.");
      }
  }
  
  // Call the main function to start the program
  main();
  
  