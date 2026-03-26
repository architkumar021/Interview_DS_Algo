"""
=============================================================================
  QUESTION: Count Distinct Subsequences (GFG)
=============================================================================

  Find number of distinct subsequences. Answer mod 10^9+7.
  Example: "gfg" → 7 ("","g","f","gf","fg","gg","gfg")

  APPROACH: Pick/Not-Pick + Set for uniqueness.
  Set auto-handles duplicates (e.g. picking 'g' at idx 0 vs idx 2).

  DRY RUN "gf":
    Include 'g', Include 'f' → "gf" | Include 'g', Exclude 'f' → "g"
    Exclude 'g', Include 'f' → "f"  | Exclude 'g', Exclude 'f' → ""
    set = {"gf","g","f",""} → size = 4 ✓

  Time: O(2^N), Space: O(2^N)
=============================================================================
"""

MOD = 10**9 + 7


def solve(s, index, temp, st):
    if index == len(s):
        st.add(temp)
        return

    # Include
    solve(s, index + 1, temp + s[index], st)

    # Exclude
    solve(s, index + 1, temp, st)


def distinct_subsequences(s):
    st = set()
    solve(s, 0, "", st)
    return len(st) % MOD


# Driver Code
if __name__ == "__main__":
    print(distinct_subsequences("gfg"))  # 7
    print(distinct_subsequences("abc"))  # 8

