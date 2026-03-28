/*
=============================================================================
  QUESTION: 3742. Maximum Path Score in a Grid (LeetCode)
=============================================================================

  m×n grid, cells contain 0, 1, or 2. Move only right or down.
  Score/cost per cell value:
    0 → score 0, cost 0
    1 → score 1, cost 1
    2 → score 2, cost 1

  Return max score without exceeding total cost k. Return -1 if impossible.

  Example: grid=[[0,1],[2,0]], k=1 → 2
    Path: (0,0)→(1,0)→(1,1) = 0+2+0 = score 2, cost 1 ≤ k ✓

=============================================================================
  PATTERN: Grid DP with 3D State (row, col, remaining cost)
=============================================================================

  solve(i, j, cost) = max score from (i,j) to (m-1,n-1) with cost spent so far.

  At each cell, compute score/cost, then try right and down.
  If cost exceeds budget → invalid path (-1).

=============================================================================
  APPROACH: Memoization — O(M×N×K) Time, O(M×N×K) Space
=============================================================================
*/

function maxPathScore(grid, k) {
    let m = grid.length, n = grid[0].length;
    let dp = new Map();

    function solve(i, j, cost) {
        if (i >= m || j >= n) return -1;

        // Compute this cell's score & cost
        let cell = grid[i][j];
        let addScore = cell;           // 0→0, 1→1, 2→2
        let addCost = cell > 0 ? 1 : 0; // 0→0, 1→1, 2→1

        let newCost = cost + addCost;
        if (newCost > k) return -1;  // exceeded budget

        // Reached destination
        if (i === m - 1 && j === n - 1) return addScore;

        let key = `${i},${j},${newCost}`;
        if (dp.has(key)) return dp.get(key);

        // Try right and down
        let right = solve(i, j + 1, newCost);
        let down = solve(i + 1, j, newCost);
        let best = Math.max(right, down);

        // If no valid path exists from here
        let result = best === -1 ? -1 : addScore + best;
        dp.set(key, result);
        return result;
    }

    return solve(0, 0, 0);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(maxPathScore([[0, 1], [2, 0]], 1));   // 2
console.log(maxPathScore([[0, 1], [1, 2]], 1));   // -1
