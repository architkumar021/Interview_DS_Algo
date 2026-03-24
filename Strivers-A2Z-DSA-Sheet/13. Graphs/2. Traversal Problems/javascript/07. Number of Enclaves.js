/*
===============================================
  1020. Number of Enclaves (LeetCode Medium)
===============================================

Question:
Given an m x n binary matrix grid:
  0 → sea 🌊
  1 → land 🏝️

You can walk 4-directionally (up/down/left/right) from land to land.
You can walk OFF the grid from any boundary cell.

Return the number of land cells from which you CANNOT walk off
the boundary of the grid (i.e., land cells that are "trapped").

Example:
  Input:               Output: 3
  0  0  0  0
  1  0  1  0           The three 1s at (2,1),(2,2),(2,3)
  0  1  1  0           are enclosed. They can't reach the boundary.
  0  0  0  0

=== Key Insight: Same as "Surrounded Regions" ===
This is almost identical to the Surrounded Regions problem.
Instead of flipping surrounded O's, we COUNT them.

A land cell is an "enclave" if it is NOT connected (via land)
to any boundary land cell.

=== In-Place Algorithm ===
  Step 1: SINK all boundary-connected land.
          Start from every border cell that is 1.
          DFS/BFS to mark it and all connected 1's → 0 (sink them).
          These are NOT enclaves (they can reach the boundary).

  Step 2: Count remaining 1's.
          Any 1 still left was never reached from the boundary → enclave.

No extra matrix needed. We modify the grid directly.

=== Why "sink" instead of a marker like '#'? ===
Since we only need a COUNT (not the final grid),
we can simply turn boundary-connected 1's into 0's.
Then counting remaining 1's gives the answer directly.
No need for a restore step like Surrounded Regions.
*/


// ════════════════════════════════════════════
//  Solution 1: DFS Approach (In-Place)
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. For every border cell that is 1:
   - DFS to sink it and all connected 1's → 0.
2. Count remaining 1's = number of enclaves.

Time Complexity:  O(m × n) — each cell visited at most once.
Space Complexity: O(m × n) — recursion stack in worst case.
*/

function dfsSink(i, j, grid) {
    // Out of bounds or not land → stop
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== 1) {
        return;
    }

    grid[i][j] = 0;            // Sink this land cell
    dfsSink(i + 1, j, grid);   // ↓ down
    dfsSink(i - 1, j, grid);   // ↑ up
    dfsSink(i, j + 1, grid);   // → right
    dfsSink(i, j - 1, grid);   // ← left
}

function numEnclavesDFS(grid) {
    let m = grid.length;
    let n = grid[0].length;

    // Step 1: Sink all boundary-connected land
    for (let j = 0; j < n; j++) {
        if (grid[0][j] === 1) dfsSink(0, j, grid);         // top row
        if (grid[m - 1][j] === 1) dfsSink(m - 1, j, grid); // bottom row
    }
    for (let i = 0; i < m; i++) {
        if (grid[i][0] === 1) dfsSink(i, 0, grid);         // left col
        if (grid[i][n - 1] === 1) dfsSink(i, n - 1, grid); // right col
    }

    // Step 2: Count remaining 1's = enclaves
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) count++;
        }
    }
    return count;
}


// ════════════════════════════════════════════
//  Solution 2: BFS Approach (In-Place)
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. Push ALL border land cells (1) into queue, sink them → 0.
2. BFS: For each cell, check 4 neighbors.
   - If neighbor is 1 → sink to 0, push to queue.
3. Count remaining 1's.

Time Complexity:  O(m × n)
Space Complexity: O(m × n) — queue in worst case.
*/

function numEnclavesBFS(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let queue = [];

    // Step 1: Collect all border land cells → sink them
    for (let j = 0; j < n; j++) {
        if (grid[0][j] === 1) { grid[0][j] = 0; queue.push([0, j]); }
        if (grid[m - 1][j] === 1) { grid[m - 1][j] = 0; queue.push([m - 1, j]); }
    }
    for (let i = 0; i < m; i++) {
        if (grid[i][0] === 1) { grid[i][0] = 0; queue.push([i, 0]); }
        if (grid[i][n - 1] === 1) { grid[i][n - 1] = 0; queue.push([i, n - 1]); }
    }

    // Step 2: BFS — sink all connected land
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        let next = [];
        for (let [x, y] of queue) {
            for (let d = 0; d < 4; d++) {
                let nx = x + dr[d];
                let ny = y + dc[d];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
                    grid[nx][ny] = 0;
                    next.push([nx, ny]);
                }
            }
        }
        queue = next;
    }

    // Step 3: Count remaining 1's = enclaves
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) count++;
        }
    }
    return count;
}


