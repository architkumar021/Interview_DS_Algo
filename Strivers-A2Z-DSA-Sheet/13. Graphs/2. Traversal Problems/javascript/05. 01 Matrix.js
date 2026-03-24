/*
===============================================
  542. 01 Matrix (LeetCode Medium)
===============================================

Question:
Given an m x n binary matrix mat (only 0s and 1s),
return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1 (4-directional).

Example:
  Input:  [[0, 0, 0],      Output: [[0, 0, 0],
           [0, 1, 0],               [0, 1, 0],
           [1, 1, 1]]               [1, 2, 1]]

=== Why Multi-Source BFS? (Think REVERSE) ===
Naive approach: For each 1-cell, BFS to find nearest 0. → O((m*n)²) 🐌

Better: REVERSE the thinking!
Instead of going FROM each 1 TO a 0, go FROM all 0s TO the 1s.

Start BFS from ALL 0-cells at the same time (multi-source).
The BFS wave radiates outward:
  - Level 0: all 0-cells (distance = 0)
  - Level 1: all cells adjacent to a 0-cell (distance = 1)
  - Level 2: next ring outward (distance = 2)
  - ...

Each cell gets its distance the FIRST time BFS reaches it,
which is guaranteed to be the shortest (BFS property).

This is exactly like "Rotten Oranges" — multiple sources, simultaneous spread.

=== Why NOT DFS for shortest distance? ===
DFS does NOT guarantee shortest distance because it goes deep
along one path first. BFS explores level by level, so the first
time it reaches a cell is always via the shortest path.

However, DFS CAN be used as a brute force approach where we run
DFS from every 1-cell to find its nearest 0. It works but is
much slower.
*/


// ════════════════════════════════════════════
//  Solution 1: Multi-Source BFS (Optimal) ✅
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. Create a distance matrix dis[][] initialized to -1 (unvisited).
2. Scan the grid:
   - For every 0-cell → set dis[i][j] = 0, push into queue.
3. BFS level by level:
   - For each cell in current level, check 4 neighbors.
   - If neighbor is unvisited (dis = -1) → set dis = current level, push to queue.
   - Increment level after each BFS round.
4. Return dis[][].

Time Complexity:  O(m × n) — each cell visited exactly once.
Space Complexity: O(m × n) — for dis[][] and queue.
*/

function updateMatrixBFS(mat) {
    let m = mat.length;
    let n = mat[0].length;
    let dis = Array.from({ length: m }, () => new Array(n).fill(-1));
    let queue = [];

    // Step 1: Push all 0-cells as BFS sources
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dis[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }

    // 4 directions: up, down, left, right
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];
    let level = 1;

    // Step 2: BFS level by level
    while (queue.length > 0) {
        let next = [];

        for (let [x, y] of queue) {
            for (let d = 0; d < 4; d++) {
                let nx = x + dr[d];
                let ny = y + dc[d];

                // Unvisited neighbor → assign distance and enqueue
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && dis[nx][ny] === -1) {
                    dis[nx][ny] = level;
                    next.push([nx, ny]);
                }
            }
        }

        queue = next;
        level++;
    }

    return dis;
}


// ════════════════════════════════════════════
//  Solution 2: DFS from each 1-cell (Brute Force)
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. Create a distance matrix dis[][] initialized to Infinity.
2. For every 0-cell → set dis[i][j] = 0.
3. For every 1-cell → run DFS/BFS to find the nearest 0.
   Instead of full DFS per cell, we can optimize slightly:
   do a DFS that propagates distances from 0-cells outward,
   but it requires multiple passes (not as clean as BFS).

A simpler DFS-style approach uses TWO PASSES (DP-like):
  Pass 1 (top-left to bottom-right):
    For each cell, update from top and left neighbors.
  Pass 2 (bottom-right to top-left):
    For each cell, update from bottom and right neighbors.

This covers all 4 directions across 2 passes.

