/*
Question:
Given a binary tree, print its top view.

Approach:
- BFS level-order traversal, tracking [node, hd] in the queue.
- hd (horizontal distance): root=0, left child=hd-1, right child=hd+1.
- For each hd, only store the FIRST node seen (BFS ensures top-to-bottom order).
- After traversal, sort map keys and collect values left → right.

Time:  O(N log N) — sorting map keys.
Space: O(N)

Code:
*/

function getTopView(root) {
    if (!root) return [];

    const map = new Map();           // hd → first node value seen
    const queue = [[root, 0]];       // [node, hd]

    while (queue.length > 0) {
        const [curr, hd] = queue.shift();

        if (!map.has(hd)) map.set(hd, curr.val);   // First node at this hd = top view

        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }

    return [...map.keys()]
        .sort((a, b) => a - b)       // Sort hd left → right
        .map(hd => map.get(hd));
}


// Class representing a single node of the binary tree
class Node {
    // Constructor to initialize node with value
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

// Class containing the logic for top view
class Solution {
    // Function to return the top view of the binary tree
    topView(root) {
        // Create an array to store the final answer
        let ans = [];

        // If tree is empty, return empty result
        if (!root) {
            return ans;
        }

        // Map to store vertical_level -> node value
        let mpp = new Map();

        // Queue for BFS storing [node, vertical_level]
        let q = [];
        q.push([root, 0]);

        // Start BFS traversal
        while (q.length > 0) {
            // Remove the front element from queue
            let [node, line] = q.shift();

            // If vertical level is visited first time, store it
            if (!mpp.has(line)) {
                mpp.set(line, node.data);
            }

            // If left child exists, push with vertical level - 1
            if (node.left) {
                q.push([node.left, line - 1]);
            }

            // If right child exists, push with vertical level + 1
            if (node.right) {
                q.push([node.right, line + 1]);
            }
        }

        // Extract values in sorted order of vertical levels
        let sortedKeys = Array.from(mpp.keys()).sort((a, b) => a - b);
        for (let key of sortedKeys) {
            ans.push(mpp.get(key));
        }

        // Return the result
        return ans;
    }
}

// ─────────────────────────────────────────────────────────────
// O(N) SOLUTION — No sorting, using min/max hd tracking
// ─────────────────────────────────────────────────────────────
/*
Why is the previous solution O(N log N)?
- [...map.keys()].sort() sorts the column keys at the end → O(K log K)
  where K = number of distinct horizontal distances ≤ N.
- In the worst case (perfectly balanced tree), K ≈ N → O(N log N).

How to achieve O(N)?
- Track minHd and maxHd during BFS itself.
- After BFS, iterate from minHd to maxHd — no sort needed.
- This is O(N) since the range (maxHd - minHd) ≤ N.

Time:  O(N) — single BFS pass + linear range scan.
Space: O(N) — map + queue.
*/

function getTopViewOptimal(root) {
    if (!root) return [];

    const map = new Map();           // hd → first node value seen
    const queue = [[root, 0]];       // [node, hd]
    let minHd = 0, maxHd = 0;        // Track hd range during BFS

    while (queue.length > 0) {
        const [curr, hd] = queue.shift();

        if (!map.has(hd)) map.set(hd, curr.val);   // First at this hd = top view

        // Expand range as we discover new hd values
        minHd = Math.min(minHd, hd);
        maxHd = Math.max(maxHd, hd);

        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }

    // Linear scan from minHd to maxHd — no sort needed
    const result = [];
    for (let hd = minHd; hd <= maxHd; hd++) {
        result.push(map.get(hd));
    }
    return result;
}

/*
──────────────────────────────────────────────────────────────
EXPLANATION & DRY RUN — getTopViewOptimal
──────────────────────────────────────────────────────────────

Tree used:
            1              hd= 0, level=0
           / \
          2   3            hd=-1, level=1 | hd=1, level=1
         / \   \
        4  10   10         hd=-2, level=2 | hd=0, level=2 | hd=2, level=2
            /\
           9  5            hd=-1, level=3 | hd=1, level=3
               \
                6          hd=2,  level=4

Horizontal Distance Rules:
  Root      → hd = 0
  Left  child → parent hd - 1
  Right child → parent hd + 1

Key insight:
  BFS processes nodes TOP-DOWN at each hd.
  The FIRST node stored at each hd is always the topmost visible one.
  We only need to check: "Have I seen this hd before?"

──────────────────────────────────────────────────────────────
BFS Dry Run:
──────────────────────────────────────────────────────────────

Initial state:
  queue  = [[1, 0]]
  map    = {}
  minHd  = 0, maxHd = 0

─── Step 1: Dequeue [1, hd=0] ───────────────────────────────
  hd=0 not in map → map.set(0, 1)       map = { 0:1 }
  minHd = min(0, 0) = 0
  maxHd = max(0, 0) = 0
  Push left  [2, -1], right [3, 1]
  queue = [[2,-1], [3,1]]

─── Step 2: Dequeue [2, hd=-1] ──────────────────────────────
  hd=-1 not in map → map.set(-1, 2)     map = { 0:1, -1:2 }
  minHd = min(0, -1) = -1
  maxHd = max(0, -1) = 0
  Push left  [4, -2], right [10, 0]
  queue = [[3,1], [4,-2], [10,0]]

─── Step 3: Dequeue [3, hd=1] ───────────────────────────────
  hd=1 not in map → map.set(1, 3)       map = { 0:1, -1:2, 1:3 }
  minHd = min(-1, 1) = -1
  maxHd = max(0,  1) = 1
  Push left [9, 0], right [10, 2]
  queue = [[4,-2], [10,0], [9,0], [10,2]]

─── Step 4: Dequeue [4, hd=-2] ──────────────────────────────
  hd=-2 not in map → map.set(-2, 4)     map = { 0:1, -1:2, 1:3, -2:4 }
  minHd = min(-1, -2) = -2
  maxHd = max(1,  -2) = 1
  4 has no children.
  queue = [[10,0], [9,0], [10,2]]

─── Step 5: Dequeue [10, hd=0] ──────────────────────────────
  hd=0 ALREADY in map → skip            map unchanged
  minHd = -2, maxHd = 1
  Push left [9, -1], right [5, 1]
  queue = [[9,0], [10,2], [9,-1], [5,1]]

─── Step 6: Dequeue [9, hd=0] ───────────────────────────────
  hd=0 ALREADY in map → skip            map unchanged
  9 has no children.
  queue = [[10,2], [9,-1], [5,1]]

─── Step 7: Dequeue [10, hd=2] ──────────────────────────────
  hd=2 not in map → map.set(2, 10)      map = { 0:1, -1:2, 1:3, -2:4, 2:10 }
  minHd = min(-2, 2) = -2
  maxHd = max(1,  2) = 2
  10 has no children.
  queue = [[9,-1], [5,1]]

─── Step 8: Dequeue [9, hd=-1] ──────────────────────────────
  hd=-1 ALREADY in map → skip           map unchanged
  9 has no children.
  queue = [[5,1]]

─── Step 9: Dequeue [5, hd=1] ───────────────────────────────
  hd=1 ALREADY in map → skip            map unchanged
  Push right [6, 2]
  queue = [[6,2]]

─── Step 10: Dequeue [6, hd=2] ──────────────────────────────
  hd=2 ALREADY in map → skip            map unchanged
  6 has no children.
  queue = []  → BFS done.

──────────────────────────────────────────────────────────────
Final map:
  hd=-2 → 4
  hd=-1 → 2
  hd= 0 → 1
  hd= 1 → 3
  hd= 2 → 10

Range: minHd=-2, maxHd=2

Linear scan (hd = -2 to 2):
  -2 → 4
  -1 → 2
   0 → 1
   1 → 3
   2 → 10

Result: [4, 2, 1, 3, 10]  ✅
──────────────────────────────────────────────────────────────

Why nodes at hd=0 (10 and 9) were skipped:
  Node 1 (root) was seen first at hd=0 → it is the topmost.
  Nodes 10 and 9 are at levels 2 and 2 respectively at hd=0,
  but since node 1 is directly above them at hd=0, only node 1
  is visible from the top. BFS naturally handles this by
  processing level 0 before level 2.
──────────────────────────────────────────────────────────────
*/

// Driver code
(function () {
    // Create the sample binary tree
    let root = new Node(1);
    root.left = new Node(2);
    root.left.left = new Node(4);
    root.left.right = new Node(10);
    root.left.left.right = new Node(5);
    root.left.left.right.right = new Node(6);
    root.right = new Node(3);
    root.right.right = new Node(10);
    root.right.left = new Node(9);

    // Create Solution object
    let solution = new Solution();

    // Get the top view
    let result = solution.topView(root);

    // Print the result
    console.log("Top View Traversal:", ...result);
})();
