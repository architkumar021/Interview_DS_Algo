/*
============================================================
      BINARY TREE — COMPLETE GUIDE (JavaScript)
      Sync'd with all latest solution files.
      For a printable version → see BINARY_TREES_GUIDE.md
============================================================

TABLE OF CONTENTS:
 1.  Introduction & Core Terminology
 2.  Types of Binary Trees
 3.  Node Structure & Tree Construction
 4.  Recursive Traversals (Preorder, Inorder, Postorder)
 5.  Iterative Traversals (Stack-based)
 6.  Level Order Traversal (BFS)
 7.  All-in-One Traversal (single DFS pass)
 8.  Height & Depth of Tree
 9.  Diameter of Binary Tree          [Brute O(N²) + Optimal O(N)]
10.  Check if Tree is Balanced        [Brute O(N²) + Optimal O(N)]
11.  Check if Tree is Symmetric       [Recursive + Iterative Stack]
12.  Same Tree
13.  Maximum Path Sum
14.  Lowest Common Ancestor (LCA)
15.  Zigzag (Spiral) Level Order Traversal
16.  Left / Right View
17.  Top View                         [O(N log N) + O(N)]
18.  Bottom View                      [O(N log N) + O(N)]
19.  Boundary Traversal
20.  Vertical Order Traversal
21.  Morris Inorder Traversal (O(1) space)
22.  Serialize & Deserialize Binary Tree
23.  Complexity Summary
============================================================
*/


// ============================================================
// 1. INTRODUCTION & CORE TERMINOLOGY
// ============================================================
/*
A Binary Tree is a hierarchical data structure where every node
has AT MOST two children — commonly called left and right child.

Key Terms:
─────────────────────────────────────────────────────────────
 Root         → Topmost node (no parent)
 Leaf         → Node with no children (left = right = null)
 Parent       → Node that has one or more children
 Sibling      → Nodes that share the same parent
 Edge         → Connection between parent and child
 Level        → Root is at Level 1; children at Level 2, etc.
 Height       → # edges on the LONGEST root-to-leaf path
                  (single node height = 0, empty tree = -1)
 Depth        → # edges from root to a specific node
 Subtree      → A node and all its descendants

Key Formulas:
─────────────────────────────────────────────────────────────
 Max nodes at level L         = 2^(L-1)
 Max nodes in tree of height H = 2^H - 1
 Min height for N nodes       = ⌊log2(N)⌋
 In a Full Binary Tree:       leaves = internal nodes + 1
*/


// ============================================================
// 2. TYPES OF BINARY TREES
// ============================================================
/*
┌──────────────────────────────────────────────────────────┐
│  Full Binary Tree                                        │
│  → Every node has 0 or 2 children (never exactly 1)     │
│        1                                                 │
│       / \                                                │
│      2   3                                               │
│     / \                                                  │
│    4   5                                                 │
├──────────────────────────────────────────────────────────┤
│  Complete Binary Tree                                    │
│  → All levels filled except possibly the last, which    │
│    is filled from LEFT to RIGHT                          │
│        1                                                 │
│       / \                                                │
│      2   3                                               │
│     / \ /                                                │
│    4  5 6                                                │
├──────────────────────────────────────────────────────────┤
│  Perfect Binary Tree                                     │
│  → All internal nodes have exactly 2 children           │
│  → All leaves are at the SAME level                     │
│        1                                                 │
│       / \                                                │
│      2   3                                               │
│     / \ / \                                              │
│    4  5 6  7                                             │
├──────────────────────────────────────────────────────────┤
│  Balanced Binary Tree                                    │
│  → For EVERY node: |height(left) - height(right)| ≤ 1   │
│  → Guarantees O(log N) operations                        │
│  → AVL Trees and Red-Black Trees are self-balancing      │
├──────────────────────────────────────────────────────────┤
│  Degenerate / Skewed Tree                                │
│  → Every node has only ONE child                         │
│  → Behaves like a linked list — O(N) operations         │
│  → Left-Skewed: all nodes go left                        │
│  → Right-Skewed: all nodes go right                      │
└──────────────────────────────────────────────────────────┘
*/


