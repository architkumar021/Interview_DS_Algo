/*
=============================================================================
  QUESTION: 51. N-Queens (LeetCode)
=============================================================================

  Place n queens on n×n chessboard such that no two queens attack each other.
  Queens attack: same row, same column, same diagonal.

  Example: n=4 → [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

=============================================================================
  APPROACH: Backtracking — Column by Column
=============================================================================

  Place queens one column at a time. For each column, try each row.

  Three attack checks (using hash maps for O(1) lookup):
  1. rowMap[row] → is this row already taken?
  2. upperDiag[row - col + n] → is this upper-left diagonal taken?
  3. lowerDiag[row + col + n] → is this lower-left diagonal taken?

  Why (row - col) for upper diagonal?
  All cells on the same upper-left → lower-right diagonal have
  the same (row - col) value. We add +n to avoid negative indices.

  Why (row + col) for lower diagonal?
  All cells on the same lower-left → upper-right diagonal have
  the same (row + col) value.

  DRY RUN with n=4:
  ──────────────────
  Column 0: try rows 0,1,2,3
    row=0: safe → place Q at (0,0)
      Column 1: try rows
        row=0: rowMap blocked
        row=1: diagonal blocked (0-0+4=4, 1-1+4=4 clash)
        row=2: safe → place Q at (2,1)
          Column 2:
            row=0: diagonal clash
            row=1: diagonal clash
            row=2: row blocked
            row=3: diagonal clash → ALL FAIL → backtrack
        row=3: safe → place Q at (3,1)
          Column 2:
            row=1: safe → place Q at (1,2)
              Column 3:
                row 0,1,2,3 → ALL FAIL → backtrack
          ...backtrack
    row=1: safe → place Q at (1,0)
      Column 1:
        row=3: safe → place Q at (3,1)
          Column 2:
            row=0: safe → place Q at (0,2)
              Column 3:
                row=2: safe → place Q at (2,3)
                  col==4 → PUSH [".Q..","...Q","Q...","..Q."] ✓
    ...continue for second solution...

  Time Complexity:  O(N!) — at most N choices for first col, N-1 for second, etc.
  Space Complexity: O(N²) — board storage

=============================================================================
*/

function isValid(row, col, n, rowMap, upperDiag, lowerDiag) {
    // Check if this position is safe (no queen attacking)
    return !rowMap[row] && !upperDiag[row - col + n] && !lowerDiag[row + col + n];
}

function solve(col, n, board, ans, rowMap, upperDiag, lowerDiag) {
    // All columns filled → valid solution
    if (col === n) {
        ans.push(board.map(r => r.join('')));
        return;
    }

    // Try placing queen in each row of current column
    for (let row = 0; row < n; row++) {
        if (isValid(row, col, n, rowMap, upperDiag, lowerDiag)) {
            // Place queen and mark constraints
            rowMap[row] = true;
            upperDiag[row - col + n] = true;
            lowerDiag[row + col + n] = true;
            board[row][col] = 'Q';

            // Recurse for next column
            solve(col + 1, n, board, ans, rowMap, upperDiag, lowerDiag);

            // Backtrack — remove queen and unmark
            board[row][col] = '.';
            rowMap[row] = false;
            upperDiag[row - col + n] = false;
            lowerDiag[row + col + n] = false;
        }
    }
}

function solveNQueens(n) {
    let ans = [];
    let board = Array.from({ length: n }, () => new Array(n).fill('.'));
    let rowMap = {}, upperDiag = {}, lowerDiag = {};
    solve(0, n, board, ans, rowMap, upperDiag, lowerDiag);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let solutions = solveNQueens(4);
for (let sol of solutions) {
    console.log(sol);
    console.log("---");
}
// [".Q..","...Q","Q...","..Q."]
// ["..Q.","Q...","...Q",".Q.."]
