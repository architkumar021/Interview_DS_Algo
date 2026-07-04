/*QUESTION:
Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum equal to the goal.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]

APPROACH:
1. Create a Map mp to store the prefix sum and its frequency.
2. Initialize a variable prefSum to keep track of the prefix sum.
3. Initialize a variable cnt to keep track of the count of subarrays with a sum equal to the goal.
4. Iterate through each element nums[i] in the array:
   - Update prefSum by adding nums[i].
   - Check if prefSum is equal to the goal, if so, increment cnt.
   - Check if the difference between prefSum and goal (prefSum - goal) exists in the map.
     - If it exists, increment cnt by the frequency of (prefSum - goal) in the map, as this would mean we have found subarrays with a sum equal to the goal.
   - Increment the frequency of prefSum in the map.
5. Return cnt, which represents the number of non-empty subarrays with a sum equal to the goal.

CODE:*/

/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
function numSubarraysWithSum(nums, goal) {
    const mp = new Map();
    let prefSum = 0, cnt = 0;
    for (let i = 0; i < nums.length; i++) {
        prefSum += nums[i];
        if (prefSum === goal)
            cnt++;
        if (mp.has(prefSum - goal))
            cnt += mp.get(prefSum - goal);
        mp.set(prefSum, (mp.get(prefSum) || 0) + 1);
    }
    return cnt;
}

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N), where N is the size of the input array nums. We traverse the array once and perform constant time operations in the loop.
- Space complexity: O(N), as the worst-case scenario would be that all prefix sums are distinct, so the map mp would store N prefix sums.
    - we can reduce the space complexity to O(1) if we use this countOfSubarrays with atmost sum = k - atmost sum = k-1
    - which will return in countofSubarrays with sum exactly K, but this won't work if array has -ve elements
*/


// ==================== BRUTE FORCE APPROACH ====================
/**
 * Brute Force Approach:
 * - Generate all possible subarrays using two nested loops
 * - For each subarray, calculate the sum and check if it equals goal
 * - Count all subarrays where sum equals goal
 *
 * Time Complexity: O(N^2) - Two nested loops to generate all subarrays
 * Space Complexity: O(1) - Only using variables for counting
 */

function numSubarraysWithSumBruteForce(nums, goal) {
    let count = 0;
    const n = nums.length;

    // Outer loop: starting index of subarray
    for (let i = 0; i < n; i++) {
        let sum = 0;

        // Inner loop: ending index of subarray
        // Calculate sum as we extend the subarray (avoids O(N^3))
        for (let j = i; j < n; j++) {
            sum += nums[j];  // Add current element to running sum

            // If sum equals goal, we found a valid subarray
            if (sum === goal) {
                count++;
            }
        }
    }

    return count;
}


// ==================== BETTER APPROACH (Prefix Sum with HashMap) ====================
/**
 * Better Approach using Prefix Sum + HashMap:
 * - Use prefix sum to calculate subarray sums efficiently
 * - If prefixSum[j] - prefixSum[i] = goal, then subarray (i+1, j) has sum = goal
 * - Store frequency of each prefix sum in a HashMap
 * - For each prefix sum, check if (prefixSum - goal) exists in map
 *
 * Key Insight: If current prefix sum is 'prefSum' and we need sum = goal,
 * we look for how many times (prefSum - goal) appeared before.
 *
 * Time Complexity: O(N) - Single pass through the array
 * Space Complexity: O(N) - HashMap to store prefix sums
 */

function numSubarraysWithSumBetter(nums, goal) {
    const mp = new Map();
    let prefSum = 0, cnt = 0;

    for (let i = 0; i < nums.length; i++) {
        prefSum += nums[i];  // Update prefix sum

        // If prefix sum equals goal, subarray from index 0 to i has sum = goal
        if (prefSum === goal) {
            cnt++;
        }

        // Check if (prefSum - goal) exists in map
        // If yes, those many subarrays ending at i have sum = goal
        if (mp.has(prefSum - goal)) {
            cnt += mp.get(prefSum - goal);
        }

        // Store current prefix sum frequency in map
        mp.set(prefSum, (mp.get(prefSum) || 0) + 1);
    }

    return cnt;
}


