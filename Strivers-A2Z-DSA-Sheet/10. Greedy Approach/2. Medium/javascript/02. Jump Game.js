/*
Question:
You are given an integer array nums. You are initially positioned at the array's first index,
and each element in the array represents your maximum jump length at that position.
Return true if you can reach the last index, or false otherwise.

Example:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Approach:
- We maintain a variable 'farthest' to keep track of the farthest position we can reach.
- We iterate over the array from left to right.
- At each position, we check if the current position is reachable (i <= farthest).
- If the current position is beyond farthest, it means we cannot proceed, so we return false.
- Otherwise, we update farthest = max(farthest, i + nums[i]).
- If we complete the loop, we can reach the end — return true.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the array.
- Space Complexity: O(1) — constant extra space.

Code:
*/

function canJump(nums) {
    let farthest = 0;

    for (let i = 0; i < nums.length; i++) {
        // If current index is beyond farthest reachable position
        if (farthest < i) return false;

        // Update the farthest position we can reach
        farthest = Math.max(farthest, nums[i] + i);
    }

    return true;
}

// Example usage
console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false