/*
═══════════════════════════════════════════════
  DRY RUN — Example 1 (DFS)
═══════════════════════════════════════════════

Input grid:
    0  0  0  0
    1  0  1  0
    0  1  1  0
    0  0  0  0

m = 4, n = 4

── Step 1: Sink boundary-connected land ──

  Scan top row (row 0):    0 0 0 0 → no 1's
  Scan bottom row (row 3): 0 0 0 0 → no 1's
  Scan left col (col 0):   0 1 0 0 → 1 at (1,0) ✅
  Scan right col (col 3):  0 0 0 0 → no 1's

  Only border land: (1,0)

  dfsSink(1, 0, grid):
    grid[1][0] = 0  ← sunk!

    Grid now:
      0  0  0  0
      0  0  1  0
      0  1  1  0
      0  0  0  0

    Recurse neighbors of (1,0):
      ↓ (2,0) → grid[2][0] = 0 → return
      ↑ (0,0) → grid[0][0] = 0 → return
      → (1,1) → grid[1][1] = 0 → return
      ← (1,-1) → out of bounds → return

  DFS ends. Only (1,0) was sunk.

  Grid after Step 1:
      0  0  0  0
      0  0  1  0       ← (1,2) still 1
      0  1  1  0       ← (2,1),(2,2) still 1
      0  0  0  0

── Step 2: Count remaining 1's ──

  (1,2) = 1 → count = 1
  (2,1) = 1 → count = 2
  (2,2) = 1 → count = 3

  Return 3 ✅

  These 3 cells form a land cluster completely surrounded
  by sea. No path from any of them can reach the boundary.


═══════════════════════════════════════════════
  DRY RUN — Example 2 (BFS, multiple border land cells)
═══════════════════════════════════════════════

Input grid:
    0  1  1  0
    0  0  1  0
    0  0  1  0
    0  0  0  0

m = 4, n = 4

── Step 1: Collect border land → sink ──

  Top row:    (0,1)=1 → sink, push. (0,2)=1 → sink, push.
  Bottom row: all 0 → skip
  Left col:   all 0 → skip
  Right col:  all 0 → skip

  queue = [(0,1), (0,2)]

  Grid after sinking border cells:
    0  0  0  0
    0  0  1  0
    0  0  1  0
    0  0  0  0

── Step 2: BFS ──

  Process [(0,1), (0,2)]:

    (0,1) neighbors:
      ↓ (1,1) → 0 → skip
      ↑ (-1,1) → OOB
      → (0,2) → 0 → skip (already sunk)
      ← (0,0) → 0 → skip

    (0,2) neighbors:
      ↓ (1,2) → grid[1][2] = 1 ✅ → sink to 0, push
      ↑ (-1,2) → OOB
      → (0,3) → 0 → skip
      ← (0,1) → 0 → skip

  next = [(1,2)]

  Grid:
    0  0  0  0
    0  0  0  0
    0  0  1  0
    0  0  0  0

  Process [(1,2)]:
    ↓ (2,2) → grid[2][2] = 1 ✅ → sink to 0, push
    ↑ (0,2) → 0 → skip
    ← (1,1) → 0 → skip
    → (1,3) → 0 → skip

  next = [(2,2)]

  Grid:
    0  0  0  0
    0  0  0  0
    0  0  0  0
    0  0  0  0

  Process [(2,2)]:
    All neighbors → 0 or OOB → skip
  next = [] → BFS ends.

── Step 3: Count remaining 1's ──
  All cells are 0 → count = 0

  Return 0 ✅

  Key insight: The entire vertical strip of 1's was connected
  to (0,1) and (0,2) on the top border. BFS sunk them all.
  No enclaves exist.


═══════════════════════════════════════════════
  DRY RUN — Example 3 (All border land)
═══════════════════════════════════════════════

Input grid:
    1  1  1
    1  0  1
    1  1  1

  All 1's are on the border or connected to a border 1.

  Step 1: DFS from border → sinks every 1 → grid becomes all 0.
  Step 2: Count = 0

  Return 0 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 4 (Large enclosed block)
═══════════════════════════════════════════════

Input grid:
    0  0  0  0  0
    0  1  1  1  0
    0  1  1  1  0
    0  1  1  1  0
    0  0  0  0  0

  No 1's on the border → Step 1 sinks nothing.
  All nine 1's in the inner 3×3 block are enclaves.

  Return 9 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 5 (Mix of enclosed and boundary)
═══════════════════════════════════════════════

Input grid:
    0  0  0  0  0
    0  1  1  1  0
    0  0  0  0  0
    0  1  0  1  0
    1  0  0  0  0

  Border 1's: (4,0)

  dfsSink(4,0): grid[4][0]=0, no connected 1's → done

  Grid after Step 1:
    0  0  0  0  0
    0  1  1  1  0       ← enclosed (row 1 block)
    0  0  0  0  0
    0  1  0  1  0       ← enclosed (isolated cells)
    0  0  0  0  0

  Step 2: count (1,1),(1,2),(1,3),(3,1),(3,3) = 5

  Return 5 ✅


=== Comparison with Surrounded Regions ===

  | Feature           | Surrounded Regions     | Number of Enclaves     |
  |-------------------|------------------------|------------------------|
  | Grid values       | 'X' and 'O'            | 0 and 1                |
  | Task              | FLIP enclosed O → X    | COUNT enclosed 1's     |
  | Need restore?     | Yes (# → O)            | No (just count)        |
  | Marker strategy   | O → # → restore to O   | 1 → 0 (sink, no restore)|
  | Core idea         | IDENTICAL: border-flood, then process remaining  |


=== Edge Cases ===
- No land at all → 0
- All land on border → 0
- All land enclosed → count = total land cells
- Single row/column → all cells are border → 0
- 1×1 grid → border cell → 0
*/


