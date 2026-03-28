/*
=============================================================================
  QUESTION: 37. Sudoku Solver (LeetCode)
=============================================================================

  Fill empty cells ('.') so each row, column, and 3×3 box has digits 1-9
  exactly once.

=============================================================================
  APPROACH: Backtracking — Try 1-9 Per Cell — O(9^empty) Time, O(1) Space
=============================================================================

  Scan board for first '.'. Try digits 1-9:
  - If valid (not in same row, col, or 3×3 box) → place, recurse.
  - If recursion solves it → true. Else backtrack (reset to '.').
  - No digit works → return false (triggers parent backtrack).
  - No '.' found → board complete → true.

  isValid check (single loop i=0..8):
  - board[row][i] → same row       | board[i][col] → same column
  - board[boxRow + i/3][boxCol + i%3] → same 3×3 box
    where boxRow = 3*floor(row/3), boxCol = 3*floor(col/3)

=============================================================================
*/

function solveSudoku(board) {
    function isValid(row, col, digit) {
        let br = 3 * Math.floor(row / 3), bc = 3 * Math.floor(col / 3);
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === digit) return false;  // Row
            if (board[i][col] === digit) return false;  // Column
            if (board[br + Math.floor(i / 3)][bc + (i % 3)] === digit) return false;  // Box
        }
        return true;
    }

    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let d = 1; d <= 9; d++) {
                        let ch = String(d);
                        if (isValid(i, j, ch)) {
                            board[i][j] = ch;
                            if (solve()) return true;
                            board[i][j] = '.';  // Backtrack
                        }
                    }
                    return false;  // No digit works → backtrack
                }
            }
        }
        return true;  // All cells filled
    }

    solve();
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];
solveSudoku(board);
console.log("Solved Sudoku:");
board.forEach(row => console.log(row.join(' ')));
