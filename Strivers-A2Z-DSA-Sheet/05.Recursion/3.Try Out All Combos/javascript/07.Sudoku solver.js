/*
=============================================================================
  QUESTION: 37. Sudoku Solver (LeetCode)
=============================================================================

  Solve a Sudoku puzzle by filling empty cells ('.').
  Rules:
  - Each ROW must contain digits 1-9 exactly once
  - Each COLUMN must contain digits 1-9 exactly once
  - Each 3×3 SUB-BOX must contain digits 1-9 exactly once

=============================================================================
  APPROACH: Backtracking — Try Digits 1-9 for Each Empty Cell
=============================================================================

  1. Scan board left-to-right, top-to-bottom
  2. Find first empty cell ('.')
  3. Try each digit '1' to '9':
     a. Check if digit is VALID (not in same row, col, or 3×3 box)
     b. If valid → place digit, recurse to solve rest of board
     c. If recursion succeeds → return true (puzzle solved!)
     d. If fails → backtrack (reset to '.'), try next digit
  4. If no digit works → return false (triggers backtracking in parent)
  5. If no empty cell found → board is complete → return true

  isValid(row, col, digit):
  ─────────────────────────
  Check 3 things in a single loop (i from 0 to 8):
  - board[row][i] == digit → same ROW has this digit
  - board[i][col] == digit → same COLUMN has this digit
  - board[3*(row/3) + i/3][3*(col/3) + i%3] == digit → same 3×3 BOX

  The 3×3 box formula:
    3*(row/3) gives the starting row of the box (0, 3, or 6)
    3*(col/3) gives the starting col of the box (0, 3, or 6)
    i/3 and i%3 iterate through the 3×3 cells within the box

  DRY RUN (simplified — first few cells):
  ──────────────────────────────────────────
  Board starts with some filled cells. First empty cell found at (0,2).
  
  solve(board):
    Find (0,2) = '.'
    Try '1': isValid(0,2,'1')? Check row 0, col 2, box (0,0)→(2,2)
      If valid → place '1', solve remaining...
      If recursion returns true → done!
      If false → board[0][2] = '.', try '2'
    Try '2': ...
    ...until board is solved or all digits fail → backtrack

  KEY INSIGHT: When no digit works for a cell, we return false.
  This triggers the parent call to try the next digit for the
  PREVIOUS empty cell. This chain of backtracking explores all
  possibilities systematically.

  Time Complexity:  O(9^(empty cells)) — worst case try 9 digits per cell
  Space Complexity: O(81) ≈ O(1) — recursion depth ≤ 81 cells

=============================================================================
*/

function isValid(row, col, digit, board) {
    for (let i = 0; i < 9; i++) {
        // Check same row
        if (board[row][i] === digit) return false;

        // Check same column
        if (board[i][col] === digit) return false;

        // Check same 3×3 box
        let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === digit) return false;
    }
    return true;
}

function solve(board) {
    // Scan every cell
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') {
                // Try digits 1-9
                for (let d = 1; d <= 9; d++) {
                    let digit = String(d);
                    if (isValid(i, j, digit, board)) {
                        board[i][j] = digit;           // Place digit
                        if (solve(board)) return true;  // Recurse
                        board[i][j] = '.';             // Backtrack
                    }
                }
                // No digit works → trigger backtracking
                return false;
            }
        }
    }
    // All cells filled → puzzle solved!
    return true;
}

function solveSudoku(board) {
    solve(board);
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