Note: This is technically DP, but it's the "DFS/non-BFS" alternative
commonly asked in interviews for this problem.

Time Complexity:  O(m × n) — two passes over the matrix.
Space Complexity: O(m × n) — for dis[][].
*/

function updateMatrixDFS(mat) {
    let m = mat.length;
    let n = mat[0].length;
    let dis = Array.from({ length: m }, () => new Array(n).fill(Infinity));

    // Step 1: Set distance 0 for 0-cells
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dis[i][j] = 0;
            }
        }
    }

    // Step 2: Pass 1 — top-left to bottom-right (check ↑ and ←)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0) dis[i][j] = Math.min(dis[i][j], dis[i - 1][j] + 1); // from top
            if (j > 0) dis[i][j] = Math.min(dis[i][j], dis[i][j - 1] + 1); // from left
        }
    }

    // Step 3: Pass 2 — bottom-right to top-left (check ↓ and →)
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i < m - 1) dis[i][j] = Math.min(dis[i][j], dis[i + 1][j] + 1); // from bottom
            if (j < n - 1) dis[i][j] = Math.min(dis[i][j], dis[i][j + 1] + 1); // from right
        }
    }

    return dis;
}


/*
═══════════════════════════════════════════════
  DRY RUN — Example 1 (BFS approach)
═══════════════════════════════════════════════

Input: mat = [[0, 0, 0],
              [0, 1, 0],
              [1, 1, 1]]

Step 1 — Push all 0-cells:
  dis = [[ 0,  0,  0],
         [ 0, -1,  0],
         [-1, -1, -1]]

  queue = [(0,0),(0,1),(0,2),(1,0),(1,2)]    ← all 0-cells
  level = 1

─── BFS Level 1 ───
  Process queue = [(0,0),(0,1),(0,2),(1,0),(1,2)]

  (0,0): neighbors → all either out of bounds or already visited (dis ≠ -1)
  (0,1): neighbors → all already visited
  (0,2): neighbors → all already visited
  (1,0): neighbors →
    ↓ (2,0) → dis = -1 ✅ → dis[2][0] = 1, push
  (1,2): neighbors →
    ↓ (2,2) → dis = -1 ✅ → dis[2][2] = 1, push

  Also check (1,0)'s ↑ → (0,0) dis=0 → skip
                      → (1,1) dis=-1 ✅? Wait, let me be precise:

  Let me redo carefully. (1,0) neighbors:
    ↑ (0,0) → dis=0 → skip
    ↓ (2,0) → dis=-1 ✅ → dis[2][0]=1, push
    ← (1,-1) → out of bounds
    → (1,1) → dis=-1 ✅ → dis[1][1]=1, push

  (1,2) neighbors:
    ↑ (0,2) → dis=0 → skip
    ↓ (2,2) → dis=-1 ✅ → dis[2][2]=1, push
    ← (1,1) → dis=1 (just set) → skip
    → (1,3) → out of bounds

  next = [(2,0), (1,1), (2,2)]

  dis = [[0, 0, 0],
         [0, 1, 0],
         [1,-1, 1]]

  queue = [(2,0),(1,1),(2,2)], level = 2

─── BFS Level 2 ───
  Process queue = [(2,0),(1,1),(2,2)]

  (2,0) neighbors:
    ↑ (1,0) → dis=0 → skip
    ↓ (3,0) → out of bounds
    ← (2,-1) → out of bounds
    → (2,1) → dis=-1 ✅ → dis[2][1]=2, push

  (1,1) neighbors:
    ↑ (0,1) → dis=0 → skip
    ↓ (2,1) → dis=2 (just set) → skip
    ← (1,0) → dis=0 → skip
    → (1,2) → dis=0 → skip

  (2,2) neighbors:
    ↑ (1,2) → dis=0 → skip
    ↓ (3,2) → out of bounds
    ← (2,1) → dis=2 → skip
    → (2,3) → out of bounds

  next = [(2,1)]

  dis = [[0, 0, 0],
         [0, 1, 0],
         [1, 2, 1]]

  queue = [(2,1)], level = 3

─── BFS Level 3 ───
  Process queue = [(2,1)]

  (2,1) neighbors: all already visited → next = []

  queue = [], BFS ends.

  Final output:
    [[0, 0, 0],
     [0, 1, 0],       ✅ Matches expected!
     [1, 2, 1]]


═══════════════════════════════════════════════
  DRY RUN — Example 1 (DFS / Two-Pass approach)
═══════════════════════════════════════════════

Input: mat = [[0, 0, 0],
              [0, 1, 0],
              [1, 1, 1]]

Step 1 — Initialize:
  dis = [[ 0,  0,  0],
         [ 0,  ∞,  0],
         [ ∞,  ∞,  ∞]]

Step 2 — Pass 1 (top-left → bottom-right, check ↑ and ←):

  (0,0): 0-cell → skip         dis[0][0] = 0
  (0,1): 0-cell → skip         dis[0][1] = 0
  (0,2): 0-cell → skip         dis[0][2] = 0
  (1,0): 0-cell → skip         dis[1][0] = 0
  (1,1): from ↑ = dis[0][1]+1 = 1, from ← = dis[1][0]+1 = 1
         min(∞, 1, 1) = 1      dis[1][1] = 1
  (1,2): 0-cell → skip         dis[1][2] = 0
  (2,0): from ↑ = dis[1][0]+1 = 1, no ←
         min(∞, 1) = 1         dis[2][0] = 1
  (2,1): from ↑ = dis[1][1]+1 = 2, from ← = dis[2][0]+1 = 2
         min(∞, 2, 2) = 2      dis[2][1] = 2
  (2,2): from ↑ = dis[1][2]+1 = 1, from ← = dis[2][1]+1 = 3
         min(∞, 1, 3) = 1      dis[2][2] = 1

  After Pass 1:
  dis = [[0, 0, 0],
         [0, 1, 0],
         [1, 2, 1]]

Step 3 — Pass 2 (bottom-right → top-left, check ↓ and →):

  (2,2): no ↓, no → → unchanged  dis[2][2] = 1
  (2,1): ↓ out of bounds, → dis[2][2]+1 = 2
         min(2, 2) = 2           dis[2][1] = 2 (same)
  (2,0): ↓ out of bounds, → dis[2][1]+1 = 3
         min(1, 3) = 1           dis[2][0] = 1 (same)
  (1,2): ↓ dis[2][2]+1 = 2, no →
         min(0, 2) = 0           dis[1][2] = 0 (same)
  (1,1): ↓ dis[2][1]+1 = 3, → dis[1][2]+1 = 1
         min(1, 3, 1) = 1        dis[1][1] = 1 (same)
  (1,0): ↓ dis[2][0]+1 = 2, → dis[1][1]+1 = 2
         min(0, 2, 2) = 0        dis[1][0] = 0 (same)
  (0,2)-(0,0): all 0-cells → unchanged

  Final output:
  dis = [[0, 0, 0],
         [0, 1, 0],        ✅ Same result!
         [1, 2, 1]]


═══════════════════════════════════════════════
  DRY RUN — Example 2 (Larger grid)
═══════════════════════════════════════════════

Input: mat = [[0, 1, 1],
              [1, 1, 1],
              [1, 1, 0]]

BFS approach:
  Initial queue (all 0-cells): [(0,0), (2,2)]
  dis = [[ 0, -1, -1],
         [-1, -1, -1],
         [-1, -1,  0]]

  Level 1: spread from (0,0) and (2,2)
    (0,0) → (0,1)=1, (1,0)=1
    (2,2) → (2,1)=1, (1,2)=1

    dis = [[0, 1,-1],
           [1,-1, 1],
           [-1,1, 0]]

  Level 2: spread from (0,1),(1,0),(2,1),(1,2)
    (0,1) → (0,2)=2
    (1,0) → (1,1) could be 2... but let's check all:
    (1,0) → (1,1)=2
    (2,1) → (2,0)=2, (1,1) already 2
    (1,2) → (0,2) already 2

    dis = [[0, 1, 2],
           [1, 2, 1],
           [2, 1, 0]]

  Output: [[0,1,2],[1,2,1],[2,1,0]] ✅

  Notice the BFS "wave" spreading from TWO sources (corners)
  meeting in the middle at (1,1) with distance 2.


═══════════════════════════════════════════════
  DRY RUN — Example 3 (All zeros)
═══════════════════════════════════════════════

Input: mat = [[0, 0],
              [0, 0]]

  All cells are 0 → dis is all 0s → BFS queue is all cells
  but next = [] immediately since no -1 neighbors exist.

  Output: [[0,0],[0,0]] ✅


═══════════════════════════════════════════════
  DRY RUN — Example 4 (Single 0 in corner)
═══════════════════════════════════════════════

Input: mat = [[1, 1, 1],
              [1, 1, 1],
              [1, 1, 0]]

  Only source: (2,2) with dis=0
  BFS spreads level by level from bottom-right corner:

  Level 1: (2,1)=1, (1,2)=1
  Level 2: (2,0)=2, (1,1)=2, (0,2)=2
  Level 3: (1,0)=3, (0,1)=3
  Level 4: (0,0)=4

  Output: [[4, 3, 2],
           [3, 2, 1],       ✅ Manhattan distance from (2,2)
           [2, 1, 0]]


=== Edge Cases ===
- All 0s → every cell has distance 0
- Single 0 in corner → distances = Manhattan distances from that corner
- Single row/column → becomes a 1D problem
- Alternating 0s and 1s → every 1 is adjacent to a 0, all distances ≤ 1
*/


