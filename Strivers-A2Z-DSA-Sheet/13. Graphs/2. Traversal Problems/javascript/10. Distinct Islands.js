/*
===============================================
  Number of Distinct Islands (GFG Medium)
===============================================

Question:
Given an n × m binary matrix grid (0 = water, 1 = land),
find the number of DISTINCT islands.

An island = a group of connected 1's (4-directional).
Two islands are DISTINCT if they have DIFFERENT SHAPES.
(Same shape at different positions = NOT distinct.)

Example:
  Input:                         Output: 2
    1  1  0  0  0
    1  1  0  0  0                Island A (top-left) and Island C (bottom-right)
    0  0  0  1  1                have the SAME shape → count as 1.
    0  0  0  1  1                Island B (bottom-center-left) has a different shape.
                                 Total distinct = 2.

=== Key Challenge: How to compare island SHAPES? ===

Two islands at different grid positions can have the same shape.
We need a way to "normalize" each island so that position doesn't matter.

=== Approach: Path Encoding (Direction String) ===

When we DFS through an island, we record the DIRECTIONS we take:
  - "D" = moved Down
  - "U" = moved Up
  - "R" = moved Right
  - "L" = moved Left

But here's the trick: we also record BACKTRACK markers.
When DFS returns (backtracks) from a direction, we DON'T add
anything — the direction letter itself acts as both the move
and the "I tried this direction" marker.

Wait, actually the original approach adds the direction BEFORE
the recursive call. So the sequence of directions encodes the
exact DFS traversal path. Two islands with the same shape will
produce the same direction string regardless of their position.

=== Why do we need backtrack markers? ===

Without backtrack markers, different shapes can produce the
same direction string! Example:

  Island A:      Island B:
    1 1            1 0
    0 1            1 1

  DFS from top-left of each:
  Without backtrack: both might give "R D" → WRONG (same string, different shapes)
  With backtrack:    A gives "R↩D↩" and B gives "D R↩↩" → CORRECT (different strings)

The direction letters "U","D","R","L" pushed BEFORE each recursive call
naturally act as path markers. Since DFS explores in a fixed order
(down, up, right, left), the sequence of direction letters perfectly
encodes the shape.

=== Algorithm ===
1. Create a visited matrix.
2. For each unvisited land cell (1):
   a. Run DFS and build a direction string (path encoding).
   b. Add the string to a Set.
3. Return the Set size = number of distinct island shapes.

Time Complexity:  O(n × m) — each cell visited at most once.
Space Complexity: O(n × m) — visited matrix + path strings.
*/

function dfs(i, j, grid, vis, path, dir) {
    // Out of bounds or water or already visited → stop
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length
        || grid[i][j] !== 1 || vis[i][j]) {
        return;
    }

    vis[i][j] = true;
    path.push(dir);             // Record the direction we came from

    dfs(i + 1, j, grid, vis, path, "D");  // ↓ Down
    dfs(i - 1, j, grid, vis, path, "U");  // ↑ Up
    dfs(i, j + 1, grid, vis, path, "R");  // → Right
    dfs(i, j - 1, grid, vis, path, "L");  // ← Left

    path.push("B");             // Backtrack marker (leaving this cell)
}

function countDistinctIslands(grid) {
    let n = grid.length;
    let m = grid[0].length;
    let vis = Array.from({ length: n }, () => new Array(m).fill(false));
    let shapes = new Set();

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1 && !vis[i][j]) {
                let path = [];
                dfs(i, j, grid, vis, path, "S");  // "S" = Start
                shapes.add(path.join(""));
            }
        }
    }

    return shapes.size;
}


