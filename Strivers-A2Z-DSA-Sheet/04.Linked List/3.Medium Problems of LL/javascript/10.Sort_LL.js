/*
QUESTION:
Given the head of a linked list, return the list sorted in ascending order.

Example:  Input: [4,2,1,3]  Output: [1,2,3,4]

APPROACH: Merge Sort on Linked List
1. Base case: 0 or 1 node → already sorted, return head.
2. Find middle using slow/fast pointers.
3. Split into two halves (break link at middle).
4. Recursively sort each half.
5. Merge the two sorted halves.

WHY merge sort? Unlike arrays, LL doesn't support random access.
Merge sort is optimal for LL: O(N log N) time, O(log N) stack space.

TIME COMPLEXITY:  O(N log N)
SPACE COMPLEXITY: O(log N)  — recursive call stack
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

// Merge two sorted linked lists
function merge(left, right) {
    if (!left)  return right;
    if (!right) return left;

    if (left.val <= right.val) {
        left.next = merge(left.next, right);
        return left;
    } else {
        right.next = merge(left, right.next);
        return right;
    }
}

// Sort using merge sort
function sortList(head) {
    if (!head || !head.next) return head; // base case

    // Find middle: fast starts one step ahead so slow lands before mid
    let slow = head;
    let fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    const rightHalf = slow.next;
    slow.next = null; // split the list into two halves

    const left  = sortList(head);       // sort left half
    const right = sortList(rightHalf);  // sort right half

    return merge(left, right);          // merge sorted halves
}

// Helpers
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) { curr.next = new ListNode(arr[i]); curr = curr.next; }
    return head;
}
function printLL(head) {
    const r = []; let c = head;
    while (c) { r.push(c.val); c = c.next; }
    console.log(r.join(' -> '));
}

// Driver
printLL(sortList(buildLL([4,2,1,3])));     // 1 -> 2 -> 3 -> 4
printLL(sortList(buildLL([-1,5,3,4,0]))); // -1 -> 0 -> 3 -> 4 -> 5

