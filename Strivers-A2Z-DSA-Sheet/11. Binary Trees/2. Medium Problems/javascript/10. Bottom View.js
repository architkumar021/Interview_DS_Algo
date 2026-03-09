/*
Question:
Given a binary tree, print its bottom view.

Approach:
- BFS level-order traversal, tracking [node, hd] in the queue.
- hd (horizontal distance): root=0, left child=hd-1, right child=hd+1.
- For each hd, ALWAYS overwrite the map value — BFS processes top-to-bottom
  so the last node stored at each hd is the bottommost visible one.
- After traversal, sort map keys and collect values left → right.

Time:  O(N log N) — sorting map keys.
Space: O(N)

Code:
*/

function getBottomView(root) {
    if (!root) return [];

    const map = new Map();           // hd → last node value seen
    const queue = [[root, 0]];       // [node, hd]

    while (queue.length > 0) {
        const [curr, hd] = queue.shift();

        map.set(hd, curr.val);       // Always overwrite → last = bottommost

        if (curr.left)  queue.push([curr.left,  hd - 1]);
        if (curr.right) queue.push([curr.right, hd + 1]);
    }

    return [...map.keys()]
        .sort((a, b) => a - b)       // Sort hd left → right
        .map(hd => map.get(hd));
}

// ─────────────────────────────────────────────────────────────
// O(N) SOLUTION — No sorting, using min/max hd tracking
// ─────────────────────────────────────────────────────────────
/*
Why is the above solution O(N log N)?
- [...map.keys()].sort() sorts the column keys → O(K log K)
  where K = number of distinct horizontal distances ≤ N.

How to achieve O(N)?
- Track minHd and maxHd during BFS itself.
- After BFS, iterate linearly from minHd to maxHd — no sort needed.

Time:  O(N) — single BFS pass + linear range scan.
Space: O(N) — map + queue.
*/

function getBottomViewOptimal(root) {
    if (!root) return [];

    const map = new Map();           // hd → last node value seen
    const queue = [[root, 0]];       // [node, hd]
    let minHd = 0, maxHd = 0;        // Track hd range during BFS

    while (queue.length > 0) {
        const [curr, hd] = queue.shift();

        map.set(hd, curr.val);       // Always overwrite → last = bottommost

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
EXPLANATION & DRY RUN — getBottomViewOptimal
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
                6          hd= 2, level=4

Horizontal Distance Rules:
  Root        → hd = 0
  Left  child → parent hd - 1
  Right child → parent hd + 1

Key insight:
  BFS processes nodes TOP-DOWN at each hd.
  We ALWAYS overwrite the map → the last node stored at each hd
  is the BOTTOMMOST visible node at that column.
  Unlike Top View (only store first), Bottom View stores last.

──────────────────────────────────────────────────────────────
BFS Dry Run:
──────────────────────────────────────────────────────────────

Initial state:
  queue  = [[1, 0]]
  map    = {}
  minHd  = 0, maxHd = 0

─── Step 1: Dequeue [1, hd=0] ───────────────────────────────
  map.set(0, 1)                        map = { 0:1 }
  minHd = min(0, 0) = 0
  maxHd = max(0, 0) = 0
  Push [2,-1], [3,1]
  queue = [[2,-1], [3,1]]

─── Step 2: Dequeue [2, hd=-1] ──────────────────────────────
  map.set(-1, 2)                       map = { 0:1, -1:2 }
  minHd = min(0, -1) = -1
  maxHd = max(0, -1) = 0
  Push [4,-2], [10,0]
  queue = [[3,1], [4,-2], [10,0]]

─── Step 3: Dequeue [3, hd=1] ───────────────────────────────
  map.set(1, 3)                        map = { 0:1, -1:2, 1:3 }
  minHd = min(-1, 1) = -1
  maxHd = max(0,  1) = 1
  Push [9,0], [10,2]
  queue = [[4,-2], [10,0], [9,0], [10,2]]

─── Step 4: Dequeue [4, hd=-2] ──────────────────────────────
  map.set(-2, 4)                       map = { 0:1, -1:2, 1:3, -2:4 }
  minHd = min(-1, -2) = -2
  maxHd = max(1,  -2) = 1
  4 has no children.
  queue = [[10,0], [9,0], [10,2]]

─── Step 5: Dequeue [10, hd=0] ──────────────────────────────
  map.set(0, 10)  ← overwrites 1       map = { 0:10, -1:2, 1:3, -2:4 }
  minHd = -2, maxHd = 1
  Push [9,-1], [5,1]
  queue = [[9,0], [10,2], [9,-1], [5,1]]

─── Step 6: Dequeue [9, hd=0] ───────────────────────────────
  map.set(0, 9)   ← overwrites 10      map = { 0:9, -1:2, 1:3, -2:4 }
  minHd = -2, maxHd = 1
  9 has no children.
  queue = [[10,2], [9,-1], [5,1]]

─── Step 7: Dequeue [10, hd=2] ──────────────────────────────
  map.set(2, 10)                       map = { 0:9, -1:2, 1:3, -2:4, 2:10 }
  minHd = min(-2, 2) = -2
  maxHd = max(1,  2) = 2
  10 has no children.
  queue = [[9,-1], [5,1]]

─── Step 8: Dequeue [9, hd=-1] ──────────────────────────────
  map.set(-1, 9)  ← overwrites 2       map = { 0:9, -1:9, 1:3, -2:4, 2:10 }
  minHd = -2, maxHd = 2
  9 has no children.
  queue = [[5,1]]

─── Step 9: Dequeue [5, hd=1] ───────────────────────────────
  map.set(1, 5)   ← overwrites 3       map = { 0:9, -1:9, 1:5, -2:4, 2:10 }
  minHd = -2, maxHd = 2
  Push [6,2]
  queue = [[6,2]]

─── Step 10: Dequeue [6, hd=2] ──────────────────────────────
  map.set(2, 6)   ← overwrites 10      map = { 0:9, -1:9, 1:5, -2:4, 2:6 }
  minHd = -2, maxHd = 2
  6 has no children.
  queue = []  → BFS done.

──────────────────────────────────────────────────────────────
Final map:
  hd=-2 → 4
  hd=-1 → 9
  hd= 0 → 9
  hd= 1 → 5
  hd= 2 → 6

Range: minHd=-2, maxHd=2

Linear scan (hd = -2 to 2):
  -2 → 4
  -1 → 9
   0 → 9
   1 → 5
   2 → 6

Result: [4, 9, 9, 5, 6]  ✅
──────────────────────────────────────────────────────────────

Top View vs Bottom View — the only difference:
  Top View    → if (!map.has(hd)) map.set(hd, val)   Store FIRST (topmost)
  Bottom View → map.set(hd, val)                      Store LAST  (bottommost)
──────────────────────────────────────────────────────────────
*/
