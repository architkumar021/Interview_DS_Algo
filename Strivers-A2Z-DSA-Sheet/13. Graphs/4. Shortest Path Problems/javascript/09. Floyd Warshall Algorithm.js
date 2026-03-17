/*
Question:
Find the shortest distances between every pair of vertices in a given
edge-weighted directed graph. Matrix[i][j] = -1 means no edge from i to j.

Approach:
- Floyd-Warshall: For each intermediate vertex k, update dist(i,j) = min(dist(i,j), dist(i,k) + dist(k,j)).

Time Complexity: O(V^3)
Space Complexity: O(1) (in-place)
*/

function shortestDistance(matrix) {
    let v = matrix.length;

    // Replace -1 with Infinity
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            if (matrix[i][j] === -1) matrix[i][j] = 1e9;
        }
    }

    for (let k = 0; k < v; k++) {
        for (let i = 0; i < v; i++) {
            for (let j = 0; j < v; j++) {
                if (i === j) matrix[i][j] = 0;
                matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
            }
        }
    }

    // Replace Infinity back with -1
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            if (matrix[i][j] === 1e9) matrix[i][j] = -1;
        }
    }
}

