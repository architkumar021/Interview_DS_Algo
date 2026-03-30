/*
=============================================================================
  QUESTION: 1463. Cherry Pickup II (LeetCode)
=============================================================================

  Given a rows × cols grid. Two robots start at top-left (0, 0) and
  top-right (0, cols-1). Both move DOWN one row at a time and can shift
  one column left, stay, or shift one column right.

  When a robot passes a cell, it collects all cherries. If both robots
  visit the same cell, only one collects.

  Goal: Maximize total cherries collected by BOTH robots.

  Example:
    grid = [[3,1,1],
            [2,5,1],
            [1,5,5],
            [2,1,1]]

    Robot1 (Alice): (0,0)→(1,1)→(2,1)→(3,0) picks 3+5+5+2 = 15
    Robot2 (Bob):   (0,2)→(1,2)→(2,2)→(3,2) picks 1+1+5+1 = 8
    No overlap → Total = 15 + 8 = 23 ✖ (not optimal)

    Optimal: Alice (0,0)→(1,0)→(2,1)→(3,1) = 3+2+5+1 = 11
             Bob   (0,2)→(1,2)→(2,2)→(3,2) = 1+1+5+1 = 8
    Hmm, let's check: answer = 24

    Actually optimal paths give 24. Key: both robots move simultaneously.

=============================================================================
  PATTERN: 3D DP — Two Players Moving Together
=============================================================================

  Key Insight: Move both robots TOGETHER row by row.

  State: (row, col1, col2)
    - row  = current row (both robots are always on the same row)
    - col1 = Alice's column
    - col2 = Bob's column

  From each state, Alice can go to (col1-1, col1, col1+1) and
  Bob can go to (col2-1, col2, col2+1). So 3 × 3 = 9 combinations
  for the next row.

  Cherries collected at (row, col1, col2):
    - If col1 == col2 → grid[row][col1]          (same cell, count once)
    - Else            → grid[row][col1] + grid[row][col2]

  Recurrence:
    solve(row, col1, col2) = cherries(row, col1, col2)
                            + max over all 9 (dc1, dc2) combos of
                              solve(row+1, col1+dc1, col2+dc2)

  Base case: row == rows → 0 (no more rows)
  Out of bounds: col1 or col2 < 0 or >= cols → -Infinity

  Answer: solve(0, 0, cols-1)

  Time: O(rows × cols × cols × 9) = O(rows × cols²)
  Space: O(rows × cols²) for memoization

=============================================================================
  DRY RUN: grid = [[1,0,0,0,0,0,1],
                    [2,0,0,0,0,3,0],
                    [2,0,9,0,0,0,0],
                    [0,3,0,5,4,0,0],
                    [1,0,2,3,0,0,6]]
=============================================================================

  rows=5, cols=7
  Alice starts at (0, 0), Bob starts at (0, 6)

  Row 0: Alice at col=0 picks 1, Bob at col=6 picks 1 → total = 2
  Row 1: Alice moves to col=1 picks 0, Bob moves to col=5 picks 3 → +3
  Row 2: Alice moves to col=2 picks 9, Bob moves to col=4 picks 0 → +9
  Row 3: Alice moves to col=3 picks 5, Bob moves to col=4 picks 4 → +9
  Row 4: Alice moves to col=3 picks 3, Bob moves to col=5 picks 0 → +3
  Total = 2 + 3 + 9 + 9 + 3 = 26 (close but not necessarily optimal)

  The DP explores ALL 9 combos per row and finds the true maximum = 28.

=============================================================================
  APPROACH 1: Recursion (Brute Force) — O(9^rows) Time, O(rows) Space
=============================================================================

  Try all 9 combinations at each row for both robots.
  Exponential — too slow for large inputs.

  Recursion Tree (partial) for 3×3 grid:
    solve(0, 0, 2)
    ├── solve(1, 0, 1)     ← Alice stays, Bob moves left
    │   ├── solve(2, 0, 0) ← both move left/stay
    │   ├── solve(2, 0, 1)
    │   ├── solve(2, 0, 2)
    │   ├── solve(2, 1, 0)
    │   └── ... (9 children)
    ├── solve(1, 0, 2)     ← Alice stays, Bob stays
    │   └── ... (9 children)
    ├── solve(1, 1, 1)     ← Alice right, Bob left (overlap!)
    │   └── ... (9 children)
    └── ... (9 children total)

  Many overlapping subproblems → needs memoization!

=============================================================================
*/

