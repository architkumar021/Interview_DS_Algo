"""
Question:
Given an n x m grid (initially all water), process operations that turn sea cells to land.
Return the number of islands after each operation.

Approach:
- Use Disjoint Set. For each new land cell, check 4 neighbors.
- If neighbor is land and in different component, union and decrement island count.

Time Complexity: O(k * α(n*m))
Space Complexity: O(n * m)
"""


class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find_u_par(self, node):
        if self.parent[node] == node:
            return node
        self.parent[node] = self.find_u_par(self.parent[node])
        return self.parent[node]

    def union_size(self, u, v):
        up, vp = self.find_u_par(u), self.find_u_par(v)
        if self.size[up] > self.size[vp]:
            self.parent[vp] = up
            self.size[up] += self.size[vp]
        else:
            self.parent[up] = vp
            self.size[vp] += self.size[up]


def is_land(x, y, grid):
    return 0 <= x < len(grid) and 0 <= y < len(grid[0]) and grid[x][y] == 1


def num_of_islands(n, m, operators):
    ans = []
    islands = 0
    djs = DisjointSet(n * m)
    grid = [[0] * m for _ in range(n)]

    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    for op in operators:
        x, y = op[0], op[1]
        if grid[x][y] != 1:
            grid[x][y] = 1
            islands += 1
            cell_id = x * m + y
            for i in range(4):
                nx, ny = x + dr[i], y + dc[i]
                if is_land(nx, ny, grid):
                    nid = nx * m + ny
                    if djs.find_u_par(cell_id) != djs.find_u_par(nid):
                        djs.union_size(cell_id, nid)
                        islands -= 1
        ans.append(islands)
    return ans

