/*
Question:
Given the root of a binary tree, calculate the vertical order traversal of the binary tree.
For each node at position (row, col), its left child is at (row+1, col-1) and right child
at (row+1, col+1). Nodes at the same (row, col) are sorted by value.

Approach:
- BFS level-order traversal, tracking [node, col] in the queue.
- Store [level, val] pairs in a Map keyed by column.
- After traversal, sort the map keys and within each column sort by level then value.

Time:  O(N log N) — sorting within each column.
Space: O(N)

Code:
*/

// NOTE: We track levels because nodes at the same (col, row) must be sorted by value.
// If that condition didn't exist, only col tracking would be needed.

function verticalTraversal(root) {
    if (!root) return [];

    const map = new Map();           // col → [[level, val], ...]
    const queue = [[root, 0]];       // [node, col]
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
        .sort((a, b) => a - b)       // Sort columns left → right
        .map(col =>
            map.get(col)
                .sort((a, b) => a[0] - b[0] || a[1] - b[1])  // Sort by level, then value
                .map(([, val]) => val)
        );
}

/*
──────────────────────────────────────────────────────────────
EXPLANATION — Solution 1 (verticalTraversal)
──────────────────────────────────────────────────────────────

Tree used for dry run:
            1          (col=0, level=0)
           / \
          2   3        (col=-1, level=1) (col=1, level=1)
         / \
        4   5          (col=-2, level=2) (col=0, level=2)

Step 1 — Assign coordinates:
  Every node gets a (col, level) coordinate:
  - Root starts at col=0, level=0.
  - Left child  → col-1, level+1
  - Right child → col+1, level+1

  Node | col | level
  ─────┼─────┼──────
    1  |  0  |  0
    2  | -1  |  1
    3  |  1  |  1
    4  | -2  |  2
    5  |  0  |  2

Step 2 — BFS + Map building:
  Queue starts: [[node1, col=0]]

  Level 0:
    Dequeue [1, 0] → map.get(0) = [[0, 1]]
    Enqueue [2, -1], [3, 1]

  Level 1:
    Dequeue [2, -1] → map.get(-1) = [[1, 2]]
    Dequeue [3,  1] → map.get(1)  = [[1, 3]]
    Enqueue [4, -2], [5, 0]

  Level 2:
    Dequeue [4, -2] → map.get(-2) = [[2, 4]]
    Dequeue [5,  0] → map.get(0)  = [[0, 1], [2, 5]]

  Final map:
    -2 → [[2, 4]]
    -1 → [[1, 2]]
     0 → [[0, 1], [2, 5]]
     1 → [[1, 3]]

Step 3 — Sort and build result:
  Sort keys: [-2, -1, 0, 1]

  col -2 → [[2,4]]            → sorted by level → [4]
  col -1 → [[1,2]]            → sorted by level → [2]
  col  0 → [[0,1],[2,5]]      → sorted by level → [1, 5]
  col  1 → [[1,3]]            → sorted by level → [3]

Result: [[4], [2], [1, 5], [3]]
──────────────────────────────────────────────────────────────
*/





// ─────────────────────────────────────────────────────────────
// Solution 2 — Nested Map: col → level → sorted values
// ─────────────────────────────────────────────────────────────


// This class defines a node in the binary tree
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

// This class contains the solution logic
class Solution {
    // Function to perform vertical order traversal
    findVertical(root) {
        // Map stores vertical and level mapping
        let map = new Map();

        // Queue for BFS
        let queue = [];
        queue.push([root, 0, 0]);

        // BFS loop
        while (queue.length > 0) {
            let [temp, x, y] = queue.shift();

            // Insert into map
            if (!map.has(x)) map.set(x, new Map());
            if (!map.get(x).has(y)) map.get(x).set(y, []);
            map.get(x).get(y).push(temp.data);

            // Left child
            if (temp.left) queue.push([temp.left, x - 1, y + 1]);
            // Right child
            if (temp.right) queue.push([temp.right, x + 1, y + 1]);
        }

        // Prepare final result
        let ans = [];
        let sortedX = [...map.keys()].sort((a, b) => a - b);

        for (let x of sortedX) {
            let col = [];
            let sortedY = [...map.get(x).keys()].sort((a, b) => a - b);
            for (let y of sortedY) {
                col.push(...map.get(x).get(y).sort((a, b) => a - b));
            }
            ans.push(col);
        }

        return ans;
    }
}

// Helper function to print result
function printResult(result) {
    for (let level of result) {
        console.log(level.join(" "));
    }
    console.log();
}

