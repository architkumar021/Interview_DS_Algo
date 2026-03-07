"""
============================================================
      BINARY TREE — COMPLETE GUIDE (Python)
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
"""

from collections import deque, defaultdict
from typing import Optional, List


# ============================================================
# 1. INTRODUCTION & CORE TERMINOLOGY
# ============================================================
"""
A Binary Tree is a hierarchical data structure where every node
has AT MOST two children — commonly called left and right child.

Key Terms:
─────────────────────────────────────────────────────────────
 Root         → Topmost node (no parent)
 Leaf         → Node with no children (left = right = None)
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
 Max nodes at level L          = 2^(L-1)
 Max nodes in tree of height H = 2^H - 1
 Min height for N nodes        = floor(log2(N))
 In a Full Binary Tree:        leaves = internal nodes + 1
"""


# ============================================================
# 2. TYPES OF BINARY TREES
# ============================================================
"""
┌──────────────────────────────────────────────────────────┐
│  Full Binary Tree                                        │
│  → Every node has 0 or 2 children (never exactly 1)     │
├──────────────────────────────────────────────────────────┤
│  Complete Binary Tree                                    │
│  → All levels filled except possibly the last, which    │
│    is filled from LEFT to RIGHT                          │
├──────────────────────────────────────────────────────────┤
│  Perfect Binary Tree                                     │
│  → All internal nodes have exactly 2 children           │
│  → All leaves are at the SAME level                     │
├──────────────────────────────────────────────────────────┤
│  Balanced Binary Tree                                    │
│  → For EVERY node: |height(left) - height(right)| ≤ 1   │
│  → Guarantees O(log N) operations                        │
│  → AVL Trees and Red-Black Trees are self-balancing      │
├──────────────────────────────────────────────────────────┤
│  Degenerate / Skewed Tree                                │
│  → Every node has only ONE child (like a linked list)   │
└──────────────────────────────────────────────────────────┘
"""


# ============================================================
# 3. NODE STRUCTURE & TREE CONSTRUCTION
# ============================================================

class TreeNode:
    def __init__(self, val: int = 0):
        self.val = val
        self.left: Optional['TreeNode'] = None
        self.right: Optional['TreeNode'] = None


def build_tree_from_array(arr: List[Optional[int]]) -> Optional[TreeNode]:
    """
    Build a tree from a level-order list.
    None in the list represents a missing/null node.

    Example: [1, 2, 3, 4, 5, None, 6]
    builds:
            1
           / \\
          2   3
         / \\ / \\
        4  5 _  6
    """
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root


# ============================================================
# 4. RECURSIVE TRAVERSALS
# ============================================================
"""
The three classic DFS traversals differ only in WHEN the root
node is visited relative to its children:

  Preorder  → Root  → Left  → Right   (used to COPY / SERIALIZE a tree)
  Inorder   → Left  → Root  → Right   (gives SORTED order in BST)
  Postorder → Left  → Right → Root    (used to DELETE a tree)

Time  Complexity: O(N) — every node visited once
Space Complexity: O(H) — recursion call stack
"""

# ── 4a. Preorder (Root → Left → Right) ──
def preorder_recursive(root: Optional[TreeNode]) -> List[int]:
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)   # Visit root FIRST
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result

# ── 4b. Inorder (Left → Root → Right) ──
def inorder_recursive(root: Optional[TreeNode]) -> List[int]:
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)   # Visit root IN MIDDLE
        dfs(node.right)
    dfs(root)
    return result

# ── 4c. Postorder (Left → Right → Root) ──
def postorder_recursive(root: Optional[TreeNode]) -> List[int]:
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)   # Visit root LAST
    dfs(root)
    return result


# ============================================================
# 5. ITERATIVE TRAVERSALS (Stack-Based)
# ============================================================
"""
Why iterative?
- Avoids recursion limit errors on very deep / skewed trees.
- Gives explicit control over traversal state.
"""

