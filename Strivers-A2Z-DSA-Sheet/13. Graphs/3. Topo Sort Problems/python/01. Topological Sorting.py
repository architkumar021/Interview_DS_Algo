"""
Question:
Given a DAG (directed acyclic graph), print the Topological sorting of a given graph.

Approach:
- Perform DFS. As we finish exploring a node and backtrack, add it to the result.
- Reverse the result to get the topological order.

Time Complexity: O(V + E)
Space Complexity: O(V)
"""


def dfs(node, adj, vis, ans):
    vis[node] = True
    for v in adj[node]:
        if not vis[v]:
            dfs(v, adj, vis, ans)
    ans.append(node)


def topological_sort(graph, edges, nodes):
    adj = [[] for _ in range(nodes)]
    for it in graph:
        adj[it[0]].append(it[1])
    vis = [False] * nodes
    ans = []
    for i in range(nodes):
        if not vis[i]:
            dfs(i, adj, vis, ans)

    ans.reverse()
    return ans

