/*
=============================================================================
  QUESTION: 0/1 Knapsack (GFG)
=============================================================================

  N items with weight[] and value[]. Knapsack capacity W.
  Each item picked at MOST ONCE. Maximize total value.

  Example: wt=[4,5,1], val=[1,2,3], W=4
    Pick item 2 (wt=1, val=3): total_wt=1, total_val=3
    Can't add item 0 (4+1=5 > 4) or item 1 (5+1=6 > 4)
    Answer: 3

  Example: wt=[1,3,4,5], val=[1,4,5,7], W=7
    Pick items 1,2 (wt=3+4=7, val=4+5=9)
    Answer: 9

=============================================================================
  PATTERN: Pick / Not-Pick with 2D State (index, remaining capacity)
=============================================================================

  solve(i, w) = max value using items 0..i with capacity w

  At each item i, TWO choices:
    PICK:     val[i] + solve(i-1, w - wt[i])   (if wt[i] <= w)
    NOT-PICK: solve(i-1, w)

  Base case: i==0 → if wt[0] <= w, return val[0], else 0

  Recursion Tree for wt=[1,3,4], val=[1,4,5], W=4:

                       solve(2, 4)
                      /            \
           pick: 5+solve(1,0)    skip: solve(1,4)
                  |               /              \
             5+solve(1,0)   pick:4+solve(0,1)  skip:solve(0,4)
                  |              |                  |
              5+0=5         4+val[0]=4+1=5      val[0]=1
                  
  Answer: max(5, 5, 1) = 5

=============================================================================
  APPROACH 1: Memoization — O(N×W) Time, O(N×W) Space
=============================================================================

  Dry Run: wt=[1,3,4,5], val=[1,4,5,7], W=7

    solve(3,7): pick=7+solve(2,2), skip=solve(2,7)
    solve(2,2): wt[2]=4>2 can't pick. skip=solve(1,2)
    solve(1,2): wt[1]=3>2 can't pick. skip=solve(0,2)
    solve(0,2): wt[0]=1<=2 → val[0]=1  → dp[0][2]=1
    dp[1][2] = 1, dp[2][2] = 1
    solve(2,7): pick=5+solve(1,3), skip=solve(1,7)
    solve(1,3): pick=4+solve(0,0)=4+0=4, skip=solve(0,3)=1 → dp[1][3]=4
    solve(1,7): pick=4+solve(0,4)=4+1=5, skip=solve(0,7)=1 → dp[1][7]=5
    dp[2][7] = max(5+4, 5) = max(9, 5) = 9
    dp[3][7] = max(7+1, 9) = max(8, 9) = 9 ✓

=============================================================================
*/

function knapsackMemo(wt, val, W) {
    let n = wt.length;
    let dp = Array.from({ length: n }, () => new Array(W + 1).fill(-1));

    function solve(i, w) {
        // Base case: first item — take it if it fits
        if (i === 0) return w >= wt[0] ? val[0] : 0;

        // Return cached
        if (dp[i][w] !== -1) return dp[i][w];

        // PICK: take item i (only if weight allows)
        let take = w >= wt[i]
            ? val[i] + solve(i - 1, w - wt[i])
            : -Infinity;

        // NOT-PICK: skip item i
        let skip = solve(i - 1, w);

        return dp[i][w] = Math.max(take, skip);
    }

    return solve(n - 1, W);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N×W) Time, O(N×W) Space
=============================================================================

  2D table dp[i][w]: max value using items 0..i with capacity w.

  Fill order: i=0 to n-1, w=0 to W (left to right, top to bottom).

  Base case row (i=0):
    dp[0][w] = val[0] if w >= wt[0], else 0

  Transition:
    dp[i][w] = max(val[i] + dp[i-1][w-wt[i]],  ← pick
                   dp[i-1][w])                    ← skip

=============================================================================
*/

function knapsackTab(wt, val, W) {
    let n = wt.length;
    let dp = Array.from({ length: n }, () => new Array(W + 1).fill(0));

    // Base case: first item
    for (let w = wt[0]; w <= W; w++) dp[0][w] = val[0];

    // Fill table
    for (let i = 1; i < n; i++) {
        for (let w = 0; w <= W; w++) {
            let take = w >= wt[i] ? val[i] + dp[i - 1][w - wt[i]] : -Infinity;
            dp[i][w] = Math.max(take, dp[i - 1][w]);
        }
    }
    return dp[n - 1][W];
}

/*
=============================================================================
  APPROACH 3: Space Optimized — O(N×W) Time, O(W) Space
=============================================================================

  dp[i][w] only depends on dp[i-1][...] → use 2 rows: prev & curr.

  Key insight:
    take = val[i] + prev[w - wt[i]]   ← previous row, smaller index
    skip = prev[w]                      ← previous row, same index
  → Only need prev row! Replace curr with prev after each item.

=============================================================================
*/

function knapsack(wt, val, W) {
    let n = wt.length;
    let prev = new Array(W + 1).fill(0);

    // Base: first item
    for (let w = wt[0]; w <= W; w++) prev[w] = val[0];

    for (let i = 1; i < n; i++) {
        let curr = new Array(W + 1).fill(0);
        for (let w = 0; w <= W; w++) {
            let take = w >= wt[i] ? val[i] + prev[w - wt[i]] : -Infinity;
            curr[w] = Math.max(take, prev[w]);
        }
        prev = curr;
    }
    return prev[W];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(knapsackMemo([4,5,1], [1,2,3], 4));          // 3
console.log(knapsackTab([1,3,4,5], [1,4,5,7], 7));       // 9
console.log(knapsack([4,5,1], [1,2,3], 4));               // 3
console.log(knapsack([1,3,4,5], [1,4,5,7], 7));           // 9
