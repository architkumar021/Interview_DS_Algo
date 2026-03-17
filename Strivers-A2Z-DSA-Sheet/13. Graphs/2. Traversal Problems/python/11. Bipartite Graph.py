"""
Question:
Given an undirected graph, determine if it is bipartite.

Approach:
- Use DFS to color nodes with two colors (1 and -1).
- If a neighbor has the same color as the current node, it's not bipartite.

Time Complexity: O(V + E)
Space Complexity: O(V)
"""


def dfs(node, color, adj, vis):
    vis[node] = color
    for v in adj[node]:
        if not vis[v] and not dfs(v, -color, adj, vis):
            return False
        if vis[v] == color:
            return False
    return True


def is_bipartite(graph):
    n = len(graph)
    vis = [0] * n
    for i in range(n):
        if not vis[i] and not dfs(i, 1, graph, vis):
            return False
    return True

