/*
=============================================================================
  QUESTION: Shortest Path in a DAG (Directed Acyclic Graph) — GFG
=============================================================================

  Given a DAG with N vertices (0 to N-1) and M weighted edges, find the
  shortest path from source vertex (vertex 0) to all other vertices.
  If a vertex is unreachable from source, return -1 for that vertex.

  Example:
    N = 6, M = 7
    Edges: [[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]]

    Graph:
      0 --2--> 1 --3--> 2 --6--> 3
      |                  ^        ^
      +--1--> 4 --2-----+   4 ---+--1-- 5
              |                        ^
              +----------4-------------+

    Output: [0, 2, 3, 6, 1, 5]

    Explanation:
      - 0 → 0 = 0 (source)
      - 0 → 1 = 2 (direct edge, weight 2)
      - 0 → 2 = 3 (0→4→2, weight 1+2=3, better than 0→1→2=5)
      - 0 → 3 = 6 (0→4→5→3, weight 1+4+1=6, better than 0→4→2→3=9)
      - 0 → 4 = 1 (direct edge, weight 1)
      - 0 → 5 = 5 (0→4→5, weight 1+4=5)

=============================================================================
  WHY TOPOLOGICAL SORT WORKS FOR DAGs
=============================================================================

  Key Insight: In a DAG, topological order ensures that when we process a
  node, ALL nodes that could provide a shorter path to it have ALREADY been
  processed. So we can relax edges in topological order and get correct
  shortest distances in a single pass.

  This is MORE EFFICIENT than Dijkstra for DAGs:
    - Topo Sort + Relax = O(N + M)
    - Dijkstra = O((N + M) log N)

  Note: This approach ONLY works for DAGs (no cycles allowed).

=============================================================================
  APPROACH 1: Brute Force — Try all paths using DFS
=============================================================================

  Idea: From source, explore ALL possible paths to every node.
  Track the minimum weight path for each destination.

  Time Complexity:  O(V! or exponential) — explores all paths
  Space Complexity: O(V) for recursion stack

=============================================================================
*/

// Brute Force — DFS all paths
function shortestPathBrute(N, M, edges) {
    // Step 1: Build adjacency list [neighbor, weight]
    let adj = Array.from({ length: N }, () => []);
    for (let edge of edges) {
        adj[edge[0]].push([edge[1], edge[2]]);
    }

    // Step 2: Initialize distances
    let dist = new Array(N).fill(Infinity);
    dist[0] = 0;

    // Step 3: DFS exploring all paths
    function dfs(node, currentDist) {
        if (currentDist > dist[node]) return; // Prune: already have shorter path
        dist[node] = currentDist;

        for (let [neighbor, weight] of adj[node]) {
            dfs(neighbor, currentDist + weight);
        }
    }

    dfs(0, 0);

    // Step 4: Replace Infinity with -1
    for (let i = 0; i < N; i++) {
        if (dist[i] === Infinity) dist[i] = -1;
    }
    return dist;
}

/*
=============================================================================
  APPROACH 2: Optimal — Topological Sort + Relaxation
=============================================================================

  Algorithm:
    1. Build adjacency list from edges.
    2. Perform topological sort using DFS.
    3. Initialize dist[] with Infinity, set dist[source] = 0.
    4. Process nodes in topological order:
       - For each node u, relax all outgoing edges (u → v):
         if dist[v] > dist[u] + weight(u,v), update dist[v].
    5. Replace Infinity with -1 for unreachable nodes.

  Time Complexity:  O(N + M) — topo sort O(N+M) + relaxation O(N+M)
  Space Complexity: O(N + M) — adjacency list + topo stack + dist array

  Why it works:
    - Topological order guarantees: when we process node u, all nodes
      that have an edge TO u have already been processed.
    - So dist[u] is already finalized when we relax u's outgoing edges.

  Dry Run:
    N=6, edges=[[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]]

    Adjacency List:
      0 → [(1,2), (4,1)]
      1 → [(2,3)]
      2 → [(3,6)]
      3 → []
      4 → [(5,4), (2,2)]
      5 → [(3,1)]

    Step A: Topological Sort (DFS)
      DFS from 0: 0 → 1 → 2 → 3 (push 3) → back to 2 (push 2)
                  → back to 1 (push 1) → 4 → 5 (push 5) → back to 4
                  → 4→2 already visited → (push 4) → back to 0 (push 0)

      Topo stack (reversed): [0, 4, 5, 1, 2, 3]

    Step B: Relaxation in topological order
      dist = [0, ∞, ∞, ∞, ∞, ∞]

      Process 0:
        → (1, 2): dist[1] = min(∞, 0+2) = 2
        → (4, 1): dist[4] = min(∞, 0+1) = 1
        dist = [0, 2, ∞, ∞, 1, ∞]

      Process 4:
        → (5, 4): dist[5] = min(∞, 1+4) = 5
        → (2, 2): dist[2] = min(∞, 1+2) = 3
        dist = [0, 2, 3, ∞, 1, 5]

      Process 5:
        → (3, 1): dist[3] = min(∞, 5+1) = 6
        dist = [0, 2, 3, 6, 1, 5]

      Process 1:
        → (2, 3): dist[2] = min(3, 2+3) = 3 → no change
        dist = [0, 2, 3, 6, 1, 5]

      Process 2:
        → (3, 6): dist[3] = min(6, 3+6) = 6 → no change
        dist = [0, 2, 3, 6, 1, 5]

      Process 3:
        → no outgoing edges
        dist = [0, 2, 3, 6, 1, 5]

    Final: [0, 2, 3, 6, 1, 5] ✓

=============================================================================
*/

