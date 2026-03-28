/*
=============================================================================
  QUESTION: Count Distinct Subsequences (GFG)
=============================================================================

  Given string of lowercase alphabets, find number of distinct subsequences.
  Answer modulo 10^9 + 7.

  Examples:
    "gfg" → 7  ("", "g", "f", "gf", "fg", "gg", "gfg")
    "abc" → 8  (all 2^3 = 8 distinct, no duplicates)
    "aa"  → 3  ("", "a", "aa")

=============================================================================
  APPROACH: Pick / Not-Pick + Set — O(2^N) Time, O(2^N) Space
=============================================================================

  Same pick/not-pick as Power Set, but use a Set to eliminate duplicates.

  Why duplicates?  In "gfg": pick idx0('g') skip idx2('g') = "g"
                             skip idx0('g') pick idx2('g') = "g"  ← same!
  Set automatically handles this.

  Dry Run ("gf"):
    solve(0, "") → pick 'g': solve(1, "g") → pick 'f': add "gf"
                                             → skip 'f': add "g"
                 → skip 'g': solve(1, "")  → pick 'f': add "f"
                                             → skip 'f': add ""
    Set = {"gf", "g", "f", ""} → size = 4 ✓

=============================================================================
*/

function distinctSubsequences(s) {
    let set = new Set();

    function solve(index, temp) {
        if (index === s.length) {
            set.add(temp);
            return;
        }
        solve(index + 1, temp + s[index]);  // Include
        solve(index + 1, temp);              // Exclude
    }

    solve(0, "");
    return set.size % (1e9 + 7);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(distinctSubsequences("gfg"));  // 7
console.log(distinctSubsequences("abc"));  // 8
console.log(distinctSubsequences("aa"));   // 3
