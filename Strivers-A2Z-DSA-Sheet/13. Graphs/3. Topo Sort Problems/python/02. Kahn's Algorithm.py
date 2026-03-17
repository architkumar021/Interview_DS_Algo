"""
Question:
Given a Directed Graph with V vertices and E edges, check whether it contains any cycle
using Kahn's algorithm (Topological Sorting via BFS with indegree).

Approach:
- Calculate indegree for each node.
- Push all nodes with indegree 0 into a queue.
- Process nodes, reducing indegrees of neighbors.
- If total processed nodes != V, a cycle exists.

Time Complexity: O(V + E)
Space Complexity: O(V)
"""

from collections import deque


def is_cyclic(V, adj):
    indeg = [0] * V

    for i in range(V):
        for it in adj[i]:
            indeg[it] += 1

    queue = deque()
    for i in range(V):
        if indeg[i] == 0:
            queue.append(i)

    cnt = 0
    while queue:
        node = queue.popleft()
        cnt += 1
        for i in adj[node]:
            indeg[i] -= 1
            if indeg[i] == 0:
                queue.append(i)

    return cnt != V

