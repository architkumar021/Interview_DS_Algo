/*
=============================================================================
  QUESTION: 17. Letter Combinations of a Phone Number (LeetCode)
=============================================================================

  Given string of digits 2-9, return all possible letter combinations.

  Mapping: 2→abc  3→def  4→ghi  5→jkl  6→mno  7→pqrs  8→tuv  9→wxyz

  Example: "23" → ["ad","ae","af","bd","be","bf","cd","ce","cf"]

=============================================================================
  APPROACH: Recursion — Pick One Letter Per Digit
             O(3^N × 4^M) Time, O(N) Space
=============================================================================

  DIFFERENT from pick/not-pick: we MUST pick exactly one letter per digit.
  For each digit → loop through its letters → recurse to next digit.

  Dry Run "23" (2→"abc", 3→"def"):
    solve(0, "") → 'a' + solve(1, "a") → 'd': push "ad" | 'e': push "ae" | 'f': push "af"
                 → 'b' + solve(1, "b") → 'd': push "bd" | 'e': push "be" | 'f': push "bf"
                 → 'c' + solve(1, "c") → 'd': push "cd" | 'e': push "ce" | 'f': push "cf"
    Result: 3 × 3 = 9 combinations ✓

=============================================================================
*/

function letterCombinations(digits) {
    if (!digits.length) return [];

    let map = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let result = [];

    function solve(index, temp) {
        if (index === digits.length) {
            result.push(temp);
            return;
        }

        let letters = map[digits[index]];
        for (let ch of letters) {
            solve(index + 1, temp + ch);
        }
    }

    solve(0, "");
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations("2"));
// ["a","b","c"]
