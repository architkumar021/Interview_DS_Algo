/*
QUESTION:
Given a SORTED doubly linked list of distinct positive integers, find all pairs
whose sum equals a given target.

Example 1:
  Input:  1 <-> 2 <-> 4 <-> 5 <-> 6 <-> 8 <-> 9,  target = 7
  Output: [[1,6], [2,5]]

Example 2:
  Input:  1 <-> 5 <-> 6,  target = 6
  Output: [[1,5]]

APPROACH: Two Pointers (start from head & tail)
- start pointer at head (smallest value).
- end pointer at tail (largest value).
- While start.data < end.data:
    sum = start.data + end.data
    sum === target → record pair, move BOTH inward
    sum  <  target → move start forward (need bigger value)
    sum  >  target → move end backward  (need smaller value)

WHY this works: list is sorted → two-pointer converges correctly.

TIME COMPLEXITY:  O(N) — single pass after finding tail
SPACE COMPLEXITY: O(1) extra (O(P) for output where P = pairs found)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function findPairsWithGivenSum(head, target) {
    const result = [];

    // Find tail (end pointer)
    let end = head;
    while (end.next) end = end.next;

    let start = head;

    while (start.data < end.data) {
        const sum = start.data + end.data;

        if (sum === target) {
            result.push([start.data, end.data]); // found a valid pair
            start = start.next;
            end   = end.prev;
        } else if (sum < target) {
            start = start.next; // need larger sum → move start right
        } else {
            end = end.prev;     // need smaller sum → move end left
        }
    }

    return result;
}

// Helpers
function buildDLL(arr) {
    if (!arr.length) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        const n = new Node(arr[i]);
        n.prev = curr; curr.next = n; curr = n;
    }
    return head;
}

// Driver
let head = buildDLL([1, 2, 4, 5, 6, 8, 9]);
console.log(findPairsWithGivenSum(head, 7));  // [ [1,6], [2,5] ]

head = buildDLL([1, 5, 6]);
console.log(findPairsWithGivenSum(head, 6));  // [ [1,5] ]

head = buildDLL([1, 2, 3, 4, 5]);
console.log(findPairsWithGivenSum(head, 6));  // [ [1,5], [2,4] ]

