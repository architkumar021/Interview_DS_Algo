/*
============================================================
      BINARY TREE — COMPLETE GUIDE (JavaScript)
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
 9.  Diameter of Binary Tree
10.  Check if Tree is Balanced (Height-Balanced)
11.  Check if Tree is Symmetric / Mirror
12.  Count Total Nodes
13.  Maximum Path Sum
14.  Lowest Common Ancestor (LCA)
15.  Zigzag (Spiral) Level Order Traversal
16.  Left / Right / Top / Bottom View
17.  Boundary Traversal
18.  Vertical Order Traversal
19.  Morris Inorder Traversal (O(1) space)
20.  Serialize & Deserialize Binary Tree
21.  Complexity Summary
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

// Usage example:
// const root = buildTreeFromArray([1, 2, 3, 4, 5, null, 6]);


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
Space Complexity: O(H) — recursion call stack (H = height)
                  O(N) worst case for skewed tree
                  O(log N) for balanced tree
*/

// ── 4a. Preorder Traversal (Root → Left → Right) ──
function preorderRecursive(root) {
    const result = [];
    function dfs(node) {
        if (!node) return;
        result.push(node.val);   // Visit root FIRST
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
        result.push(node.val);   // Visit root IN MIDDLE
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
        result.push(node.val);   // Visit root LAST
    }
    dfs(root);
    return result;
}


// ============================================================
// 5. ITERATIVE TRAVERSALS (Stack-Based)
// ============================================================
/*
Why iterative?
- Avoids stack-overflow risk on very deep / skewed trees
- Gives explicit control over traversal state
*/

// ── 5a. Iterative Preorder ──
/*
Approach:
- Push root onto stack.
- Pop node → record value → push RIGHT child, then LEFT child.
  (Push right before left so left is processed first — LIFO order)
*/
function preorderIterative(root) {
    if (!root) return [];
    const result = [];
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right); // push right FIRST
        if (node.left)  stack.push(node.left);  // push left SECOND (processed first)
    }
    return result;
}

// ── 5b. Iterative Inorder ──
/*
Approach:
- Drill down the left spine, pushing every node to the stack.
- Pop a node → record value → move to its right child.
- Repeat: drill down left spine of right subtree.
*/
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let curr = root;
    while (curr || stack.length > 0) {
        // Go all the way left
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        result.push(curr.val);  // Visit node
        curr = curr.right;      // Move to right subtree
    }
    return result;
}

// ── 5c. Iterative Postorder (Two-Stack Method) ──
/*
Approach:
- Similar to preorder but push LEFT before RIGHT.
- Collect results in stack2 (reverses the order to get post-order).
- Drain stack2 into result array.
*/
function postorderIterative(root) {
    if (!root) return [];
    const result = [];
    const stack1 = [root];
    const stack2 = [];
    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);
        if (node.left)  stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }
    while (stack2.length > 0) {
        result.push(stack2.pop().val);
    }
    return result;
}


// ============================================================
// 6. LEVEL ORDER TRAVERSAL (BFS)
// ============================================================
/*
Approach:
- Use a Queue (FIFO).
- Process level by level: snapshot queue size at start of each
  iteration — that many nodes belong to the current level.

Time  Complexity: O(N)
Space Complexity: O(N) — at most N/2 nodes in queue (last level)
*/
function levelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
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
Compute Preorder, Inorder, and Postorder in ONE DFS pass
using a state counter per node:
  state 1 → record for Preorder,  then recurse left
  state 2 → record for Inorder,   then recurse right
  state 3 → record for Postorder, then pop from stack

Approach:
- Push (node, state=1) onto stack.
- Each iteration: read top element.
  - If state is 1: add to pre-result, increment state, push left child.
  - If state is 2: add to in-result,  increment state, push right child.
  - If state is 3: add to post-result, pop from stack.