function cherryPickupBrute(grid) {
    let rows = grid.length;
    let cols = grid[0].length;

    // directions: left, stay, right
    let directions = [-1, 0, 1];

    function solve(row, col1, col2) {
        // Out of bounds
        if (col1 < 0 || col1 >= cols || col2 < 0 || col2 >= cols) {
            return -Infinity;
        }
        // Base: reached beyond last row
        if (row === rows) return 0;

        // Cherries collected at current position
        let cherries = 0;
        if (col1 === col2) {
            cherries = grid[row][col1];         // same cell → count once
        } else {
            cherries = grid[row][col1] + grid[row][col2];  // different cells
        }

        // Try all 9 combinations of moves
        let maxNext = -Infinity;
        for (let dc1 of directions) {
            for (let dc2 of directions) {
                let next = solve(row + 1, col1 + dc1, col2 + dc2);
                maxNext = Math.max(maxNext, next);
            }
        }

        return cherries + maxNext;
    }

    return solve(0, 0, cols - 1);
}

/*
=============================================================================
  APPROACH 2: Memoization (Top-Down) — O(rows × cols²) Time, O(rows × cols²) Space
=============================================================================

  Same recursion but cache results in dp[row][col1][col2].

  State count: rows × cols × cols
  Each state does 9 transitions → O(9 × rows × cols²) = O(rows × cols²)

  Dry Run: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
  rows=4, cols=3

    solve(0, 0, 2):
      cherries = grid[0][0] + grid[0][2] = 3 + 1 = 4

      9 children at row=1:
        solve(1, 0, 1): cherries = 2+5=7, explore row=2...
        solve(1, 0, 2): cherries = 2+1=3, explore row=2...
        solve(1, 1, 1): cherries = 5 (overlap), explore row=2...
        solve(1, 1, 2): cherries = 5+1=6, explore row=2...
        ... (some go out of bounds like col=-1)

      Best path found: 4 + 20 = 24

    Row-by-row breakdown for optimal:
      Row 0: Alice=0, Bob=2 → 3+1 = 4
      Row 1: Alice=0, Bob=1 → 2+5 = 7
      Row 2: Alice=0, Bob=1 → 1+5 = 6    OR  Alice=1, Bob=2 → 5+5 = 10
      Row 3: depends on row 2 choice...

    Final answer: 24 ✓

=============================================================================
*/

function cherryPickupMemo(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let directions = [-1, 0, 1];

    // 3D memo table: dp[row][col1][col2]
    let dp = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
            new Array(cols).fill(-1)
        )
    );

    function solve(row, col1, col2) {
        // Out of bounds
        if (col1 < 0 || col1 >= cols || col2 < 0 || col2 >= cols) {
            return -Infinity;
        }
        // Base: no more rows
        if (row === rows) return 0;
        // Already computed
        if (dp[row][col1][col2] !== -1) return dp[row][col1][col2];

        // Cherries at current position
        let cherries = 0;
        if (col1 === col2) {
            cherries = grid[row][col1];
        } else {
            cherries = grid[row][col1] + grid[row][col2];
        }

        // Try all 9 combinations
        let maxNext = -Infinity;
        for (let dc1 of directions) {
            for (let dc2 of directions) {
                let next = solve(row + 1, col1 + dc1, col2 + dc2);
                maxNext = Math.max(maxNext, next);
            }
        }

        dp[row][col1][col2] = cherries + maxNext;
        return dp[row][col1][col2];
    }

    return solve(0, 0, cols - 1);
}

