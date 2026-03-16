/*
=============================================================
Question: Recover BST (LeetCode 99)
=============================================================

WHAT IS ASKED?
--------------
In a valid BST, in-order traversal always gives a SORTED sequence.
Exactly two nodes had their values swapped by mistake, breaking
the BST property. Recover the tree WITHOUT changing its structure
— just fix the values of those two nodes.

KEY INSIGHT:
------------
In-order traversal of a CORRECT BST is always ascending.
If two nodes are swapped, we see at most TWO "dips" where
  current node < previous node.

  Case 1 (adjacent nodes swapped):     only 1 dip
    e.g.  1 → 3 → 2 → 4 → 5  (3 and 2 swapped)
               ^^^  ← one dip: prev=3, curr=2
    first = node(3),  last = node(2) → swap them back

  Case 2 (non-adjacent nodes swapped): 2 dips
    e.g.  4 → 2 → 3 → 1 → 5  (1 and 4 swapped)
          ^^^         ^^^  ← two dips
    Dip 1: prev=4, curr=2 → first=node(4), last=node(2)
    Dip 2: prev=3, curr=1 →               last=node(1)  (update last)
    Swap first(4) and last(1) → fixed ✅

ALGORITHM:
----------
1. Do in-order traversal, tracking `prev` (last visited node).
2. When curr.val < prev.val (a "dip"):
   - Set first = prev  (only on the FIRST dip)
   - Always update last = curr  (handles both cases)
3. Swap first.val and last.val

Time:  O(n)  — visit every node once
Space: O(h)  — recursion stack (h = height of tree)

=============================================================
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function recoverTree(root) {
    let prev  = null;  // last visited node in in-order
    let first = null;  // left side of first dip  (misplaced node 1)
    let last  = null;  // right side of latest dip (misplaced node 2)

    function inorder(node) {
        if (!node) return;

        inorder(node.left);

        // A "dip": current value is smaller than previous → violation
        if (prev && node.val < prev.val) {
            if (!first) first = prev;  // capture only on first dip
            last = node;               // always update (handles case 2)
        }
        prev = node;

        inorder(node.right);
    }

    inorder(root);

    // Swap the two misplaced node values
    [first.val, last.val] = [last.val, first.val];
}

/*
=============================================================
DRY RUN — CASE 1: Adjacent nodes swapped (3 ↔ 2)
=============================================================

Tree structure (3 and 2 are in wrong positions):
        3          ← should be 2
       / \
      1   4
         / \
        2   5      ← should be 3

In-order visits: 1 → 3 → 2 → 4 → 5

  visit node(1): prev=null → no check.          prev = node(1)
  visit node(3): prev=1, 3 > 1 → no dip.        prev = node(3)
  visit node(2): prev=3, 2 < 3 → DIP!
                 first not set → first = node(3)
                 last = node(2)                  prev = node(2)
  visit node(4): prev=2, 4 > 2 → no dip.        prev = node(4)
  visit node(5): prev=4, 5 > 4 → no dip.

  → first = node(3), last = node(2)
  → Swap: node(3).val = 2, node(2).val = 3 ✅

=============================================================
DRY RUN — CASE 2: Non-adjacent nodes swapped (4 ↔ 1)
=============================================================

In-order after swap: 4 → 2 → 3 → 1 → 5
(originally sorted:  1 → 2 → 3 → 4 → 5)

  visit node(4): prev=null → no check.           prev = node(4)
  visit node(2): prev=4, 2 < 4 → DIP 1!
                 first = node(4)
                 last  = node(2)                  prev = node(2)
  visit node(3): prev=2, 3 > 2 → no dip.         prev = node(3)
  visit node(1): prev=3, 1 < 3 → DIP 2!
                 first already set → skip.
                 last = node(1)   ← updated!      prev = node(1)
  visit node(5): prev=1, 5 > 1 → no dip.

  → first = node(4), last = node(1)
  → Swap: node(4).val = 1, node(1).val = 4 ✅

WHY "always update last" IS THE KEY:
  - Case 1 (1 dip):  last is set once and that's the answer
  - Case 2 (2 dips): last gets updated at dip 2 to the correct node
  - This single rule handles BOTH cases elegantly
=============================================================
*/