// ─── Driver Code ───
function runTests() {
    console.log("=== BFS Approach (Optimal) ===");

    console.log("Test 1:", JSON.stringify(
        updateMatrixBFS([[0,0,0],[0,1,0],[1,1,1]])
    ));
    // Expected: [[0,0,0],[0,1,0],[1,2,1]]

    console.log("Test 2:", JSON.stringify(
        updateMatrixBFS([[0,1,1],[1,1,1],[1,1,0]])
    ));
    // Expected: [[0,1,2],[1,2,1],[2,1,0]]

    console.log("Test 3:", JSON.stringify(
        updateMatrixBFS([[0,0],[0,0]])
    ));
    // Expected: [[0,0],[0,0]]

    console.log("Test 4:", JSON.stringify(
        updateMatrixBFS([[1,1,1],[1,1,1],[1,1,0]])
    ));
    // Expected: [[4,3,2],[3,2,1],[2,1,0]]

    console.log("Test 5:", JSON.stringify(
        updateMatrixBFS([[0],[1],[1],[1]])
    ));
    // Expected: [[0],[1],[2],[3]]

    console.log("\n=== DFS / Two-Pass Approach ===");

    console.log("Test 6:", JSON.stringify(
        updateMatrixDFS([[0,0,0],[0,1,0],[1,1,1]])
    ));
    // Expected: [[0,0,0],[0,1,0],[1,2,1]]

    console.log("Test 7:", JSON.stringify(
        updateMatrixDFS([[0,1,1],[1,1,1],[1,1,0]])
    ));
    // Expected: [[0,1,2],[1,2,1],[2,1,0]]

    console.log("Test 8:", JSON.stringify(
        updateMatrixDFS([[0,0],[0,0]])
    ));
    // Expected: [[0,0],[0,0]]

    console.log("Test 9:", JSON.stringify(
        updateMatrixDFS([[1,1,1],[1,1,1],[1,1,0]])
    ));
    // Expected: [[4,3,2],[3,2,1],[2,1,0]]

    console.log("Test 10:", JSON.stringify(
        updateMatrixDFS([[0],[1],[1],[1]])
    ));
    // Expected: [[0],[1],[2],[3]]
}

runTests();


