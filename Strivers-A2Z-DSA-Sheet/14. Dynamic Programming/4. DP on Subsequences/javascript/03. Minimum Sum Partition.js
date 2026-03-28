/*
=============================================================================
  QUESTION: Minimum Sum Partition (GFG)
=============================================================================

  Divide array into S1, S2. Minimize |S1 - S2|.
  Build subset-sum dp, then check all reachable sums.

  Example: [1,6,11,5] → 1 ({1,5,6}=12, {11}=11)

=============================================================================
  APPROACH: Tabulation — O(N×totalSum) Time, O(totalSum) Space
=============================================================================
*/

function minDifference(arr) {
    let n = arr.length;
    let total = arr.reduce((a, b) => a + b, 0);

    let prev = new Array(total + 1).fill(false);
    prev[0] = true;
    if (arr[0] <= total) prev[arr[0]] = true;

    for (let i = 1; i < n; i++) {
        let curr = new Array(total + 1).fill(false);
        curr[0] = true;
        for (let s = 1; s <= total; s++) {
            let take = arr[i] <= s ? prev[s - arr[i]] : false;
            curr[s] = take || prev[s];
        }
        prev = curr;
    }

    let ans = Infinity;
    for (let s = 0; s <= total; s++) {
        if (prev[s]) ans = Math.min(ans, Math.abs(s - (total - s)));
    }
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minDifference([1, 6, 11, 5]));  // 1
console.log(minDifference([1, 2, 3]));       // 0

