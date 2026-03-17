"""
Question:
Given n computers and connections, return the minimum number of operations to make all
computers connected. Return -1 if impossible.

Approach:
- If connections < n-1, impossible.
- Use Disjoint Set to count connected components. Answer = components - 1.

Time Complexity: O(E + V)
Space Complexity: O(V)
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

    def disconnected(self, n):
        cnt = 0
        for i in range(n):
            if self.parent[i] == i:
                cnt += 1
        return cnt


def make_connected(n, connections):
    if n - 1 > len(connections):
        return -1

    djs = DisjointSet(n)
    for c in connections:
        if djs.find_u_par(c[0]) != djs.find_u_par(c[1]):
            djs.union_by_size(c[0], c[1])

    return djs.disconnected(n) - 1

