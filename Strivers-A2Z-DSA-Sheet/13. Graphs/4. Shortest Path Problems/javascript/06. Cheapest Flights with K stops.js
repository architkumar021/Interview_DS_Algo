/*
=============================================================================
  QUESTION: 787. Cheapest Flights Within K Stops (LeetCode)
=============================================================================

  There are n cities connected by some number of flights. You are given:
    - flights[i] = [from, to, price]
    - src: source city
    - dst: destination city
    - k: maximum number of stops allowed

  Return the cheapest price from src to dst with at most k stops.
  If no such route exists, return -1.

  Note: A "stop" is an intermediate city (not counting src and dst).

  Example 1:
    n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    src=0, dst=3, k=1

    Output: 700

    Explanation:
      - 0 → 1 → 3 = 100+600 = 700  (1 stop at city 1) ✓
      - 0 → 1 → 2 → 3 = 100+100+200 = 400  (2 stops) ✗ (exceeds k=1)

  Example 2:
    n=3, flights=[[0,1,100],[1,2,100],[0,2,500]]
    src=0, dst=2, k=1

    Output: 200

    Explanation:
      - 0 → 1 → 2 = 100+100 = 200  (1 stop) ✓
      - 0 → 2 = 500 (0 stops, but more expensive)

  Example 3:
    n=3, flights=[[0,1,100],[1,2,100],[0,2,500]]
    src=0, dst=2, k=0

    Output: 500

    Explanation: With 0 stops, only direct flight 0→2 at cost 500.

=============================================================================
  WHY REGULAR DIJKSTRA FAILS HERE
=============================================================================

  Dijkstra greedily picks the cheapest path. But it might use too many stops.
  A more expensive path with fewer stops might be the only valid answer.

  Example: If Dijkstra finds path costing 400 with 3 stops, but k=1,
  we need the path costing 700 with 1 stop instead.

  We need to consider BOTH cost AND number of stops.

=============================================================================
  APPROACH 1: Brute Force — DFS (Try all paths)
=============================================================================

  Explore all paths from src to dst using DFS.
  Prune paths that exceed k stops.
  Track minimum cost among valid paths.

  Time Complexity:  O(n^k) — exponential in worst case
  Space Complexity: O(k) for recursion depth

=============================================================================
*/

function findCheapestPriceBrute(n, flights, src, dst, k) {
    // Build adjacency list
    let adj = Array.from({ length: n }, () => []);
    for (let [from, to, price] of flights) {
        adj[from].push([to, price]);
    }

    let minCost = Infinity;

    // DFS: node, current cost, stops remaining
    function dfs(node, cost, stopsLeft) {
        if (node === dst) {
            minCost = Math.min(minCost, cost);
            return;
        }

        // No more stops allowed
        if (stopsLeft < 0) return;

        // Prune: already more expensive than known minimum
        if (cost >= minCost) return;

        for (let [next, price] of adj[node]) {
            dfs(next, cost + price, stopsLeft - 1);
        }
    }

    dfs(src, 0, k);
    return minCost === Infinity ? -1 : minCost;
}

/*
=============================================================================
  APPROACH 2: Bellman-Ford Style (Relax k+1 times)
=============================================================================

  Idea: Bellman-Ford relaxes ALL edges V-1 times. Here, we only need k+1
  iterations (k stops = k+1 edges max).

  In each iteration, we make a COPY of the distance array before relaxing.
  This ensures we only use paths of increasing length (stops).

  Algorithm:
    1. Initialize dist[] = Infinity, dist[src] = 0.
    2. For k+1 iterations:
       a. Copy dist[] to temp[].
       b. For each flight (u → v, price):
          if temp[v] > dist[u] + price, update temp[v].
       c. Set dist = temp.
    3. Return dist[dst] or -1 if Infinity.

  Time Complexity:  O(k * E) where E = number of flights
  Space Complexity: O(n)

  Dry Run:
    n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    src=0, dst=3, k=1

    dist = [0, ∞, ∞, ∞]

    Iteration 1 (using 1 edge):
      0→1: dist[1] = min(∞, 0+100) = 100
      1→2: dist[2] = min(∞, ∞+100) = ∞ (src dist for 1 was ∞ at start of round)
      Wait — we use the OLD dist for source!
      So: use prev = [0, ∞, ∞, ∞]
        0→1: 0+100=100 < ∞ → dist[1]=100
        1→2: ∞+100 → skip (src=∞)
        2→0: ∞+100 → skip
        1→3: ∞+600 → skip
        2→3: ∞+200 → skip
      dist = [0, 100, ∞, ∞]

    Iteration 2 (using 2 edges = 1 stop):
      prev = [0, 100, ∞, ∞]
        0→1: 0+100=100 = 100 → no change
        1→2: 100+100=200 < ∞ → dist[2]=200
        2→0: ∞ → skip
        1→3: 100+600=700 < ∞ → dist[3]=700
        2→3: ∞ → skip
      dist = [0, 100, 200, 700]

    Result: dist[3] = 700 ✓

=============================================================================
*/

