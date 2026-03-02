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


// ─────────────────────────────────────────────────────────────────────────────
// Approach 2 — Three-Phase While Loop (Cleaner Linear Scan)
// ─────────────────────────────────────────────────────────────────────────────
/*
Approach Explanation:
Instead of checking three cases inside one loop, this approach splits the work
into three clear, sequential while-loop phases:

  Phase 1 — Add all intervals that come completely BEFORE newInterval:
    Condition: intervals[i][1] < newInterval[0]
    (current interval ends before newInterval starts → no overlap)
    → Simply push them to result.

  Phase 2 — Merge all intervals that OVERLAP with newInterval:
    Condition: intervals[i][0] <= newInterval[1]
    (current interval starts at or before newInterval ends → overlap exists)
    → Expand newInterval by taking min of starts and max of ends.
    → Keep consuming intervals until no more overlap.
    → After the loop, push the fully merged newInterval once.

  Phase 3 — Add all intervals that come completely AFTER newInterval:
    Condition: remaining intervals (all have start > newInterval[1])
    → Simply push them to result.

This three-phase approach is arguably more readable because each phase has
a single, clear responsibility — no branching logic inside a single loop.

Why Phase 2 condition is `intervals[i][0] <= newInterval[1]`:
  - If the current interval's start is <= newInterval's end, they touch or overlap.
  - Note: we use <= (not <) to also catch intervals that share an endpoint,
    e.g., newInterval = [1,5] and current = [5,8] → they touch → merge to [1,8].

Complexity Analysis:
- Time Complexity:  O(N) — each interval is visited exactly once across all 3 phases.
- Space Complexity: O(1) extra (output array not counted).

Code:
*/

function insertV2(intervals, newInterval) {
    const result = [];
    const n = intervals.length;
    let i = 0;

    // Phase 1: Add all intervals that end before newInterval starts (no overlap)
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Phase 2: Merge all overlapping intervals into newInterval
    // An interval overlaps if it starts before or when newInterval ends
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]); // expand left
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]); // expand right
        i++;
    }
    result.push(newInterval); // push the fully merged interval

    // Phase 3: Add all remaining intervals that start after newInterval ends (no overlap)
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

// Example usage
console.log(insertV2([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]));
// Output: [[1,2],[3,10],[12,16]]

console.log(insertV2([[1,3],[6,9]], [2,5]));
// Output: [[1,5],[6,9]]


