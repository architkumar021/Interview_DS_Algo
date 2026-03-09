// Sort a linked list of 0s, 1s and 2s

// Given the head of a linked list where nodes can contain values 0s, 1s, and 2s only. Your task is to rearrange the list so that all 0s appear at the beginning, followed by all 1s, and all 2s are placed at the end.

// Examples:

// Input: head = 1 → 2 → 2 → 1 → 2 → 0 → 2 → 2

// Output: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2

// Explanation: All the 0s are segregated to the left end of the linked list, 2s to the right end of the list, and 1s in between.
// Input: head = 2 → 2 → 0 → 1

// Output: 0 → 1 → 2 → 2

// Explanation: After arranging all the 0s, 1s and 2s in the given format, the output will be 0 → 1 → 2 → 2.
// Constraints:
// 1 ≤ no. of nodes ≤ 106
// 0 ≤ node->data ≤ 2



/* class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
} */

/**
 * @param {Node} head
 * @returns {Node}
 */
/*

class Solution {
    segregate(head) {
        // code here
        let dummy0Node = new Node(-1);
        let temp0 = dummy0Node;
        
        let dummy1Node = new Node(-1);
        let temp1 = dummy1Node;
        
        let dummy2Node = new Node(-1);
        let temp2 = dummy2Node;
        
        let temp = head;
        while(temp) {
            if(temp.data === 0) {
                temp0.next = temp;
                temp0 = temp0.next;
            } else if (temp.data === 1) {
                temp1.next = temp;
                temp1 = temp1.next;
            } else if(temp.data === 2) {
                temp2.next = temp;
                temp2 = temp2.next;
            }
            temp = temp.next;
        }
        
        temp2.next = null;
        temp1.next = dummy2Node.next;
        temp0.next = dummy1Node.next;
        
        return dummy0Node.next;
    }
}

// TC: O(n)
// SC: O(n)
*/


// ✅ Optimized Approach (Counting Sort):
// Idea:
// Count the number of 0s, 1s, and 2s in a single traversal.

// Modify the list by assigning values back in the correct order during a second traversal.

// 💡 Benefits:
// ✅ No need to manipulate next pointers (safer and simpler).

// ✅ Only O(N) time and O(1) space.

// ✅ No need for dummy nodes or auxiliary lists.

class Solution {
    segregate(head) {
        // Step 1: Count occurrences of 0s, 1s, and 2s
        let count = [0, 0, 0]; // count[0] -> zeros, count[1] -> ones, count[2] -> twos
        let current = head;

        while (current) {
            count[current.data]++;
            current = current.next;
        }

        // Step 2: Rewrite values in original list
        current = head;
        let i = 0;

        while (current) {
            // If count[i] is 0, move to next i (i.e., next value 0 → 1 → 2)
            if (count[i] === 0) {
                i++;
            } else {
                current.data = i; // Set current node's data to i
                count[i]--;       // Decrease the count
                current = current.next;
            }
        }

        return head;
    }
}