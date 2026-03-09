/*
QUESTION:
Two non-empty linked lists represent two non-negative integers.
Digits are stored in REVERSE order (head = least significant digit).
Add the two numbers and return the sum as a linked list.

Example:
  Input:  l1 = [2,4,3] (342),  l2 = [5,6,4] (465)
  Output: [7,0,8]  (807)

APPROACH: Simultaneous traversal with carry
- Walk both lists together; at each step:
    sum = l1.val + l2.val + carry
    new digit = sum % 10
    carry = Math.floor(sum / 10)
- If one list is shorter, treat its remaining digits as 0.
- After both lists exhausted, append remaining carry if any.
- Use a dummy head node to simplify result list construction.

TIME COMPLEXITY:  O(max(N, M))
SPACE COMPLEXITY: O(max(N, M))  — result list length
*/

class ListNode {
    constructor(val) { this.val = val; this.next = null; }
}

function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0); // dummy head for easy construction
    let ans   = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        let sum = carry;

        if (l1) { sum += l1.val; l1 = l1.next; }
        if (l2) { sum += l2.val; l2 = l2.next; }

        ans.next = new ListNode(sum % 10); // current digit
        carry    = Math.floor(sum / 10);   // carry for next position
        ans      = ans.next;
    }

    return dummy.next; // skip dummy head
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
printLL(addTwoNumbers(buildLL([2,4,3]), buildLL([5,6,4]))); // 7 -> 0 -> 8  (342+465=807)
printLL(addTwoNumbers(buildLL([9,9,9,9,9,9,9]), buildLL([9,9,9,9]))); // 8->9->9->9->0->0->0->1
printLL(addTwoNumbers(buildLL([0]), buildLL([0])));          // 0

