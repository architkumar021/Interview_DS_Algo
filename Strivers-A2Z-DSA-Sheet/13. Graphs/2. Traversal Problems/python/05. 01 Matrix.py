"""
Question:
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

Approach:
- Use multi-source BFS starting from all 0-cells simultaneously.
- Each BFS level increments the distance by 1.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""

from collections import deque


def update_matrix(mat):
    m, n = len(mat), len(mat[0])
    dis = [[-1] * n for _ in range(m)]
    queue = deque()

    for i in range(m):
        for j in range(n):
            if mat[i][j] == 0:
                dis[i][j] = 0
                queue.append((i, j))

    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]
    level = 1

    while queue:
        size = len(queue)
        for _ in range(size):
            x, y = queue.popleft()
            for i in range(4):
                nx, ny = x + dr[i], y + dc[i]
                if 0 <= nx < m and 0 <= ny < n and dis[nx][ny] == -1:
                    dis[nx][ny] = level
                    queue.append((nx, ny))
        level += 1

    return dis

