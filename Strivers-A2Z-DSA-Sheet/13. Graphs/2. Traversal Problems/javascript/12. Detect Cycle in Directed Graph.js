/*
=============================================================================
  QUESTION: Detect Cycle in a Directed Graph (GFG / LeetCode 207)
=============================================================================

  Given a Directed Graph with V vertices and E edges, check whether it
  contains any cycle or not.

  Example 1: (Has cycle)
    0 → 1 → 2 → 3
             ↑       ↓
             └───┘
    Edges: [[0,1],[1,2],[2,3],[3,1]]
    Output: true (cycle: 1 → 2 → 3 → 1)

  Example 2: (No cycle)
    0 → 1 → 2 → 3
    Edges: [[0,1],[1,2],[2,3]]
    Output: false

=============================================================================
  WHY IS DIRECTED GRAPH CYCLE DETECTION DIFFERENT FROM UNDIRECTED?
=============================================================================
  In undirected graphs, we just check if a neighbor is already visited
  (and not the parent).

  In directed graphs, a visited node doesn't always mean a cycle!
  Consider:  0 → 1 → 3
             0 → 2 → 3
  Node 3 is visited twice, but there's NO cycle.

  KEY: We need to check if a node is visited IN THE CURRENT DFS PATH
  (not just visited globally). This is called the "path visited" or
  "recursion stack" concept.
=============================================================================
*/


// ==========================================================================
// APPROACH 1: DFS with Path Visited (Recursion Stack)
// ==========================================================================
/*
  Idea:
  - Maintain TWO arrays:
    vis[]      → has this node been visited at all? (global)
    pathVis[]  → is this node in the current DFS path? (recursion stack)
  - When entering a node: mark vis = true, pathVis = true
  - When leaving a node (backtrack): mark pathVis = false
  - If we reach a node where pathVis = true → CYCLE FOUND!
  - If vis = true but pathVis = false → already processed, no cycle here

  Time:  O(V + E)
  Space: O(V) for vis + pathVis + recursion stack

  DRY RUN with edges = [[0,1],[1,2],[2,3],[3,1]], V = 4:
  ──────────────────────────────────────────────────────
  Build adjacency list:
    0 → [1]
    1 → [2]
    2 → [3]
    3 → [1]

  vis     = [F, F, F, F]
  pathVis = [F, F, F, F]

  DFS(0):
    vis = [T, F, F, F], pathVis = [T, F, F, F]
    → neighbor 1: not visited → DFS(1)

      DFS(1):
        vis = [T, T, F, F], pathVis = [T, T, F, F]
        → neighbor 2: not visited → DFS(2)

          DFS(2):
            vis = [T, T, T, F], pathVis = [T, T, T, F]
            → neighbor 3: not visited → DFS(3)

              DFS(3):
                vis = [T, T, T, T], pathVis = [T, T, T, T]
                → neighbor 1: vis[1]=T AND pathVis[1]=T
                → Node 1 is in current path! CYCLE FOUND! return true ✓

  Cycle: 1 → 2 → 3 → 1

  DRY RUN with edges = [[0,1],[1,2],[2,3]], V = 4 (No cycle):
  ─────────────────────────────────────────────────────────────
  Adjacency: 0→[1], 1→[2], 2→[3], 3→[]

  DFS(0):
    mark 0 → DFS(1) → DFS(2) → DFS(3)
      DFS(3): no neighbors → backtrack, pathVis[3] = F
    DFS(2): backtrack, pathVis[2] = F
    DFS(1): backtrack, pathVis[1] = F
  DFS(0): backtrack, pathVis[0] = F

  Nodes 1,2,3 all visited. No more unvisited nodes. return false ✓
*/

function dfs(node, adj, vis, pathVis) {
    vis[node] = true;       // Mark visited globally
    pathVis[node] = true;   // Mark in current DFS path

    for (let neighbor of adj[node]) {
        if (!vis[neighbor]) {
            // Not visited at all → explore
            if (dfs(neighbor, adj, vis, pathVis)) return true;
        } else if (pathVis[neighbor]) {
            // Already in current path → CYCLE!
            return true;
        }
        // else: visited but not in current path → already processed, skip
    }

    pathVis[node] = false;  // Backtrack: remove from current path
    return false;
}

function isCyclicDFS(edges, v, e) {
    // Step 1: Build adjacency list from edge list
    let adj = Array.from({ length: v }, () => []);
    for (let [u, w] of edges) {
        adj[u].push(w); // Directed: only u → w
    }

    // Step 2: DFS from every unvisited node
    let vis = new Array(v).fill(false);
    let pathVis = new Array(v).fill(false);

    for (let i = 0; i < v; i++) {
        if (!vis[i]) {
            if (dfs(i, adj, vis, pathVis)) return true;
        }
    }
    return false;
}


