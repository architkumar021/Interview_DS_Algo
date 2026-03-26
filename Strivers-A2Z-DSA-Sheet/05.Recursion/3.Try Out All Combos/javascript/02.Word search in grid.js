/*
=============================================================================
  QUESTION: 79. Word Search (LeetCode)
=============================================================================

  Given m×n grid of characters and a string word, return true if word
  exists in the grid. Can move up, down, left, right. Each cell used
  at most once per path.

  Example: board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
  word="ABCCED" → true, word="SEE" → true, word="ABCB" → false

=============================================================================
  APPROACH: DFS Backtracking on Grid
=============================================================================

  1. Find starting cells: iterate grid to find cells matching word[0]
  2. From each start, DFS in 4 directions trying to match remaining letters
  3. Mark cell as visited (change to '!') to prevent re-use
  4. If all letters matched → return true
  5. Restore cell on backtrack (change back from '!')

  DRY RUN with board, word="SEE":
  ─────────────────────────────────
  Board:  A B C E
          S F C S
          A D E E

  Find 'S': at (1,0) and (1,3)

  Start at (1,0), mark '!', match 'S' ✓, look for 'E':
    Up (0,0)='A' ≠ 'E' → skip
    Down (2,0)='A' ≠ 'E' → skip
    Right (1,1)='F' ≠ 'E' → skip
    Left: out of bounds → skip
    No 'E' found from (1,0) → restore, try next start

  Start at (1,3), mark '!', match 'S' ✓, look for 'E':
    Up (0,3)='E' ✓ → mark '!', look for 'E':
      Up: out of bounds
      Left (0,2)='C' ≠ 'E' → skip
      Down (1,3)='!' (visited) → skip
      ...no 'E' → restore (0,3) to 'E', backtrack
    Down (2,3)='E' ✓ → mark '!', look for 'E':
      Up (1,3)='!' → skip
      Left (2,2)='E' ✓ → all letters matched → return true ✓

  Time Complexity:  O(M × N × 4^L) — L = word length
  Space Complexity: O(L) — recursion depth

=============================================================================
*/

function solve(board, word, i, j, idx) {
    // All letters matched
    if (idx === word.length) return true;

    // Out of bounds or character doesn't match
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[idx])
        return false;

    // Mark as visited
    let temp = board[i][j];
    board[i][j] = '!';

    // Explore all 4 directions
    let found = solve(board, word, i - 1, j, idx + 1) ||   // Up
                solve(board, word, i + 1, j, idx + 1) ||   // Down
                solve(board, word, i, j - 1, idx + 1) ||   // Left
                solve(board, word, i, j + 1, idx + 1);     // Right

    // Restore (backtrack)
    board[i][j] = temp;
    return found;
}

function exist(board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            // Only start DFS from cells matching first letter
            if (board[i][j] === word[0] && solve(board, word, i, j, 0))
                return true;
        }
    }
    return false;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
let board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(board, "ABCCED"));  // true
console.log(exist(board, "SEE"));     // true
console.log(exist(board, "ABCB"));    // false

