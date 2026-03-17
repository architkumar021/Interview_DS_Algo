"""
Question:
Given an n x n binary matrix grid, return the length of the shortest clear path
from (0,0) to (n-1,n-1). Cells with 0 are passable, 8-directional movement allowed.

Approach:
- BFS from (0,0), exploring 8 directions. Each level = +1 path length.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
"""

from collections import deque


def shortest_path_binary_matrix(grid):
    n = len(grid)
    if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:
        return -1

    vis = [[False] * n for _ in range(n)]
    queue = deque([(0, 0)])
    vis[0][0] = True
    lvl = 1

    while queue:
        size = len(queue)
        for _ in range(size):
            x, y = queue.popleft()
            if x == n - 1 and y == n - 1:
                return lvl
            for i in range(-1, 2):
                for j in range(-1, 2):
                    nx, ny = x + i, y + j
                    if 0 <= nx < n and 0 <= ny < n and not vis[nx][ny] and grid[nx][ny] == 0:
                        queue.append((nx, ny))
                        vis[nx][ny] = True
        lvl += 1

    return -1

