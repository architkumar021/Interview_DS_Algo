"""
Question:
Return the ordering of courses you should take to finish all courses.
If impossible, return an empty list.

Approach:
- Use Kahn's algorithm (topological sort via BFS with indegree).
- The order in which nodes are popped is the course order.

Time Complexity: O(N + E)
Space Complexity: O(N + E)
"""

from collections import deque


def find_order(numCourses, prerequisites):
    indeg = [0] * numCourses
    adj = [[] for _ in range(numCourses)]

    for it in prerequisites:
        indeg[it[0]] += 1
        adj[it[1]].append(it[0])

    queue = deque()
    for i in range(numCourses):
        if indeg[i] == 0:
            queue.append(i)

    course_order = []
    while queue:
        node = queue.popleft()
        course_order.append(node)
        for v in adj[node]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    if len(course_order) == numCourses:
        return course_order
    return []

