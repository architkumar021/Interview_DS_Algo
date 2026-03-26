/*
=============================================================================
  QUESTION: 785. Is Graph Bipartite? (LeetCode)
=============================================================================

  Given an undirected graph, determine if it is bipartite.

  A graph is bipartite if we can split ALL nodes into two groups (Set A & Set B)
  such that every edge goes from a node in Set A to a node in Set B.
  (No edge connects two nodes within the same set.)

  Think of it like coloring: Can you color every node with one of 2 colors
  such that no two adjacent nodes share the same color?

  Example 1:
    Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
    Output: false
    Explanation: Node 0 connects to 1,2,3. If 0 is RED, then 1,2,3 must be BLUE.
                 But node 1 connects to node 2, and both are BLUE → conflict!

  Example 2:
    Input: graph = [[1,3],[0,2],[1,3],[0,2]]
    Output: true
    Explanation: Set A = {0, 2}, Set B = {1, 3}. Every edge crosses sets.

=============================================================================
  KEY INSIGHT:
  - A graph is bipartite if and only if it contains NO ODD-LENGTH CYCLE.
  - We try to 2-color the graph. If we succeed → bipartite. If conflict → not.
  - Graph may be disconnected, so we must check ALL components.

=============================================================================
  NOTE: WHY NO ADJACENCY LIST CONSTRUCTION?
=============================================================================
  The input `graph` is ALREADY an adjacency list:
    graph[0] = [1, 3] means node 0 connects to nodes 1 and 3.
  So we can directly use `graph[node]` to get all neighbors.

  When to build adjacency list yourself:
  ┌──────────────────────────────┬────────────┐
  │ Input Format                 │ Build Adj? │
  ├──────────────────────────────┼────────────┤
  │ graph[i] = [neighbors]       │ ❌ No      │
  │ edges = [[u,v], [u,v], ...]  │ ✅ Yes     │
  │ n + edges list               │ ✅ Yes     │
  │ Adjacency matrix[i][j]       │ ✅ Yes     │
  └──────────────────────────────┴────────────┘

  How to build from edge list (for reference):
    let adj = Array.from({length: n}, () => []);
    for (let [u, v] of edges) {
        adj[u].push(v);   // u → v
        adj[v].push(u);   // v → u (undirected)
    }
=============================================================================
*/

// ==========================================================================
// APPROACH 1: DFS (Depth First Search) - Coloring
// ==========================================================================
/*
  Idea:
  1. Use a color array initialized to 0 (unvisited).
  2. Pick any unvisited node, color it with 1 (RED).
  3. DFS: color all its neighbors with -1 (BLUE), and their neighbors with 1, etc.
  4. If we find a neighbor already colored with the SAME color → NOT bipartite.
  5. Repeat for all disconnected components.

  Time Complexity:  O(V + E) — visit every node and edge once
  Space Complexity: O(V)    — color array + recursion stack

  DRY RUN with graph = [[1,3],[0,2],[1,3],[0,2]]:
  ─────────────────────────────────────────────────
  Adjacency:
    0 → [1, 3]
    1 → [0, 2]
    2 → [1, 3]
    3 → [0, 2]

  color = [0, 0, 0, 0]   (all unvisited)

  Start DFS from node 0, color = 1 (RED):
    color = [1, 0, 0, 0]
    Visit neighbor 1 → unvisited → DFS(1, -1)
      color = [1, -1, 0, 0]
      Visit neighbor 0 → color[0]=1, not same as -1 → OK (skip)
      Visit neighbor 2 → unvisited → DFS(2, 1)
        color = [1, -1, 1, 0]
        Visit neighbor 1 → color[1]=-1, not same as 1 → OK (skip)
        Visit neighbor 3 → unvisited → DFS(3, -1)
          color = [1, -1, 1, -1]
          Visit neighbor 0 → color[0]=1, not same as -1 → OK
          Visit neighbor 2 → color[2]=1, not same as -1 → OK
          return true
        return true
      return true
    Visit neighbor 3 → color[3]=-1, not same as 1 → OK
    return true

  All nodes visited, no conflict → return true ✓
*/

