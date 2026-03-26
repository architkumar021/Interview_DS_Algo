/*
===============================================
  200. Number of Islands (LeetCode Medium)
===============================================

Question:
Given an m × n 2D binary grid (characters '1' and '0'),
return the number of islands.

An island = a group of connected '1's (land), surrounded
by '0's (water). Connected means 4-directional (up/down/left/right).

Example:
  Input:                         Output: 3
    1  1  0  0  0
    1  1  0  0  0
    0  0  1  0  0
    0  0  0  1  1

  Island 1: top-left 2×2 block
  Island 2: single cell (2,2)
  Island 3: bottom-right pair (3,3)-(3,4)

=== Approach: Count Connected Components ===

This is the most fundamental graph-on-grid problem.
Each '1' cell is a node, edges connect adjacent '1' cells.
Number of islands = Number of connected components of '1's.

Algorithm:
1. Scan every cell in the grid.
2. When we find an unvisited '1':
   - Increment island count.
   - DFS/BFS from that cell to visit ALL connected '1's
     (marking them visited so we don't count them again).
3. Return the count.

=== Why mark visited? ===
Without marking, we'd recount the same island from each
of its cells. Marking ensures each island is counted once.

=== In-Place trick ===
Instead of a separate visited matrix, we can sink visited
land cells: '1' → '0'. This saves O(m×n) space.
But it mutates the input. Below we show both approaches.
*/


// ════════════════════════════════════════════
//  Solution 1: DFS (In-Place — sink '1' → '0')
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. For each cell, if it's '1':
   - Increment count.
   - DFS to sink the entire island ('1' → '0').
2. Return count.

Time Complexity:  O(m × n) — each cell visited at most once.
Space Complexity: O(m × n) — recursion stack in worst case (all land).
                  No extra matrix (in-place).
*/

function dfsSink(i, j, grid) {
    // Out of bounds or water → stop
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== '1') {
        return;
    }

    grid[i][j] = '0';           // Sink this cell (mark visited)
    dfsSink(i + 1, j, grid);    // ↓ down
    dfsSink(i - 1, j, grid);    // ↑ up
    dfsSink(i, j + 1, grid);    // → right
    dfsSink(i, j - 1, grid);    // ← left
}

function numIslandsDFS(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;                 // Found a new island
                dfsSink(i, j, grid);     // Sink the entire island
            }
        }
    }

    return count;
}


// ════════════════════════════════════════════
//  Solution 2: BFS (With visited matrix)
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. Create a visited matrix (does NOT mutate input).
2. For each unvisited '1' cell:
   - Increment count.
   - BFS to visit all connected '1' cells.
3. Return count.

Time Complexity:  O(m × n)
Space Complexity: O(m × n) — visited matrix + queue.
*/

function numIslandsBFS(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let vis = Array.from({ length: m }, () => new Array(n).fill(false));
    let count = 0;

    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1' && !vis[i][j]) {
                count++;                 // Found a new island
                vis[i][j] = true;
                let queue = [[i, j]];

                // BFS — visit all connected '1' cells
                while (queue.length > 0) {
                    let next = [];
                    for (let [x, y] of queue) {
                        for (let d = 0; d < 4; d++) {
                            let nx = x + dr[d];
                            let ny = y + dc[d];
                            if (nx >= 0 && nx < m && ny >= 0 && ny < n
                                && grid[nx][ny] === '1' && !vis[nx][ny]) {
                                vis[nx][ny] = true;
                                next.push([nx, ny]);
                            }
                        }
                    }
                    queue = next;
                }
            }
        }
    }

    return count;
}


