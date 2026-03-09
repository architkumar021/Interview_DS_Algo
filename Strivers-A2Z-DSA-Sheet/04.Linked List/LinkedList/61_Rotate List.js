// 61. Rotate List

// Given the head of a linked list, rotate the list to the right by k places.

 

// Example 1:


// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]
// Example 2:


// Input: head = [0,1,2], k = 4
// Output: [2,0,1]
 

// Constraints:

// The number of nodes in the list is in the range [0, 500].
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 109

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if(!head) return head;

    function reverse(head) {
        let current = head;
        let prev = null;

        while(current) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    function getKthNode(node, k) {
        let current = node;
        k -= 1;

        while(current && k > 0) {
            k--;
            current = current.next;
        }
        return current;
    }

    let current = head;
    let length = 0
    
    while(current) {
        length++;
        current = current.next;
    }

    k %= length;

    if(k === 0) return head;

    current = head;

    let allReversed = reverse(current);

    let kthNode = getKthNode(allReversed, k);

    let kthNext = kthNode.next;
    kthNode.next = null;


    let startToKthReversed = reverse(allReversed);
    let kthToEndReversed = reverse(kthNext);

    head = startToKthReversed;
    current = head;

    while(current.next) {
        current = current.next;
    }

    current.next = kthToEndReversed;

    return head;
};

// ✅ Optimized Code (No Reverse, More Efficient):

var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;

    // Step 1: Compute length of the list
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // Step 2: Normalize k
    k = k % length;
    if (k === 0) return head;

    // Step 3: Find new tail (length - k)th node
    let newTailPos = length - k;
    let newTail = head;
    for (let i = 1; i < newTailPos; i++) {
        newTail = newTail.next;
    }

    // Step 4: Set new head and rearrange pointers
    let newHead = newTail.next;
    newTail.next = null;
    tail.next = head;

    return newHead;
};