// ==================== OPTIMAL APPROACH (Sliding Window) ====================
/**
 * Optimal Approach using Sliding Window:
 * - Key Trick: count(sum == goal) = count(sum <= goal) - count(sum <= goal-1)
 * - Use sliding window to count subarrays with sum <= k
 * - This works because array contains only 0s and 1s (non-negative)
 *
 * Why this works:
 * - Subarrays with sum exactly K = (Subarrays with sum at most K) - (Subarrays with sum at most K-1)
 * - Sliding window can efficiently count "at most K" subarrays
 *
 * Time Complexity: O(N) - Two passes but each element visited at most twice
 * Space Complexity: O(1) - Only using pointers and variables
 */

// Helper function: Count subarrays with sum <= goal
function countSubarraysWithSumAtMost(nums, goal) {
    // Edge case: if goal is negative, no valid subarrays exist
    if (goal < 0) return 0;

    let count = 0;
    let sum = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];  // Expand window by adding right element

        // Shrink window from left while sum exceeds goal
        while (sum > goal) {
            sum -= nums[left];
            left++;
        }

        // All subarrays ending at 'right' with start from 'left' to 'right' are valid
        // Number of such subarrays = (right - left + 1)
        count += (right - left + 1);
    }

    return count;
}

function numSubarraysWithSumOptimal(nums, goal) {
    // count(sum == goal) = count(sum <= goal) - count(sum <= goal-1)
    return countSubarraysWithSumAtMost(nums, goal) - countSubarraysWithSumAtMost(nums, goal - 1);
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
*/


// ==================== OPTIMAL APPROACH (Enhanced - Single Pass with freq) ====================
/**
 * Same O(N) / O(1) as above but runs the loop only ONCE — no helper called twice.
 *
 * Core Idea:
 * For every right pointer i, count how many subarrays ending at i have sum = goal.
 * After ensuring sum ≤ goal, the inner while loop strips leading zeros from the
 * left boundary — each stripped position is a valid alternative start → stored in freq.
 *
 * Why reset freq when nums[i] === 1?
 *   A new 1 shifts the sum, so any zero-padding offsets from before are no longer
 *   valid for this new right boundary. We start counting fresh after the inner while
 *   re-establishes a valid window.
 *
 * Why carry freq forward when nums[i] === 0?
 *   Adding a 0 at the right doesn't change the sum, so every start position that
 *   was valid at i-1 is still valid at i — freq naturally accumulates.
 *
 * Dry Run: nums = [1,0,1,0,1], goal = 2
 *
 *   right=0 (1): sum=1, freq=0 (reset). sum>2? No. sum==2? No. count+=0 → 0
 *   right=1 (0): sum=1, freq=0 (no reset). sum>2? No. sum==2? No. count+=0 → 0
 *   right=2 (1): sum=2, freq=0 (reset). sum>2? No.
 *            Inner while: sum==2 → strip nums[0]=1 → sum=1, left=1, freq=1. Done.
 *            count+=1 → 1
 *   right=3 (0): sum=1+0=1, freq=1 (no reset). sum>2? No. sum==2? No.
 *            count+=1 → 2
 *   right=4 (1): sum=1+1=2, freq=0 (reset). sum>2? No.
 *            Inner while: sum==2 → strip nums[1]=0 → sum=2, left=2, freq=1.
 *                         sum==2 → strip nums[2]=1 → sum=1, left=3, freq=2. Done.
 *            count+=2 → 4 ✓
 *
 * Time Complexity: O(N) — i and j each move forward at most N times
 * Space Complexity: O(1) — only variables, no extra data structure
 */

function numSubarraysWithSumSinglePass(nums, goal) {
    let left = 0, right = 0;
    let sum = 0, count = 0, freq = 0;

    while (right < nums.length) {
        // Expand window: include nums[right]
        sum += nums[right];

        // A new 1 invalidates all previous zero-padding offsets → reset freq
        if (nums[right] === 1) {
            freq = 0;
        }

        // sum exceeded goal → slide the window: shrink from left by 1
        if (sum > goal) {
            sum -= nums[left];
            left++;
        }

        // Window sum is exactly goal → strip leading zeros from left boundary.
        // Each stripped zero-position is a valid alternative start → counted into freq.
        while (left <= right && sum === goal) {
            sum -= nums[left];
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
console.log(numSubarraysWithSumSinglePass([1, 0, 1, 0, 1], 2)); // 4
console.log(numSubarraysWithSumSinglePass([0, 0, 0, 0, 0], 0)); // 15
console.log(numSubarraysWithSumSinglePass([1, 0, 1, 1, 1], 2)); // 5


