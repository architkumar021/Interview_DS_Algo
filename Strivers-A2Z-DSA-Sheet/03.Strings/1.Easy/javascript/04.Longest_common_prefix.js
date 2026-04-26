/*
============================================================
Problem: Longest Common Prefix (LeetCode 14)
============================================================
Find the longest common prefix string amongst an array of strings.

Example 1: Input: ["flower","flow","flight"]  Output: "fl"
Example 2: Input: ["dog","racecar","car"]     Output: ""

============================================================
APPROACH 1: BRUTE FORCE - Vertical Scanning
============================================================
Dry Run: strs = ["flower","flow","flight"]
  i=0: 'f','f','f' → match
  i=1: 'l','l','l' → match
  i=2: 'o','o','i' → mismatch → return "fl"  ✓

Time: O(N*M) | Space: O(1)
*/

function longestCommonPrefix_BruteForce(strs) {
    if (strs.length === 0) return "";

    for (let i = 0; i < strs[0].length; i++) {
        let c = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== c) {
                return strs[0].substring(0, i);
            }
        }
    }

    return strs[0];
}

/*
============================================================
APPROACH 2: OPTIMAL - Sort and Compare First & Last
============================================================
Dry Run: strs = ["flower","flow","flight"]
  After sort: ["flight","flow","flower"]
  Compare "flight" vs "flower":
    i=0: 'f'=='f' ✓  i=1: 'l'=='l' ✓  i=2: 'i'!='o' ✗
  Result: "fl"  ✓

Time: O(N*M*log(N)) | Space: O(1) extra
*/

function longestCommonPrefix_Optimal(strs) {
    if (strs.length === 0) return "";

    strs.sort();

    let first = strs[0], last = strs[strs.length - 1];
    let i = 0;

    while (i < first.length && i < last.length && first[i] === last[i]) {
        i++;
    }

    return first.substring(0, i);
}