/*
═══════════════════════════════════════════════
  DRY RUN — Example 1
═══════════════════════════════════════════════

Input grid:
    1  1  0  0  0
    1  1  0  0  0
    0  0  0  1  1
    0  0  0  1  1

n = 4, m = 5

── Scan (0,0): grid[0][0] = 1, not visited ──

  DFS from (0,0), dir = "S" (start):
    vis[0][0] = true, path = ["S"]

    ↓ dfs(1,0, "D"):
      vis[1][0] = true, path = ["S","D"]

      ↓ dfs(2,0, "D"): grid[2][0]=0 → return
      ↑ dfs(0,0, "U"): already visited → return
      → dfs(1,1, "R"):
        vis[1][1] = true, path = ["S","D","R"]

        ↓ dfs(2,1, "D"): grid[2][1]=0 → return
        ↑ dfs(0,1, "U"):
          vis[0][1] = true, path = ["S","D","R","U"]

          ↓ dfs(1,1, "D"): visited → return
          ↑ dfs(-1,1, "U"): OOB → return
          → dfs(0,2, "R"): grid[0][2]=0 → return
          ← dfs(0,0, "L"): visited → return
          path.push("B") → ["S","D","R","U","B"]

        → dfs(1,2, "R"): grid[1][2]=0 → return
        ← dfs(1,0, "L"): visited → return
        path.push("B") → ["S","D","R","U","B","B"]

      ← dfs(1,-1, "L"): OOB → return
      path.push("B") → ["S","D","R","U","B","B","B"]

    ↑ dfs(-1,0, "U"): OOB → return
    → dfs(0,1, "R"): already visited → return
    ← dfs(0,-1, "L"): OOB → return
    path.push("B") → ["S","D","R","U","B","B","B","B"]

  Island A path = "SDRUBBBB"
  shapes = {"SDRUBBBB"}

── Scan continues... (0,1),(1,0),(1,1) already visited ──

── Scan (2,3): grid[2][3] = 1, not visited ──

  DFS from (2,3), dir = "S":
    vis[2][3] = true, path = ["S"]

    ↓ dfs(3,3, "D"):
      vis[3][3] = true, path = ["S","D"]

      ↓ dfs(4,3): OOB → return
      ↑ dfs(2,3): visited → return
      → dfs(3,4, "R"):
        vis[3][4] = true, path = ["S","D","R"]

        all neighbors → OOB, visited, or 0
        path.push("B") → ["S","D","R","B"]

      ← dfs(3,2): grid[3][2]=0 → return
      path.push("B") → ["S","D","R","B","B"]

    ↑ dfs(1,3): grid[1][3]=0 → return
    → dfs(2,4, "R"):
      vis[2][4] = true, path = ["S","D","R","B","B","R"]

      ↓ dfs(3,4): visited → return
      ↑ dfs(1,4): grid[1][4]=0 → return
      → dfs(2,5): OOB → return
      ← dfs(2,3): visited → return
      path.push("B") → ["S","D","R","B","B","R","B"]

    ← dfs(2,2): grid[2][2]=0 → return
    path.push("B") → ["S","D","R","B","B","R","B","B"]

  Island B path = "SDRBBRBBB"

  Wait — let me recount. Island B is also a 2×2 block:
    (2,3)(2,4)
    (3,3)(3,4)

  Hmm, both Island A and Island B are 2×2 blocks.
  Let me retrace Island A more carefully:

  Actually, the DFS traversal ORDER is the same for both since
  both are 2×2 blocks. The direction sequences encode the SHAPE
  relative to the starting cell, so two 2×2 blocks anywhere in
  the grid will produce the SAME path string.

  Let me retrace Island B properly:
  DFS(2,3,"S") → path=["S"]
    DFS(3,3,"D") → path=["S","D"]
      DFS(4,3) OOB, DFS(2,3) vis
      DFS(3,4,"R") → path=["S","D","R"]
        DFS(4,4) OOB, DFS(2,4,"U"):
          vis[2][4]=true, path=["S","D","R","U"]
          all neighbors → OOB/vis/0
          path.push("B") → ["S","D","R","U","B"]
        DFS(3,5) OOB, DFS(3,2) 0
        path.push("B") → ["S","D","R","U","B","B"]
      DFS(3,2) 0
      path.push("B") → ["S","D","R","U","B","B","B"]
    DFS(1,3) 0
    DFS(2,4) vis
    DFS(2,2) 0
    path.push("B") → ["S","D","R","U","B","B","B","B"]

  Island B path = "SDRUBBBB"  ← SAME as Island A! ✅

  shapes = {"SDRUBBBB"}  → size = 1

  But wait, those are both 2×2 blocks, so only 1 distinct shape.
  Let me use a better example with actual different shapes.


═══════════════════════════════════════════════
  DRY RUN — Example 2 (Different shapes)
═══════════════════════════════════════════════

Input grid:
    1  1  0  1  0
    1  0  0  1  1
    0  0  0  0  0

── Island A at (0,0): ──
  Shape:
    1  1
    1  0    (L-shape)

  DFS(0,0,"S") → DFS(1,0,"D") → backtrack → DFS(0,1,"R") → backtrack
  Path: "S D B R B B"

── Island B at (0,3): ──
  Shape:
    1  0
    1  1    (reverse L-shape)

  DFS(0,3,"S") → DFS(1,3,"D") → DFS(1,4,"R") → backtrack → backtrack → backtrack
  Path: "S D R B B B"

  "SDBRBB" ≠ "SDRBBB" → different shapes → distinct! ✅

  shapes = {"SDBRBB", "SDRBBB"}
  Return 2 ✅

  Key insight: The backtrack marker "B" appears at different
  positions in the string, encoding when DFS finished a branch.
  This differentiates shapes that visit the same number of cells
  but in different arrangements.


═══════════════════════════════════════════════
  DRY RUN — Example 3 (Why backtrack markers matter)
═══════════════════════════════════════════════

Without backtrack markers:

  Island A:      Island B:
    1 1 0          1 0 0
    0 1 0          1 1 0

  Both have 3 cells. DFS from top-left:
  Island A: S → R → (back) → D     → gives "SRD"
  Island B: S → D → R              → gives "SDR"

  These are different ✅ — good, they ARE different shapes.

  But consider:
  Island C:      Island D:
    1 0            1 0
    1 0            1 1
    1 0            0 0

  Without backtrack:
  Island C: S → D → D → gives "SDD"
  Island D: S → D → R → gives "SDR"

  Different ✅ — correct.

  Tricky case:
  Island E:      Island F:
    1 1            1 0
    1 0            1 1
    0 0            1 0

  Without backtrack:
  Island E: S, R(→0,1), back, D(→1,0)   → "SRD"
  Island F: S, D(→1,0), R(→1,1), back, D(→2,0) → "SDRD"

  Different string lengths → still distinguishable.

  BUT without backtrack, there exist edge cases where different
  shapes produce the same string. The backtrack marker "B"
  eliminates ALL such ambiguities by fully encoding the DFS tree.


═══════════════════════════════════════════════
  DRY RUN — Example 4 (All same shape)
═══════════════════════════════════════════════

Input grid:
    1  0  1  0  1
    0  0  0  0  0

  Three single-cell islands at (0,0), (0,2), (0,4).
  Each DFS: path = ["S", "B"]  → "SB"

  shapes = {"SB"}
  Return 1 ✅ (all same shape — single cell)


═══════════════════════════════════════════════
  DRY RUN — Example 5 (One big island)
═══════════════════════════════════════════════

Input grid:
    1  1  1
    1  1  1

  All cells connected → one island → one path.
  shapes has 1 entry.
  Return 1 ✅


=== Edge Cases ===
- All water (0s) → 0 islands → 0
- All land (1s) → 1 island → 1
- Each cell is an isolated 1 → all single-cell → 1 distinct shape
- Rotated/reflected islands → counted as DISTINCT (problem says no rotation/reflection)
- 1×1 grid with 1 → 1
*/


