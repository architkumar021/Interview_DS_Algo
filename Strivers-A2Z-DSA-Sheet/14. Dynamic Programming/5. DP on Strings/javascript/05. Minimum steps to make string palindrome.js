/*
=============================================================================
  QUESTION: 1312. Min Insertions to Make String Palindrome (LeetCode)
=============================================================================

  Min insertions = n - LPS(s). Keep the longest palindromic subseq,
  insert mirror of remaining chars.

  Example: "mbadm" → 2 ("mbdabdm")

=============================================================================
  APPROACH: Space Optimized — O(N²) Time, O(N) Space
=============================================================================
*/

function minInsertions(s) {
    let r = s.split('').reverse().join('');
    let n = s.length;
    let prev = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let curr = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === r[j - 1]) curr[j] = prev[j - 1] + 1;
            else curr[j] = Math.max(prev[j], curr[j - 1]);
        }
        prev = curr;
    }
    return n - prev[n]; // n - LPS
}

// ==========================================================================
console.log(minInsertions("zzazz"));  // 0
console.log(minInsertions("mbadm"));  // 2
console.log(minInsertions("leetcode"));  // 5