# ── 5a. Iterative Preorder ──
"""
Approach:
- Push root onto stack.
- Pop node → record value → push RIGHT then LEFT.
  (Right first so left is processed first — LIFO)
"""
def preorder_iterative(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    result = []
    stack = [root]
    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right)  # Push right FIRST
        if node.left:
            stack.append(node.left)   # Push left SECOND (processed first)
    return result

# ── 5b. Iterative Inorder ──
"""
Approach:
- Drill down the left spine, pushing every node to the stack.
- Pop a node → record value → move to its right child.
"""
def inorder_iterative(root: Optional[TreeNode]) -> List[int]:
    result = []
    stack = []
    curr = root
    while curr or stack:
        while curr:                   # Go all the way left
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)       # Visit node
        curr = curr.right             # Move to right subtree
    return result

# ── 5c. Iterative Postorder (Two-Stack Method) ──
"""
Approach:
- Similar to preorder but push LEFT before RIGHT.
- Collect results in stack2 (reverses the order to post-order).
- Drain stack2 into result list.
"""
def postorder_iterative(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    result = []
    stack1 = [root]
    stack2 = []
    while stack1:
        node = stack1.pop()
        stack2.append(node)
        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)
    while stack2:
        result.append(stack2.pop().val)
    return result


# ============================================================
# 6. LEVEL ORDER TRAVERSAL (BFS)
# ============================================================
"""
Approach:
- Use a deque (FIFO).
- Process level by level: snapshot queue size at start of each
  iteration — that many nodes belong to the current level.

Time  Complexity: O(N)
Space Complexity: O(N)
"""
def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result


# ============================================================
# 7. ALL-IN-ONE TRAVERSAL (Single DFS Pass)
# ============================================================
"""
Compute Preorder, Inorder, and Postorder in ONE DFS pass
using a state counter per node:
  state 1 → record for Preorder,  then recurse left
  state 2 → record for Inorder,   then recurse right
  state 3 → record for Postorder, then pop from stack

Time  Complexity: O(3N) ≈ O(N)
Space Complexity: O(N)
"""
def all_in_one_traversal(root: Optional[TreeNode]):
    pre, ino, post = [], [], []
    if not root:
        return pre, ino, post

    # Stack stores [node, state]
    stack = [[root, 1]]

    while stack:
        node, state = stack[-1]

        if state == 1:
            pre.append(node.val)        # Preorder: record now
            stack[-1][1] += 1           # Move to state 2
            if node.left:
                stack.append([node.left, 1])
        elif state == 2:
            ino.append(node.val)        # Inorder: record now
            stack[-1][1] += 1           # Move to state 3
            if node.right:
                stack.append([node.right, 1])
        else:
            post.append(node.val)       # Postorder: record now
            stack.pop()                  # Done with this node

    return pre, ino, post


# ============================================================
# 8. HEIGHT & DEPTH OF TREE
# ============================================================
"""
Height of a node = length of longest path from node to a leaf.
  - Height of leaf = 0
  - Height of None = -1

Depth of a node  = length of path from root to that node.
  - Depth of root = 0

Time  Complexity: O(N)
Space Complexity: O(H)
"""
def height_of_tree(root: Optional[TreeNode]) -> int:
    if not root:
        return -1
    lh = height_of_tree(root.left)
    rh = height_of_tree(root.right)
    return 1 + max(lh, rh)

def depth_of_node(root: Optional[TreeNode], target: int, depth: int = 0) -> int:
    if not root:
        return -1
    if root.val == target:
        return depth
    left = depth_of_node(root.left, target, depth + 1)
    if left != -1:
        return left
    return depth_of_node(root.right, target, depth + 1)


# ============================================================
# 9. DIAMETER OF BINARY TREE
# ============================================================
"""
Diameter = longest path between ANY two nodes (counted in edges).

Approach:
- For every node: diameter through it = leftHeight + rightHeight + 2
- Track global maximum across all nodes.
- Compute height and diameter simultaneously in ONE DFS pass.

Time  Complexity: O(N)
Space Complexity: O(H)
"""
def diameter_of_binary_tree(root: Optional[TreeNode]) -> int:
    max_diameter = [0]  # Use list to allow mutation inside nested function

    def dfs_height(node: Optional[TreeNode]) -> int:
        if not node:
            return -1
        lh = dfs_height(node.left)
        rh = dfs_height(node.right)
        # Diameter through current node (edges)
        max_diameter[0] = max(max_diameter[0], lh + rh + 2)
        return 1 + max(lh, rh)

    dfs_height(root)
    return max_diameter[0]


