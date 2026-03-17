/*
Question:
Given two words beginWord and endWord, and a dictionary wordList, return the number of words
in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
Every adjacent pair of words differs by a single letter.

Approach:
- Model as a graph where words differing by one letter are connected.
- Use BFS to find the shortest transformation sequence.

Time Complexity: O(n^2 * m) where n = wordList size, m = word length
Space Complexity: O(n^2)
*/

function isAdj(a, b) {
    let cnt = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            if (cnt > 0) return false;
            cnt++;
        }
    }
    return cnt === 1;
}

function ladderLength(beginWord, endWord, wordList) {
    wordList.push(beginWord);
    let n = wordList.length;

    // Create the adjacency list
    let adj = new Map();
    for (let i = 0; i < n; i++) {
        adj.set(wordList[i], []);
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && isAdj(wordList[i], wordList[j])) {
                adj.get(wordList[i]).push(wordList[j]);
            }
        }
    }

    let queue = [beginWord];
    let vis = new Set();
    vis.add(beginWord);
    let lvl = 1;

    // Perform BFS
    while (queue.length > 0) {
        let next = [];
        for (let node of queue) {
            if (node === endWord) return lvl;
            for (let s of (adj.get(node) || [])) {
                if (!vis.has(s)) {
                    vis.add(s);
                    next.push(s);
                }
            }
        }
        queue = next;
        lvl++;
    }

    return 0;
}

