/*
============================================================
Problem: Sort Characters By Frequency (LeetCode 451)
============================================================
Given a string s, sort it in decreasing order based on the frequency of the characters.

Example 1: Input: "tree"     Output: "eert" (or "eetr")
Example 2: Input: "cccaaa"   Output: "aaaccc" (or "cccaaa")
Example 3: Input: "Aabb"     Output: "bbAa" (or "bbaA")

============================================================
APPROACH 1: BRUTE FORCE - HashMap + Sort
============================================================
Idea:
- Count frequency of each character using a map.
- Convert map entries to a vector of pairs, sort by frequency descending.
- Build result string.

Dry Run: s = "tree"
  freq: {'t':1, 'r':1, 'e':2}
  Sort by freq desc: [('e',2), ('t',1), ('r',1)]
  Build: "ee" + "t" + "r" = "eetr"  ✓

Time: O(N log N) | Space: O(N)
*/

#include <bits/stdc++.h>
using namespace std;

string frequencySort_BruteForce(string s) {
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;

    vector<pair<int, char>> v;
    for (auto& [ch, cnt] : freq) {
        v.push_back({cnt, ch});
    }

    sort(v.begin(), v.end(), greater<pair<int, char>>());

    string res = "";
    for (auto& [cnt, ch] : v) {
        res.append(cnt, ch);
    }
    return res;
}

/*
============================================================
APPROACH 2: OPTIMAL - HashMap + Max Heap (Priority Queue)
============================================================
Approach:
1. Count the frequency of each character using a hash map.
2. Push all (frequency, character) pairs into a max-heap (priority queue).
3. Pop from the heap — the character with the highest frequency comes first.
4. Append that character repeated by its frequency to the result.
5. Repeat until the heap is empty. Return the result.

Dry Run: s = "tree"
  freq: {'t':1, 'r':1, 'e':2}
  Heap after pushes: [(2,'e'), (1,'t'), (1,'r')]
  Pop (2,'e') → "ee"
  Pop (1,'t') → "eet"
  Pop (1,'r') → "eetr"
  Result: "eetr"  ✓

Time: O(N log K) where K = unique chars (at most 128) → effectively O(N)
Space: O(N)
*/

string frequencySort_Optimal(string s) {
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;

    priority_queue<pair<int, char>> pq;
    for (auto& [ch, cnt] : freq) {
        pq.push({cnt, ch});
    }

    string res = "";
    while (!pq.empty()) {
        auto [cnt, ch] = pq.top();
        pq.pop();
        res.append(cnt, ch);
    }
    return res;
}

