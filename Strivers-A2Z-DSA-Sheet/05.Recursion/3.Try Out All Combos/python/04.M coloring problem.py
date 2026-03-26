"""
=============================================================================
  QUESTION: M-Coloring Problem (GFG)
=============================================================================

  Can graph be colored with at most M colors? No two adjacent same color.

  APPROACH: Backtracking — try colors 1..M for each node.
  is_possible: check no neighbor has same color.

  DRY RUN triangle graph (0-1,1-2,0-2), M=3:
    Node 0→color 1, Node 1→color 1 CLASH→color 2,
    Node 2→color 1 CLASH→color 2 CLASH→color 3 → [1,2,3] ✓
  M=2: All combinations fail (triangle needs 3 colors) → False ✓

  Time: O(M^N), Space: O(N)
=============================================================================
"""


def is_possible(graph, color, n, col, node):
    for k in range(n):
        if k != node and graph[node][k] == 1 and color[k] == col:
            return False
    return True


def solve(graph, m, n, color, node):
    if node == n:
        return True

    for i in range(1, m + 1):
        if is_possible(graph, color, n, i, node):
            color[node] = i
            if solve(graph, m, n, color, node + 1):
                return True
            color[node] = 0  # Backtrack

    return False


def graph_coloring(graph, m, n):
    color = [0] * n
    return solve(graph, m, n, color, 0)


# Driver Code
if __name__ == "__main__":
    graph = [
        [0, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 1],
        [1, 0, 1, 0]
    ]
    print(graph_coloring(graph, 3, 4))  # True
    print(graph_coloring(graph, 2, 4))  # False

