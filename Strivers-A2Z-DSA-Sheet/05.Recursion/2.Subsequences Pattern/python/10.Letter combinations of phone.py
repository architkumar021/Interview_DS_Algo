"""
=============================================================================
  QUESTION: 17. Letter Combinations of a Phone Number (LeetCode)
=============================================================================

  Given digits 2-9, return all possible letter combinations.
  2→abc 3→def 4→ghi 5→jkl 6→mno 7→pqrs 8→tuv 9→wxyz

  Example: "23" → ["ad","ae","af","bd","be","bf","cd","ce","cf"]

  APPROACH: NOT pick/not-pick. Must pick ONE letter per digit.
  At each digit → try EACH mapped letter → recurse to next digit.

  DRY RUN "23":
    digit '2' → 'a','b','c'
      'a' + digit '3' → 'd','e','f' → "ad","ae","af"
      'b' + digit '3' → "bd","be","bf"
      'c' + digit '3' → "cd","ce","cf"
    3×3 = 9 combinations ✓

  Time: O(3^N × 4^M), Space: O(N+M)
=============================================================================
"""


def solve(index, digits, temp, ans, mp):
    if index == len(digits):
        ans.append(temp)
        return

    num = int(digits[index])
    for ch in mp[num]:
        solve(index + 1, digits, temp + ch, ans, mp)


def letter_combinations(digits):
    if not digits:
        return []

    mp = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
    ans = []
    solve(0, digits, "", ans, mp)
    return ans


# Driver Code
if __name__ == "__main__":
    print(letter_combinations("23"))
    # ["ad","ae","af","bd","be","bf","cd","ce","cf"]

