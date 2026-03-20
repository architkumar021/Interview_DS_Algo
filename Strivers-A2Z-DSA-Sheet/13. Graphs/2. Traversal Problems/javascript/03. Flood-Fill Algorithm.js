/*
===============================================
  733. Flood Fill (LeetCode Easy)
===============================================

Question:
Given an m x n image grid, a starting pixel (sr, sc), and a new color,
perform flood fill starting from that pixel.

Flood fill = Change the starting pixel's color AND all 4-directionally
connected pixels that have the SAME original color to the new color.

Think of it like the "paint bucket" tool in MS Paint or Photoshop.

=== Approach (BFS) ===
1. Save the original color of the starting pixel.
2. If original color === new color → nothing to do, return as is.
3. Color the starting pixel with new color and push it into the queue.
4. BFS: For each pixel in the queue, check its 4 neighbors.
   - If neighbor is in bounds AND has the original color → color it, push to queue.
5. Return the modified image.

=== Why check "originalColor !== newColor"? ===
If they are the same, BFS would re-visit already-colored pixels
infinitely (since colored pixel still matches original color).
This guard prevents an infinite loop.

Time Complexity:  O(m × n) — each pixel visited at most once.
Space Complexity: O(m × n) — queue + copy of the image.
*/

function floodFill(image, sr, sc, color) {
    // Work on a copy so we don't mutate the original input
    let ans = image.map(row => [...row]);
    let m = ans.length;
    let n = ans[0].length;

    let originalColor = ans[sr][sc];

    // If already the same color → nothing to do
    if (originalColor === color) return ans;

    // Color starting pixel and begin BFS
    ans[sr][sc] = color;
    let queue = [[sr, sc]];

    // 4 directions: up, down, left, right
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        let next = [];

        for (let [x, y] of queue) {
            for (let d = 0; d < 4; d++) {
                let nx = x + dr[d];
                let ny = y + dc[d];

                // In bounds AND still has original color → fill it
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && ans[nx][ny] === originalColor) {
                    ans[nx][ny] = color;
                    next.push([nx, ny]);
                }
            }
        }

        queue = next;
    }

    return ans;
}


