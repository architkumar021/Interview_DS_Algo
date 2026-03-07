/*
============================================================
      BINARY TREE — COMPLETE GUIDE (C++)
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

#include <bits/stdc++.h>
using namespace std;


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
 Max nodes at level L          = 2^(L-1)
 Max nodes in tree of height H = 2^H - 1
 Min height for N nodes        = floor(log2(N))
 In a Full Binary Tree:        leaves = internal nodes + 1
*/


// ============================================================
// 2. TYPES OF BINARY TREES
// ============================================================
/*
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
*/


// ============================================================
// 3. NODE STRUCTURE & TREE CONSTRUCTION
// ============================================================

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

/*
Helper: Build a tree from a level-order vector.
-1 represents a missing/null node.

Example: {1, 2, 3, 4, 5, -1, 6}
builds:
        1
       / \
      2   3
     / \ / \
    4  5 _  6
*/
TreeNode* buildTreeFromArray(vector<int>& arr) {
    if (arr.empty() || arr[0] == -1) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    int i = 1;
    while (!q.empty() && i < (int)arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < (int)arr.size() && arr[i] != -1) {
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < (int)arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
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
*/

// ── 4a. Preorder (Root → Left → Right) ──
void preorderHelper(TreeNode* node, vector<int>& result) {
    if (!node) return;
    result.push_back(node->val);   // Visit root FIRST
    preorderHelper(node->left,  result);
    preorderHelper(node->right, result);
}
vector<int> preorderRecursive(TreeNode* root) {
    vector<int> result;
    preorderHelper(root, result);
    return result;
}

// ── 4b. Inorder (Left → Root → Right) ──
void inorderHelper(TreeNode* node, vector<int>& result) {
    if (!node) return;
    inorderHelper(node->left,  result);
    result.push_back(node->val);   // Visit root IN MIDDLE
    inorderHelper(node->right, result);
}
vector<int> inorderRecursive(TreeNode* root) {
    vector<int> result;
    inorderHelper(root, result);
    return result;
}

// ── 4c. Postorder (Left → Right → Root) ──
void postorderHelper(TreeNode* node, vector<int>& result) {
    if (!node) return;
    postorderHelper(node->left,  result);
    postorderHelper(node->right, result);
    result.push_back(node->val);   // Visit root LAST
}
vector<int> postorderRecursive(TreeNode* root) {
    vector<int> result;
    postorderHelper(root, result);
    return result;
}


// ============================================================
// 5. ITERATIVE TRAVERSALS (Stack-Based)
// ============================================================
/*
Why iterative?
- Avoids stack-overflow on very deep / skewed trees.
- Gives explicit control over traversal state.
*/

// ── 5a. Iterative Preorder ──
/*
Approach:
- Push root onto stack.
- Pop node → record value → push RIGHT then LEFT.
  (Right first so left is processed first — LIFO)
*/
vector<int> preorderIterative(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    stack<TreeNode*> st;
    st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        result.push_back(node->val);
        if (node->right) st.push(node->right);  // Push right FIRST
        if (node->left)  st.push(node->left);   // Push left SECOND (processed first)
    }
    return result;
}

// ── 5b. Iterative Inorder ──
/*
Approach:
- Drill down the left spine, pushing every node to the stack.
- Pop a node → record value → move to its right child.
*/
vector<int> inorderIterative(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) {                // Go all the way left
            st.push(curr);
            curr = curr->left;
        }
        curr = st.top(); st.pop();
        result.push_back(curr->val); // Visit node
        curr = curr->right;          // Move to right subtree
    }
    return result;
}

