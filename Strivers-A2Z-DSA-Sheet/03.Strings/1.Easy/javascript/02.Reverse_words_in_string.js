/*
============================================================
Problem: Reverse Words in a String (LeetCode 151)
============================================================
Given an input string s, reverse the order of the words.

Example 1: Input: "the sky is blue"       Output: "blue is sky the"
Example 2: Input: "  hello world  "       Output: "world hello"
Example 3: Input: "a good   example"      Output: "example good a"

============================================================
APPROACH 1: BRUTE FORCE - Split, Filter, Reverse
============================================================
Approach:
1. Trim the string and split by one or more whitespace characters using regex.
2. This gives an array of words with no empty entries.
3. Reverse the array.
4. Join the reversed array with a single space.
5. Return the result.

Dry Run: s = "  hello world  "
  split(' ') → ["", "", "hello", "world", "", ""]
  filter empty → ["hello", "world"]
  reverse → ["world", "hello"]
  join(' ') → "world hello"  ✓

Time: O(N) | Space: O(N)
*/

function reverseWords_BruteForce(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
}

/*
============================================================
APPROACH 2: OPTIMAL - Traverse from End, Pick Words
============================================================
Approach:
1. Start from the end of the string, traversing backwards.
2. Skip trailing spaces by decrementing the pointer.
3. When a non-space character is found, mark it as word end (j).
4. Keep moving left until a space or string start — extract the word from i+1 to j+1.
5. Append the word to the result with a space separator.
6. Repeat until the entire string is scanned.
7. Return the result.

Dry Run: s = "  hello world  "
  i=14, skip spaces → i=12 ('d')
  j=12, move i left to 7 → word = "world", res="world"
  skip spaces → i=6, then find 'o' at i=6
  j=6, move i left to 1 → word = "hello", res="world hello"
  skip spaces → i<0, done
  Result: "world hello"  ✓

Time: O(N) | Space: O(1) extra (excluding output)
*/

function reverseWords_Optimal(s) {
    let res = "";
    let i = s.length - 1;

    while (i >= 0) {
        // Skip trailing spaces
        while (i >= 0 && s[i] === ' ') i--;
        if (i < 0) break;

        // Find word end
        let j = i;
        while (i >= 0 && s[i] !== ' ') i--;

        // Extract word from i+1 to j
        let word = '';
        for (let k = i + 1; k <= j; k++) {
            word += s[k];
        }
        if (res.length > 0) res += " ";
        res += word;
    }

    return res;
}

