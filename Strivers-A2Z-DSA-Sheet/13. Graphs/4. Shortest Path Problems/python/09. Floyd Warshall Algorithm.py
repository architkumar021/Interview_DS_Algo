"""
Question:
Find the shortest distances between every pair of vertices in a given
edge-weighted directed graph. matrix[i][j] = -1 means no edge from i to j.

Approach:
- Floyd-Warshall: For each intermediate vertex k, update
  dist(i,j) = min(dist(i,j), dist(i,k) + dist(k,j)).

Time Complexity: O(V^3)
Space Complexity: O(1) (in-place)
"""


def shortest_distance(matrix):
    v = len(matrix)

    # Replace -1 with infinity
    for i in range(v):
        for j in range(v):
            if matrix[i][j] == -1:
                matrix[i][j] = int(1e9)

    for k in range(v):
        for i in range(v):
            for j in range(v):
                if i == j:
                    matrix[i][j] = 0
                matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])

    # Replace infinity back with -1
    for i in range(v):
        for j in range(v):
            if matrix[i][j] == int(1e9):
                matrix[i][j] = -1

