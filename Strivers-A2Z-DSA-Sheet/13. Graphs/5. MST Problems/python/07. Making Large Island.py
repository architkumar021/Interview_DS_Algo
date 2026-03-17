"""
Question:
Given an n x n binary matrix grid, change at most one 0 to 1.
Return the size of the largest island after the operation.

Approach:
- Use Disjoint Set to connect all 1-cells into islands.
- For each 0-cell, check the unique neighboring island sizes and compute potential island size.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
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

    def union_by_size(self, u, v):
        uP, vP = self.find_u_par(u), self.find_u_par(v)
        if self.size[uP] > self.size[vP]:
            self.parent[vP] = uP
            self.size[uP] += self.size[vP]
        else:
            self.parent[uP] = vP
            self.size[vP] += self.size[uP]


def is_land(i, j, grid):
    return 0 <= i < len(grid) and 0 <= j < len(grid) and grid[i][j] == 1


def largest_island(grid):
    n = len(grid)
    dr = [1, -1, 0, 0]
    dc = [0, 0, 1, -1]
    djs = DisjointSet(n * n)

    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                cell_id = i * n + j
                for d in range(4):
                    ni, nj = i + dr[d], j + dc[d]
                    if is_land(ni, nj, grid):
                        nid = ni * n + nj
                        if djs.find_u_par(cell_id) != djs.find_u_par(nid):
                            djs.union_by_size(cell_id, nid)

    ans = float('-inf')
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 0:
                st = set()
                for d in range(4):
                    ni, nj = i + dr[d], j + dc[d]
                    if is_land(ni, nj, grid):
                        st.add(djs.find_u_par(ni * n + nj))
                siz = sum(djs.size[u] for u in st)
                ans = max(ans, siz + 1)

    for cell_no in range(n * n):
        ans = max(ans, djs.size[djs.find_u_par(cell_no)])

    return ans