// ── 5c. Iterative Postorder (Two-Stack Method) ──
/*
Approach:
- Similar to preorder but push LEFT before RIGHT.
- Collect results in stack2 (reverses the order to post-order).
- Drain stack2 into result array.
*/
vector<int> postorderIterative(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    stack<TreeNode*> st1, st2;
    st1.push(root);
    while (!st1.empty()) {
        TreeNode* node = st1.top(); st1.pop();
        st2.push(node);
        if (node->left)  st1.push(node->left);
        if (node->right) st1.push(node->right);
    }
    while (!st2.empty()) {
        result.push_back(st2.top()->val);
        st2.pop();
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
Space Complexity: O(N)
*/
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> level;
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
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

Time  Complexity: O(3N) ≈ O(N)
Space Complexity: O(N)
*/
void allInOneTraversal(TreeNode* root,
                       vector<int>& pre,
                       vector<int>& ino,
                       vector<int>& post) {
    if (!root) return;
    // Stack stores {node, visitCount}
    stack<pair<TreeNode*, int>> st;
    st.push({root, 1});

    while (!st.empty()) {
        auto& [node, state] = st.top();

        if (state == 1) {
            pre.push_back(node->val);    // Preorder: record now
            state++;
            if (node->left) st.push({node->left, 1});
        } else if (state == 2) {
            ino.push_back(node->val);    // Inorder: record now
            state++;
            if (node->right) st.push({node->right, 1});
        } else {
            post.push_back(node->val);   // Postorder: record now
            st.pop();
        }
    }
}


// ============================================================
// 8. HEIGHT & DEPTH OF TREE
// ============================================================
/*
Height of a node = length of longest path from node to a leaf.
  - Height of leaf = 0
  - Height of null = -1

Depth of a node  = length of path from root to that node.
  - Depth of root = 0

Time  Complexity: O(N)
Space Complexity: O(H)
*/
int heightOfTree(TreeNode* root) {
    if (!root) return -1;
    int lh = heightOfTree(root->left);
    int rh = heightOfTree(root->right);
    return 1 + max(lh, rh);
}

int depthOfNode(TreeNode* root, int target, int depth = 0) {
    if (!root) return -1;
    if (root->val == target) return depth;
    int left = depthOfNode(root->left, target, depth + 1);
    if (left != -1) return left;
    return depthOfNode(root->right, target, depth + 1);
}


// ============================================================
// 9. DIAMETER OF BINARY TREE
// ============================================================
/*
Diameter = longest path between ANY two nodes (edges count).

Approach:
- For every node: diameter through it = leftHeight + rightHeight + 2
- Track global maximum across all nodes.
- Compute height and diameter simultaneously in ONE DFS pass.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
int diameterOfBinaryTree(TreeNode* root) {
    int maxDiameter = 0;

    function<int(TreeNode*)> dfsHeight = [&](TreeNode* node) -> int {
        if (!node) return -1;
        int lh = dfsHeight(node->left);
        int rh = dfsHeight(node->right);
        maxDiameter = max(maxDiameter, lh + rh + 2);
        return 1 + max(lh, rh);
    };

    dfsHeight(root);
    return maxDiameter;
}


// ============================================================
// 10. CHECK IF TREE IS BALANCED
// ============================================================
/*
A tree is height-balanced if for every node:
  |height(left subtree) - height(right subtree)| ≤ 1

Optimal Approach (O(N)):
- Return -2 (sentinel) when imbalance is detected during DFS.
- Short-circuits further computation when imbalance is found.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
bool isBalanced(TreeNode* root) {
    function<int(TreeNode*)> checkHeight = [&](TreeNode* node) -> int {
        if (!node) return -1;
        int lh = checkHeight(node->left);
        if (lh == -2) return -2;         // Propagate imbalance upward

        int rh = checkHeight(node->right);
        if (rh == -2) return -2;

        if (abs(lh - rh) > 1) return -2; // Imbalance detected here
        return 1 + max(lh, rh);
    };

    return checkHeight(root) != -2;
}


// ============================================================
// 11. CHECK IF TREE IS SYMMETRIC / MIRROR
// ============================================================
/*
A tree is symmetric if left subtree is a mirror of right subtree.

Approach:
- Compare left.left with right.right  (outer pair)
- Compare left.right with right.left  (inner pair)

Time  Complexity: O(N)
Space Complexity: O(H)
*/
bool isSymmetric(TreeNode* root) {
    function<bool(TreeNode*, TreeNode*)> isMirror =
        [&](TreeNode* left, TreeNode* right) -> bool {
            if (!left && !right) return true;
            if (!left || !right) return false;
            return left->val == right->val
                && isMirror(left->left,  right->right)
                && isMirror(left->right, right->left);
        };
    return isMirror(root->left, root->right);
}


// ============================================================
// 12. COUNT TOTAL NODES
// ============================================================
/*
Time  Complexity: O(N)
Space Complexity: O(H)
*/
int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}


// ============================================================
// 13. MAXIMUM PATH SUM
// ============================================================
/*
Path = sequence of nodes where each pair of adjacent nodes has
an edge. Path does NOT need to pass through root.

Approach:
- For every node: best path THROUGH it =
    node->val + max(0, bestFromLeft) + max(0, bestFromRight)
  (take 0 instead of negative subtree contribution)
- Track global max. Return only the SINGLE best branch to parent.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
int maxPathSum(TreeNode* root) {
    int globalMax = INT_MIN;

    function<int(TreeNode*)> dfs = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int leftGain  = max(0, dfs(node->left));   // Ignore negatives
        int rightGain = max(0, dfs(node->right));
        globalMax = max(globalMax, node->val + leftGain + rightGain);
        return node->val + max(leftGain, rightGain);
    };

    dfs(root);
    return globalMax;
}


// ============================================================
// 14. LOWEST COMMON ANCESTOR (LCA)
// ============================================================
/*
LCA of nodes p and q = deepest node that has both as descendants.

Approach:
- If root == null → return null
- If root == p or q → return root
- Recurse left and right.
- If both sides return non-null → root is the LCA.
- Otherwise return the non-null side.

Time  Complexity: O(N)
Space Complexity: O(H)
*/
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root) return nullptr;
    if (root->val == p->val || root->val == q->val) return root;

    TreeNode* leftLCA  = lowestCommonAncestor(root->left,  p, q);
    TreeNode* rightLCA = lowestCommonAncestor(root->right, p, q);

    if (leftLCA && rightLCA) return root;
    return leftLCA ? leftLCA : rightLCA;
}


