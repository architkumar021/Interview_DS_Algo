/*
=============================================================================
  QUESTION: 51. N-Queens (LeetCode)
=============================================================================

  Place n queens on n×n board so no two attack each other
  (same row, column, or diagonal).

  Example: n=4 → [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

=============================================================================
  APPROACH: Backtracking — Column by Column — O(N!) Time, O(N²) Space
=============================================================================

  Place queens one column at a time. For each column, try each row.

  O(1) attack check using hash maps:
  - rowMap[row]                → row taken?
  - upperDiag[row - col + n]  → upper-left diagonal taken?
    (all cells on same ↘ diagonal have same row-col value)
  - lowerDiag[row + col]      → lower-left diagonal taken?
    (all cells on same ↗ diagonal have same row+col value)

  Dry Run n=4:
    col 0: row 1 → col 1: row 3 → col 2: row 0 → col 3: row 2 → PUSH ✓
    col 0: row 2 → col 1: row 0 → col 2: row 3 → col 3: row 1 → PUSH ✓

=============================================================================
*/

function solveNQueens(n) {
    let result = [];
    let board = Array.from({ length: n }, () => new Array(n).fill('.'));
    let rowUsed = {}, upperDiag = {}, lowerDiag = {};

    function solve(col) {
        if (col === n) {
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let row = 0; row < n; row++) {
            if (rowUsed[row] || upperDiag[row - col + n] || lowerDiag[row + col])
                continue;

            // Place queen
            board[row][col] = 'Q';
            rowUsed[row] = upperDiag[row - col + n] = lowerDiag[row + col] = true;

            solve(col + 1);

            // Backtrack
            board[row][col] = '.';
            rowUsed[row] = upperDiag[row - col + n] = lowerDiag[row + col] = false;
        }
    }

    solve(0);
    return result;
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