/*
═══════════════════════════════════════════════
  DRY RUN — Example 1 (DFS)
═══════════════════════════════════════════════

Input grid:
    1  1  0  0  0
    1  1  0  0  0
    0  0  1  0  0
    0  0  0  1  1

m = 4, n = 5, count = 0

── Scan (0,0): grid[0][0] = '1' ──
  count = 1
  dfsSink(0,0):
    grid[0][0] = '0'

    ↓ dfsSink(1,0):
      grid[1][0] = '0'
      ↓ dfsSink(2,0): '0' → return
      ↑ dfsSink(0,0): '0' → return
      → dfsSink(1,1):
        grid[1][1] = '0'
        ↓ dfsSink(2,1): '0' → return
        ↑ dfsSink(0,1):
          grid[0][1] = '0'
          ↓ dfsSink(1,1): '0' → return
          ↑ dfsSink(-1,1): OOB → return
          → dfsSink(0,2): '0' → return
          ← dfsSink(0,0): '0' → return
        → dfsSink(1,2): '0' → return
        ← dfsSink(1,0): '0' → return
      ← dfsSink(1,-1): OOB → return

    ↑ dfsSink(-1,0): OOB → return
    → dfsSink(0,1): '0' (already sunk) → return
    ← dfsSink(0,-1): OOB → return

  Grid after sinking Island 1:
    0  0  0  0  0
    0  0  0  0  0
    0  0  1  0  0
    0  0  0  1  1

── Scan (0,1)-(2,1): all '0' → skip ──

── Scan (2,2): grid[2][2] = '1' ──
  count = 2
  dfsSink(2,2):
    grid[2][2] = '0'
    ↓ dfsSink(3,2): '0' → return
    ↑ dfsSink(1,2): '0' → return
    → dfsSink(2,3): '0' → return
    ← dfsSink(2,1): '0' → return

  Grid after sinking Island 2:
    0  0  0  0  0
    0  0  0  0  0
    0  0  0  0  0
    0  0  0  1  1

── Scan (2,3)-(3,2): all '0' → skip ──

── Scan (3,3): grid[3][3] = '1' ──
  count = 3
  dfsSink(3,3):
    grid[3][3] = '0'
    ↓ dfsSink(4,3): OOB → return
    ↑ dfsSink(2,3): '0' → return
    → dfsSink(3,4):
      grid[3][4] = '0'
      all neighbors → OOB or '0' → return
    ← dfsSink(3,2): '0' → return

  Grid after sinking Island 3:
    0  0  0  0  0
    0  0  0  0  0
    0  0  0  0  0
    0  0  0  0  0

── Remaining cells: all '0' → skip ──

  Return count = 3 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 1 (BFS)
═══════════════════════════════════════════════

Same input:
    1  1  0  0  0
    1  1  0  0  0
    0  0  1  0  0
    0  0  0  1  1

vis = all false, count = 0

── Scan (0,0): '1' and not visited ──
  count = 1
  vis[0][0] = true, queue = [(0,0)]

  BFS Level 1: process [(0,0)]
    (0,0) neighbors:
      ↓ (1,0) → '1', not vis → vis=true, push
      ↑ (-1,0) → OOB
      → (0,1) → '1', not vis → vis=true, push
      ← (0,-1) → OOB
    next = [(1,0), (0,1)]

  BFS Level 2: process [(1,0), (0,1)]
    (1,0) neighbors:
      ↓ (2,0) → '0' → skip
      ↑ (0,0) → vis → skip
      → (1,1) → '1', not vis → vis=true, push
      ← (1,-1) → OOB
    (0,1) neighbors:
      ↓ (1,1) → already vis → skip
      ↑ (-1,1) → OOB
      → (0,2) → '0' → skip
      ← (0,0) → vis → skip
    next = [(1,1)]

  BFS Level 3: process [(1,1)]
    (1,1) neighbors: all vis or '0'
    next = [] → BFS ends

  Island 1 fully explored: (0,0),(1,0),(0,1),(1,1) all visited.

── Scan (0,1),(1,0),(1,1): all visited → skip ──

── Scan (2,2): '1' and not visited ──
  count = 2
  vis[2][2] = true, queue = [(2,2)]
  BFS: no unvisited '1' neighbors → ends immediately.

── Scan (3,3): '1' and not visited ──
  count = 3
  vis[3][3] = true, queue = [(3,3)]
  BFS Level 1: (3,4) → '1', not vis → push
  BFS Level 2: (3,4) → no new neighbors → ends

  Return count = 3 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 2 (Single island)
═══════════════════════════════════════════════

Input:
    1  1  1
    0  1  0
    1  1  1

  Scan (0,0): '1' → count = 1
  DFS sinks everything connected:
    (0,0)→(1,0)? '0'→stop. →(0,1)→(1,1)→(2,1)→(2,0)→(2,2)→(0,2)
  All '1's are connected → one big island.

  Return 1 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 3 (No islands)
═══════════════════════════════════════════════

Input:
    0  0  0
    0  0  0

  No '1' cells → count never increments.
  Return 0 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 4 (Every cell is an island)
═══════════════════════════════════════════════

Input:
    1  0  1
    0  1  0
    1  0  1

  Each '1' is isolated (no adjacent '1').
  DFS from each sinks just that one cell.

  count increments 5 times (five '1' cells).
  Return 5 ✅


═══════════════════════════════════════════════
  DRY RUN — Example 5 (One row)
═══════════════════════════════════════════════

Input:
    1  1  0  1  1  1  0  1

  Three groups: [0-1], [3-5], [7]
  Return 3 ✅


=== Comparison: Number of Islands vs Distinct Islands ===

  | Feature             | Number of Islands      | Distinct Islands       |
  |---------------------|------------------------|------------------------|
  | Question            | COUNT total islands    | COUNT unique SHAPES    |
  | DFS purpose         | Mark entire island     | Mark + encode shape    |
  | Uses path string?   | No                     | Yes (direction + B)    |
  | Uses Set?           | No                     | Yes (for shape strings)|
  | Result              | count of components    | Set.size               |
  | Simpler?            | Yes (most basic)       | Builds on this concept |


=== Edge Cases ===
- All water → 0
- All land → 1 (one big island)
- Each '1' isolated → count = number of '1' cells
- Single row / single column → works fine with 4-dir check
- 1×1 grid with '1' → 1
- 1×1 grid with '0' → 0
- Note: LeetCode uses CHARACTERS '1' and '0', not numbers 1 and 0!
*/


