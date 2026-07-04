/*QUESTION:
You are given a string s and an integer k. You can choose any character of the string and change it to
any other uppercase English character. You can perform this operation at most k times.
Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

APPROACH:
1. Create a Set ltrs to store all unique letters in the given string s.
2. Initialize a variable ans to keep track of the maximum length of the substring.
3. Iterate through each letter ltr in the set ltrs:
   - Initialize variables start and ltrCnt to track the starting index of the current substring and the count of ltr in the
        substring.
   - Iterate through each character in the string s:
     - If the character is equal to ltr, increment ltrCnt.
     - Enter a while loop to adjust the start index until the number of characters in the substring that are different from
        ltr is more than k.
     - During the adjustment, if the character at the start index is equal to ltr, decrement ltrCnt.
     - Increment the start index.
     - If the length of the current substring minus ltrCnt is at most k, update ans by taking the maximum of ans and the
        length of the current substring.
4. Return the maximum length of the substring (ans).

CODE:*/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    const ltrs = new Set(s);
    let ans = 0;
    for (const ltr of ltrs) {
        let start = 0, ltrCnt = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === ltr)
                ltrCnt++;
            while ((i - start + 1) - ltrCnt > k) {
                if (s[start] === ltr)
                    ltrCnt--;
                start++;
            }
            if ((i - start + 1) - ltrCnt <= k)
                ans = Math.max(ans, i - start + 1);
        }
    }
    return ans;
};

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N * L), where N is the length of the string s and L is the number of unique letters in the string.
    We iterate through the string and perform the sliding window operation for each unique letter.
    - L can have the max value of 26, so we can say the complexity would be O(N * 26) i.e O(N).
- Space complexity: O(L), as we store the unique letters in the set ltrs.
*/

// ==================== BRUTE FORCE APPROACH ====================

class Solution {
    // Function to return the maximum length of substring where we can
    // replace at most k characters to make all characters the same
    characterReplacement(s, k) {

        // Variable to store the max length found
        let maxLength = 0;

        // Outer loop to start from every index
        for (let i = 0; i < s.length; i++) {

            // Frequency array for characters A-Z
            const freq = new Array(26).fill(0);

            // Track the highest frequency character in the window
            let maxFreq = 0;

            // Inner loop to expand the window
            for (let j = i; j < s.length; j++) {

                // Update frequency of current character
                freq[s.charCodeAt(j) - 65]++;

                // Update the max frequency character seen so far
                maxFreq = Math.max(maxFreq, freq[s.charCodeAt(j) - 65]);

                // Calculate current window size
                const windowSize = j - i + 1;

                // Calculate how many characters need replacement
                const replace = windowSize - maxFreq;

                // If replacements within limit, update result
                if (replace <= k) {
                    maxLength = Math.max(maxLength, windowSize);
                }
            }
        }

        return maxLength;
    }
}

// Driver code
const sol = new Solution();
const s = "AABABBA";
const k = 1;
console.log(sol.characterReplacement(s, k));

// Time Complexity: O(N^2)
// Space Complexity: O(1)


// ==================== OPTIMIZED APPROACH ====================

class Solution {
    // Function to return the length of the longest substring that can be made of repeating characters
    // by replacing at most k characters
    characterReplacement(s, k) {
        // Frequency array for A-Z
        const freq = new Array(26).fill(0);

        // Left and right pointers of sliding window
        let left = 0, right = 0;

        // Tracks the count of the most frequent character in current window
        let maxCount = 0;

        // Stores the maximum length of valid window
        let maxLength = 0;

        // Iterate through the string with right pointer
        while (right < s.length) {

            // Increment the frequency of current character
            freq[s.charCodeAt(right) - 65]++;

            // Update maxCount with the max frequency seen so far
            maxCount = Math.max(maxCount, freq[s.charCodeAt(right) - 65]);

            // If the current window needs more than k replacements, slide left by 1
            // Note: maxCount is intentionally NOT recalculated here — it acts as a
            // high-watermark. We only care about windows LARGER than the best found,
            // so the window slides (same size) rather than shrinks. It only grows
            // when a new character beats the old maxCount.
            if ((right - left + 1) - maxCount > k) {
                freq[s.charCodeAt(left) - 65]--;
                left++;
            }

            // Update the maximum window length
            maxLength = Math.max(maxLength, right - left + 1);

            // Move right pointer forward
            right++;
        }

        // Return the maximum valid window length
        return maxLength;
    }
}

// Driver code
const sol = new Solution();
const s = "AABABBA";
const k = 1;
// Output : 4
console.log(sol.characterReplacement(s, k));

// Time Complexity: O(N)
// Space Complexity: O(1)

