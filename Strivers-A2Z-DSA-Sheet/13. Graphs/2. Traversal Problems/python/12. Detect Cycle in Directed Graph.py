"""
=============================================================================
  QUESTION: Detect Cycle in a Directed Graph (GFG / LeetCode 207)
=============================================================================

  Given a Directed Graph with V vertices and E edges, check whether it
  contains any cycle or not.

  Example 1: (Has cycle)
    Edges: [[0,1],[1,2],[2,3],[3,1]]  →  cycle: 1 → 2 → 3 → 1

  Example 2: (No cycle)
    Edges: [[0,1],[1,2],[2,3]]

=============================================================================
  WHY IS DIRECTED GRAPH CYCLE DETECTION DIFFERENT FROM UNDIRECTED?
=============================================================================
  In directed graphs, a visited node doesn't always mean a cycle!
    0 → 1 → 3
    0 → 2 → 3   (node 3 visited twice, but NO cycle)

  KEY: Check if a node is in the CURRENT DFS PATH (recursion stack),
  not just globally visited.
=============================================================================
"""

from collections import deque


# ==========================================================================
# APPROACH 1: DFS with Path Visited (Recursion Stack)
# ==========================================================================
"""
  - vis[]      → globally visited
  - pathVis[]  → in current DFS path (recursion stack)
  - Enter node: vis = True, pathVis = True
  - Leave node: pathVis = False (backtrack)
  - If neighbor has pathVis = True → CYCLE!

  Time: O(V + E), Space: O(V)

  DRY RUN: edges = [[0,1],[1,2],[2,3],[3,1]], V=4
    Adj: 0→[1], 1→[2], 2→[3], 3→[1]

    vis     = [F, F, F, F]
    pathVis = [F, F, F, F]

    DFS(0):
      vis=[T,F,F,F], pathVis=[T,F,F,F]
      → neighbor 1 → DFS(1):
        vis=[T,T,F,F], pathVis=[T,T,F,F]
        → neighbor 2 → DFS(2):
          vis=[T,T,T,F], pathVis=[T,T,T,F]
          → neighbor 3 → DFS(3):
            vis=[T,T,T,T], pathVis=[T,T,T,T]
            → neighbor 1: vis=T AND pathVis=T
            → CYCLE FOUND! return True ✓

  Cycle: 1 → 2 → 3 → 1

  DRY RUN: edges = [[0,1],[1,2],[2,3]], V=4 (No cycle):
    DFS(0) → DFS(1) → DFS(2) → DFS(3)
      DFS(3): no neighbors → backtrack pathVis[3]=F
    ...all backtrack → return False ✓
"""


def dfs(node, adj, vis, path_vis):
    vis[node] = True
    path_vis[node] = True

    for neighbor in adj[node]:
        if not vis[neighbor]:
            if dfs(neighbor, adj, vis, path_vis):
                return True
        elif path_vis[neighbor]:
            return True  # In current path → CYCLE

    path_vis[node] = False  # Backtrack
    return False


def is_cyclic_dfs(edges, v, e):
    # Build adjacency list
    adj = [[] for _ in range(v)]
    for u, w in edges:
        adj[u].append(w)

    vis = [False] * v
    path_vis = [False] * v

    for i in range(v):
        if not vis[i]:
            if dfs(i, adj, vis, path_vis):
                return True
    return False


# ==========================================================================
# APPROACH 2: BFS (Kahn's Algorithm - Topological Sort)
# ==========================================================================
"""
  - If topological sort can't include all nodes → CYCLE EXISTS
  - Nodes in a cycle always have in-degree ≥ 1, never enter queue

  Time: O(V + E), Space: O(V)

  DRY RUN: edges = [[0,1],[1,2],[2,3],[3,1]], V=4 (Has cycle):
    Adj: 0→[1], 1→[2], 2→[3], 3→[1]
    In-degree: [0, 2, 1, 1]

    Queue = [0], count = 0

    Pop 0: count = 1
      neighbor 1: indeg 2→1 (not 0, skip)

    Queue empty. count=1 < V=4 → CYCLE EXISTS! ✓
    (Nodes 1,2,3 stuck in cycle, never reach indeg 0)

  DRY RUN: edges = [[0,1],[1,2],[2,3]], V=4 (No cycle):
    In-degree: [0, 1, 1, 1]

    Queue = [0] → Pop 0, count=1 → push 1
    Pop 1, count=2 → push 2
    Pop 2, count=3 → push 3
    Pop 3, count=4

    count=4 == V=4 → NO CYCLE ✓
"""


def is_cyclic_bfs(edges, v, e):
    # Build adjacency list and compute in-degrees
    adj = [[] for _ in range(v)]
    in_degree = [0] * v

    for u, w in edges:
        adj[u].append(w)
        in_degree[w] += 1

    # Push all nodes with in-degree 0
    queue = deque()
    for i in range(v):
        if in_degree[i] == 0:
            queue.append(i)

    # BFS
    count = 0
    while queue:
        node = queue.popleft()
        count += 1

        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Not all processed → cycle
    return count < v


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    # Test 1: Has cycle (1 → 2 → 3 → 1)
    edges1 = [[0, 1], [1, 2], [2, 3], [3, 1]]
    print("Test 1 (DFS):", is_cyclic_dfs(edges1, 4, 4))  # True
    print("Test 1 (BFS):", is_cyclic_bfs(edges1, 4, 4))  # True

    # Test 2: No cycle
    edges2 = [[0, 1], [1, 2], [2, 3]]
    print("Test 2 (DFS):", is_cyclic_dfs(edges2, 4, 3))  # False
    print("Test 2 (BFS):", is_cyclic_bfs(edges2, 4, 3))  # False

    # Test 3: Disconnected with cycle
    edges3 = [[0, 1], [2, 3], [3, 2]]
    print("Test 3 (DFS):", is_cyclic_dfs(edges3, 4, 3))  # True
    print("Test 3 (BFS):", is_cyclic_bfs(edges3, 4, 3))  # True
