/*
=============================================================
Question: Largest BST in Binary Tree
=============================================================

WHAT IS ASKED?
--------------
Given a Binary Tree (NOT necessarily a BST), find the SIZE
(number of nodes) of the LARGEST subtree that is a valid BST.

  "Subtree" here means any node + all its descendants.
  A single node is always a valid BST (size = 1).

EXAMPLE:
              10
             /  \
            5    15
           / \     \
          1   8    7   ← 7 < 15, so 15's subtree is NOT a BST

  Valid BST subtrees:
    - node(1)       → size 1
    - node(8)       → size 1
    - node(7)       → size 1
    - subtree at 5  → [1, 5, 8] → valid BST, size 3  ✅ largest
    - subtree at 15 → [15, 7] → 7 < 15, NOT a BST

  Answer: 3

KEY INSIGHT — Bottom-Up Info Passing:
--------------------------------------
For each node to know if IT forms a valid BST with its children,
it needs 3 things from each child:
  1. size — how many nodes are in the valid BST so far
  2. min  — minimum value in that subtree
  3. max  — maximum value in that subtree

BST condition at current node:
  left.max < root.data  AND  root.data < right.min

  If TRUE  → root + left + right form a valid BST
             return { size: left.size + right.size + 1,
                      min: min(left.min, root.data),
                      max: max(right.max, root.data) }

  If FALSE → root does NOT extend the BST upward
             return { size: max(left.size, right.size),  ← best answer so far
                      min: -Infinity, max: Infinity }    ← poison values to
                                                           break BST check above

WHY POISON VALUES (-Infinity / Infinity)?
  If we return min=-Infinity or max=Infinity, the parent's BST check
  (left.max < root.data < right.min) will ALWAYS FAIL, correctly
  preventing an invalid subtree from being extended further up.

BASE CASE (null node):
  size=0, min=Infinity, max=-Infinity
  Why? A null node contributes 0 size.
  min=Infinity  → left.max < root.data check: -Inf < anything → passes trivially
  max=-Infinity → root.data < right.min check: anything < Inf → passes trivially
  (Null subtree never violates BST property)

Time:  O(n) — each node visited exactly once
Space: O(h) — recursion stack (h = height)

=============================================================
*/

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Returns { size, min, max } for the subtree rooted at `root`
function solve(root) {
    // Base: null node — size 0, neutral min/max so BST check passes
    if (!root) return { size: 0, min: Infinity, max: -Infinity };

    const left  = solve(root.left);
    const right = solve(root.right);

    // BST condition: all values in left subtree < root < all values in right subtree
    if (left.max < root.data && root.data < right.min) {
        // Current node extends the BST from both sides
        return {
            size: left.size + right.size + 1,
            min:  Math.min(left.min,  root.data),  // smallest in this subtree
            max:  Math.max(right.max, root.data)   // largest in this subtree
        };
    }

    // Current node breaks BST — bubble up the best size found so far
    // Poison min/max so no ancestor can falsely extend this as a BST
    return {
        size: Math.max(left.size, right.size),
        min:  -Infinity,   // poison: forces left.max < parent check to fail
        max:  Infinity     // poison: forces parent < right.min check to fail
    };
}

function largestBst(root) {
    return solve(root).size;
}

/*
=============================================================
DRY RUN
=============================================================

Tree:
              10
             /  \
            5    15
           / \     \
          1   8    7

Step 1: solve(node 1)  → null children
  left  = { size:0, min:Inf,  max:-Inf }
  right = { size:0, min:Inf,  max:-Inf }
  Check: -Inf < 1 < Inf ✅
  → return { size:1, min:1, max:1 }

Step 2: solve(node 8)  → null children (same as above)
  → return { size:1, min:8, max:8 }

Step 3: solve(node 5)
  left  = { size:1, min:1, max:1 }   (from node 1)
  right = { size:1, min:8, max:8 }   (from node 8)
  Check: left.max(1) < 5 < right.min(8) ✅
  → return { size:3, min:1, max:8 }

Step 4: solve(node 7)  → null children
  → return { size:1, min:7, max:7 }

Step 5: solve(node 15)
  left  = { size:0, min:Inf, max:-Inf }  (null left child)
  right = { size:1, min:7,   max:7   }   (from node 7)
  Check: left.max(-Inf) < 15 ✅  AND  15 < right.min(7)? ❌  (15 > 7)
  BST condition FAILS
  → return { size: max(0,1)=1, min:-Inf, max:Inf }  ← poisoned

Step 6: solve(node 10)
  left  = { size:3, min:1,    max:8   }  (from node 5)
  right = { size:1, min:-Inf, max:Inf }  (from node 15, poisoned)
  Check: left.max(8) < 10 ✅  AND  10 < right.min(-Inf)? ❌
  BST condition FAILS
  → return { size: max(3,1)=3, min:-Inf, max:Inf }

Final answer: size = 3  ✅  (the subtree rooted at node 5: [1, 5, 8])

=============================================================
TRACE SUMMARY:
  node(1)  → { size:1, min:1,    max:1   }  valid BST
  node(8)  → { size:1, min:8,    max:8   }  valid BST
  node(5)  → { size:3, min:1,    max:8   }  valid BST ← largest
  node(7)  → { size:1, min:7,    max:7   }  valid BST
  node(15) → { size:1, min:-Inf, max:Inf }  INVALID (poisoned)
  node(10) → { size:3, min:-Inf, max:Inf }  INVALID, but carries best=3
=============================================================
*/