// Helper: DFS for topological sort
function topoSortDFS(node, adj, visited, topoStack) {
    visited[node] = true;

    for (let [neighbor, weight] of adj[node]) {
        if (!visited[neighbor]) {
            topoSortDFS(neighbor, adj, visited, topoStack);
        }
    }

    // Push AFTER all descendants are processed (post-order)
    topoStack.push(node);
}

function shortestPath(N, M, edges) {
    // Step 1: Build adjacency list
    let adj = Array.from({ length: N }, () => []);
    for (let edge of edges) {
        adj[edge[0]].push([edge[1], edge[2]]); // [neighbor, weight]
    }

    // Step 2: Topological Sort using DFS
    let visited = new Array(N).fill(false);
    let topoStack = [];

    for (let i = 0; i < N; i++) {
        if (!visited[i]) {
            topoSortDFS(i, adj, visited, topoStack);
        }
    }

    // Reverse to get correct topological order
    topoStack.reverse();

    // Step 3: Initialize distances
    let dist = new Array(N).fill(Infinity);
    dist[0] = 0; // Source is vertex 0

    // Step 4: Relax edges in topological order
    for (let node of topoStack) {
        // Only relax if node is reachable from source
        if (dist[node] !== Infinity) {
            for (let [neighbor, weight] of adj[node]) {
                if (dist[neighbor] > dist[node] + weight) {
                    dist[neighbor] = dist[node] + weight;
                }
            }
        }
    }

    // Step 5: Replace Infinity with -1
    for (let i = 0; i < N; i++) {
        if (dist[i] === Infinity) dist[i] = -1;
    }

    return dist;
}

/*
=============================================================================
  APPROACH 3: Using Kahn's Algorithm (BFS-based Topological Sort)
=============================================================================

  Instead of DFS for topo sort, use BFS with in-degree array.
  This avoids recursion stack overflow for very large graphs.

  Time Complexity:  O(N + M)
  Space Complexity: O(N + M)

=============================================================================
*/

function shortestPathKahns(N, M, edges) {
    // Step 1: Build adjacency list and compute in-degrees
    let adj = Array.from({ length: N }, () => []);
    let inDegree = new Array(N).fill(0);

    for (let edge of edges) {
        adj[edge[0]].push([edge[1], edge[2]]);
        inDegree[edge[1]]++;
    }

    // Step 2: Kahn's BFS for topological sort
    let queue = [];
    for (let i = 0; i < N; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let topoOrder = [];
    while (queue.length > 0) {
        let node = queue.shift();
        topoOrder.push(node);

        for (let [neighbor, weight] of adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Step 3: Relax in topological order
    let dist = new Array(N).fill(Infinity);
    dist[0] = 0;

    for (let node of topoOrder) {
        if (dist[node] !== Infinity) {
            for (let [neighbor, weight] of adj[node]) {
                if (dist[neighbor] > dist[node] + weight) {
                    dist[neighbor] = dist[node] + weight;
                }
            }
        }
    }

    // Step 4: Replace Infinity with -1
    for (let i = 0; i < N; i++) {
        if (dist[i] === Infinity) dist[i] = -1;
    }

    return dist;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. DAG shortest path uses Topological Sort + Edge Relaxation.
  2. Time: O(N+M) — faster than Dijkstra for DAGs.
  3. Works ONLY for DAGs — if cycles exist, topo sort is impossible.
  4. Can handle NEGATIVE weights too (unlike Dijkstra) because there
     are no cycles in a DAG.
  5. Two ways to get topo order: DFS (stack) or Kahn's BFS (in-degree).

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let N = 6, M = 7;
    let edges = [[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]];

    console.log("Brute Force:", shortestPathBrute(N, M, edges));
    // Output: [0, 2, 3, 6, 1, 5]

    console.log("Topo Sort (DFS):", shortestPath(N, M, edges));
    // Output: [0, 2, 3, 6, 1, 5]

    console.log("Topo Sort (Kahn's):", shortestPathKahns(N, M, edges));
    // Output: [0, 2, 3, 6, 1, 5]
}

test();
