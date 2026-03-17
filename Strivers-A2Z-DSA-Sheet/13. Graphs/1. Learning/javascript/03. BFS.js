/*
Question:
Given a directed graph, perform Breadth First Traversal (BFS) of the graph starting from
vertex 0 and visit all the nodes directly or indirectly connected to Node 0.

Explanation:
- We initialize an empty array 'ans' to store the BFS traversal.
- We also initialize a 'vis' array to keep track of visited nodes, initialized with false for all nodes.
- We use a queue to perform BFS. We start by pushing vertex 0 into the queue and mark it as visited.
- While the queue is not empty, we shift the front element and add it to the 'ans' array.
- For each adjacent vertex of the current node, if it has not been visited, we push it into
  the queue and mark it as visited.
- We continue this process until the queue becomes empty and all connected nodes are visited.
- Finally, we return the 'ans' array containing the BFS traversal.

Time Complexity:
- O(V + E), where V is the number of vertices and E is the number of edges.

Space Complexity:
- O(V), where V is the number of vertices, for the visited array and the queue.
*/

function bfsOfGraph(V, adj) {
    let ans = [];
    let vis = new Array(V).fill(false);

    let queue = [];
    queue.push(0);
    vis[0] = true;

    while (queue.length > 0) {
        let node = queue.shift();
        ans.push(node);

        for (let neighbor of adj[node]) {
            if (!vis[neighbor]) {
                queue.push(neighbor);
                vis[neighbor] = true;
            }
        }
    }

    return ans;
}

