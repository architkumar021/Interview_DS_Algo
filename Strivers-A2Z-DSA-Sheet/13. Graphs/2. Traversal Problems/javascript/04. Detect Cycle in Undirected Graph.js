/*
================================================================
  Detect Cycle in Undirected Graph (GFG / Striver A2Z)
================================================================

Question:
Given an undirected graph with V vertices and E edges,
check whether it contains any cycle or not.

=== What is a cycle in an undirected graph? ===
A cycle exists when you can start from a node and come back
to it through a path WITHOUT retracing the same edge.

    0 --- 1
    |     |       ← This has a cycle: 0 → 1 → 2 → 0
    2 --- 3

    0 --- 1
    |             ← This does NOT have a cycle (it's a tree)
    2

=== Key Insight: Parent Tracking ===
In an undirected graph, edge (u, v) means BOTH u→v and v→u
exist in the adjacency list.

So when we DFS from u to v, and then look at v's neighbors,
we'll see u again. That's NOT a cycle — it's the same edge
going back. We skip this by tracking the "parent" node.

A real cycle is when we reach an ALREADY VISITED node
that is NOT the parent (meaning we reached it via a DIFFERENT path).

    parent                          parent
    0 ──→ 1                         0 ──→ 1
    │     │                         │
    ↓     ↓                         ↓
    2 ←── 3                         2
    
    At node 2: neighbor 0 is        At node 2: neighbor 0 is
    visited AND not parent (3)      visited BUT it IS the parent
    → CYCLE FOUND ✅                → NOT a cycle, skip ✅
*/


// ════════════════════════════════════════════
//  Solution 1: DFS Approach
// ════════════════════════════════════════════
/*
=== DFS Algorithm ===
1. For each unvisited node, start DFS with parent = -1.
2. Mark current node visited.
3. For each neighbor:
   a. If NOT visited → recurse DFS(neighbor, currentNode).
      If that returns true → cycle found, propagate true up.
   b. If ALREADY visited AND neighbor ≠ parent → CYCLE FOUND.
4. If all neighbors processed without finding cycle → return false.

Time Complexity:  O(V + E) — visit each node and edge once.
Space Complexity: O(V) — visited array + recursion stack.
*/

function dfsCycleCheck(node, parent, adj, vis) {
    vis[node] = true;

    for (let neighbor of adj[node]) {
        if (!vis[neighbor]) {
            // Unvisited neighbor → go deeper
            if (dfsCycleCheck(neighbor, node, adj, vis)) return true;
        } else if (neighbor !== parent) {
            // Visited AND not parent → reached via different path → CYCLE
            return true;
        }
        // Visited AND is parent → same edge back → skip (not a cycle)
    }

    return false;
}

function isCycleDFS(V, adj) {
    let vis = new Array(V).fill(false);

    // Check each component (graph may be disconnected)
    for (let i = 0; i < V; i++) {
        if (!vis[i]) {
            if (dfsCycleCheck(i, -1, adj, vis)) return true;
        }
    }
    return false;
}


// ════════════════════════════════════════════
//  Solution 2: BFS Approach
// ════════════════════════════════════════════
/*
=== BFS Algorithm ===
Same parent-tracking idea, but using a queue instead of recursion.

1. For each unvisited node, start BFS.
2. Push [node, parent=-1] into the queue, mark visited.
3. While queue is not empty:
   a. Pop [currentNode, parent].
   b. For each neighbor of currentNode:
      - If NOT visited → mark visited, push [neighbor, currentNode].
      - If ALREADY visited AND neighbor ≠ parent → CYCLE FOUND.
4. If BFS finishes without finding cycle → return false.

Time Complexity:  O(V + E)
Space Complexity: O(V) — visited array + queue.
*/

function bfsCycleCheck(start, adj, vis) {
    let queue = [[start, -1]]; // [node, parent]
    vis[start] = true;

    while (queue.length > 0) {
        let [node, parent] = queue.shift();

        for (let neighbor of adj[node]) {
            if (!vis[neighbor]) {
                // Unvisited → mark and enqueue with current node as parent
                vis[neighbor] = true;
                queue.push([neighbor, node]);
            } else if (neighbor !== parent) {
                // Visited AND not parent → CYCLE
                return true;
            }
        }
    }

    return false;
}

