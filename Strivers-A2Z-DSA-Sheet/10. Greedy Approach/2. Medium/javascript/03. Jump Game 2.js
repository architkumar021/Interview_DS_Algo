/*
Question:
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
Each element nums[i] represents the maximum length of a forward jump from index i.
Return the minimum number of jumps to reach nums[n - 1].

Example:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2.
Jump 1 step from index 0 to 1, then 3 steps to the last index.

Approach:
- We maintain three variables: 'steps', 'end', and 'farthest'.
- 'steps' keeps track of the minimum number of jumps required.
- 'end' represents the boundary of the current jump window.
- 'farthest' stores the farthest position we can reach by taking a jump from the current position.
- We iterate over the array (excluding the last element).
- At each position, we update farthest = max(farthest, i + nums[i]).
- If farthest already reaches or exceeds the last index, return steps + 1 immediately.
- When i reaches 'end', it means we've exhausted the current jump window — increment steps and extend end to farthest.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the array.
- Space Complexity: O(1) — constant extra space.

Code:
*/

function jump(nums) {
    let steps = 0;
    let end = 0;
    let farthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        // Update the farthest we can reach from this position
        farthest = Math.max(farthest, nums[i] + i);

        // If farthest already covers the last index, one more jump is enough
        if (farthest >= nums.length - 1) return steps + 1;

        // We've reached the boundary of the current jump window
        if (i === end) {
            steps++;        // must take a jump
            end = farthest; // extend boundary to farthest reachable
        }
    }

    return steps;
}

// Example usage
console.log(jump([2, 3, 1, 1, 4])); // 2
console.log(jump([2, 3, 0, 1, 4])); // 2