// ============================================================
// 3. NODE STRUCTURE & TREE CONSTRUCTION
// ============================================================

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/*
Helper: Build a tree from a level-order array.
null in the array means no node at that position.

Example: [1, 2, 3, 4, 5, null, 6]
builds:
        1
       / \
      2   3
     / \ / \
    4  5 _  6
*/
function buildTreeFromArray(arr) {
    if (!arr || arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}


// ============================================================
// 4. RECURSIVE TRAVERSALS
// ============================================================
/*
The three classic DFS traversals differ only in WHEN the root
node is visited relative to its children:

  Preorder  → Root  → Left  → Right   (used to COPY / SERIALIZE a tree)
  Inorder   → Left  → Root  → Right   (gives SORTED order in BST)
  Postorder → Left  → Right → Root    (used to DELETE a tree)

Time  Complexity: O(N) — every node visited once
Space Complexity: O(H) — recursion call stack
                  O(N) worst case for skewed tree
                  O(log N) for balanced tree
*/

// ── 4a. Preorder Traversal (Root → Left → Right) ──
function preorderRecursive(root) {
    const result = [];
    function dfs(node) {
        if (!node) return;
        result.push(node.val);  // Visit root FIRST
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return result;
}

// ── 4b. Inorder Traversal (Left → Root → Right) ──
function inorderRecursive(root) {
    const result = [];
    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        result.push(node.val);  // Visit root IN MIDDLE
        dfs(node.right);
    }
    dfs(root);
    return result;
}

// ── 4c. Postorder Traversal (Left → Right → Root) ──
function postorderRecursive(root) {
    const result = [];
    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        dfs(node.right);
        result.push(node.val);  // Visit root LAST
    }
    dfs(root);
    return result;
}


// ============================================================
// 5. ITERATIVE TRAVERSALS (Stack-Based)
// ============================================================
/*
Why iterative?
- Avoids stack-overflow risk on very deep / skewed trees.
- stack.pop() is O(1) vs queue.shift() O(N).
*/

// ── 5a. Iterative Preorder ──
// Push root → pop → record → push RIGHT then LEFT (LIFO = left processed first)
function preorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right); // right FIRST
        if (node.left)  stack.push(node.left);  // left SECOND → processed first
    }
    return result;
}

// ── 5b. Iterative Inorder ──
// Drill left spine → pop → record → move right → repeat
function inorderIterative(root) {
    const ans = [];
    const stack = [];
    let curr = root;
    while (curr || stack.length > 0) {
        while (curr) {          // Go all the way left
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        ans.push(curr.val);     // Visit node
        curr = curr.right;      // Move to right subtree
    }
    return ans;
}

// ── 5c. Iterative Postorder — Two-Stack ──
/*
Approach:
- Push root onto stack1. While stack1 is not empty:
    - Pop a node from stack1, push it onto stack2.
    - Push its left child then right child onto stack1.
- Drain stack2 into result — reverse order gives Left → Right → Root.

Time:  O(N)  |  Space: O(N) — two stacks hold at most N nodes total.
*/
function postorderIterative(root) {
    const ans = [];
    if (!root) return ans;
    const stack1 = [root], stack2 = [];
    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);
        if (node.left)  stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }
    while (stack2.length > 0) ans.push(stack2.pop().val);
    return ans;
}

// ── 5d. Iterative Postorder — One Stack + prev pointer ──
/*
Approach:
- Use one stack and a `prev` pointer tracking the last visited node.
- Peek at top (do NOT pop yet) at each step:
  1. Top has a left child we haven't gone into → push left, keep going left.
  2. Top has a right child AND we didn't just come back from it
     (prev !== top.right) → go right.
  3. Otherwise both subtrees are done → pop and record, update prev.

Why prev?
- After finishing the right subtree and coming back up, top.right === prev
  tells us "right subtree done → time to visit root".
  Without prev we'd re-push the right child infinitely.

Time:  O(N)  |  Space: O(H) — stack holds at most H nodes.
*/
function postorderOneStack(root) {
    const ans = [];
    if (!root) return ans;
    const stack = [];
    let curr = root, prev = null;
    while (curr || stack.length > 0) {
        // Phase 1: Go all the way left
        while (curr) { stack.push(curr); curr = curr.left; }
        // Peek at top — don't pop yet
        const top = stack[stack.length - 1];
        // Phase 2: Right subtree exists and not yet visited → go right
        if (top.right && top.right !== prev) {
            curr = top.right;
        } else {
            // Phase 3: Both subtrees done → visit node
            ans.push(top.val);
            prev = stack.pop();
        }
    }
    return ans;
}


