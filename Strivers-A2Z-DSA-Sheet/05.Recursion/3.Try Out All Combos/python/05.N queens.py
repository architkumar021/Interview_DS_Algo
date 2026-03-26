"""
=============================================================================
  QUESTION: 51. N-Queens (LeetCode)
=============================================================================

  Place n queens on n×n board, no two attack each other.
  Queens attack: same row, column, diagonal.

  APPROACH: Backtracking — column by column.
  Track: row_set, upper diagonal (row-col), lower diagonal (row+col).
  All cells on same ↘ diagonal have same (row-col).
  All cells on same ↗ diagonal have same (row+col).

  DRY RUN n=4:
    Col 0: Q at (1,0) → Col 1: Q at (3,1) → Col 2: Q at (0,2)
    → Col 3: Q at (2,3) → PUSH [".Q..","...Q","Q...","..Q."] ✓

  Time: O(N!), Space: O(N²)
=============================================================================
"""


def solve(col, n, board, ans, row_set, upper_diag, lower_diag):
    if col == n:
        ans.append(["".join(r) for r in board])
        return

    for row in range(n):
        if row not in row_set and (row - col) not in upper_diag and (row + col) not in lower_diag:
            # Place queen
            row_set.add(row)
            upper_diag.add(row - col)
            lower_diag.add(row + col)
            board[row][col] = 'Q'

            solve(col + 1, n, board, ans, row_set, upper_diag, lower_diag)

            # Backtrack
            board[row][col] = '.'
            row_set.remove(row)
            upper_diag.remove(row - col)
            lower_diag.remove(row + col)


def solve_n_queens(n):
    ans = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    solve(0, n, board, ans, set(), set(), set())
    return ans


# Driver Code
if __name__ == "__main__":
    for sol in solve_n_queens(4):
        for row in sol:
            print(row)
        print()

