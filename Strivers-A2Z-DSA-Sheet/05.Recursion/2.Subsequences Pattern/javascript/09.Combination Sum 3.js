/*
=============================================================================
  QUESTION: 216. Combination Sum III (LeetCode)
=============================================================================

  Find all combinations of k numbers from 1-9 (each used once) summing to n.

  Examples:
    k=3, n=7 → [[1,2,4]]
    k=3, n=9 → [[1,2,6],[1,3,5],[2,3,4]]

=============================================================================
  APPROACH: Pick / Not-Pick (1 to 9) — O(2^9) Time, O(k) Space
=============================================================================

  Same as Combination Sum 2 but with fixed pool: numbers 1 to 9.
  Extra constraint: exactly k numbers must be picked.

  Dry Run k=3, n=7:
    pick 1 → pick 2 → pick 3: sum=6≠7 ✗ | pick 4: sum=7 & k=3 → PUSH [1,2,4] ✓
                     → skip 2 → pick 3 → pick 4: sum=8>7 ✗
    skip 1 → pick 2 → pick 3 → pick 4: sum=9>7 ✗
    Result: [[1,2,4]] ✓

=============================================================================
*/

function combinationSum3(k, n) {
    let result = [];

    function solve(num, target, temp) {
        // Found valid combination: exactly k numbers summing to target
        if (target === 0 && temp.length === k) {
            result.push([...temp]);
            return;
        }

        // Invalid: out of range or exceeded target
        if (num > 9 || target < 0) return;

        // PICK current number
        if (num <= target) {
            temp.push(num);
            solve(num + 1, target - num, temp);
            temp.pop();  // Backtrack
        }

        // SKIP current number
        solve(num + 1, target, temp);
    }

    solve(1, n, []);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(combinationSum3(3, 7));   // [[1,2,4]]
console.log(combinationSum3(3, 9));   // [[1,2,6],[1,3,5],[2,3,4]]
console.log(combinationSum3(2, 5));   // [[1,4],[2,3]]
