// 142. Linked List Cycle II

// Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

// Do not modify the linked list.

// Example 1:

// Input: head = [3,2,0,-4], pos = 1
// Output: tail connects to node index 1
// Explanation: There is a cycle in the linked list, where tail connects to the second node.
// Example 2:


// Input: head = [1,2], pos = 0
// Output: tail connects to node index 0
// Explanation: There is a cycle in the linked list, where tail connects to the first node.
// Example 3:


// Input: head = [1], pos = -1
// Output: no cycle
// Explanation: There is no cycle in the linked list.
 

// Constraints:

// The number of the nodes in the list is in the range [0, 104].
// -105 <= Node.val <= 105
// pos is -1 or a valid index in the linked-list.
 

// Follow up: Can you solve it using O(1) (i.e. constant) memory?
// https://takeuforward.org/data-structure/starting-point-of-loop-in-a-linked-list/



// TC: O(n), SC: O(n) 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let set = new Set();
    let current = head;

    while(current) {
        if(set.has(current)) {
            return current;
        } else {
            set.add(current);
        }

        current = current.next;
    }
    return null;
};


                            
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
  
  function firstNode(head) {
      // Initialize a slow and fast
      // pointers to the head of the list
      let slow = head;
      let fast = head;
  
      // Phase 1: Detect the loop
      while (fast !== null && fast.next !== null) {
          // Move slow one step
          slow = slow.next;
          // Move fast two steps
          fast = fast.next.next;
  
          // If slow and fast meet,
          // a loop is detected
          if (slow === fast) {
              // Reset the slow pointer
              // to the head of the list
              slow = head;
  
              // Phase 2: Find the first
              // node of the loop
              while (slow !== fast) {
                  // Move slow and fast
                  // one step at a time
                  slow = slow.next;
                  fast = fast.next;
  
                  // When slow and fast meet again,
                   // it's the first node of the loop
              }
  
              // Return the first node of the loop
              return slow;
          }
      }
  
      // If no loop is found, return null
      return null;
  }
  
  // Create a sample linked list
  // with a loop
  const node1 = new Node(1);
  const node2 = new Node(2);
  node1.next = node2;
  const node3 = new Node(3);
  node2.next = node3;
  const node4 = new Node(4);
  node3.next = node4;
  const node5 = new Node(5);
  node4.next = node5;
  
  // Make a loop from node5 to node2
  node5.next = node2;
  
  // Set the head of the linked list
  const head = node1;
  
  // Detect the loop in the linked list
  const loopStartNode = firstNode(head);
  
  if (loopStartNode) {
    console.log("Loop detected. Starting node of the loop is: " + loopStartNode.data);
  } else {
    console.log("No loop detected in the linked list.");
  }
                              
                          