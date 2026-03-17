"""
Question:
Given a Directed Graph with V vertices and E edges, find the number of
strongly connected components in the graph.

Approach:
1. Kosaraju's algorithm: two DFS traversals.
2. First DFS: get topological ordering (finish time order).
3. Build reverse graph.
4. Second DFS: traverse in reverse finish-time order on reversed graph.
   Each new DFS call = one new SCC.

Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""


def topo(node, vis, adj, stack):
    vis[node] = True
    for v in adj[node]:
        if not vis[v]:
            topo(v, vis, adj, stack)
    stack.append(node)


def dfs(node, vis, revadj):
    vis[node] = True
    for v in revadj[node]:
        if not vis[v]:
            dfs(v, vis, revadj)


def kosaraju(V, adj):
    stack = []
    vis = [False] * V
    for i in range(V):
        if not vis[i]:
            topo(i, vis, adj, stack)

    revadj = [[] for _ in range(V)]
    for i in range(V):
        for j in adj[i]:
            revadj[j].append(i)

    ans = 0
    visi = [False] * V
    while stack:
        node = stack.pop()
        if not visi[node]:
            dfs(node, visi, revadj)
            ans += 1
    return ans