// ============================================================
// 15. ZIGZAG (SPIRAL) LEVEL ORDER TRAVERSAL
// ============================================================
/*
Same as BFS level order, but alternate direction each level.

Time  Complexity: O(N)
Space Complexity: O(N)
*/
vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    bool leftToRight = true;

    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> level(levelSize);
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            int idx = leftToRight ? i : (levelSize - 1 - i);
            level[idx] = node->val;
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
        leftToRight = !leftToRight;
    }
    return result;
}


// ============================================================
// 16. LEFT / RIGHT / TOP / BOTTOM VIEW
// ============================================================

// ── 16a. Left View ── (first node at each level in BFS)
vector<int> leftView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int levelSize = q.size();
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            if (i == 0) result.push_back(node->val);  // First node of level
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}

// ── 16b. Right View ── (last node at each level in BFS)
vector<int> rightView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int levelSize = q.size();
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            if (i == levelSize - 1) result.push_back(node->val);  // Last node of level
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}

// ── 16c. Top View ──
/*
HD of root = 0; left child = HD-1; right child = HD+1.
First node seen at each HD (via BFS) = top view.

Time O(N log N), Space O(N)
*/
vector<int> topView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    map<int, int> hdMap;  // HD → node value (ordered map for sorted output)
    queue<pair<TreeNode*, int>> q;
    q.push({root, 0});

    while (!q.empty()) {
        auto [node, hd] = q.front(); q.pop();
        if (hdMap.find(hd) == hdMap.end())
            hdMap[hd] = node->val;  // First at this HD → top view
        if (node->left)  q.push({node->left,  hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    for (auto& [hd, val] : hdMap)
        result.push_back(val);
    return result;
}

// ── 16d. Bottom View ──
/*
Last node seen at each HD (via BFS) = bottom view.
Always overwrite in the map.

Time O(N log N), Space O(N)
*/
vector<int> bottomView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    map<int, int> hdMap;
    queue<pair<TreeNode*, int>> q;
    q.push({root, 0});

    while (!q.empty()) {
        auto [node, hd] = q.front(); q.pop();
        hdMap[hd] = node->val;  // Always overwrite → last = bottom
        if (node->left)  q.push({node->left,  hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    for (auto& [hd, val] : hdMap)
        result.push_back(val);
    return result;
}


// ============================================================
// 17. BOUNDARY TRAVERSAL
// ============================================================
/*
Anti-clockwise boundary:
  1. Left boundary  (top-down, excluding leaves)
  2. All leaf nodes  (left-to-right)
  3. Right boundary  (bottom-up, excluding leaves)

Time  Complexity: O(N)
Space Complexity: O(N)
*/
bool isLeaf(TreeNode* node) {
    return !node->left && !node->right;
}

void addLeftBoundary(TreeNode* root, vector<int>& result) {
    TreeNode* curr = root->left;
    while (curr) {
        if (!isLeaf(curr)) result.push_back(curr->val);
        curr = curr->left ? curr->left : curr->right;
    }
}

void addLeaves(TreeNode* root, vector<int>& result) {
    if (!root) return;
    if (isLeaf(root)) { result.push_back(root->val); return; }
    addLeaves(root->left, result);
    addLeaves(root->right, result);
}

void addRightBoundary(TreeNode* root, vector<int>& result) {
    TreeNode* curr = root->right;
    vector<int> temp;
    while (curr) {
        if (!isLeaf(curr)) temp.push_back(curr->val);
        curr = curr->right ? curr->right : curr->left;
    }
    reverse(temp.begin(), temp.end());  // Bottom-up order
    result.insert(result.end(), temp.begin(), temp.end());
}

vector<int> boundaryTraversal(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    if (!isLeaf(root)) result.push_back(root->val);  // Root (if not leaf)
    addLeftBoundary(root, result);
    addLeaves(root, result);
    addRightBoundary(root, result);
    return result;
}


// ============================================================
// 18. VERTICAL ORDER TRAVERSAL
// ============================================================
/*
Group nodes by (col, row) coordinates:
  - Root: (col=0, row=0)
  - Left child:  col-1, row+1
  - Right child: col+1, row+1
Within same (col, row), sort by VALUE.

Time  Complexity: O(N log N)
Space Complexity: O(N)
*/
vector<vector<int>> verticalOrderTraversal(TreeNode* root) {
    // map: col → map: row → multiset of values (sorted)
    map<int, map<int, multiset<int>>> nodes;
    queue<tuple<TreeNode*, int, int>> q;
    q.push({root, 0, 0});

    while (!q.empty()) {
        auto [node, col, row] = q.front(); q.pop();
        nodes[col][row].insert(node->val);
        if (node->left)  q.push({node->left,  col - 1, row + 1});
        if (node->right) q.push({node->right, col + 1, row + 1});
    }

    vector<vector<int>> result;
    for (auto& [col, rows] : nodes) {
        vector<int> colVals;
        for (auto& [row, vals] : rows)
            for (int val : vals)
                colVals.push_back(val);
        result.push_back(colVals);
    }
    return result;
}


// ============================================================
// 19. MORRIS INORDER TRAVERSAL (O(1) Space)
// ============================================================
/*
Achieves O(1) extra space by threading the tree temporarily.

Key Idea — Threaded Binary Tree:
- For each node, find INORDER PREDECESSOR (rightmost in left subtree).
- If predecessor.right == null → create thread → move left.
- If predecessor.right == curr → remove thread → visit curr → move right.

Time  Complexity: O(N) — each node visited at most twice
Space Complexity: O(1) — no extra stack or recursion
*/
vector<int> morrisInorder(TreeNode* root) {
    vector<int> result;
    TreeNode* curr = root;

    while (curr) {
        if (!curr->left) {
            // No left child — visit and move right
            result.push_back(curr->val);
            curr = curr->right;
        } else {
            // Find inorder predecessor (rightmost in left subtree)
            TreeNode* predecessor = curr->left;
            while (predecessor->right && predecessor->right != curr)
                predecessor = predecessor->right;

            if (!predecessor->right) {
                // First visit: create thread back to curr
                predecessor->right = curr;
                curr = curr->left;
            } else {
                // Second visit: remove thread, visit curr
                predecessor->right = nullptr;
                result.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return result;
}

// Morris Preorder — record BEFORE going left (first visit)
vector<int> morrisPreorder(TreeNode* root) {
    vector<int> result;
    TreeNode* curr = root;

    while (curr) {
        if (!curr->left) {
            result.push_back(curr->val);  // Visit here for preorder
            curr = curr->right;
        } else {
            TreeNode* predecessor = curr->left;
            while (predecessor->right && predecessor->right != curr)
                predecessor = predecessor->right;

            if (!predecessor->right) {
                result.push_back(curr->val);  // Visit here (first time)
                predecessor->right = curr;
                curr = curr->left;
            } else {
                predecessor->right = nullptr;
                curr = curr->right;
            }
        }
    }
    return result;
}


// ============================================================
// 20. SERIALIZE & DESERIALIZE BINARY TREE
// ============================================================
/*
Serialize  → Convert tree to a string.
Deserialize → Rebuild tree from the string.

Approach (Level Order / BFS):
- Serialize: BFS, write values; write "#" for null children.
- Deserialize: Split string, create root, use queue to assign children.

Time  Complexity: O(N)
Space Complexity: O(N)
*/
string serialize(TreeNode* root) {
    if (!root) return "#";
    string result = "";
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (node == nullptr) {
            result += "#,";
        } else {
            result += to_string(node->val) + ",";
            q.push(node->left);
            q.push(node->right);
        }
    }
    return result;
}

TreeNode* deserialize(string data) {
    if (data == "#") return nullptr;
    stringstream ss(data);
    string token;
    getline(ss, token, ',');
    TreeNode* root = new TreeNode(stoi(token));
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (getline(ss, token, ',') && token != "#") {
            node->left = new TreeNode(stoi(token));
            q.push(node->left);
        }
        if (getline(ss, token, ',') && token != "#") {
            node->right = new TreeNode(stoi(token));
            q.push(node->right);
        }
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