// ============================================================
// 6. LEVEL ORDER TRAVERSAL (BFS)
// ============================================================
/*
Time: O(N)  |  Space: O(N) — at most N/2 nodes in queue (last level)
*/
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length; // Snapshot = nodes at this level
        const level = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}


// ============================================================
// 7. ALL-IN-ONE TRAVERSAL (Single DFS Pass)
// ============================================================
/*
Compute Preorder, Inorder, and Postorder in ONE pass using a
state counter per node on the stack:
  state 1 → record for Preorder,  push left child
  state 2 → record for Inorder,   push right child
  state 3 → record for Postorder, pop node

Time: O(3N) ≈ O(N)  |  Space: O(N)
*/
function allInOneTraversal(root) {
    const pre = [], ino = [], post = [];
    if (!root) return [pre, ino, post];

    // Stack stores [node, state]
    const stack = [[root, 1]];

    while (stack.length > 0) {
        const [node, state] = stack.pop();

        if (state === 1) {
            pre.push(node.val);                         // Preorder: record now
            stack.push([node, 2]);                      // Re-push with next state
            if (node.left) stack.push([node.left, 1]);  // Push left child
        } else if (state === 2) {
            ino.push(node.val);                          // Inorder: record now
            stack.push([node, 3]);                       // Re-push with next state
            if (node.right) stack.push([node.right, 1]);// Push right child
        } else {
            post.push(node.val);                         // Postorder: record now, pop
        }
    }
    return [pre, ino, post];
}


// ============================================================
// 8. HEIGHT & DEPTH OF TREE
// ============================================================
/*
Height of null = -1  |  Height of leaf = 0
Depth  of root = 0

NOTE: LeetCode maxDepth counts NODES (not edges), so it = height + 1.

Time: O(N)  |  Space: O(H)
*/

// Height (edge count) — returns -1 for null
function heightOfTree(root) {
    if (!root) return -1;
    return 1 + Math.max(heightOfTree(root.left), heightOfTree(root.right));
}

