/*
=============================================================================
  QUESTION: 131. Palindrome Partitioning (LeetCode)
=============================================================================

  Partition string s such that every substring is a palindrome.
  Return all possible palindrome partitionings.

  Example: "aab" → [["a","a","b"], ["aa","b"]]

=============================================================================
  APPROACH: Backtracking — Try All Cuts — O(N × 2^N) Time, O(N) Space
=============================================================================

  NOT pick/not-pick. At index i, try cutting s[i..p] for every p from i to end.
  If s[i..p] is palindrome → add to partition, recurse from p+1, backtrack.

  Dry Run "aab":
    solve(0, [])
      "a" ✓ → solve(1, ["a"]) → "a" ✓ → solve(2, ["a","a"])
                                            → "b" ✓ → push ["a","a","b"] ✓
                                 "ab" ✗
      "aa" ✓ → solve(2, ["aa"]) → "b" ✓ → push ["aa","b"] ✓
      "aab" ✗
    Result: [["a","a","b"], ["aa","b"]] ✓

=============================================================================
*/

function partition(s) {
    let result = [];

    function isPalin(str) {
        let i = 0, j = str.length - 1;
        while (i < j) { if (str[i++] !== str[j--]) return false; }
        return true;
    }

    function solve(i, temp) {
        if (i >= s.length) { result.push([...temp]); return; }

        for (let p = i; p < s.length; p++) {
            let sub = s.substring(i, p + 1);
            if (isPalin(sub)) {
                temp.push(sub);
                solve(p + 1, temp);
                temp.pop();
            }
        }
    }

    solve(0, []);
    return result;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(partition("aab"));   // [["a","a","b"],["aa","b"]]
console.log(partition("a"));     // [["a"]]
console.log(partition("aba"));   // [["a","b","a"],["aba"]]
