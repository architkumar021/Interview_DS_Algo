/*
Question:
Given a 2D array of heights, find the path from top-left to bottom-right that
minimizes the maximum absolute difference between consecutive cells.

Approach:
- Use Dijkstra's algorithm with effort (max absolute difference) as the weight.

Time Complexity: O(N*M * log(N*M))
Space Complexity: O(N*M)
*/

function minimumEffortPath(heights) {
    let n = heights.length, m = heights[0].length;
    let dis = Array.from({ length: n }, () => new Array(m).fill(1e9));
    let pq = []; // [effort, row, col]

    dis[0][0] = 0;
    pq.push([0, 0, 0]);

    let dr = [0, 0, 1, -1];
    let dc = [1, -1, 0, 0];

    let ans = -Infinity;
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [effort, x, y] = pq.shift();
        ans = Math.max(ans, effort);
        if (x === n - 1 && y === m - 1) return ans;
        for (let i = 0; i < 4; i++) {
            let nx = x + dr[i], ny = y + dc[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                let diff = Math.abs(heights[x][y] - heights[nx][ny]);
                if (dis[nx][ny] > diff) {
                    dis[nx][ny] = diff;
                    pq.push([diff, nx, ny]);
                }
            }
        }
    }
    return -1;
}

