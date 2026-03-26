"""
=============================================================================
  QUESTION: 131. Palindrome Partitioning (LeetCode)
=============================================================================

  Partition s such that every substring is a palindrome. Return all partitions.
  Example: "aab" → [["a","a","b"],["aa","b"]]

  APPROACH: Backtracking — try all possible cuts.
  NOT pick/not-pick. Try ALL cut positions, only proceed if palindrome.

  DRY RUN "aab":
    s[0..0]="a" palindrome → s[1..1]="a" → s[2..2]="b" → ["a","a","b"] ✓
    s[0..1]="aa" palindrome → s[2..2]="b" → ["aa","b"] ✓
    s[0..2]="aab" NOT palindrome → skip

  Time: O(N × 2^N), Space: O(N)
=============================================================================
"""


def is_palindrome(s):
    return s == s[::-1]


def solve(i, s, temp, ans):
    if i >= len(s):
        ans.append(temp[:])
        return

    for p in range(i, len(s)):
        sub = s[i:p + 1]
        if is_palindrome(sub):
            temp.append(sub)
            solve(p + 1, s, temp, ans)
            temp.pop()


def partition(s):
    ans = []
    solve(0, s, [], ans)
    return ans


# Driver Code
if __name__ == "__main__":
    print(partition("aab"))  # [["a","a","b"],["aa","b"]]

