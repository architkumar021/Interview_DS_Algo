"""
Question:
Given a connected undirected graph, perform Depth First Traversal (DFS) of the graph
starting from vertex 0 and visit all the nodes directly or indirectly connected to Node 0.

Explanation:
- We initialize an empty list 'ans' to store the DFS traversal.
- We also initialize a 'vis' list to keep track of visited nodes, initialized with False for all nodes.
- We start DFS from vertex 0 by calling the recursive function 'dfs'.
- In the 'dfs' function, we append the current node to the 'ans' list and mark it as visited.
- For each adjacent vertex of the current node, if it has not been visited, we call the
  'dfs' function recursively for that vertex.
- We continue this process until all connected nodes are visited.
- Finally, we return the 'ans' list containing the DFS traversal.

Time Complexity:
- O(V + E), where V is the number of vertices and E is the number of edges.

Space Complexity:
- O(V), where V is the number of vertices, for the visited list and recursion stack.
"""


def dfs(node, adj, ans, vis):
    ans.append(node)
    vis[node] = True

    for neighbor in adj[node]:
        if not vis[neighbor]:
            dfs(neighbor, adj, ans, vis)


def dfs_of_graph(V, adj):
    ans = []
    vis = [False] * V
    dfs(0, adj, ans, vis)
    return ans

