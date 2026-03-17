/*
Question:
Given an m x n image grid, a starting pixel (sr, sc), and a color, perform flood fill.
Replace the color of the starting pixel and all 4-directionally connected pixels of the
same original color with the new color.

Approach:
- Use BFS starting from (sr, sc).
- Replace all connected pixels with the same original color.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

function floodFill(image, sr, sc, color) {
    let ans = image.map(row => [...row]);
    let m = image.length, n = image[0].length;
    let s = ans[sr][sc];
    ans[sr][sc] = color;

    let queue = [[sr, sc]];
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        let next = [];
        for (let [x, y] of queue) {
            for (let i = 0; i < 4; i++) {
                let nx = x + dr[i], ny = y + dc[i];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && ans[nx][ny] === s && ans[nx][ny] !== color) {
                    ans[nx][ny] = color;
                    next.push([nx, ny]);
                }
            }
        }
        queue = next;
    }

    return ans;
}

