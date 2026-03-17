/*
Question:
Given a DAG (directed acyclic graph), print the Topological sorting of a given graph.

Approach:
- Perform DFS. As we finish exploring a node and backtrack, add it to the result.
- Reverse the result to get the topological order.

Time Complexity: O(V + E)
Space Complexity: O(V)
*/

function dfs(node, adj, vis, ans) {
    vis[node] = true;
    for (let v of adj[node]) {
        if (!vis[v]) {
            dfs(v, adj, vis, ans);
        }
    }
    ans.push(node);
}

function topologicalSort(graph, edges, nodes) {
    let adj = Array.from({ length: nodes }, () => []);
    for (let it of graph) {
        adj[it[0]].push(it[1]);
    }
    let vis = new Array(nodes).fill(false);
    let ans = [];
    for (let i = 0; i < nodes; i++) {
        if (!vis[i]) {
            dfs(i, adj, vis, ans);
        }
    }

    ans.reverse();
    return ans;
}

