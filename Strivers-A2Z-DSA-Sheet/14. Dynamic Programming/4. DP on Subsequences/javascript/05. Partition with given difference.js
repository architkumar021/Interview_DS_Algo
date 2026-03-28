/*
=============================================================================
  QUESTION: Partition with Given Difference (GFG)
=============================================================================

  Count partitions where S1 - S2 = D (S1 >= S2).
  Trick: S1 = (totalSum + D) / 2. Count subsets with sum = S1.

  Example: arr=[5,2,6,4], d=3 → 1 ({6,4} - {5,2} = 3)

=============================================================================
  APPROACH: Space Optimized — O(N×target) Time, O(target) Space
=============================================================================
*/

const MOD = 1e9 + 7;

function countPartitions(arr, d) {
    let total = arr.reduce((a, b) => a + b, 0);
    if ((total + d) % 2 !== 0 || total + d < 0) return 0;
    let target = (total + d) / 2;

    let n = arr.length;
    let prev = new Array(target + 1).fill(0);
    if (arr[0] === 0) prev[0] = 2;
    else { prev[0] = 1; if (arr[0] <= target) prev[arr[0]] = 1; }

    for (let i = 1; i < n; i++) {
        let curr = new Array(target + 1).fill(0);
        for (let s = 0; s <= target; s++) {
            let take = arr[i] <= s ? prev[s - arr[i]] : 0;
            curr[s] = (take + prev[s]) % MOD;
        }
        prev = curr;
    }
    return prev[target];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(countPartitions([5, 2, 6, 4], 3));  // 1
console.log(countPartitions([1, 1, 1, 1], 0));  // 6

