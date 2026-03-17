/*
Question:
Given an n x n grid where grid[i][j] represents elevation, find the least time
to swim from (0,0) to (n-1,n-1). At time t, water depth is t everywhere.

Approach:
- Use a min-heap (priority queue). Process cells in order of their elevation.
- Track the maximum elevation encountered on the path.

Time Complexity: O(n^2 * log(n))
Space Complexity: O(n^2)
*/

function swimInWater(grid) {
    let n = grid.length;
    let vis = Array.from({ length: n }, () => new Array(n).fill(false));
    let pq = [[grid[0][0], 0, 0]]; // [elevation, x, y]
    vis[0][0] = true;

    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];
    let ans = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [uwt, x, y] = pq.shift();
        ans = Math.max(ans, uwt);
        if (x === n - 1 && y === n - 1) return ans;
        for (let i = 0; i < 4; i++) {
            let nx = x + dr[i], ny = y + dc[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < n && !vis[nx][ny]) {
                vis[nx][ny] = true;
                pq.push([grid[nx][ny], nx, ny]);
            }
        }
    }

    return ans;
}

