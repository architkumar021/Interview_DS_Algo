/*
QUESTION:
Given a linked list where every node has two pointers:
  - next   → points to the next node at the same level
  - bottom → points to a sub-linked-list (sorted) below it
All sub-linked-lists are sorted. Flatten the entire structure into a single
sorted list using the bottom pointer.

Example:
  Input:
    5 -> 10 -> 19 -> 28
    |     |     |     |
    7    20    22    35
    |          |     |
    8         50    40
    |               |
   30              45

  Output (via bottom): 5->7->8->10->19->20->22->28->30->35->40->45->50

APPROACH: Recursion + Merge (right to left)
1. Recursively flatten the rest of the list (root.next).
2. Merge the current column (root) with the flattened right result.
3. Merge is done bottom-pointer-based (like merge of two sorted lists).
4. Disconnect root.next = null after merging to keep clean structure.

WHY right-to-left? When we flatten from right, each merge produces
a single sorted bottom-chain that we can directly merge with the left.

TIME COMPLEXITY:  O(N * M) where N = nodes in main chain, M = avg bottom depth
SPACE COMPLEXITY: O(N) — recursion stack depth = length of main chain
*/

class Node {
    constructor(data) {
        this.data   = data;
        this.next   = null;
        this.bottom = null;
    }
}

// Merge two sorted bottom-linked lists
function mergeSorted(head1, head2) {
    if (!head1) return head2;
    if (!head2) return head1;

    if (head1.data <= head2.data) {
        head1.bottom = mergeSorted(head1.bottom, head2);
        return head1;
    } else {
        head2.bottom = mergeSorted(head1, head2.bottom);
        return head2;
    }
}

function flatten(root) {
    if (!root) return root;

    // Recursively flatten the right part first
    const right = flatten(root.next);
    root.next = null; // disconnect horizontal link

    // Merge current column with flattened right
    return mergeSorted(root, right);
}

// Helpers
function buildFlatLL(structure) {
    // structure = [[col1vals], [col2vals], ...]
    // Returns head of the main chain (next-linked),
    // each col is bottom-linked.
    const colHeads = structure.map(col => {
        const colHead = new Node(col[0]);
        let curr = colHead;
        for (let i = 1; i < col.length; i++) {
            curr.bottom = new Node(col[i]); curr = curr.bottom;
        }
        return colHead;
    });
    for (let i = 0; i < colHeads.length - 1; i++) {
        colHeads[i].next = colHeads[i + 1];
    }
    return colHeads[0];
}
function printFlatLL(head) {
    const r = []; let c = head;
    while (c) { r.push(c.data); c = c.bottom; }
    console.log(r.join(' -> '));
}

// Driver
const head = buildFlatLL([
    [5, 7, 8, 30],
    [10, 20],
    [19, 22, 50],
    [28, 35, 40, 45]
]);
printFlatLL(flatten(head));
// 5 -> 7 -> 8 -> 10 -> 19 -> 20 -> 22 -> 28 -> 30 -> 35 -> 40 -> 45 -> 50

