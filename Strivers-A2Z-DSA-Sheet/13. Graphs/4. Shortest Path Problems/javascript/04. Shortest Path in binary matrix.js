/*
=============================================================================
  QUESTION: 1091. Shortest Path in Binary Matrix (LeetCode)
=============================================================================

  Given an n x n binary matrix grid, return the length of the shortest
  clear path from top-left (0,0) to bottom-right (n-1, n-1).
  - A clear path consists of cells with value 0.
  - You can move in 8 directions (horizontal, vertical, diagonal).
  - The path length is the number of CELLS visited (not edges).
  - If no clear path exists, return -1.

  Example 1:
    grid = [[0,1],
            [1,0]]
    Output: 2
    Path: (0,0) → (1,1)  →  2 cells

  Example 2:
    grid = [[0,0,0],
            [1,1,0],
            [1,1,0]]
    Output: 4
    Path: (0,0) → (0,1) → (1,2) → (2,2)  →  3 cells? No!
    Remember: 8 directions includes diagonals.
    Shortest: (0,0) → (0,1) → (1,2) → (2,2) = 3 hops but path length = 4
    Note: Path length = number of CELLS visited = 4 (including start cell)

  Example 3:
    grid = [[1,0,0],
            [1,1,0],
            [1,1,0]]
    Output: -1 (start cell is blocked)

=============================================================================
  WHY BFS WORKS HERE
=============================================================================

  Each cell-to-cell move has equal cost (1 step). BFS explores all cells
  at distance d before distance d+1, so the FIRST time we reach (n-1,n-1)
  is guaranteed to be the shortest path.

=============================================================================
  APPROACH 1: Brute Force — DFS (Try all paths)
=============================================================================

  Idea: Use DFS to explore ALL possible paths from (0,0) to (n-1,n-1).
  Track the minimum path length.

  Time Complexity:  O(8^(n*n)) — exponential, extremely slow
  Space Complexity: O(n*n) for recursion stack

  NOT recommended. Only for understanding.

=============================================================================
*/

function shortestPathBrute(grid) {
    let n = grid.length;
    if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;

    let minPath = Infinity;

    // visited matrix to avoid revisiting in current path
    let visited = Array.from({ length: n }, () => new Array(n).fill(false));

    function dfs(row, col, pathLen) {
        // Reached destination
        if (row === n - 1 && col === n - 1) {
            minPath = Math.min(minPath, pathLen);
            return;
        }

        visited[row][col] = true;

        // Try all 8 directions
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue; // Skip self
                let newRow = row + dr;
                let newCol = col + dc;
                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n
                    && grid[newRow][newCol] === 0 && !visited[newRow][newCol]) {
                    dfs(newRow, newCol, pathLen + 1);
                }
            }
        }

        visited[row][col] = false; // Backtrack
    }

    dfs(0, 0, 1); // Start with path length 1 (counting the starting cell)

    return minPath === Infinity ? -1 : minPath;
}

/*
=============================================================================
  APPROACH 2: Optimal — BFS (Level-by-Level)
=============================================================================

  Algorithm:
    1. If start or end cell is blocked (value 1), return -1.
    2. Start BFS from (0, 0) with path length = 1.
    3. For each cell, explore all 8 neighbors.
    4. If neighbor is valid (in bounds, value 0, not visited), mark visited
       and add to next level.
    5. If we reach (n-1, n-1), return current level (path length).
    6. If BFS ends without reaching destination, return -1.

  Time Complexity:  O(n^2) — each cell visited at most once
  Space Complexity: O(n^2) — visited matrix + queue

  Dry Run:
    grid = [[0,0,0],
            [1,1,0],
            [1,1,0]]

    n = 3

    Level 1 (pathLen = 1):
      Process: (0,0)
      Neighbors: (0,1)✓, (1,1)✗(blocked), (1,0)✗(blocked)
      Queue: [(0,1)]

    Level 2 (pathLen = 2):
      Process: (0,1)
      Neighbors: (0,0)✗(visited), (0,2)✓, (1,0)✗, (1,1)✗, (1,2)✓
      Queue: [(0,2), (1,2)]

    Level 3 (pathLen = 3):
      Process: (0,2)
        Neighbors: (0,1)✗(visited), (1,1)✗, (1,2)✗(visited)
      Process: (1,2)
        Neighbors: (0,1)✗, (0,2)✗, (1,1)✗, (2,1)✗, (2,2)✓
      Queue: [(2,2)]

    Level 4 (pathLen = 4):
      Process: (2,2) → This is destination! Return 4 ✓

=============================================================================
*/