// ─── Driver Code ───
function runTests() {
    // Helper: deep copy grid, run function, return result
    function test(fn, grid) {
        let copy = grid.map(row => [...row]);
        return fn(copy);
    }

    console.log("=== DFS Approach (In-Place) ===");

    // Test 1: Standard enclosed land
    console.log("Test 1:", test(numEnclavesDFS,
        [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
    ));
    // Expected: 3

    // Test 2: All connected to border (no enclaves)
    console.log("Test 2:", test(numEnclavesDFS,
        [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
    ));
    // Expected: 0

    // Test 3: All border land (ring)
    console.log("Test 3:", test(numEnclavesDFS,
        [[1,1,1],[1,0,1],[1,1,1]]
    ));
    // Expected: 0

    // Test 4: Large enclosed block
    console.log("Test 4:", test(numEnclavesDFS,
        [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]]
    ));
    // Expected: 9

    // Test 5: Mix of enclosed and boundary
    console.log("Test 5:", test(numEnclavesDFS,
        [[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,1,0,1,0],[1,0,0,0,0]]
    ));
    // Expected: 5

    // Test 6: No land at all
    console.log("Test 6:", test(numEnclavesDFS,
        [[0,0],[0,0]]
    ));
    // Expected: 0

    // Test 7: Single cell land on border
    console.log("Test 7:", test(numEnclavesDFS,
        [[1]]
    ));
    // Expected: 0

    console.log("\n=== BFS Approach (In-Place) ===");

    // Test 8: Standard enclosed land
    console.log("Test 8:", test(numEnclavesBFS,
        [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
    ));
    // Expected: 3

    // Test 9: All connected to border
    console.log("Test 9:", test(numEnclavesBFS,
        [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
    ));
    // Expected: 0

    // Test 10: Large enclosed block
    console.log("Test 10:", test(numEnclavesBFS,
        [[0,0,0,0,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]]
    ));
    // Expected: 9

    // Test 11: Mix of enclosed and boundary
    console.log("Test 11:", test(numEnclavesBFS,
        [[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,1,0,1,0],[1,0,0,0,0]]
    ));
    // Expected: 5
}

runTests();

