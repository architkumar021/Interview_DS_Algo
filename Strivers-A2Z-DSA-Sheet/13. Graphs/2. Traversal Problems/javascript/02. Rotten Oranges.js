/*
Question:
Given an m x n grid where each cell can have one of three values:
0 - empty cell, 1 - fresh orange, 2 - rotten orange.
Every minute, any fresh orange adjacent (4-directionally) to a rotten orange becomes rotten.
Return the minimum number of minutes until no fresh orange remains. Return -1 if impossible.

Approach:
1. Use BFS starting from all rotten oranges simultaneously.
2. Each BFS level represents one minute.
3. Track fresh orange count and decrement as they rot.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

function orangesRotting(grid) {
    let m = grid.length, n = grid[0].length;
    let ans = -1, fresh = 0;
    let queue = [];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) queue.push([i, j]);
            if (grid[i][j] === 1) fresh++;
        }
    }

    if (fresh === 0) return 0;

    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        let size = queue.length;
        let next = [];
        for (let q = 0; q < size; q++) {
            let [x, y] = queue[q];
            for (let i = 0; i < 4; i++) {
                let nx = x + dr[i], ny = y + dc[i];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
                    grid[nx][ny] = 2;
                    next.push([nx, ny]);
                    fresh--;
                }
            }
        }
        queue = next;
        ans++;
    }

    return fresh > 0 ? -1 : ans;
}

