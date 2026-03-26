/*
=============================================================================
  GRAPH REPRESENTATION - ALL WAYS TO CREATE ADJACENCY LIST (JavaScript)
=============================================================================

  An adjacency list stores, for each node, a list of its neighbors.
  It's the most common graph representation for DSA problems.

  Below are ALL the ways you'll encounter in coding problems,
  organized by INPUT FORMAT.

=============================================================================
*/


// ==========================================================================
// 1. FROM EDGE LIST (Most Common in DSA Problems)
// ==========================================================================
// Input: n = number of nodes, edges = [[u, v], [u, v], ...]
// ==========================================================================

// ── 1a. Undirected Graph ──
// Each edge [u, v] means u↔v, so add both directions
function adjFromEdgesUndirected(n, edges) {
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}
/*
  Example: n=4, edges=[[0,1],[1,2],[2,3]]
  adj[0] = [1]
  adj[1] = [0, 2]
  adj[2] = [1, 3]
  adj[3] = [2]
*/


// ── 1b. Directed Graph ──
// Each edge [u, v] means u→v, so add only one direction
function adjFromEdgesDirected(n, edges) {
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v] of edges) {
        adj[u].push(v); // Only u → v
    }
    return adj;
}
/*
  Example: n=4, edges=[[0,1],[1,2],[2,3]]
  adj[0] = [1]
  adj[1] = [2]
  adj[2] = [3]
  adj[3] = []
*/


// ── 1c. Weighted Undirected Graph ──
// Each edge [u, v, w] means u↔v with weight w
function adjFromEdgesWeightedUndirected(n, edges) {
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }
    return adj;
}
/*
  Example: n=3, edges=[[0,1,5],[1,2,3]]
  adj[0] = [[1,5]]
  adj[1] = [[0,5], [2,3]]
  adj[2] = [[1,3]]
*/


// ── 1d. Weighted Directed Graph ──
function adjFromEdgesWeightedDirected(n, edges) {
    let adj = Array.from({ length: n }, () => []);
    for (let [u, v, w] of edges) {
        adj[u].push([v, w]); // Only u → v with weight w
    }
    return adj;
}


// ==========================================================================
// 2. FROM ADJACENCY MATRIX
// ==========================================================================
// Input: matrix[i][j] = 1 if edge between i and j, else 0
// ==========================================================================

function adjFromMatrix(matrix) {
    let n = matrix.length;
    let adj = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                adj[i].push(j);
            }
        }
    }
    return adj;
}
/*
  Example: matrix = [[0,1,0],
                      [1,0,1],
                      [0,1,0]]
  adj[0] = [1]
  adj[1] = [0, 2]
  adj[2] = [1]
*/


// Weighted version: matrix[i][j] = weight (0 means no edge)
function adjFromWeightedMatrix(matrix) {
    let n = matrix.length;
    let adj = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== 0) {
                adj[i].push([j, matrix[i][j]]);
            }
        }
    }
    return adj;
}


// ==========================================================================
// 3. FROM 2D GRID (BFS/DFS on Grid Problems)
// ==========================================================================
// Input: grid[row][col], treat each cell as a node
// Neighbors: up, down, left, right (4-directional)
// ==========================================================================

// ── 3a. No explicit adjacency list needed ──
// In grid problems, you typically DON'T build an adjacency list.
// Instead, use direction arrays on the fly:
function gridTraversal(grid) {
    let rows = grid.length, cols = grid[0].length;
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

    // For any cell (r, c), its neighbors are:
    let r = 0, c = 0; // example cell
    for (let [dr, dc] of directions) {
        let nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            // (nr, nc) is a valid neighbor of (r, c)
            console.log(`Neighbor of (${r},${c}): (${nr},${nc})`);
        }
    }
}

// ── 3b. 8-directional (includes diagonals) ──
function gridDirections8() {
    return [
        [-1, 0], [1, 0], [0, -1], [0, 1],     // up, down, left, right
        [-1, -1], [-1, 1], [1, -1], [1, 1]     // diagonals
    ];
}

// ── 3c. If you MUST build adjacency list from grid ──
function adjFromGrid(grid) {
    let rows = grid.length, cols = grid[0].length;
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Convert (r, c) → single index: r * cols + c
    let adj = Array.from({ length: rows * cols }, () => []);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0) continue; // skip walls/blocked cells
            let node = r * cols + c;
            for (let [dr, dc] of directions) {
                let nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                    adj[node].push(nr * cols + nc);
                }
            }
        }
    }
    return adj;
    // To convert back: row = Math.floor(index / cols), col = index % cols
}


// ==========================================================================
// 4. USING MAP (When Nodes Are NOT 0-indexed Numbers)
// ==========================================================================
// Input: nodes can be strings, large numbers, etc.
// ==========================================================================

// ── 4a. Using Map (string/any type nodes) ──
function adjWithMap(edges) {
    let adj = new Map();
    for (let [u, v] of edges) {
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        adj.get(u).push(v);
        adj.get(v).push(u);
    }
    return adj;
}
/*
  Example: edges = [["A","B"], ["B","C"], ["A","C"]]
  adj = Map {
    "A" → ["B", "C"],
    "B" → ["A", "C"],
    "C" → ["B", "A"]
  }
*/


