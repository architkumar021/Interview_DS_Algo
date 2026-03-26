"""
=============================================================================
  QUESTION: 79. Word Search (LeetCode)
=============================================================================

  Given m×n grid and word, return True if word exists in grid.
  Move up/down/left/right. Each cell used at most once per path.

  APPROACH: DFS Backtracking on Grid
  1. Find cells matching word[0], start DFS from each
  2. Mark visited ('!'), explore 4 directions, restore on backtrack
  3. All letters matched → return True

  DRY RUN word="SEE" on grid:
    A B C E
    S F C S
    A D E E
    Start (1,3)='S' → Down (2,3)='E' → Left (2,2)='E' → FOUND ✓

  Time: O(M × N × 4^L), Space: O(L)
=============================================================================
"""


def solve(board, word, i, j, idx):
    if idx == len(word):
        return True

    if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]) or board[i][j] != word[idx]:
        return False

    temp = board[i][j]
    board[i][j] = '!'  # Mark visited

    found = (solve(board, word, i - 1, j, idx + 1) or
             solve(board, word, i + 1, j, idx + 1) or
             solve(board, word, i, j - 1, idx + 1) or
             solve(board, word, i, j + 1, idx + 1))

    board[i][j] = temp  # Restore
    return found


def exist(board, word):
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == word[0] and solve(board, word, i, j, 0):
                return True
    return False


# Driver Code
if __name__ == "__main__":
    board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    print(exist(board, "ABCCED"))  # True
    print(exist(board, "SEE"))     # True
    print(exist(board, "ABCB"))    # False

