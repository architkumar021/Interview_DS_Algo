/*
Question:
Given an array of intervals where intervals[i] = [starti, endi], return the minimum number of intervals
you need to remove to make the rest of the intervals non-overlapping.

Example:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Approach:
- Sort intervals by their end time in ascending order.
  (Greedily keep the interval that ends earliest, maximizing space for future intervals.)
- Track the end time of the last kept interval.
- For each subsequent interval:
  - If its start < last end time → it overlaps with the previously kept interval → remove it (increment count).
  - Otherwise → no overlap → update last end time to this interval's end.
- Return the removal count.

Complexity Analysis:
- Time Complexity: O(N log N) — sorting.
- Space Complexity: O(1) — constant extra space.

Code:
*/

function eraseOverlapIntervals(intervals) {
    if (intervals.length < 2) return 0;

    // Sort intervals by end time (greedy: keep the one finishing earliest)
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let end = intervals[0][1]; // end time of last kept interval

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            // Overlap detected — remove this interval
            count++;
        } else {
            // No overlap — keep this interval, update end
            end = intervals[i][1];
        }
    }

    return count;
}

// Example usage
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // Output: 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));       // Output: 2
console.log(eraseOverlapIntervals([[1,2],[2,3]]));             // Output: 0

