"""
=============================================================================
  QUESTION: 785. Is Graph Bipartite? (LeetCode)
=============================================================================

  Given an undirected graph, determine if it is bipartite.

  A graph is bipartite if we can split ALL nodes into two groups (Set A & Set B)
  such that every edge goes from a node in Set A to a node in Set B.
  (No edge connects two nodes within the same set.)

  Think of it like coloring: Can you color every node with one of 2 colors
  such that no two adjacent nodes share the same color?

  Example 1:
    Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
    Output: false
    Explanation: Node 0 connects to 1,2,3. If 0 is RED, then 1,2,3 must be BLUE.
                 But node 1 connects to node 2, and both are BLUE → conflict!

  Example 2:
    Input: graph = [[1,3],[0,2],[1,3],[0,2]]
    Output: true
    Explanation: Set A = {0, 2}, Set B = {1, 3}. Every edge crosses sets.

=============================================================================
  KEY INSIGHT:
  - A graph is bipartite if and only if it contains NO ODD-LENGTH CYCLE.
  - We try to 2-color the graph. If we succeed → bipartite. If conflict → not.
  - Graph may be disconnected, so we must check ALL components.
=============================================================================
"""

from collections import deque


# ==========================================================================
# APPROACH 1: DFS (Depth First Search) - Coloring
# ==========================================================================
"""
  Idea:
  1. Use a color array initialized to 0 (unvisited).
  2. Pick any unvisited node, color it with 1 (RED).
  3. DFS: color all its neighbors with -1 (BLUE), and their neighbors with 1, etc.
  4. If we find a neighbor already colored with the SAME color → NOT bipartite.
  5. Repeat for all disconnected components.

  Time Complexity:  O(V + E) — visit every node and edge once
  Space Complexity: O(V)    — color array + recursion stack

  DRY RUN with graph = [[1,3],[0,2],[1,3],[0,2]]:
  ─────────────────────────────────────────────────
  color = [0, 0, 0, 0]   (all unvisited)

  Start DFS from node 0, color = 1 (RED):
    color = [1, 0, 0, 0]
    Visit neighbor 1 → unvisited → DFS(1, -1)
      color = [1, -1, 0, 0]
      Visit neighbor 0 → color[0]=1, not same as -1 → OK
      Visit neighbor 2 → unvisited → DFS(2, 1)
        color = [1, -1, 1, 0]
        Visit neighbor 1 → color[1]=-1, not same as 1 → OK
        Visit neighbor 3 → unvisited → DFS(3, -1)
          color = [1, -1, 1, -1]
          All neighbors colored with opposite → OK
          return True
        return True
      return True
    Visit neighbor 3 → color[3]=-1, not same as 1 → OK
    return True → BIPARTITE ✓
"""


def dfs(node, col, graph, color):
    color[node] = col  # Color current node

    for neighbor in graph[node]:
        if color[neighbor] == 0:
            # Unvisited → color with opposite and continue DFS
            if not dfs(neighbor, -col, graph, color):
                return False
        elif color[neighbor] == col:
            # Same color as current → conflict → NOT bipartite
            return False
    return True


def is_bipartite_dfs(graph):
    n = len(graph)
    color = [0] * n  # 0 = unvisited, 1 = RED, -1 = BLUE

    for i in range(n):
        if color[i] == 0:
            if not dfs(i, 1, graph, color):
                return False
    return True


# ==========================================================================
# APPROACH 2: BFS (Breadth First Search) - Coloring
# ==========================================================================
"""
  Idea:
  1. Same coloring logic, but use a queue (BFS) instead of recursion.
  2. For each unvisited node, push it into queue with color 1.
  3. Process queue: for each node, color all unvisited neighbors with opposite color.
  4. If any neighbor already has the SAME color → NOT bipartite.

  Time Complexity:  O(V + E)
  Space Complexity: O(V)

  DRY RUN with graph = [[1,2,3],[0,2],[0,1,3],[0,2]] (NOT bipartite):
  ────────────────────────────────────────────────────────────────────
  color = [0, 0, 0, 0]

  BFS from node 0, color it 1 (RED):
    queue = [0], color = [1, 0, 0, 0]

    Pop 0 (RED=1):
      neighbors 1,2,3 → all unvisited → color -1 (BLUE)
      color = [1,-1,-1,-1], queue = [1,2,3]

    Pop 1 (BLUE=-1):
      neighbor 0 → color=1, opposite → OK
      neighbor 2 → color=-1, SAME as -1 → CONFLICT! return False ✗

  Nodes 1 and 2 are both BLUE and adjacent → NOT bipartite.
"""


def is_bipartite_bfs(graph):
    n = len(graph)
    color = [0] * n

    for i in range(n):
        if color[i] != 0:
            continue

        # BFS from node i
        queue = deque([i])
        color[i] = 1  # Start with RED

        while queue:
            node = queue.popleft()

            for neighbor in graph[node]:
                if color[neighbor] == 0:
                    # Unvisited → color with opposite
                    color[neighbor] = -color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    # Same color → NOT bipartite
                    return False
    return True


# ==========================================================================
# DRIVER CODE
# ==========================================================================
if __name__ == "__main__":
    # Test Case 1: Bipartite
    graph1 = [[1, 3], [0, 2], [1, 3], [0, 2]]
    print("Graph 1 (DFS):", is_bipartite_dfs(graph1))  # True
    print("Graph 1 (BFS):", is_bipartite_bfs(graph1))  # True

    # Test Case 2: NOT Bipartite (odd cycle: 0-1-2-0)
    graph2 = [[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]
    print("Graph 2 (DFS):", is_bipartite_dfs(graph2))  # False
    print("Graph 2 (BFS):", is_bipartite_bfs(graph2))  # False

    # Test Case 3: Disconnected bipartite
    graph3 = [[1], [0], [3], [2]]
    print("Graph 3 (DFS):", is_bipartite_dfs(graph3))  # True
    print("Graph 3 (BFS):", is_bipartite_bfs(graph3))  # True