function isBipartiteDFS(graph) {
    let n = graph.length;
    // color[i] = 0 means unvisited, 1 = RED, -1 = BLUE
    let color = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        // Check each disconnected component
        if (color[i] === 0) {
            if (!dfs(i, 1, graph, color)) {
                return false;
            }
        }
    }
    return true;
}

function dfs(node, col, graph, color) {
    color[node] = col; // Color current node

    for (let neighbor of graph[node]) {
        if (color[neighbor] === 0) {
            // Unvisited → color with opposite and continue DFS
            if (!dfs(neighbor, -col, graph, color)) {
                return false;
            }
        } else if (color[neighbor] === col) {
            // Same color as current → conflict → NOT bipartite
            return false;
        }
        // else: already colored with opposite color → no conflict, skip
    }
    return true;
}


// ==========================================================================
// APPROACH 2: BFS (Breadth First Search) - Coloring
// ==========================================================================
/*
  Idea:
  1. Same coloring logic, but use a queue (BFS) instead of recursion.
  2. For each unvisited node, push it into queue with color 1.
  3. Process queue: for each node, color all unvisited neighbors with opposite color.
  4. If any neighbor already has the SAME color → NOT bipartite.

  Time Complexity:  O(V + E)
  Space Complexity: O(V)

  DRY RUN with graph = [[1,2,3],[0,2],[0,1,3],[0,2]] (NOT bipartite):
  ────────────────────────────────────────────────────────────────────
  Adjacency:
    0 → [1, 2, 3]
    1 → [0, 2]
    2 → [0, 1, 3]
    3 → [0, 2]

  color = [0, 0, 0, 0]

  Start BFS from node 0, color it 1 (RED):
    color = [1, 0, 0, 0], queue = [0]

    Pop 0 (RED=1):
      neighbor 1 → unvisited → color -1 (BLUE), push → color = [1,-1,0,0], queue = [1]
      neighbor 2 → unvisited → color -1 (BLUE), push → color = [1,-1,-1,0], queue = [1,2]
      neighbor 3 → unvisited → color -1 (BLUE), push → color = [1,-1,-1,-1], queue = [1,2,3]

    Pop 1 (BLUE=-1):
      neighbor 0 → color[0]=1, opposite of -1 → OK
      neighbor 2 → color[2]=-1, SAME as -1 → CONFLICT! return false ✗

  Node 1 (BLUE) and Node 2 (BLUE) are adjacent → NOT bipartite.
*/

function isBipartiteBFS(graph) {
    let n = graph.length;
    let color = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        if (color[i] !== 0) continue; // Already visited

        // BFS from node i
        let queue = [i];
        color[i] = 1; // Start with RED

        while (queue.length > 0) {
            let node = queue.shift();

            for (let neighbor of graph[node]) {
                if (color[neighbor] === 0) {
                    // Unvisited → color with opposite
                    color[neighbor] = -color[node];
                    queue.push(neighbor);
                } else if (color[neighbor] === color[node]) {
                    // Same color → NOT bipartite
                    return false;
                }
            }
        }
    }
    return true;
}


// ==========================================================================
// DRIVER CODE
// ==========================================================================
// Test Case 1: Bipartite graph
let graph1 = [[1,3],[0,2],[1,3],[0,2]];
console.log("Graph 1 (DFS):", isBipartiteDFS(graph1)); // true
console.log("Graph 1 (BFS):", isBipartiteBFS(graph1)); // true

// Test Case 2: NOT Bipartite graph (odd cycle: 0-1-2-0)
let graph2 = [[1,2,3],[0,2],[0,1,3],[0,2]];
console.log("Graph 2 (DFS):", isBipartiteDFS(graph2)); // false
console.log("Graph 2 (BFS):", isBipartiteBFS(graph2)); // false

// Test Case 3: Disconnected bipartite graph
let graph3 = [[1],[0],[3],[2]];
console.log("Graph 3 (DFS):", isBipartiteDFS(graph3)); // true
console.log("Graph 3 (BFS):", isBipartiteBFS(graph3)); // true
