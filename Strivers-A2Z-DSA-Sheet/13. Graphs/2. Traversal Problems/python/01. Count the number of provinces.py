"""
Question:
Given an n x n matrix 'isConnected' representing connections between cities (nodes),
find the total number of provinces in the graph.

Approach:
- Convert the given matrix into an adjacency list.
- Use DFS to traverse and mark all connected cities as visited.
- Each new unvisited city starts a new province (connected component).

Time Complexity: O(n^2)
Space Complexity: O(n)
"""


def dfs(node, adj, vis):
    vis[node] = True
    for v in adj[node]:
        if not vis[v]:
            dfs(v, adj, vis)


def find_circle_num(isConnected):
    ans = 0
    n = len(isConnected)
    adj = [[] for _ in range(n)]

    # Convert isConnected matrix into adjacency list
    for i in range(n):
        for j in range(n):
            if isConnected[i][j] == 1:
                adj[i].append(j)

    vis = [False] * n

    # Perform DFS to find the number of provinces
    for i in range(n):
        if not vis[i]:
            ans += 1
            dfs(i, adj, vis)

    return ans