// Driver function
function main() {
    // Create sample binary tree
    let root = new Node(1);
    root.left = new Node(2);
    root.left.left = new Node(4);
    root.left.right = new Node(10);
    root.left.left.right = new Node(5);
    root.left.left.right.right = new Node(6);
    root.right = new Node(3);
    root.right.right = new Node(10);
    root.right.left = new Node(9);

    // Create solution object
    let solution = new Solution();

    // Call function
    let verticalTraversal = solution.findVertical(root);

    // Print result
    console.log("Vertical Traversal:");
    printResult(verticalTraversal);
}

// Run driver
main();

/*
EXPLANATION — Solution 2 (findVertical)
──────────────────────────────────────────────────────────────
Key difference from Solution 1:
- Uses a NESTED map:  col (x) → level (y) → [values]
  instead of a flat map: col → [[level, val], ...]
- This separates the grouping and sorting steps more explicitly.
- Nodes at the same (col, level) are sorted by value when extracted.

Tree used for dry run:
            1              (x=0, y=0)
           / \
          2   3            (x=-1,y=1) (x=1,y=1)
         / \   \
        4  10   10         (x=-2,y=2) (x=0,y=2) (x=2,y=2)
          /  \
         9    5            (x=-2,y=3) (x=1,y=3)  ← wait, these are
              \                                      children of 10 at x=0
               6           (x=2,y=4)

  (This matches the driver code tree exactly)

Step 1 — Assign coordinates (x=col, y=level):
  Node | x  |  y
  ─────┼────┼────
    1  |  0 |  0
    2  | -1 |  1
    3  |  1 |  1
    4  | -2 |  2
   10  |  0 |  2   (left.right of 2)
    9  |  1 |  3   (left of 10)  ← wait, x = 0+(-1) = -1? No:
       |    |       10 is at x=0,y=2 → left child x=-1,y=3; right x=1,y=3
    5  |  1 |  3   (right of 10 at x=0)
    6  |  2 |  4   (right of 5)
   10  |  2 |  2   (right of 3 at x=1)  → x=1+1=2, y=1+1=2
    9  | -1 |  3   (left of 4's parent chain... see driver tree below)

  Driver tree:
    root=1, left=2, right=3
    2.left=4, 2.right=10
    4.right=5, 5.right=6
    3.right=10, 3.left=9

  Coordinates:
  Node | x  |  y
  ─────┼────┼────
    1  |  0 |  0
    2  | -1 |  1
    3  |  1 |  1
    4  | -2 |  2
   10  |  0 |  2
    9  |  0 |  2
   10  |  2 |  2
    5  | -1 |  3
    6  |  0 |  4

Step 2 — BFS + Nested Map building:
  Queue: [[1, 0, 0]]

  Dequeue [1, 0, 0]:
    map: { 0: { 0: [1] } }
    Enqueue [2,-1,1], [3,1,1]

  Dequeue [2,-1,1]:
    map: { 0:{0:[1]}, -1:{1:[2]} }
    Enqueue [4,-2,2], [10,0,2]

  Dequeue [3,1,1]:
    map: { ..., 1:{1:[3]} }
    Enqueue [9,0,2], [10,2,2]

  Dequeue [4,-2,2]:
    map: { ..., -2:{2:[4]} }
    Enqueue [5,-1,3]

  Dequeue [10,0,2]:
    map: { ..., 0:{0:[1], 2:[10]} }

  Dequeue [9,0,2]:
    map: { ..., 0:{0:[1], 2:[10,9]} }

  Dequeue [10,2,2]:
    map: { ..., 2:{2:[10]} }

  Dequeue [5,-1,3]:
    map: { ..., -1:{1:[2], 3:[5]} }
    Enqueue [6,0,4]

  Dequeue [6,0,4]:
    map: { ..., 0:{0:[1], 2:[10,9], 4:[6]} }

  Final nested map:
    x=-2: { y=2: [4] }
    x=-1: { y=1: [2], y=3: [5] }
    x= 0: { y=0: [1], y=2: [10,9], y=4: [6] }
    x= 1: { y=1: [3] }
    x= 2: { y=2: [10] }

Step 3 — Sort keys and build result:
  Sort x keys: [-2, -1, 0, 1, 2]

  x=-2: y=[2]       → [4]                → col: [4]
  x=-1: y=[1,3]     → [2] + [5]          → col: [2, 5]
  x= 0: y=[0,2,4]   → [1] + [9,10] + [6] → col: [1, 9, 10, 6]
                          ↑ sorted by value within same (x,y)
  x= 1: y=[1]       → [3]                → col: [3]
  x= 2: y=[2]       → [10]               → col: [10]

Result: [[4], [2,5], [1,9,10,6], [3], [10]]
──────────────────────────────────────────────────────────────
*/