/*
=============================================================
Question: BST Iterator (LeetCode 173)
=============================================================

WHAT IS ASKED?
--------------
You are given a Binary Search Tree (BST). Implement an iterator
that walks through the BST in IN-ORDER (Left → Root → Right),
which gives values in ascending sorted order.

You need to implement 3 things:
  1. BSTIterator(root)  → Constructor, initializes the iterator
  2. next()             → Returns the NEXT SMALLEST number
  3. hasNext()          → Returns true if more elements exist

KEY CONSTRAINT: Use only O(h) space (h = height of tree),
NOT O(n) — so you cannot dump all values into an array upfront.

EXAMPLE TREE:
        7
       / \
      3   15
         /  \
        9   20

In-order traversal → [3, 7, 9, 15, 20]

Usage:
  const it = new BSTIterator(root);
  it.next();    // 3
  it.next();    // 7
  it.hasNext(); // true
  it.next();    // 9
  it.next();    // 15
  it.next();    // 20
  it.hasNext(); // false

WHY A STACK?
------------
In-order traversal (Left → Root → Right) is naturally recursive.
To do it iteratively without O(n) memory, we use a stack that
stores only the "pending" nodes on the path to the leftmost node.
At any time, the stack contains at most O(h) nodes.

=============================================================
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// =============================================================
// Solution 1 — Pre-load leftmost chain in constructor
// Time: O(h) constructor, O(1) amortized next(), O(1) hasNext()
// Space: O(h)
// =============================================================
/*
HOW IT WORKS:
- Constructor eagerly pushes the entire leftmost chain onto the stack.
- next() pops the top (current smallest), then pushes the leftmost
  chain of its RIGHT subtree (setting up the next smallest).
- Stack always holds the "frontier" of pending nodes.

DRY RUN (tree above):
  Constructor:  pushLeft(7) → stack = [7, 3]
  next():  pop 3, no right child       → return 3,  stack = [7]
  next():  pop 7, right=15 → pushLeft(15) → stack = [15, 9]
                                        → return 7
  next():  pop 9, no right child       → return 9,  stack = [15]
  next():  pop 15, right=20 → pushLeft(20) → stack = [20]
                                        → return 15
  next():  pop 20, no right child      → return 20, stack = []
  hasNext(): stack.length = 0          → false
*/
class BSTIterator {
    constructor(root) {
        this.st = [];
        this.pushLeft(root); // push all leftmost nodes at start
    }

    // Push the entire left chain starting from node
    pushLeft(node) {
        while (node) {
            this.st.push(node);
            node = node.left;
        }
    }

    // Pop the next smallest node; explore its right subtree
    next() {
        const ans = this.st.pop();
        if (ans.right) {
            this.pushLeft(ans.right); // right subtree's leftmost chain
        }
        return ans.val;
    }

    hasNext() {
        return this.st.length > 0;
    }
}

// =============================================================
// Solution 2 — Lazy evaluation (traversal logic inside next())
// Time: O(h) amortized next(), O(1) hasNext()
// Space: O(h)
// =============================================================
/*
HOW IT WORKS:
- Constructor does nothing — just saves the root pointer.
- next() lazily does the work each time it's called:
    1. Go as far LEFT as possible from current root, pushing to stack.
    2. Pop the top node (current smallest).
    3. Set this.root = popped.right for the next call.
- hasNext() returns true if EITHER this.root exists (unexplored
  subtree) OR the stack has pending nodes.

DRY RUN (tree above):
  Constructor:  root = 7,  stack = []

  next():   root=7: push 7, go left → root=3: push 3, go left → root=null
            pop 3, this.root = 3.right = null  → return 3,  stack=[7]

  next():   root=null: skip loop
            pop 7, this.root = 7.right = 15    → return 7,  stack=[]

  next():   root=15: push 15, go left → root=9: push 9, go left → root=null
            pop 9, this.root = 9.right = null  → return 9,  stack=[15]

  next():   root=null: skip loop
            pop 15, this.root = 15.right = 20  → return 15, stack=[]

  next():   root=20: push 20, go left → root=null
            pop 20, this.root = 20.right = null → return 20, stack=[]

  hasNext(): root=null AND stack=[]              → false

KEY INSIGHT: this.root acts as the "entry point" into the next
unexplored subtree. After popping a node, we set this.root to its
right child. On the NEXT next() call, we drill left from there.
*/
class BSTIteratorLazy {
    constructor(root) {
        this.root = root;   // current unexplored subtree root
        this.stack = [];    // stack starts empty (lazy)
    }

    next() {
        // Go as far left as possible from current root
        while (this.root) {
            this.stack.push(this.root);
            this.root = this.root.left;
        }
        const res = this.stack.pop();   // smallest remaining node
        this.root = res.right;           // next subtree to explore
        return res.val;
    }

    hasNext() {
        // True if there's an unexplored subtree OR stack has pending nodes
        return this.root !== null || this.stack.length > 0;
    }
}

// =============================================================
// Comparison of both approaches:
//
// | Aspect            | Solution 1 (Pre-load)    | Solution 2 (Lazy)        |
// |-------------------|--------------------------|--------------------------|
// | Constructor       | Pushes leftmost chain    | Does nothing             |
// | Stack at start    | [7, 3]                   | []                       |
// | Traversal logic   | pushLeft() + next()      | Entirely inside next()   |
// | hasNext()         | Checks stack only        | Checks root + stack      |
// | Readability       | More modular             | More compact             |
// | Correctness       | ✅                       | ✅                       |
// | Space             | O(h)                     | O(h)                     |
// | next() time       | O(1) amortized           | O(1) amortized           |
//
// Both are correct and efficient. Use whichever feels more natural.
// =============================================================
