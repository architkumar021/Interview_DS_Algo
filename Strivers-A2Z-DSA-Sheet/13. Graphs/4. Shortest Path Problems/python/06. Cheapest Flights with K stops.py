"""
Question:
Find the cheapest price from src to dst with at most k stops.

Approach:
- Use BFS with level-by-level traversal (each level = one stop).
- Track distances and update only if a cheaper route is found.

Time Complexity: O(n * k)
Space Complexity: O(n)
"""

from collections import deque


def find_cheapest_price(n, flights, src, dst, k):
    adj = [[] for _ in range(n)]
    for flight in flights:
        adj[flight[0]].append((flight[1], flight[2]))

    queue = deque([(src, 0)])
    dis = [float('inf')] * n

    stops = 0
    while queue and stops <= k:
        size = len(queue)
        for _ in range(size):
            u, uwt = queue.popleft()
            for v, vwt in adj[u]:
                if vwt + uwt < dis[v]:
                    dis[v] = uwt + vwt
                    queue.append((v, dis[v]))
        stops += 1

    return -1 if dis[dst] == float('inf') else dis[dst]

