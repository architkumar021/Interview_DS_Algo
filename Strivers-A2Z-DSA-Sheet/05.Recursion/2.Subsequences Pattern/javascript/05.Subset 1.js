/*
=============================================================================
  QUESTION: Subset Sums (GFG) — Subset 1
=============================================================================

  Given a list of N integers, print the sums of all subsets.

  Example: [2, 3] → [0, 2, 3, 5]
  (subsets: {} → 0, {2} → 2, {3} → 3, {2,3} → 5)

=============================================================================
  APPROACH: Pick / Not-Pick with Running Sum
=============================================================================

  Instead of building subsets, we just track the running SUM.
  - Include: add arr[index] to sum, recurse
  - Exclude: don't add, recurse
  - Base case: index == arr.length → push current sum

  DRY RUN with [2, 3]:
  ──────────────────────
  solve(0, sum=0)
    Include 2: solve(1, sum=2)
      Include 3: solve(2, sum=5) → PUSH 5
      Exclude 3: solve(2, sum=2) → PUSH 2
    Exclude 2: solve(1, sum=0)
      Include 3: solve(2, sum=3) → PUSH 3
      Exclude 3: solve(2, sum=0) → PUSH 0

  ans = [5, 2, 3, 0] → sorted: [0, 2, 3, 5] ✓

  Time Complexity:  O(2^N + 2^N log 2^N) = O(2^N × N) for sorting
  Space Complexity: O(2^N) — storing all subset sums

=============================================================================
*/

function solve(index, sum, arr, ans) {
    // Base case: decided for all elements → record this sum
    if (index === arr.length) {
        ans.push(sum);
        return;
    }

    // Include current element in sum
    solve(index + 1, sum + arr[index], arr, ans);

    // Exclude current element
    solve(index + 1, sum, arr, ans);
}

function subsetSums(arr) {
    let ans = [];
    solve(0, 0, arr, ans);
    ans.sort((a, b) => a - b);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsetSums([2, 3]));      // [0, 2, 3, 5]
console.log(subsetSums([1, 2, 3]));   // [0, 1, 2, 3, 3, 4, 5, 6]