/*
=============================================================================
  APPROACH 3: Tabulation (Bottom-Up) — O(rows × cols²) Time, O(rows × cols²) Space
=============================================================================

  Build dp table from LAST row to FIRST row (bottom-up).
  dp[row][col1][col2] = max cherries from (row, col1, col2) to last row.

  Steps:
    1. Last row (base): fill dp[rows-1][col1][col2] for all valid col1, col2.
       - If col1 == col2 → grid[rows-1][col1]
       - Else → grid[rows-1][col1] + grid[rows-1][col2]
    2. For each row from rows-2 down to 0:
       - For each (col1, col2) pair:
         - Compute cherries at (row, col1, col2).
         - Try all 9 (dc1, dc2) combos, look up dp[row+1][col1+dc1][col2+dc2].
         - dp[row][col1][col2] = cherries + best of 9 children.
    3. Answer = dp[0][0][cols-1].

  Dry Run: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
  rows=4, cols=3

  --- Row 3 (base) ---
    dp[3][0][0] = 2           (overlap)
    dp[3][0][1] = 2+1 = 3
    dp[3][0][2] = 2+1 = 3
    dp[3][1][0] = 1+2 = 3
    dp[3][1][1] = 1           (overlap)
    dp[3][1][2] = 1+1 = 2
    dp[3][2][0] = 1+2 = 3
    dp[3][2][1] = 1+1 = 2
    dp[3][2][2] = 1           (overlap)

  --- Row 2 ---
    dp[2][0][1]: cherries = 1+5 = 6
      Children at row 3: try all 9 combos
      Best child: dp[3][0][2]=3 or dp[3][1][2]=2 or dp[3][0][1]=3...
      max child = dp[3][1][2]=2 or dp[3][0][2]=3 → 3
      dp[2][0][1] = 6 + 3 = 9

    dp[2][0][2]: cherries = 1+5 = 6
      Best child = dp[3][0][2]=3 or dp[3][1][2]=2 → 3
      dp[2][0][2] = 6 + 3 = 9

    dp[2][1][2]: cherries = 5+5 = 10
      Best child from dp[3][0..2][1..cols]
      max child = dp[3][0][1]=3
      dp[2][1][2] = 10 + 3 = 13

    ... (computing all pairs)

  --- Row 1 ---
    dp[1][col1][col2] = cherries + max of dp[2] children

  --- Row 0 ---
    dp[0][0][2] = (3+1) + best from row 1 = 4 + 20 = 24

  Answer: dp[0][0][2] = 24 ✓

=============================================================================
*/

function cherryPickupTab(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let directions = [-1, 0, 1];

    // 3D dp table
    let dp = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
            new Array(cols).fill(0)
        )
    );

    // Base case: last row
    for (let col1 = 0; col1 < cols; col1++) {
        for (let col2 = 0; col2 < cols; col2++) {
            if (col1 === col2) {
                dp[rows - 1][col1][col2] = grid[rows - 1][col1];
            } else {
                dp[rows - 1][col1][col2] = grid[rows - 1][col1] + grid[rows - 1][col2];
            }
        }
    }

    // Fill from second-last row up to row 0
    for (let row = rows - 2; row >= 0; row--) {
        for (let col1 = 0; col1 < cols; col1++) {
            for (let col2 = 0; col2 < cols; col2++) {
                // Cherries at current position
                let cherries = 0;
                if (col1 === col2) {
                    cherries = grid[row][col1];
                } else {
                    cherries = grid[row][col1] + grid[row][col2];
                }

                // Try all 9 combinations of next moves
                let maxNext = -Infinity;
                for (let dc1 of directions) {
                    for (let dc2 of directions) {
                        let newCol1 = col1 + dc1;
                        let newCol2 = col2 + dc2;
                        if (newCol1 >= 0 && newCol1 < cols && newCol2 >= 0 && newCol2 < cols) {
                            maxNext = Math.max(maxNext, dp[row + 1][newCol1][newCol2]);
                        }
                    }
                }

                dp[row][col1][col2] = cherries + maxNext;
            }
        }
    }

    return dp[0][0][cols - 1];
}

