/*
============================================================
Problem: Longest Common Prefix (LeetCode 14)
============================================================
Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Example 1: Input: ["flower","flow","flight"]  Output: "fl"
Example 2: Input: ["dog","racecar","car"]     Output: ""

============================================================
APPROACH 1: BRUTE FORCE - Vertical Scanning
============================================================
Idea:
- Compare characters column by column across all strings.
- For each index i, check if all strings have the same character at position i.
- Stop when mismatch found or any string ends.

Dry Run: strs = ["flower","flow","flight"]
  i=0: 'f','f','f' → all match
  i=1: 'l','l','l' → all match
  i=2: 'o','o','i' → mismatch! return "fl"
  Result: "fl"  ✓

Time: O(N*M) where N=number of strings, M=min string length | Space: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

string longestCommonPrefix_BruteForce(vector<string>& strs) {
    if (strs.empty()) return "";

    for (int i = 0; i < strs[0].size(); i++) {
        char c = strs[0][i];
        for (int j = 1; j < strs.size(); j++) {
            if (i >= strs[j].size() || strs[j][i] != c) {
                return strs[0].substr(0, i);
            }
        }
    }

    return strs[0];
}

/*
============================================================
APPROACH 2: OPTIMAL - Sort and Compare First & Last
============================================================
Idea:
- Sort the array lexicographically.
- After sorting, the most different strings are at positions 0 and n-1.
- Compare only first and last string character by character.
- The common prefix of these two is the answer.

Dry Run: strs = ["flower","flow","flight"]
  After sort: ["flight","flow","flower"]
  Compare "flight" vs "flower":
    i=0: 'f'=='f' ✓
    i=1: 'l'=='l' ✓
    i=2: 'i'!='o' ✗ → stop
  Result: "fl"  ✓

Time: O(N*M*log(N)) for sorting | Space: O(1) extra
*/

string longestCommonPrefix_Optimal(vector<string>& strs) {
    if (strs.empty()) return "";

    sort(strs.begin(), strs.end());

    string first = strs[0], last = strs[strs.size() - 1];
    int i = 0;

    while (i < first.size() && i < last.size() && first[i] == last[i]) {
        i++;
    }

    return first.substr(0, i);
}