function shortestPathBinaryMatrix(grid) {
    let n = grid.length;

    // Edge case: start or end is blocked
    if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;

    // Edge case: single cell grid
    if (n === 1) return 1;

    // Visited matrix
    let visited = Array.from({ length: n }, () => new Array(n).fill(false));
    visited[0][0] = true;

    // BFS queue with starting cell
    let queue = [[0, 0]];
    let pathLen = 1; // Counting the starting cell

    while (queue.length > 0) {
        let nextLevel = [];

        for (let [row, col] of queue) {
            // Try all 8 directions
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;

                    let newRow = row + dr;
                    let newCol = col + dc;

                    // Check bounds, cell value, and visited status
                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n
                        && grid[newRow][newCol] === 0 && !visited[newRow][newCol]) {

                        // Check if we reached destination
                        if (newRow === n - 1 && newCol === n - 1) {
                            return pathLen + 1;
                        }

                        visited[newRow][newCol] = true;
                        nextLevel.push([newRow, newCol]);
                    }
                }
            }
        }

        queue = nextLevel;
        pathLen++;
    }

    return -1; // Destination unreachable
}

/*
=============================================================================
  APPROACH 3: BFS with Distance Matrix (Alternative Implementation)
=============================================================================

  Instead of level-by-level, maintain a distance matrix and update
  distances as we go. Same complexity, different coding style.

=============================================================================
*/

function shortestPathWithDist(grid) {
    let n = grid.length;
    if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;

    // Distance matrix — stores shortest path to each cell
    let dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
    dist[0][0] = 1; // Starting cell counts as 1

    let queue = [[0, 0]];

    while (queue.length > 0) {
        let [row, col] = queue.shift();

        // If reached destination, return distance
        if (row === n - 1 && col === n - 1) return dist[row][col];

        // 8 directions
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                let nr = row + dr, nc = col + dc;

                if (nr >= 0 && nr < n && nc >= 0 && nc < n
                    && grid[nr][nc] === 0 && dist[nr][nc] > dist[row][col] + 1) {
                    dist[nr][nc] = dist[row][col] + 1;
                    queue.push([nr, nc]);
                }
            }
        }
    }

    return -1;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. 8-directional BFS — same as regular BFS but with 8 neighbor checks.
  2. Path length counts CELLS, not edges (so start with pathLen = 1).
  3. Mark visited WHEN PUSHING to queue (not when popping) to avoid
     duplicate entries.
  4. Edge cases: blocked start/end, single cell grid.
  5. BFS guarantees shortest path for equal-weight moves.

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let grid1 = [[0,1],[1,0]];
    console.log("Test 1:", shortestPathBinaryMatrix(grid1)); // Output: 2

    let grid2 = [[0,0,0],[1,1,0],[1,1,0]];
    console.log("Test 2:", shortestPathBinaryMatrix(grid2)); // Output: 4

    let grid3 = [[1,0,0],[1,1,0],[1,1,0]];
    console.log("Test 3:", shortestPathBinaryMatrix(grid3)); // Output: -1

    let grid4 = [[0]];
    console.log("Test 4:", shortestPathBinaryMatrix(grid4)); // Output: 1

    // Brute force
    console.log("Brute Test 1:", shortestPathBrute(grid1)); // Output: 2
    console.log("Brute Test 2:", shortestPathBrute(grid2)); // Output: 4

    // With distance matrix
    console.log("Dist Test 2:", shortestPathWithDist(grid2)); // Output: 4
}

test();
