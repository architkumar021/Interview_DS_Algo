# 🕸️ Graph — Complete Introduction Guide

> A comprehensive quick-reference guide covering everything about Graphs: terminology, representations, traversals, key algorithms, patterns, tricks, and when to use what.

---

## 📚 Table of Contents

1. [What is a Graph?](#1-what-is-a-graph)
2. [Graph Terminology](#2-graph-terminology)
3. [Types of Graphs](#3-types-of-graphs)
4. [Graph Representation](#4-graph-representation)
   - [Adjacency Matrix](#41-adjacency-matrix)
   - [Adjacency List](#42-adjacency-list)
   - [Edge List](#43-edge-list)
   - [Comparison](#44-comparison)
5. [Graph Traversals](#5-graph-traversals)
   - [BFS (Breadth-First Search)](#51-bfs-breadth-first-search)
   - [DFS (Depth-First Search)](#52-dfs-depth-first-search)
   - [BFS vs DFS — When to Use Which?](#53-bfs-vs-dfs--when-to-use-which)
6. [Connected Components](#6-connected-components)
7. [Cycle Detection](#7-cycle-detection)
   - [Undirected Graph](#71-undirected-graph)
   - [Directed Graph](#72-directed-graph)
8. [Topological Sorting](#8-topological-sorting)
   - [DFS-Based (Kahn-like post-order)](#81-dfs-based)
   - [BFS-Based (Kahn's Algorithm)](#82-bfs-based-kahns-algorithm)
9. [Shortest Path Algorithms](#9-shortest-path-algorithms)
   - [BFS (Unweighted)](#91-bfs-unweighted)
   - [Dijkstra's Algorithm](#92-dijkstras-algorithm)
   - [Bellman-Ford Algorithm](#93-bellman-ford-algorithm)
   - [Floyd-Warshall Algorithm](#94-floyd-warshall-algorithm)
   - [Which Shortest Path Algorithm to Use?](#95-which-shortest-path-algorithm-to-use)
10. [Minimum Spanning Tree (MST)](#10-minimum-spanning-tree-mst)
    - [Prim's Algorithm](#101-prims-algorithm)
    - [Kruskal's Algorithm](#102-kruskals-algorithm)
    - [Prim's vs Kruskal's](#103-prims-vs-kruskals)
11. [Disjoint Set Union (Union-Find)](#11-disjoint-set-union-union-find)
12. [Advanced Algorithms](#12-advanced-algorithms)
    - [Bridges & Articulation Points (Tarjan's)](#121-bridges--articulation-points-tarjans)
    - [Strongly Connected Components (Kosaraju's)](#122-strongly-connected-components-kosarajus)
13. [Key Patterns & Tricks for Interviews](#13-key-patterns--tricks-for-interviews)
14. [Common Graph Problem Types](#14-common-graph-problem-types)
15. [Graph vs Tree](#15-graph-vs-tree)
16. [Counting Graphs](#16-counting-graphs)
17. [Complexity Cheat Sheet](#17-complexity-cheat-sheet)
18. [Common Mistakes](#18-common-mistakes)
19. [Interview Cheat Sheet](#19-interview-cheat-sheet)
20. [Problem Map — All Covered Problems](#20-problem-map--all-covered-problems)

---

## 1. What is a Graph?

A **Graph** is a non-linear data structure consisting of **vertices** (nodes) connected by **edges** (links).

```
  0 --- 1
  |   / |
  |  /  |
  | /   |
  2 --- 3
```

Formally: `G = (V, E)` where:
- `V` = set of vertices → `{0, 1, 2, 3}`
- `E` = set of edges → `{(0,1), (0,2), (1,2), (1,3), (2,3)}`

> 🔑 **Graphs are the most versatile data structure in computer science.** They model relationships: social networks, maps, dependencies, state machines, and much more.

---

## 2. Graph Terminology

| Term | Meaning | Example |
|------|---------|---------|
| **Vertex (Node)** | A point in the graph | `0`, `1`, `2` |
| **Edge** | Connection between two vertices | `(0, 1)` |
| **Adjacent** | Two vertices connected by an edge | 0 and 1 are adjacent |
| **Degree** | Number of edges connected to a vertex | deg(1) = 3 |
| **In-degree** | (Directed) Number of edges coming IN | → node |
| **Out-degree** | (Directed) Number of edges going OUT | node → |
| **Path** | Sequence of vertices connected by edges | 0 → 1 → 3 |
| **Cycle** | Path that starts and ends at the same vertex | 0 → 1 → 2 → 0 |
| **Connected** | There exists a path between every pair of vertices | |
| **Component** | A maximal connected subgraph | |
| **Weight** | A value assigned to an edge | cost, distance, time |
| **Self-loop** | Edge from a vertex to itself | (0, 0) |
| **Parallel edges** | Multiple edges between same pair of vertices | |
| **Simple graph** | No self-loops, no parallel edges | |

### Degree Properties

```
Undirected Graph:
  Sum of all degrees = 2 × |E|
  (Each edge contributes to degree of both endpoints)

Directed Graph:
  Sum of in-degrees = Sum of out-degrees = |E|
```

---

## 3. Types of Graphs

### Based on Direction

| Type | Description | Example |
|------|-------------|---------|
| **Undirected** | Edges have no direction (bidirectional) | Friendships |
| **Directed (Digraph)** | Edges have direction (one-way) | Following on social media |

```
Undirected:          Directed:
  0 --- 1              0 --> 1
  |     |              |     ↓
  2 --- 3              2 <-- 3
```

### Based on Weight

| Type | Description | Example |
|------|-------------|---------|
| **Unweighted** | All edges are equal | Social connections |
| **Weighted** | Edges have costs/weights | Road distances |

```
Weighted:
  0 --5-- 1
  |       |
  3       2
  |       |
  2 --1-- 3
```

### Based on Cycles

| Type | Description | Key Property |
|------|-------------|-------------|
| **Cyclic** | Contains at least one cycle | |
| **Acyclic** | No cycles | |
| **DAG** | Directed Acyclic Graph | Topological ordering exists |
| **Tree** | Connected acyclic undirected graph | |

### Special Graphs

| Type | Description |
|------|-------------|
| **Complete Graph (Kₙ)** | Every pair of vertices is connected. Edges = n(n-1)/2 |
| **Bipartite Graph** | Vertices can be divided into 2 sets, edges only between sets |
| **Tree** | Connected graph with exactly n-1 edges, no cycles |
| **Forest** | Collection of disjoint trees |
| **Sparse Graph** | |E| ≈ |V| (few edges) |
| **Dense Graph** | |E| ≈ |V|² (many edges) |

---

## 4. Graph Representation

### 4.1 Adjacency Matrix

A 2D array of size `V × V`. `matrix[i][j] = 1` (or weight) if edge exists from `i` to `j`.

```
Graph:              Matrix:
  0 --- 1             0  1  2  3
  |   / |          0 [0, 1, 1, 0]
  |  /  |          1 [1, 0, 1, 1]
  | /   |          2 [1, 1, 0, 1]
  2 --- 3          3 [0, 1, 1, 0]
```

```javascript
// JavaScript — Adjacency Matrix
let V = 4;
let matrix = Array.from({ length: V }, () => new Array(V).fill(0));

// Add edge (undirected)
function addEdge(u, v) {
    matrix[u][v] = 1;
    matrix[v][u] = 1;  // remove for directed
}
```

```python
# Python — Adjacency Matrix
V = 4
matrix = [[0] * V for _ in range(V)]

def add_edge(u, v):
    matrix[u][v] = 1
    matrix[v][u] = 1  # remove for directed
```

**Pros:** O(1) edge lookup, simple to implement
**Cons:** O(V²) space, wastes space for sparse graphs

---

### 4.2 Adjacency List

An array of lists. `adj[i]` contains all neighbors of vertex `i`.

```
Graph:              Adjacency List:
  0 --- 1           0 → [1, 2]
  |   / |           1 → [0, 2, 3]
  |  /  |           2 → [0, 1, 3]
  | /   |           3 → [1, 2]
  2 --- 3
```

```javascript
// JavaScript — Adjacency List
let V = 4;
let adj = Array.from({ length: V }, () => []);

// Add edge (undirected)
function addEdge(u, v) {
    adj[u].push(v);
    adj[v].push(u);  // remove for directed
}

// Add weighted edge
function addWeightedEdge(u, v, w) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);  // remove for directed
}
```

```python
# Python — Adjacency List
V = 4
adj = [[] for _ in range(V)]

def add_edge(u, v):
    adj[u].append(v)
    adj[v].append(u)  # remove for directed

# Weighted
def add_weighted_edge(u, v, w):
    adj[u].append((v, w))
    adj[v].append((u, w))  # remove for directed
```

**Pros:** O(V + E) space, efficient for sparse graphs
**Cons:** O(V) edge lookup in worst case

> 🔑 **Adjacency List is the go-to representation for almost all interview and competitive programming problems.**

---

### 4.3 Edge List

Simply a list of all edges. Useful for Kruskal's algorithm.

```javascript
let edges = [
    [0, 1, 5],  // [from, to, weight]
    [0, 2, 3],
    [1, 3, 2],
    [2, 3, 1]
];
```

---

### 4.4 Comparison

| Feature | Adj Matrix | Adj List | Edge List |
|---------|-----------|----------|-----------|
| **Space** | O(V²) | O(V + E) | O(E) |
| **Add edge** | O(1) | O(1) | O(1) |
| **Check edge (u,v)** | O(1) | O(degree(u)) | O(E) |
| **Get all neighbors** | O(V) | O(degree(u)) | O(E) |
| **Best for** | Dense graphs | Sparse graphs (most problems) | Kruskal's, edge sorting |

---

## 5. Graph Traversals

### 5.1 BFS (Breadth-First Search)

Explores **level by level** — visits all neighbors first, then their neighbors.

Uses a **Queue** (FIFO).

```
        0
       / \
      1   2
     / \   \
    3   4   5

BFS from 0: 0 → 1 → 2 → 3 → 4 → 5
(Level 0: {0}, Level 1: {1,2}, Level 2: {3,4,5})
```

#### Algorithm

```
1. Push source into queue, mark as visited
2. While queue is not empty:
   a. Pop front node
   b. Process it
   c. Push all unvisited neighbors, mark visited
```

#### Code

```javascript
// JavaScript — BFS
function bfs(V, adj, src) {
    let vis = new Array(V).fill(false);
    let queue = [src];
    let result = [];
    vis[src] = true;

    while (queue.length > 0) {
        let node = queue.shift();
        result.push(node);

        for (let neighbor of adj[node]) {
            if (!vis[neighbor]) {
                vis[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    return result;
}
```

```python
# Python — BFS
from collections import deque

def bfs(V, adj, src):
    vis = [False] * V
    queue = deque([src])
    result = []
    vis[src] = True

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in adj[node]:
            if not vis[neighbor]:
                vis[neighbor] = True
                queue.append(neighbor)
    return result
```

**Time:** O(V + E) | **Space:** O(V)

#### When BFS Shines
- ✅ Shortest path in **unweighted** graphs
- ✅ Level-order traversal
- ✅ Finding minimum steps/moves
- ✅ Multi-source problems (rotten oranges, 01 matrix)

---

### 5.2 DFS (Depth-First Search)

Explores **as deep as possible** along each branch before backtracking.

Uses a **Stack** (explicit or recursion call stack).

```
        0
       / \
      1   2
     / \   \
    3   4   5

DFS from 0: 0 → 1 → 3 → 4 → 2 → 5
(Goes deep into left branch first)
```

#### Algorithm

```
1. Mark current node as visited
2. Process it
3. For each unvisited neighbor, recurse (DFS)
```

#### Code

```javascript
// JavaScript — DFS (Recursive)
function dfs(node, adj, vis, result) {
    vis[node] = true;
    result.push(node);

    for (let neighbor of adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, vis, result);
        }
    }
}

function dfsOfGraph(V, adj) {
    let vis = new Array(V).fill(false);
    let result = [];
    dfs(0, adj, vis, result);
    return result;
}
```

```python
# Python — DFS (Recursive)
def dfs(node, adj, vis, result):
    vis[node] = True
    result.append(node)

    for neighbor in adj[node]:
        if not vis[neighbor]:
            dfs(neighbor, adj, vis, result)

def dfs_of_graph(V, adj):
    vis = [False] * V
    result = []
    dfs(0, adj, vis, result)
    return result
```

```javascript
// JavaScript — DFS (Iterative with Stack)
function dfsIterative(V, adj, src) {
    let vis = new Array(V).fill(false);
    let stack = [src];
    let result = [];

    while (stack.length > 0) {
        let node = stack.pop();
        if (vis[node]) continue;
        vis[node] = true;
        result.push(node);

        for (let neighbor of adj[node]) {
            if (!vis[neighbor]) {
                stack.push(neighbor);
            }
        }
    }
    return result;
}
```

**Time:** O(V + E) | **Space:** O(V)

#### When DFS Shines
- ✅ Detecting cycles
- ✅ Topological sorting
- ✅ Finding connected components
- ✅ Backtracking problems
- ✅ Path finding (all paths)
- ✅ Strongly connected components (Kosaraju's, Tarjan's)
- ✅ Bridges and articulation points

---

### 5.3 BFS vs DFS — When to Use Which?

| Scenario | Use | Why |
|----------|-----|-----|
| Shortest path (unweighted) | **BFS** | Guarantees shortest path |
| Shortest path (weighted, no negative) | **Dijkstra** (modified BFS) | Priority queue for weighted |
| Detect cycle (undirected) | **DFS** | Parent tracking is simpler |
| Detect cycle (directed) | **DFS** | Backtracking with path tracking |
| Topological sort | **DFS** or **BFS (Kahn's)** | Both work |
| Level-order / min steps | **BFS** | Level by level |
| Connected components | **DFS** or **BFS** | Both work |
| Flood fill / island problems | **DFS** (usually) | Simpler recursive code |
| Multi-source shortest | **BFS** | Start from all sources simultaneously |
| Bridges / Articulation points | **DFS** | Tarjan's needs DFS tree |
| SCC | **DFS** | Kosaraju's needs 2 DFS passes |
| All paths | **DFS** | Backtracking explores all paths |

> 🔑 **Rule of Thumb:**
> - Need **shortest distance** or **minimum steps**? → **BFS**
> - Need **cycle detection**, **topological order**, **backtracking**? → **DFS**
> - For grid problems: both work, but DFS is often simpler to write

---

## 6. Connected Components

A **connected component** is a maximal subgraph where every vertex is reachable from every other vertex.

```
Component 1:    Component 2:    Component 3:
  0 --- 1         3 --- 4           6
  |               |
  2               5
```

#### Finding Connected Components

```javascript
// Count connected components
function countComponents(V, adj) {
    let vis = new Array(V).fill(false);
    let count = 0;

    for (let i = 0; i < V; i++) {
        if (!vis[i]) {
            count++;
            dfs(i, adj, vis);  // or bfs
        }
    }
    return count;
}
```

> 🔑 **Number of connected components** = Number of times we start a new DFS/BFS from an unvisited node.

**Time:** O(V + E) | **Space:** O(V)

---

## 7. Cycle Detection

### 7.1 Undirected Graph

**Approach:** DFS with parent tracking. If we visit a node already visited and it's NOT the parent, there's a cycle.

```javascript
function hasCycleDFS(node, parent, adj, vis) {
    vis[node] = true;
    for (let neighbor of adj[node]) {
        if (!vis[neighbor]) {
            if (hasCycleDFS(neighbor, node, adj, vis)) return true;
        } else if (neighbor !== parent) {
            return true;  // Found a back edge → cycle!
        }
    }
    return false;
}
```

> 🔑 **Why parent check?** In an undirected graph, `u → v → u` is not a cycle, it's just the same edge traversed back. We only detect a cycle when we reach an already-visited node through a **different** path.

---

### 7.2 Directed Graph

**Approach:** DFS with path tracking. Maintain a `pathVis[]` array to track nodes in the current DFS path. If we revisit a node in the current path, it's a cycle.

```javascript
function hasCycleDFS(node, adj, vis) {
    vis[node] = true;   // marks as "in current path"
    for (let neighbor of adj[node]) {
        if (!vis[neighbor]) {
            if (hasCycleDFS(neighbor, adj, vis)) return true;
        } else if (vis[neighbor]) {
            return true;  // Already in current DFS path → cycle!
        }
    }
    vis[node] = false;  // backtrack: remove from current path
    return false;
}
```

**Alternative:** Kahn's Algorithm (BFS) — if topological sort doesn't include all nodes → cycle exists.

---

## 8. Topological Sorting

> Topological sorting is a linear ordering of vertices in a **DAG** such that for every directed edge `u → v`, vertex `u` comes **before** `v` in the ordering.

```
  5 → 0 ← 4
  ↓       ↓
  2 → 3 → 1

Topological order: 4, 5, 0, 2, 3, 1  (or  5, 4, 0, 2, 3, 1  etc.)
```

> 🔑 **Topological sort only exists for DAGs** (Directed Acyclic Graphs). If the graph has a cycle, topological sort is impossible.

---

### 8.1 DFS-Based

```javascript
function topoDFS(node, adj, vis, stack) {
    vis[node] = true;
    for (let v of adj[node]) {
        if (!vis[v]) topoDFS(v, adj, vis, stack);
    }
    stack.push(node);  // Push AFTER processing all children
}

function topoSort(V, adj) {
    let vis = new Array(V).fill(false);
    let stack = [];
    for (let i = 0; i < V; i++) {
        if (!vis[i]) topoDFS(i, adj, vis, stack);
    }
    stack.reverse();  // Reverse the finish-order
    return stack;
}
```

---

### 8.2 BFS-Based (Kahn's Algorithm)

```
1. Calculate in-degree of every node
2. Push all nodes with in-degree 0 into queue
3. Process queue:
   - Pop node, add to result
   - Reduce in-degree of all its neighbors by 1
   - If any neighbor's in-degree becomes 0, push to queue
4. If result.length !== V → cycle exists
```

```javascript
function kahnsAlgorithm(V, adj) {
    let indeg = new Array(V).fill(0);
    for (let i = 0; i < V; i++) {
        for (let v of adj[i]) indeg[v]++;
    }

    let queue = [];
    for (let i = 0; i < V; i++) {
        if (indeg[i] === 0) queue.push(i);
    }

    let result = [];
    while (queue.length > 0) {
        let node = queue.shift();
        result.push(node);
        for (let v of adj[node]) {
            indeg[v]--;
            if (indeg[v] === 0) queue.push(v);
        }
    }
    return result;  // if result.length < V → cycle exists
}
```

> 🔑 **Kahn's algorithm doubles as a cycle detector for directed graphs.** If the result doesn't contain all V nodes, there's a cycle.

---

## 9. Shortest Path Algorithms

### 9.1 BFS (Unweighted)

For **unweighted** graphs (or unit weight), BFS gives the shortest path directly.

```javascript
function bfsShortestPath(V, adj, src) {
    let dis = new Array(V).fill(-1);
    let queue = [src];
    dis[src] = 0;

    while (queue.length > 0) {
        let node = queue.shift();
        for (let neighbor of adj[node]) {
            if (dis[neighbor] === -1) {
                dis[neighbor] = dis[node] + 1;
                queue.push(neighbor);
            }
        }
    }
    return dis;
}
```

**Time:** O(V + E)

---

### 9.2 Dijkstra's Algorithm

For **weighted graphs with non-negative weights**.

Uses a **min-heap (priority queue)** — always processes the closest unvisited node.

```
1. Set dist[src] = 0, all others = ∞
2. Push (0, src) into min-heap
3. While heap not empty:
   a. Pop (dist, node) with minimum distance
   b. For each neighbor, if new distance < current, update and push
```

```javascript
// JavaScript — Dijkstra's (using sorted array as simple PQ)
function dijkstra(V, adj, src) {
    let dis = new Array(V).fill(Infinity);
    let pq = [[0, src]];  // [distance, node]
    dis[src] = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [uwt, u] = pq.shift();

        for (let [v, wt] of adj[u]) {
            if (dis[u] + wt < dis[v]) {
                dis[v] = dis[u] + wt;
                pq.push([dis[v], v]);
            }
        }
    }
    return dis;
}
```

```python
# Python — Dijkstra's
import heapq

def dijkstra(V, adj, src):
    dis = [float('inf')] * V
    pq = [(0, src)]
    dis[src] = 0

    while pq:
        uwt, u = heapq.heappop(pq)
        for v, wt in adj[u]:
            if dis[u] + wt < dis[v]:
                dis[v] = dis[u] + wt
                heapq.heappush(pq, (dis[v], v))
    return dis
```

**Time:** O((V + E) × log V) | **Space:** O(V)

> ⚠️ **Dijkstra's does NOT work with negative weights!**

---

### 9.3 Bellman-Ford Algorithm

For **weighted graphs WITH negative weights**. Can detect **negative cycles**.

```
1. Set dist[src] = 0, all others = ∞
2. Repeat V-1 times:
   - For every edge (u, v, wt): relax it
     if dist[u] + wt < dist[v] → update dist[v]
3. One more pass: if any edge can still be relaxed → negative cycle!
```

```javascript
function bellmanFord(V, edges, src) {
    let dis = new Array(V).fill(1e9);
    dis[src] = 0;

    // Relax all edges V-1 times
    for (let i = 0; i < V - 1; i++) {
        for (let [u, v, wt] of edges) {
            if (dis[u] !== 1e9 && dis[u] + wt < dis[v]) {
                dis[v] = dis[u] + wt;
            }
        }
    }

    // Check for negative cycle
    for (let [u, v, wt] of edges) {
        if (dis[u] !== 1e9 && dis[u] + wt < dis[v]) {
            return [-1];  // Negative cycle detected
        }
    }
    return dis;
}
```

**Time:** O(V × E) | **Space:** O(V)

---

### 9.4 Floyd-Warshall Algorithm

Finds shortest path between **ALL pairs** of vertices.

```
For each intermediate node k (0 to V-1):
  For each pair (i, j):
    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```

```javascript
function floydWarshall(matrix) {
    let V = matrix.length;
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (i === j) { matrix[i][j] = 0; continue; }
                matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
            }
        }
    }
}
```

**Time:** O(V³) | **Space:** O(V²)

---

### 9.5 Which Shortest Path Algorithm to Use?

| Scenario | Algorithm | Time |
|----------|-----------|------|
| Unweighted graph | **BFS** | O(V + E) |
| Weighted, no negative | **Dijkstra's** | O((V+E) log V) |
| Weighted, with negative | **Bellman-Ford** | O(V × E) |
| All pairs shortest path | **Floyd-Warshall** | O(V³) |
| DAG (any weights) | **Topo Sort + Relaxation** | O(V + E) |
| At most K stops | **BFS (level-wise)** | O(V × K) |

> 🔑 **Decision Tree:**
> ```
> Is it unweighted?
>   YES → BFS
>   NO → Are there negative weights?
>     NO → Dijkstra's
>     YES → Bellman-Ford
> Need all-pairs?
>   YES → Floyd-Warshall
> Is it a DAG?
>   YES → Topo Sort + Relax (fastest for DAGs)
> ```

---

## 10. Minimum Spanning Tree (MST)

> A **Minimum Spanning Tree** of a connected, weighted, undirected graph is a subset of edges that connects all vertices with the **minimum total edge weight** and forms a tree (no cycles).

Properties:
- MST has exactly **V - 1** edges
- MST is a **tree** (connected, no cycles)
- MST may not be unique

---

### 10.1 Prim's Algorithm

**Greedy approach** — grow the MST one vertex at a time.

```
1. Start from any vertex (usually 0)
2. Use a min-heap to pick the cheapest edge connecting MST to non-MST
3. Add the edge and vertex to MST
4. Repeat until all vertices are in MST
```

```javascript
function prims(V, adj) {
    let mst = new Array(V).fill(false);
    let pq = [[0, 0]];  // [weight, node]
    let totalWeight = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        let [wt, u] = pq.shift();
        if (mst[u]) continue;
        mst[u] = true;
        totalWeight += wt;

        for (let [v, vwt] of adj[u]) {
            if (!mst[v]) pq.push([vwt, v]);
        }
    }
    return totalWeight;
}
```

**Time:** O(E log V) | **Space:** O(V)

---

### 10.2 Kruskal's Algorithm

**Greedy approach** — sort all edges, add them one by one if they don't form a cycle (using Union-Find).

```
1. Sort all edges by weight
2. For each edge (u, v, wt):
   - If u and v are in different components → add edge to MST, union them
   - If same component → skip (would create cycle)
3. Stop when MST has V-1 edges
```

```javascript
function kruskals(V, edges) {
    edges.sort((a, b) => a[2] - b[2]);  // sort by weight
    let djs = new DisjointSet(V);
    let totalWeight = 0;

    for (let [u, v, wt] of edges) {
        if (djs.find(u) !== djs.find(v)) {
            totalWeight += wt;
            djs.union(u, v);
        }
    }
    return totalWeight;
}
```

**Time:** O(E log E) | **Space:** O(V)

---

### 10.3 Prim's vs Kruskal's

| Feature | Prim's | Kruskal's |
|---------|--------|-----------|
| Approach | Grow from a vertex | Sort all edges |
| Data structure | Min-Heap | Disjoint Set (Union-Find) |
| Better for | Dense graphs | Sparse graphs |
| Works on | Connected graphs | Can handle disconnected (gives MSF) |
| Time | O(E log V) | O(E log E) |

---

## 11. Disjoint Set Union (Union-Find)

A data structure to efficiently manage **dynamic connectivity** queries:
- `find(x)` — which component does x belong to?
- `union(x, y)` — merge components of x and y

### With Path Compression + Union by Size (Optimal)

```javascript
class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
    }

    find(node) {
        if (this.parent[node] === node) return node;
        return this.parent[node] = this.find(this.parent[node]); // Path compression
    }

    union(u, v) {
        let uP = this.find(u), vP = this.find(v);
        if (uP === vP) return;
        // Union by size
        if (this.size[uP] >= this.size[vP]) {
            this.parent[vP] = uP;
            this.size[uP] += this.size[vP];
        } else {
            this.parent[uP] = vP;
            this.size[vP] += this.size[uP];
        }
    }
}
```

```python
class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, node):
        if self.parent[node] == node:
            return node
        self.parent[node] = self.find(self.parent[node])  # Path compression
        return self.parent[node]

    def union(self, u, v):
        uP, vP = self.find(u), self.find(v)
        if uP == vP:
            return
        if self.size[uP] >= self.size[vP]:
            self.parent[vP] = uP
            self.size[uP] += self.size[vP]
        else:
            self.parent[uP] = vP
            self.size[vP] += self.size[uP]
```

**Time:** O(α(n)) ≈ O(1) per operation (amortized) | **Space:** O(n)

### When to Use Disjoint Set

- ✅ Kruskal's MST algorithm
- ✅ Dynamic connectivity / number of components
- ✅ Online queries (add edges, check connectivity)
- ✅ Number of islands (with operations)
- ✅ Account merge
- ✅ Making large island

---

## 12. Advanced Algorithms

### 12.1 Bridges & Articulation Points (Tarjan's)

A **bridge** is an edge whose removal disconnects the graph.
An **articulation point** is a vertex whose removal disconnects the graph.

**Tarjan's Algorithm** uses DFS with two arrays:
- `tin[u]` — discovery time of node u
- `low[u]` — lowest discovery time reachable from u's subtree

```
Bridge condition:  low[v] > tin[u]  for edge (u, v)
  → v cannot reach anything above u, so removing (u,v) disconnects

Articulation Point condition:  low[v] >= tin[u]  (for non-root)
  → v's subtree has no back edge going above u
```

**Time:** O(V + E) | **Space:** O(V)

---

### 12.2 Strongly Connected Components (Kosaraju's)

An **SCC** is a maximal subgraph where every vertex is reachable from every other vertex (in a directed graph).

**Kosaraju's Algorithm** (2 passes of DFS):

```
1. DFS Pass 1: Get finish-time ordering (push to stack after DFS completes)
2. Transpose (reverse) the graph
3. DFS Pass 2: Process nodes in reverse finish-time order on transposed graph
   Each new DFS call = one SCC
```

**Time:** O(V + E) | **Space:** O(V + E)

---

## 13. Key Patterns & Tricks for Interviews

### Pattern 1 — Multi-Source BFS
When the problem says "from ALL sources simultaneously":
```
Push ALL sources into the queue at start, then BFS normally.
```
**Examples:** Rotten Oranges, 01 Matrix

### Pattern 2 — Grid as Graph
Treat each cell `(i, j)` as a node. Neighbors are 4-directional (or 8-directional).
```javascript
let dr = [-1, 1, 0, 0];
let dc = [0, 0, -1, 1];

for (let d = 0; d < 4; d++) {
    let nr = r + dr[d], nc = c + dc[d];
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        // process neighbor (nr, nc)
    }
}
```
**Examples:** Flood Fill, Number of Islands, Surrounded Regions

### Pattern 3 — Border DFS/BFS
When "surrounded" or "boundary-connected" matters:
```
Start DFS/BFS from all border cells first → mark them.
Remaining unmarked cells are the answer.
```
**Examples:** Surrounded Regions, Number of Enclaves

### Pattern 4 — Bipartite Check via Coloring
```
Color nodes with 2 colors using DFS/BFS.
If a neighbor has the same color → NOT bipartite.
```

### Pattern 5 — Topological Sort for Dependencies
Whenever you see "prerequisite", "dependency", "ordering" → Think topological sort.
**Examples:** Course Schedule, Alien Dictionary

### Pattern 6 — Dijkstra for "Minimum Cost/Effort/Time" with Weights
```
Replace BFS queue with a min-heap (priority queue).
Always process the minimum-cost node first.
```
**Examples:** Cheapest Flights, Minimum Effort Path, Swim in Rising Water

### Pattern 7 — Union-Find for Dynamic Connectivity
When edges are added online and you need component queries → Union-Find is better than BFS/DFS.
**Examples:** Number of Islands II, Account Merge, Making Large Island

### Pattern 8 — Word Transformation = Graph
Each word is a node. Two words differing by one character are connected.
Use BFS for shortest transformation.
**Example:** Word Ladder

### Pattern 9 — Encode Path for Island Shape
When finding distinct islands, encode the DFS path directions ("UDLR") into a string.
Use a Set to count unique shapes.
**Example:** Distinct Islands

---

## 14. Common Graph Problem Types

| Problem Type | Algorithm | Key Idea |
|-------------|-----------|----------|
| Number of components | DFS/BFS | Count DFS/BFS calls from unvisited nodes |
| Shortest path (unweighted) | BFS | Level-by-level exploration |
| Shortest path (weighted) | Dijkstra / Bellman-Ford | Min-heap / Edge relaxation |
| Cycle detection (undirected) | DFS + parent | Back edge to non-parent = cycle |
| Cycle detection (directed) | DFS + path tracking | Revisit node in current path = cycle |
| Topological sort | DFS / Kahn's | Post-order reverse / In-degree BFS |
| MST | Prim's / Kruskal's | Greedy edge selection |
| Bridges | Tarjan's | low[v] > tin[u] |
| SCC | Kosaraju's / Tarjan's | 2-pass DFS |
| Bipartite | BFS/DFS 2-coloring | Neighbor same color = not bipartite |
| Grid problems | BFS/DFS on grid | 4-directional neighbors |
| Dynamic connectivity | Union-Find | O(1) union and find |
| All-pairs shortest | Floyd-Warshall | O(V³) DP |
| Negative weights | Bellman-Ford | V-1 relaxation passes |

---

## 15. Graph vs Tree

| Feature | Tree | Graph |
|---------|------|-------|
| **Cycles** | ❌ No cycles | ✅ Can have cycles |
| **Edges** | Exactly N - 1 | Any number |
| **Root** | Has a root (rooted tree) | No root |
| **Connected** | Always connected | May be disconnected |
| **Direction** | Parent → Child | Can be directed or undirected |
| **Traversal** | BFS, DFS (no vis needed if rooted) | BFS, DFS (always need visited array) |
| **Path** | Exactly one path between any two nodes | Multiple paths possible |
| **Relationship** | A tree IS a graph | A graph is NOT always a tree |

> 🔑 **A Tree is a connected acyclic undirected graph with N-1 edges.**

---

## 16. Counting Graphs

**How many undirected graphs can be formed with n vertices?**

```
Maximum edges = n × (n-1) / 2  (complete graph)
Each edge can be present or absent → 2 choices per edge
Total graphs = 2 ^ (n*(n-1)/2)
```

```javascript
function countingGraphs(n) {
    let edges = (n * (n - 1)) / 2;
    return Math.pow(2, edges);
}
```

| n | Max Edges | Total Graphs |
|---|-----------|-------------|
| 1 | 0 | 1 |
| 2 | 1 | 2 |
| 3 | 3 | 8 |
| 4 | 6 | 64 |
| 5 | 10 | 1024 |

---

## 17. Complexity Cheat Sheet

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| BFS | O(V + E) | O(V) | Queue-based |
| DFS | O(V + E) | O(V) | Stack/recursion |
| Dijkstra | O((V+E) log V) | O(V) | Min-heap, no negative weights |
| Bellman-Ford | O(V × E) | O(V) | Handles negative weights |
| Floyd-Warshall | O(V³) | O(V²) | All pairs |
| Topological Sort | O(V + E) | O(V) | DAG only |
| Kahn's Algorithm | O(V + E) | O(V) | BFS-based topo sort |
| Prim's MST | O(E log V) | O(V) | Min-heap |
| Kruskal's MST | O(E log E) | O(V) | Sort + Union-Find |
| Union-Find | O(α(n)) ≈ O(1) | O(V) | Path compression + size |
| Tarjan's (Bridges) | O(V + E) | O(V) | DFS + tin/low |
| Kosaraju's (SCC) | O(V + E) | O(V+E) | 2-pass DFS |

---

## 18. Common Mistakes

### ❌ Forgetting to mark visited BEFORE pushing to queue (BFS)
```javascript
// WRONG — same node pushed multiple times
queue.push(neighbor);
vis[neighbor] = true;  // Too late!

// CORRECT — mark visited when pushing
vis[neighbor] = true;
queue.push(neighbor);
```

### ❌ Using Dijkstra's with negative weights
Dijkstra's algorithm does NOT work correctly with negative edge weights. Use Bellman-Ford instead.

### ❌ Not handling disconnected graphs
Always loop through ALL nodes, not just start from node 0:
```javascript
for (let i = 0; i < V; i++) {
    if (!vis[i]) {
        dfs(i, adj, vis);  // Handle each component
    }
}
```

### ❌ Wrong cycle detection in directed graphs
Don't use the undirected "parent" approach for directed graphs. Use path tracking (backtracking `vis[node] = false`) or Kahn's algorithm instead.

### ❌ Confusing number of nodes vs edges
- `V` or `n` = number of vertices/nodes
- `E` or `m` = number of edges
- Tree always has exactly `V - 1` edges

### ❌ Not converting matrix to adjacency list
Many problems give an adjacency matrix or edge list. Convert to adjacency list first for efficient traversal.

### ❌ Integer overflow in Dijkstra / Bellman-Ford
When using `1e9` or `Infinity` as initial distance, be careful with additions. Use `if (dis[u] !== Infinity)` guard before relaxing.

---

## 19. Interview Cheat Sheet

### Quick Decision Framework

```
📋 Read the Problem
    ↓
Is it a graph/grid problem?
    ↓
Step 1: Identify graph type
  - Directed or Undirected?
  - Weighted or Unweighted?
  - Can it have cycles?
    ↓
Step 2: What are we finding?
  - Shortest path → BFS / Dijkstra / Bellman-Ford
  - Connectivity → DFS / BFS / Union-Find
  - Ordering → Topological Sort
  - Minimum cost spanning → Prim's / Kruskal's
  - Cycle detection → DFS (directed: path tracking, undirected: parent)
  - Components → DFS/BFS count
    ↓
Step 3: Choose representation
  - Most problems → Adjacency List
  - Dense graph → Adjacency Matrix
  - Edge-sorting needed → Edge List
    ↓
Step 4: Watch for edge cases
  - Disconnected graph
  - Self-loops
  - 0-indexed vs 1-indexed
  - Grid boundaries
```

### Template: BFS on Grid

```javascript
function bfsGrid(grid, startRow, startCol) {
    let rows = grid.length, cols = grid[0].length;
    let vis = Array.from({ length: rows }, () => new Array(cols).fill(false));
    let queue = [[startRow, startCol]];
    vis[startRow][startCol] = true;

    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        let [r, c] = queue.shift();
        for (let d = 0; d < 4; d++) {
            let nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && !vis[nr][nc] && grid[nr][nc] === 1) {
                vis[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }
}
```

### Template: DFS on Grid

```javascript
function dfsGrid(grid, r, c, vis) {
    let rows = grid.length, cols = grid[0].length;
    if (r < 0 || r >= rows || c < 0 || c >= cols
        || vis[r][c] || grid[r][c] !== 1) return;

    vis[r][c] = true;
    dfsGrid(grid, r + 1, c, vis);
    dfsGrid(grid, r - 1, c, vis);
    dfsGrid(grid, r, c + 1, vis);
    dfsGrid(grid, r, c - 1, vis);
}
```

---

## 20. Problem Map — All Covered Problems

### 📁 1. Learning
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Count the number of graphs | Combinatorics: 2^(n*(n-1)/2) |
| 02 | Graph Representation | Adjacency list from edge list |
| 03 | BFS | Breadth-first traversal |
| 04 | DFS | Depth-first traversal |

### 📁 2. Traversal Problems
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Number of Provinces | Connected components (DFS) |
| 02 | Rotten Oranges | Multi-source BFS |
| 03 | Flood Fill | BFS/DFS on grid |
| 04 | Detect Cycle in Undirected Graph | DFS + parent tracking |
| 05 | 01 Matrix | Multi-source BFS from 0-cells |
| 06 | Surrounded Regions | Border DFS + flip |
| 07 | Number of Enclaves | Border DFS + count remaining |
| 08 | Word Ladder | BFS on word graph |
| 10 | Distinct Islands | DFS + path encoding in Set |
| 11 | Bipartite Graph | DFS 2-coloring |
| 12 | Detect Cycle in Directed Graph | DFS + backtracking path |

### 📁 3. Topo Sort Problems
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Topological Sorting | DFS post-order reverse |
| 02 | Kahn's Algorithm | BFS + in-degree |
| 03 | Course Schedule I | Kahn's → can finish? |
| 04 | Course Schedule II | Kahn's → ordering |
| 05 | Find Eventual Safe State | Reverse graph + outdegree |
| 06 | Alien Dictionary | Build graph from word order + Kahn's |

### 📁 4. Shortest Path Problems
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Shortest Path (Unit Distance) | BFS |
| 02 | Shortest Path in DAG | Topo sort + relaxation |
| 03 | Dijkstra's Algorithm | Min-heap + relaxation |
| 04 | Shortest Path in Binary Matrix | BFS (8-directional) |
| 05 | Path with Minimum Effort | Dijkstra on grid |
| 06 | Cheapest Flights with K Stops | BFS level-wise (K levels) |
| 07 | Network Delay Time | Dijkstra + max distance |
| 08 | Bellman-Ford Algorithm | V-1 relaxation passes |
| 09 | Floyd-Warshall Algorithm | All-pairs DP |
| 10 | City with Smallest Neighbours | Dijkstra from each city |
| 11 | Ways to Arrive at Destination | Dijkstra + count ways |

### 📁 5. MST / Disjoint Set Problems
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Prim's Algorithm | MST with min-heap |
| 02 | Kruskal's Algorithm | MST with Union-Find |
| 03 | Number of Operations to Make Network | Union-Find components |
| 04 | Most Stones Removed | Union-Find (row/col grouping) |
| 05 | Account Merge | Union-Find on emails |
| 06 | Number of Islands II | Online Union-Find |
| 07 | Making Large Island | Union-Find + flip 0→1 |
| 08 | Swim in Rising Water | Dijkstra / min-heap on grid |

### 📁 6. Other Algorithms
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Bridges in Graph | Tarjan's (tin/low arrays) |
| 02 | Strongly Connected Components | Kosaraju's (2-pass DFS) |

---

> 💡 **Tip:** When stuck on a graph problem in an interview, always start by asking:
> 1. What are the **nodes**?
> 2. What are the **edges**?
> 3. Is it **directed** or **undirected**?
> 4. Is it **weighted**?
> 5. What am I being asked to find — **shortest path**, **connectivity**, **ordering**, **components**?
>
> The answers to these 5 questions will immediately narrow down your algorithm choice.

