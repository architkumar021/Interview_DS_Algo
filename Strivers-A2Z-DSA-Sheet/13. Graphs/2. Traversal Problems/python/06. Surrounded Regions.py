"""
Question:
Given an m x n matrix board containing 'X' and 'O', capture all regions
that are 4-directionally surrounded by 'X' by flipping 'O's to 'X's.

Approach:
- DFS from all border 'O' cells and mark them as '#' (safe).
- Any remaining 'O' in the board is surrounded, so flip to 'X'.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""


def dfs(i, j, vis):
    if 0 <= i < len(vis) and 0 <= j < len(vis[0]) and vis[i][j] == 'O':
        vis[i][j] = '#'
        dfs(i + 1, j, vis)
        dfs(i - 1, j, vis)
        dfs(i, j + 1, vis)
        dfs(i, j - 1, vis)


def solve(board):
    m, n = len(board), len(board[0])
    vis = [row[:] for row in board]

    # Perform DFS from border cells
    for i in range(n):
        if vis[0][i] == 'O':
            dfs(0, i, vis)
        if vis[m - 1][i] == 'O':
            dfs(m - 1, i, vis)
    for i in range(m):
        if vis[i][0] == 'O':
            dfs(i, 0, vis)
        if vis[i][n - 1] == 'O':
            dfs(i, n - 1, vis)

    # Update the original board
    for i in range(m):
        for j in range(n):
            if vis[i][j] == 'O':
                board[i][j] = 'X'

