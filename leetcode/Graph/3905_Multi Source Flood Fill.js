// You are given two integers n and m representing the number of rows and columns of a grid, respectively.
//
//     You are also given a 2D integer array sources, where sources[i] = [ri, ci, colori] indicates that the cell (ri, ci)
//     is initially colored with colori. All other cells are initially uncolored and represented as 0.
//
// At each time step, every currently colored cell spreads its color to all adjacent uncolored cells in the
// four directions: up, down, left, and right. All spreads happen simultaneously.
//
//     If multiple colors reach the same uncolored cell at the same time step, the cell takes the color with the maximum value.
//
//     The process continues until no more cells can be colored.
//
//     Return a 2D integer array representing the final state of the grid, where each cell contains its final color.
//
//
//
//     Example 1:
//
// Input: n = 3, m = 3, sources = [[0,0,1],[2,2,2]]
//
// Output: [[1,1,2],[1,2,2],[2,2,2]]
//
// At time step 2, cells (0, 2), (1, 1), and (2, 0) are reached by both colors, so they are assigned color 2
// as it has the maximum value among them.


/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} sources
 * @return {number[][]}
 */
var colorGrid = function (n, m, sources) {
    let colorGrid = Array.from({ length: n }, () => new Array(m).fill(0));
    let dis = Array.from({ length: n }, () => new Array(m).fill(Infinity));

    let queue = [];

    for (let [r, c, color] of sources) {
        queue.push([r, c]);
        colorGrid[r][c] = color;
        dis[r][c] = 0;
    }

    let dr = [1, -1, 0, 0];
    let dc = [0, 0, 1, -1];

    while (queue.length > 0) {
        let nextLevel = [];

        for (let [row, col] of queue) {
            for (let i = 0; i < 4; i++) {
                let newRow = row + dr[i];
                let newCol = col + dc[i];

                if (newRow >= 0 && newCol >= 0 && newRow < n && newCol < m) {
                    let newDis = dis[row][col] + 1;

                    if (dis[newRow][newCol] > newDis) {
                        // first time reached
                        dis[newRow][newCol] = newDis;
                        colorGrid[newRow][newCol] = colorGrid[row][col];
                        nextLevel.push([newRow, newCol]);
                    } else if (dis[newRow][newCol] === newDis) {
                        // same time reached
                        dis[newRow][newCol] = newDis;
                        colorGrid[newRow][newCol] = Math.max(colorGrid[newRow][newCol], colorGrid[row][col]);
                    }
                }
            }
        }
        queue = nextLevel;
    }
    return colorGrid;
};