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
*/

#include <bits/stdc++.h>
using namespace std;

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
  color = [0, 0, 0, 0]   (all unvisited)

  Start DFS from node 0, color = 1 (RED):
    color = [1, 0, 0, 0]
    Visit neighbor 1 → unvisited → DFS(1, -1)
      color = [1, -1, 0, 0]
      Visit neighbor 0 → color[0]=1, not same as -1 → OK
      Visit neighbor 2 → unvisited → DFS(2, 1)
        color = [1, -1, 1, 0]
        Visit neighbor 1 → color[1]=-1, not same as 1 → OK
        Visit neighbor 3 → unvisited → DFS(3, -1)
          color = [1, -1, 1, -1]
          All neighbors colored with opposite → OK
          return true
        return true
      return true
    Visit neighbor 3 → color[3]=-1, not same as 1 → OK
    return true → BIPARTITE ✓
*/

bool dfs(int node, int col, vector<vector<int>>& graph, vector<int>& color) {
    color[node] = col; // Color current node

    for (int neighbor : graph[node]) {
        if (color[neighbor] == 0) {
            // Unvisited → color with opposite and continue DFS
            if (!dfs(neighbor, -col, graph, color)) return false;
        } else if (color[neighbor] == col) {
            // Same color as current → conflict → NOT bipartite
            return false;
        }
    }
    return true;
}

bool isBipartiteDFS(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, 0); // 0 = unvisited, 1 = RED, -1 = BLUE

    for (int i = 0; i < n; i++) {
        if (color[i] == 0) {
            if (!dfs(i, 1, graph, color)) return false;
        }
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
  color = [0, 0, 0, 0]

  BFS from node 0, color it 1 (RED):
    queue = [0], color = [1, 0, 0, 0]

    Pop 0 (RED=1):
      neighbors 1,2,3 → all unvisited → color -1 (BLUE)
      color = [1,-1,-1,-1], queue = [1,2,3]

    Pop 1 (BLUE=-1):
      neighbor 0 → color=1, opposite → OK
      neighbor 2 → color=-1, SAME as -1 → CONFLICT! return false ✗

  Nodes 1 and 2 are both BLUE and adjacent → NOT bipartite.
*/

bool isBipartiteBFS(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, 0);

    for (int i = 0; i < n; i++) {
        if (color[i] != 0) continue;

        queue<int> q;
        q.push(i);
        color[i] = 1;

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            for (int neighbor : graph[node]) {
                if (color[neighbor] == 0) {
                    color[neighbor] = -color[node];
                    q.push(neighbor);
                } else if (color[neighbor] == color[node]) {
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
int main() {
    // Test Case 1: Bipartite
    vector<vector<int>> graph1 = {{1,3},{0,2},{1,3},{0,2}};
    cout << "Graph 1 (DFS): " << isBipartiteDFS(graph1) << endl;  // 1 (true)
    cout << "Graph 1 (BFS): " << isBipartiteBFS(graph1) << endl;  // 1 (true)

    // Test Case 2: NOT Bipartite
    vector<vector<int>> graph2 = {{1,2,3},{0,2},{0,1,3},{0,2}};
    cout << "Graph 2 (DFS): " << isBipartiteDFS(graph2) << endl;  // 0 (false)
    cout << "Graph 2 (BFS): " << isBipartiteBFS(graph2) << endl;  // 0 (false)

    // Test Case 3: Disconnected bipartite
    vector<vector<int>> graph3 = {{1},{0},{3},{2}};
    cout << "Graph 3 (DFS): " << isBipartiteDFS(graph3) << endl;  // 1 (true)
    cout << "Graph 3 (BFS): " << isBipartiteBFS(graph3) << endl;  // 1 (true)

    return 0;
}
