"""
Question:
Find the number of ways to arrive at destination (n-1) from intersection 0 in the shortest
amount of time. Return the count modulo 10^9 + 7.

Approach:
- Use Dijkstra's algorithm. Track both shortest distance and number of ways.
- If a shorter path found, reset ways. If equal path found, add ways.

Time Complexity: O((N + E) * log(N))
Space Complexity: O(N)
"""

import heapq


def count_paths(n, roads):
    adj = [[] for _ in range(n)]
    for road in roads:
        adj[road[0]].append((road[1], road[2]))
        adj[road[1]].append((road[0], road[2]))

    mod = int(1e9 + 7)
    pq = [(0, 0)]  # (distance, node)
    dis = [float('inf')] * n
    ways = [0] * n

    dis[0] = 0
    ways[0] = 1

    while pq:
        uwt, u = heapq.heappop(pq)
        for v, vwt in adj[u]:
            if dis[v] > uwt + vwt:
                ways[v] = ways[u]
                dis[v] = uwt + vwt
                heapq.heappush(pq, (dis[v], v))
            elif dis[v] == uwt + vwt:
                ways[v] = (ways[v] + ways[u]) % mod

    return ways[n - 1] % mod

