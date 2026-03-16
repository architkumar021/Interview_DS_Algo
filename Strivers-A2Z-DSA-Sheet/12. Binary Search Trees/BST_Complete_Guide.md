# 🌳 Binary Search Tree — Complete Guide

> A quick-reference guide covering everything about BSTs: concepts, properties, patterns, tricks, and all problems with solutions and dry runs.

---

## 📚 Table of Contents

1. [What is a BST?](#1-what-is-a-bst)
2. [BST Properties & Rules](#2-bst-properties--rules)
3. [BST vs Binary Tree](#3-bst-vs-binary-tree)
4. [Core Operations & Complexity](#4-core-operations--complexity)
5. [The Golden Rule — In-Order = Sorted](#5-the-golden-rule--in-order--sorted)
6. [Key Patterns & Tricks](#6-key-patterns--tricks)
7. [Concept Problems](#7-concept-problems)
   - [Validate BST (in-order array check)](#71-validate-bst-in-order-array-check)
   - [Search in BST](#72-search-in-bst)
   - [Minimum Value in BST](#73-minimum-value-in-bst)
8. [Practice Problems](#8-practice-problems)
   - [Ceil in BST](#81-ceil-in-bst)
   - [Floor in BST](#82-floor-in-bst)
   - [Insert into BST](#83-insert-into-bst)
   - [Delete from BST](#84-delete-from-bst)
   - [Kth Smallest / Kth Largest Element](#85-kth-smallest--kth-largest-element)
   - [Validate BST (range-based)](#86-validate-bst-range-based)
   - [LCA in BST](#87-lca-in-bst)
   - [Build BST from Preorder Traversal](#88-build-bst-from-preorder-traversal)
   - [BST Iterator](#89-bst-iterator)
   - [Two Sum in BST](#810-two-sum-in-bst)
   - [Recover BST](#811-recover-bst)
   - [Largest BST in Binary Tree](#812-largest-bst-in-binary-tree)
   - [Inorder Successor & Predecessor](#813-inorder-successor--predecessor)
   - [Balance a BST](#814-balance-a-bst)
9. [Common Mistakes](#9-common-mistakes)
10. [Interview Cheat Sheet](#10-interview-cheat-sheet)

---

## 1. What is a BST?

A **Binary Search Tree** is a binary tree where every node satisfies:

```
All values in LEFT subtree  <  Node value  <  All values in RIGHT subtree
```

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

- `1, 3, 4, 6, 7` are all **less than** 8 → in left subtree ✅
- `10, 13, 14` are all **greater than** 8 → in right subtree ✅
- This rule holds **at every node**, not just the root

---

## 2. BST Properties & Rules

| Property | Description |
|---|---|
| **Ordering** | left < root < right at **every** node |
| **No duplicates** | Standard BSTs have unique values |
| **In-order = sorted** | In-order traversal always gives ascending order |
| **Height** | O(log N) for balanced, O(N) for skewed (worst case) |
| **Min value** | Always at the **leftmost** node |
| **Max value** | Always at the **rightmost** node |
| **Search** | O(H) — go left if smaller, go right if larger |

### ⚠️ The Subtree Rule (Tricky!)

The BST condition is NOT just `left.val < root.val < right.val` at each node.
It must hold for the **entire subtree**.

```
      10
     /  \
    5    15
   / \
  1   12    ← 12 > 10, but it's in the left subtree of 10!
             This is INVALID BST even though 12 > 5
```

This is why we validate with a **range [min, max]**, not just comparing neighbors.

---

## 3. BST vs Binary Tree

| Feature | Binary Tree | BST |
|---|---|---|
| Structure rule | None | left < root < right |
| In-order traversal | Random | Always sorted ↑ |
| Search | O(N) | O(H) |
| Insert | O(1) with pointer | O(H) |
| Delete | Complex | O(H) |
| Find min/max | O(N) | O(H) — just go left/right |
| LCA | O(N) complex | O(H) simple comparison |

---

## 4. Core Operations & Complexity

| Operation | Average (Balanced) | Worst (Skewed) |
|---|---|---|
| Search | O(log N) | O(N) |
| Insert | O(log N) | O(N) |
| Delete | O(log N) | O(N) |
| Min / Max | O(log N) | O(N) |
| Floor / Ceil | O(log N) | O(N) |
| In-order traversal | O(N) | O(N) |
| Space (recursion) | O(log N) | O(N) |

> **H = height of BST** = O(log N) for balanced, O(N) for skewed.
> All BST operations are O(H).

---

## 5. The Golden Rule — In-Order = Sorted

> 🔑 **The single most important BST fact for interviews:**
> **In-order traversal (Left → Root → Right) of a BST always gives values in ascending sorted order.**

This one property is the foundation of almost every BST problem:

```
        5
       / \
      3   7
     / \   \
    2   4   8

In-order: 2 → 3 → 4 → 5 → 7 → 8  (sorted!) ✅
```

### How This Property Gets Used in Problems

| Problem | How in-order helps |
|---|---|
| Validate BST | Check if in-order is sorted |
| Kth smallest | Count nodes during in-order |
| Kth largest | Reverse in-order (Right → Root → Left) |
| Recover BST | Find "dips" in in-order sequence |
| Balance BST | In-order → array → build from middle |
| Two Sum in BST | Two-pointer on in-order iterator |

---

## 6. Key Patterns & Tricks

### Pattern 1 — Range Narrowing (Search / Insert / Delete)
Every BST operation follows the same pattern:
```
if val < root.val  →  go LEFT
if val > root.val  →  go RIGHT
if val === root.val →  found it!
```

### Pattern 2 — Track a Candidate (Floor / Ceil / Successor / Predecessor)
When you need "closest value", track the last valid candidate as you traverse:
```js
// Ceil (smallest value >= x):
if root.val >= x → candidate! save it, go LEFT to find something smaller
if root.val < x  → go RIGHT (current too small)
```

### Pattern 3 — Range Bounds for Validation
Pass `[min, max]` bounds down the tree. Each node must lie within:
```js
solve(root, -Infinity, Infinity)
  → left child: solve(left, min, root.val)   // left must be < root
  → right child: solve(right, root.val, max) // right must be > root
```

### Pattern 4 — Inorder + Counter (Kth Element)
```js
// Global counter + early exit
let cnt = 0, ans = -1;
function inorder(node) {
    if (!node || ans !== -1) return;
    inorder(node.left);
    if (++cnt === k) { ans = node.val; return; }
    inorder(node.right);
}
```

### Pattern 5 — Bottom-Up Info Passing (Largest BST)
Return `{ size, min, max }` from each subtree to make decisions at parent:
```
null → { size:0, min:Infinity, max:-Infinity }  (neutral values)
valid BST node → { size: l+r+1, min: leftMin, max: rightMax }
invalid → { size: max(l,r), min:-Infinity, max:Infinity }  (poison)
```

### Pattern 6 — Two Iterators (Two Sum in BST)
Use two BST iterators — one going forward (next smallest), one going backward (next largest) — just like the two-pointer technique on a sorted array.

### Pattern 7 — Delete with Predecessor/Successor
When deleting a node with two children:
- **Predecessor** = rightmost node of left subtree (largest value < node)
- **Successor** = leftmost node of right subtree (smallest value > node)
- Either works — copy its value, then delete it from its subtree

### Pattern 8 — Build Balanced BST
> 🔑 Whenever you see: *"balance a BST"*, *"height-balanced BST"*, *"convert skewed BST"*
```
Step 1: In-order traversal → sorted array
Step 2: Build BST using middle element of array as root (recursively)
```

---

## 7. Concept Problems

### 7.1 Validate BST (in-order array check)

**Question:** Given an array representing in-order traversal, check if it's a valid BST.

**Key Insight:** In-order of a valid BST must be strictly increasing.

```js
function isValidBST(order) {
    for (let i = 1; i < order.length; i++) {
        if (order[i - 1] >= order[i]) return false;
    }
    return true;
}
```
- **Time:** O(N) | **Space:** O(1)

---

### 7.2 Search in BST

**Question:** Find the node with a given value. Return the subtree rooted there, or null.

**Key Insight:** BST property eliminates half the tree at each step.

```js
function searchBST(root, val) {
    if (!root || root.val === val) return root;
    return val < root.val
        ? searchBST(root.left, val)
        : searchBST(root.right, val);
}
```

**Dry Run:**
```
Tree:       4
           / \
          2   7
         / \
        1   3

Search for val = 2
  root=4, 2 < 4  → go left
  root=2, 2 === 2 → return node(2) ✅
```
- **Time:** O(H) | **Space:** O(H) recursion stack

---

### 7.3 Minimum Value in BST

**Question:** Find the minimum value in a BST.

**Key Insight:** Minimum is always at the **leftmost** node.

```js
function minVal(root) {
    if (!root) return -1;
    while (root.left) root = root.left;
    return root.data;
}
```
Similarly, **maximum** = keep going **right** until no right child.

- **Time:** O(H) | **Space:** O(1)

---

## 8. Practice Problems

### 8.1 Ceil in BST

**Question:** Find the **smallest value ≥ X** in BST. Return -1 if not found.

**Trick:** When `root.val >= x`, it's a **candidate** — save it, then go left to find smaller valid value. When `root.val < x`, go right.

```js
function findCeil(root, x) {
    let ceil = -1;
    while (root) {
        if (root.data === x) return x;
        if (root.data > x) {
            ceil = root.data;   // candidate — go left for something smaller
            root = root.left;
        } else {
            root = root.right;  // too small — go right
        }
    }
    return ceil;
}
```

**Dry Run:**
```
Tree:    8
        / \
       4   12
      / \    \
     2   6    14

Find Ceil(7):
  root=8,  8 > 7  → ceil=8,  go left
  root=4,  4 < 7  → go right
  root=6,  6 < 7  → go right
  root=null → stop
  Ceil = 8 ✅
```
- **Time:** O(H) | **Space:** O(1)

---

### 8.2 Floor in BST

**Question:** Find the **greatest value ≤ X** in BST. Return -1 if not found.

**Trick:** Mirror of ceil — when `root.val <= x`, it's a **candidate**, go right for something larger but still ≤ x.

```js
function findFloor(root, x) {
    let ans = -1;
    while (root) {
        if (root.data === x) return root.data;
        if (root.data < x) {
            ans = root.data;    // candidate — go right for something larger
            root = root.right;
        } else {
            root = root.left;   // too large — go left
        }
    }
    return ans;
}
```

**Dry Run:**
```
Find Floor(7) in same tree above:
  root=8,  8 > 7  → go left
  root=4,  4 < 7  → ans=4, go right
  root=6,  6 < 7  → ans=6, go right
  root=null → stop
  Floor = 6 ✅
```
- **Time:** O(H) | **Space:** O(1)

---

### 8.3 Insert into BST

**Question:** Insert a value into BST, return updated root.

**Key Insight:** Traverse to the correct null position using BST property, create a new node there.

```js
function insertIntoBST(root, val) {
    if (!root) return new TreeNode(val);   // found the empty spot
    if (root.val < val) root.right = insertIntoBST(root.right, val);
    else                root.left  = insertIntoBST(root.left, val);
    return root;
}
```

**Dry Run:**
```
Insert 5 into:    4
                 / \
                2   7

  root=4, 5 > 4 → go right
  root=7, 5 < 7 → go left
  root=null → create node(5), return it
  node(7).left = node(5)

Result:   4
         / \
        2   7
           /
          5  ✅
```
- **Time:** O(H) | **Space:** O(H)

---

### 8.4 Delete from BST

**Question:** Delete a node with a given key, return updated root.

**Three Cases:**

| Case | Condition | Action |
|---|---|---|
| Leaf node | No children | Return null |
| One child | Only left or right child | Return the existing child |
| Two children | Both children exist | Replace with in-order predecessor (or successor), delete that |

```js
function deleteNode(root, key) {
    if (!root) return null;

    if (key < root.val)       root.left  = deleteNode(root.left, key);
    else if (key > root.val)  root.right = deleteNode(root.right, key);
    else {
        if (!root.left && !root.right) return null;       // Case 1: leaf
        if (!root.left)  return root.right;               // Case 2: only right
        if (!root.right) return root.left;                // Case 2: only left

        // Case 3: two children — find in-order predecessor
        let temp = root.left;
        while (temp.right) temp = temp.right;             // rightmost of left subtree
        root.val  = temp.val;                             // copy predecessor value
        root.left = deleteNode(root.left, temp.val);      // delete predecessor
    }
    return root;
}
```

**Dry Run (delete node 3):**
```
      5
     / \
    3   6
   / \    \
  2   4    7

deleteNode(5, 3):  3 < 5 → go left
  deleteNode(3, 3): found!
    Has two children → find predecessor
    Go left → node(2), go right → null → predecessor = node(2)
    Copy 2 into node → node becomes 2
    deleteNode(left=2, 2): leaf → return null
    Result: { val:2, left:null, right:4 }

Final tree:
      5
     / \
    2   6
     \    \
      4    7  ✅
```
- **Time:** O(H) | **Space:** O(H)

---

### 8.5 Kth Smallest / Kth Largest Element

**Question:** Find the kth smallest (or largest) value in a BST.

**Key Insight:**
- **Kth smallest** → in-order traversal (L→Root→R) gives ascending order → count to k
- **Kth largest** → reverse in-order (R→Root→L) gives descending order → count to k

```js
function kthSmallest(root, k) {
    let cnt = 0, ans = -1;
    function inorder(node) {
        if (!node || ans !== -1) return;  // early exit
        inorder(node.left);
        if (++cnt === k) { ans = node.val; return; }
        inorder(node.right);
    }
    inorder(root);
    return ans;
}

function kthLargest(root, k) {
    let cnt = 0, ans = -1;
    function reverseInorder(node) {
        if (!node || ans !== -1) return;
        reverseInorder(node.right);        // go right first
        if (++cnt === k) { ans = node.val; return; }
        reverseInorder(node.left);
    }
    reverseInorder(root);
    return ans;
}
```

**Dry Run (kth smallest, k=2):**
```
      3
     / \
    1   4
     \
      2

In-order: 1 → 2 → 3 → 4
  visit 1 → cnt=1, k=2, not yet
  visit 2 → cnt=2 === k → ans = 2 ✅
```
- **Time:** O(H + k) | **Space:** O(H)

---

### 8.6 Validate BST (Range-Based)

**Question:** Determine if a binary tree is a valid BST.

**Key Insight:** Pass down the valid range `(min, max)` — every node must satisfy `min < node.val < max`. The subtree trap is why simple left/right comparison fails.

```js
function isValidBST(root) {
    function solve(node, low, high) {
        if (!node) return true;
        if (node.val >= high || node.val <= low) return false;
        return solve(node.left, low, node.val)     // left: upper bound = node.val
            && solve(node.right, node.val, high);  // right: lower bound = node.val
    }
    return solve(root, -Infinity, Infinity);
}
```

**Dry Run:**
```
      5
     / \
    1   4    ← 4 < 5 but 4 is in RIGHT subtree — INVALID!
       / \
      3   6

solve(5,  -Inf, Inf): 5 in range ✅
  solve(1, -Inf, 5):  1 in range ✅ → true
  solve(4,  5,  Inf): 4 < 5 (low=5) ❌ → false
→ return false ✅ (correctly detected invalid)
```
- **Time:** O(N) | **Space:** O(H)

---

### 8.7 LCA in BST

**Question:** Find the Lowest Common Ancestor of two nodes p and q.

**Key Insight:** In a BST, LCA is the node where p and q first "split" — one goes left, one goes right.

```
If p and q are both < root → LCA is in LEFT subtree
If p and q are both > root → LCA is in RIGHT subtree
Otherwise (they split here) → root IS the LCA
```

```js
function lowestCommonAncestor(root, p, q) {
    if (p.val < root.val && q.val < root.val)
        return lowestCommonAncestor(root.left, p, q);
    if (p.val > root.val && q.val > root.val)
        return lowestCommonAncestor(root.right, p, q);
    return root;  // split point = LCA
}
```

**Dry Run:**
```
Tree:   6
       / \
      2   8
     / \ / \
    0  4 7  9

LCA(2, 8):
  root=6, p=2 < 6, q=8 > 6 → they split! return node(6) ✅

LCA(2, 4):
  root=6, p=2 < 6, q=4 < 6 → both left → go left
  root=2, p=2 = 2 → split (one is at root) → return node(2) ✅
```
- **Time:** O(H) | **Space:** O(H)

---

### 8.8 Build BST from Preorder Traversal

**Question:** Given a preorder traversal array, construct and return the BST.

**Key Insight:** Use a `bound` (upper limit) to know when the left subtree ends. When the next element exceeds the bound, we've moved to the right subtree.

```js
function bstFromPreorder(preorder) {
    let i = 0;

    function build(bound) {
        if (i >= preorder.length || preorder[i] > bound) return null;
        const node = new TreeNode(preorder[i++]);
        node.left  = build(node.val);   // left: bound is parent's value
        node.right = build(bound);      // right: bound stays the same
        return node;
    }

    return build(Infinity);
}
```

**Dry Run on [8, 5, 1, 7, 10, 12]:**
```
build(∞):    i=0, val=8  ✅ → node(8)
  build(8):  i=1, val=5  ✅ → node(5)
    build(5): i=2, val=1 ✅ → node(1)
      build(1): i=3, val=7 ❌ (7>1) → null
      build(5): i=3, val=7 ❌ (7>5) → null
    build(8): i=3, val=7  ✅ → node(7)
      build(7): i=4, val=10 ❌ → null
      build(8): i=4, val=10 ❌ → null
  build(∞): i=4, val=10  ✅ → node(10)
    build(10): i=5, val=12 ❌ → null
    build(∞):  i=5, val=12 ✅ → node(12)

Result:     8
           / \
          5   10
         / \    \
        1   7   12  ✅
```
- **Time:** O(N) | **Space:** O(H)

---

### 8.9 BST Iterator

**Question:** Implement `next()` (returns next smallest) and `hasNext()` with O(H) space — not O(N).

**Key Insight:** A stack holding only the leftmost chain at any time uses O(H) space. After popping a node, push the leftmost chain of its right subtree.

```js
class BSTIterator {
    constructor(root) {
        this.st = [];
        this.pushLeft(root);   // pre-load leftmost chain
    }

    pushLeft(node) {
        while (node) { this.st.push(node); node = node.left; }
    }

    next() {
        const node = this.st.pop();             // current smallest
        if (node.right) this.pushLeft(node.right); // set up next
        return node.val;
    }

    hasNext() { return this.st.length > 0; }
}
```

**Dry Run:**
```
Tree:   7
       / \
      3   15
         /  \
        9   20

Constructor: pushLeft(7) → stack = [7, 3]
next():  pop 3, no right    → return 3, stack=[7]
next():  pop 7, right=15 → pushLeft(15) → stack=[15,9]  → return 7
next():  pop 9, no right    → return 9, stack=[15]
next():  pop 15, right=20 → pushLeft(20) → stack=[20]  → return 15
next():  pop 20, no right   → return 20, stack=[]
hasNext(): false ✅
```
- **Time:** O(H) constructor, O(1) amortized per call | **Space:** O(H)

---

### 8.10 Two Sum in BST

**Question:** Given a BST and integer k, return true if two nodes sum to k.

**Key Insight:** Use two BST iterators as a two-pointer approach:
- `next()` — gives next **smallest** (left iterator, forward)
- `before()` — gives next **largest** (right iterator, backward)
- Same logic as two-pointer on a sorted array

```
l = next smallest,  r = next largest
while l < r:
    if l + r === k → found!
    if l + r < k  → need larger sum → move l forward
    if l + r > k  → need smaller sum → move r backward
```

```js
// Uses two stacks: stl (forward), str (backward)
// next()   → pop from stl, explore right subtree
// before() → pop from str, explore left subtree
```

**Dry Run:**
```
Tree:   5
       / \
      3   6
     / \   \
    2   4   7

k = 9

pushLeft:  stl = [5,3,2]
pushRight: str = [5,6,7]

l = next()   = 2,  str not touched
r = before() = 7
l+r = 9 === k → return true ✅
```
- **Time:** O(N) | **Space:** O(H)

---

### 8.11 Recover BST

**Question:** Exactly two nodes in a BST were swapped. Recover the tree (only fix values, not structure).

**Key Insight:** In-order traversal of a correct BST is sorted. A swap creates 1 or 2 "dips" (places where `curr < prev`).

```
Adjacent swap  → 1 dip:  first=prev at dip,  last=curr at dip
Non-adjacent   → 2 dips: first=prev at dip1, last=curr at dip2
Rule: always update last. Set first only once.
```

```js
function recoverTree(root) {
    let prev = null, first = null, last = null;

    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        if (prev && node.val < prev.val) {
            if (!first) first = prev;   // set once — first dip
            last = node;                // always update — handles both cases
        }
        prev = node;
        inorder(node.right);
    }

    inorder(root);
    [first.val, last.val] = [last.val, first.val];   // swap back
}
```

**Dry Run (non-adjacent, sequence: 4→2→3→1→5):**
```
visit 4: prev=null
visit 2: 2 < 4 → DIP 1! first=node(4), last=node(2)
visit 3: 3 > 2 → no dip
visit 1: 1 < 3 → DIP 2! last=node(1)  ← updated
visit 5: 5 > 1 → no dip

Swap node(4).val ↔ node(1).val → fixed ✅
```
- **Time:** O(N) | **Space:** O(H)

---

### 8.12 Largest BST in Binary Tree

**Question:** Given a Binary Tree (not necessarily BST), find the SIZE of the largest subtree that is a valid BST.

**Key Insight:** Pass `{size, min, max}` bottom-up. At each node, check if left.max < root < right.min. Use "poison values" on failure.

```js
function solve(root) {
    if (!root) return { size: 0, min: Infinity, max: -Infinity };

    const left  = solve(root.left);
    const right = solve(root.right);

    if (left.max < root.data && root.data < right.min) {
        // valid BST — extend it
        return {
            size: left.size + right.size + 1,
            min:  Math.min(left.min, root.data),
            max:  Math.max(right.max, root.data)
        };
    }

    // invalid — bubble best size, poison min/max
    return { size: Math.max(left.size, right.size), min: -Infinity, max: Infinity };
}
```

**Null node trick:**
```
null → { size:0, min:Infinity, max:-Infinity }
  Why? Neutral values that never falsely fail the BST check.
  left.max (-Inf) < root → always passes for left null
  root < right.min (Inf) → always passes for right null
```

**Poison values trick:**
```
Invalid node → { min:-Infinity, max:Infinity }
  Why? Any ancestor's check will fail:
  left.max (Inf) < parent → FAILS
  parent < right.min (-Inf) → FAILS
  Stops invalid subtrees from spreading up
```

**Dry Run:**
```
Tree:   10
       /  \
      5    15
     / \     \
    1   8    7   (7 < 15 → invalid!)

node(1) → {size:1, min:1,    max:1}    ✅
node(8) → {size:1, min:8,    max:8}    ✅
node(5) → {size:3, min:1,    max:8}    ✅ ← largest
node(7) → {size:1, min:7,    max:7}    ✅
node(15)→ {size:1, min:-Inf, max:Inf}  ❌ poisoned (15 > 7)
node(10)→ {size:3, min:-Inf, max:Inf}  ❌ carries best = 3

Answer: 3 ✅
```
- **Time:** O(N) | **Space:** O(H)

---

### 8.13 Inorder Successor & Predecessor

**Question:** For a given node p, find:
- **Predecessor** = largest value < p.val
- **Successor** = smallest value > p.val

**Key Insight:** Track the last valid candidate as you navigate the BST.

```
Predecessor (find largest < p):
  curr < p  → candidate! go RIGHT (find larger value still < p)
  curr >= p → too big, go LEFT

Successor (find smallest > p):
  curr > p  → candidate! go LEFT (find smaller value still > p)
  curr <= p → too small, go RIGHT
```

```js
function inorderPredecessor(root, p) {
    let predecessor = null, curr = root;
    while (curr) {
        if (curr.val < p.val) { predecessor = curr; curr = curr.right; }
        else                  { curr = curr.left; }
    }
    return predecessor;
}

function inorderSuccessor(root, p) {
    let successor = null, curr = root;
    while (curr) {
        if (curr.val > p.val) { successor = curr; curr = curr.left; }
        else                  { curr = curr.right; }
    }
    return successor;
}
```

**Dry Run (p = 12):**
```
Tree:       20
           /  \
          8    22
         / \
        4   12
           /  \
          10  14

Predecessor (largest < 12):
  curr=20, 20>=12 → left
  curr=8,  8 < 12 → pred=8,  right
  curr=12, 12>=12 → left
  curr=10, 10< 12 → pred=10, right
  curr=null → stop
  → predecessor = 10 ✅

Successor (smallest > 12):
  curr=20, 20>12 → succ=20, left
  curr=8,  8<=12 → right
  curr=12, 12<=12 → right
  curr=14, 14>12 → succ=14, left
  curr=null → stop
  → successor = 14 ✅
```
- **Time:** O(H) | **Space:** O(1)

---

### 8.14 Balance a BST

**Question:** Given a potentially skewed BST, return a balanced BST with the same values.

> 🔑 **Interview Pattern:** Whenever you see "balance a BST" or "convert skewed BST":
> → In-order → sorted array → build from middle

```js
function balanceBST(root) {
    const values = [];

    // Step 1: In-order traversal → sorted array
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }

    // Step 2: Build balanced BST from sorted array
    function build(l, r) {
        if (l > r) return null;
        const mid  = Math.floor((l + r) / 2);
        const node = new TreeNode(values[mid]);  // middle = root (balanced)
        node.left  = build(l, mid - 1);
        node.right = build(mid + 1, r);
        return node;
    }

    inorder(root);
    return build(0, values.length - 1);
}
```

**Dry Run:**
```
Skewed input:  1 → 2 → 3 → 4  (right-skewed)

In-order → [1, 2, 3, 4]

build(0,3): mid=1 → root=2
  build(0,0): mid=0 → root=1 (leaf)
  build(2,3): mid=2 → root=3
    build(3,3): mid=3 → root=4 (leaf)

Result:   2
         / \
        1   3
              \
               4  ✅ (height-balanced)
```
- **Time:** O(N) | **Space:** O(N) for array

---

## 9. Common Mistakes

### ❌ Mistake 1 — Only Checking Adjacent Nodes for Validity
```js
// WRONG — misses the subtree trap
function isValid(root) {
    if (!root) return true;
    if (root.left && root.left.val >= root.val) return false;
    if (root.right && root.right.val <= root.val) return false;
    return isValid(root.left) && isValid(root.right);
}
// Fails for: 10 → left → 5 → right → 12  (12 > 10, invalid!)
```
✅ **Fix:** Pass range bounds `(min, max)` down the tree.

---

### ❌ Mistake 2 — Forgetting Early Exit in Kth Element
Without early exit, the traversal continues even after finding the answer:
```js
// Without ans !== -1 check: visits all N nodes
// With early exit: stops at the kth node — O(H+k) not O(N)
if (!node || ans !== -1) return;
```

---

### ❌ Mistake 3 — Recover BST: Only One Dip
```js
// WRONG — only handles adjacent swap
if (!first) { first = prev; last = node; }
// If two dips, last is wrong!
```
✅ **Fix:** Always update `last = node` regardless of whether `first` is set.

---

### ❌ Mistake 4 — Delete with Two Children: Wrong Subtree
Finding the predecessor means going to the **left** subtree, then as far **right** as possible.
Finding the successor means going to the **right** subtree, then as far **left** as possible.
Mixing these up breaks the BST property.

---

### ❌ Mistake 5 — Largest BST: Null Node Poison Values Confusion
```
null → { min: Infinity, max: -Infinity }   ← neutral (NOT poison)
invalid node → { min: -Infinity, max: Infinity }  ← poison
```
These are opposite! Null nodes should NOT fail BST checks. Invalid nodes SHOULD poison.

---

## 10. Interview Cheat Sheet

### Quick Patterns to Recognize

| If the problem says... | Think... |
|---|---|
| "Find kth smallest" | In-order traversal + counter |
| "Find kth largest" | Reverse in-order + counter |
| "Balance a BST" | In-order → array → build from middle |
| "Validate BST" | Range bounds `(min, max)` |
| "Floor / Ceil" | Track candidate, narrow with BST property |
| "LCA in BST" | First split point (no extra traversal needed) |
| "Two nodes swapped" | In-order dips: track first + last |
| "Largest BST subtree" | Bottom-up `{size, min, max}` |
| "Two sum in BST" | Two iterators as two-pointer |
| "Iterator over BST" | Stack + leftmost chain = O(H) space |
| "Successor / Predecessor" | Track candidate while traversing |
| "Skewed BST → Balanced" | Same as "balance a BST" |

---

### Complexity Summary

| Problem | Time | Space |
|---|---|---|
| Search | O(H) | O(H) |
| Insert | O(H) | O(H) |
| Delete | O(H) | O(H) |
| Min / Max | O(H) | O(1) |
| Floor / Ceil | O(H) | O(1) |
| Validate BST | O(N) | O(H) |
| Kth smallest / largest | O(H+k) | O(H) |
| LCA | O(H) | O(H) |
| Build from Preorder | O(N) | O(H) |
| BST Iterator | O(H) per call | O(H) |
| Two Sum | O(N) | O(H) |
| Recover BST | O(N) | O(H) |
| Largest BST | O(N) | O(H) |
| Inorder Succ/Pred | O(H) | O(1) |
| Balance BST | O(N) | O(N) |

> H = height = O(log N) balanced, O(N) skewed

---

### The One Sentence for Every BST Problem

> **"In-order traversal of a BST gives a sorted sequence — use that fact, combine with BST's directional search property, and most BST problems solve themselves."**

---

*Guide covers: Strivers A2Z DSA Sheet — Section 12. Binary Search Trees*
*All solutions in: `1. Concept/javascript/` and `2. Practice Problems/javascript/`*

