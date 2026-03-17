"""
Question:
Given an undirected graph with unit weight, find the shortest path from
the source vertex to all other vertices. Return -1 for unreachable vertices.

Approach:
- BFS from the source vertex. Each level = distance incremented by 1.

Time Complexity: O(N + M)
Space Complexity: O(N)
"""

from collections import deque


def shortest_path(edges, N, M, src):
    adj = [[] for _ in range(N)]
    for e in edges:
        adj[e[0]].append(e[1])
        adj[e[1]].append(e[0])

    vis = [False] * N
    dis = [-1] * N
    queue = deque([src])
    vis[src] = True

    lvl = 0
    while queue:
        size = len(queue)
        for _ in range(size):
            node = queue.popleft()
            dis[node] = lvl
            for v in adj[node]:
                if not vis[v]:
                    queue.append(v)
                    vis[v] = True
        lvl += 1

    return dis

