/*
=============================================================================
  QUESTION: Rod Cutting Problem (GFG)
=============================================================================

  Rod of length N. price[i] = value of piece of length (i+1).
  Cut rod into pieces to MAXIMIZE total value. Can cut same length many times.

  Example: price=[1,5,8,9,10,17,17,20], N=8
    Cut into lengths 2+6: price[1]+price[5] = 5+17 = 22 ✓

=============================================================================
  PATTERN: Unbounded Knapsack variant
=============================================================================

  Think of it as: N items where item i has:
    - Weight = i+1 (length of piece)
    - Value = price[i]
    - Knapsack capacity = N (rod length)
    - Each item unlimited (same length piece can be cut multiple times)

  solve(i, w) = max value using piece lengths 1..(i+1) for remaining rod w.
    PICK:     price[i] + solve(i, w-(i+1))   ← stay at i (unlimited!)
    NOT-PICK: solve(i-1, w)

  Base: i==0 → pieces of length 1 → floor(w/1) * price[0] = w * price[0]

=============================================================================
  APPROACH 1: Memoization — O(N²) Time, O(N²) Space
=============================================================================

  Dry Run: price=[1,5,8,9,10,17,17,20], N=8
    solve(7,8): pick=20+solve(7,0)=20, skip=solve(6,8)
    solve(6,8): pick=17+solve(6,1), skip=solve(5,8)
    solve(5,8): pick=17+solve(5,2), skip=solve(4,8)
    solve(5,2): 6>2 can't pick. skip=solve(4,2)
    ... eventually dp[1][8] = 5*4=20 (four pieces of length 2)
    dp[5][8] = max(17+solve(5,2), ...) → 22 (length 6 + length 2 = 17+5)
    Answer: 22 ✓

=============================================================================
*/

function cutRodMemo(price, N) {
    let dp = Array.from({ length: N }, () => new Array(N + 1).fill(-1));

    function solve(i, w) {
        // i = index (piece of length i+1), w = remaining rod length
        let len = i + 1;
        // Base: pieces of length 1 only
        if (i === 0) return Math.floor(w / len) * price[0];
        if (dp[i][w] !== -1) return dp[i][w];

        // PICK: use piece of length (i+1), stay at i (unlimited)
        let take = w >= len ? price[i] + solve(i, w - len) : -Infinity;
        // NOT-PICK: skip this piece length
        let skip = solve(i - 1, w);
        return dp[i][w] = Math.max(take, skip);
    }

    return solve(N - 1, N);
}

/*
=============================================================================
  APPROACH 2: Space Optimized — O(N²) Time, O(N) Space
=============================================================================

  Same pattern as Unbounded Knapsack space optimization.
  curr[w - len] for pick (same row, unbounded).

=============================================================================
*/

function cutRod(price, N) {
    let prev = new Array(N + 1).fill(0);
    // Base: i=0 → pieces of length 1
    for (let w = 0; w <= N; w++) prev[w] = w * price[0];

    for (let i = 1; i < N; i++) {
        let len = i + 1;
        let curr = new Array(N + 1).fill(0);
        for (let w = 0; w <= N; w++) {
            let take = w >= len ? price[i] + curr[w - len] : -Infinity;
            curr[w] = Math.max(take, prev[w]);
        }
        prev = curr;
    }
    return prev[N];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(cutRodMemo([1, 5, 8, 9, 10, 17, 17, 20], 8));  // 22
console.log(cutRod([1, 5, 8, 9, 10, 17, 17, 20], 8));      // 22

