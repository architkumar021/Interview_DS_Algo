"""
Question:
There are numCourses courses. Given prerequisites, return true if you can finish all courses.

Approach:
- Model as a directed graph with Kahn's algorithm (topological sort).
- If we can process all nodes, no cycle → can finish all courses.

Time Complexity: O(N + E)
Space Complexity: O(N + E)
"""

from collections import deque


def can_finish(numCourses, prerequisites):
    indeg = [0] * numCourses
    adj = [[] for _ in range(numCourses)]

    for it in prerequisites:
        indeg[it[0]] += 1
        adj[it[1]].append(it[0])

    queue = deque()
    for i in range(numCourses):
        if indeg[i] == 0:
            queue.append(i)

    cnt = 0
    while queue:
        node = queue.popleft()
        cnt += 1
        for v in adj[node]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    return cnt == numCourses