function isCycleBFS(V, adj) {
    let vis = new Array(V).fill(false);

    // Check each component
    for (let i = 0; i < V; i++) {
        if (!vis[i]) {
            if (bfsCycleCheck(i, adj, vis)) return true;
        }
    }
    return false;
}


/*
=== DRY RUN — Example 1 (Cycle exists) ===

Graph:
    0 --- 1
    |     |
    3 --- 2

  adj[0] = [1, 3]
  adj[1] = [0, 2]
  adj[2] = [1, 3]
  adj[3] = [0, 2]

  V = 4, vis = [F, F, F, F]

── DFS from node 0, parent = -1 ──

  dfs(0, -1):
    vis = [T, F, F, F]
    neighbor 1: not visited → dfs(1, 0)

    dfs(1, 0):
      vis = [T, T, F, F]
      neighbor 0: visited, but 0 === parent (0) → skip (same edge back)
      neighbor 2: not visited → dfs(2, 1)

      dfs(2, 1):
        vis = [T, T, T, F]
        neighbor 1: visited, but 1 === parent (1) → skip
        neighbor 3: not visited → dfs(3, 2)

        dfs(3, 2):
          vis = [T, T, T, T]
          neighbor 0: visited, and 0 ≠ parent (2)
                      → 🔴 CYCLE FOUND! return true

          We reached node 0 through path: 0→1→2→3→0
          But 0 was already visited via a DIFFERENT path.

  Return: true ✅

── BFS from node 0 ──

  queue = [[0, -1]], vis = [T, F, F, F]

  Pop [0, -1]:
    neighbor 1: not visited → vis[1]=T, push [1, 0]
    neighbor 3: not visited → vis[3]=T, push [3, 0]

  queue = [[1, 0], [3, 0]], vis = [T, T, F, T]

  Pop [1, 0]:
    neighbor 0: visited, 0 === parent (0) → skip
    neighbor 2: not visited → vis[2]=T, push [2, 1]

  queue = [[3, 0], [2, 1]], vis = [T, T, T, T]

  Pop [3, 0]:
    neighbor 0: visited, 0 === parent (0) → skip
    neighbor 2: visited, 2 ≠ parent (0) → 🔴 CYCLE FOUND!

  Return: true ✅

  Explanation: Node 3 (came from 0) sees neighbor 2 already visited.
  Node 2 was visited from a DIFFERENT path (via 1), so a cycle exists.


=== DRY RUN — Example 2 (No cycle — it's a tree) ===

Graph:
    0 --- 1
    |
    2 --- 3

  adj[0] = [1, 2]
  adj[1] = [0]
  adj[2] = [0, 3]
  adj[3] = [2]

  V = 4, vis = [F, F, F, F]

── DFS from node 0, parent = -1 ──

  dfs(0, -1):
    vis = [T, F, F, F]
    neighbor 1: not visited → dfs(1, 0)

    dfs(1, 0):
      vis = [T, T, F, F]
      neighbor 0: visited, 0 === parent (0) → skip
      → return false (no more neighbors)

    Back in dfs(0):
    neighbor 2: not visited → dfs(2, 0)

    dfs(2, 0):
      vis = [T, T, T, F]
      neighbor 0: visited, 0 === parent (0) → skip
      neighbor 3: not visited → dfs(3, 2)

      dfs(3, 2):
        vis = [T, T, T, T]
        neighbor 2: visited, 2 === parent (2) → skip
        → return false

      → return false

    → return false

  Return: false ✅ (No cycle — every visited neighbor was the parent)


=== DRY RUN — Example 3 (Disconnected graph with cycle in one component) ===

Graph:
    Component 1:     Component 2:
    0 --- 1          3 --- 4
                     |     |
                     6 --- 5

  adj[0] = [1],  adj[1] = [0]           ← no cycle
  adj[3] = [4,6], adj[4] = [3,5]        ← has cycle
  adj[5] = [4,6], adj[6] = [3,5]

  V = 7, vis = [F, F, F, F, F, F, F]

  i=0: not visited → DFS(0, -1) → explores 0,1 → no cycle → false
  i=1: already visited → skip
  i=2: not visited → DFS(2, -1) → isolated node, no neighbors → false
  i=3: not visited → DFS(3, -1) → explores 3,4,5,6 → finds cycle! → true

  Return: true ✅

  Key insight: We loop through ALL nodes to handle disconnected graphs.
  Even if one component has no cycle, another might.


=== DRY RUN — Example 4 (Self-loop edge case) ===

Graph: 0 has a self-loop
  adj[0] = [0]  (edge from 0 to itself)

  DFS(0, -1):
    vis[0] = true
    neighbor 0: visited, 0 ≠ parent (-1) → CYCLE FOUND

  Return: true ✅


=== Edge Cases ===
- No edges at all → no cycle possible → false
- Single node → no cycle → false
- Self-loop → cycle found (neighbor = self ≠ parent)
- Disconnected graph → must check ALL components
- Tree (V nodes, V-1 edges, connected) → no cycle
*/


