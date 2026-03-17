/*
Question:
Given a Directed Graph with V vertices and E edges, check whether it contains any cycle
using Kahn's algorithm (Topological Sorting via BFS with indegree).

Approach:
- Calculate indegree for each node.
- Push all nodes with indegree 0 into a queue.
- Process nodes from queue, reducing indegrees of neighbors.
- If total processed nodes != V, a cycle exists.

Time Complexity: O(V + E)
Space Complexity: O(V)
*/

function isCyclic(V, adj) {
    let indeg = new Array(V).fill(0);

    // Calculate the indegree of each node
    for (let i = 0; i < V; i++) {
        for (let it of adj[i]) {
            indeg[it]++;
        }
    }

    let queue = [];
    for (let i = 0; i < V; i++) {
        if (indeg[i] === 0) queue.push(i);
    }

    let cnt = 0;

    while (queue.length > 0) {
        let node = queue.shift();
        cnt++;
        for (let i of adj[node]) {
            indeg[i]--;
            if (indeg[i] === 0) queue.push(i);
        }
    }

    return cnt !== V;
}

