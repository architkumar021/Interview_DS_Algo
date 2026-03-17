/*
Question:
Given a sorted dictionary of an alien language having N words and K starting alphabets,
find the order of characters in the alien language.

Approach:
- Compare adjacent words to determine character ordering (directed edges).
- Use Kahn's algorithm (topological sort) to determine the full order.

Time Complexity: O(N)
Space Complexity: O(K)
*/

function setAdj(a, b, adj, indeg) {
    let n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
        if (a[i] !== b[i]) {
            let u = a.charCodeAt(i) - 97;
            let v = b.charCodeAt(i) - 97;
            adj[u].push(v);
            indeg[v]++;
            break;
        }
    }
}

function findOrder(dict, N, K) {
    let adj = Array.from({ length: K }, () => []);
    let indeg = new Array(K).fill(0);

    // Set the directed edges and indegrees
    for (let i = 1; i < N; i++) {
        setAdj(dict[i - 1], dict[i], adj, indeg);
    }

    let queue = [];
    for (let i = 0; i < K; i++) {
        if (indeg[i] === 0) queue.push(i);
    }

    let ans = "";
    while (queue.length > 0) {
        let next = [];
        for (let node of queue) {
            ans += String.fromCharCode(node + 97);
            for (let v of adj[node]) {
                indeg[v]--;
                if (indeg[v] === 0) next.push(v);
            }
        }
        queue = next;
    }

    return ans;
}