// ── 4b. Using Plain Object (string keys only) ──
function adjWithObject(edges) {
    let adj = {};
    for (let [u, v] of edges) {
        if (!adj[u]) adj[u] = [];
        if (!adj[v]) adj[v] = [];
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}
/*
  Example: edges = [["NYC","LA"], ["LA","SF"]]
  adj = {
    "NYC": ["LA"],
    "LA": ["NYC", "SF"],
    "SF": ["LA"]
  }
*/


// ==========================================================================
// 5. USING SET (When You Need O(1) Neighbor Lookup)
// ==========================================================================
// Useful when you need to check "is X a neighbor of Y?" quickly
// ==========================================================================

function adjWithSet(n, edges) {
    let adj = Array.from({ length: n }, () => new Set());
    for (let [u, v] of edges) {
        adj[u].add(v);
        adj[v].add(u);
    }
    return adj;
    // Check neighbor: adj[0].has(1)  → O(1)
    // vs with array:  adj[0].includes(1) → O(degree)
}


// ==========================================================================
// 6. INPUT ALREADY IS AN ADJACENCY LIST
// ==========================================================================
// Some problems (like LeetCode 785 - Bipartite Graph) give you the
// adjacency list directly. NO conversion needed!
// ==========================================================================
/*
  Input: graph = [[1,3],[0,2],[1,3],[0,2]]
  graph[0] = [1, 3]  → node 0's neighbors are 1 and 3
  graph[1] = [0, 2]  → node 1's neighbors are 0 and 2
  Just use graph[node] directly!
*/


// ==========================================================================
// 7. FROM PARENT ARRAY (Tree Problems)
// ==========================================================================
// Input: parent[i] = parent of node i, parent[root] = -1
// ==========================================================================

function adjFromParentArray(parent) {
    let n = parent.length;
    let adj = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        if (parent[i] !== -1) {
            adj[parent[i]].push(i);
            adj[i].push(parent[i]); // bidirectional for tree traversal
        }
    }
    return adj;
}
/*
  Example: parent = [-1, 0, 0, 1, 1, 2]
  Tree:       0
            /   \
           1     2
          / \     \
         3   4     5

  adj[0] = [1, 2]
  adj[1] = [0, 3, 4]
  adj[2] = [0, 5]
  adj[3] = [1]
  adj[4] = [1]
  adj[5] = [2]
*/


// ==========================================================================
// 8. FROM PREREQUISITES / DEPENDENCY LIST
// ==========================================================================
// LeetCode 207/210 style: prerequisites = [[course, prereq], ...]
// Means: prereq → course (must take prereq before course)
// ==========================================================================

function adjFromPrerequisites(numCourses, prerequisites) {
    let adj = Array.from({ length: numCourses }, () => []);
    for (let [course, prereq] of prerequisites) {
        adj[prereq].push(course); // prereq → course
    }
    return adj;
}
/*
  Example: numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]
  Meaning: 0→1, 0→2, 1→3, 2→3
  adj[0] = [1, 2]
  adj[1] = [3]
  adj[2] = [3]
  adj[3] = []
*/


// ==========================================================================
// QUICK REFERENCE: WHICH WAY TO USE?
// ==========================================================================
/*
  ┌──────────────────────────────────────┬──────────────────────────┐
  │ Input Format                         │ Use                      │
  ├──────────────────────────────────────┼──────────────────────────┤
  │ edges = [[u,v], ...]                 │ #1 (Array of Arrays)     │
  │ edges = [[u,v,w], ...] (weighted)    │ #1c / #1d                │
  │ matrix[i][j] = 0/1                   │ #2 (From Matrix)         │
  │ grid[][] (2D grid BFS/DFS)           │ #3 (Direction Arrays)    │
  │ Nodes are strings/non-numeric        │ #4 (Map or Object)       │
  │ Need O(1) "is neighbor?" check       │ #5 (Set)                 │
  │ graph[i] = [neighbors] given         │ #6 (Use directly!)       │
  │ parent[] array (tree)                │ #7 (Parent Array)        │
  │ prerequisites = [[a,b], ...]         │ #8 (Dependency List)     │
  └──────────────────────────────────────┴──────────────────────────┘
*/


// ==========================================================================
// DRIVER CODE - TEST ALL METHODS
// ==========================================================================

console.log("=== 1a. Undirected from edges ===");
console.log(adjFromEdgesUndirected(4, [[0,1],[1,2],[2,3]]));
// [ [1], [0,2], [1,3], [2] ]

console.log("\n=== 1b. Directed from edges ===");
console.log(adjFromEdgesDirected(4, [[0,1],[1,2],[2,3]]));
// [ [1], [2], [3], [] ]

console.log("\n=== 1c. Weighted Undirected ===");
console.log(adjFromEdgesWeightedUndirected(3, [[0,1,5],[1,2,3]]));
// [ [[1,5]], [[0,5],[2,3]], [[1,3]] ]

console.log("\n=== 2. From Matrix ===");
console.log(adjFromMatrix([[0,1,0],[1,0,1],[0,1,0]]));
// [ [1], [0,2], [1] ]

console.log("\n=== 3. Grid traversal ===");
gridTraversal([[1,1],[1,1]]);

console.log("\n=== 4a. Map (string nodes) ===");
console.log(adjWithMap([["A","B"],["B","C"]]));
// Map { A→[B], B→[A,C], C→[B] }

console.log("\n=== 4b. Object (string nodes) ===");
console.log(adjWithObject([["NYC","LA"],["LA","SF"]]));

console.log("\n=== 5. Set (O(1) lookup) ===");
let setAdj = adjWithSet(3, [[0,1],[1,2]]);
console.log("0 has neighbor 1?", setAdj[0].has(1)); // true
console.log("0 has neighbor 2?", setAdj[0].has(2)); // false

console.log("\n=== 7. From Parent Array ===");
console.log(adjFromParentArray([-1, 0, 0, 1, 1, 2]));

console.log("\n=== 8. From Prerequisites ===");
console.log(adjFromPrerequisites(4, [[1,0],[2,0],[3,1],[3,2]]));
// [ [1,2], [3], [3], [] ]
