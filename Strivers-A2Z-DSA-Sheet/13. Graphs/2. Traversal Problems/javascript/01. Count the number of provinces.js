/*
Question:
Given an n x n matrix 'isConnected' representing connections between cities (nodes),
find the total number of provinces in the graph.

Approach:
- Convert the given matrix into an adjacency list.
- Use DFS to traverse and mark all connected cities as visited.
- Each new unvisited city starts a new province (connected component).

Time Complexity: O(n^2) - traverse the entire matrix to build adjacency list.
Space Complexity: O(n) - for adjacency list and visited array.
*/

function dfs(node, adj, vis) {
    vis[node] = true;
    for (let v of adj[node]) {
        if (!vis[v]) {
            dfs(v, adj, vis);
        }
    }
}

function findCircleNum(isConnected) {
    let ans = 0;
    let n = isConnected.length;
    let adj = Array.from({ length: n }, () => []);

    // Convert isConnected matrix into adjacency list
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (isConnected[i][j] === 1) {
                adj[i].push(j);
            }
        }
    }

    let vis = new Array(n).fill(false);

    // Perform DFS to find the number of provinces
    for (let i = 0; i < n; i++) {
        if (!vis[i]) {
            ans++;
            dfs(i, adj, vis);
        }
    }

    return ans;
}