// ==========================================================================
// APPROACH 2: BFS (Kahn's Algorithm - Topological Sort)
// ==========================================================================
/*
  Idea:
  - If a directed graph has a valid topological ordering → NO CYCLE
  - If topological sort cannot include all nodes → CYCLE EXISTS

  Steps:
  1. Compute in-degree of every node (how many edges point TO it)
  2. Push all nodes with in-degree 0 into a queue
  3. BFS: pop a node, reduce in-degree of all its neighbors by 1
     If any neighbor's in-degree becomes 0, push it to queue
  4. Count how many nodes were processed
  5. If count < V → some nodes couldn't be processed → CYCLE!

  Why? Nodes in a cycle always have in-degree ≥ 1 from each other,
  so they never reach in-degree 0 and are never added to the queue.

  Time:  O(V + E)
  Space: O(V)

  DRY RUN with edges = [[0,1],[1,2],[2,3],[3,1]], V = 4 (Has cycle):
  ──────────────────────────────────────────────────────────────────
  Adjacency: 0→[1], 1→[2], 2→[3], 3→[1]
  In-degree: [0, 2, 1, 1]
             (node 0: 0, node 1: from 0 and 3 = 2, node 2: from 1 = 1, node 3: from 2 = 1)

  Queue = [0] (only node with in-degree 0)
  count = 0

  Pop 0: count = 1
    neighbor 1: in-degree 2→1 (not 0, don't add)

  Queue empty. count = 1, V = 4
  count (1) < V (4) → CYCLE EXISTS! ✓
  (Nodes 1,2,3 are stuck in a cycle, never reach in-degree 0)

  DRY RUN with edges = [[0,1],[1,2],[2,3]], V = 4 (No cycle):
  ─────────────────────────────────────────────────────────────
  Adjacency: 0→[1], 1→[2], 2→[3], 3→[]
  In-degree: [0, 1, 1, 1]

  Queue = [0], count = 0

  Pop 0: count = 1
    neighbor 1: in-degree 1→0 → push → Queue = [1]

  Pop 1: count = 2
    neighbor 2: in-degree 1→0 → push → Queue = [2]

  Pop 2: count = 3
    neighbor 3: in-degree 1→0 → push → Queue = [3]

  Pop 3: count = 4
    no neighbors

  Queue empty. count = 4, V = 4
  count (4) === V (4) → NO CYCLE ✓
*/

function isCyclicBFS(edges, v, e) {
    // Step 1: Build adjacency list and compute in-degrees
    let adj = Array.from({ length: v }, () => []);
    let inDegree = new Array(v).fill(0);

    for (let [u, w] of edges) {
        adj[u].push(w);
        inDegree[w]++;
    }

    // Step 2: Push all nodes with in-degree 0 into queue
    let queue = [];
    for (let i = 0; i < v; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    // Step 3: BFS - process nodes
    let count = 0;
    while (queue.length > 0) {
        let node = queue.shift();
        count++;

        for (let neighbor of adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Step 4: If not all nodes processed → cycle exists
    return count < v;
}


// ==========================================================================
// DRIVER CODE
// ==========================================================================
// Test 1: Has cycle (1 → 2 → 3 → 1)
let edges1 = [[0,1],[1,2],[2,3],[3,1]];
console.log("Test 1 (DFS):", isCyclicDFS(edges1, 4, 4));  // true
console.log("Test 1 (BFS):", isCyclicBFS(edges1, 4, 4));  // true

// Test 2: No cycle
let edges2 = [[0,1],[1,2],[2,3]];
console.log("Test 2 (DFS):", isCyclicDFS(edges2, 4, 3));  // false
console.log("Test 2 (BFS):", isCyclicBFS(edges2, 4, 3));  // false

// Test 3: Self loop (0 → 0)
let edges3 = [[0,0]];
console.log("Test 3 (DFS):", isCyclicDFS(edges3, 1, 1));  // true
console.log("Test 3 (BFS):", isCyclicBFS(edges3, 1, 1));  // true

// Test 4: Disconnected with cycle
let edges4 = [[0,1],[2,3],[3,2]];
console.log("Test 4 (DFS):", isCyclicDFS(edges4, 4, 3));  // true
console.log("Test 4 (BFS):", isCyclicBFS(edges4, 4, 3));  // true

