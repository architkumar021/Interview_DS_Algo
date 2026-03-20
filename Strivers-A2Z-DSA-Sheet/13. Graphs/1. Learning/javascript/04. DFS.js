/*
Question:
Given a connected undirected graph, perform Depth First Traversal (DFS) of the graph
starting from vertex 0 and visit all the nodes directly or indirectly connected to Node 0.

=== What is DFS? ===
DFS (Depth-First Search) explores a graph by going as DEEP as possible along one branch
before backtracking. It uses recursion (or an explicit stack) to remember where to go back.

Think of it like exploring a maze — you keep going forward until you hit a dead end,
then you backtrack and try the next path.

=== Step-by-Step Explanation ===
1. Start at the source node (vertex 0).
2. Mark it as visited and add it to the result.
3. Look at its neighbors one by one:
   - If a neighbor is NOT visited → recursively DFS into that neighbor (go deeper).
   - If a neighbor IS already visited → skip it.
4. When all neighbors of the current node are processed, the function returns
   (backtracks) to the previous node and continues with its remaining neighbors.
5. Repeat until all reachable nodes are visited.

=== Dry Run ===

Graph (Adjacency List):
    0 --- 1
    |     |
    2 --- 3
    |
    4

  adj[0] = [1, 2]
  adj[1] = [0, 3]
  adj[2] = [0, 3, 4]
  adj[3] = [1, 2]
  adj[4] = [2]

  V = 5, vis = [F, F, F, F, F], ans = []

  Step 1: dfs(0)
    → ans = [0], vis = [T, F, F, F, F]
    → neighbors of 0: [1, 2]
    → neighbor 1: not visited → go deeper

    Step 2: dfs(1)
      → ans = [0, 1], vis = [T, T, F, F, F]
      → neighbors of 1: [0, 3]
      → neighbor 0: already visited → skip
      → neighbor 3: not visited → go deeper

      Step 3: dfs(3)
        → ans = [0, 1, 3], vis = [T, T, F, T, F]
        → neighbors of 3: [1, 2]
        → neighbor 1: already visited → skip
        → neighbor 2: not visited → go deeper

        Step 4: dfs(2)
          → ans = [0, 1, 3, 2], vis = [T, T, T, T, F]
          → neighbors of 2: [0, 3, 4]
          → neighbor 0: already visited → skip
          → neighbor 3: already visited → skip
          → neighbor 4: not visited → go deeper

          Step 5: dfs(4)
            → ans = [0, 1, 3, 2, 4], vis = [T, T, T, T, T]
            → neighbors of 4: [2]
            → neighbor 2: already visited → skip
            → no more neighbors → BACKTRACK to dfs(2)

          ← back in dfs(2): no more neighbors → BACKTRACK to dfs(3)
        ← back in dfs(3): no more neighbors → BACKTRACK to dfs(1)
      ← back in dfs(1): no more neighbors → BACKTRACK to dfs(0)
    ← back in dfs(0): neighbor 2 already visited → skip
    → no more neighbors → DONE

  Final Result: ans = [0, 1, 3, 2, 4] ✅

  Call Stack Visualization:
    dfs(0) → dfs(1) → dfs(3) → dfs(2) → dfs(4)
                                            ↑ backtrack
                                  ↑ backtrack
                        ↑ backtrack
              ↑ backtrack
    ↑ done

=== Key Observations ===
- DFS follows one path as deep as possible before trying other paths.
- The recursion call stack naturally handles the "backtracking".
- The visited array prevents infinite loops (since the graph can have cycles).
- Order of traversal depends on the order of neighbors in the adjacency list.

Time Complexity:  O(V + E) — each vertex and edge is visited exactly once.
Space Complexity: O(V) — for the visited array + recursion stack (worst case: all nodes in a line).
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

