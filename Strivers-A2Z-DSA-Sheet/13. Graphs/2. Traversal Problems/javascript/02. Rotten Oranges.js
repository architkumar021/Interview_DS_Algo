/*
===========================================
  994. Rotting Oranges (LeetCode Medium)
===========================================

Question:
Given an m x n grid where each cell can have one of three values:
  0 → empty cell
  1 → fresh orange 🍊
  2 → rotten orange 🤢

Every minute, any fresh orange that is 4-directionally adjacent
(up, down, left, right) to a rotten orange becomes rotten.

Return the minimum number of minutes until no fresh orange remains.
Return -1 if it's impossible (some fresh orange can never be reached).

=== Why BFS? ===
This is a classic "Multi-Source BFS" problem.
- All rotten oranges spread simultaneously (like a wave), not one at a time.
- BFS processes nodes level by level → each level = 1 minute.
- We push ALL rotten oranges into the queue at the start (multi-source).
- Then BFS radiates outward — level 1 rots adjacent fresh oranges,
  level 2 rots the next ring, and so on.

=== Algorithm (Step by Step) ===
1. Scan the grid:
   - Push all rotten oranges (value 2) into the queue.
   - Count all fresh oranges (value 1).
2. If fresh count is 0 → return 0 (nothing to rot).
3. BFS level by level:
   - For each rotten orange in the current level, check 4 neighbors.
   - If neighbor is a fresh orange → mark it rotten, add to next level, decrement fresh count.
   - After processing one full level → increment minutes.
4. After BFS ends:
   - If fresh > 0 → some oranges are unreachable → return -1.
   - Otherwise → return minutes.

=== Why minutes starts at -1? ===
The first level in the queue contains the INITIAL rotten oranges (minute 0).
Processing them doesn't add a minute — they were already rotten.
So we start minutes at -1 to offset this first "free" level.

Time Complexity:  O(m × n) — every cell visited at most once.
Space Complexity: O(m × n) — queue can hold all cells in worst case.
*/

function orangesRotting(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let minutes = -1;
    let fresh = 0;
    let queue = [];

    // Step 1: Find all initial rotten oranges and count fresh ones
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) queue.push([i, j]); // rotten → into queue
            if (grid[i][j] === 1) fresh++;              // count fresh
        }
    }

    // Step 2: No fresh oranges → nothing to rot
    if (fresh === 0) return 0;

    // 4 directions: up, down, left, right
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    // Step 3: BFS level by level (each level = 1 minute)
    while (queue.length > 0) {
        let next = [];

        for (let [x, y] of queue) {
            // Check all 4 neighbors
            for (let d = 0; d < 4; d++) {
                let nx = x + dr[d];
                let ny = y + dc[d];

                // If valid cell AND fresh orange → rot it
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
                    grid[nx][ny] = 2;    // mark rotten
                    next.push([nx, ny]); // add to next level
                    fresh--;             // one less fresh orange
                }
            }
        }

        queue = next;  // move to next level
        minutes++;     // one minute passed
    }

    // Step 4: If any fresh orange left → unreachable → return -1
    return fresh > 0 ? -1 : minutes;
}


