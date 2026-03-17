"""
Question:
Find all critical connections (bridges) in a network of n servers.
A critical connection is one that, if removed, disconnects some servers.

Approach:
1. Use Tarjan's algorithm to find bridges in an undirected graph.
2. Perform DFS and track tin[] (discovery time) and low[] (lowest reachable time).
3. If low[v] > tin[u] for edge (u,v), it's a bridge.

Time Complexity: O(n + m)
Space Complexity: O(n + m)
"""


def critical_connections(n, connections):
    timer = [0]
    adj = [[] for _ in range(n)]
    for c in connections:
        adj[c[0]].append(c[1])
        adj[c[1]].append(c[0])

    ans = []
    vis = [False] * n
    tin = [0] * n
    low = [0] * n

    def dfs(node, parent):
        vis[node] = True
        low[node] = tin[node] = timer[0]
        timer[0] += 1

        for v in adj[node]:
            if v == parent:
                continue
            if vis[v]:
                low[node] = min(low[node], low[v])
            else:
                dfs(v, node)
                low[node] = min(low[node], low[v])
                if low[v] > tin[node]:
                    ans.append([v, node])

    dfs(0, -1)
    return ans

