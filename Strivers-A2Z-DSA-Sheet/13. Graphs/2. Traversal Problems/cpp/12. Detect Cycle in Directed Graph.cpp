/*
=============================================================================
  QUESTION: Detect Cycle in a Directed Graph (GFG / LeetCode 207)
=============================================================================

  Given a Directed Graph with V vertices and E edges, check whether it
  contains any cycle or not.

  Example 1: (Has cycle)
    Edges: [[0,1],[1,2],[2,3],[3,1]]  →  cycle: 1 → 2 → 3 → 1

  Example 2: (No cycle)
    Edges: [[0,1],[1,2],[2,3]]

=============================================================================
  WHY IS DIRECTED GRAPH CYCLE DETECTION DIFFERENT FROM UNDIRECTED?
=============================================================================
  In directed graphs, a visited node doesn't always mean a cycle!
    0 → 1 → 3
    0 → 2 → 3   (node 3 visited twice, but NO cycle)

  KEY: Check if a node is in the CURRENT DFS PATH (recursion stack),
  not just globally visited.
=============================================================================
*/

#include <bits/stdc++.h>
using namespace std;

// ==========================================================================
// APPROACH 1: DFS with Path Visited (Recursion Stack)
// ==========================================================================
/*
  - vis[]      → globally visited
  - pathVis[]  → in current DFS path (recursion stack)
  - Enter node: vis = true, pathVis = true
  - Leave node: pathVis = false (backtrack)
  - If neighbor has pathVis = true → CYCLE!

  Time: O(V + E), Space: O(V)

  DRY RUN: edges = [[0,1],[1,2],[2,3],[3,1]], V=4
    Adj: 0→[1], 1→[2], 2→[3], 3→[1]
    DFS(0) → DFS(1) → DFS(2) → DFS(3)
      → neighbor 1: pathVis[1]=T → CYCLE! (1→2→3→1)
*/

bool dfs(int node, vector<int> adj[], vector<bool>& vis, vector<bool>& pathVis) {
    vis[node] = true;
    pathVis[node] = true;

    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            if (dfs(neighbor, adj, vis, pathVis)) return true;
        } else if (pathVis[neighbor]) {
            return true; // In current path → CYCLE
        }
    }

    pathVis[node] = false; // Backtrack
    return false;
}

bool isCyclicDFS(vector<vector<int>>& edges, int v, int e) {
    vector<int> adj[v];
    for (auto& it : edges) {
        adj[it[0]].push_back(it[1]);
    }

    vector<bool> vis(v, false);
    vector<bool> pathVis(v, false);

    for (int i = 0; i < v; i++) {
        if (!vis[i] && dfs(i, adj, vis, pathVis)) return true;
    }
    return false;
}


// ==========================================================================
// APPROACH 2: BFS (Kahn's Algorithm - Topological Sort)
// ==========================================================================
/*
  - If topological sort can't include all nodes → CYCLE EXISTS
  - Nodes in a cycle always have in-degree ≥ 1, never enter queue

  Time: O(V + E), Space: O(V)

  DRY RUN: edges = [[0,1],[1,2],[2,3],[3,1]], V=4
    In-degree: [0, 2, 1, 1]
    Queue = [0] → Pop 0, count=1
      neighbor 1: indeg 2→1 (not 0)
    Queue empty. count=1 < V=4 → CYCLE! ✓

  DRY RUN: edges = [[0,1],[1,2],[2,3]], V=4
    In-degree: [0, 1, 1, 1]
    Queue = [0] → [1] → [2] → [3], count=4
    count=4 == V=4 → NO CYCLE ✓
*/

bool isCyclicBFS(vector<vector<int>>& edges, int v, int e) {
    vector<int> adj[v];
    vector<int> inDegree(v, 0);

    for (auto& it : edges) {
        adj[it[0]].push_back(it[1]);
        inDegree[it[1]]++;
    }

    queue<int> q;
    for (int i = 0; i < v; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    int count = 0;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        count++;

        for (int neighbor : adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) q.push(neighbor);
        }
    }

    return count < v; // Not all processed → cycle
}


// ==========================================================================
// DRIVER CODE
// ==========================================================================
int main() {
    vector<vector<int>> edges1 = {{0,1},{1,2},{2,3},{3,1}};
    cout << "Test 1 (DFS): " << isCyclicDFS(edges1, 4, 4) << endl;  // 1
    cout << "Test 1 (BFS): " << isCyclicBFS(edges1, 4, 4) << endl;  // 1

    vector<vector<int>> edges2 = {{0,1},{1,2},{2,3}};
    cout << "Test 2 (DFS): " << isCyclicDFS(edges2, 4, 3) << endl;  // 0
    cout << "Test 2 (BFS): " << isCyclicBFS(edges2, 4, 3) << endl;  // 0

    vector<vector<int>> edges3 = {{0,1},{2,3},{3,2}};
    cout << "Test 3 (DFS): " << isCyclicDFS(edges3, 4, 3) << endl;  // 1
    cout << "Test 3 (BFS): " << isCyclicBFS(edges3, 4, 3) << endl;  // 1

    return 0;
}
