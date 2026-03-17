"""
Question:
Given a weighted, undirected, and connected graph, find the shortest distance
of all vertices from the source vertex S using Dijkstra's algorithm.

Approach:
- Use a min-heap (priority queue) to always process the nearest unvisited vertex.
- Relax edges and update distances.

Time Complexity: O(E + V*log(V))
Space Complexity: O(V + E)
"""

import heapq


def dijkstra(n, adj, s):
    dis = [float('inf')] * n
    pq = []  # (distance, node)

    dis[s] = 0
    heapq.heappush(pq, (0, s))

    while pq:
        uwt, u = heapq.heappop(pq)
        for v, wt in adj[u]:
            if dis[u] + wt < dis[v]:
                dis[v] = dis[u] + wt
                heapq.heappush(pq, (dis[v], v))

    return dis

