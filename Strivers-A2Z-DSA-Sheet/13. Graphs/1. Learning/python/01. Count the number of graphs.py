"""
Question:-

Count the number of undirected graphs that can be formed with n vertices.

Approach:-
- Calculate the number of edges with formula n*(n-1)/2
- Return 2^edges

Complexity Analysis:-

Time Complexity = O(1)
Space Complexity = O(1)
"""


def counting_graphs(n):
    edges = (n * (n - 1)) // 2
    return 2 ** edges