// ─── Driver Code ───
function runTests() {
    // Test 1: Two identical 2×2 blocks
    console.log("Test 1:", countDistinctIslands([
        [1,1,0,0,0],
        [1,1,0,0,0],
        [0,0,0,1,1],
        [0,0,0,1,1]
    ]));
    // Expected: 1 (both are 2×2 blocks → same shape)

    // Test 2: Two different L-shapes
    console.log("Test 2:", countDistinctIslands([
        [1,1,0,1,0],
        [1,0,0,1,1],
        [0,0,0,0,0]
    ]));
    // Expected: 2 (L-shape vs reverse-L)

    // Test 3: Three single cells (all same)
    console.log("Test 3:", countDistinctIslands([
        [1,0,1,0,1],
        [0,0,0,0,0]
    ]));
    // Expected: 1

    // Test 4: All water
    console.log("Test 4:", countDistinctIslands([
        [0,0],
        [0,0]
    ]));
    // Expected: 0

    // Test 5: One big island
    console.log("Test 5:", countDistinctIslands([
        [1,1,1],
        [1,1,1]
    ]));
    // Expected: 1

    // Test 6: Horizontal bar vs vertical bar
    console.log("Test 6:", countDistinctIslands([
        [1,1,1,0],
        [0,0,0,0],
        [1,0,0,0],
        [1,0,0,0],
        [1,0,0,0]
    ]));
    // Expected: 2 (horizontal 1×3 vs vertical 3×1 → different DFS paths)

    // Test 7: Same T-shape at two positions
    console.log("Test 7:", countDistinctIslands([
        [1,1,1,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,1,1,1,0],
        [0,0,0,0,1,0,0]
    ]));
    // Expected: 1 (both are T-shapes)
}

runTests();

