// 162. Find Peak Element
// A peak element is an element that is strictly greater than its neighbors.

// Given a 0-indexed integer array nums, find a peak element, and return its index.
// If the array contains multiple peaks, return the index to any of the peaks.

// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a
// neighbor that is outside the array.

// You must write an algorithm that runs in O(log n) time.

 

// Example 1:

// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.
// Example 2:

// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.


/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let n = nums.length;

    if(n === 1) return 0;
    if(nums[0] > nums[1]) return 0;
    if(nums[n - 1] > nums[n - 2]) return n - 1;

    let low = 1, high = n - 2;

    while(low <= high) {
        let mid = Math.floor((low + high) / 2);

        if(nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) return mid;

        if(nums[mid] > nums[mid - 1]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return - 1;
};

// Brute force
function findPeakElement(arr) {
    let n = arr.length; // Size of array

    for (let i = 0; i < n; i++) {
        // Checking for the peak:
        if ((i === 0 || arr[i - 1] < arr[i])
                && (i === n - 1 || arr[i] > arr[i + 1])) {
            return i;
        }
    }
    // Dummy return statement
    return -1;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1];
let ans = findPeakElement(arr);
console.log("The peak is at index:", ans);