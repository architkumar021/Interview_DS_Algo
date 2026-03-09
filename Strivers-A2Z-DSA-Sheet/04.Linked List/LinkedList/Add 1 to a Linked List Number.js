// Add 1 to a Linked List Number

// You are given a linked list where each element in the list is a node and have an integer data. You need to add 1 to the number formed by concatinating all the list node numbers together and return the head of the modified linked list. 

// Note: The head represents the first element of the given array.

// Examples :

// Input: LinkedList: 4->5->6
// Output: 457

// Explanation: 4->5->6 represents 456 and when 1 is added it becomes 457. 
// Input: LinkedList: 1->2->3
// Output: 124
 
// Explanation:  1->2->3 represents 123 and when 1 is added it becomes 124. 
// Expected Time Complexity: O(n)
// Expected Auxiliary Space: O(1)

// Constraints:
// 1 <= len(list) <= 105
// 0 <= list[i] <= 9

// Definition for singly-linked list node
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Reverses a singly linked list.
 * @param {ListNode} head - Head of the list to reverse
 * @return {ListNode} - New head after reversing
 */
function reverseList(head) {
    let prev = null;
    let curr = head;

    // Iteratively reverse the linked list
    while (curr) {
        let next = curr.next; // store next node
        curr.next = prev;     // reverse the link
        prev = curr;          // move prev forward
        curr = next;          // move curr forward
    }

    return prev; // new head after reversal
}

/**
 * Adds one to the number represented by the linked list
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of the new list after adding one
 */
function addOne(head) {
    // Step 1: Reverse the list to make addition easier (from least significant digit)
    head = reverseList(head);

    let curr = head;
    let carry = 1; // Start with carry = 1 because we need to add 1

    // Step 2: Traverse the list and add the carry
    while (curr && carry) {
        let sum = curr.val + carry;
        curr.val = sum % 10; // update current node value
        carry = Math.floor(sum / 10); // compute new carry

        // If we've reached the end and still have carry, add a new node
        if (!curr.next && carry) {
            curr.next = new ListNode(carry);
            carry = 0; // carry is now handled
        }

        curr = curr.next; // move to next node
    }

    // Step 3: Reverse the list back to original order
    return reverseList(head);
}


// Helper function to create linked list from array
function createList(arr) {
    let dummy = new ListNode(-1);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Helper function to print linked list
function printList(head) {
    let res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    console.log(res.join(" → "));
}

// Example: 1 → 9 → 9 → 9
let head = createList([1, 9, 9, 9]);
let newHead = addOne(head); // should return 2 → 0 → 0 → 0
printList(newHead);
