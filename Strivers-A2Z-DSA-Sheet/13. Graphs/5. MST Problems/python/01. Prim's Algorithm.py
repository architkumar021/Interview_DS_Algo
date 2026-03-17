"""
Question:
Given a weighted, undirected and connected graph, find the sum of weights of
the edges of the Minimum Spanning Tree using Prim's algorithm.

Approach:
- Start from vertex 0. Use a min-heap to always pick the cheapest edge.
- Add the cheapest edge to MST if the destination vertex is not yet in MST.

Time Complexity: O(E + V*log(V))
Space Complexity: O(V)
"""

import heapq


def minimum_spanning_tree(edges, n):
    adj = [[] for _ in range(n)]
    for e in edges:
        adj[e[0]].append((e[2], e[1]))
        adj[e[1]].append((e[2], e[0]))

    mst = [False] * n
    pq = [(0, 0)]  # (weight, node)
    ans = 0

    while pq:
        uwt, u = heapq.heappop(pq)
        if not mst[u]:
            mst[u] = True
            ans += uwt
            for vwt, v in adj[u]:
                if not mst[v]:
                    heapq.heappush(pq, (vwt, v))

    return ans

