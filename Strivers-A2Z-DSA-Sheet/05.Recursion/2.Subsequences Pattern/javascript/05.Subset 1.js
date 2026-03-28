/*
=============================================================================
  QUESTION: Subset Sums (GFG) — Subset 1
=============================================================================

  Given list of N integers, return sums of all subsets in sorted order.

  Example: [2, 3] → [0, 2, 3, 5]  ({} → 0, {2} → 2, {3} → 3, {2,3} → 5)

=============================================================================
  APPROACH: Pick / Not-Pick with Running Sum — O(2^N × N) Time, O(2^N) Space
=============================================================================

  Track running sum instead of building actual subsets.
  - Include: add arr[index] to sum, recurse
  - Exclude: keep sum same, recurse
  - Base: index == length → push sum

  Dry Run [2, 3]:
    solve(0, 0) → pick 2: solve(1, 2) → pick 3: push 5 | skip 3: push 2
                → skip 2: solve(1, 0) → pick 3: push 3 | skip 3: push 0
    Sorted: [0, 2, 3, 5] ✓

=============================================================================
*/

function subsetSums(arr) {
    let result = [];

    function solve(index, sum) {
        if (index === arr.length) {
            result.push(sum);
            return;
        }
        solve(index + 1, sum + arr[index]);  // Include
        solve(index + 1, sum);                // Exclude
    }

    solve(0, 0);
    result.sort((a, b) => a - b);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsetSums([2, 3]));      // [0, 2, 3, 5]
console.log(subsetSums([1, 2, 3]));   // [0, 1, 2, 3, 3, 4, 5, 6]
