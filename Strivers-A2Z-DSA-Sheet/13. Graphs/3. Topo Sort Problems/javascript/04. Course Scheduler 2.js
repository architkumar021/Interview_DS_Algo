/*
Question:
Return the ordering of courses you should take to finish all courses.
If impossible, return an empty array.

Approach:
- Use Kahn's algorithm (topological sort via BFS with indegree).
- The order in which nodes are popped from the queue is the course order.

Time Complexity: O(N + E)
Space Complexity: O(N + E)
*/

function findOrder(numCourses, prerequisites) {
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

    let courseOrder = [];
    while (queue.length > 0) {
        let node = queue.shift();
        courseOrder.push(node);
        for (let v of adj[node]) {
            indeg[v]--;
            if (indeg[v] === 0) queue.push(v);
        }
    }

    if (courseOrder.length === numCourses) return courseOrder;
    return [];
}

