/*
=============================================================================
  QUESTION: 78. Subsets / Power Set (LeetCode)
=============================================================================

  Given array of unique elements, return all possible subsets (power set).

  Example: [1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

=============================================================================
  APPROACH: Pick / Not-Pick Pattern — O(2^N) Time, O(N) Space
=============================================================================

  At each index, 2 choices: INCLUDE or EXCLUDE the element.
  Base case: index == length → add current subset to result.

  Tree for [1, 2]:
              []
           /      \
        [1]        []        ← pick/skip 1
       /    \    /    \
    [1,2]  [1] [2]    []    ← pick/skip 2

  Result: [[1,2], [1], [2], []] → 2^2 = 4 subsets ✓

=============================================================================
*/

function subsets(nums) {
    let result = [];

    function solve(index, temp) {
        if (index === nums.length) {
            result.push([...temp]);
            return;
        }

        // INCLUDE current element
        temp.push(nums[index]);
        solve(index + 1, temp);
        temp.pop();  // Backtrack

        // EXCLUDE current element
        solve(index + 1, temp);
    }

    solve(0, []);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(subsets([1, 2, 3]));
// [[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]]
