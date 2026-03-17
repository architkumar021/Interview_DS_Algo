"""
Question:
Given an m x n binary matrix grid (0 = sea, 1 = land), return the number of land cells
from which we cannot walk off the boundary of the grid.

Approach:
- DFS from all boundary land cells and mark them as -1.
- Count remaining land cells (value 1) which are enclaves.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""


def dfs(i, j, vis):
    if 0 <= i < len(vis) and 0 <= j < len(vis[0]) and vis[i][j] == 1:
        vis[i][j] = -1
        dfs(i + 1, j, vis)
        dfs(i - 1, j, vis)
        dfs(i, j + 1, vis)
        dfs(i, j - 1, vis)


def num_enclaves(grid):
    m, n = len(grid), len(grid[0])
    vis = [row[:] for row in grid]

    # Perform DFS from boundary cells
    for i in range(n):
        if vis[0][i] == 1:
            dfs(0, i, vis)
        if vis[m - 1][i] == 1:
            dfs(m - 1, i, vis)
    for i in range(m):
        if vis[i][0] == 1:
            dfs(i, 0, vis)
        if vis[i][n - 1] == 1:
            dfs(i, n - 1, vis)

    # Count the number of land cells that are not on the boundary
    ans = 0
    for row in vis:
        for col in row:
            if col == 1:
                ans += 1
    return ans

