/*
=============================================================================
  QUESTION: 132. Palindrome Partitioning II (LeetCode)
=============================================================================

  Given string s, return MINIMUM cuts so every substring is a palindrome.

  Example: "aab" → 1 (cut: "aa" | "b")
  Example: "abcba" → 0 (already palindrome!)

=============================================================================
  APPROACH: Front Partition DP — O(N²) Time, O(N) Space
=============================================================================

  solve(i) = min cuts for s[i..n-1] so all parts are palindromes.

  For each i, try all j from i to n-1:
    If s[i..j] is palindrome → make a cut after j:
      cost = 1 + solve(j+1)  (1 for the partition + remaining)

  Base: i == n → 0 (nothing left to partition)
  Answer: solve(0) - 1 (we count one extra partition at the end)

  Dry Run: "aab"
    solve(2): "b" → palindrome → 1+solve(3) = 1
    solve(1): "a" → palindrome → 1+solve(2) = 2
              "ab" → not palindrome
    solve(0): "a" → palindrome → 1+solve(1) = 3
              "aa" → palindrome → 1+solve(2) = 2  ← better!
              "aab" → not palindrome
    solve(0) = 2, Answer = 2-1 = 1 ✓

=============================================================================
*/

function minCut(s) {
    let n = s.length;
    let dp = new Array(n).fill(-1);

    function isPalin(i, j) {
        while (i < j) {
            if (s[i] !== s[j]) return false;
            i++; j--;
        }
        return true;
    }

    function solve(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let ans = Infinity;
        for (let j = i; j < n; j++) {
            if (isPalin(i, j)) {
                ans = Math.min(ans, 1 + solve(j + 1));
            }
        }
        return dp[i] = ans;
    }

    return solve(0) - 1;  // subtract the extra partition
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minCut("aab"));    // 1
console.log(minCut("abcba"));  // 0
