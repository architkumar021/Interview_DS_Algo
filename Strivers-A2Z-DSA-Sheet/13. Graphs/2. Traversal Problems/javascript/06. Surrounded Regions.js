/*
Question:
Given an m x n matrix board containing 'X' and 'O', capture all regions
that are 4-directionally surrounded by 'X' by flipping 'O's to 'X's.

Approach:
- DFS from all border 'O' cells and mark them as '#' (safe).
- Any remaining 'O' in the board is surrounded, so flip to 'X'.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

function dfs(i, j, vis) {
    if (i >= 0 && i < vis.length && j >= 0 && j < vis[0].length && vis[i][j] === 'O') {
        vis[i][j] = '#';
        dfs(i + 1, j, vis);
        dfs(i - 1, j, vis);
        dfs(i, j + 1, vis);
        dfs(i, j - 1, vis);
    }
}

function solve(board) {
    let m = board.length, n = board[0].length;
    let vis = board.map(row => [...row]);

    // Perform DFS from border cells
    for (let i = 0; i < n; i++) {
        if (vis[0][i] === 'O') dfs(0, i, vis);
        if (vis[m - 1][i] === 'O') dfs(m - 1, i, vis);
    }
    for (let i = 0; i < m; i++) {
        if (vis[i][0] === 'O') dfs(i, 0, vis);
        if (vis[i][n - 1] === 'O') dfs(i, n - 1, vis);
    }

    // Update the original board
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (vis[i][j] === 'O') board[i][j] = 'X';
        }
    }
}

