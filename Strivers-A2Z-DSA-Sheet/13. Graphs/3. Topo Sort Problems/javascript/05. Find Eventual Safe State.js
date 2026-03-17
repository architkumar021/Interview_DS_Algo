/*
Question:
Find all safe nodes in a directed graph. A node is safe if every possible path
starting from that node leads to a terminal node.

Approach:
- Build reverse graph and track outdegree of each node.
- Start BFS from terminal nodes (outdegree 0).
- Nodes that become terminal during BFS are safe nodes.

Time Complexity: O(N + E)
Space Complexity: O(N + E)
*/

function eventualSafeNodes(graph) {
    let n = graph.length;
    let revadj = Array.from({ length: n }, () => []);
    let outdeg = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        outdeg[i] = graph[i].length;
        for (let j of graph[i]) {
            revadj[j].push(i);
        }
    }

    let queue = [];
    for (let i = 0; i < n; i++) {
        if (outdeg[i] === 0) queue.push(i);
    }

    let ans = [];
    while (queue.length > 0) {
        let next = [];
        for (let node of queue) {
            ans.push(node);
            for (let v of revadj[node]) {
                outdeg[v]--;
                if (outdeg[v] === 0) next.push(v);
            }
        }
        queue = next;
    }

    ans.sort((a, b) => a - b);
    return ans;
}

