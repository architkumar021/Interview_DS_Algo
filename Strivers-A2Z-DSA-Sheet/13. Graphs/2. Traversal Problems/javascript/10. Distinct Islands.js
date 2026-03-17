/*
Question:
Given a boolean 2D matrix grid of size n * m, find the number of distinct islands
where a group of connected 1s forms an island. Two islands are distinct if one is
not equal to another (not rotated or reflected).

Approach:
- Use DFS to traverse each island and record the path (directions taken).
- Store paths in a Set to count unique island shapes.

Time Complexity: O(n * m)
Space Complexity: O(n * m)
*/

function dfs(i, j, grid, path, vis) {
    if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length && grid[i][j] === 1 && !vis[i][j]) {
        vis[i][j] = true;
        path.push("U");
        dfs(i + 1, j, grid, path, vis);
        path.push("D");
        dfs(i - 1, j, grid, path, vis);
        path.push("R");
        dfs(i, j + 1, grid, path, vis);
        path.push("L");
        dfs(i, j - 1, grid, path, vis);
    }
}

function countDistinctIslands(grid) {
    let n = grid.length, m = grid[0].length;
    let vis = Array.from({ length: n }, () => new Array(m).fill(false));

    let st = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1 && !vis[i][j]) {
                let path = [];
                dfs(i, j, grid, path, vis);
                st.add(path.join(""));
            }
        }
    }

    return st.size;
}

