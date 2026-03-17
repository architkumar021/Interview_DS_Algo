"""
Question:
Given an m x n image grid, a starting pixel (sr, sc), and a color, perform flood fill.

Approach:
- Use BFS starting from (sr, sc).
- Replace all connected pixels with the same original color.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""

from collections import deque


def flood_fill(image, sr, sc, color):
    ans = [row[:] for row in image]
    m, n = len(image), len(image[0])
    s = ans[sr][sc]
    ans[sr][sc] = color

    queue = deque([(sr, sc)])
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx, ny = x + dr[i], y + dc[i]
            if 0 <= nx < m and 0 <= ny < n and ans[nx][ny] == s and ans[nx][ny] != color:
                ans[nx][ny] = color
                queue.append((nx, ny))

    return ans

