/*
Question:
Given an array representing preorder traversal of a BST, construct and return the BST root.
Input: [8, 5, 1, 7, 10, 12]  →  Output: BST rooted at 8

─────────────────────────────────────────
APPROACH
─────────────────────────────────────────
Preorder = Root → Left → Right
First element is always the root.
Use a `bound` (upper limit) to decide when to stop building the left subtree
and switch to the right subtree — BST property does this naturally.

For each call:
  - If current value > bound → this value doesn't belong here, return null
  - Otherwise → make it a node, recurse left with bound = node.val (left must be smaller)
                          recurse right with same bound (right must be within parent's limit)

We use a shared `i` index (closure) so each recursive call picks the next element.

Time:  O(N) — each element processed once
Space: O(H) — recursion stack (H = height of BST)

─────────────────────────────────────────
DRY RUN  →  preorder = [8, 5, 1, 7, 10, 12]
─────────────────────────────────────────

build(bound=Infinity) → i=0, val=8  ✅ 8 < ∞  → node(8)
  build(bound=8)      → i=1, val=5  ✅ 5 < 8  → node(5)
    build(bound=5)    → i=2, val=1  ✅ 1 < 5  → node(1)
      build(bound=1)  → i=3, val=7  ❌ 7 > 1  → null   ← 1's left = null
      build(bound=5)  → i=3, val=7  ❌ 7 > 5  → null   ← 1's right = null
    node(1) done ✅
    build(bound=8)    → i=3, val=7  ✅ 7 < 8  → node(7)
      build(bound=7)  → i=4, val=10 ❌ 10 > 7 → null   ← 7's left = null
      build(bound=8)  → i=4, val=10 ❌ 10 > 8 → null   ← 7's right = null
    node(7) done ✅
  node(5): left=1, right=7  ✅
  build(bound=Infinity) → i=4, val=10 ✅ 10 < ∞ → node(10)
    build(bound=10)   → i=5, val=12 ❌ 12 > 10 → null  ← 10's left = null
    build(bound=∞)    → i=5, val=12 ✅ 12 < ∞  → node(12)
      build(bound=12) → i=6, out of bounds     → null
      build(bound=∞)  → i=6, out of bounds     → null
    node(12) done ✅
  node(10): left=null, right=12  ✅
node(8): left=5, right=10  ✅

Final BST:
        8
       / \
      5   10
     / \    \
    1   7   12
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function bstFromPreorder(preorder) {
    let i = 0;

    function build(bound) {
        if (i >= preorder.length || preorder[i] > bound) return null;
        const node = new TreeNode(preorder[i++]);
        node.left  = build(node.val);   // left subtree: values must be < node.val
        node.right = build(bound);      // right subtree: values must be < parent's bound
        return node;
    }

    return build(Infinity);
}
