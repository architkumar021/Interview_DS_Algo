"""
Question:
Given two words beginWord and endWord, and a dictionary wordList, return the number of words
in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Approach:
- Model as a graph where words differing by one letter are connected.
- Use BFS to find the shortest transformation sequence.

Time Complexity: O(n^2 * m)
Space Complexity: O(n^2)
"""

from collections import deque


def is_adj(a, b):
    cnt = 0
    for i in range(len(a)):
        if a[i] != b[i]:
            if cnt > 0:
                return False
            cnt += 1
    return cnt == 1


def ladder_length(beginWord, endWord, wordList):
    wordList.append(beginWord)
    n = len(wordList)

    # Create the adjacency list
    adj = {word: [] for word in wordList}
    for i in range(n):
        for j in range(n):
            if i != j and is_adj(wordList[i], wordList[j]):
                adj[wordList[i]].append(wordList[j])

    queue = deque([beginWord])
    vis = {beginWord}
    lvl = 1

    # Perform BFS
    while queue:
        size = len(queue)
        for _ in range(size):
            node = queue.popleft()
            if node == endWord:
                return lvl
            for s in adj.get(node, []):
                if s not in vis:
                    vis.add(s)
                    queue.append(s)
        lvl += 1

    return 0

