/*
=============================================================================
  QUESTION: Shortest Path in Undirected Graph with Unit Distance (GFG)
=============================================================================

  Given an undirected graph with N vertices and M edges where each edge
  has unit weight (weight = 1), find the shortest path from a given source
  vertex 'src' to ALL other vertices. If a vertex is unreachable, return -1.

  Example:
    N = 9, M = 10, src = 0
    Edges: [[0,1],[0,3],[3,4],[4,5],[5,6],[1,2],[2,6],[6,7],[7,8],[6,8]]

    Output: [0, 1, 2, 1, 2, 3, 3, 4, 4]

    Explanation:
      - 0 → 0 = 0 (source itself)
      - 0 → 1 = 1 (direct edge)
      - 0 → 2 = 2 (0 → 1 → 2)
      - 0 → 3 = 1 (direct edge)
      - 0 → 4 = 2 (0 → 3 → 4)
      - 0 → 5 = 3 (0 → 3 → 4 → 5)
      - 0 → 6 = 3 (0 → 1 → 2 → 6)
      - 0 → 7 = 4 (0 → 1 → 2 → 6 → 7)
      - 0 → 8 = 4 (0 → 1 → 2 → 6 → 8)

=============================================================================
  WHY BFS WORKS FOR UNIT WEIGHT GRAPHS
=============================================================================

  In BFS, we explore nodes level by level. Since every edge has weight = 1,
  each level increases the distance by exactly 1. So the first time we reach
  a node, it's guaranteed to be the shortest distance.

  This is NOT true for weighted graphs — that's where we need Dijkstra.

=============================================================================
  APPROACH 1: Brute Force — Check all paths (DFS/backtracking)
=============================================================================

  Idea: From source, try ALL possible paths to every node using DFS.
  Track the minimum distance found for each node.

  Time Complexity:  O(V!) in worst case — exponential, impractical
  Space Complexity: O(V) for recursion stack

  This is NOT recommended. Shown only for understanding why BFS is better.

=============================================================================
*/

// Brute Force — DFS exploring all paths (DO NOT USE for large inputs)
function shortestPathBrute(edges, N, M, src) {
    // Step 1: Build adjacency list
    let adj = Array.from({ length: N }, () => []);
    for (let edge of edges) {
        adj[edge[0]].push(edge[1]);
        adj[edge[1]].push(edge[0]);
    }

    // Step 2: Initialize distances as Infinity
    let dist = new Array(N).fill(Infinity);
    dist[src] = 0;

    // Step 3: DFS from source, trying all paths
    function dfs(node, currentDist) {
        // If we already found a shorter or equal path to this node, skip
        // (but allow the first call for the source node)
        if (currentDist > dist[node]) return;

        // Update shortest distance
        dist[node] = currentDist;

        // Explore all neighbors
        for (let neighbor of adj[node]) {
            dfs(neighbor, currentDist + 1);
        }
    }

    dfs(src, 0);

    // Step 4: Replace Infinity with -1 for unreachable nodes
    for (let i = 0; i < N; i++) {
        if (dist[i] === Infinity) dist[i] = -1;
    }

    return dist;
}

/*
=============================================================================
  APPROACH 2: Optimal — BFS (Breadth First Search)
=============================================================================

  Idea:
    - Start BFS from source node.
    - BFS explores all nodes at distance 'd' before exploring nodes at 'd+1'.
    - Since all edges have weight 1, BFS naturally finds shortest paths.

  Algorithm:
    1. Build adjacency list from edges.
    2. Create distance array, initialize all to Infinity, set dist[src] = 0.
    3. Push source into queue.
    4. For each node popped from queue, check all neighbors.
       - If dist[neighbor] > dist[node] + 1, update and push to queue.
    5. Replace Infinity with -1 for unreachable nodes.

  Time Complexity:  O(N + M) — each node and edge visited once
  Space Complexity: O(N + M) — adjacency list + queue + distance array

  Dry Run:
    N=6, edges=[[0,1],[0,3],[1,2],[1,3],[3,4],[4,5]], src=0

    Adjacency List:
      0 → [1, 3]
      1 → [0, 2, 3]
      2 → [1]
      3 → [0, 1, 4]
      4 → [3, 5]
      5 → [4]

    Initial: dist = [0, ∞, ∞, ∞, ∞, ∞], queue = [0]

    Step 1: Pop 0
      → neighbor 1: dist[1] = ∞ > 0+1=1 → dist[1] = 1, push 1
      → neighbor 3: dist[3] = ∞ > 0+1=1 → dist[3] = 1, push 3
      dist = [0, 1, ∞, 1, ∞, ∞], queue = [1, 3]

    Step 2: Pop 1
      → neighbor 0: dist[0] = 0, 0 < 1+1 → skip
      → neighbor 2: dist[2] = ∞ > 1+1=2 → dist[2] = 2, push 2
      → neighbor 3: dist[3] = 1, 1 < 1+1 → skip
      dist = [0, 1, 2, 1, ∞, ∞], queue = [3, 2]

    Step 3: Pop 3
      → neighbor 0: dist[0] = 0 → skip
      → neighbor 1: dist[1] = 1 → skip
      → neighbor 4: dist[4] = ∞ > 1+1=2 → dist[4] = 2, push 4
      dist = [0, 1, 2, 1, 2, ∞], queue = [2, 4]

    Step 4: Pop 2
      → neighbor 1: dist[1] = 1 → skip
      dist = [0, 1, 2, 1, 2, ∞], queue = [4]

    Step 5: Pop 4
      → neighbor 3: dist[3] = 1 → skip
      → neighbor 5: dist[5] = ∞ > 2+1=3 → dist[5] = 3, push 5
      dist = [0, 1, 2, 1, 2, 3], queue = [5]

    Step 6: Pop 5
      → neighbor 4: dist[4] = 2 → skip
      queue = []  →  DONE

    Final: dist = [0, 1, 2, 1, 2, 3] ✓

=============================================================================
*/

