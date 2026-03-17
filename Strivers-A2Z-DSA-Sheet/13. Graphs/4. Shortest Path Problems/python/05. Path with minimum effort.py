"""
Question:
Given a 2D array of heights, find the path from top-left to bottom-right that
minimizes the maximum absolute difference between consecutive cells.

Approach:
- Use Dijkstra's algorithm with effort (max absolute difference) as the weight.

Time Complexity: O(N*M * log(N*M))
Space Complexity: O(N*M)
"""

import heapq


def minimum_effort_path(heights):
    n, m = len(heights), len(heights[0])
    dis = [[float('inf')] * m for _ in range(n)]
    pq = []  # (effort, row, col)

    dis[0][0] = 0
    heapq.heappush(pq, (0, 0, 0))

    dr = [0, 0, 1, -1]
    dc = [1, -1, 0, 0]

    ans = float('-inf')
    while pq:
        effort, x, y = heapq.heappop(pq)
        ans = max(ans, effort)
        if x == n - 1 and y == m - 1:
            return ans
        for i in range(4):
            nx, ny = x + dr[i], y + dc[i]
            if 0 <= nx < n and 0 <= ny < m:
                diff = abs(heights[x][y] - heights[nx][ny])
                if dis[nx][ny] > diff:
                    dis[nx][ny] = diff
                    heapq.heappush(pq, (diff, nx, ny))

    return -1

