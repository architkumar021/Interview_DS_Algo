/*
=============================================================================
  QUESTION: 17. Letter Combinations of a Phone Number (LeetCode)
=============================================================================

  Given string of digits 2-9, return all possible letter combinations.

  Phone mapping:
  2→abc  3→def  4→ghi  5→jkl  6→mno  7→pqrs  8→tuv  9→wxyz

  Example: "23" → ["ad","ae","af","bd","be","bf","cd","ce","cf"]
  Example: "2" → ["a","b","c"]

=============================================================================
  APPROACH: Recursion — Pick One Letter Per Digit
=============================================================================

  This is DIFFERENT from pick/not-pick. Here we MUST pick exactly one
  letter for each digit (no skip option).

  At each digit:
  - Get the letters mapped to this digit
  - Try EACH letter → recurse to next digit
  - Backtrack after each letter

  DRY RUN with "23":
  ────────────────────
  mp[2]="abc", mp[3]="def"

  solve(0, "23", "")
    digit='2', letters="abc"
      pick 'a': solve(1, "23", "a")
        digit='3', letters="def"
          pick 'd': solve(2, "23", "ad") → index==length → PUSH "ad" ✓
          pick 'e': solve(2, "23", "ae") → PUSH "ae" ✓
          pick 'f': solve(2, "23", "af") → PUSH "af" ✓
      pick 'b': solve(1, "23", "b")
        pick 'd': PUSH "bd" ✓
        pick 'e': PUSH "be" ✓
        pick 'f': PUSH "bf" ✓
      pick 'c': solve(1, "23", "c")
        pick 'd': PUSH "cd" ✓
        pick 'e': PUSH "ce" ✓
        pick 'f': PUSH "cf" ✓

  Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"] → 3×3=9 ✓

  Time Complexity:  O(3^N × 4^M) — N digits with 3 letters, M digits with 4
  Space Complexity: O(N + M) — recursion depth = number of digits

=============================================================================
*/

function solve(index, digits, temp, ans, mp) {
    // Base case: processed all digits
    if (index === digits.length) {
        ans.push(temp);
        return;
    }

    // Get letters for current digit
    let num = parseInt(digits[index]);
    let letters = mp[num];

    // Try each letter for this digit
    for (let i = 0; i < letters.length; i++) {
        solve(index + 1, digits, temp + letters[i], ans, mp);
    }
}

function letterCombinations(digits) {
    if (digits.length === 0) return [];

    // Phone digit-to-letter mapping
    let mp = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let ans = [];
    solve(0, digits, "", ans, mp);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations("2"));
// ["a","b","c"]
