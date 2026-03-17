/*
Question:
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

Approach:
- Use multi-source BFS starting from all 0-cells simultaneously.
- Each BFS level increments the distance by 1.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

function updateMatrix(mat) {
    let m = mat.length, n = mat[0].length;
    let dis = Array.from({ length: m }, () => new Array(n).fill(-1));
    let queue = [];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dis[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }

    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];
    let level = 1;

    while (queue.length > 0) {
        let next = [];
        for (let [x, y] of queue) {
            for (let i = 0; i < 4; i++) {
                let nx = x + dr[i], ny = y + dc[i];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && dis[nx][ny] === -1) {
                    dis[nx][ny] = level;
                    next.push([nx, ny]);
                }
            }
        }
        queue = next;
        level++;
    }

    return dis;
}

