"""
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
2. The largest-valued substring must start from index 0 (prefixes have highest value).
3. Iterate through all prefixes and check if the last digit is odd.
4. Keep updating the answer with the longest valid prefix.
5. Return the result.

Dry Run: num = "35427"
  i=0: "3" → odd → largest="3"
  i=1: "35" → odd → largest="35"
  i=2: "354" → even → skip
  i=3: "3542" → even → skip
  i=4: "35427" → odd → largest="35427"
  Result: "35427"  ✓

Time: O(N^2) due to substring creation | Space: O(N)
"""


def largestOddNumber_BruteForce(num: str) -> str:
    largest = ""
    for i in range(len(num)):
        if int(num[i]) % 2 != 0:
            largest = num[:i + 1]
    return largest


"""
============================================================
APPROACH 2: OPTIMAL - Scan from Right
============================================================
Approach:
1. Scan from right to left — the first odd digit at index i gives answer: num[0..i].
2. If no odd digit exists, return empty string.

Dry Run: num = "35427"
  i=4: '7' is odd → return "35427"  ✓

Dry Run: num = "4206"
  i=3: '6' even, i=2: '0' even, i=1: '2' even, i=0: '4' even → return ""  ✓

Time: O(N) | Space: O(1)
"""


def largestOddNumber_Optimal(num: str) -> str:
    for i in range(len(num) - 1, -1, -1):
        if int(num[i]) % 2 != 0:
            return num[:i + 1]
    return ""

