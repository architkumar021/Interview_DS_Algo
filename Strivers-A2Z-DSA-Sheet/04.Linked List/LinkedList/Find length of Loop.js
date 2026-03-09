// Find length of Loop

// Given the head of a linked list, determine whether the list contains a loop. If a loop is present, return the number of nodes in the loop, otherwise return 0.

// Note: 'c' is the position of the node which is the next pointer of the last node of the linkedlist. If c is 0, then there is no loop.

// Examples:

// Input: head: 1 → 2 → 3 → 4 → 5, c = 2
// Output: 4
// Explanation: There exists a loop in the linked list and the length of the loop is 4.


class Solution {
    // Function to find the length of a loop in the linked list.
    countNodesinLoop(head) {
        // code here
        let count = 0;
        let slow = head;
        let fast = head;
        let startingNode = null;
        
        while(fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            
            if(slow === fast) {
                slow = head;
                
                while(slow !== fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                startingNode = slow;
                break;
            }
        }
        
        if(startingNode) {
            fast = fast.next
            count = 1;
            
            while(fast !== startingNode) {
                count++;
                fast = fast.next;
            }
        }
        return count;    
    }
}


class Solution {
    // Function to count the number of nodes in the loop of a linked list
    countNodesinLoop(head) {
        let slow = head;
        let fast = head;

        // Step 1: Detect loop using Floyd’s algorithm
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow === fast) {
                // Loop detected, now count the loop length
                return this.countLoopLength(slow);
            }
        }

        // No loop found
        return 0;
    }

    // Helper method to count the length of loop
    countLoopLength(meetingPoint) {
        let current = meetingPoint;
        let count = 1;

        while (current.next !== meetingPoint) {
            current = current.next;
            count++;
        }

        return count;
    }
}