function findCheapestPriceBellman(n, flights, src, dst, k) {
    // Initialize distances
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    // Relax edges k+1 times (k stops = k+1 edges)
    for (let i = 0; i <= k; i++) {
        // IMPORTANT: Make a copy to avoid using updates from this round
        let temp = [...dist];

        for (let [from, to, price] of flights) {
            // Only relax if source is reachable
            if (dist[from] !== Infinity) {
                temp[to] = Math.min(temp[to], dist[from] + price);
            }
        }

        dist = temp;
    }

    return dist[dst] === Infinity ? -1 : dist[dst];
}

/*
=============================================================================
  APPROACH 3: Optimal — BFS (Level-by-Level, Striver's Approach)
=============================================================================

  Idea: BFS where each level represents one stop.
  Process level by level — at each level, we've used one more edge.
  Stop after k+1 levels (k stops = k+1 edges from src).

  Key: Use a dist[] array. Only push to next level if we improve the cost.

  Why BFS works:
    - Level 0: Direct flights from src (0 stops)
    - Level 1: Flights with 1 stop
    - ...
    - Level k: Flights with k stops

  We DON'T need a priority queue because we're bounded by levels, not cost.

  Time Complexity:  O(k * E) — at most k levels, each checking all flights
  Space Complexity: O(n + E)

  Dry Run:
    n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    src=0, dst=3, k=1

    adj: 0→[(1,100)], 1→[(2,100),(3,600)], 2→[(0,100),(3,200)]
    dist = [0, ∞, ∞, ∞]
    queue = [(0, 0)]  → (node, cost)
    stops = 0

    Level 0 (stops=0):
      Process (0, 0):
        → neighbor 1: cost=0+100=100 < ∞ → dist[1]=100, push (1,100)
      queue = [(1, 100)]

    Level 1 (stops=1):
      Process (1, 100):
        → neighbor 2: cost=100+100=200 < ∞ → dist[2]=200, push (2,200)
        → neighbor 3: cost=100+600=700 < ∞ → dist[3]=700, push (3,700)
      stops = 2 > k=1 → STOP

    Result: dist[3] = 700 ✓

=============================================================================
*/

function findCheapestPrice(n, flights, src, dst, k) {
    // Step 1: Build adjacency list
    let adj = Array.from({ length: n }, () => []);
    for (let [from, to, price] of flights) {
        adj[from].push([to, price]);
    }

    // Step 2: Initialize distance array
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    // Step 3: BFS level by level (each level = one stop)
    let queue = [[src, 0]]; // [node, cost]
    let stops = 0;

    while (queue.length > 0 && stops <= k) {
        let nextLevel = [];

        for (let [node, cost] of queue) {
            for (let [neighbor, price] of adj[node]) {
                let newCost = cost + price;

                // Only push if we found a cheaper route
                if (newCost < dist[neighbor]) {
                    dist[neighbor] = newCost;
                    nextLevel.push([neighbor, newCost]);
                }
            }
        }

        queue = nextLevel;
        stops++;
    }

    return dist[dst] === Infinity ? -1 : dist[dst];
}

/*
=============================================================================
  KEY TAKEAWAYS:
=============================================================================

  1. Dijkstra alone doesn't work — it ignores the stop constraint.
  2. Bellman-Ford (k+1 iterations) naturally handles the stop limit.
     CRITICAL: Copy the dist array before each iteration to avoid
     using updates from the same round.
  3. BFS level-by-level is the most intuitive — each level = one stop.
  4. Both Bellman-Ford and BFS approaches: O(k * E) time.

  Common Mistake:
    - In Bellman-Ford, if you don't copy the dist array, you might
      use a path with more edges than allowed in the current iteration.

  When to use what:
    - No stop limit → Dijkstra
    - With stop limit → BFS level-by-level or Bellman-Ford (k+1 rounds)

=============================================================================
  DRIVER CODE (for testing)
=============================================================================
*/

function test() {
    let flights1 = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]];
    console.log("Brute:", findCheapestPriceBrute(4, flights1, 0, 3, 1));    // 700
    console.log("Bellman:", findCheapestPriceBellman(4, flights1, 0, 3, 1)); // 700
    console.log("BFS:", findCheapestPrice(4, flights1, 0, 3, 1));           // 700

    let flights2 = [[0,1,100],[1,2,100],[0,2,500]];
    console.log("BFS k=1:", findCheapestPrice(3, flights2, 0, 2, 1));       // 200
    console.log("BFS k=0:", findCheapestPrice(3, flights2, 0, 2, 0));       // 500
}

test();
