/*
QUESTION:
Given a string s consisting only of characters 'a', 'b', and 'c', you need to count the number of substrings that contain at least one occurrence of all these characters.

APPROACH:
To count the number of substrings with at least one occurrence of 'a', 'b', and 'c', we can use a sliding window approach.

1. Create a helper function, countOfInvalidSubstrings, which counts the number of substrings that do not contain all three characters.
   - Initialize a Map, mp, to keep track of the counts of characters in the current window.
   - Initialize start to 0 and ans to 0.
   - Iterate over the string from left to right:
     - Increment the count of the current character in mp.
     - If the number of unique characters in mp exceeds 2, it means we have found an invalid substring.
       - Decrement the count of the character at the start of the window in mp.
       - If the count becomes zero, remove the character from mp.
       - Move the start of the window to the next position.
     - Add the length of the current window to ans.
   - Return ans.

2. In the main function, numberOfSubstrings:
   - Calculate the total number of substrings, cntOfTotalSubstrings, using the formula (n * (n + 1)) / 2, where n is the length of the string.
   - Subtract the count of invalid substrings obtained from countOfInvalidSubstrings from cntOfTotalSubstrings.
   - Return the resulting count.
*/

/**
 * @param {string} s
 * @return {number}
 */
var countOfInvalidSubstrings = function(s) {
    const mp = new Map();
    let start = 0, ans = 0;

    for (let i = 0; i < s.length; i++) {
        mp.set(s[i], (mp.get(s[i]) || 0) + 1);

        while (mp.size > 2) {
            mp.set(s[start], mp.get(s[start]) - 1);

            if (mp.get(s[start]) === 0)
                mp.delete(s[start]);

            start++;
        }

        ans += i - start + 1;
    }

    return ans;
};

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    const n = s.length;
    const cntOfTotalSubstrings = (n * (n + 1)) / 2;
    return cntOfTotalSubstrings - countOfInvalidSubstrings(s);
};

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(n), where n is the length of the string s. We iterate over the string once.
- Space complexity: O(1), as the extra space used is constant throughout the algorithm.
*/


/*
===================================================================================
BRUTE FORCE APPROACH
===================================================================================

APPROACH EXPLANATION:
- We generate all possible substrings using two nested loops.
- For each substring, we check if it contains all three characters ('a', 'b', 'c').
- We use a hash array of size 3 to track the presence of each character.
- For every starting index i, we iterate through all ending indices j.
- At each step, we mark the current character as present in the hash.
- If all three characters are present (hash[0], hash[1], hash[2] are all non-zero),
  we count this substring as valid.
- This approach checks every possible substring, making it inefficient for large inputs.

TIME COMPLEXITY: O(n^2) - Two nested loops iterate through all substrings.
SPACE COMPLEXITY: O(1) - Only a fixed-size array of 3 elements is used.
*/

/**
 * @param {string} s
 * @return {number}
 */
function numberOfSubstringsBrute(s) {
    const n = s.length;
    let count = 0;

    // Iterate over all possible starting indices
    for (let i = 0; i < n; i++) {
        // Hash array to track presence of 'a', 'b', 'c'
        // hash[0] -> 'a', hash[1] -> 'b', hash[2] -> 'c'
        const hash = [0, 0, 0];

        // Iterate over all possible ending indices
        for (let j = i; j < n; j++) {
            // Mark current character as present
            // s[j].charCodeAt(0) - 97 gives: 'a'->0, 'b'->1, 'c'->2
            hash[s[j].charCodeAt(0) - 97] = 1;

            // Check if all three characters are present
            if (hash[0] + hash[1] + hash[2] === 3) {
                // All characters found, count this and all subsequent substrings
                // from i to j, j+1, j+2, ..., n-1 will also be valid
                count += (n - j);
                break; // No need to continue, all further substrings are valid
            }
        }
    }

    return count;
}

/*
===================================================================================
BETTER APPROACH
===================================================================================

APPROACH EXPLANATION:
- Instead of checking all substrings, we use a smarter observation.
- We maintain an array 'lastSeen' to store the most recent index of each character.
- For each position i, we find the minimum of the last seen indices of 'a', 'b', 'c'.
- If all three characters have been seen (minIndex >= 0), then all substrings
  starting from index 0 to minIndex and ending at i are valid.
- This is because any substring that includes all positions from 0 to minIndex
  will contain at least one occurrence of each character.
- The number of such valid substrings ending at index i is (minIndex + 1).
- We iterate through the string once, updating lastSeen and counting valid substrings.

TIME COMPLEXITY: O(n) - Single pass through the string.
SPACE COMPLEXITY: O(1) - Only a fixed-size array of 3 elements is used.
*/

