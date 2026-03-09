/*
QUESTION:
Given the head of a singly linked list, return true if it is a palindrome, false otherwise.

Example 1:  Input: [1,2,2,1]  Output: true
Example 2:  Input: [1,2]      Output: false

APPROACH: Find Middle → Reverse Second Half → Compare
1. Find middle using slow/fast pointers.
2. Reverse the second half starting from slow.
3. Compare first half (head) with reversed second half node by node.
4. If all values match → palindrome.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function reverseLL(start) {
    let prev = null;
    let curr = start;
    while (curr) {
        const frwd = curr.next;
        curr.next = prev;
        prev = curr;
        curr = frwd;
    }
    return prev;
}

function isPalindrome(head) {
    let slow = head;
    let fast = head;

    // Step 1: find middle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: reverse second half
    let reversedHalf = reverseLL(slow);

    // Step 3: compare both halves
    let left = head;
    let right = reversedHalf;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}

// Helpers
function buildLL(arr) {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) { curr.next = new ListNode(arr[i]); curr = curr.next; }
    return head;
}

// Driver
console.log(isPalindrome(buildLL([1,2,2,1]))); // true
console.log(isPalindrome(buildLL([1,2])));      // false
console.log(isPalindrome(buildLL([1,2,3,2,1]))); // true