// LeetCode #104 — counts NODES along longest root-to-leaf path
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Alternative DFS approach — track depth explicitly via parameter
function maxDepthDFS(root) {
    let result = 0;
    function dfs(node, depth) {
        if (!node) { result = Math.max(result, depth); return; }
        dfs(node.left,  depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return result;
}

// Find depth of a target node value
function depthOfNode(root, target, depth = 0) {
    if (!root) return -1;
    if (root.val === target) return depth;
    const left = depthOfNode(root.left, target, depth + 1);
    if (left !== -1) return left;
    return depthOfNode(root.right, target, depth + 1);
}


// ============================================================
// 9. DIAMETER OF BINARY TREE
// ============================================================
/*
Diameter = longest path between ANY two nodes (edge count).
May or may NOT pass through root.
*/

// ── Brute Force — O(N²) ──
/*
For every node, recompute height of left and right subtrees separately.
diameter_through_node = height(left) + height(right)
Then recurse on left/right to check if max lies in a subtree.
height() is O(N) per node → O(N) × O(N) = O(N²) total.
*/
function heightForDiameter(node) {
    if (!node) return 0;
    return 1 + Math.max(heightForDiameter(node.left), heightForDiameter(node.right));
}
function diameterBrute(root) {
    if (!root) return 0;
    const throughRoot = heightForDiameter(root.left) + heightForDiameter(root.right);
    return Math.max(throughRoot, diameterBrute(root.left), diameterBrute(root.right));
}

// ── Optimal — O(N) ──
/*
Height + diameter computed TOGETHER in ONE DFS pass via closure.
- dfs(node) returns the height of that subtree.
- At each node, diameter through it = left + right (heights returned from children).
- maxDiameter closure variable tracks the global max.
*/
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;
    function dfs(node) {
        if (!node) return 0;
        const left  = dfs(node.left);
        const right = dfs(node.right);
        maxDiameter = Math.max(maxDiameter, left + right); // diameter through this node
        return 1 + Math.max(left, right);                  // height returned to parent
    }
    dfs(root);
    return maxDiameter;
}


// ============================================================
// 10. CHECK IF TREE IS BALANCED
// ============================================================
/*
A tree is height-balanced if for EVERY node:
  |height(left subtree) - height(right subtree)| ≤ 1
*/

// ── Brute Force — O(N²) ──
/*
Compute height separately at every node → height() is called O(N)
times, each costing O(N) → O(N²) total.
*/
function heightForBalance(node) {
    if (!node) return 0;
    return 1 + Math.max(heightForBalance(node.left), heightForBalance(node.right));
}
function isBalancedBrute(root) {
    if (!root) return true;
    const lh = heightForBalance(root.left), rh = heightForBalance(root.right);
    return Math.abs(lh - rh) <= 1
        && isBalancedBrute(root.left)
        && isBalancedBrute(root.right);
}

// ── Optimal — O(N) with -1 sentinel ──
/*
Returns actual height if balanced, or -1 if imbalance detected.
-1 short-circuits immediately — no further nodes visited.
*/
function getHeight(node) {
    if (!node) return 0;
    const left  = getHeight(node.left);
    if (left  === -1) return -1;                // Propagate imbalance up
    const right = getHeight(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;  // Imbalance at this node
    return 1 + Math.max(left, right);
}
function isBalanced(root) { return getHeight(root) !== -1; }


// ============================================================
// 11. CHECK IF TREE IS SYMMETRIC / MIRROR
// ============================================================
/*
A tree is symmetric if left subtree is a mirror of right subtree.
Mirror pairs rule: left.left ↔ right.right  (outer)
                   left.right ↔ right.left  (inner)
*/

// ── Recursive ──
function isSymmetric(root) {
    function isMirror(left, right) {
        if (!left && !right) return true;    // Both null → symmetric
        if (!left || !right) return false;   // One null, one not
        return left.val === right.val
            && isMirror(left.left,  right.right)  // Outer pair
            && isMirror(left.right, right.left);  // Inner pair
    }
    return isMirror(root.left, root.right);
}

// ── Iterative — Stack ──
/*
Use stack.pop() instead of queue.shift() — both correct, but
pop() is O(1) vs shift() O(N).
Push mirror pairs each iteration.
*/
function isSymmetricIterative(root) {
    if (!root) return true;
    const stack = [[root.left, root.right]];
    while (stack.length > 0) {
        const [left, right] = stack.pop();
        if (!left && !right) continue;            // Both null → ok
        if (!left || !right) return false;        // One null  → not ok
        if (left.val !== right.val) return false; // Values differ
        stack.push(
            [left.left,  right.right],  // Outer pair
            [left.right, right.left]    // Inner pair
        );
    }
    return true;
}


// ============================================================
// 12. SAME TREE
// ============================================================
/*
Two trees are the same if structurally identical AND all
corresponding node values are equal.

Time: O(N)  |  Space: O(H)
*/
function isSameTree(p, q) {
    if (!p && !q) return true;    // Both null → same
    if (!p || !q) return false;   // One null  → different
    return p.val === q.val
        && isSameTree(p.left,  q.left)
        && isSameTree(p.right, q.right);
}


// ============================================================
// 13. MAXIMUM PATH SUM
// ============================================================
/*
Path = any sequence of nodes connected by edges.
Does NOT need to pass through root.

Two key rules:
1. Math.max(0, gain) — ignore negative subtrees (clamp to 0)
2. Return SINGLE branch to parent — path cannot split upward

Time: O(N)  |  Space: O(H)
*/
function maxPathSum(root) {
    let maxSum = -Infinity;
    function dfs(node) {
        if (!node) return 0;
        const left  = Math.max(0, dfs(node.left));   // Ignore negatives
        const right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, node.val + left + right); // Full path through node
        return node.val + Math.max(left, right);            // Single branch to parent
    }
    dfs(root);
    return maxSum;
}


// ============================================================
// 14. LOWEST COMMON ANCESTOR (LCA)
// ============================================================
/*
LCA(p, q) = deepest node that has both as descendants
           (a node is a descendant of itself).

- If root == p or q → return root (found one)
- If both sides return non-null → root is LCA (p and q in different subtrees)
- Only one side non-null → both are in that subtree

Time: O(N)  |  Space: O(H)
*/
function lowestCommonAncestor(root, p, q) {
    if (!root) return null;
    if (root.val === p.val || root.val === q.val) return root;
    const leftLCA  = lowestCommonAncestor(root.left,  p, q);
    const rightLCA = lowestCommonAncestor(root.right, p, q);
    if (leftLCA && rightLCA) return root;   // p in left, q in right → LCA is root
    return leftLCA ?? rightLCA;             // Both in same subtree
}


// ============================================================
// 15. ZIGZAG (SPIRAL) LEVEL ORDER TRAVERSAL
// ============================================================
/*
Same as BFS but alternate direction each level.

Index trick: place at (reverse ? n-1-i : i) directly — no .reverse() needed.
This avoids an extra O(N) reverse pass per level.

Time: O(N)  |  Space: O(N)
*/
function zigzagLevelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    let reverse = false;
    while (queue.length > 0) {
        const n = queue.length;
        const level = new Array(n);
        for (let i = 0; i < n; i++) {
            const node = queue.shift();
            level[reverse ? n - 1 - i : i] = node.val; // Place at correct index directly
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
        reverse = !reverse;
    }
    return result;
}


// ============================================================
// 16. LEFT / RIGHT VIEW
// ============================================================
/*
Left View  → FIRST node at each BFS level (i === 0)
Right View → LAST  node at each BFS level (i === n - 1)

Time: O(N)  |  Space: O(N)
*/
function rightView(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length > 0) {
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            const node = queue.shift();
            if (i === n - 1) result.push(node.val); // Last = right view
            // if (i === 0) result.push(node.val);  // First = left view
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}


// ============================================================
// 17. TOP VIEW
// ============================================================
/*
HD: root=0, left child=hd-1, right child=hd+1.
BFS top-to-bottom → FIRST node seen at each HD = top view.
*/

// O(N log N) — sort keys at end
function topView(root) {
    if (!root) return [];
    const map = new Map(), queue = [[root, 0]];
    while (queue.length > 0) {
        const [curr, hd] = queue.shift();
        if (!map.has(hd)) map.set(hd, curr.val);   // FIRST = top
        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }
    return [...map.keys()].sort((a, b) => a - b).map(hd => map.get(hd));
}

// O(N) — track min/max HD during BFS → linear scan at end, no sort needed
function topViewOptimal(root) {
    if (!root) return [];
    const map = new Map(), queue = [[root, 0]];
    let minHd = 0, maxHd = 0;
    while (queue.length > 0) {
        const [curr, hd] = queue.shift();
        if (!map.has(hd)) map.set(hd, curr.val);
        minHd = Math.min(minHd, hd);
        maxHd = Math.max(maxHd, hd);
        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }
    const result = [];
    for (let hd = minHd; hd <= maxHd; hd++) result.push(map.get(hd));
    return result;
}


// ============================================================
// 18. BOTTOM VIEW
// ============================================================
/*
LAST node seen at each HD = bottom view (always overwrite map).

  Top View    → if (!map.has(hd)) map.set(hd, val)  ← store FIRST
  Bottom View → map.set(hd, val)                     ← store LAST
*/

// O(N log N)
function bottomView(root) {
    if (!root) return [];
    const map = new Map(), queue = [[root, 0]];
    while (queue.length > 0) {
        const [curr, hd] = queue.shift();
        map.set(hd, curr.val);  // Always overwrite → bottommost wins
        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }
    return [...map.keys()].sort((a, b) => a - b).map(hd => map.get(hd));
}

// O(N) — min/max HD tracking
function bottomViewOptimal(root) {
    if (!root) return [];
    const map = new Map(), queue = [[root, 0]];
    let minHd = 0, maxHd = 0;
    while (queue.length > 0) {
        const [curr, hd] = queue.shift();
        map.set(hd, curr.val);
        minHd = Math.min(minHd, hd);
        maxHd = Math.max(maxHd, hd);
        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }
    const result = [];
    for (let hd = minHd; hd <= maxHd; hd++) result.push(map.get(hd));
    return result;
}


// ============================================================
// 19. BOUNDARY TRAVERSAL
// ============================================================
/*
Anti-clockwise:
  1. Left boundary  (top-down, excluding leaves)
  2. All leaf nodes  (left-to-right DFS)
  3. Right boundary  (bottom-up, excluding leaves)

- Left boundary:  go left, fallback right, stop before leaf
- Right boundary: go right, fallback left, stop before leaf → reverse

Time: O(N)  |  Space: O(H)
*/
function boundaryTraversal(root) {
    if (!root) return [];
    const result = [];
    const isLeaf = node => !node.left && !node.right;

    if (!isLeaf(root)) result.push(root.val);   // 1. Root (if not a leaf)

    // 2. Left boundary (top-down, excluding leaves)
    let node = root.left;
    while (node) {
        if (!isLeaf(node)) result.push(node.val);
        node = node.left ? node.left : node.right;
    }

    // 3. All leaves via DFS
    function addLeaves(n) {
        if (!n) return;
        if (isLeaf(n)) { result.push(n.val); return; }
        addLeaves(n.left);
        addLeaves(n.right);
    }
    addLeaves(root);

    // 4. Right boundary (bottom-up, excluding leaves)
    const rightBoundary = [];
    node = root.right;
    while (node) {
        if (!isLeaf(node)) rightBoundary.push(node.val);
        node = node.right ? node.right : node.left;
    }
    result.push(...rightBoundary.reverse());    // Reverse for bottom-up
    return result;
}


// ============================================================
// 20. VERTICAL ORDER TRAVERSAL
// ============================================================
/*
Root = (col=0, row=0). Left child=(col-1, row+1). Right child=(col+1, row+1).
Same (col, row) → sort by VALUE.

We track row (level) because nodes at same (col, row) must be sorted by value.
Without row tracking we'd lose that grouping info.

Time: O(N log N)  |  Space: O(N)
*/
function verticalOrderTraversal(root) {
    if (!root) return [];
    const map = new Map();          // col → [[row, val], ...]
    const queue = [[root, 0]];
    let level = 0;
    while (queue.length > 0) {
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            const [curr, col] = queue.shift();
            (map.get(col) ?? map.set(col, []).get(col)).push([level, curr.val]);
            if (curr.left)  queue.push([curr.left,  col - 1]);
            if (curr.right) queue.push([curr.right, col + 1]);
        }
        level++;
    }
    return [...map.keys()]
        .sort((a, b) => a - b)
        .map(col =>
            map.get(col)
                .sort((a, b) => a[0] - b[0] || a[1] - b[1])  // Sort by row, then val
                .map(([, val]) => val)
        );
}


