"""
Question:
Given n cities and weighted bidirectional edges, find the city with the smallest number
of cities reachable within distanceThreshold. If tied, return the city with the greatest number.

Approach:
- Run Dijkstra from each city.
- Count neighbors within distanceThreshold for each city.

Time Complexity: O(V^3)
Space Complexity: O(V)
"""

import heapq


def find_the_city(n, edges, distanceThreshold):
    adj = [[] for _ in range(n)]
    for e in edges:
        adj[e[0]].append((e[1], e[2]))
        adj[e[1]].append((e[0], e[2]))

    mp = {}

    for i in range(n):
        dis = [float('inf')] * n
        dis[i] = 0
        pq = [(0, i)]

        while pq:
            uwt, u = heapq.heappop(pq)
            for v, vwt in adj[u]:
                if dis[v] > uwt + vwt:
                    dis[v] = uwt + vwt
                    heapq.heappush(pq, (dis[v], v))

        nbr_cnt = 0
        for j in range(n):
            if i != j and dis[j] <= distanceThreshold:
                nbr_cnt += 1
        mp[i] = nbr_cnt

    mini, ans = float('inf'), 0
    for i in range(n):
        if mp[i] < mini:
            mini = mp[i]
            ans = i
        elif mp[i] == mini:
            ans = max(ans, i)

    return ans