/**
 * @param {string} s
 * @return {number}
 */
function numberOfSubstringsBetter(s) {
    const n = s.length;
    let count = 0;

    // Array to store the last seen index of 'a', 'b', 'c'
    // Initialize with -1 indicating not yet seen
    const lastSeen = [-1, -1, -1];

    for (let i = 0; i < n; i++) {
        // Update the last seen index for current character
        lastSeen[s[i].charCodeAt(0) - 97] = i;

        // Find the minimum of last seen indices
        // This gives the earliest position where all 3 chars are available
        const minIndex = Math.min(lastSeen[0], lastSeen[1], lastSeen[2]);

        // If all characters have been seen at least once
        if (minIndex >= 0) {
            // All substrings starting from index 0 to minIndex
            // and ending at i are valid, count = minIndex + 1
            count += (minIndex + 1);
        }
    }

    return count;
}

/*
===================================================================================
OPTIMAL APPROACH (Same as Better - Already Optimal)
===================================================================================

APPROACH EXPLANATION:
- The better approach is already optimal with O(n) time complexity.
- The key insight is: for each ending index i, we track the last occurrence
  of each character ('a', 'b', 'c') using the lastSeen array.
- The minimum value in lastSeen tells us the leftmost position where we have
  all three characters available in the substring ending at i.
- Any starting position from 0 to this minimum index will form a valid substring.
- For example, if s = "abcabc" and at i=5, lastSeen = [3, 4, 5] (indices of
  last 'a', 'b', 'c'), the minimum is 3. So substrings starting at 0, 1, 2, 3
  and ending at 5 are all valid (4 substrings).
- This elegant approach counts all valid substrings in a single pass without
  explicitly generating any substring.

TIME COMPLEXITY: O(n) - We traverse the string exactly once.
SPACE COMPLEXITY: O(1) - Fixed space for the lastSeen array of size 3.
*/

/**
 * @param {string} s
 * @return {number}
 */
function numberOfSubstringsOptimal(s) {
    const n = s.length;
    let count = 0;

    // Track the last seen index of each character
    // -1 means the character hasn't been seen yet
    const lastSeen = [-1, -1, -1];

    for (let i = 0; i < n; i++) {
        // Update last seen index for current character
        // 'a' -> index 0, 'b' -> index 1, 'c' -> index 2
        lastSeen[s[i].charCodeAt(0) - 97] = i;

        // The minimum of last seen indices determines how many
        // valid substrings end at position i
        // If min is -1, not all characters seen yet, so 0 valid substrings
        // Otherwise, (min + 1) substrings are valid (starting from 0 to min)
        count += (1 + Math.min(lastSeen[0], lastSeen[1], lastSeen[2]));
    }

    return count;
}

/*
===================================================================================
EXAMPLE WALKTHROUGH:

For s = "abcabc":
Index:    0   1   2   3   4   5
Char:     a   b   c   a   b   c

i=0: lastSeen=[0,-1,-1], min=-1, count=0
i=1: lastSeen=[0,1,-1], min=-1, count=0
i=2: lastSeen=[0,1,2], min=0, count=0+1=1 (substring "abc")
i=3: lastSeen=[3,1,2], min=1, count=1+2=3 (substrings "bcab", "abcab")
i=4: lastSeen=[3,4,2], min=2, count=3+3=6 (substrings "cabc", "bcabc", "abcabc")
i=5: lastSeen=[3,4,5], min=3, count=6+4=10

Answer: 10 substrings containing all three characters.
===================================================================================
*/

class Solution {
    // Function to count substrings containing at least one 'a', 'b', and 'c' using sliding window
    numberOfSubstrings(s) {
        // Frequency map for 'a', 'b', 'c'
        let freq = [0, 0, 0];

        // Left pointer for the sliding window
        let left = 0;

        // Result to store count of valid substrings
        let res = 0;

        // Traverse the string with right pointer
        for (let right = 0; right < s.length; right++) {
            // Increment frequency of current character
            freq[s.charCodeAt(right) - 97]++;

            // Shrink the window while all characters are present
            while (freq[0] > 0 && freq[1] > 0 && freq[2] > 0) {
                // Add substrings from current right to end
                res += s.length - right;

                // Move left pointer and update frequency
                freq[s.charCodeAt(left) - 97]--;
                left++;
            }
        }

        return res;
    }
}

// Driver code
const sol = new Solution();
const s = "abcabc";
console.log(sol.numberOfSubstrings(s));
