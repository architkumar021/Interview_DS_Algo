/*
QUESTION:
A linked list where each node has a val, next pointer, and a random pointer
(which can point to any node or null). Construct a DEEP COPY of the list.

Example:
  Input:  [[7,null],[13,0],[11,4],[10,2],[1,0]]
  Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]  (entirely new nodes)

APPROACH: Interleaving (O(1) extra space, 3 passes)
Pass 1 — Insert clones between originals:
  1 -> 1' -> 2 -> 2' -> 3 -> 3' -> ...
  (clone of each node inserted right after it)

Pass 2 — Set random pointers on clones:
  orig.next.random = orig.random.next
  (clone's random = clone of original's random)

Pass 3 — Separate the two lists:
  Restore original list, extract clone list.

WHY interleaving? No extra HashMap needed — position of clone
relative to original gives us O(1) random pointer resolution.

TIME COMPLEXITY:  O(N) — three passes
SPACE COMPLEXITY: O(1) extra (output deep-copy itself is O(N))
*/

class Node {
    constructor(val, next = null, random = null) {
        this.val    = val;
        this.next   = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    if (!head) return null;

    // Pass 1: interleave clones
    let orig = head;
    while (orig) {
        const clone  = new Node(orig.val);
        clone.next   = orig.next;   // clone points to orig's next
        orig.next    = clone;       // orig points to clone
        orig         = clone.next;  // advance to original next node
    }

    // Pass 2: set random pointers on clones
    orig = head;
    while (orig) {
        if (orig.random) {
            orig.next.random = orig.random.next; // clone's random = clone of orig's random
        }
        orig = orig.next.next; // skip clone, move to next original
    }

    // Pass 3: separate original and cloned lists
    orig = head;
    const cloneHead = head.next;
    let clone = cloneHead;

    while (orig) {
        orig.next  = clone.next;          // restore original's next
        orig       = orig.next;           // advance original
        if (orig) clone.next = orig.next; // clone points to next clone
        clone      = clone.next;          // advance clone
    }

    return cloneHead;
}

// Helpers — build list from [[val, randomIdx], ...]
function buildRandomList(arr) {
    if (!arr.length) return null;
    const nodes = arr.map(([val]) => new Node(val));
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].next   = nodes[i + 1] ?? null;
        nodes[i].random = arr[i][1] !== null ? nodes[arr[i][1]] : null;
    }
    return nodes[0];
}
function printRandomList(head) {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(`[${curr.val}, ${curr.random ? curr.random.val : 'null'}]`);
        curr = curr.next;
    }
    console.log(result.join(' -> '));
}

// Driver
const original = buildRandomList([[7,null],[13,0],[11,4],[10,2],[1,0]]);
const deepCopy  = copyRandomList(original);
console.log('Original:  '); printRandomList(original);
console.log('Deep Copy: '); printRandomList(deepCopy);
console.log('Are different objects?', original !== deepCopy); // true

