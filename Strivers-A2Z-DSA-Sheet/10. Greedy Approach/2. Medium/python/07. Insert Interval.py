"""
Question:
You are given an array of non-overlapping intervals sorted by start time, and a newInterval.
Insert newInterval into intervals such that the array remains sorted and has no overlapping intervals
(merge overlapping intervals if necessary). Return the resulting intervals.

Example:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: [4,8] overlaps with [3,5], [6,7], [8,10] — all merged into [3,10].

Approach:
Three cases when comparing each existing interval with newInterval:
  1. Current interval ends before newInterval starts (no overlap, current comes first):
     → Add current interval to result.
  2. Current interval starts after newInterval ends (no overlap, newInterval comes first):
     → Add newInterval to result, then replace newInterval with current interval.
  3. Intervals overlap:
     → Merge by expanding newInterval: min of starts, max of ends.
After the loop, push the remaining newInterval (which may have been expanded).

Complexity Analysis:
- Time Complexity: O(N) — single pass through the intervals.
- Space Complexity: O(1) extra (output list not counted).

Code:
"""

def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    ans = []

    for interval in intervals:
        # Case 1: current interval ends before newInterval starts — no overlap
        if interval[1] < new_interval[0]:
            ans.append(interval)

        # Case 2: current interval starts after newInterval ends — no overlap
        elif new_interval[1] < interval[0]:
            ans.append(new_interval)
            new_interval = interval  # treat remaining as the "new" interval

        # Case 3: overlap — merge
        else:
            new_interval[0] = min(interval[0], new_interval[0])
            new_interval[1] = max(interval[1], new_interval[1])

    # Push the last remaining newInterval
    ans.append(new_interval)

    return ans


# Example usage
if __name__ == "__main__":
    print(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]))
    # Output: [[1,2],[3,10],[12,16]]

    print(insert([[1,3],[6,9]], [2,5]))
    # Output: [[1,5],[6,9]]

