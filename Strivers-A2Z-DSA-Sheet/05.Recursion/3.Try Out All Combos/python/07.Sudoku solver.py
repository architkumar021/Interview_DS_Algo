"""
=============================================================================
  QUESTION: 37. Sudoku Solver (LeetCode)
=============================================================================

  Fill empty cells ('.') so each row, column, and 3×3 box has digits 1-9.

  APPROACH: Backtracking — try digits 1-9 for each empty cell.
  1. Find first empty cell
  2. Try '1'-'9': if valid → place, recurse → if success return True
  3. If no digit works → return False (triggers backtracking)
  4. No empty cell left → solved!

  isValid check (single loop i=0..8):
  - board[row][i] → same row
  - board[i][col] → same column
  - board[3*(row//3)+i//3][3*(col//3)+i%3] → same 3×3 box

  3×3 box formula: 3*(row//3) = box start row (0,3,6)
                   i//3 and i%3 iterate within the 3×3 box

  KEY: When no digit works → return False → parent tries next digit
  for PREVIOUS cell. This chain explores all possibilities.

  Time: O(9^(empty cells)), Space: O(81) ≈ O(1)
=============================================================================
"""


def is_valid(row, col, digit, board):
    for i in range(9):
        if board[row][i] == digit:
            return False
        if board[i][col] == digit:
            return False
        if board[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == digit:
            return False
    return True


def solve(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == '.':
                for d in range(1, 10):
                    digit = str(d)
                    if is_valid(i, j, digit, board):
                        board[i][j] = digit
                        if solve(board):
                            return True
                        board[i][j] = '.'  # Backtrack
                return False  # No valid digit → backtrack
    return True  # All cells filled


def solve_sudoku(board):
    solve(board)


# Driver Code
if __name__ == "__main__":
    board = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ]
    solve_sudoku(board)
    for row in board:
        print(" ".join(row))