// ─── Driver Code ───
function runTests() {
    // Helper: deep copy grid (since DFS mutates)
    function copy(grid) { return grid.map(row => [...row]); }

    console.log("=== DFS Approach (In-Place) ===");

    // Test 1: Three islands
    console.log("Test 1:", numIslandsDFS(copy([
        ['1','1','0','0','0'],
        ['1','1','0','0','0'],
        ['0','0','1','0','0'],
        ['0','0','0','1','1']
    ])));
    // Expected: 3

    // Test 2: One island
    console.log("Test 2:", numIslandsDFS(copy([
        ['1','1','1','1','0'],
        ['1','1','0','1','0'],
        ['1','1','0','0','0'],
        ['0','0','0','0','0']
    ])));
    // Expected: 1

    // Test 3: No islands
    console.log("Test 3:", numIslandsDFS(copy([
        ['0','0','0'],
        ['0','0','0']
    ])));
    // Expected: 0

    // Test 4: Every cell is an island
    console.log("Test 4:", numIslandsDFS(copy([
        ['1','0','1'],
        ['0','1','0'],
        ['1','0','1']
    ])));
    // Expected: 5

    // Test 5: Single cell island
    console.log("Test 5:", numIslandsDFS(copy([
        ['1']
    ])));
    // Expected: 1

    // Test 6: Single row
    console.log("Test 6:", numIslandsDFS(copy([
        ['1','1','0','1','1','1','0','1']
    ])));
    // Expected: 3

    // Test 7: All land
    console.log("Test 7:", numIslandsDFS(copy([
        ['1','1'],
        ['1','1']
    ])));
    // Expected: 1

    console.log("\n=== BFS Approach (Visited Matrix) ===");

    // Test 8: Three islands
    console.log("Test 8:", numIslandsBFS([
        ['1','1','0','0','0'],
        ['1','1','0','0','0'],
        ['0','0','1','0','0'],
        ['0','0','0','1','1']
    ]));
    // Expected: 3

    // Test 9: One island
    console.log("Test 9:", numIslandsBFS([
        ['1','1','1','1','0'],
        ['1','1','0','1','0'],
        ['1','1','0','0','0'],
        ['0','0','0','0','0']
    ]));
    // Expected: 1

    // Test 10: Every cell is an island
    console.log("Test 10:", numIslandsBFS([
        ['1','0','1'],
        ['0','1','0'],
        ['1','0','1']
    ]));
    // Expected: 5

    // Test 11: Single row
    console.log("Test 11:", numIslandsBFS([
        ['1','1','0','1','1','1','0','1']
    ]));
    // Expected: 3
}

runTests();

