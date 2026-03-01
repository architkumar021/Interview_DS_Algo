/*
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
     → Add newInterval to result, then replace newInterval with current interval (to handle remaining intervals).
  3. Intervals overlap:
     → Merge by expanding newInterval: min of starts, max of ends.
After the loop, push the remaining newInterval (which may have been expanded).

Complexity Analysis:
- Time Complexity: O(N) — single pass through the intervals.
- Space Complexity: O(1) extra (output array not counted).

Code:
*/

function insert(intervals, newInterval) {
    const ans = [];

    for (let i = 0; i < intervals.length; i++) {
        // Case 1: current interval ends before newInterval starts — no overlap
        if (intervals[i][1] < newInterval[0]) {
            ans.push(intervals[i]);
        }
        // Case 2: current interval starts after newInterval ends — no overlap
        else if (newInterval[1] < intervals[i][0]) {
            ans.push(newInterval);
            newInterval = intervals[i]; // treat remaining as the "new" interval to insert
        }
        // Case 3: overlap — merge
        else {
            newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
            newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
        }
    }

    // Push the last remaining newInterval
    ans.push(newInterval);

    return ans;
}

// Example usage
console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]));
// Output: [[1,2],[3,10],[12,16]]

console.log(insert([[1,3],[6,9]], [2,5]));
// Output: [[1,5],[6,9]]

