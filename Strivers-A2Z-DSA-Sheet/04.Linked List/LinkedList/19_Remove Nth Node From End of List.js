// 19. Remove Nth Node From End of List

// Given the head of a linked list, remove the nth node from the end of the list and return its head.

 

// Example 1:


// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
// Example 2:

// Input: head = [1], n = 1
// Output: []
// Example 3:

// Input: head = [1,2], n = 1
// Output: [1]
 

// Constraints:

// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz
 

// Follow up: Could you do this in one pass?

// 2 pass solution
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if (!head) return head;

    let length = 0;
    let current = head;

    while (current) {
        length++;
        current = current.next;
    }

    let nodeFromStart = length - n + 1;

    // Edge case: remove the head
    if (nodeFromStart === 1) {
        return head.next;
    }

    current = head;
    let count = 1;

    while (current) {
        if (count + 1 === nodeFromStart) {
            current.next = current.next.next;
            break;
        }
        current = current.next;
        count++;
    }

    return head;
};

// 1 pass solution
// 

var removeNthFromEnd = function(head, n) {
    // Edge case: if the list is empty or has only one node,
    // removing the nth node from the end means returning null
    if (!head || !head.next) return head.next;

    // Initialize two pointers at the start of the list
    let slow = head;
    let fast = head;

    // Move the `fast` pointer `n` steps ahead
    // This creates a gap of `n` between `slow` and `fast`
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    // If `fast` is null after moving `n` steps, it means
    // we need to remove the head node (n == length of list)
    if (!fast) return head.next;

    // Move both `slow` and `fast` one step at a time
    // until `fast` reaches the last node
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    // Now `slow` is just before the node to remove
    // Skip the target node by pointing to the next-next node
    slow.next = slow.next.next;

    // Return the (possibly unchanged) head of the list
    return head;
};


// Another solution:  Add a dummy node before the head to simplify edge case handling (especially head removal).
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    // Move fast n+1 steps ahead so that slow is right before the target node
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }

    // Skip the target node
    slow.next = slow.next.next;

    return dummy.next;
};
