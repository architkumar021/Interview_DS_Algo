"""
Question:
Given a boolean 2D matrix grid, find the number of distinct islands.

Approach:
- Use DFS to traverse each island and record the path (directions taken).
- Store paths in a set to count unique island shapes.

Time Complexity: O(n * m)
Space Complexity: O(n * m)
"""


def dfs(i, j, grid, path, vis):
    if 0 <= i < len(grid) and 0 <= j < len(grid[0]) and grid[i][j] == 1 and not vis[i][j]:
        vis[i][j] = True
        path.append("U")
        dfs(i + 1, j, grid, path, vis)
        path.append("D")
        dfs(i - 1, j, grid, path, vis)
        path.append("R")
        dfs(i, j + 1, grid, path, vis)
        path.append("L")
        dfs(i, j - 1, grid, path, vis)


def count_distinct_islands(grid):
    n, m = len(grid), len(grid[0])
    vis = [[False] * m for _ in range(n)]

    st = set()
    for i in range(n):
        for j in range(m):
            if grid[i][j] == 1 and not vis[i][j]:
                path = []
                dfs(i, j, grid, path, vis)
                st.add("".join(path))

    return len(st)

