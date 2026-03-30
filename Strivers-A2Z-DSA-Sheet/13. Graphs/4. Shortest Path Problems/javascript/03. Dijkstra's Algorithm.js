/*
=============================================================================
  QUESTION: Dijkstra's Algorithm — Shortest Path in Weighted Graph (GFG)
=============================================================================

  Given a weighted, undirected, and connected graph of V vertices and E edges,
  find the shortest distance of all vertices from the source vertex S.
  The graph doesn't contain any negative weight edges.

  Example:
    V = 5, S = 0
    adj = [
      [[1,2],[4,1]],    // 0 → {1:2, 4:1}
      [[0,2],[2,3]],    // 1 → {0:2, 2:3}
      [[1,3],[3,6]],    // 2 → {1:3, 3:6}
      [[2,6],[4,2]],    // 3 → {2:6, 4:2}
      [[0,1],[3,2]]     // 4 → {0:1, 3:2}
    ]

    Output: [0, 2, 5, 3, 1]

    Explanation:
      - 0 → 0 = 0 (source)
      - 0 → 1 = 2 (direct edge, weight 2)
      - 0 → 2 = 5 (0→1→2, weight 2+3)
      - 0 → 3 = 3 (0→4→3, weight 1+2)
      - 0 → 4 = 1 (direct edge, weight 1)

=============================================================================
  INTUITION BEHIND DIJKSTRA'S ALGORITHM
=============================================================================

  Greedy approach: Always pick the unvisited node with the SMALLEST known
  distance. Once picked, its distance is FINALIZED (guaranteed shortest).

  Why? Because all edges are non-negative. If we're at node u with dist d,
  any other path to u must go through nodes with dist >= d, and adding
  non-negative edges can only make it longer.

  This is why Dijkstra FAILS with negative edges — a longer path now could
  become shorter after adding a negative edge later.

=============================================================================
  APPROACH 1: Brute Force — O(V^2) without Priority Queue
=============================================================================

  Idea: For each iteration, linearly scan all vertices to find the unvisited
  vertex with minimum distance. Then relax its edges.

  Time Complexity:  O(V^2)  — good for dense graphs (E ≈ V^2)
  Space Complexity: O(V + E)

  Dry Run:
    V=5, S=0
    adj: 0→{1:2, 4:1}, 1→{0:2, 2:3}, 2→{1:3, 3:6}, 3→{2:6, 4:2}, 4→{0:1, 3:2}

    dist    = [0, ∞, ∞, ∞, ∞]
    visited = [F, F, F, F, F]

    Iteration 1: Pick unvisited min → node 0 (dist=0)
      Mark visited[0] = true
      Relax: 0→1: dist[1] = min(∞, 0+2) = 2
             0→4: dist[4] = min(∞, 0+1) = 1
      dist = [0, 2, ∞, ∞, 1]

    Iteration 2: Pick unvisited min → node 4 (dist=1)
      Mark visited[4] = true
      Relax: 4→0: dist[0] = min(0, 1+1) = 0 → no change
             4→3: dist[3] = min(∞, 1+2) = 3
      dist = [0, 2, ∞, 3, 1]

    Iteration 3: Pick unvisited min → node 1 (dist=2)
      Mark visited[1] = true
      Relax: 1→0: skip (visited)
             1→2: dist[2] = min(∞, 2+3) = 5
      dist = [0, 2, 5, 3, 1]

    Iteration 4: Pick unvisited min → node 3 (dist=3)
      Mark visited[3] = true
      Relax: 3→2: dist[2] = min(5, 3+6) = 5 → no change
             3→4: skip (visited)
      dist = [0, 2, 5, 3, 1]

    Iteration 5: Pick unvisited min → node 2 (dist=5)
      Mark visited[2] = true
      No unvisited neighbors to relax.

    Final: [0, 2, 5, 3, 1] ✓

=============================================================================
*/

function dijkstraBrute(V, adj, S) {
    // Step 1: Initialize distances and visited array
    let dist = new Array(V).fill(Infinity);
    let visited = new Array(V).fill(false);
    dist[S] = 0;

    // Step 2: Repeat V times — pick min unvisited node each time
    for (let count = 0; count < V; count++) {
        // Find unvisited node with minimum distance
        let u = -1;
        let minDist = Infinity;
        for (let i = 0; i < V; i++) {
            if (!visited[i] && dist[i] < minDist) {
                minDist = dist[i];
                u = i;
            }
        }

        if (u === -1) break; // Remaining nodes are unreachable

        visited[u] = true;

        // Relax all edges from u
        for (let [v, wt] of adj[u]) {
            if (!visited[v] && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
            }
        }
    }

    return dist;
}

