"""
=============================================================================
  QUESTION: Rat in a Maze (GFG)
=============================================================================

  Rat at (0,0) must reach (N-1,N-1). 1=open, 0=blocked.
  Find ALL paths: D(down), L(left), R(right), U(up).

  APPROACH: DFS Backtracking (same pattern as Word Search)
  Mark cell as 0 (visited), try D/L/R/U, restore on backtrack.

  DRY RUN:
    [[1,0,0,0],
     [1,1,0,1],
     [1,1,0,0],
     [0,1,1,1]]
    (0,0)→D→(1,0)→D→(2,0)→R→(2,1)→D→(3,1)→R→(3,2)→R→(3,3) = "DDRDRR" ✓
    (0,0)→D→(1,0)→R→(1,1)→D→(2,1)→D→(3,1)→R→(3,2)→R→(3,3) = "DRDDRR" ✓

  Time: O(3^(N²)), Space: O(N²)
=============================================================================
"""


def is_valid(i, j, m, n):
    return 0 <= i < n and 0 <= j < n and m[i][j] == 1


def solve(i, j, temp, ans, m, n):
    if i == n - 1 and j == n - 1:
        ans.append(temp)
        return

    if not is_valid(i, j, m, n):
        return

    m[i][j] = 0  # Mark visited

    solve(i + 1, j, temp + 'D', ans, m, n)
    solve(i, j - 1, temp + 'L', ans, m, n)
    solve(i, j + 1, temp + 'R', ans, m, n)
    solve(i - 1, j, temp + 'U', ans, m, n)

    m[i][j] = 1  # Restore


def find_path(m, n):
    if m[0][0] == 0 or m[n - 1][n - 1] == 0:
        return []

    ans = []
    solve(0, 0, "", ans, m, n)
    return ans


# Driver Code
if __name__ == "__main__":
    maze = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]
    print(find_path(maze, 4))  # ["DDRDRR","DRDDRR"]

