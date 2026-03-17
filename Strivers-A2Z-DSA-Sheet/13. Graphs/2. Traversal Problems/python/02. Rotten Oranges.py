"""
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
"""

from collections import deque


def oranges_rotting(grid):
    m, n = len(grid), len(grid[0])
    ans, fresh = -1, 0
    queue = deque()

    for i in range(m):
        for j in range(n):
            if grid[i][j] == 2:
                queue.append((i, j))
            if grid[i][j] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    while queue:
        size = len(queue)
        for _ in range(size):
            x, y = queue.popleft()
            for i in range(4):
                nx, ny = x + dr[i], y + dc[i]
                if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == 1:
                    grid[nx][ny] = 2
                    queue.append((nx, ny))
                    fresh -= 1
        ans += 1

    return -1 if fresh > 0 else ans

