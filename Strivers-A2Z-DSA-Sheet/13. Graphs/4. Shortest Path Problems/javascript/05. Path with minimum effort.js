/*
=============================================================================
  QUESTION: 1631. Path With Minimum Effort (LeetCode)
=============================================================================

  You are a hiker. Given a 2D array heights of size rows x columns where
  heights[row][col] = height of cell (row, col).

  You want to travel from top-left (0,0) to bottom-right (rows-1, cols-1).
  You can move UP, DOWN, LEFT, RIGHT (4 directions only).

  The "effort" of a path is the MAXIMUM absolute difference in heights
  between two consecutive cells along the path.

  Return the MINIMUM effort required to travel from (0,0) to (rows-1,cols-1).

  Example 1:
    heights = [[1,2,2],
               [3,8,2],
               [5,3,5]]
    Output: 2

    Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)
    Differences: |1-2|=1, |2-2|=0, |2-2|=0, |2-5|=3 → max=3 ❌
    Better path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2) effort=3
    Even better: (0,0)→(1,0)→(2,0)→(2,1)→(2,2)
    Differences: |1-3|=2, |3-5|=2, |5-3|=2, |3-5|=2 → max=2 ✓

  Example 2:
    heights = [[1,2,3],
               [3,8,4],
               [5,3,5]]
    Output: 1

    Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)
    Differences: |1-2|=1, |2-3|=1, |3-4|=1, |4-5|=1 → max=1 ✓

=============================================================================
  KEY INSIGHT
=============================================================================

  This is NOT about shortest path by sum of weights. It's about finding
  the path where the MAXIMUM edge weight (height difference) is MINIMIZED.

  Think of it as: "What's the least steep mountain I need to climb?"

  This can be solved using:
    1. Dijkstra's (modified) — replace sum with max
    2. Binary Search + BFS/DFS
    3. Union-Find (Kruskal's style)

=============================================================================
  APPROACH 1: Brute Force — DFS (Try all paths)
=============================================================================

  Try every possible path from (0,0) to (rows-1, cols-1).
  For each path, compute max difference. Track global minimum.

  Time Complexity:  O(4^(rows*cols)) — exponential
  Space Complexity: O(rows*cols) for recursion stack

=============================================================================
*/

function minimumEffortBrute(heights) {
    let rows = heights.length, cols = heights[0].length;
    let minEffort = Infinity;
    let visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
    let directions = [[0,1],[0,-1],[1,0],[-1,0]];

    function dfs(row, col, currentMaxDiff) {
        // Reached destination
        if (row === rows - 1 && col === cols - 1) {
            minEffort = Math.min(minEffort, currentMaxDiff);
            return;
        }

        // Prune: if current max already >= known minimum, skip
        if (currentMaxDiff >= minEffort) return;

        visited[row][col] = true;

        for (let [dr, dc] of directions) {
            let nr = row + dr, nc = col + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                let diff = Math.abs(heights[row][col] - heights[nr][nc]);
                dfs(nr, nc, Math.max(currentMaxDiff, diff));
            }
        }

        visited[row][col] = false; // Backtrack
    }

    dfs(0, 0, 0);
    return minEffort;
}

/*
=============================================================================
  APPROACH 2: Binary Search + BFS
=============================================================================

  Idea: Binary search on the answer (effort value).
  For a given effort 'mid', check if there exists a path from (0,0) to
  (rows-1,cols-1) where all consecutive differences <= mid.

  Use BFS/DFS to check if such a path exists.

  Binary search range: [0, max_height_difference]

  Time Complexity:  O(rows * cols * log(maxDiff))
  Space Complexity: O(rows * cols)

  Dry Run:
    heights = [[1,2,2],[3,8,2],[5,3,5]]
    Max possible diff = 8-1 = 7
    Binary search: low=0, high=7

    mid=3: Can we reach (2,2) with max diff ≤ 3?
      BFS: (0,0)→(0,1) diff=1✓ → (0,2) diff=0✓ → (1,2) diff=0✓
           → (2,2) diff=3✓ → YES!
      high = 3

    mid=1: Can we reach (2,2) with max diff ≤ 1?
      BFS: (0,0)→(0,1) diff=1✓ → (0,2) diff=0✓ → stuck!
      (1,2) diff=0✓ but (2,2) diff=3✗ → NO
      low = 2

    mid=2: Can we reach (2,2) with max diff ≤ 2?
      BFS: (0,0)→(1,0) diff=2✓ → (2,0) diff=2✓ → (2,1) diff=2✓
           → (2,2) diff=2✓ → YES!
      high = 2

    low=2, high=2 → Answer = 2 ✓

=============================================================================
*/

