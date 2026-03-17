"""
Question:
Find all safe nodes in a directed graph. A node is safe if every possible path
starting from that node leads to a terminal node.

Approach:
- Build reverse graph and track outdegree of each node.
- Start BFS from terminal nodes (outdegree 0).
- Nodes that become terminal during BFS are safe nodes.

Time Complexity: O(N + E)
Space Complexity: O(N + E)
"""

from collections import deque


def eventual_safe_nodes(graph):
    n = len(graph)
    revadj = [[] for _ in range(n)]
    outdeg = [0] * n

    for i in range(n):
        outdeg[i] = len(graph[i])
        for j in graph[i]:
            revadj[j].append(i)

    queue = deque()
    for i in range(n):
        if outdeg[i] == 0:
            queue.append(i)

    ans = []
    while queue:
        node = queue.popleft()
        ans.append(node)
        for v in revadj[node]:
            outdeg[v] -= 1
            if outdeg[v] == 0:
                queue.append(v)

    ans.sort()
    return ans

