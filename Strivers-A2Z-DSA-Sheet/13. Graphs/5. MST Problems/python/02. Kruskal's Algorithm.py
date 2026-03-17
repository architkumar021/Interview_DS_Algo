"""
Question:
Given a weighted, undirected and connected graph, find the sum of weights of
the edges of the Minimum Spanning Tree using Kruskal's algorithm.

Approach:
- Sort all edges by weight.
- Use Disjoint Set (Union-Find) to add edges that connect different components.

Time Complexity: O(E * log(E))
Space Complexity: O(V)
"""


class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find_u_parent(self, node):
        if self.parent[node] == node:
            return node
        self.parent[node] = self.find_u_parent(self.parent[node])
        return self.parent[node]

    def union_by_size(self, u, v):
        uP, vP = self.find_u_parent(u), self.find_u_parent(v)
        if uP == vP:
            return
        if self.size[uP] > self.size[vP]:
            self.parent[vP] = uP
            self.size[uP] += self.size[vP]
        else:
            self.parent[uP] = vP
            self.size[vP] += self.size[uP]


def minimum_spanning_tree(edges, n):
    djs = DisjointSet(n)
    edges.sort()

    ans = 0
    for e in edges:
        wt, u, v = e[0], e[1], e[2]
        if djs.find_u_parent(u) != djs.find_u_parent(v):
            ans += wt
            djs.union_by_size(u, v)

    return ans