function shortestPath(edges, N, M, src) {
    // Step 1: Build adjacency list
    let adj = Array.from({ length: N }, () => []);
    for (let edge of edges) {
        adj[edge[0]].push(edge[1]);
        adj[edge[1]].push(edge[0]);
    }

    // Step 2: Initialize distances — all Infinity except source = 0
    let dist = new Array(N).fill(Infinity);
    dist[src] = 0;

    // Step 3: BFS using queue
    let queue = [src];

    while (queue.length > 0) {
        let node = queue.shift(); // Dequeue front node

        // Explore all neighbors
        for (let neighbor of adj[node]) {
            // If we found a shorter path to neighbor
            if (dist[neighbor] > dist[node] + 1) {
                dist[neighbor] = dist[node] + 1;
                queue.push(neighbor);
            }
        }
    }

    // Step 4: Replace Infinity with -1 (unreachable nodes)
    for (let i = 0; i < N; i++) {
        if (dist[i] === Infinity) dist[i] = -1;
    }

    return dist;
}

/*
=============================================================================
  APPROACH 3: Alternative BFS — Level-by-Level Traversal
=============================================================================

  Instead of checking dist, we process level by level and use a visited array.
  Each level corresponds to distance incremented by 1.

  Same complexity as above, just a different implementation style.

=============================================================================
*/

function shortestPathLevelBFS(edges, N, M, src) {
    // Step 1: Build adjacency list
    let adj = Array.from({ length: N }, () => []);
    for (let edge of edges) {
        adj[edge[0]].push(edge[1]);
        adj[edge[1]].push(edge[0]);
    }

    // Step 2: Initialize visited and distance arrays
    let visited = new Array(N).fill(false);
    let dist = new Array(N).fill(-1);

    // Step 3: BFS — level by level
    let queue = [src];
    visited[src] = true;
    let level = 0;

    while (queue.length > 0) {
        let nextLevel = [];

        for (let node of queue) {
            dist[node] = level; // All nodes in this batch are at same distance

            for (let neighbor of adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    nextLevel.push(neighbor);
                }
            }
        }

        queue = nextLevel;
        level++;
    }

    return dist;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. For UNIT weight graphs → Use BFS (O(N + M))
  2. For NON-NEGATIVE weighted graphs → Use Dijkstra's (O((V+E) log V))
  3. For NEGATIVE weights (no neg cycle) → Use Bellman-Ford (O(V * E))
  4. For ALL pairs shortest path → Use Floyd-Warshall (O(V^3))

  BFS gives shortest path ONLY when all edges have equal weight.
  Using Dijkstra here is overkill — BFS is simpler and faster.

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let edges = [[0,1],[0,3],[1,2],[1,3],[3,4],[4,5]];
    let N = 6, M = 6, src = 0;

    console.log("Brute Force:", shortestPathBrute(edges, N, M, src));
    // Output: [0, 1, 2, 1, 2, 3]

    console.log("BFS Optimal:", shortestPath(edges, N, M, src));
    // Output: [0, 1, 2, 1, 2, 3]

    console.log("BFS Level-by-Level:", shortestPathLevelBFS(edges, N, M, src));
    // Output: [0, 1, 2, 1, 2, 3]
}

test();
