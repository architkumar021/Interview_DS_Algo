/*QUESTION:
Given an array of integers nums and an integer k, a continuous subarray is called nice if there are k odd numbers in it. Return the number of nice subarrays.

Example 1:
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only subarrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

APPROACH:
1. Define a helper function called atMostK, which calculates the number of subarrays with at most k odd numbers.
2. Initialize variables start to 0, oddCnt to 0, and ans to 0.
3. Iterate through each element nums[i] in the array:
   - If nums[i] is odd, increment oddCnt by 1.
   - While oddCnt is greater than k, move the start pointer and decrement oddCnt if the element at nums[start] is odd. This ensures that we maintain at most k odd numbers in the subarray.
   - Add the count of subarrays from start to i (i - start + 1) to ans.
4. Return ans, which represents the number of subarrays with at most k odd numbers.
5. In the numberOfSubarrays function, return the difference between atMostK(nums, k) and atMostK(nums, k - 1) to get the number of nice subarrays.

CODE:*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function atMostK(nums, k) {
    let start = 0, oddCnt = 0, ans = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 !== 0)
            oddCnt++;
        while (oddCnt > k) {
            if (nums[start] % 2 !== 0)
                oddCnt--;
            start++;
        }
        ans += i - start + 1;
    }
    return ans;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function numberOfSubarrays(nums, k) {
    return atMostK(nums, k) - atMostK(nums, k - 1);
}

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N), where N is the size of the input array nums. We traverse the array once in both the atMostK function and the numberOfSubarrays function.
- Space complexity: O(1), as we use constant extra space throughout the algorithm.
*/


// ==================== BRUTE FORCE APPROACH ====================
/**
 * Brute Force Approach:
 *
 * Intuition:
 * - The most straightforward way is to generate all possible subarrays
 * - For each subarray, count the number of odd numbers
 * - If odd count equals k, increment our answer
 *
 * Algorithm:
 * 1. Use two nested loops to generate all subarrays
 * 2. Outer loop (i) marks the starting index
 * 3. Inner loop (j) marks the ending index
 * 4. As we extend the subarray, count odd numbers incrementally
 * 5. When odd count equals k, we found a "nice" subarray
 *
 * Dry Run Example: nums = [1,1,2,1,1], k = 3
 * - i=0, j=0: [1] -> oddCnt=1, not nice
 * - i=0, j=1: [1,1] -> oddCnt=2, not nice
 * - i=0, j=2: [1,1,2] -> oddCnt=2, not nice
 * - i=0, j=3: [1,1,2,1] -> oddCnt=3, nice! count=1
 * - i=0, j=4: [1,1,2,1,1] -> oddCnt=4, not nice
 * - i=1, j=1: [1] -> oddCnt=1, not nice
 * - ... and so on
 * - i=1, j=4: [1,2,1,1] -> oddCnt=3, nice! count=2
 *
 * Time Complexity: O(N^2) - Two nested loops to generate all subarrays
 * Space Complexity: O(1) - Only using variables for counting
 */

function numberOfSubarraysBruteForce(nums, k) {
    let count = 0;
    const n = nums.length;

    // Outer loop: starting index of subarray
    for (let i = 0; i < n; i++) {
        let oddCount = 0;

        // Inner loop: ending index of subarray
        // Count odd numbers as we extend the subarray
        for (let j = i; j < n; j++) {
            // Check if current element is odd
            if (nums[j] % 2 !== 0) {
                oddCount++;
            }

            // If we have exactly k odd numbers, it's a nice subarray
            if (oddCount === k) {
                count++;
            }
        }
    }

    return count;
}


