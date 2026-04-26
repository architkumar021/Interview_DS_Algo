/*
============================================================
Problem: Reverse Words in a String (LeetCode 151)
============================================================
Given an input string s, reverse the order of the words.
A word is defined as a sequence of non-space characters.
Return a string of the words in reverse order concatenated by a single space.

Example 1: Input: "the sky is blue"       Output: "blue is sky the"
Example 2: Input: "  hello world  "       Output: "world hello"
Example 3: Input: "a good   example"      Output: "example good a"

============================================================
APPROACH 1: BRUTE FORCE - Split and Reverse
============================================================
Idea:
- Use a stringstream to extract words, store in vector, reverse, join.

Dry Run: s = "  hello world  "
  Stream extracts: ["hello", "world"]
  Reverse: ["world", "hello"]
  Join: "world hello"  ✓

Time: O(N) | Space: O(N)
*/

#include <bits/stdc++.h>
using namespace std;

string reverseWords_BruteForce(string s) {
    stringstream ss(s);
    vector<string> words;
    string word;

    while (ss >> word) {
        words.push_back(word);
    }

    reverse(words.begin(), words.end());

    string res = "";
    for (int i = 0; i < words.size(); i++) {
        if (i > 0) res += " ";
        res += words[i];
    }
    return res;
}

/*
============================================================
APPROACH 2: OPTIMAL - Two Pointer (In-place style, no split)
============================================================
Idea:
- Traverse from end of string, pick each word, append to result.

Dry Run: s = "  hello world  "
  i starts at 14 (last index), skip spaces → i=12 ('d')
  j=12, move i left while not space → i=8 ('w'), word = s[8..12] = "world"
  res = "world"
  skip spaces → i=7, then i=4 ('o')
  j=4, move i left → i=2 ('h'), actually i goes to 1 (space), word = s[2..6] = "hello"
  res = "world hello"
  skip spaces → i < 0, done
  Result: "world hello"  ✓

Time: O(N) | Space: O(1) extra (excluding output string)
*/

string reverseWords_Optimal(string s) {
    string res = "";
    int n = s.size();
    int i = n - 1;

    while (i >= 0) {
        // Skip trailing spaces
        while (i >= 0 && s[i] == ' ') i--;
        if (i < 0) break;

        // Find word boundary
        int j = i;
        while (i >= 0 && s[i] != ' ') i--;

        // Extract word from i+1 to j
        string word = s.substr(i + 1, j - i);
        if (!res.empty()) res += " ";
        res += word;
    }

    return res;
}