// ============================================================
// 21. MORRIS INORDER TRAVERSAL (O(1) Space)
// ============================================================
/*
Achieves O(1) extra space by THREADING tree links temporarily.
No stack, no recursion.

Key Idea — Threaded Binary Tree:
  Find INORDER PREDECESSOR (rightmost in left subtree).
  predecessor.right == null  → create thread → move left  (1st visit)
  predecessor.right == curr  → remove thread → visit curr → move right (2nd visit)

Time: O(N) — each node visited at most twice
Space: O(1) — tree is modified temporarily but fully restored
*/
function morrisInorder(root) {
    const result = [];
    let curr = root;
    while (curr) {
        if (curr.left) {
            let pred = curr.left;
            while (pred.right && pred.right !== curr) pred = pred.right;
            if (pred.right === curr) {      // 2nd visit: remove thread, visit
                pred.right = null;
                result.push(curr.val);
                curr = curr.right;
            } else {                        // 1st visit: create thread
                pred.right = curr;
                curr = curr.left;
            }
        } else {
            result.push(curr.val);          // No left child → visit, move right
            curr = curr.right;
        }
    }
    return result;
}

// Morris Preorder — record on FIRST visit (before going left)
function morrisPreorder(root) {
    const result = [];
    let curr = root;
    while (curr) {
        if (curr.left) {
            let pred = curr.left;
            while (pred.right && pred.right !== curr) pred = pred.right;
            if (pred.right === curr) {
                pred.right = null;
                curr = curr.right;
            } else {
                result.push(curr.val);  // Record on FIRST visit
                pred.right = curr;
                curr = curr.left;
            }
        } else {
            result.push(curr.val);
            curr = curr.right;
        }
    }
    return result;
}


