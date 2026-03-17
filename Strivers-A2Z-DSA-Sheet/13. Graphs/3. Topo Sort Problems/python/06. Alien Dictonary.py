"""
Question:
Given a sorted dictionary of an alien language having N words and K starting alphabets,
find the order of characters in the alien language.

Approach:
- Compare adjacent words to determine character ordering (directed edges).
- Use Kahn's algorithm (topological sort) to determine the full order.

Time Complexity: O(N)
Space Complexity: O(K)
"""

from collections import deque


def set_adj(a, b, adj, indeg):
    n = min(len(a), len(b))
    for i in range(n):
        if a[i] != b[i]:
            u = ord(a[i]) - ord('a')
            v = ord(b[i]) - ord('a')
            adj[u].append(v)
            indeg[v] += 1
            break


def find_order(dictionary, N, K):
    adj = [[] for _ in range(K)]
    indeg = [0] * K

    for i in range(1, N):
        set_adj(dictionary[i - 1], dictionary[i], adj, indeg)

    queue = deque()
    for i in range(K):
        if indeg[i] == 0:
            queue.append(i)

    ans = ""
    while queue:
        node = queue.popleft()
        ans += chr(node + ord('a'))
        for v in adj[node]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    return ans

