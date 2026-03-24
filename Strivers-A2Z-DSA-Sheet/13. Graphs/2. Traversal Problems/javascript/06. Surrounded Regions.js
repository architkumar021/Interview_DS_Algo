/*
===============================================
  130. Surrounded Regions (LeetCode Medium)
===============================================

Question:
Given an m x n matrix board containing 'X' and 'O',
capture all regions of 'O' that are 4-directionally
SURROUNDED by 'X', by flipping those 'O's to 'X's.

⚠️  Do it IN-PLACE. Do not return anything.

An 'O' on the BORDER (or connected to a border 'O')
can NEVER be surrounded → it stays 'O'.

Example:
  Input:               Output:
  X X X X              X X X X
  X O O X              X X X X    ← inner O's captured
  X X O X              X X X X
  X O X X              X O X X    ← border O stays

=== Key Insight: Think REVERSE ===
Instead of finding which O's are surrounded (hard),
find which O's are NOT surrounded (easy), then flip the rest.

An O is NOT surrounded if it is:
  1. On the border, OR
  2. Connected (4-directionally) to a border O.

=== In-Place 3-Step Algorithm ===
  Step 1: Mark safe O's directly on the board.
          Start from every border 'O', use DFS/BFS to change
          it and all connected O's to a temporary marker '#'.
          '#' means "this O is safe, don't capture it."

  Step 2: Final scan of the board:
          - 'O' → was NOT reached from border → CAPTURED → flip to 'X'
          - '#' → was safe → RESTORE back to 'O'
          - 'X' → stays 'X'

  No extra copy needed! We use the board itself as our visited tracker
  by using '#' as a third state.

=== Why '#' works as a marker? ===
After Step 1, the board has 3 types of cells:
  'X' → walls (unchanged)
  '#' → safe O's (border-connected)
  'O' → surrounded O's (never reached from border)

Step 2 simply converts '#' → 'O' and 'O' → 'X'.
*/


// ════════════════════════════════════════════
//  Solution 1: DFS Approach (In-Place)
// ════════════════════════════════════════════
/*
=== Algorithm ===
1. For every border cell that has 'O':
   - Run DFS on the board itself to change 'O' → '#' (safe marker).
2. Final scan:
   - 'O' → surrounded → flip to 'X'
   - '#' → safe → restore to 'O'

Time Complexity:  O(m × n) — each cell visited at most once.
Space Complexity: O(m × n) — recursion stack in worst case (all O's).
                  No extra matrix needed.
*/

function dfsMark(i, j, board) {
    // Out of bounds or not 'O' → stop
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== 'O') {
        return;
    }

    board[i][j] = '#';            // Mark safe directly on board
    dfsMark(i + 1, j, board);     // ↓ down
    dfsMark(i - 1, j, board);     // ↑ up
    dfsMark(i, j + 1, board);     // → right
    dfsMark(i, j - 1, board);     // ← left
}

function solveDFS(board) {
    let m = board.length;
    let n = board[0].length;

    // Step 1: DFS from all border O's → mark '#' on the board
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O') dfsMark(0, j, board);         // top row
        if (board[m - 1][j] === 'O') dfsMark(m - 1, j, board); // bottom row
    }
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') dfsMark(i, 0, board);         // left col
        if (board[i][n - 1] === 'O') dfsMark(i, n - 1, board); // right col
    }

    // Step 2: Final scan — capture 'O' → 'X', restore '#' → 'O'
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';      // surrounded → capture
            else if (board[i][j] === '#') board[i][j] = 'O';  // safe → restore
        }
    }
}


// ════════════════════════════════════════════
//  Solution 2: BFS Approach (In-Place)
// ════════════════════════════════════════════
/*
=== Algorithm ===
Same 3-step logic, but uses a queue instead of recursion.

1. Push ALL border O's into the queue, mark them '#' on the board.
2. BFS: For each cell in queue, check 4 neighbors.
   - If neighbor is 'O' → mark '#' on board, push to queue.
3. Final scan: 'O' → 'X', '#' → 'O'.

Time Complexity:  O(m × n)
Space Complexity: O(min(m, n)) — queue size (much less than m×n typically).
                  No extra matrix needed.
*/