// ─── Helper: Build adjacency list from edge pairs ───
function buildAdj(V, edges) {
    let adj = Array.from({ length: V }, () => []);
    for (let [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}


// ─── Driver Code ───
function runTests() {
    // Test 1: Cycle exists (square graph)
    let adj1 = buildAdj(4, [[0,1],[1,2],[2,3],[3,0]]);
    console.log("Test 1 DFS:", isCycleDFS(4, adj1));  // Expected: true
    adj1 = buildAdj(4, [[0,1],[1,2],[2,3],[3,0]]);    // rebuild (vis reset)
    console.log("Test 1 BFS:", isCycleBFS(4, adj1));   // Expected: true

    // Test 2: No cycle (tree)
    let adj2 = buildAdj(4, [[0,1],[0,2],[2,3]]);
    console.log("Test 2 DFS:", isCycleDFS(4, adj2));   // Expected: false
    adj2 = buildAdj(4, [[0,1],[0,2],[2,3]]);
    console.log("Test 2 BFS:", isCycleBFS(4, adj2));    // Expected: false

    // Test 3: Disconnected — cycle in one component
    let adj3 = buildAdj(7, [[0,1],[3,4],[4,5],[5,6],[6,3]]);
    console.log("Test 3 DFS:", isCycleDFS(7, adj3));   // Expected: true
    adj3 = buildAdj(7, [[0,1],[3,4],[4,5],[5,6],[6,3]]);
    console.log("Test 3 BFS:", isCycleBFS(7, adj3));    // Expected: true

    // Test 4: No edges
    let adj4 = buildAdj(3, []);
    console.log("Test 4 DFS:", isCycleDFS(3, adj4));   // Expected: false
    console.log("Test 4 BFS:", isCycleBFS(3, adj4));    // Expected: false

    // Test 5: Single node
    let adj5 = buildAdj(1, []);
    console.log("Test 5 DFS:", isCycleDFS(1, adj5));   // Expected: false
    console.log("Test 5 BFS:", isCycleBFS(1, adj5));    // Expected: false

    // Test 6: Triangle (smallest cycle)
    let adj6 = buildAdj(3, [[0,1],[1,2],[2,0]]);
    console.log("Test 6 DFS:", isCycleDFS(3, adj6));   // Expected: true
    adj6 = buildAdj(3, [[0,1],[1,2],[2,0]]);
    console.log("Test 6 BFS:", isCycleBFS(3, adj6));    // Expected: true

    // Test 7: Straight line (no cycle)
    let adj7 = buildAdj(5, [[0,1],[1,2],[2,3],[3,4]]);
    console.log("Test 7 DFS:", isCycleDFS(5, adj7));   // Expected: false
    adj7 = buildAdj(5, [[0,1],[1,2],[2,3],[3,4]]);
    console.log("Test 7 BFS:", isCycleBFS(5, adj7));    // Expected: false
}

runTests();