// ============================================================
// 22. SERIALIZE & DESERIALIZE BINARY TREE
// ============================================================
/*
Serialize  → tree → string (BFS, "null" for missing nodes)
Deserialize → string → tree

Time: O(N)  |  Space: O(N)
*/
function serialize(root) {
    if (!root) return "null";
    const result = [], queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (!node) { result.push("null"); continue; }
        result.push(String(node.val));
        queue.push(node.left, node.right);   // Push even if null
    }
    return result.join(",");
}

function deserialize(data) {
    if (data === "null") return null;
    const tokens = data.split(",");
    const root = new TreeNode(Number(tokens[0]));
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < tokens.length) {
        const node = queue.shift();
        if (tokens[i] !== "null") {
            node.left = new TreeNode(Number(tokens[i]));
            queue.push(node.left);
        }
        i++;
        if (i < tokens.length && tokens[i] !== "null") {
            node.right = new TreeNode(Number(tokens[i]));
            queue.push(node.right);
        }
        i++;
    }
    return root;
}


// ============================================================
// 23. COMPLEXITY SUMMARY
// ============================================================
/*
╔════════════════════════════════════════╦══════════╦═══════════╗
║ Operation                              ║   Time   ║   Space   ║
╠════════════════════════════════════════╬══════════╬═══════════╣
║ Recursive Traversals (Pre/In/Post)     ║  O(N)    ║   O(H)    ║
║ Iterative Preorder                     ║  O(N)    ║   O(N)    ║
║ Iterative Inorder                      ║  O(N)    ║   O(N)    ║
║ Iterative Postorder — Two Stack        ║  O(N)    ║   O(N)    ║
║ Iterative Postorder — One Stack + prev ║  O(N)    ║   O(H)    ║
║ Level Order (BFS)                      ║  O(N)    ║   O(N)    ║
║ All-in-One Traversal (state machine)   ║  O(N)    ║   O(N)    ║
║ Height / MaxDepth                      ║  O(N)    ║   O(H)    ║
║ MaxDepth — DFS with depth param        ║  O(N)    ║   O(H)    ║
║ Diameter — Brute Force                 ║  O(N²)   ║   O(H)    ║
║ Diameter — Optimal (combined DFS)      ║  O(N)    ║   O(H)    ║
║ Balanced — Brute Force                 ║  O(N²)   ║   O(H)    ║
║ Balanced — Optimal (-1 sentinel)       ║  O(N)    ║   O(H)    ║
║ Symmetric — Recursive                  ║  O(N)    ║   O(H)    ║
║ Symmetric — Iterative Stack            ║  O(N)    ║   O(H)    ║
║ Same Tree                              ║  O(N)    ║   O(H)    ║
║ Maximum Path Sum                       ║  O(N)    ║   O(H)    ║
║ Lowest Common Ancestor                 ║  O(N)    ║   O(H)    ║
║ Zigzag Level Order (index trick)       ║  O(N)    ║   O(N)    ║
║ Left / Right View                      ║  O(N)    ║   O(N)    ║
║ Top / Bottom View — sort keys          ║ O(NlogN) ║   O(N)    ║
║ Top / Bottom View — minHd/maxHd O(N)   ║  O(N)    ║   O(N)    ║
║ Boundary Traversal                     ║  O(N)    ║   O(H)    ║
║ Vertical Order Traversal               ║ O(NlogN) ║   O(N)    ║
║ Morris Inorder / Preorder              ║  O(N)    ║   O(1)    ║
║ Serialize / Deserialize                ║  O(N)    ║   O(N)    ║
╚════════════════════════════════════════╩══════════╩═══════════╝

H = height of tree
  → Balanced tree: H = O(log N)
  → Skewed tree:   H = O(N)

KEY PATTERNS:
  DFS + closure variable    → Diameter, MaxPathSum (track global, return local)
  -1 sentinel               → Balanced check (signal imbalance + short-circuit)
  BFS level snapshot        → levelOrder, Zigzag, Views (const n = queue.length)
  HD (horizontal distance)  → Top/Bottom/Vertical Order (col tracking via BFS)
  prev pointer              → One-stack Postorder (avoid re-processing right child)
  Mirror pair comparison    → Symmetric (left.left↔right.right, left.right↔right.left)
  Thread + restore          → Morris (O(1) space via predecessor.right threading)
  Two non-null sides = LCA  → lowestCommonAncestor
  Index placement trick     → Zigzag (avoid .reverse() with n-1-i index)
  minHd/maxHd tracking      → Top/Bottom View O(N) (avoid sort)
*/