/*
=============================================================================
  APPROACH 4: Space Optimized — O(rows × cols²) Time, O(cols²) Space
=============================================================================

  Observation: dp[row] only depends on dp[row+1].
  So we only need TWO 2D layers: "next" (row+1) and "curr" (row).

  Process:
    1. Fill "next" for last row (base case).
    2. For each row from rows-2 to 0:
       - Create fresh "curr" 2D array.
       - For each (col1, col2), compute using "next".
       - Set next = curr after processing the row.
    3. Answer = next[0][cols-1].

  Space: O(cols²) instead of O(rows × cols²).

  Dry Run: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]

    next (row 3):
      [0][0]=2  [0][1]=3  [0][2]=3
      [1][0]=3  [1][1]=1  [1][2]=2
      [2][0]=3  [2][1]=2  [2][2]=1

    Process row 2 → curr:
      [0][0]=1+max(...)  [0][1]=6+3=9  [0][2]=6+3=9
      [1][0]=...         [1][1]=...    [1][2]=10+3=13
      [2][0]=...         [2][1]=...    [2][2]=5+3=8
    next = curr

    Process row 1 → curr:
      ... (9 lookups each cell)
    next = curr

    Process row 0 → curr:
      [0][2] = 4 + 20 = 24
    next = curr

    Answer: next[0][2] = 24 ✓

=============================================================================
*/

function cherryPickup(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let directions = [-1, 0, 1];

    // Initialize "next" layer for last row
    let next = Array.from({ length: cols }, () => new Array(cols).fill(0));
    for (let col1 = 0; col1 < cols; col1++) {
        for (let col2 = 0; col2 < cols; col2++) {
            if (col1 === col2) {
                next[col1][col2] = grid[rows - 1][col1];
            } else {
                next[col1][col2] = grid[rows - 1][col1] + grid[rows - 1][col2];
            }
        }
    }

    // Process each row from second-last to first
    for (let row = rows - 2; row >= 0; row--) {
        let curr = Array.from({ length: cols }, () => new Array(cols).fill(0));

        for (let col1 = 0; col1 < cols; col1++) {
            for (let col2 = 0; col2 < cols; col2++) {
                // Cherries at current position
                let cherries = 0;
                if (col1 === col2) {
                    cherries = grid[row][col1];
                } else {
                    cherries = grid[row][col1] + grid[row][col2];
                }

                // Best of 9 child states
                let maxNext = -Infinity;
                for (let dc1 of directions) {
                    for (let dc2 of directions) {
                        let newCol1 = col1 + dc1;
                        let newCol2 = col2 + dc2;
                        if (newCol1 >= 0 && newCol1 < cols && newCol2 >= 0 && newCol2 < cols) {
                            maxNext = Math.max(maxNext, next[newCol1][newCol2]);
                        }
                    }
                }

                curr[col1][col2] = cherries + maxNext;
            }
        }

        next = curr;    // shift: current becomes next for the row above
    }

    return next[0][cols - 1];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================

let grid1 = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]];
console.log("Brute Force:", cherryPickupBrute(grid1));   // 24
console.log("Memoization:", cherryPickupMemo(grid1));     // 24
console.log("Tabulation:", cherryPickupTab(grid1));       // 24
console.log("Space Opt:", cherryPickup(grid1));            // 24

let grid2 = [[1,0,0,0,0,0,1],
              [2,0,0,0,0,3,0],
              [2,0,9,0,0,0,0],
              [0,3,0,5,4,0,0],
              [1,0,2,3,0,0,6]];
console.log("Brute Force:", cherryPickupBrute(grid2));   // 28
console.log("Memoization:", cherryPickupMemo(grid2));     // 28
console.log("Tabulation:", cherryPickupTab(grid2));       // 28
console.log("Space Opt:", cherryPickup(grid2));            // 28

