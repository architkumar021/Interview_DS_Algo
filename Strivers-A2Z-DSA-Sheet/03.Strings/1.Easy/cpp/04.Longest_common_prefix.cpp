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
Approach:
1. Take the first string as a reference.
2. For each character index i (column), compare the i-th character across ALL strings.
3. If any string doesn't have an i-th character, or the character doesn't match, return the prefix found so far.
4. If all characters at index i match across all strings, continue to index i+1.
5. If we exhaust the first string without mismatch, the entire first string is the prefix.

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
Approach:
1. Sort the array of strings lexicographically.
2. After sorting, the FIRST and LAST strings are the most different from each other.
3. The common prefix of these two strings is guaranteed to be the common prefix of ALL strings.
4. Compare the first and last string character by character until a mismatch or end of either string.
5. Return the common prefix.

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

