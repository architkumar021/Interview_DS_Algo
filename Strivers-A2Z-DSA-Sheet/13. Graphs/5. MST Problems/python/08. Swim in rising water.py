"""
Question:
Given an n x n grid where grid[i][j] represents elevation, find the least time
to swim from (0,0) to (n-1,n-1). At time t, water depth is t everywhere.

Approach:
- Use a min-heap (priority queue). Process cells in order of their elevation.
- Track the maximum elevation encountered on the path.

Time Complexity: O(n^2 * log(n))
Space Complexity: O(n^2)
"""

import heapq


def swim_in_water(grid):
    n = len(grid)
    vis = [[False] * n for _ in range(n)]
    pq = [(grid[0][0], 0, 0)]  # (elevation, x, y)
    vis[0][0] = True

    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]
    ans = 0

    while pq:
        uwt, x, y = heapq.heappop(pq)
        ans = max(ans, uwt)
        if x == n - 1 and y == n - 1:
            return ans
        for i in range(4):
            nx, ny = x + dr[i], y + dc[i]
            if 0 <= nx < n and 0 <= ny < n and not vis[nx][ny]:
                vis[nx][ny] = True
                heapq.heappush(pq, (grid[nx][ny], nx, ny))

    return ans