// ==================== BETTER APPROACH (Prefix Sum with HashMap) ====================
/**
 * Better Approach using Prefix Count + HashMap:
 *
 * Intuition:
 * - Instead of counting odd numbers for each subarray, we use prefix count
 * - prefixOddCount[i] = number of odd numbers from index 0 to i
 * - If prefixOddCount[j] - prefixOddCount[i-1] = k,
 *   then subarray (i, j) has exactly k odd numbers
 * - We store frequency of each prefix odd count in a HashMap
 *
 * Algorithm:
 * 1. Maintain a running count of odd numbers (prefixOddCount)
 * 2. For each position, check if (prefixOddCount - k) exists in map
 * 3. If yes, those many subarrays ending at current index have exactly k odd numbers
 * 4. Update the frequency of current prefixOddCount in map
 *
 * Key Insight:
 * - If current prefix odd count is 'P' and we need exactly 'k' odd numbers,
 *   we look for how many times (P - k) appeared before
 * - Each occurrence of (P - k) represents a valid starting point
 *
 * Dry Run Example: nums = [1,1,2,1,1], k = 3
 * - i=0: nums[0]=1(odd), prefixOdd=1, check (1-3)=-2 not in map, map={1:1}
 * - i=1: nums[1]=1(odd), prefixOdd=2, check (2-3)=-1 not in map, map={1:1,2:1}
 * - i=2: nums[2]=2(even), prefixOdd=2, check (2-3)=-1 not in map, map={1:1,2:2}
 * - i=3: nums[3]=1(odd), prefixOdd=3, check (3-3)=0 -> cnt++ (subarray from start), map={1:1,2:2,3:1}
 * - i=4: nums[4]=1(odd), prefixOdd=4, check (4-3)=1 exists 1 time -> cnt++, map={1:1,2:2,3:1,4:1}
 * - Final count = 2
 *
 * Time Complexity: O(N) - Single pass through the array
 * Space Complexity: O(N) - HashMap to store prefix odd counts
 */

function numberOfSubarraysBetter(nums, k) {
    const map = new Map();
    let prefixOddCount = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        // Update prefix odd count if current element is odd
        if (nums[i] % 2 !== 0) {
            prefixOddCount++;
        }

        // If prefix odd count equals k, subarray from index 0 to i has k odd numbers
        if (prefixOddCount === k) {
            count++;
        }

        // Check if (prefixOddCount - k) exists in map
        // If yes, those many subarrays ending at i have exactly k odd numbers
        if (map.has(prefixOddCount - k)) {
            count += map.get(prefixOddCount - k);
        }

        // Store current prefix odd count frequency in map
        map.set(prefixOddCount, (map.get(prefixOddCount) || 0) + 1);
    }

    return count;
}


// ==================== OPTIMAL APPROACH (Sliding Window) ====================
/**
 * Optimal Approach using Sliding Window:
 *
 * Intuition:
 * - Direct sliding window doesn't work for "exactly k" problems
 * - But it works perfectly for "at most k" problems
 * - Key Trick: count(exactly k) = count(at most k) - count(at most k-1)
 *
 * Why this works:
 * - Subarrays with exactly K odd numbers =
 *   (Subarrays with at most K odd numbers) - (Subarrays with at most K-1 odd numbers)
 * - This eliminates subarrays with 0, 1, 2, ... k-1 odd numbers
 *
 * Algorithm for "at most k odd numbers":
 * 1. Use two pointers (left and right) for sliding window
 * 2. Expand window by moving right pointer
 * 3. If odd count exceeds k, shrink window from left
 * 4. At each position, all subarrays ending at 'right' starting from
 *    'left' to 'right' are valid -> add (right - left + 1) to count
 *
 * Dry Run for atMostK(nums, k) where nums = [1,1,2,1,1], k = 3:
 * - right=0: nums[0]=1(odd), oddCnt=1<=3, count+=1 (subarray: [1])
 * - right=1: nums[1]=1(odd), oddCnt=2<=3, count+=2 (subarrays: [1], [1,1])
 * - right=2: nums[2]=2(even), oddCnt=2<=3, count+=3 (subarrays: [2], [1,2], [1,1,2])
 * - right=3: nums[3]=1(odd), oddCnt=3<=3, count+=4 (subarrays: [1], [2,1], [1,2,1], [1,1,2,1])
 * - right=4: nums[4]=1(odd), oddCnt=4>3, shrink! left moves, oddCnt=3, count+=4
 * - atMostK(nums, 3) = 14
 * - atMostK(nums, 2) = 12
 * - Exactly 3 = 14 - 12 = 2 ✓
 *
 * Time Complexity: O(N) - Each element visited at most twice (once by right, once by left)
 * Space Complexity: O(1) - Only using pointers and variables
 */

// Helper function: Count subarrays with at most k odd numbers
function atMostKOddNumbers(nums, k) {
    // Edge case: if k is negative, no valid subarrays exist
    if (k < 0) return 0;

    let left = 0;
    let oddCount = 0;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
        // Expand window: add right element
        if (nums[right] % 2 !== 0) {
            oddCount++;
        }

        // Shrink window from left while odd count exceeds k
        while (oddCount > k) {
            if (nums[left] % 2 !== 0) {
                oddCount--;
            }
            left++;
        }

        // All subarrays ending at 'right' with start from 'left' to 'right' are valid
        // Number of such subarrays = (right - left + 1)
        count += (right - left + 1);
    }

    return count;
}