/*
=============================================================================
  APPROACH 2: Optimal — Dijkstra with Priority Queue (Min-Heap)
=============================================================================

  Instead of O(V) linear scan to find min, use a min-heap for O(log V).

  Algorithm:
    1. Initialize dist[] = Infinity, dist[S] = 0.
    2. Push (0, S) into min-heap.
    3. While heap not empty:
       a. Extract (distance, node) with minimum distance.
       b. For each neighbor of node:
          - If dist[node] + weight < dist[neighbor]:
            Update dist[neighbor] and push to heap.
    4. Return dist[].

  Time Complexity:  O((V + E) * log V)
  Space Complexity: O(V + E)

  Note: JavaScript doesn't have built-in min-heap. We simulate with sorted
  array (O(n log n) per extraction) or implement a proper MinHeap.

  Dry Run: Same as above, but extraction is via heap instead of linear scan.
    Priority Queue operations:
      Init:   PQ = [(0,0)]
      Pop (0,0): relax → push (2,1), (1,4)   PQ = [(1,4),(2,1)]
      Pop (1,4): relax → push (3,3)           PQ = [(2,1),(3,3)]
      Pop (2,1): relax → push (5,2)           PQ = [(3,3),(5,2)]
      Pop (3,3): relax → 3+6=9 > 5 → skip    PQ = [(5,2)]
      Pop (5,2): no better paths               PQ = []
      Result: [0, 2, 5, 3, 1] ✓

=============================================================================
*/

function dijkstra(V, adj, S) {
    // Step 1: Initialize distances
    let dist = new Array(V).fill(Infinity);
    dist[S] = 0;

    // Step 2: Min-heap (simulated with sorted array)
    // Format: [distance, node]
    let pq = [[0, S]];

    while (pq.length > 0) {
        // Extract minimum distance node
        pq.sort((a, b) => a[0] - b[0]);
        let [currentDist, u] = pq.shift();

        // Skip if we already found a shorter path (stale entry)
        if (currentDist > dist[u]) continue;

        // Relax all neighbors
        for (let [v, wt] of adj[u]) {
            if (dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                pq.push([dist[v], v]);
            }
        }
    }

    return dist;
}

/*
=============================================================================
  APPROACH 3: Dijkstra with Proper MinHeap Implementation
=============================================================================

  For better performance, implement a real MinHeap instead of sorting array.

  Time Complexity:  O((V + E) * log V) — true O(log V) per extraction
  Space Complexity: O(V + E)

=============================================================================
*/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        let min = this.heap[0];
        let last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._sinkDown(0);
        }
        return min;
    }

    _bubbleUp(i) {
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);
            if (this.heap[parent][0] <= this.heap[i][0]) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }

    _sinkDown(i) {
        let size = this.heap.length;
        while (true) {
            let smallest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            if (left < size && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < size && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            if (smallest === i) break;
            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }
    }

    get size() {
        return this.heap.length;
    }
}

function dijkstraWithHeap(V, adj, S) {
    let dist = new Array(V).fill(Infinity);
    dist[S] = 0;

    let pq = new MinHeap();
    pq.push([0, S]); // [distance, node]

    while (pq.size > 0) {
        let [currentDist, u] = pq.pop();

        // Skip stale entries
        if (currentDist > dist[u]) continue;

        for (let [v, wt] of adj[u]) {
            if (dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                pq.push([dist[v], v]);
            }
        }
    }

    return dist;
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. Dijkstra works ONLY for NON-NEGATIVE weight edges.
  2. Greedy: always process the nearest unvisited node.
  3. With min-heap: O((V + E) log V) — best for sparse graphs.
  4. Without heap (brute): O(V^2) — better for dense graphs.
  5. Cannot detect negative cycles (use Bellman-Ford for that).
  6. For the "stale entry" check: when we pop a node whose distance
     in the heap is greater than dist[u], it means we already found
     a shorter path — so we skip it.

  When to use what:
    - Unweighted graph → BFS
    - DAG → Topo Sort + Relax
    - Non-negative weights → Dijkstra
    - Negative weights → Bellman-Ford
    - All pairs → Floyd-Warshall

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    // Graph: 0—{1:2, 4:1}, 1—{0:2, 2:3}, 2—{1:3, 3:6}, 3—{2:6, 4:2}, 4—{0:1, 3:2}
    let adj = [
        [[1,2],[4,1]],
        [[0,2],[2,3]],
        [[1,3],[3,6]],
        [[2,6],[4,2]],
        [[0,1],[3,2]]
    ];
    let V = 5, S = 0;

    console.log("Brute O(V^2):", dijkstraBrute(V, adj, S));
    // Output: [0, 2, 5, 3, 1]

    console.log("Sorted Array PQ:", dijkstra(V, adj, S));
    // Output: [0, 2, 5, 3, 1]

    console.log("MinHeap PQ:", dijkstraWithHeap(V, adj, S));
    // Output: [0, 2, 5, 3, 1]
}

test();
