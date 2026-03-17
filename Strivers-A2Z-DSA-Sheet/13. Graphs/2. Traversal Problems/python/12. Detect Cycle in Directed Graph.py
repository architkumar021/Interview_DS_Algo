"""
Question:
Given a Directed Graph with V vertices and E edges, check whether it contains any cycle.

Approach:
- Use DFS with backtracking. Maintain a visited array.
- If we encounter a node visited in the current DFS path, a cycle exists.
- On backtrack, unmark the node.

Time Complexity: O(V + E)
Space Complexity: O(V)
"""


def dfs(node, adj, vis):
    vis[node] = True
    for v in adj[node]:
        if not vis[v] and dfs(v, adj, vis):
            return True
        elif vis[v]:
            return True
    vis[node] = False
    return False


def is_cyclic(edges, v, e):
    adj = [[] for _ in range(v)]
    for it in edges:
        adj[it[0]].append(it[1])
    vis = [False] * v
    for i in range(v):
        if not vis[i] and dfs(i, adj, vis):
            return True
    return False