Time  Complexity: O(3N) ≈ O(N)
Space Complexity: O(N)
*/
function allInOneTraversal(root) {
    const pre = [], ino = [], post = [];
    if (!root) return [pre, ino, post];

    // Stack stores [node, visitCount]
    const stack = [[root, 1]];

    while (stack.length > 0) {
        const top = stack[stack.length - 1];
        const [node, state] = top;

        if (state === 1) {
            pre.push(node.val);       // Preorder: record now
            top[1]++;                  // Move to state 2
            if (node.left) stack.push([node.left, 1]);
        } else if (state === 2) {
            ino.push(node.val);       // Inorder: record now
            top[1]++;                  // Move to state 3
            if (node.right) stack.push([node.right, 1]);
        } else {
            post.push(node.val);      // Postorder: record now
            stack.pop();               // Done with this node
        }
    }
    return [pre, ino, post];
}


// ============================================================
// 8. HEIGHT & DEPTH OF TREE
// ============================================================
/*
Height of a node = length of longest path from that node to a leaf.
  - Height of leaf = 0
  - Height of empty (null) = -1

Depth of a node  = length of path from root to that node.
  - Depth of root = 0

Approach (recursive height):
- height(node) = 1 + max(height(left), height(right))
- Base case: height(null) = -1

Time  Complexity: O(N)
Space Complexity: O(H)
*/
function heightOfTree(root) {
    if (!root) return -1;
    const leftHeight  = heightOfTree(root.left);
    const rightHeight = heightOfTree(root.right);
    return 1 + Math.max(leftHeight, rightHeight);
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
Diameter = longest path between ANY two nodes in the tree.
The path MAY or MAY NOT pass through the root.

Approach:
- For every node: diameter through it = leftHeight + rightHeight + 2
  (the +2 counts the two edges connecting node to left/right subtrees)
- Track a global maximum across all nodes.
- Compute height and diameter simultaneously in one DFS pass.

Why combine? If we compute height separately for each node:
  Time = O(N²). Combining makes it O(N).

Time  Complexity: O(N)
Space Complexity: O(H)
*/
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function dfsHeight(node) {
        if (!node) return -1;
        const lh = dfsHeight(node.left);
        const rh = dfsHeight(node.right);
        // Diameter through current node (in terms of edges)
        maxDiameter = Math.max(maxDiameter, lh + rh + 2);
        return 1 + Math.max(lh, rh);
    }

    dfsHeight(root);
    return maxDiameter;
}


// ============================================================
// 10. CHECK IF TREE IS BALANCED (HEIGHT-BALANCED)
// ============================================================
/*
A tree is height-balanced if for every node:
  |height(left subtree) - height(right subtree)| ≤ 1

Naive Approach (O(N²)):
- At every node, compute height of left and right subtrees separately.
- If difference > 1 at any node → not balanced.

Optimal Approach (O(N)):
- Return -2 (sentinel) when an imbalance is detected during DFS.
- This way we short-circuit and avoid redundant work.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
function isBalanced(root) {
    function checkHeight(node) {
        if (!node) return -1;
        const lh = checkHeight(node.left);
        if (lh === -2) return -2;  // Propagate imbalance upward

        const rh = checkHeight(node.right);
        if (rh === -2) return -2;

        if (Math.abs(lh - rh) > 1) return -2;  // Imbalance detected here
        return 1 + Math.max(lh, rh);
    }
    return checkHeight(root) !== -2;
}


// ============================================================
// 11. CHECK IF TREE IS SYMMETRIC / MIRROR
// ============================================================
/*
A tree is symmetric if the left subtree is a mirror of the right
subtree at every level.

Approach:
- Compare left.left with right.right  (outer pair)
- Compare left.right with right.left  (inner pair)
- Both must match recursively.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
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


// ============================================================
// 12. COUNT TOTAL NODES
// ============================================================
/*
Simple DFS: count = 1 + countLeft + countRight

For a COMPLETE binary tree specifically (LC #222):
- Use binary search + bit manipulation for O(log²N).
- Here we show the general O(N) solution.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}


// ============================================================
// 13. MAXIMUM PATH SUM
// ============================================================
/*
Path = sequence of nodes where each pair of adjacent nodes has
an edge. The path does NOT need to go through the root.

Approach:
- For every node, the best path THROUGH it is:
    node.val + max(0, bestFromLeft) + max(0, bestFromRight)
  (we take 0 instead of a negative subtree contribution)
- Track global max during DFS.
- Return to parent only the SINGLE best branch (left or right).
  We cannot return BOTH branches — a path can't split.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
function maxPathSum(root) {
    let globalMax = -Infinity;

    function dfs(node) {
        if (!node) return 0;
        const leftGain  = Math.max(0, dfs(node.left));   // Ignore negatives
        const rightGain = Math.max(0, dfs(node.right));
        // Best complete path through this node
        globalMax = Math.max(globalMax, node.val + leftGain + rightGain);
        // Return best SINGLE branch to parent
        return node.val + Math.max(leftGain, rightGain);
    }

    dfs(root);
    return globalMax;
}


// ============================================================
// 14. LOWEST COMMON ANCESTOR (LCA)
// ============================================================
/*
LCA of nodes p and q = deepest node that has both p and q as
descendants (a node can be a descendant of itself).

Approach:
- If root is null → return null (not found)
- If root equals p or q → return root (found one of them)
- Recurse on left and right subtrees.
- If BOTH left and right return non-null → root is the LCA
  (p and q are in different subtrees).
- Otherwise return whichever side is non-null.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
function lowestCommonAncestor(root, p, q) {
    if (!root) return null;
    if (root.val === p.val || root.val === q.val) return root;

    const leftLCA  = lowestCommonAncestor(root.left,  p, q);
    const rightLCA = lowestCommonAncestor(root.right, p, q);

    if (leftLCA && rightLCA) return root;    // p in left, q in right → LCA is root
    return leftLCA ?? rightLCA;              // Both in same subtree
}


// ============================================================
// 15. ZIGZAG (SPIRAL) LEVEL ORDER TRAVERSAL
// ============================================================
/*
Same as level order BFS, but alternate the direction:
- Even levels → left to right
- Odd  levels → right to left  (reverse the level array)

Time  Complexity: O(N)
Space Complexity: O(N)
*/
function zigzagLevelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        if (!leftToRight) level.reverse();
        result.push(level);
        leftToRight = !leftToRight;
    }
    return result;
}