function solveBFS(board) {
    let m = board.length;
    let n = board[0].length;
    let queue = [];

    // Step 1: Collect all border O's → mark '#' on board
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O') { board[0][j] = '#'; queue.push([0, j]); }
        if (board[m - 1][j] === 'O') { board[m - 1][j] = '#'; queue.push([m - 1, j]); }
    }
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') { board[i][0] = '#'; queue.push([i, 0]); }
        if (board[i][n - 1] === 'O') { board[i][n - 1] = '#'; queue.push([i, n - 1]); }
    }

    // Step 2: BFS — spread '#' to all connected O's on the board
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        let next = [];
        for (let [x, y] of queue) {
            for (let d = 0; d < 4; d++) {
                let nx = x + dr[d];
                let ny = y + dc[d];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && board[nx][ny] === 'O') {
                    board[nx][ny] = '#';
                    next.push([nx, ny]);
                }
            }
        }
        queue = next;
    }

    // Step 3: Final scan — capture 'O' → 'X', restore '#' → 'O'
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';      // surrounded → capture
            else if (board[i][j] === '#') board[i][j] = 'O';  // safe → restore
        }
    }
}


/*
═══════════════════════════════════════════════
  DRY RUN — Example 1 (DFS In-Place)
═══════════════════════════════════════════════

Input board (modified in-place):
    X  X  X  X
    X  O  O  X
    X  X  O  X
    X  O  X  X

── Step 1: DFS from border O's ──

  Scan top row (row 0):    X X X X → no O's
  Scan bottom row (row 3): X O X X → O at (3,1) ✅
  Scan left col (col 0):   X X X X → no O's
  Scan right col (col 3):  X X X X → no O's

  Only border O: (3,1)

  dfsMark(3, 1, board):
    board[3][1] = '#'     ← changed directly on board!

    Board now:
      X  X  X  X
      X  O  O  X
      X  X  O  X
      X  #  X  X

    Recurse neighbors of (3,1):
      ↓ (4,1) → out of bounds → return
      ↑ (2,1) → board[2][1] = 'X' ≠ 'O' → return
      → (3,2) → board[3][2] = 'X' ≠ 'O' → return
      ← (3,0) → board[3][0] = 'X' ≠ 'O' → return

  DFS ends. Only (3,1) changed to '#'.

  Board after Step 1:
      X  X  X  X
      X  O  O  X       ← inner O's were NOT reached → still 'O'
      X  X  O  X       ← this O was NOT reached → still 'O'
      X  #  X  X       ← border O → marked '#' (safe)

── Step 2: Final scan ──

  (0,0)='X' → stay     (0,1)='X' → stay     (0,2)='X' → stay     (0,3)='X' → stay
  (1,0)='X' → stay     (1,1)='O' → 'X' ⚡   (1,2)='O' → 'X' ⚡   (1,3)='X' → stay
  (2,0)='X' → stay     (2,1)='X' → stay     (2,2)='O' → 'X' ⚡   (2,3)='X' → stay
  (3,0)='X' → stay     (3,1)='#' → 'O' 🔄   (3,2)='X' → stay     (3,3)='X' → stay

  ⚡ = surrounded O captured (O → X)
  🔄 = safe O restored (# → O)

  Final board:
      X  X  X  X
      X  X  X  X       ← captured!
      X  X  X  X       ← captured!
      X  O  X  X       ← restored!

  Output: [["X","X","X","X"],
           ["X","X","X","X"],
           ["X","X","X","X"],
           ["X","O","X","X"]] ✅


═══════════════════════════════════════════════
  DRY RUN — Example 1 (BFS In-Place)
═══════════════════════════════════════════════

Same input:
    X  X  X  X
    X  O  O  X
    X  X  O  X
    X  O  X  X

── Step 1: Collect border O's ──
  (3,1) is 'O' → board[3][1] = '#', queue = [(3,1)]

  Board:
    X  X  X  X
    X  O  O  X
    X  X  O  X
    X  #  X  X

── Step 2: BFS from [(3,1)] ──

  Process (3,1):
    ↑ (2,1) → 'X' → skip
    ↓ (4,1) → out of bounds
    ← (3,0) → 'X' → skip
    → (3,2) → 'X' → skip

  next = [] → BFS ends. No other O's connected to border.

── Step 3: Final scan ──
  'O' at (1,1),(1,2),(2,2) → 'X'   (captured)
  '#' at (3,1) → 'O'                (restored)

  Same result as DFS ✅


═══════════════════════════════════════════════
  DRY RUN — Example 2 (Border-connected chain)
═══════════════════════════════════════════════

Input:
    X  O  X  X
    X  O  O  X
    X  X  O  X
    X  X  X  X

── Step 1: DFS from border O at (0,1) ──

  dfsMark(0,1, board):
    board[0][1] = '#'

    ↓ (1,1) → 'O' → dfsMark(1,1, board)

      board[1][1] = '#'
      ↓ (2,1) → 'X' → return
      ↑ (0,1) → '#' → return
      → (1,2) → 'O' → dfsMark(1,2, board)

        board[1][2] = '#'
        ↓ (2,2) → 'O' → dfsMark(2,2, board)

          board[2][2] = '#'
          ↓ (3,2) → 'X' → return
          ↑ (1,2) → '#' → return
          ← (2,1) → 'X' → return
          → (2,3) → 'X' → return

        ↑ (0,2) → 'X' → return
        ← (1,1) → '#' → return
        → (1,3) → 'X' → return

      ← (1,0) → 'X' → return

    ↑ (-1,1) → OOB
    ← (0,0) → 'X' → return
    → (0,2) → 'X' → return

  Board after Step 1:
    X  #  X  X
    X  #  #  X
    X  X  #  X
    X  X  X  X

── Step 2: Final scan ──
  No 'O' cells remain → nothing to capture!
  '#' at (0,1),(1,1),(1,2),(2,2) → restore to 'O'

  Final board = same as original input ✅

  Key insight: ALL O's were connected to border → NONE captured.


═══════════════════════════════════════════════
  DRY RUN — Example 3 (Multiple groups)
═══════════════════════════════════════════════

Input:
    O  X  X  O
    X  O  O  X
    X  O  O  X
    O  X  X  O

── Step 1: DFS from border O's ──
  Border O's: (0,0), (0,3), (3,0), (3,3)

  dfsMark(0,0): board[0][0]='#', neighbors are all X → done
  dfsMark(0,3): board[0][3]='#', neighbors are all X → done
  dfsMark(3,0): board[3][0]='#', neighbors are all X → done
  dfsMark(3,3): board[3][3]='#', neighbors are all X → done

  Board after Step 1:
    #  X  X  #
    X  O  O  X       ← inner 2×2 NOT connected to any border O
    X  O  O  X
    #  X  X  #

── Step 2: Final scan ──
  'O' at (1,1),(1,2),(2,1),(2,2) → 'X'  (captured!)
  '#' at corners → 'O'                   (restored!)

  Final board:
    O  X  X  O
    X  X  X  X       ← captured
    X  X  X  X       ← captured
    O  X  X  O

  Output: [["O","X","X","O"],["X","X","X","X"],["X","X","X","X"],["O","X","X","O"]] ✅


═══════════════════════════════════════════════
  DRY RUN — Example 4 (All O's — 2×2)
═══════════════════════════════════════════════

Input:
    O  O
    O  O

  Every cell is a border cell in a 2×2 grid.
  All 4 cells are border O's → all marked '#'.

  Board after Step 1: #  #
                       #  #

  Step 2: All '#' → restored to 'O'

  Output: [["O","O"],["O","O"]] ✅ (unchanged)


═══════════════════════════════════════════════
  DRY RUN — Example 5 (BFS with large connected safe region)
═══════════════════════════════════════════════

Input:
    X  X  X  X  X
    X  O  O  O  X
    X  O  X  O  X
    X  O  O  O  X
    X  X  X  O  X

── Step 1: BFS from border O's ──
  Only border O: (4,3) → board[4][3] = '#', queue = [(4,3)]

  BFS Level 1: (4,3) → ↑(3,3) is 'O' → '#'
  BFS Level 2: (3,3) → ↑(2,3) is 'O' → '#', ←(3,2) is 'O' → '#'
  BFS Level 3: (2,3) → ↑(1,3) is 'O' → '#'
               (3,2) → ↑(2,2) is 'X'→skip, ←(3,1) is 'O' → '#'
  BFS Level 4: (1,3) → ←(1,2) is 'O' → '#'
               (3,1) → ↑(2,1) is 'O' → '#', ←(3,0) is 'X'→skip
  BFS Level 5: (1,2) → ←(1,1) is 'O' → '#'
               (2,1) → ↑(1,1) already '#'

  Board after Step 1:
    X  X  X  X  X
    X  #  #  #  X
    X  #  X  #  X
    X  #  #  #  X
    X  X  X  #  X

  No 'O' cells remain → nothing to capture!

── Step 2: All '#' → 'O' ──
  Final board = same as input ✅

  Key insight: The entire O-region was connected to (4,3) on the border,
  so the whole ring of O's is safe.


=== Edge Cases ===
- All X's → nothing to mark, nothing to capture
- All O's → all border-connected → all safe
- Single row/column → every cell is a border cell → nothing captured
- 1×1 grid → single cell is border → stays as is
- O ring touching border → entire ring is safe
- O island completely enclosed → captured
*/


