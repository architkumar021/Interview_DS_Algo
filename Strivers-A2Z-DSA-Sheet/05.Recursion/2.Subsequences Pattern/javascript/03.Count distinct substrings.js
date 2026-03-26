/*
=============================================================================
  QUESTION: Count Distinct Subsequences (GFG)
=============================================================================

  Given a string of lowercase alphabets, find the number of distinct subsequences.
  Answer modulo 10^9 + 7.

  Example: "gfg" → 7 ("", "g", "f", "gf", "fg", "gg", "gfg")
  Example: "abc" → 8 (all 2^3 = 8 are distinct since no duplicates)

=============================================================================
  APPROACH: Pick / Not-Pick + Set for Uniqueness
=============================================================================

  Same pick/not-pick pattern as Power Set, but:
  - We work with characters (not numbers)
  - We use a SET to automatically handle duplicates
  - At base case, insert the current subsequence string into the set

  Why Set?
  In "gfg", picking index 0 ('g') and skipping index 2 ('g') gives same
  result as skipping index 0 and picking index 2. Set eliminates this.

  DRY RUN with "gf":
  ────────────────────
  solve("gf", 0, "")
    INCLUDE 'g': solve("gf", 1, "g")
      INCLUDE 'f': solve("gf", 2, "gf") → set.add("gf")
      EXCLUDE 'f': solve("gf", 2, "g")  → set.add("g")
    EXCLUDE 'g': solve("gf", 1, "")
      INCLUDE 'f': solve("gf", 2, "f")  → set.add("f")
      EXCLUDE 'f': solve("gf", 2, "")   → set.add("")

  set = {"gf", "g", "f", ""} → size = 4 ✓

  Time Complexity:  O(2^N) — enumerate all subsequences
  Space Complexity: O(2^N) — storing in set

=============================================================================
*/

function solve(s, index, temp, set) {
    // Base case: processed all characters
    if (index === s.length) {
        set.add(temp);   // Set handles duplicates automatically
        return;
    }

    // INCLUDE current character
    solve(s, index + 1, temp + s[index], set);

    // EXCLUDE current character
    solve(s, index + 1, temp, set);
}

function distinctSubsequences(s) {
    let set = new Set();
    solve(s, 0, "", set);
    return set.size % (1e9 + 7);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(distinctSubsequences("gfg"));  // 7
console.log(distinctSubsequences("abc"));  // 8
console.log(distinctSubsequences("aa"));   // 3 ("", "a", "aa")