/*
=== DRY RUN — Example 1 ===

Input: grid = [[2, 1, 1],
               [1, 1, 0],
               [0, 1, 1]]

Step 1 — Initial scan:
  Rotten oranges (value 2): (0,0)
  Fresh count: 6
  queue = [(0,0)]
  minutes = -1

  Grid:
    [2, 1, 1]
    [1, 1, 0]
    [0, 1, 1]

─── Minute 0 (process initial rotten) ───
  Process queue = [(0,0)]

  (0,0) neighbors:
    ↑ (-1,0) → out of bounds
    ↓ (1,0)  → grid[1][0] = 1 ✅ fresh! → mark rotten, fresh = 5
    ← (0,-1) → out of bounds
    → (0,1)  → grid[0][1] = 1 ✅ fresh! → mark rotten, fresh = 4

  next = [(1,0), (0,1)]
  queue = [(1,0), (0,1)], minutes = -1 + 1 = 0

  Grid after minute 0:
    [2, 2, 1]
    [2, 1, 0]
    [0, 1, 1]

─── Minute 1 ───
  Process queue = [(1,0), (0,1)]

  (1,0) neighbors:
    ↑ (0,0) → 2 (already rotten) → skip
    ↓ (2,0) → 0 (empty) → skip
    ← (1,-1) → out of bounds
    → (1,1) → grid[1][1] = 1 ✅ fresh! → mark rotten, fresh = 3

  (0,1) neighbors:
    ↑ (-1,1) → out of bounds
    ↓ (1,1)  → 2 (just rotted above) → skip
    ← (0,0)  → 2 (already rotten) → skip
    → (0,2)  → grid[0][2] = 1 ✅ fresh! → mark rotten, fresh = 2

  next = [(1,1), (0,2)]
  queue = [(1,1), (0,2)], minutes = 0 + 1 = 1

  Grid after minute 1:
    [2, 2, 2]
    [2, 2, 0]
    [0, 1, 1]

─── Minute 2 ───
  Process queue = [(1,1), (0,2)]

  (1,1) neighbors:
    ↑ (0,1) → 2 → skip
    ↓ (2,1) → grid[2][1] = 1 ✅ fresh! → mark rotten, fresh = 1
    ← (1,0) → 2 → skip
    → (1,2) → 0 (empty) → skip

  (0,2) neighbors:
    ↑ (-1,2) → out of bounds
    ↓ (1,2)  → 0 (empty) → skip
    ← (0,1)  → 2 → skip
    → (0,3)  → out of bounds

  next = [(2,1)]
  queue = [(2,1)], minutes = 1 + 1 = 2

  Grid after minute 2:
    [2, 2, 2]
    [2, 2, 0]
    [0, 2, 1]

─── Minute 3 ───
  Process queue = [(2,1)]

  (2,1) neighbors:
    ↑ (1,1) → 2 → skip
    ↓ (3,1) → out of bounds
    ← (2,0) → 0 (empty) → skip
    → (2,2) → grid[2][2] = 1 ✅ fresh! → mark rotten, fresh = 0

  next = [(2,2)]
  queue = [(2,2)], minutes = 2 + 1 = 3

  Grid after minute 3:
    [2, 2, 2]
    [2, 2, 0]
    [0, 2, 2]

─── Minute 4 ───
  Process queue = [(2,2)]

  (2,2) neighbors:
    ↑ (1,2) → 0 (empty) → skip
    ↓ (3,2) → out of bounds
    ← (2,1) → 2 → skip
    → (2,3) → out of bounds

  next = []
  queue = [], minutes = 3 + 1 = 4

─── BFS ends (queue is empty) ───
  fresh = 0 → all oranges rotted ✅
  Return minutes = 4

  Output: 4 ✅


=== DRY RUN — Example 2 (Impossible case) ===

Input: grid = [[2, 1, 1],
               [0, 1, 1],
               [1, 0, 1]]

  Rotten: (0,0)   Fresh: 6

  After BFS completes:
    [2, 2, 2]
    [0, 2, 2]
    [1, 0, 2]

  fresh = 1 → cell (2,0) is isolated (surrounded by 0s and boundary)
  It can never be reached by any rotten orange.
  Return -1 ✅


=== DRY RUN — Example 3 (No fresh oranges) ===

Input: grid = [[0, 2]]

  Fresh count = 0 → return 0 immediately ✅


=== Edge Cases ===
- All fresh, no rotten → BFS never starts → fresh > 0 → return -1
- All rotten, no fresh → return 0
- Single cell with fresh → no rotten neighbor → return -1
- Single cell with rotten → no fresh → return 0
*/


// ─── Driver Code ───
function runTests() {
    // Test 1: Standard case
    let grid1 = [[2, 1, 1],
                  [1, 1, 0],
                  [0, 1, 1]];
    console.log("Test 1:", orangesRotting(grid1));  // Expected: 4

    // Test 2: Impossible — isolated fresh orange
    let grid2 = [[2, 1, 1],
                  [0, 1, 1],
                  [1, 0, 1]];
    console.log("Test 2:", orangesRotting(grid2));  // Expected: -1

    // Test 3: No fresh oranges
    let grid3 = [[0, 2]];
    console.log("Test 3:", orangesRotting(grid3));  // Expected: 0

    // Test 4: All fresh, no rotten
    let grid4 = [[1, 1],
                  [1, 1]];
    console.log("Test 4:", orangesRotting(grid4));  // Expected: -1

    // Test 5: Multiple rotten sources
    let grid5 = [[2, 1, 1],
                  [1, 1, 1],
                  [1, 1, 2]];
    console.log("Test 5:", orangesRotting(grid5));  // Expected: 2

    // Test 6: Single fresh orange next to rotten
    let grid6 = [[2, 1]];
    console.log("Test 6:", orangesRotting(grid6));  // Expected: 1

    // Test 7: Empty grid (no oranges at all)
    let grid7 = [[0, 0],
                  [0, 0]];
    console.log("Test 7:", orangesRotting(grid7));  // Expected: 0
}

runTests();


