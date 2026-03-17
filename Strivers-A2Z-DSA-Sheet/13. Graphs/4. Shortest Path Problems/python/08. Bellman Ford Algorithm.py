"""
Question:
Given a weighted directed graph, find shortest distance from source S to all vertices
using Bellman-Ford algorithm. Return [-1] if a negative cycle exists.

Approach:
- Relax all edges V-1 times.
- If any edge can still be relaxed in the Vth iteration, negative cycle exists.

Time Complexity: O(V * E)
Space Complexity: O(V)
"""


def bellman_ford(V, edges, S):
    adj = [[] for _ in range(V)]
    for e in edges:
        adj[e[0]].append((e[1], e[2]))

    dis = [int(1e8)] * V
    dis[S] = 0

    for _ in range(V):
        for u in range(V):
            for v, wt in adj[u]:
                if dis[u] != int(1e8):
                    dis[v] = min(dis[v], dis[u] + wt)

    # Check for negative cycle
    for u in range(V):
        for v, wt in adj[u]:
            if dis[u] != int(1e8) and dis[v] > dis[u] + wt:
                return [-1]

    return dis