// ============================================================
// 16. LEFT / RIGHT / TOP / BOTTOM VIEW
// ============================================================

// ── 16a. Left View ──
/*
The leftmost visible node at each level when viewed from the left.
→ First node of each level in BFS.

Time  Complexity: O(N)
Space Complexity: O(N)
*/
function leftView(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (i === 0) result.push(node.val);  // First node of the level
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}

// ── 16b. Right View ──
/*
The rightmost visible node at each level when viewed from the right.
→ Last node of each level in BFS.

Time  Complexity: O(N)
Space Complexity: O(N)
*/
function rightView(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (i === levelSize - 1) result.push(node.val);  // Last node of the level
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}

// ── 16c. Top View ──
/*
Nodes visible when the tree is viewed from the TOP.
A node is visible if it is the FIRST node encountered at a
horizontal distance (HD) from the root.

HD of root = 0; HD of left child = parent HD - 1;
HD of right child = parent HD + 1.

BFS ensures the first node seen at each HD is the topmost.

Time  Complexity: O(N log N) — due to ordered Map sorting
Space Complexity: O(N)
*/
function topView(root) {
    if (!root) return [];
    const hdMap = new Map();   // HD → node value
    const queue = [[root, 0]]; // [node, horizontal distance]

    while (queue.length > 0) {
        const [node, hd] = queue.shift();
        if (!hdMap.has(hd)) hdMap.set(hd, node.val);  // First at this HD → top view
        if (node.left)  queue.push([node.left,  hd - 1]);
        if (node.right) queue.push([node.right, hd + 1]);
    }

    // Sort by horizontal distance to get left-to-right order
    return [...hdMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([, val]) => val);
}

// ── 16d. Bottom View ──
/*
Nodes visible when the tree is viewed from the BOTTOM.
A node is visible if it is the LAST node seen at a given HD.
BFS naturally overwrites earlier entries → bottom view.

Time  Complexity: O(N log N)
Space Complexity: O(N)
*/
function bottomView(root) {
    if (!root) return [];
    const hdMap = new Map();
    const queue = [[root, 0]];

    while (queue.length > 0) {
        const [node, hd] = queue.shift();
        hdMap.set(hd, node.val);   // Always overwrite → last = bottom
        if (node.left)  queue.push([node.left,  hd - 1]);
        if (node.right) queue.push([node.right, hd + 1]);
    }

    return [...hdMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([, val]) => val);
}


