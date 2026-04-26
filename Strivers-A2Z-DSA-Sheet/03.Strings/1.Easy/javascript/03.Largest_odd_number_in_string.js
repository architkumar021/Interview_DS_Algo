/*
============================================================
Problem: Largest Odd Number in String (LeetCode 2264)
============================================================
Given a string num representing a large integer, return the largest-valued odd integer
(as a string) that is a non-empty substring of num, or "" if no odd integer exists.

Example 1: Input: "52"    Output: "5"
Example 2: Input: "4206"  Output: ""
Example 3: Input: "35427" Output: "35427"

============================================================
APPROACH 1: BRUTE FORCE - Check All Prefixes
============================================================
Approach:
1. A number is odd if its last digit is odd (1, 3, 5, 7, 9).
2. The largest-valued substring must start from index 0 (prefixes have the highest value).
3. Iterate through all prefixes num[0..0], num[0..1], ..., num[0..n-1].
4. For each prefix, check if the last digit is odd — if so, update the answer.
5. Return the last (longest) valid prefix found, which is the largest odd number.

Dry Run: num = "35427"
  i=0: "3" ends with 3 (odd) → largest = "3"
  i=1: "35" ends with 5... wait, 5 is odd → largest = "35"
  i=2: "354" ends with 4 (even) → skip
  i=3: "3542" ends with 2 (even) → skip
  i=4: "35427" ends with 7 (odd) → largest = "35427"
  Result: "35427"  ✓

Time: O(N^2) due to substring creation | Space: O(N)
*/

function largestOddNumber_BruteForce(num) {
    let largest = "";
    for (let i = 0; i < num.length; i++) {
        let sub = num.substring(0, i + 1);
        if (parseInt(sub[sub.length - 1]) % 2 !== 0) {
            largest = sub;
        }
    }
    return largest;
}

/*
============================================================
APPROACH 2: OPTIMAL - Scan from Right
============================================================
Approach:
1. The largest odd substring must start from index 0 and end at the rightmost odd digit.
2. Scan from right to left — the first odd digit at index i gives the answer: num[0..i].
3. If no odd digit exists, return empty string.

Dry Run: num = "35427"
  i=4: '7' is odd → return "35427"  ✓

Dry Run: num = "4206"
  i=3: '6' even, i=2: '0' even, i=1: '2' even, i=0: '4' even → return ""  ✓

Time: O(N) | Space: O(1)
*/

function largestOddNumber_Optimal(num) {
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i]) % 2 !== 0) {
            return num.substring(0, i + 1);
        }
    }
    return "";
}

