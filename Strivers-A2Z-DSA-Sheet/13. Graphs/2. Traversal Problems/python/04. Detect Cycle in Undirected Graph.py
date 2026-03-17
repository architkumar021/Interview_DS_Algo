"""
Question:
Given an undirected graph with V vertices and E edges, check whether it contains any cycle.

Approach:
- Use DFS traversal and keep track of visited nodes and parent.
- If we encounter a visited node that is not the parent, a cycle exists.

Time Complexity: O(V + E)
Space Complexity: O(V)
"""


def dfs(node, parent, adj, vis):
    vis[node] = True
    for v in adj[node]:
        if not vis[v]:
            if dfs(v, node, adj, vis):
                return True
        elif v != parent:
            return True
    return False


def is_cycle(V, adj):
    vis = [False] * V
    for i in range(V):
        if not vis[i]:
            if dfs(i, -1, adj, vis):
                return True
    return False

