// 410. Split Array Largest Sum

// Given an integer array nums and an integer k, split nums into k non-empty subarrays
// such that the largest sum of any subarray is minimized.

// Return the minimized largest sum of the split.

// A subarray is a contiguous part of the array.

 

// Example 1:

// Input: nums = [7,2,5,10,8], k = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
// Example 2:

// Input: nums = [1,2,3,4,5], k = 2
// Output: 9
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function(nums, k) {
    let result = -1;
    let n = nums.length;

    if(k > n) return result;

    let sum = 0;
    let max = -Infinity;

    for(let i = 0; i < n; i++) {
        max = Math.max(max, nums[i]);
        sum += nums[i];
    }

    let low = 0, high = sum;

    function canSplit(sum) {
        let currentSum = 0;
        let countOfSubArray = 1;

        for(let i = 0; i < n; i++) {
            if(nums[i] > sum) return false;

            if(currentSum + nums[i] > sum) {
                countOfSubArray++;
                currentSum = nums[i];
            } else {
                currentSum += nums[i];
            }

            if(countOfSubArray > k) return false;
        }
        return true;
    }

    while(low <= high) {
        let mid = Math.floor((low + high) / 2);

        if(canSplit(mid)) {
            result = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return result;
};