/*
Question:-

Count the number of undirected graphs that can be formed with n vertices.

Approach:-
- Calculate the number of edges with formula n*(n-1)/2
- Return 2^edges

Complexity Analysis:-

Time Complexity = O(1)
Space Complexity = O(1)
*/

function countingGraphs(n) {
    let edges = (n * (n - 1)) / 2;
    return Math.pow(2, edges);
}



// A connected component is a group of vertices in which every vertex can be reached from any other vertex in the same group.
// To count the number of connected components, we need to explore the graph so that each vertex is visited exactly once
// and grouped into its component.
//
// Approach:
//     We can do this using either DFS or BFS. Each time we start a new search from an unvisited vertex, we discover a new component and mark all vertices in that component as visited. This ensures that we don’t count the same component more than once.
//     Use a visited array to track the vertices that has been visited once.
//     Build an adjacency list from the given edges for efficient traversal.
//     For each vertex:
//     If the vertex is not visited, perform DFS/BFS starting from it.
//     This traversal will mark all vertices in the same component as visited.
//     Increment the number of components for every traversal.
//     Once all the vertices are visited, return the number of connected components.

class Solution {
    // Function to count connected components in an undirected graph
    countComponents(V, edges) {

        // Create adjacency list from edge list
        const adj = Array.from({ length: V }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        // Array to keep track of visited nodes
        const visited = new Array(V).fill(false);

        // Variable to count the number of connected components
        let components = 0;

        // Traverse all nodes in the graph
        for (let i = 0; i < V; i++) {

            // If the node is not visited, it's a new component
            if (!visited[i]) {
                components++;

                // Start BFS from this node
                const q = [];
                q.push(i);
                visited[i] = true;

                // Perform BFS traversal
                while (q.length > 0) {
                    const node = q.shift();

                    // Visit all unvisited neighbors
                    for (const nbr of adj[node]) {
                        if (!visited[nbr]) {
                            visited[nbr] = true;
                            q.push(nbr);
                        }
                    }
                }
            }
        }

        // Return the total number of connected components
        return components;
    }
}

// Number of vertices
const V = 5;

// List of undirected edges
const edges = [[0, 1], [1, 2], [3, 4]];

// Create solution object
const sol = new Solution();

// Print the number of connected components
console.log("Number of Connected Components:", sol.countComponents(V, edges));