function numberOfSubarraysOptimal(nums, k) {
    // count(exactly k) = count(at most k) - count(at most k-1)
    return atMostKOddNumbers(nums, k) - atMostKOddNumbers(nums, k - 1);
}


/*
SUMMARY:
┌─────────────────┬──────────────────┬──────────────────┐
│ Approach        │ Time Complexity  │ Space Complexity │
├─────────────────┼──────────────────┼──────────────────┤
│ Brute Force     │ O(N^2)           │ O(1)             │
│ Better (HashMap)│ O(N)             │ O(N)             │
│ Optimal (Sliding│ O(N)             │ O(1)             │
│ Window)         │                  │                  │
└─────────────────┴──────────────────┴──────────────────┘

Key Takeaways:
1. For "exactly k" problems, use the trick: exactly(k) = atMost(k) - atMost(k-1)
2. Sliding window works directly for "at most k" type problems
3. Prefix count + HashMap is a powerful technique for subarray counting problems
4. This problem is essentially the same as "Binary Subarrays with Sum"
   where we treat odd numbers as 1 and even numbers as 0
*/


// ==================== OPTIMAL APPROACH (Enhanced - Single Pass with freq) ====================
/**
 * Single-pass sliding window — no helper called twice.
 * Identical pattern to "Binary Subarrays with Sum":
 *   odd number  ≡  1  (triggers freq reset, changes sum)
 *   even number ≡  0  (freq carries forward, sum unchanged)
 *
 * Core Idea:
 * For every right pointer, count how many subarrays ending at right have exactly k odd numbers.
 * After ensuring oddCount ≤ k, the inner while loop strips leading even numbers (and one odd)
 * from the left boundary — each stripped position is a valid alternative start → stored in freq.
 *
 * Why reset freq when nums[right] is odd?
 *   A new odd number shifts the count, invalidating all previous even-padding offsets.
 *   We start fresh after the inner while re-establishes a valid window.
 *
 * Why carry freq forward when nums[right] is even?
 *   Adding an even at the right doesn't change oddCount, so every start position
 *   valid at right-1 is still valid at right — freq naturally accumulates.
 *
 * Dry Run: nums = [1,1,2,1,1], k = 3
 *
 *   right=0 (1,odd):  oddCount=1, freq=0 (reset). oddCount>3? No. oddCount==3? No. count+=0 → 0
 *   right=1 (1,odd):  oddCount=2, freq=0 (reset). oddCount>3? No. oddCount==3? No. count+=0 → 0
 *   right=2 (2,even): oddCount=2, freq=0 (no reset). oddCount>3? No. oddCount==3? No. count+=0 → 0
 *   right=3 (1,odd):  oddCount=3, freq=0 (reset). oddCount>3? No.
 *     Inner while: oddCount==3 → strip nums[0]=1(odd) → oddCount=2, left=1, freq=1. Done.
 *     count+=1 → 1
 *   right=4 (1,odd):  oddCount=3, freq=0 (reset). oddCount>3? No.
 *     Inner while: oddCount==3 → strip nums[1]=1(odd) → oddCount=2, left=2, freq=1.
 *                  oddCount==3? No. Done.
 *     count+=1 → 2 ✓
 *
 * Time Complexity: O(N) — left and right each move forward at most N times
 * Space Complexity: O(1) — only variables, no extra data structure
 */

function numberOfSubarraysSinglePass(nums, k) {
    let left = 0, right = 0;
    let oddCount = 0, count = 0, freq = 0;

    while (right < nums.length) {
        // Expand window: include nums[right], // A new odd number invalidates all previous even-padding offsets → reset freq
        if (nums[right] % 2 !== 0) {
            oddCount++;
            freq = 0;
        }

        // oddCount exceeded k → slide the window: shrink from left by 1
        if (oddCount > k) {
            if (nums[left] % 2 !== 0) {
                oddCount--;
            }
            left++;
        }

        // Window has exactly k odds → strip leading even numbers (and the boundary odd)
        // from the left. Each stripped position is a valid alternative start → freq++.
        while (left <= right && oddCount === k) {
            if (nums[left] % 2 !== 0) {
                oddCount--;
            }
            left++;
            freq++;
        }

        // freq = number of valid subarrays ending exactly at right
        count += freq;
        right++;
    }

    return count;
}

// Driver code
console.log(numberOfSubarraysSinglePass([1, 1, 2, 1, 1], 3)); // 2
console.log(numberOfSubarraysSinglePass([2, 4, 6], 1));        // 0
console.log(numberOfSubarraysSinglePass([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); // 16


