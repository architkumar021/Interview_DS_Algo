/*
Question:
Given a connected undirected graph, perform Depth First Traversal (DFS) of the graph
starting from vertex 0 and visit all the nodes directly or indirectly connected to Node 0.

Explanation:
- We initialize an empty array 'ans' to store the DFS traversal.
- We also initialize a 'vis' array to keep track of visited nodes, initialized with false for all nodes.
- We start DFS from vertex 0 by calling the recursive function 'dfs'.
- In the 'dfs' function, we push the current node into the 'ans' array and mark it as visited.
- For each adjacent vertex of the current node, if it has not been visited, we call the
  'dfs' function recursively for that vertex.
- We continue this process until all connected nodes are visited.
- Finally, we return the 'ans' array containing the DFS traversal.

Time Complexity:
- O(V + E), where V is the number of vertices and E is the number of edges.

Space Complexity:
- O(V), where V is the number of vertices, for the visited array and recursion stack.
*/

function dfs(node, adj, ans, vis) {
    ans.push(node);
    vis[node] = true;

    for (let neighbor of adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, ans, vis);
        }
    }
}

function dfsOfGraph(V, adj) {
    let ans = [];
    let vis = new Array(V).fill(false);
    dfs(0, adj, ans, vis);
    return ans;
}

