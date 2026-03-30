"""
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

    Robot1 (Alice): follows best path from (0,0)
    Robot2 (Bob):   follows best path from (0,cols-1)
    Answer: 24

=============================================================================
  PATTERN: 3D DP — Two Players Moving Together
=============================================================================

  Key Insight: Move both robots TOGETHER row by row.

  State: (row, col1, col2)
    - row  = current row (both robots are always on the same row)
    - col1 = Alice's column
    - col2 = Bob's column

  From each state, Alice can go to (col1-1, col1, col1+1) and
  Bob can go to (col2-1, col2, col2+1). So 3 × 3 = 9 combinations.

  Cherries collected at (row, col1, col2):
    - If col1 == col2 → grid[row][col1]          (same cell, count once)
    - Else            → grid[row][col1] + grid[row][col2]

  Recurrence:
    solve(row, c1, c2) = cherries(row, c1, c2)
                        + max over all 9 (dc1, dc2) of
                          solve(row+1, c1+dc1, c2+dc2)

  Base: row == rows → 0
  Out of bounds: col < 0 or col >= cols → -infinity

  Answer: solve(0, 0, cols-1)

  Time:  O(rows × cols² × 9) = O(rows × cols²)
  Space: O(rows × cols²)

=============================================================================
  DRY RUN: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
  rows=4, cols=3
=============================================================================

  solve(0, 0, 2):
    cherries = grid[0][0] + grid[0][2] = 3 + 1 = 4

    9 children at row=1:
      solve(1, 0, 1): cherries = 2+5 = 7
      solve(1, 0, 2): cherries = 2+1 = 3
      solve(1, 1, 1): cherries = 5   (overlap)
      solve(1, 1, 2): cherries = 5+1 = 6
      ... (some out of bounds like col=-1)

    Best total from row 1 onward = 20
    dp[0][0][2] = 4 + 20 = 24

  Row-by-row for one optimal path:
    Row 0: Alice=0, Bob=2 → 3+1 = 4
    Row 1: Alice=0, Bob=1 → 2+5 = 7
    Row 2: Alice=1, Bob=2 → 5+5 = 10
    Row 3: Alice=0, Bob=1 → 2+1 = 3
    Total: 4+7+10+3 = 24 ✓

=============================================================================
  APPROACH 1: Recursion (Brute Force) — O(9^rows) Time, O(rows) Space
=============================================================================

  Try all 9 combinations at each row. Exponential — too slow.
=============================================================================
"""

import sys
sys.setrecursionlimit(100000)


def cherry_pickup_brute(grid):
    rows, cols = len(grid), len(grid[0])
    directions = [-1, 0, 1]

    def solve(row, col1, col2):
        # Out of bounds
        if col1 < 0 or col1 >= cols or col2 < 0 or col2 >= cols:
            return float('-inf')
        # Base: no more rows
        if row == rows:
            return 0

        # Cherries at current position
        if col1 == col2:
            cherries = grid[row][col1]              # same cell → count once
        else:
            cherries = grid[row][col1] + grid[row][col2]

        # Try all 9 combinations
        max_next = float('-inf')
        for dc1 in directions:
            for dc2 in directions:
                max_next = max(max_next, solve(row + 1, col1 + dc1, col2 + dc2))

        return cherries + max_next

    return solve(0, 0, cols - 1)


"""
=============================================================================
  APPROACH 2: Memoization (Top-Down) — O(rows × cols²) Time, O(rows × cols²) Space
=============================================================================

  Same recursion but cache dp[row][col1][col2].

  Dry Run: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]

    solve(0, 0, 2) = 4 + max of 9 children
      solve(1, 0, 1) = 7 + max of children at row 2
        solve(2, 1, 2) = 10 + max of children at row 3
          solve(3, 0, 1) = 3, solve(3, 1, 2) = 2, ...
          best child = 3
        dp[2][1][2] = 13
      dp[1][0][1] = 7 + 13 = 20
    dp[0][0][2] = 4 + 20 = 24 ✓

=============================================================================
"""


def cherry_pickup_memo(grid):
    rows, cols = len(grid), len(grid[0])
    directions = [-1, 0, 1]
    dp = [[[-1] * cols for _ in range(cols)] for _ in range(rows)]

    def solve(row, col1, col2):
        # Out of bounds
        if col1 < 0 or col1 >= cols or col2 < 0 or col2 >= cols:
            return float('-inf')
        # Base
        if row == rows:
            return 0
        # Already computed
        if dp[row][col1][col2] != -1:
            return dp[row][col1][col2]

        # Cherries at current position
        if col1 == col2:
            cherries = grid[row][col1]
        else:
            cherries = grid[row][col1] + grid[row][col2]

        # Try all 9 combinations
        max_next = float('-inf')
        for dc1 in directions:
            for dc2 in directions:
                max_next = max(max_next, solve(row + 1, col1 + dc1, col2 + dc2))

        dp[row][col1][col2] = cherries + max_next
        return dp[row][col1][col2]

    return solve(0, 0, cols - 1)


