/*
=============================================================================
  QUESTION: 2707. Extra Characters in a String (LeetCode)
=============================================================================

  Break string s using words from dictionary. Return minimum number of
  extra characters left over (not part of any dictionary word).

  Example: s="leetscode", dict=["leet","code","leetcode"] → 1
    "leet" + "s" + "code" → 1 extra char at index 4

  Example: s="sayhelloworld", dict=["hello","world"] → 3
    "say" + "hello" + "world" → 3 extra chars

=============================================================================
  PATTERN: Front Partition DP
=============================================================================

  solve(i) = min extra chars for s[i..n-1].

  At index i, two options:
    1. Skip s[i] as extra: 1 + solve(i+1)
    2. Try every substring s[i..j]: if it's in dictionary → solve(j+1)

  Take minimum over all options.

  Base: i == n → 0 (nothing left)

=============================================================================
  APPROACH 1: Memoization — O(N²) Time, O(N) Space
=============================================================================
*/

function minExtraCharMemo(s, dictionary) {
    let n = s.length;
    let dict = new Set(dictionary);
    let dp = new Array(n).fill(-1);

    function solve(i) {
        if (i >= n) return 0;
        if (dp[i] !== -1) return dp[i];

        // Option 1: skip s[i] as extra character
        let ans = 1 + solve(i + 1);

        // Option 2: try matching s[i..j] with dictionary words
        let curr = '';
        for (let j = i; j < n; j++) {
            curr += s[j];
            if (dict.has(curr)) {
                ans = Math.min(ans, solve(j + 1));
            }
        }
        return dp[i] = ans;
    }

    return solve(0);
}

/*
=============================================================================
  APPROACH 2: Tabulation — O(N²) Time, O(N) Space
=============================================================================
*/

function minExtraChar(s, dictionary) {
    let n = s.length;
    let dict = new Set(dictionary);
    let dp = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        dp[i] = 1 + dp[i + 1];  // skip s[i]

        let curr = '';
        for (let j = i; j < n; j++) {
            curr += s[j];
            if (dict.has(curr)) {
                dp[i] = Math.min(dp[i], dp[j + 1]);
            }
        }
    }
    return dp[0];
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(minExtraCharMemo("leetscode", ["leet", "code", "leetcode"]));  // 1
console.log(minExtraChar("leetscode", ["leet", "code", "leetcode"]));      // 1
console.log(minExtraChar("sayhelloworld", ["hello", "world"]));            // 3
