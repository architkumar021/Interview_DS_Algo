/*
Question:
Given an n x n binary matrix grid, return the length of the shortest clear path
from (0,0) to (n-1,n-1). Cells with 0 are passable, 8-directional movement allowed.

Approach:
- BFS from (0,0), exploring 8 directions. Each level = +1 path length.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
*/

function isValid(x, y, n, vis, grid) {
    return x >= 0 && x < n && y >= 0 && y < n && !vis[x][y] && grid[x][y] === 0;
}

function shortestPathBinaryMatrix(grid) {
    let n = grid.length;
    if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;

    let vis = Array.from({ length: n }, () => new Array(n).fill(false));
    let queue = [[0, 0]];
    vis[0][0] = true;
    let lvl = 1;

    while (queue.length > 0) {
        let next = [];
        for (let [x, y] of queue) {
            if (x === n - 1 && y === n - 1) return lvl;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let nx = x + i, ny = y + j;
                    if (isValid(nx, ny, n, vis, grid)) {
                        next.push([nx, ny]);
                        vis[nx][ny] = true;
                    }
                }
            }
        }
        queue = next;
        lvl++;
    }
    return -1;
}