# ============================================================
# 10. CHECK IF TREE IS BALANCED
# ============================================================
"""
A tree is height-balanced if for every node:
  |height(left subtree) - height(right subtree)| ≤ 1

Optimal Approach (O(N)):
- Return -2 (sentinel) when imbalance is detected during DFS.
- Short-circuits further computation when imbalance is found.

Time  Complexity: O(N)
Space Complexity: O(H)
"""
def is_balanced(root: Optional[TreeNode]) -> bool:
    def check_height(node: Optional[TreeNode]) -> int:
        if not node:
            return -1
        lh = check_height(node.left)
        if lh == -2:
            return -2  # Propagate imbalance upward

        rh = check_height(node.right)
        if rh == -2:
            return -2

        if abs(lh - rh) > 1:
            return -2  # Imbalance detected here
        return 1 + max(lh, rh)

    return check_height(root) != -2


# ============================================================
# 11. CHECK IF TREE IS SYMMETRIC / MIRROR
# ============================================================
"""
A tree is symmetric if left subtree is a mirror of right subtree.

Approach:
- Compare left.left with right.right  (outer pair)
- Compare left.right with right.left  (inner pair)

Time  Complexity: O(N)
Space Complexity: O(H)
"""
def is_symmetric(root: Optional[TreeNode]) -> bool:
    def is_mirror(left: Optional[TreeNode], right: Optional[TreeNode]) -> bool:
        if not left and not right:
            return True   # Both None → symmetric
        if not left or not right:
            return False  # One None, one not
        return (left.val == right.val
                and is_mirror(left.left,  right.right)  # Outer pair
                and is_mirror(left.right, right.left))  # Inner pair

    return is_mirror(root.left, root.right)


# ============================================================
# 12. COUNT TOTAL NODES
# ============================================================
"""
Time  Complexity: O(N)
Space Complexity: O(H)
"""
def count_nodes(root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)


# ============================================================
# 13. MAXIMUM PATH SUM
# ============================================================
"""
Path = sequence of nodes where each pair of adjacent nodes has
an edge. Path does NOT need to pass through root.

Approach:
- For every node: best path THROUGH it =
    node.val + max(0, bestFromLeft) + max(0, bestFromRight)
  (take 0 instead of negative subtree contribution)
- Track global max. Return only the SINGLE best branch to parent.

Time  Complexity: O(N)
Space Complexity: O(H)
"""
def max_path_sum(root: Optional[TreeNode]) -> int:
    global_max = [-(10**9)]

    def dfs(node: Optional[TreeNode]) -> int:
        if not node:
            return 0
        left_gain  = max(0, dfs(node.left))   # Ignore negatives
        right_gain = max(0, dfs(node.right))
        # Best complete path through this node
        global_max[0] = max(global_max[0], node.val + left_gain + right_gain)
        # Return best SINGLE branch to parent
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return global_max[0]


# ============================================================
# 14. LOWEST COMMON ANCESTOR (LCA)
# ============================================================
"""
LCA of nodes p and q = deepest node that has both as descendants.

Approach:
- If root is None → return None
- If root equals p or q → return root
- Recurse left and right.
- If both sides return non-None → root is the LCA.
- Otherwise return the non-None side.

Time  Complexity: O(N)
Space Complexity: O(H)
"""
def lowest_common_ancestor(root: Optional[TreeNode],
                           p: TreeNode, q: TreeNode) -> Optional[TreeNode]:
    if not root:
        return None
    if root.val == p.val or root.val == q.val:
        return root

    left_lca  = lowest_common_ancestor(root.left,  p, q)
    right_lca = lowest_common_ancestor(root.right, p, q)

    if left_lca and right_lca:
        return root           # p in left, q in right → LCA is root
    return left_lca if left_lca else right_lca


