/*
Question:
Given an m x n binary matrix grid (0 = sea, 1 = land), return the number of land cells
from which we cannot walk off the boundary of the grid.

Approach:
- DFS from all boundary land cells and mark them as -1 (reachable to boundary).
- Count remaining land cells (value 1) which are enclaves.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

function dfs(i, j, vis) {
    if (i >= 0 && i < vis.length && j >= 0 && j < vis[0].length && vis[i][j] === 1) {
        vis[i][j] = -1;
        dfs(i + 1, j, vis);
        dfs(i - 1, j, vis);
        dfs(i, j + 1, vis);
        dfs(i, j - 1, vis);
    }
}

function numEnclaves(grid) {
    let m = grid.length, n = grid[0].length;
    let vis = grid.map(row => [...row]);

    // Perform DFS from boundary cells
    for (let i = 0; i < n; i++) {
        if (vis[0][i] === 1) dfs(0, i, vis);
        if (vis[m - 1][i] === 1) dfs(m - 1, i, vis);
    }
    for (let i = 0; i < m; i++) {
        if (vis[i][0] === 1) dfs(i, 0, vis);
        if (vis[i][n - 1] === 1) dfs(i, n - 1, vis);
    }

    // Count the number of land cells that are not on the boundary
    let ans = 0;
    for (let row of vis) {
        for (let col of row) {
            if (col === 1) ans++;
        }
    }
    return ans;
}

