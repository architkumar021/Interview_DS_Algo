"""
Question:
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
Each element nums[i] represents the maximum length of a forward jump from index i.
Return the minimum number of jumps to reach nums[n - 1].

Example:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Approach:
- Maintain three variables: 'steps', 'end', and 'farthest'.
- 'steps': minimum jumps taken so far.
- 'end': boundary of the current jump window.
- 'farthest': farthest index reachable from any position in the current window.
- Iterate through the array (excluding the last element):
  - Update farthest = max(farthest, i + nums[i]).
  - If farthest already reaches the last index, return steps + 1 immediately.
  - If i == end, we've exhausted the current window — take a jump (steps++) and extend end to farthest.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the array.
- Space Complexity: O(1) — constant extra space.

Code:
"""

def jump(nums: list[int]) -> int:
    steps = 0
    end = 0
    farthest = 0

    for i in range(len(nums) - 1):
        # Update the farthest reachable position
        farthest = max(farthest, nums[i] + i)

        # If farthest already covers the last index
        if farthest >= len(nums) - 1:
            return steps + 1

        # Reached the boundary of current window — must jump
        if i == end:
            steps += 1
            end = farthest

    return steps


# Example usage
if __name__ == "__main__":
    print(jump([2, 3, 1, 1, 4]))  # 2
    print(jump([2, 3, 0, 1, 4]))  # 2

