/*
Question:
There are numCourses courses labeled 0 to numCourses-1. Given prerequisites[i] = [ai, bi]
meaning you must take bi before ai. Return true if you can finish all courses.

Approach:
- Model as a directed graph with Kahn's algorithm (topological sort).
- If we can process all nodes, no cycle exists → can finish all courses.

Time Complexity: O(N + E)
Space Complexity: O(N + E)
*/

function canFinish(numCourses, prerequisites) {
    let indeg = new Array(numCourses).fill(0);
    let adj = Array.from({ length: numCourses }, () => []);

    for (let it of prerequisites) {
        indeg[it[0]]++;
        adj[it[1]].push(it[0]);
    }

    let queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indeg[i] === 0) queue.push(i);
    }

    let cnt = 0;
    while (queue.length > 0) {
        let node = queue.shift();
        cnt++;
        for (let v of adj[node]) {
            indeg[v]--;
            if (indeg[v] === 0) queue.push(v);
        }
    }

    return cnt === numCourses;
}

