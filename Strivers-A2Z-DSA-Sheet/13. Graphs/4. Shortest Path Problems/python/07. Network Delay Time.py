"""
Question:
Given a network of n nodes and travel times as directed edges, find the minimum time
for all nodes to receive a signal from node k. Return -1 if impossible.

Approach:
- Use Dijkstra's algorithm from node k.
- The answer is the maximum distance among all reachable nodes.

Time Complexity: O(E * log(V))
Space Complexity: O(V)
"""

import heapq


def network_delay_time(times, n, k):
    adj = [[] for _ in range(n + 1)]
    for time in times:
        adj[time[0]].append((time[1], time[2]))

    pq = [(0, k)]
    dis = [float('inf')] * (n + 1)
    dis[k] = 0

    while pq:
        uwt, u = heapq.heappop(pq)
        for v, vwt in adj[u]:
            if dis[v] > uwt + vwt:
                dis[v] = uwt + vwt
                heapq.heappush(pq, (dis[v], v))

    ans = float('-inf')
    for i in range(1, n + 1):
        if dis[i] == float('inf'):
            return -1
        ans = max(ans, dis[i])
    return ans

