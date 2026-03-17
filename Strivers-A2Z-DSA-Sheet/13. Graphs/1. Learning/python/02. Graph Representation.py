"""
Question:
Given the adjacency matrix representation of an undirected graph, your task is to return
the adjacency list of the graph where each adjacency list contains the vertex itself at
the first position and then all its adjacent nodes.

Explanation:
- We initialize an empty adjacency list (list of lists).
- For each vertex in the graph, we add the vertex itself as the first element of its adjacency list.
- Then, for each edge (u, v) in the graph, we add v to the adjacency list of u and u to the adjacency list of v.
- Finally, we return the adjacency list.

Time Complexity:
- O(m), where m is the number of edges in the graph, as we iterate through each edge once.

Space Complexity:
- O(n + 2 * m), where n is the number of vertices and 2 * m is the total number of elements
  in all adjacency lists, as each edge is represented twice.
"""


def print_adjacency(n, m, edges):
    # Initialize adjacency list with each vertex containing itself
    adj = [[i] for i in range(n)]

    # For each edge, add both directions (undirected graph)
    for e in edges:
        adj[e[0]].append(e[1])
        adj[e[1]].append(e[0])

    return adj

