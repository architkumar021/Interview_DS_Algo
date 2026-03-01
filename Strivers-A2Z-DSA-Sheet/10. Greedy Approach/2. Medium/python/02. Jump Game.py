"""
Question:
You are given an integer array nums. You are initially positioned at the array's first index,
and each element in the array represents your maximum jump length at that position.
Return true if you can reach the last index, or false otherwise.

Example:
Input: nums = [2,3,1,1,4]
Output: True
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Approach:
- Maintain a variable 'farthest' to track the farthest reachable index.
- Iterate through the array.
- If the current index i exceeds farthest, it is unreachable — return False.
- Otherwise, update farthest = max(farthest, i + nums[i]).
- If the loop completes without returning False, we can reach the end — return True.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the array.
- Space Complexity: O(1) — constant extra space.

Code:
"""

def can_jump(nums: list[int]) -> bool:
    farthest = 0

    for i in range(len(nums)):
        # If current index is beyond farthest reachable position
        if farthest < i:
            return False

        # Update farthest reachable position
        farthest = max(farthest, nums[i] + i)

    return True


# Example usage
if __name__ == "__main__":
    print(can_jump([2, 3, 1, 1, 4]))  # True
    print(can_jump([3, 2, 1, 0, 4]))  # False

