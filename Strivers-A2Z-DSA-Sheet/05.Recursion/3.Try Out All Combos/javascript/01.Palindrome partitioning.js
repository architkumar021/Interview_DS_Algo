/*
=============================================================================
  QUESTION: 131. Palindrome Partitioning (LeetCode)
=============================================================================

  Given string s, partition it such that every substring of the partition
  is a palindrome. Return all possible palindrome partitionings.

  Example: "aab" → [["a","a","b"],["aa","b"]]
  Example: "a" → [["a"]]

=============================================================================
  APPROACH: Backtracking — Try All Possible Cuts
=============================================================================

  At each position i, try cutting a substring from i to p (for each p from i to end).
  If substring s[i..p] is a palindrome:
  - Add it to current partition
  - Recurse from p+1 (partition remaining string)
  - Backtrack (remove last added substring)

  KEY INSIGHT: This is NOT pick/not-pick. Instead we try ALL possible
  cut positions and only proceed if the cut portion is a palindrome.

  DRY RUN with "aab":
  ─────────────────────
  solve(0, "aab", [])
    Try s[0..0] = "a" → palindrome? YES
      solve(1, "aab", ["a"])
        Try s[1..1] = "a" → YES
          solve(2, "aab", ["a","a"])
            Try s[2..2] = "b" → YES
              solve(3, "aab", ["a","a","b"])
                i >= length → PUSH ["a","a","b"] ✓
        Try s[1..2] = "ab" → NO (a≠b) → skip
    Try s[0..1] = "aa" → palindrome? YES (a==a)
      solve(2, "aab", ["aa"])
        Try s[2..2] = "b" → YES
          solve(3, "aab", ["aa","b"])
            i >= length → PUSH ["aa","b"] ✓
    Try s[0..2] = "aab" → palindrome? NO (a≠b) → skip

  Result: [["a","a","b"],["aa","b"]] ✓

  Time Complexity:  O(N × 2^N) — 2^N partitions, O(N) palindrome check each
  Space Complexity: O(N) — recursion depth + temp partition

=============================================================================
*/

function isPalindrome(s) {
    let i = 0, j = s.length - 1;
    while (i < j) {
        if (s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
}

function solve(i, s, temp, ans) {
    // Base case: partitioned entire string
    if (i >= s.length) {
        ans.push([...temp]);
        return;
    }

    // Try all substrings starting from index i
    for (let p = i; p < s.length; p++) {
        let sub = s.substring(i, p + 1);  // s[i..p]
        if (isPalindrome(sub)) {
            temp.push(sub);                // Choose this partition
            solve(p + 1, s, temp, ans);    // Recurse on remaining
            temp.pop();                    // Backtrack
        }
    }
}

function partition(s) {
    let ans = [];
    solve(0, s, [], ans);
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(partition("aab"));   // [["a","a","b"],["aa","b"]]
console.log(partition("a"));     // [["a"]]
console.log(partition("aba"));   // [["a","b","a"],["aba"]]