/*
=== DRY RUN — Example 1 ===

Input: image = [[1, 1, 1],        sr = 1, sc = 1, color = 2
                [1, 1, 0],
                [1, 0, 1]]

  originalColor = image[1][1] = 1
  newColor = 2  (different from 1 → proceed)

  Color (1,1) → 2, push to queue

  Grid:              queue = [(1,1)]
    [1, 1, 1]
    [1, 2, 0]
    [1, 0, 1]

─── BFS Level 1: process [(1,1)] ───

  (1,1) neighbors:
    ↑ (0,1) → ans[0][1] = 1 = originalColor ✅ → color to 2
    ↓ (2,1) → ans[2][1] = 0 ≠ 1 → skip
    ← (1,0) → ans[1][0] = 1 = originalColor ✅ → color to 2
    → (1,2) → ans[1][2] = 0 ≠ 1 → skip

  next = [(0,1), (1,0)]

  Grid:              queue = [(0,1), (1,0)]
    [1, 2, 1]
    [2, 2, 0]
    [1, 0, 1]

─── BFS Level 2: process [(0,1), (1,0)] ───

  (0,1) neighbors:
    ↑ (-1,1) → out of bounds
    ↓ (1,1)  → ans[1][1] = 2 ≠ 1 → skip (already colored)
    ← (0,0)  → ans[0][0] = 1 = originalColor ✅ → color to 2
    → (0,2)  → ans[0][2] = 1 = originalColor ✅ → color to 2

  (1,0) neighbors:
    ↑ (0,0) → ans[0][0] = 2 ≠ 1 → skip (just colored above)
    ↓ (2,0) → ans[2][0] = 1 = originalColor ✅ → color to 2
    ← (1,-1) → out of bounds
    → (1,1)  → ans[1][1] = 2 ≠ 1 → skip

  next = [(0,0), (0,2), (2,0)]

  Grid:              queue = [(0,0), (0,2), (2,0)]
    [2, 2, 2]
    [2, 2, 0]
    [2, 0, 1]

─── BFS Level 3: process [(0,0), (0,2), (2,0)] ───

  (0,0) neighbors:
    ↑ (-1,0) → out of bounds
    ↓ (1,0)  → 2 ≠ 1 → skip
    ← (0,-1) → out of bounds
    → (0,1)  → 2 ≠ 1 → skip

  (0,2) neighbors:
    ↑ (-1,2) → out of bounds
    ↓ (1,2)  → 0 ≠ 1 → skip
    ← (0,1)  → 2 ≠ 1 → skip
    → (0,3)  → out of bounds

  (2,0) neighbors:
    ↑ (1,0)  → 2 ≠ 1 → skip
    ↓ (3,0)  → out of bounds
    ← (2,-1) → out of bounds
    → (2,1)  → 0 ≠ 1 → skip

  next = []  → BFS ends

  Final Grid:
    [2, 2, 2]
    [2, 2, 0]       ← (2,2) stays 1 because it was NOT connected
    [2, 0, 1]          to (1,1) through cells of color 1

  Output: [[2,2,2],[2,2,0],[2,0,1]] ✅

  Key insight: (2,2) has value 1 but is NOT 4-directionally
  connected to the starting pixel through a path of 1s.
  The 0s at (1,2) and (2,1) block the connection.


=== DRY RUN — Example 2 (Same color — no-op) ===

Input: image = [[0, 0, 0],        sr = 0, sc = 0, color = 0
                [0, 0, 0]]

  originalColor = 0
  newColor = 0
  originalColor === color → return immediately (no changes)

  Output: [[0,0,0],[0,0,0]] ✅


=== DRY RUN — Example 3 (Single pixel) ===

Input: image = [[5]],             sr = 0, sc = 0, color = 9

  originalColor = 5, newColor = 9
  Color (0,0) → 9, queue = [(0,0)]

  BFS Level 1: (0,0) has no valid neighbors → next = []

  Output: [[9]] ✅


=== DRY RUN — Example 4 (Color doesn't spread across different values) ===

Input: image = [[1, 2, 1],        sr = 0, sc = 0, color = 3
                [2, 2, 2],
                [1, 2, 1]]

  originalColor = image[0][0] = 1, newColor = 3
  Color (0,0) → 3, queue = [(0,0)]

  BFS Level 1: (0,0) neighbors:
    ↓ (1,0) → 2 ≠ 1 → skip
    → (0,1) → 2 ≠ 1 → skip
    (other two out of bounds)

  next = [] → BFS ends immediately!

  Output: [[3, 2, 1],
           [2, 2, 2],
           [1, 2, 1]]

  Only (0,0) changed. The 2s blocked the flood from reaching
  other 1s at (0,2), (2,0), (2,2). They are NOT connected. ✅


=== Edge Cases ===
- originalColor === newColor → return immediately (avoid infinite loop)
- Single pixel grid → color it and return
- Entire grid is one color → every pixel gets changed
- Starting pixel surrounded by different colors → only starting pixel changes
*/


// ─── Driver Code ───
function runTests() {
    // Test 1: Standard flood fill
    console.log("Test 1:", JSON.stringify(
        floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)
    ));
    // Expected: [[2,2,2],[2,2,0],[2,0,1]]

    // Test 2: Same color (no-op)
    console.log("Test 2:", JSON.stringify(
        floodFill([[0,0,0],[0,0,0]], 0, 0, 0)
    ));
    // Expected: [[0,0,0],[0,0,0]]

    // Test 3: Single pixel
    console.log("Test 3:", JSON.stringify(
        floodFill([[5]], 0, 0, 9)
    ));
    // Expected: [[9]]

    // Test 4: Blocked by different values
    console.log("Test 4:", JSON.stringify(
        floodFill([[1,2,1],[2,2,2],[1,2,1]], 0, 0, 3)
    ));
    // Expected: [[3,2,1],[2,2,2],[1,2,1]]

    // Test 5: Entire grid is same color
    console.log("Test 5:", JSON.stringify(
        floodFill([[1,1],[1,1]], 0, 0, 7)
    ));
    // Expected: [[7,7],[7,7]]

    // Test 6: Corner start
    console.log("Test 6:", JSON.stringify(
        floodFill([[1,1,1],[1,1,1],[1,1,1]], 2, 2, 4)
    ));
    // Expected: [[4,4,4],[4,4,4],[4,4,4]]
}

runTests();

// DFS Approach
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    let ans = Array.from(image, row => [...row]);
    let m = ans.length;
    let n = ans[0].length;

    let originalColor = ans[sr][sc];

    if (originalColor === color) return ans;

    function dfs(sr, sc) {
        if(sr < 0 || sc < 0 || sr >= m || sc >= n || ans[sr][sc] !== originalColor) return;

        ans[sr][sc] = color;

        dfs(sr + 1, sc);
        dfs(sr - 1, sc);
        dfs(sr, sc + 1);
        dfs(sr, sc - 1);
    }

    dfs(sr, sc);

    return ans;
};