# ============================================================
# 15. ZIGZAG (SPIRAL) LEVEL ORDER TRAVERSAL
# ============================================================
"""
Same as BFS level order, but alternate direction each level.

Time  Complexity: O(N)
Space Complexity: O(N)
"""
def zigzag_level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []
    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        if not left_to_right:
            level.reverse()
        result.append(level)
        left_to_right = not left_to_right

    return result


# ============================================================
# 16. LEFT / RIGHT / TOP / BOTTOM VIEW
# ============================================================

# ── 16a. Left View ── (first node at each level in BFS)
def left_view(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == 0:
                result.append(node.val)  # First node of each level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return result

# ── 16b. Right View ── (last node at each level in BFS)
def right_view(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:
                result.append(node.val)  # Last node of each level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return result

# ── 16c. Top View ──
"""
HD of root = 0; left child = HD-1; right child = HD+1.
First node seen at each HD (via BFS) = top view.

Time O(N log N), Space O(N)
"""
def top_view(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    hd_map = {}         # HD → node value
    queue = deque([(root, 0)])  # (node, horizontal distance)

    while queue:
        node, hd = queue.popleft()
        if hd not in hd_map:
            hd_map[hd] = node.val   # First at this HD → top view
        if node.left:
            queue.append((node.left,  hd - 1))
        if node.right:
            queue.append((node.right, hd + 1))

    return [hd_map[hd] for hd in sorted(hd_map)]

# ── 16d. Bottom View ──
"""
Last node seen at each HD (via BFS) = bottom view.
Always overwrite in the dict.

Time O(N log N), Space O(N)
"""
def bottom_view(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    hd_map = {}
    queue = deque([(root, 0)])

    while queue:
        node, hd = queue.popleft()
        hd_map[hd] = node.val     # Always overwrite → last = bottom
        if node.left:
            queue.append((node.left,  hd - 1))
        if node.right:
            queue.append((node.right, hd + 1))

    return [hd_map[hd] for hd in sorted(hd_map)]


# ============================================================
# 17. BOUNDARY TRAVERSAL
# ============================================================
"""
Anti-clockwise boundary:
  1. Left boundary  (top-down, excluding leaves)
  2. All leaf nodes  (left-to-right)
  3. Right boundary  (bottom-up, excluding leaves)

Time  Complexity: O(N)
Space Complexity: O(N)
"""
def boundary_traversal(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    result = []

    def is_leaf(node: TreeNode) -> bool:
        return not node.left and not node.right

    # 1. Root (if not a leaf)
    if not is_leaf(root):
        result.append(root.val)

    # 2. Left boundary (top-down, excluding leaf)
    node = root.left
    while node:
        if not is_leaf(node):
            result.append(node.val)
        node = node.left if node.left else node.right

    # 3. All leaves via DFS
    def add_leaves(n: Optional[TreeNode]) -> None:
        if not n:
            return
        if is_leaf(n):
            result.append(n.val)
            return
        add_leaves(n.left)
        add_leaves(n.right)
    add_leaves(root)

    # 4. Right boundary (bottom-up, excluding leaf)
    right_boundary = []
    node = root.right
    while node:
        if not is_leaf(node):
            right_boundary.append(node.val)
        node = node.right if node.right else node.left
    result.extend(reversed(right_boundary))  # Reverse for bottom-up

    return result


# ============================================================
# 18. VERTICAL ORDER TRAVERSAL
# ============================================================
"""
Group nodes by (col, row) coordinates:
  - Root: (col=0, row=0)
  - Left child:  col-1, row+1
  - Right child: col+1, row+1
Within same (col, row), sort by VALUE.

Time  Complexity: O(N log N)
Space Complexity: O(N)
"""
def vertical_order_traversal(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    # col → list of (row, val)
    col_map = defaultdict(list)
    queue = deque([(root, 0, 0)])  # (node, col, row)

    while queue:
        node, col, row = queue.popleft()
        col_map[col].append((row, node.val))
        if node.left:
            queue.append((node.left,  col - 1, row + 1))
        if node.right:
            queue.append((node.right, col + 1, row + 1))

    result = []
    for col in sorted(col_map.keys()):
        # Sort by row, then by value
        sorted_entries = sorted(col_map[col], key=lambda x: (x[0], x[1]))
        result.append([val for _, val in sorted_entries])

    return result


# ============================================================
# 19. MORRIS INORDER TRAVERSAL (O(1) Space)
# ============================================================
"""
Achieves O(1) extra space by threading the tree temporarily.

Key Idea — Threaded Binary Tree:
- For each node, find INORDER PREDECESSOR (rightmost in left subtree).
- If predecessor.right is None → create thread → move left.
- If predecessor.right == curr → remove thread → visit curr → move right.

Approach (Step by Step):
1. Start: curr = root.
2. While curr is not None:
   a. If curr has NO left child:
      → Visit curr (record value).
      → Move curr = curr.right.
   b. If curr HAS a left child:
      → Find inorder predecessor.
      → If predecessor.right is None:
         • Create thread: predecessor.right = curr.
         • Move curr = curr.left.
      → If predecessor.right == curr:
         • Remove thread: predecessor.right = None.
         • Visit curr.
         • Move curr = curr.right.

Time  Complexity: O(N) — each node visited at most twice
Space Complexity: O(1) — no extra stack or recursion
"""
def morris_inorder(root: Optional[TreeNode]) -> List[int]:
    result = []
    curr = root

    while curr:
        if not curr.left:
            # No left child — visit and move right
            result.append(curr.val)
            curr = curr.right
        else:
            # Find inorder predecessor (rightmost in left subtree)
            predecessor = curr.left
            while predecessor.right and predecessor.right is not curr:
                predecessor = predecessor.right

            if not predecessor.right:
                # First visit: create thread back to curr
                predecessor.right = curr
                curr = curr.left
            else:
                # Second visit: remove thread, visit curr
                predecessor.right = None
                result.append(curr.val)
                curr = curr.right

    return result

# Morris Preorder — record BEFORE going left (first visit)
def morris_preorder(root: Optional[TreeNode]) -> List[int]:
    result = []
    curr = root

    while curr:
        if not curr.left:
            result.append(curr.val)   # Visit here for preorder
            curr = curr.right
        else:
            predecessor = curr.left
            while predecessor.right and predecessor.right is not curr:
                predecessor = predecessor.right

            if not predecessor.right:
                result.append(curr.val)   # Visit here (first time) for preorder
                predecessor.right = curr
                curr = curr.left
            else:
                predecessor.right = None
                curr = curr.right

    return result


# ============================================================
# 20. SERIALIZE & DESERIALIZE BINARY TREE
# ============================================================
"""
Serialize  → Convert tree to a string.
Deserialize → Rebuild tree from the string.

Approach (Level Order / BFS):
- Serialize: BFS, write values; write "null" for None children.
- Deserialize: Split string, create root, use deque to assign children.

Time  Complexity: O(N)
Space Complexity: O(N)
"""
def serialize(root: Optional[TreeNode]) -> str:
    if not root:
        return "null"
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            result.append("null")
        else:
            result.append(str(node.val))
            queue.append(node.left)   # Append even if None
            queue.append(node.right)
    return ",".join(result)

def deserialize(data: str) -> Optional[TreeNode]:
    if data == "null":
        return None
    tokens = data.split(",")
    root = TreeNode(int(tokens[0]))
    queue = deque([root])
    i = 1
    while queue and i < len(tokens):
        node = queue.popleft()
        if tokens[i] != "null":
            node.left = TreeNode(int(tokens[i]))
            queue.append(node.left)
        i += 1
        if i < len(tokens) and tokens[i] != "null":
            node.right = TreeNode(int(tokens[i]))
            queue.append(node.right)
        i += 1
    return root


# ============================================================
# 21. COMPLEXITY SUMMARY
# ============================================================
"""
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
"""


