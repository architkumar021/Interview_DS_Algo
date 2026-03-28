/*
=============================================================================
  QUESTION: 79. Word Search (LeetCode)
=============================================================================

  Given m×n grid and a word, return true if word exists in grid.
  Move up/down/left/right. Each cell used at most once per path.

  Example: board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    "ABCCED" → true, "SEE" → true, "ABCB" → false

=============================================================================
  APPROACH: DFS Backtracking — O(M × N × 4^L) Time, O(L) Space
=============================================================================

  1. Find cells matching word[0] → start DFS from each
  2. At each cell: mark visited ('!'), try 4 directions for next letter
  3. If all letters matched → true. Restore cell on backtrack.

  Dry Run "SEE":
    Start (1,3)='S' ✓ → down (2,3)='E' ✓ → left (2,2)='E' ✓ → all matched → true ✓

=============================================================================
*/

function exist(board, word) {
    let rows = board.length, cols = board[0].length;

    function dfs(i, j, idx) {
        if (idx === word.length) return true;
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[idx])
            return false;

        let temp = board[i][j];
        board[i][j] = '!';  // Mark visited

        let found = dfs(i - 1, j, idx + 1) || dfs(i + 1, j, idx + 1) ||
                    dfs(i, j - 1, idx + 1) || dfs(i, j + 1, idx + 1);

        board[i][j] = temp;  // Restore
        return found;
    }

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            if (board[i][j] === word[0] && dfs(i, j, 0)) return true;

    return false;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(board, "ABCCED"));  // true
console.log(exist(board, "SEE"));     // true
console.log(exist(board, "ABCB"));    // false