// ============================================================
// 17. BOUNDARY TRAVERSAL
// ============================================================
/*
Print all boundary nodes in ANTI-CLOCKWISE order:
  1. Left boundary  (top-down, excluding leaves)
  2. All leaf nodes  (left-to-right)
  3. Right boundary  (bottom-up, excluding leaves)

Approach:
- Add root (if not a leaf).
- Traverse left boundary: go left; if no left, go right. Stop before leaf.
- Collect leaves using DFS.
- Traverse right boundary: go right; if no right, go left. Stop before leaf.
  Collect in a temporary array and reverse it (we want bottom-up).

Time  Complexity: O(N)
Space Complexity: O(N)
*/
function boundaryTraversal(root) {
    if (!root) return [];
    const result = [];

    const isLeaf = (node) => !node.left && !node.right;

    // 1. Root (if not a leaf)
    if (!isLeaf(root)) result.push(root.val);

    // 2. Left boundary (top-down, excluding leaf)
    let node = root.left;
    while (node) {
        if (!isLeaf(node)) result.push(node.val);
        node = node.left ? node.left : node.right;
    }

    // 3. All leaves (DFS)
    function addLeaves(n) {
        if (!n) return;
        if (isLeaf(n)) { result.push(n.val); return; }
        addLeaves(n.left);
        addLeaves(n.right);
    }
    addLeaves(root);

    // 4. Right boundary (bottom-up, excluding leaf)
    const rightBoundary = [];
    node = root.right;
    while (node) {
        if (!isLeaf(node)) rightBoundary.push(node.val);
        node = node.right ? node.right : node.left;
    }
    result.push(...rightBoundary.reverse());  // Reverse for bottom-up

    return result;
}


// ============================================================
// 18. VERTICAL ORDER TRAVERSAL
// ============================================================
/*
Group nodes by their (column, row) coordinates where:
  - Root is at (col=0, row=0)
  - Left child:  col - 1, row + 1
  - Right child: col + 1, row + 1

Within the same (col, row) sort by VALUE.
Result: columns sorted left-to-right.

Approach:
- BFS, storing [node, col, row] in queue.
- Use a Map: col → sorted list of (row, val) pairs.
- After BFS, sort columns and within each column sort by row then val.

Time  Complexity: O(N log N)
Space Complexity: O(N)
*/
function verticalOrderTraversal(root) {
    if (!root) return [];
    const colMap = new Map();  // col → [ [row, val], ... ]
    const queue = [[root, 0, 0]];

    while (queue.length > 0) {
        const [node, col, row] = queue.shift();
        if (!colMap.has(col)) colMap.set(col, []);
        colMap.get(col).push([row, node.val]);
        if (node.left)  queue.push([node.left,  col - 1, row + 1]);
        if (node.right) queue.push([node.right, col + 1, row + 1]);
    }

    return [...colMap.entries()]
        .sort((a, b) => a[0] - b[0])                       // Sort by column
        .map(([, entries]) =>
            entries
                .sort((a, b) => a[0] - b[0] || a[1] - b[1])  // Sort by row, then val
                .map(([, val]) => val)
        );
}


