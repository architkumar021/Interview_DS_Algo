"""
Question:
Given a directed graph, perform Breadth First Traversal (BFS) of the graph starting from
vertex 0 and visit all the nodes directly or indirectly connected to Node 0.

Explanation:
- We initialize an empty list 'ans' to store the BFS traversal.
- We also initialize a 'vis' list to keep track of visited nodes, initialized with False for all nodes.
- We use a deque to perform BFS. We start by pushing vertex 0 into the queue and mark it as visited.
- While the queue is not empty, we pop the front element and add it to the 'ans' list.
- For each adjacent vertex of the current node, if it has not been visited, we push it into
  the queue and mark it as visited.
- We continue this process until the queue becomes empty and all connected nodes are visited.
- Finally, we return the 'ans' list containing the BFS traversal.

Time Complexity:
- O(V + E), where V is the number of vertices and E is the number of edges.

Space Complexity:
- O(V), where V is the number of vertices, for the visited list and the queue.
"""

from collections import deque


def bfs_of_graph(V, adj):
    ans = []
    vis = [False] * V

    queue = deque()
    queue.append(0)
    vis[0] = True

    while queue:
        node = queue.popleft()
        ans.append(node)

        for neighbor in adj[node]:
            if not vis[neighbor]:
                queue.append(neighbor)
                vis[neighbor] = True

    return ans

