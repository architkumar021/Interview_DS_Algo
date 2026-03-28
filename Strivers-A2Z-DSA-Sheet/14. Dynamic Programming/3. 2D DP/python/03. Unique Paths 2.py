"""
  QUESTION: 63. Unique Paths II — With Obstacles (LeetCode)
  Example: [[0,0,0],[0,1,0],[0,0,0]] → 2
"""

def unique_paths_with_obstacles(grid):
    m, n = len(grid), len(grid[0])
    if grid[0][0] == 1 or grid[m-1][n-1] == 1: return 0
    prev = [0] * n
    for i in range(m):
        curr = [0] * n
        for j in range(n):
            if grid[i][j] == 1: curr[j] = 0; continue
            if i == 0 and j == 0: curr[j] = 1; continue
            top = prev[j] if i > 0 else 0
            left = curr[j-1] if j > 0 else 0
            curr[j] = top + left
        prev = curr
    return prev[n-1]

if __name__ == "__main__":
    print(unique_paths_with_obstacles([[0,0,0],[0,1,0],[0,0,0]]))  # 2