function minimumEffortBinarySearch(heights) {
    let rows = heights.length, cols = heights[0].length;
    let directions = [[0,1],[0,-1],[1,0],[-1,0]];

    // Check if path exists with max effort <= maxEffort
    function canReach(maxEffort) {
        let visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
        let queue = [[0, 0]];
        visited[0][0] = true;

        while (queue.length > 0) {
            let [row, col] = queue.shift();

            if (row === rows - 1 && col === cols - 1) return true;

            for (let [dr, dc] of directions) {
                let nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                    let diff = Math.abs(heights[row][col] - heights[nr][nc]);
                    if (diff <= maxEffort) {
                        visited[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }
        }

        return false;
    }

    // Binary search on effort
    let low = 0, high = 0;

    // Find max possible difference
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (j + 1 < cols) high = Math.max(high, Math.abs(heights[i][j] - heights[i][j + 1]));
            if (i + 1 < rows) high = Math.max(high, Math.abs(heights[i][j] - heights[i + 1][j]));
        }
    }

    let answer = high;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (canReach(mid)) {
            answer = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return answer;
}

/*
=============================================================================
  APPROACH 3: Optimal — Modified Dijkstra's Algorithm
=============================================================================

  Key Modification: Instead of summing edge weights, we take the MAX.
    - dist[r][c] = minimum possible "max effort" to reach cell (r,c)
    - When relaxing: newEffort = max(currentEffort, |height diff|)
    - If newEffort < dist[nr][nc], update and push to min-heap.

  Algorithm:
    1. Initialize dist[][] = Infinity, dist[0][0] = 0.
    2. Push (0, 0, 0) into min-heap — (effort, row, col).
    3. While heap not empty:
       a. Pop minimum effort cell.
       b. If destination, return effort.
       c. For each 4-directional neighbor:
          - newEffort = max(effort, |height[row][col] - height[nr][nc|)
          - If newEffort < dist[nr][nc], update and push.

  Time Complexity:  O(rows * cols * log(rows * cols))
  Space Complexity: O(rows * cols)

  Dry Run:
    heights = [[1,2,2],[3,8,2],[5,3,5]]

    dist = [[0,∞,∞],
            [∞,∞,∞],
            [∞,∞,∞]]

    PQ = [(0, 0, 0)]  — (effort=0, row=0, col=0)

    Pop (0, 0, 0):
      → (0,1): effort=max(0,|1-2|)=1, dist[0][1]=∞ → update=1, push(1,0,1)
      → (1,0): effort=max(0,|1-3|)=2, dist[1][0]=∞ → update=2, push(2,1,0)
    PQ = [(1,0,1), (2,1,0)]

    Pop (1, 0, 1):
      → (0,0): effort=max(1,1)=1, dist[0][0]=0 → skip
      → (0,2): effort=max(1,|2-2|)=1, dist[0][2]=∞ → update=1, push(1,0,2)
      → (1,1): effort=max(1,|2-8|)=6, dist[1][1]=∞ → update=6, push(6,1,1)
    PQ = [(1,0,2), (2,1,0), (6,1,1)]

    Pop (1, 0, 2):
      → (0,1): max(1,0)=1, dist=1 → skip
      → (1,2): max(1,|2-2|)=1, dist[1][2]=∞ → update=1, push(1,1,2)
    PQ = [(1,1,2), (2,1,0), (6,1,1)]

    Pop (1, 1, 2):
      → (0,2): max(1,0)=1, dist=1 → skip
      → (2,2): max(1,|2-5|)=3, dist[2][2]=∞ → update=3, push(3,2,2)
      → (1,1): max(1,6)=6, dist=6 → skip
    PQ = [(2,1,0), (3,2,2), (6,1,1)]

    Pop (2, 1, 0):
      → (0,0): max(2,2)=2, dist=0 → skip
      → (2,0): max(2,|3-5|)=2, dist[2][0]=∞ → update=2, push(2,2,0)
      → (1,1): max(2,|3-8|)=5, dist=6 → update=5, push(5,1,1)
    PQ = [(2,2,0), (3,2,2), (5,1,1), (6,1,1)]

    Pop (2, 2, 0):
      → (1,0): max(2,2)=2, dist=2 → skip
      → (2,1): max(2,|5-3|)=2, dist[2][1]=∞ → update=2, push(2,2,1)
    PQ = [(2,2,1), (3,2,2), (5,1,1), (6,1,1)]

    Pop (2, 2, 1):
      → (2,0): max(2,2)=2, dist=2 → skip
      → (2,2): max(2,|3-5|)=2, dist=3 → update=2, push(2,2,2)
      → (1,1): max(2,|3-8|)=5, dist=5 → skip
    PQ = [(2,2,2), (3,2,2), (5,1,1), (6,1,1)]

    Pop (2, 2, 2): → row=2, col=2 = DESTINATION! Return effort = 2 ✓

=============================================================================
*/

function minimumEffortPath(heights) {
    let rows = heights.length, cols = heights[0].length;
    let directions = [[0,1],[0,-1],[1,0],[-1,0]];

    // Distance matrix — minimum "max effort" to reach each cell
    let dist = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
    dist[0][0] = 0;

    // Min-heap: [effort, row, col]
    let pq = [[0, 0, 0]];

    while (pq.length > 0) {
        // Extract minimum effort
        pq.sort((a, b) => a[0] - b[0]);
        let [effort, row, col] = pq.shift();

        // Reached destination — return the effort
        if (row === rows - 1 && col === cols - 1) return effort;

        // Skip stale entries
        if (effort > dist[row][col]) continue;

        // Explore 4 directions
        for (let [dr, dc] of directions) {
            let nr = row + dr, nc = col + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                // New effort = max of current path effort and this edge's difference
                let newEffort = Math.max(effort, Math.abs(heights[row][col] - heights[nr][nc]));

                // If we found a path with less effort to (nr, nc)
                if (newEffort < dist[nr][nc]) {
                    dist[nr][nc] = newEffort;
                    pq.push([newEffort, nr, nc]);
                }
            }
        }
    }

    return 0;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. This is a "minimax path" problem — minimize the maximum edge weight.
  2. Modified Dijkstra: replace dist[u] + wt with max(dist[u], wt).
  3. Binary Search + BFS is an alternative: search on answer, verify with BFS.
  4. The greedy property of Dijkstra still holds because we're minimizing
     the max, and a min-heap ensures we process paths with smaller max first.
  5. Union-Find (sort edges, union until start and end are connected) also works.

  Comparison:
    - Dijkstra: O(N*M * log(N*M)) — most intuitive for graph problems
    - Binary Search + BFS: O(N*M * log(maxDiff)) — good when answer space is small
    - Brute Force DFS: Exponential — only for very small grids

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let h1 = [[1,2,2],[3,8,2],[5,3,5]];
    console.log("Brute:", minimumEffortBrute(h1));          // Output: 2
    console.log("Binary Search:", minimumEffortBinarySearch(h1)); // Output: 2
    console.log("Dijkstra:", minimumEffortPath(h1));         // Output: 2

    let h2 = [[1,2,3],[3,8,4],[5,3,5]];
    console.log("Dijkstra:", minimumEffortPath(h2));         // Output: 1

    let h3 = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]];
    console.log("Dijkstra:", minimumEffortPath(h3));         // Output: 0
}

test();