// ============================================================
// 19. MORRIS INORDER TRAVERSAL (O(1) Space)
// ============================================================
/*
Standard iterative/recursive traversal uses O(H) stack space.
Morris traversal achieves O(1) extra space by temporarily
modifying tree links (threading).

Key Idea — Threaded Binary Tree:
- For each node, find the INORDER PREDECESSOR (rightmost node
  in left subtree).
- If predecessor's right is null → create a thread: point it
  to current node. Move current to current.left.
- If predecessor's right points back to current → thread already
  exists (second visit). Remove thread. Record current. Move right.

Approach (Step by Step):
1. Start: curr = root.
2. While curr is not null:
   a. If curr has NO left child:
      → Visit curr (record value).
      → Move curr = curr.right.
   b. If curr HAS a left child:
      → Find inorder predecessor (rightmost of left subtree).
      → If predecessor.right == null:
         • Create thread: predecessor.right = curr.
         • Move curr = curr.left.
      → If predecessor.right == curr:
         • Remove thread: predecessor.right = null.
         • Visit curr (record value).
         • Move curr = curr.right.

Time  Complexity: O(N) — each node visited at most twice
Space Complexity: O(1) — no stack or recursion used

Note: The tree is temporarily modified but restored to its
      original structure after traversal.
*/
function morrisInorder(root) {
    const result = [];
    let curr = root;

    while (curr) {
        if (curr.left) {
            // Find inorder predecessor (rightmost in left subtree)
            let predecessor = curr.left;
            while (predecessor.right && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }

            if (predecessor.right === curr) {
                // Second visit: remove thread, visit curr
                predecessor.right = null;
                result.push(curr.val);
                curr = curr.right;
            } else {
                // First visit: create thread back to curr
                predecessor.right = curr;
                curr = curr.left;
            }
        } else {
            // No left child — visit and move right
            result.push(curr.val);
            curr = curr.right;
        }
    }
    return result;
}

// Morris Preorder — same logic, but record BEFORE going left
function morrisPreorder(root) {
    const result = [];
    let curr = root;

    while (curr) {
        if (curr.left) {
            let predecessor = curr.left;
            while (predecessor.right && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }
            if (predecessor.right === curr) {
                predecessor.right = null;
                curr = curr.right;
            } else {
                result.push(curr.val);  // Visit here (first time) for preorder
                predecessor.right = curr;
                curr = curr.left;
            }
        } else {
            result.push(curr.val);  // Visit here for preorder
            curr = curr.right;
        }
    }
    return result;
}


// ============================================================
// 20. SERIALIZE & DESERIALIZE BINARY TREE
// ============================================================
/*
Serialize  → Convert a tree to a string representation.
Deserialize → Rebuild the tree from that string.

Approach (Level Order / BFS):
- Serialize: BFS and write each node's value; write "null" for
  missing children. Join with commas.
- Deserialize: Split string. Create root from first token.
  Use a queue: for each node, take next two tokens as its
  left and right children.

Time  Complexity: O(N)
Space Complexity: O(N)
*/
function serialize(root) {
    if (!root) return "null";
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node === null) {
            result.push("null");
        } else {
            result.push(String(node.val));
            queue.push(node.left, node.right);   // Push even if null
        }
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
// 21. COMPLEXITY SUMMARY
// ============================================================
/*
╔══════════════════════════════════════╦════════╦═══════════╗
║ Operation                            ║  Time  ║   Space   ║
╠══════════════════════════════════════╬════════╬═══════════╣
║ Preorder / Inorder / Postorder (rec) ║  O(N)  ║   O(H)    ║
║ Iterative Traversals                 ║  O(N)  ║   O(N)    ║
║ Level Order (BFS)                    ║  O(N)  ║   O(N)    ║
║ All-in-One Traversal                 ║  O(N)  ║   O(N)    ║
║ Height of Tree                       ║  O(N)  ║   O(H)    ║
║ Diameter of Tree                     ║  O(N)  ║   O(H)    ║
║ Check Balanced                       ║  O(N)  ║   O(H)    ║
║ Check Symmetric                      ║  O(N)  ║   O(H)    ║
║ Count Nodes                          ║  O(N)  ║   O(H)    ║
║ Maximum Path Sum                     ║  O(N)  ║   O(H)    ║
║ Lowest Common Ancestor               ║  O(N)  ║   O(H)    ║
║ Zigzag Level Order                   ║  O(N)  ║   O(N)    ║
║ Left / Right View                    ║  O(N)  ║   O(N)    ║
║ Top / Bottom View                    ║ O(NlogN)║  O(N)    ║
║ Boundary Traversal                   ║  O(N)  ║   O(N)    ║
║ Vertical Order Traversal             ║ O(NlogN)║  O(N)    ║
║ Morris Inorder / Preorder            ║  O(N)  ║   O(1)    ║
║ Serialize / Deserialize              ║  O(N)  ║   O(N)    ║
╚══════════════════════════════════════╩════════╩═══════════╝

H = height of tree
  → Balanced tree: H = O(log N)
  → Skewed tree:   H = O(N)
*/

