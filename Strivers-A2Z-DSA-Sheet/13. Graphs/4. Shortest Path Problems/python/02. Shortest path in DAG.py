"""
Question:
Given a DAG with N vertices and weighted edges, find the shortest path from
source (vertex 0) to all other vertices. Return -1 for unreachable vertices.

Approach:
- Topological sort the DAG using DFS.
- Relax edges in topological order.

Time Complexity: O(N + M)
Space Complexity: O(N + M)
"""


def dfs(node, adj, vis, topo):
    vis[node] = True
    for v, _ in adj[node]:
        if not vis[v]:
            dfs(v, adj, vis, topo)
    topo.append(node)


def shortest_path(N, M, edges):
    adj = [[] for _ in range(N)]
    for e in edges:
        adj[e[0]].append((e[1], e[2]))

    vis = [False] * N
    topo = []
    for i in range(N):
        if not vis[i]:
            dfs(i, adj, vis, topo)
    topo.reverse()

    dis = [float('inf')] * N
    dis[0] = 0

    for u in topo:
        for v, d in adj[u]:
            dis[v] = min(dis[v], dis[u] + d)

    for i in range(N):
        if dis[i] == float('inf'):
            dis[i] = -1

    return dis

