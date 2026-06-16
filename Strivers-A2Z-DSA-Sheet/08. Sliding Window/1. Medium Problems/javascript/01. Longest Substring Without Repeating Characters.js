/*
Question:
Given a string s, find the length of the longest substring without repeating characters.

Approach:
- We can use a sliding window approach to solve this problem.
- We maintain a window that contains only unique characters.
- We use a hash map to store the frequency of characters in the current window.
- We iterate through the string and expand the window by adding one character at a time.
- If we encounter a repeating character, we shrink the window from the left until the character is no longer in the window.
- We keep track of the maximum window size encountered so far and return it as the result.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

CODE:-
*/

// ==================== BRUTE FORCE APPROACH ====================
/**
 * Brute Force Approach:
 * - For each starting index, expand the window while characters are unique
 * - Use a Set to track characters in the current window
 * - Stop expanding when we encounter a duplicate character
 *
 * Time Complexity: O(N^2) - Outer loop runs N times, inner loop runs at most N times
 * Space Complexity: O(N) - For storing characters in the Set
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringBruteForce = function(s) {
    let maxLength = 0;
    const n = s.length;

    // Outer loop: starting index of substring
    for (let i = 0; i < n; i++) {
        const charSet = new Set();  // Track unique characters for current starting point

        // Inner loop: extend the window as long as characters are unique
        for (let j = i; j < n; j++) {
            // If character already exists, we can't extend further from this start
            if (charSet.has(s[j])) {
                break;  // No point checking further, duplicate found
            }

            // Add character to set and update max length
            charSet.add(s[j]);
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }

    return maxLength;
};

// ==================== OPTIMIZED APPROACH: Sliding Window ====================
/**
 * Optimized Sliding Window Approach using frequency count
 * - Uses a Map to track character frequencies in current window
 * - Shrinks window when we have more characters than unique ones (duplicate detected)
 *
 * Time Complexity: O(N) - Each character is visited at most twice
 * Space Complexity: O(min(N, M)) - Where M is the size of the character set
 */

/**
 * @param {string} s
 * @return {number}
 */


var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let i = 0;
    let max = 0;

    for (let j = 0; j < s.length; j++) {
        while (map.has(s[j])) {
            map.delete(s[i]);
            i++;
        }

        map.set(s[j], true);
        max = Math.max(max, j - i + 1);
    }

    return max;
};

var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let count = 0;

    let n = s.length;
    let i = 0;

    for(let j = 0; j < n; j++) {
        if(!map.has(s[j])) {
            count = Math.max(count, j - i + 1);
        } else {
            let index = map.get(s[j]);
            while(i <= index) {
                map.delete(s[i]);
                i++;
            }
        }
        map.set(s[j], j);
    }
    return count;
};

var lengthOfLongestSubstring = function(s) {
    let ans = 0;
    const mp = new Map();
    let start = 0;

    for (let i = 0; i < s.length; i++) {
        mp.set(s[i], (mp.get(s[i]) || 0) + 1);

        while (mp.size < i - start + 1) {
            mp.set(s[start], mp.get(s[start]) - 1);
            if (mp.get(s[start]) === 0)
                mp.delete(s[start]);
            start++;
        }

        if (mp.size === i - start + 1)
            ans = Math.max(ans, i - start + 1);
    }

    return ans;
};

// Complexity Analysis:
// - The time complexity of this algorithm is O(N), where N is the length of the input string `s`. We iterate through each character of the string once.
// - The space complexity is O(M), where M is the number of unique characters in the string `s`. The Map `mp` can store up to M key-value pairs.