// ─── Helper: Deep copy board, run function, return result ───
function testWith(fn, board) {
    let copy = board.map(row => [...row]);
    fn(copy);
    return copy;
}


// ─── Driver Code ───
function runTests() {
    console.log("=== DFS Approach (In-Place) ===");

    // Test 1: Standard capture
    console.log("Test 1:", JSON.stringify(testWith(solveDFS,
        [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]
    )));
    // Expected: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

    // Test 2: Border-connected chain (nothing captured)
    console.log("Test 2:", JSON.stringify(testWith(solveDFS,
        [['X','O','X','X'],['X','O','O','X'],['X','X','O','X'],['X','X','X','X']]
    )));
    // Expected: [["X","O","X","X"],["X","O","O","X"],["X","X","O","X"],["X","X","X","X"]]

    // Test 3: Multiple groups (corners safe, inner captured)
    console.log("Test 3:", JSON.stringify(testWith(solveDFS,
        [['O','X','X','O'],['X','O','O','X'],['X','O','O','X'],['O','X','X','O']]
    )));
    // Expected: [["O","X","X","O"],["X","X","X","X"],["X","X","X","X"],["O","X","X","O"]]

    // Test 4: All O's (2×2, all border)
    console.log("Test 4:", JSON.stringify(testWith(solveDFS,
        [['O','O'],['O','O']]
    )));
    // Expected: [["O","O"],["O","O"]]

    // Test 5: All X's (nothing to do)
    console.log("Test 5:", JSON.stringify(testWith(solveDFS,
        [['X','X'],['X','X']]
    )));
    // Expected: [["X","X"],["X","X"]]

    // Test 6: Single row (all border cells)
    console.log("Test 6:", JSON.stringify(testWith(solveDFS,
        [['X','O','O','X','O']]
    )));
    // Expected: [["X","O","O","X","O"]]

    // Test 7: Large connected safe region via border
    console.log("Test 7:", JSON.stringify(testWith(solveDFS,
        [['X','X','X','X','X'],['X','O','O','O','X'],['X','O','X','O','X'],['X','O','O','O','X'],['X','X','X','O','X']]
    )));
    // Expected: [["X","X","X","X","X"],["X","O","O","O","X"],["X","O","X","O","X"],["X","O","O","O","X"],["X","X","X","O","X"]]

    console.log("\n=== BFS Approach (In-Place) ===");

    // Test 8: Standard capture
    console.log("Test 8:", JSON.stringify(testWith(solveBFS,
        [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]
    )));
    // Expected: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

    // Test 9: Border-connected chain
    console.log("Test 9:", JSON.stringify(testWith(solveBFS,
        [['X','O','X','X'],['X','O','O','X'],['X','X','O','X'],['X','X','X','X']]
    )));
    // Expected: [["X","O","X","X"],["X","O","O","X"],["X","X","O","X"],["X","X","X","X"]]

    // Test 10: Multiple groups
    console.log("Test 10:", JSON.stringify(testWith(solveBFS,
        [['O','X','X','O'],['X','O','O','X'],['X','O','O','X'],['O','X','X','O']]
    )));
    // Expected: [["O","X","X","O"],["X","X","X","X"],["X","X","X","X"],["O","X","X","O"]]

    // Test 11: Large connected safe region via border
    console.log("Test 11:", JSON.stringify(testWith(solveBFS,
        [['X','X','X','X','X'],['X','O','O','O','X'],['X','O','X','O','X'],['X','O','O','O','X'],['X','X','X','O','X']]
    )));
    // Expected: [["X","X","X","X","X"],["X","O","O","O","X"],["X","O","X","O","X"],["X","O","O","O","X"],["X","X","X","O","X"]]
}

runTests();