"""
=============================================================================
  APPROACH 3: Tabulation (Bottom-Up) — O(rows × cols²) Time, O(rows × cols²) Space
=============================================================================

  Build dp table from LAST row to FIRST row.
  dp[row][col1][col2] = max cherries from (row, col1, col2) to last row.

  Steps:
    1. Last row: dp[rows-1][c1][c2] = grid value(s) at c1 and c2.
    2. For row from rows-2 down to 0:
       - For each (c1, c2), compute cherries + best of 9 children from dp[row+1].
    3. Answer = dp[0][0][cols-1].

  Dry Run: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]

  --- Row 3 (base) ---
    dp[3][0][0]=2  dp[3][0][1]=3  dp[3][0][2]=3
    dp[3][1][0]=3  dp[3][1][1]=1  dp[3][1][2]=2
    dp[3][2][0]=3  dp[3][2][1]=2  dp[3][2][2]=1

  --- Row 2 ---
    dp[2][0][1] = (1+5) + max(dp[3] children) = 6 + 3 = 9
    dp[2][1][2] = (5+5) + max(dp[3] children) = 10 + 3 = 13
    ... etc.

  --- Row 1 ---
    dp[1][0][1] = (2+5) + max(dp[2] children) = 7 + 13 = 20
    ... etc.

  --- Row 0 ---
    dp[0][0][2] = (3+1) + max(dp[1] children) = 4 + 20 = 24 ✓

=============================================================================
"""


def cherry_pickup_tab(grid):
    rows, cols = len(grid), len(grid[0])
    directions = [-1, 0, 1]

    # 3D dp table
    dp = [[[0] * cols for _ in range(cols)] for _ in range(rows)]

    # Base case: last row
    for c1 in range(cols):
        for c2 in range(cols):
            if c1 == c2:
                dp[rows - 1][c1][c2] = grid[rows - 1][c1]
            else:
                dp[rows - 1][c1][c2] = grid[rows - 1][c1] + grid[rows - 1][c2]

    # Fill from second-last row up to row 0
    for row in range(rows - 2, -1, -1):
        for c1 in range(cols):
            for c2 in range(cols):
                # Cherries at current position
                if c1 == c2:
                    cherries = grid[row][c1]
                else:
                    cherries = grid[row][c1] + grid[row][c2]

                # Best of 9 child states
                max_next = float('-inf')
                for dc1 in directions:
                    for dc2 in directions:
                        nc1, nc2 = c1 + dc1, c2 + dc2
                        if 0 <= nc1 < cols and 0 <= nc2 < cols:
                            max_next = max(max_next, dp[row + 1][nc1][nc2])

                dp[row][c1][c2] = cherries + max_next

    return dp[0][0][cols - 1]


"""
=============================================================================
  APPROACH 4: Space Optimized — O(rows × cols²) Time, O(cols²) Space
=============================================================================

  dp[row] only depends on dp[row+1].
  Keep two 2D layers: "nxt" (row+1) and "curr" (row).

  Steps:
    1. Fill "nxt" for last row.
    2. For each row from rows-2 to 0:
       - Compute "curr" using "nxt".
       - Set nxt = curr.
    3. Answer = nxt[0][cols-1].

  Dry Run: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]

    nxt (row 3):
      [0][0]=2  [0][1]=3  [0][2]=3
      [1][0]=3  [1][1]=1  [1][2]=2
      [2][0]=3  [2][1]=2  [2][2]=1

    Process row 2 → curr:
      [1][2] = 10 + 3 = 13, etc.
    nxt = curr

    Process row 1 → curr:
      [0][1] = 7 + 13 = 20, etc.
    nxt = curr

    Process row 0 → curr:
      [0][2] = 4 + 20 = 24
    nxt = curr

    Answer: nxt[0][2] = 24 ✓

=============================================================================
"""


def cherry_pickup(grid):
    rows, cols = len(grid), len(grid[0])
    directions = [-1, 0, 1]

    # Initialize "nxt" layer for last row
    nxt = [[0] * cols for _ in range(cols)]
    for c1 in range(cols):
        for c2 in range(cols):
            if c1 == c2:
                nxt[c1][c2] = grid[rows - 1][c1]
            else:
                nxt[c1][c2] = grid[rows - 1][c1] + grid[rows - 1][c2]

    # Process each row from second-last to first
    for row in range(rows - 2, -1, -1):
        curr = [[0] * cols for _ in range(cols)]

        for c1 in range(cols):
            for c2 in range(cols):
                # Cherries at current position
                if c1 == c2:
                    cherries = grid[row][c1]
                else:
                    cherries = grid[row][c1] + grid[row][c2]

                # Best of 9 child states
                max_next = float('-inf')
                for dc1 in directions:
                    for dc2 in directions:
                        nc1, nc2 = c1 + dc1, c2 + dc2
                        if 0 <= nc1 < cols and 0 <= nc2 < cols:
                            max_next = max(max_next, nxt[nc1][nc2])

                curr[c1][c2] = cherries + max_next

        nxt = curr  # shift: current becomes next for the row above

    return nxt[0][cols - 1]


# ==========================================================================
# DRIVER CODE
# ==========================================================================

if __name__ == "__main__":
    grid1 = [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]
    print("Brute Force:", cherry_pickup_brute(grid1))   # 24
    print("Memoization:", cherry_pickup_memo(grid1))     # 24
    print("Tabulation:", cherry_pickup_tab(grid1))       # 24
    print("Space Opt:", cherry_pickup(grid1))             # 24

    grid2 = [[1, 0, 0, 0, 0, 0, 1],
             [2, 0, 0, 0, 0, 3, 0],
             [2, 0, 9, 0, 0, 0, 0],
             [0, 3, 0, 5, 4, 0, 0],
             [1, 0, 2, 3, 0, 0, 6]]
    print("Brute Force:", cherry_pickup_brute(grid2))   # 28
    print("Memoization:", cherry_pickup_memo(grid2))     # 28
    print("Tabulation:", cherry_pickup_tab(grid2))       # 28
    print("Space Opt:", cherry_pickup(grid2))             # 28

